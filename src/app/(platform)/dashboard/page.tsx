import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import Link from "next/link";

export default async function DashboardPage() {
  const { profile, isProfileComplete } = await enforcePlatformRouteAccess();

  return (
    <main className="ui-page ui-platform-page">
      <header className="ui-section">
        <h1 className="ui-heading-1">Dashboard</h1>
        <p className="ui-muted">
          Welcome back. Continue from your profile, conversations, or player discovery.
        </p>
      </header>

      <section className="ui-card ui-section" aria-label="Profile status">
        <h2 className="ui-heading-2">Profile status</h2>
        <p className="ui-muted">
          {isProfileComplete
            ? "Your MVP profile is complete."
            : "Your profile still needs required fields."}
        </p>
        <p>
          <Link href="/profile/edit">Open profile editor</Link>
        </p>
        {profile ? null : (
          <p className="ui-muted">Profile record was not loaded yet. Please try again.</p>
        )}
      </section>

      <section className="ui-platform-grid" aria-label="Quick navigation">
        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">Find teammates</h2>
          <p className="ui-muted">Browse the public players page and apply role-based filters.</p>
          <p>
            <Link href="/players">Open players</Link>
          </p>
        </article>

        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">Messages</h2>
          <p className="ui-muted">Continue your one-to-one conversations in the messages area.</p>
          <p>
            <Link href="/messages">Open messages</Link>
          </p>
        </article>

        <article className="ui-card ui-section">
          <h2 className="ui-heading-2">Patch updates</h2>
          <p className="ui-muted">Read published Russian-language Dota 2 patch content.</p>
          <p>
            <Link href="/patches">Open patches</Link>
          </p>
        </article>
      </section>
    </main>
  );
}
