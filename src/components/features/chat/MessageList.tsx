import { Badge } from "@/components/ui/Badge";
import { useLocale, useTranslations } from "next-intl";

export type MessageListItem = {
  id: string;
  senderUserId: string;
  body: string;
  createdAt: string;
};

type MessageListProps = {
  messages: MessageListItem[];
  currentUserId: string;
  emptyStateText?: string;
};

function formatMessageTimestamp(value: string, locale: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function MessageList({
  messages,
  currentUserId,
  emptyStateText,
}: MessageListProps) {
  const t = useTranslations();
  const locale = useLocale();
  const resolvedEmpty = emptyStateText ?? t("platform.no_messages");

  if (messages.length === 0) {
    return (
      <section aria-label={t("platform.conversation_messages")}>
        <p>{resolvedEmpty}</p>
      </section>
    );
  }

  return (
    <section aria-label={t("platform.conversation_messages")}>
      <ul className="ui-list">
        {messages.map((message) => {
          const isCurrentUserMessage = message.senderUserId === currentUserId;
          const rowClassName = isCurrentUserMessage
            ? "ui-message-row ui-message-row-own"
            : "ui-message-row ui-message-row-other";
          const bubbleClassName = isCurrentUserMessage
            ? "ui-card ui-message-bubble ui-message-bubble-own"
            : "ui-card ui-message-bubble";

          return (
            <li key={message.id} className={rowClassName}>
              <article className={bubbleClassName}>
                <div className="ui-message-meta">
                  <Badge tone={isCurrentUserMessage ? "default" : "muted"}>
                    {isCurrentUserMessage ? t("platform.you") : t("platform.other_user")}
                  </Badge>
                  <time dateTime={message.createdAt} className="ui-message-time">
                    {formatMessageTimestamp(message.createdAt, locale)}
                  </time>
                </div>
                <p className="ui-message-body">{message.body}</p>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
