type AuthFormMessageProps = {
  message?: string;
};

export function AuthFormMessage({ message }: AuthFormMessageProps) {
  return (
    <p role="alert" aria-live="polite" className="ui-field-error">
      {message ?? ""}
    </p>
  );
}
