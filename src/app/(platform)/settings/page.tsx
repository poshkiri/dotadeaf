import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import Link from "next/link";

export default async function SettingsPage() {
  await enforcePlatformRouteAccess();

  return (
    <main className="ui-page ui-platform-page">
      <header className="ui-section">
        <h1 className="ui-heading-1">Settings</h1>
        <p className="ui-muted">
          Settings are intentionally minimal in MVP. Use profile editing for core account data.
        </p>
      </header>

      <section className="ui-card ui-section" aria-label="Available settings">
        <h2 className="ui-heading-2">Available now</h2>
        <p className="ui-muted">
          Profile details, rank, preferred roles, language, region, and availability are managed
          on the profile edit page.
        </p>
        <p>
          <Link href="/profile/edit">Go to profile edit</Link>
        </p>
      </section>
    </main>
  );
}
