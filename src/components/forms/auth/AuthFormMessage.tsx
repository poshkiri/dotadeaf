type AuthFormMessageProps = {
  message?: string;
  tone?: "error" | "success" | "neutral";
};

export function AuthFormMessage({
  message,
  tone = "error",
}: AuthFormMessageProps) {
  return (
    <p
      role="alert"
      aria-live="polite"
      className={`ui-auth-message ui-auth-message-${tone}`}
    >
      {message ?? ""}
    </p>
  );
}
