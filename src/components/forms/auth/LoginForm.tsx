"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
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
      email: email ? undefined : "Email is required.",
      password: password ? undefined : "Password is required.",
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
        setFormMessage("Invalid email or password. Please try again.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setFormMessage("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ui-form ui-card">
      <AuthFormMessage message={formMessage} />
      <AuthFormField
        id="login-email"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        required
        error={fieldErrors.email}
      />
      <AuthFormField
        id="login-password"
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        required
        error={fieldErrors.password}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Log in"}
      </button>
    </form>
  );
}
