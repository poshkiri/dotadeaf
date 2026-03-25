import { enforcePlatformRouteAccess } from "@/services/auth/routeProtection";
import { getProfileForViewByUserId } from "@/services/profile/readProfile";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default async function ProfilePage() {
  const { user } = await enforcePlatformRouteAccess();
  const profile = await getProfileForViewByUserId(user.id);

  if (!profile) {
    return (
      <main className="ui-page ui-platform-page">
        <h1 className="ui-heading-1">Your profile</h1>
        <p className="ui-muted">Your profile data is not available yet.</p>
        <section className="ui-card ui-section" aria-label="Profile setup guidance">
          <p className="ui-muted">
            Please complete your profile to continue.
          </p>
          <p>
            <Link href="/profile/edit">Edit profile</Link>
          </p>
        </section>
      </main>
    );
  }

  const preferredRoles =
    profile.preferred_roles.length > 0
      ? profile.preferred_roles.join(", ")
      : "Not specified";

  return (
    <main className="ui-page ui-platform-page">
      <h1 className="ui-heading-1">Your profile</h1>
      <p className="ui-muted">Review your current profile information.</p>

      <dl className="ui-card ui-profile-summary">
        <div>
          <dt>Display name</dt>
          <dd>{profile.display_name ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Dota nickname</dt>
          <dd>{profile.dota_nickname ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Preferred roles</dt>
          <dd>{preferredRoles}</dd>
        </div>

        <div>
          <dt>Rank</dt>
          <dd>{profile.rank ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Language</dt>
          <dd>{profile.language ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Region</dt>
          <dd>{profile.region ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Bio</dt>
          <dd>{profile.bio ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Availability</dt>
          <dd>
            <Badge tone={profile.looking_for_team ? "success" : "muted"}>
              {profile.looking_for_team ? "Looking for team" : "Not looking for team"}
            </Badge>
          </dd>
        </div>

        <div>
          <dt>Last active</dt>
          <dd>{profile.last_active_at ?? "Not available"}</dd>
        </div>
      </dl>

      <section className="ui-card ui-section" aria-label="Profile actions">
        <h2 className="ui-heading-2">Profile actions</h2>
        <p className="ui-muted">
          Keep your profile current so other players can find you more easily.
        </p>
        <p>
          <Link href="/profile/edit">Edit profile</Link>
        </p>
      </section>
    </main>
  );
}
