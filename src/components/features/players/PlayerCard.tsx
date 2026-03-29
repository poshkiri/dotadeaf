"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";

export interface PlayerCardProps {
  id: string;
  display_name: string;
  dota_nickname?: string;
  rank?: string;
  roles?: string[];
  language?: string;
  region?: string;
  looking_for_team?: boolean;
  created_at?: string;
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

const cardBaseStyle: CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "16px",
  padding: "20px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export function PlayerCard({
  display_name,
  dota_nickname,
  rank,
  roles,
  language,
  region,
  looking_for_team,
}: PlayerCardProps) {
  const t = useTranslations("player_card");
  const [hovered, setHovered] = useState(false);

  const rankStyles = useMemo(
    () => (rank?.trim() ? rankBadgeStyle(rank) : null),
    [rank],
  );

  const cardStyle = useMemo((): CSSProperties => {
    if (!hovered) {
      return cardBaseStyle;
    }
    return {
      ...cardBaseStyle,
      borderColor: "rgba(245,197,24,0.35)",
      boxShadow: "0 0 24px rgba(245,197,24,0.06)",
      transform: "translateY(-2px)",
    };
  }, [hovered]);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => setHovered(false), []);

  const metaLeft =
    [region?.trim(), language?.trim()].filter(Boolean).join(" · ") || null;

  return (
    <article
      style={cardStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocusCapture={onEnter}
      onBlurCapture={onLeave}
      tabIndex={0}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F5C518, #d4a017)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0a",
              fontWeight: 800,
              fontSize: 16,
              flexShrink: 0,
            }}
            aria-hidden
          >
            {firstInitial(display_name)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: "#fafafa",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1.25,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {display_name}
            </div>
            {dota_nickname?.trim() ? (
              <div
                style={{
                  color: "#71717a",
                  fontSize: 13,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {dota_nickname}
              </div>
            ) : null}
          </div>
        </div>
        {rank?.trim() && rankStyles ? (
          <span
            style={{
              ...rankStyles,
              fontSize: 12,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 9999,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {rank.trim()}
          </span>
        ) : null}
      </div>

      {roles && roles.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {roles.map((role) => (
            <span
              key={role}
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#a1a1aa",
                fontSize: 12,
                padding: "3px 8px",
                borderRadius: 6,
              }}
            >
              {role}
            </span>
          ))}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: "auto",
        }}
      >
        <span style={{ color: "#71717a", fontSize: 12 }}>
          {metaLeft ?? "\u00a0"}
        </span>
        {looking_for_team ? (
          <span
            style={{
              background: "rgba(245,197,24,0.1)",
              color: "#F5C518",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 9999,
              flexShrink: 0,
            }}
          >
            {t("looking_yes")}
          </span>
        ) : null}
      </div>
    </article>
  );
}
