"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type MvpPlayerCardData = {
  id?: string;
  display_name: string;
  dota_nickname: string | null;
  rank: string | null;
  preferred_roles: string[];
  language: string | null;
  region: string | null;
  bio: string | null;
  looking_for_team: boolean;
  avatar_url?: string | null;
  is_online?: boolean;
  chat_href?: string;
};

type PlayerCardProps = {
  player: MvpPlayerCardData;
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "P";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function getRankTheme(rank: string | null): { ring: string; badge: string } {
  const normalizedRank = rank?.toLowerCase() ?? "";

  if (normalizedRank.includes("immortal")) {
    return {
      ring: "ring-amber-400/80",
      badge: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    };
  }

  if (normalizedRank.includes("divine")) {
    return {
      ring: "ring-yellow-400/80",
      badge: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
    };
  }

  if (normalizedRank.includes("ancient")) {
    return {
      ring: "ring-blue-400/80",
      badge: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    };
  }

  if (normalizedRank.includes("legend")) {
    return {
      ring: "ring-teal-400/80",
      badge: "bg-teal-500/20 text-teal-300 border-teal-400/40",
    };
  }

  if (normalizedRank.includes("herald")) {
    return {
      ring: "ring-zinc-400/80",
      badge: "bg-zinc-500/20 text-zinc-300 border-zinc-400/40",
    };
  }

  return {
    ring: "ring-zinc-500/80",
    badge: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
  };
}

function compactText(value: string | null): string {
  if (!value) return "";
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "";
}

export function PlayerCard({ player }: PlayerCardProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const rankTheme = useMemo(() => getRankTheme(player.rank), [player.rank]);
  const showAction = isHovered || isFocused;
  const displayNickname = compactText(player.dota_nickname) || t("common.not_specified");
  const displayRank = compactText(player.rank) || t("common.not_specified");
  const language = compactText(player.language) || t("common.not_specified");
  const region = compactText(player.region) || t("common.not_specified");
  const isOnline = player.is_online ?? true;
  const chatHref = player.chat_href ?? "/login";

  return (
    <motion.article
      className="group relative flex h-full flex-col gap-4 rounded-xl border border-zinc-700/80 bg-zinc-900 p-4 text-zinc-100 transition-shadow duration-200"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      whileHover={{ y: -2 }}
      style={{
        boxShadow: isHovered
          ? "0 0 0 1px rgba(139, 92, 246, 0.6), 0 12px 30px rgba(76, 29, 149, 0.26)"
          : "0 4px 16px rgba(0, 0, 0, 0.25)",
      }}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold ring-2 ${rankTheme.ring}`}>
            {player.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={player.avatar_url}
                alt={t("player_card.avatar_alt", { name: player.display_name })}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span>{getInitials(player.display_name)}</span>
            )}
            {isOnline ? (
              <span
                className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-zinc-900 bg-emerald-400 animate-pulse"
                aria-label={t("player_card.online")}
                title={t("player_card.online")}
              />
            ) : null}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-tight">{player.display_name}</h3>
            <p className="truncate font-mono text-xs text-zinc-400">{displayNickname}</p>
          </div>
        </div>
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${rankTheme.badge}`}
        >
          {displayRank}
        </span>
      </header>

      <div className="flex flex-wrap gap-2">
        {player.preferred_roles.length > 0 ? (
          player.preferred_roles.map((role) => (
            <span
              key={role}
              className="inline-flex rounded-full border border-zinc-700 bg-zinc-800/70 px-2 py-1 text-xs text-zinc-200"
            >
              {role}
            </span>
          ))
        ) : (
          <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-800/70 px-2 py-1 text-xs text-zinc-400">
            {t("player_card.role_not_specified")}
          </span>
        )}
        <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-800/70 px-2 py-1 text-xs text-zinc-300">
          {language}
        </span>
        <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-800/70 px-2 py-1 text-xs text-zinc-300">
          {region}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span
          className={`text-xs ${player.looking_for_team ? "text-emerald-300" : "text-zinc-400"}`}
        >
          {player.looking_for_team
            ? t("player_card.looking_yes")
            : t("player_card.looking_no")}
        </span>

        <AnimatePresence initial={false}>
          {showAction ? (
            <motion.div
              key="start-chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link
                href={chatHref}
                className="inline-flex rounded-md border border-yellow-400/60 bg-yellow-500/20 px-3 py-1.5 text-sm font-medium text-yellow-200 transition-colors hover:bg-yellow-500/30"
              >
                {t("player_card.start_chat")}
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
