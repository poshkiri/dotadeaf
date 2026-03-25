import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { ConversationList } from "@/components/features/chat";
import { fetchConversationSummaries } from "@/services/chat";

export default async function MessagesPage() {
  const { user } = await enforcePlatformRouteAccess();
  const summaries = await fetchConversationSummaries(user.id);
  const conversationItems = summaries.map((summary) => ({
    id: summary.id,
    otherParticipant: {
      userId: summary.other_participant.user_id,
      displayName: summary.other_participant.display_name,
    },
    lastMessageBody: summary.last_message_body,
    lastMessageAt: summary.last_message_at,
  }));

  return (
    <main className="ui-page ui-platform-page ui-messages-layout">
      <header className="ui-messages-header">
        <h1 className="ui-heading-1">Messages</h1>
        <p className="ui-muted">Select a conversation to view messages.</p>
      </header>

      <section aria-label="Conversation list" className="ui-section">
        <ConversationList conversations={conversationItems} />
      </section>

      <section aria-label="Conversation selection placeholder" className="ui-card ui-section">
        <h2 className="ui-heading-2">Open a conversation</h2>
        <p className="ui-muted">
          Choose a conversation from the list above to read and send messages.
        </p>
        <p className="ui-muted">
          No conversations yet? Find players on the public listing and start from there.
        </p>
      </section>
    </main>
  );
}
