import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { ConversationList } from "@/components/features/chat";
import { fetchConversationSummaries } from "@/services/chat";
import { getTranslations } from "next-intl/server";

export default async function MessagesPage() {
  const t = await getTranslations();
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
        <h1 className="ui-heading-1">{t("platform.messages_title")}</h1>
        <p className="ui-muted">{t("platform.messages_subtitle")}</p>
      </header>

      <section aria-label={t("platform.conversation_list")} className="ui-section">
        <ConversationList conversations={conversationItems} />
      </section>

      <section aria-label={t("platform.open_conversation")} className="ui-card ui-section">
        <h2 className="ui-heading-2">{t("platform.open_conversation")}</h2>
        <p className="ui-muted">{t("platform.open_conversation_desc")}</p>
        <p className="ui-muted">{t("platform.open_conversation_hint")}</p>
      </section>
    </main>
  );
}
