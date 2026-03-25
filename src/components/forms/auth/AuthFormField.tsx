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
    <div className="ui-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
      />
      <p id={`${id}-error`} role="alert" className="ui-field-error">
        {error ?? ""}
      </p>
    </div>
  );
}
