import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export type MvpPlayerCardData = {
  display_name: string;
  dota_nickname: string | null;
  rank: string | null;
  preferred_roles: string[];
  language: string | null;
  region: string | null;
  bio: string | null;
  looking_for_team: boolean;
};

type PlayerCardProps = {
  player: MvpPlayerCardData;
};

const BIO_PREVIEW_LENGTH = 140;

function getBioPreview(bio: string | null): string | null {
  if (!bio) {
    return null;
  }

  const trimmedBio = bio.trim();
  if (!trimmedBio) {
    return null;
  }

  if (trimmedBio.length <= BIO_PREVIEW_LENGTH) {
    return trimmedBio;
  }

  return `${trimmedBio.slice(0, BIO_PREVIEW_LENGTH).trimEnd()}...`;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const bioPreview = getBioPreview(player.bio);
  const preferredRoles =
    player.preferred_roles.length > 0
      ? player.preferred_roles.join(", ")
      : "Not specified";

  return (
    <article className="ui-card ui-player-card">
      <header className="ui-player-card-header">
        <h3 className="ui-heading-2">{player.display_name}</h3>
        <Badge tone={player.looking_for_team ? "success" : "muted"}>
          {player.looking_for_team ? "Looking for team" : "Not looking for team"}
        </Badge>
      </header>

      <dl className="ui-player-meta">
        <div>
          <dt>Dota nickname</dt>
          <dd>{player.dota_nickname ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Rank</dt>
          <dd>{player.rank ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Preferred roles</dt>
          <dd>{preferredRoles}</dd>
        </div>

        <div>
          <dt>Language</dt>
          <dd>{player.language ?? "Not specified"}</dd>
        </div>

        <div>
          <dt>Region</dt>
          <dd>{player.region ?? "Not specified"}</dd>
        </div>
      </dl>

      {bioPreview ? (
        <p className="ui-muted">
          <strong>Bio:</strong> {bioPreview}
        </p>
      ) : null}

      <p className="ui-muted">
        <Link href="/login">Log in to message this player</Link>
      </p>
    </article>
  );
}
