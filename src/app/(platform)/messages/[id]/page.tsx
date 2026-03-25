import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { MessageInput, MessageList } from "@/components/features/chat";
import { fetchConversationMessages, sendMessage } from "@/services/chat";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import Link from "next/link";

type MessageThreadPageProps = {
  params: {
    id: string;
  };
};

export default async function MessageThreadPage({
  params,
}: MessageThreadPageProps) {
  const { user } = await enforcePlatformRouteAccess();
  const conversationId = params.id;
  let messages;

  try {
    messages = await fetchConversationMessages({
      currentUserId: user.id,
      conversationId,
    });
  } catch {
    // Hide access details and invalid IDs with a generic not-found response.
    notFound();
  }

  async function sendMessageAction(formData: FormData) {
    "use server";

    const postedConversationId = String(formData.get("conversation_id") ?? "");
    const body = String(formData.get("body") ?? "");

    if (!postedConversationId || postedConversationId !== conversationId) {
      throw new Error("Invalid conversation id.");
    }

    await sendMessage({
      currentUserId: user.id,
      conversationId: postedConversationId,
      body,
    });

    revalidatePath(`/messages/${conversationId}`);
    revalidatePath("/messages");
  }

  const messageItems = messages.map((message) => ({
    id: message.id,
    senderUserId: message.sender_user_id,
    body: message.body,
    createdAt: message.created_at,
  }));

  return (
    <main className="ui-page ui-platform-page ui-messages-layout">
      <header className="ui-messages-header">
        <h1 className="ui-heading-1">Conversation</h1>
        <p className="ui-muted">Read the thread and continue messaging.</p>
        <p>
          <Link href="/messages">Back to all conversations</Link>
        </p>
      </header>

      <section aria-label="Conversation messages" className="ui-section">
        <MessageList messages={messageItems} currentUserId={user.id} />
      </section>

      <section aria-label="Send message" className="ui-section">
        <MessageInput conversationId={conversationId} action={sendMessageAction} />
      </section>
    </main>
  );
}
