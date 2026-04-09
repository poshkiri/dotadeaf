"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { StartChatButton } from "./StartChatButton";

export interface PlayerCardProps {
  id: string;
  user_id?: string;
  display_name: string;
  dota_nickname?: string;
  rank?: string;
  roles?: string[];
  language?: string;
  region?: string;
  looking_for_team?: boolean;
  created_at?: string;
  current_user_id?: string;
  start_chat_action?: (formData: FormData) => void | Promise<void>;
}

function firstInitial(name: string): string {
  const c = name.trim().slice(0, 1);
  return c ? c.toUpperCase() : "?";
}

function rankBadgeStyle(rank: string): { background: string; color: string } {
  const r = rank.trim().toLowerCase();
  if (r.includes("herald") || r.includes("guardian")) {
    return { background: "rgba(139,90,60,0.2)", color: "#b07040" };
  }
  if (r.includes("crusader") || r.includes("archon")) {
    return { background: "rgba(100,149,237,0.15)", color: "#6495ed" };
  }
  if (r.includes("legend")) {
    return { background: "rgba(80,200,120,0.15)", color: "#50c878" };
  }
  if (r.includes("ancient")) {
    return { background: "rgba(100,100,220,0.15)", color: "#7b7bdc" };
  }
  if (r.includes("divine")) {
    return { background: "rgba(180,140,60,0.15)", color: "#c8a830" };
  }
  if (r.includes("immortal")) {
    return { background: "rgba(220,80,80,0.15)", color: "#dc5050" };
  }
  return { background: "rgba(255,255,255,0.08)", color: "#a1a1aa" };
}

export function PlayerCard({
  user_id,
  display_name,
  dota_nickname,
  rank,
  roles,
  language,
  region,
  looking_for_team,
  current_user_id,
  start_chat_action,
}: PlayerCardProps) {
  const t = useTranslations("player_card");

  const rankStyles = useMemo(
    () => (rank?.trim() ? rankBadgeStyle(rank) : null),
    [rank],
  );

  const metaLeft =
    [region?.trim(), language?.trim()].filter(Boolean).join(" · ") || null;
  const canStartChat =
    Boolean(start_chat_action) &&
    Boolean(user_id) &&
    (!current_user_id || current_user_id !== user_id);

  return (
    <article className="ui-player-card-premium" tabIndex={0}>
      <div className="ui-player-card-premium-glow" aria-hidden />
      <div className="ui-player-card-premium-head">
        <div className="ui-player-card-identity">
          <div className="ui-player-card-avatar" aria-hidden>
            {firstInitial(display_name)}
          </div>
          <div className="ui-player-card-copy">
            <div className="ui-player-card-name">{display_name}</div>
            {dota_nickname?.trim() ? (
              <div className="ui-player-card-nickname">
                {dota_nickname}
              </div>
            ) : null}
          </div>
        </div>
        {rank?.trim() && rankStyles ? (
          <span className="ui-player-rank-badge" style={rankStyles}>
            {rank.trim()}
          </span>
        ) : null}
      </div>

      {roles && roles.length > 0 ? (
        <div className="ui-player-card-tags">
          {roles.map((role) => (
            <span key={role} className="ui-player-card-tag">{role}</span>
          ))}
        </div>
      ) : null}

      <div className="ui-player-card-footer">
        <span className="ui-player-card-meta">{metaLeft ?? "\u00a0"}</span>
        <div className="ui-player-card-actions">
          {looking_for_team ? (
            <span className="ui-player-card-status">
              {t("looking_yes")}
            </span>
          ) : null}
          {canStartChat ? (
            <form action={start_chat_action}>
              <input type="hidden" name="other_user_id" value={user_id} />
              <StartChatButton />
            </form>
          ) : null}
        </div>
      </div>
    </article>
  );
}
