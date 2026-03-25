type MessageInputProps = {
  conversationId: string;
  action: (formData: FormData) => void | Promise<void>;
  placeholder?: string;
  sendLabel?: string;
};

export function MessageInput({
  conversationId,
  action,
  placeholder = "Type a message",
  sendLabel = "Send",
}: MessageInputProps) {
  return (
    <form action={action} aria-label="Send message form" className="ui-form ui-card">
      <input type="hidden" name="conversation_id" value={conversationId} />

      <div className="ui-message-input-row">
        <div className="ui-field">
        <label htmlFor="chat-message-body">Message</label>
        <input
          id="chat-message-body"
          name="body"
          type="text"
          required
          minLength={1}
          maxLength={2000}
          pattern=".*\S.*"
          title="Message cannot be empty."
          placeholder={placeholder}
        />
        </div>
        <button type="submit">{sendLabel}</button>
      </div>
    </form>
  );
}
