import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { MessageInput, MessageList } from "@/components/features/chat";
import type { ConversationMessage } from "@/services/chat";
import { fetchConversationMessages, sendMessage } from "@/services/chat";
import { revalidatePath } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { appRoutes } from "@/i18n/paths";

type MessageThreadPageProps = {
  params: {
    id: string;
  };
};

export default async function MessageThreadPage({
  params,
}: MessageThreadPageProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const { user } = await enforcePlatformRouteAccess();
  const conversationId = params.id;
  let messages: ConversationMessage[] = [];
  let conversationLoadFailed = false;

  try {
    messages = await fetchConversationMessages({
      currentUserId: user.id,
      conversationId,
    });
  } catch {
    conversationLoadFailed = true;
  }

  if (conversationLoadFailed) {
    return (
      <main className="ui-page ui-platform-page ui-messages-layout">
        <header className="ui-messages-header">
          <h1 className="ui-heading-1">{t("platform.conversation_title")}</h1>
          <p className="ui-muted">{t("platform.conversation_unavailable")}</p>
          <p>
            <Link href={appRoutes.messages}>{t("platform.back_to_conversations")}</Link>
          </p>
        </header>
      </main>
    );
  }

  async function sendMessageAction(formData: FormData) {
    "use server";

    const postedConversationId = String(formData.get("conversation_id") ?? "");
    const body = String(formData.get("body") ?? "");

    if (!postedConversationId || postedConversationId !== conversationId) {
      throw new Error(t("platform.invalid_conversation_id"));
    }

    await sendMessage({
      currentUserId: user.id,
      conversationId: postedConversationId,
      body,
    });

    revalidatePath(`/${locale}${appRoutes.messages}/${conversationId}`);
    revalidatePath(`/${locale}${appRoutes.messages}`);
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
        <h1 className="ui-heading-1">{t("platform.conversation_title")}</h1>
        <p className="ui-muted">{t("platform.conversation_subtitle")}</p>
        <p>
          <Link href={appRoutes.messages}>{t("platform.back_to_conversations")}</Link>
        </p>
      </header>

      <section aria-label={t("platform.conversation_messages")} className="ui-section">
        <MessageList messages={messageItems} currentUserId={user.id} />
      </section>

      <section aria-label={t("platform.send_message")} className="ui-section">
        <MessageInput conversationId={conversationId} action={sendMessageAction} />
      </section>
    </main>
  );
}
