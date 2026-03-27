import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const MESSAGE_PREVIEW_LENGTH = 80;

export type ConversationListItem = {
  id: string;
  otherParticipant: {
    userId: string;
    displayName: string;
  };
  lastMessageBody: string | null;
  lastMessageAt?: string | null;
};

type ConversationListProps = {
  conversations: ConversationListItem[];
  emptyStateText?: string;
};

function getMessagePreview(messageBody: string | null, fallback: string): string {
  const trimmedBody = messageBody?.trim();
  if (!trimmedBody) {
    return fallback;
  }

  if (trimmedBody.length <= MESSAGE_PREVIEW_LENGTH) {
    return trimmedBody;
  }

  return `${trimmedBody.slice(0, MESSAGE_PREVIEW_LENGTH).trimEnd()}...`;
}

function formatConversationTime(value: string | null | undefined, locale: string): string {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

export function ConversationList({
  conversations,
  emptyStateText,
}: ConversationListProps) {
  const t = useTranslations();
  const locale = useLocale();
  const resolvedEmpty = emptyStateText ?? t("platform.no_conversations");

  if (conversations.length === 0) {
    return (
      <section aria-label={t("platform.conversation_list")}>
        <p>{resolvedEmpty}</p>
      </section>
    );
  }

  return (
    <section aria-label={t("platform.conversation_list")}>
      <ul className="ui-list">
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Link
              href={`/messages/${conversation.id}`}
              className="ui-card ui-interactive-card ui-conversation-list-item"
            >
              <div className="ui-conversation-list-head">
                <strong>{conversation.otherParticipant.displayName}</strong>
                <span className="ui-message-time">
                  {formatConversationTime(conversation.lastMessageAt, locale)}
                </span>
              </div>
              <p className="ui-conversation-preview">
                {getMessagePreview(conversation.lastMessageBody, t("platform.no_messages"))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
