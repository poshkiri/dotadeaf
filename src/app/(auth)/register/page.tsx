import {
  GoogleSignInButton,
  RegisterForm,
} from "@/components/forms/auth";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="ui-auth-page">
      <section className="ui-auth-panel" aria-label="Registration panel">
        <header className="ui-auth-header">
          <h1 className="ui-heading-1">Create your account</h1>
          <p className="ui-muted">Register to start building your player profile.</p>
        </header>

        <RegisterForm />

        <hr className="ui-divider" />

        <section aria-label="Alternative sign-up options" className="ui-section ui-card">
          <h2 className="ui-heading-2">Or continue with</h2>
          <GoogleSignInButton label="Sign up with Google" />
        </section>

        <p className="ui-muted">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
