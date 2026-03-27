import { useTranslations } from "next-intl";

type MessageInputProps = {
  conversationId: string;
  action: (formData: FormData) => void | Promise<void>;
  placeholder?: string;
  sendLabel?: string;
};

export function MessageInput({
  conversationId,
  action,
  placeholder,
  sendLabel,
}: MessageInputProps) {
  const t = useTranslations();
  const resolvedPlaceholder = placeholder ?? t("platform.type_message");
  const resolvedSendLabel = sendLabel ?? t("platform.send");

  return (
    <form action={action} aria-label={t("platform.send_message")} className="ui-form ui-card">
      <input type="hidden" name="conversation_id" value={conversationId} />

      <div className="ui-message-input-row">
        <div className="ui-field">
        <label htmlFor="chat-message-body">{t("platform.message")}</label>
        <input
          id="chat-message-body"
          name="body"
          type="text"
          required
          minLength={1}
          maxLength={2000}
          pattern=".*\S.*"
          title={t("auth_form.message_required")}
          placeholder={resolvedPlaceholder}
        />
        </div>
        <button type="submit">{resolvedSendLabel}</button>
      </div>
    </form>
  );
}
