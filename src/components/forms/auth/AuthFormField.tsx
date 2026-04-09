type AuthFormFieldProps = {
  id: string;
  label: string;
  type?: "email" | "password" | "text";
  name: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
};

export function AuthFormField({
  id,
  label,
  type = "text",
  name,
  autoComplete,
  required = false,
  error,
}: AuthFormFieldProps) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="ui-field ui-auth-field">
      <label htmlFor={id} className="ui-auth-label">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className="ui-auth-input"
      />
      <p id={`${id}-error`} role="alert" className="ui-field-error ui-auth-field-error">
        {error ?? ""}
      </p>
    </div>
  );
}
