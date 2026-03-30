"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!prompt || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: "400px",
        background: "rgba(10,10,10,0.95)",
        border: "1px solid rgba(245,197,24,0.3)",
        borderRadius: "16px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        zIndex: 200,
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <div>
        <p style={{ color: "#fafafa", fontWeight: 600, fontSize: "14px", margin: 0 }}>
          Установить приложение
        </p>
        <p style={{ color: "#71717a", fontSize: "12px", margin: "2px 0 0" }}>
          Добавить dotadeaf на экран
        </p>
      </div>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#71717a",
            fontSize: "13px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Нет
        </button>
        <button
          onClick={async () => {
            await prompt.prompt();
            await prompt.userChoice;
            setDismissed(true);
          }}
          style={{
            background: "#F5C518",
            border: "none",
            borderRadius: "8px",
            color: "#0a0a0a",
            fontSize: "13px",
            fontWeight: 700,
            padding: "6px 14px",
            cursor: "pointer",
          }}
        >
          Установить
        </button>
      </div>
    </div>
  );
}
