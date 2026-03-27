"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { AuthFormField } from "./AuthFormField";
import { AuthFormMessage } from "./AuthFormMessage";

type RegisterFormProps = {
  formError?: string;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
};

export function RegisterForm({
  formError,
  emailError,
  passwordError,
  confirmPasswordError,
}: RegisterFormProps) {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(formError);
  const [fieldErrors, setFieldErrors] = useState({
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    const nextFieldErrors = {
      email: email ? undefined : t("auth_form.email_required"),
      password: password ? undefined : t("auth_form.password_required"),
      confirmPassword: confirmPassword
        ? undefined
        : t("auth_form.confirm_password_required"),
    };

    if (!nextFieldErrors.password && password !== confirmPassword) {
      nextFieldErrors.confirmPassword = t("auth_form.password_mismatch");
    }

    setFieldErrors(nextFieldErrors);
    setFormMessage(undefined);

    if (
      nextFieldErrors.email ||
      nextFieldErrors.password ||
      nextFieldErrors.confirmPassword
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setFormMessage(t("auth_form.registration_failed"));
        return;
      }

      form.reset();
      setFormMessage(
        t("auth_form.registration_success"),
      );
    } catch {
      setFormMessage(t("auth_form.registration_failed"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ui-form ui-card">
      <AuthFormMessage message={formMessage} />
      <AuthFormField
        id="register-email"
        label={t("auth_form.email")}
        type="email"
        name="email"
        autoComplete="email"
        required
        error={fieldErrors.email}
      />
      <AuthFormField
        id="register-password"
        label={t("auth_form.password")}
        type="password"
        name="password"
        autoComplete="new-password"
        required
        error={fieldErrors.password}
      />
      <AuthFormField
        id="register-confirm-password"
        label={t("auth_form.confirm_password")}
        type="password"
        name="confirmPassword"
        autoComplete="new-password"
        required
        error={fieldErrors.confirmPassword}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("auth_form.creating_account") : t("auth_form.create_account")}
      </button>
    </form>
  );
}
