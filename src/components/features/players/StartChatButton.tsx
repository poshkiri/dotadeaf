"use client";

import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export function StartChatButton() {
  const t = useTranslations("player_card");
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? "rgba(245,197,24,0.18)" : "rgba(245,197,24,0.12)",
        color: "#F5C518",
        fontSize: 12,
        fontWeight: 700,
        padding: "8px 12px",
        borderRadius: 9999,
        border: "1px solid rgba(245,197,24,0.28)",
        cursor: pending ? "wait" : "pointer",
      }}
    >
      {pending ? t("starting_chat") : t("start_chat")}
    </button>
  );
}
