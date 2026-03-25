"use client";

import { useState, type FormEvent } from "react";
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
      email: email ? undefined : "Email is required.",
      password: password ? undefined : "Password is required.",
      confirmPassword: confirmPassword
        ? undefined
        : "Please confirm your password.",
    };

    if (!nextFieldErrors.password && password !== confirmPassword) {
      nextFieldErrors.confirmPassword = "Passwords do not match.";
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
        setFormMessage("Registration failed. Please try again.");
        return;
      }

      form.reset();
      setFormMessage(
        "Account created. Please check your email to confirm registration.",
      );
    } catch {
      setFormMessage("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ui-form ui-card">
      <AuthFormMessage message={formMessage} />
      <AuthFormField
        id="register-email"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        required
        error={fieldErrors.email}
      />
      <AuthFormField
        id="register-password"
        label="Password"
        type="password"
        name="password"
        autoComplete="new-password"
        required
        error={fieldErrors.password}
      />
      <AuthFormField
        id="register-confirm-password"
        label="Confirm password"
        type="password"
        name="confirmPassword"
        autoComplete="new-password"
        required
        error={fieldErrors.confirmPassword}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
