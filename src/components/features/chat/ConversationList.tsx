import Link from "next/link";

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

function getMessagePreview(messageBody: string | null): string {
  const trimmedBody = messageBody?.trim();
  if (!trimmedBody) {
    return "No messages yet.";
  }

  if (trimmedBody.length <= MESSAGE_PREVIEW_LENGTH) {
    return trimmedBody;
  }

  return `${trimmedBody.slice(0, MESSAGE_PREVIEW_LENGTH).trimEnd()}...`;
}

function formatConversationTime(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

export function ConversationList({
  conversations,
  emptyStateText = "No conversations yet.",
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <section aria-label="Conversations">
        <p>{emptyStateText}</p>
      </section>
    );
  }

  return (
    <section aria-label="Conversations">
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
                  {formatConversationTime(conversation.lastMessageAt)}
                </span>
              </div>
              <p className="ui-conversation-preview">
                {getMessagePreview(conversation.lastMessageBody)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
