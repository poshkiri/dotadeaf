"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "ru" ? "en" : "ru";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: "16px",
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
      }}
    >
      <nav
        className="navbar-pill"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "768px",
          background: "rgba(9,9,11,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(245,197,24,0.12)",
          borderRadius: "9999px",
          padding: "8px 20px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "white",
            fontWeight: 600,
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#F5C518",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          {t("common.brand")}
        </Link>

        <div className="navbar-links" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { href: "/players", label: t("nav.players") },
            { href: "/patches", label: t("nav.patches") },
            { href: "/about", label: t("nav.about") },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "#a1a1aa",
                fontSize: "14px",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: nextLocale })}
            style={{
              border: "1px solid rgba(245,197,24,0.25)",
              borderRadius: "9999px",
              background: "transparent",
              color: "#a1a1aa",
              fontSize: "12px",
              padding: "4px 10px",
              transition: "color 0.15s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C518")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
            aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
          >
            {locale.toUpperCase()}
          </button>
          <Link
            href="/login"
            style={{
              color: "#a1a1aa",
              fontSize: "14px",
              textDecoration: "none",
              padding: "6px 12px",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/register"
            style={{
              background: "#F5C518",
              color: "#0a0a0a",
              fontSize: "14px",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d4a017")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F5C518")}
          >
            {t("nav.join")}
          </Link>
        </div>

        <button
          type="button"
          className="navbar-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            cursor: "pointer",
            padding: "8px",
            background: "transparent",
            border: "none",
          }}
        >
          <span
            style={{
              width: "22px",
              height: "2px",
              background: "#fafafa",
              borderRadius: "2px",
              transition: "all 0.2s",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              width: "22px",
              height: "2px",
              background: "#fafafa",
              borderRadius: "2px",
              transition: "all 0.2s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: "22px",
              height: "2px",
              background: "#fafafa",
              borderRadius: "2px",
              transition: "all 0.2s",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {menuOpen ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "70px",
            background: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(12px)",
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            padding: "16px",
          }}
        >
          {[
            { href: "/players", label: t("nav.players") },
            { href: "/patches", label: t("nav.patches") },
            { href: "/about", label: t("nav.about") },
          ].map(({ href, label }) => (
            <Link
              key={`mobile-${href}`}
              href={href}
              style={{
                fontSize: "24px",
                color: "#fafafa",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C518")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#fafafa")}
            >
              {label}
            </Link>
          ))}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              width: "100%",
              maxWidth: "280px",
            }}
          >
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#a1a1aa",
                fontSize: "14px",
                textDecoration: "none",
                border: "1px solid rgba(245,197,24,0.25)",
                borderRadius: "9999px",
                padding: "10px 12px",
              }}
            >
              {t("nav.login")}
            </Link>
            <Link
              href="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F5C518",
                color: "#0a0a0a",
                fontSize: "14px",
                fontWeight: 700,
                padding: "10px 12px",
                borderRadius: "9999px",
                textDecoration: "none",
              }}
            >
              {t("nav.join")}
            </Link>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}
