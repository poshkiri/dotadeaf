"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "@/i18n/navigation";
import { AuthFormField } from "./AuthFormField";
import { AuthFormMessage } from "./AuthFormMessage";

type LoginFormProps = {
  formError?: string;
  emailError?: string;
  passwordError?: string;
};

export function LoginForm({
  formError,
  emailError,
  passwordError,
}: LoginFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(formError);
  const [fieldErrors, setFieldErrors] = useState({
    email: emailError,
    password: passwordError,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const nextFieldErrors = {
      email: email ? undefined : t("auth_form.email_required"),
      password: password ? undefined : t("auth_form.password_required"),
    };

    setFieldErrors(nextFieldErrors);
    setFormMessage(undefined);

    if (nextFieldErrors.email || nextFieldErrors.password) {
      return;
    }

    try {
      setIsSubmitting(true);
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setFormMessage(t("auth_form.invalid_credentials"));
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setFormMessage(t("auth_form.login_failed"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ui-form ui-card">
      <AuthFormMessage message={formMessage} />
      <AuthFormField
        id="login-email"
        label={t("auth_form.email")}
        type="email"
        name="email"
        autoComplete="email"
        required
        error={fieldErrors.email}
      />
      <AuthFormField
        id="login-password"
        label={t("auth_form.password")}
        type="password"
        name="password"
        autoComplete="current-password"
        required
        error={fieldErrors.password}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("auth_form.signing_in") : t("auth_form.login")}
      </button>
    </form>
  );
}
