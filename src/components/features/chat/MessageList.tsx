import { Badge } from "@/components/ui/Badge";

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

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

function formatMessageTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return DATE_TIME_FORMATTER.format(date);
}

export function MessageList({
  messages,
  currentUserId,
  emptyStateText = "No messages yet.",
}: MessageListProps) {
  if (messages.length === 0) {
    return (
      <section aria-label="Messages">
        <p>{emptyStateText}</p>
      </section>
    );
  }

  return (
    <section aria-label="Messages">
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
                    {isCurrentUserMessage ? "You" : "Other user"}
                  </Badge>
                  <time dateTime={message.createdAt} className="ui-message-time">
                    {formatMessageTimestamp(message.createdAt)}
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
