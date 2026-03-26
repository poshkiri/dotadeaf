"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "768px",
          background: "rgba(9,9,11,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.07)",
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
              background: "linear-gradient(135deg, #c0392b, #e74c3c)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          dotadeaf
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { href: "/players", label: "Players" },
            { href: "/patches", label: "Patches" },
            { href: "/about", label: "About" },
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

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
            Log in
          </Link>
          <Link
            href="/register"
            style={{
              background: "#7c3aed",
              color: "white",
              fontSize: "14px",
              fontWeight: 500,
              padding: "6px 16px",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#6d28d9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#7c3aed")}
          >
            Join
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
