import {
  GoogleSignInButton,
  LoginForm,
} from "@/components/forms/auth";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="ui-auth-page">
      <section className="ui-auth-panel" aria-label="Login panel">
        <header className="ui-auth-header">
          <h1 className="ui-heading-1">Welcome back</h1>
          <p className="ui-muted">Sign in to continue to your account.</p>
        </header>

        <LoginForm />

        <hr className="ui-divider" />

        <section aria-label="Alternative sign-in options" className="ui-section ui-card">
          <h2 className="ui-heading-2">Or continue with</h2>
          <GoogleSignInButton label="Sign in with Google" />
        </section>

        <p className="ui-muted">
          Do not have an account? <Link href="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}
