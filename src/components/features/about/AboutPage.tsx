import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function AboutPage() {
  const t = await getTranslations();

  return (
    <main className="about-page" style={{ maxWidth: "800px", margin: "0 auto", padding: "120px 24px 80px" }}>
      <div style={{ marginBottom: "64px" }}>
        <div
          style={{
            width: "40px",
            height: "4px",
            background: "#F5C518",
            borderRadius: "2px",
            marginBottom: "16px",
          }}
        />
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 800,
            color: "#fafafa",
            letterSpacing: "-0.02em",
            margin: "0 0 12px",
          }}
        >
          {t("about.title")}
        </h1>
        <p style={{ color: "#71717a", fontSize: "18px", margin: 0 }}>{t("about.subtitle")}</p>
      </div>

      <div
        className="about-mission-block"
        style={{
          background: "rgba(245,197,24,0.04)",
          border: "1px solid rgba(245,197,24,0.15)",
          borderRadius: "20px",
          padding: "36px 40px",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#F5C518",
            display: "block",
            marginBottom: "12px",
          }}
        >
          {t("about.mission_label")}
        </span>
        <h2 style={{ color: "#fafafa", fontSize: "24px", fontWeight: 700, margin: "0 0 16px" }}>
          {t("about.mission_title")}
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: "16px", lineHeight: "1.7", margin: 0 }}>
          {t("about.mission_text")}
        </p>
      </div>

      <div
        className="about-problem-block"
        style={{
          background: "rgba(239,68,68,0.04)",
          border: "1px solid rgba(239,68,68,0.15)",
          borderRadius: "20px",
          padding: "36px 40px",
          marginBottom: "48px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ef4444",
            display: "block",
            marginBottom: "12px",
          }}
        >
          {t("about.problem_label")}
        </span>
        <h2 style={{ color: "#fafafa", fontSize: "24px", fontWeight: 700, margin: "0 0 16px" }}>
          {t("about.problem_title")}
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: "16px", lineHeight: "1.7", margin: 0 }}>
          {t("about.problem_text")}
        </p>
      </div>

      <h2 style={{ color: "#fafafa", fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>
        {t("about.values_title")}
      </h2>

      <div
        className="about-values-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
          marginBottom: "64px",
        }}
      >
        {[
          { icon: "◈", titleKey: "v1_title", descKey: "v1_desc" },
          { icon: "◉", titleKey: "v2_title", descKey: "v2_desc" },
          { icon: "◍", titleKey: "v3_title", descKey: "v3_desc" },
          { icon: "◎", titleKey: "v4_title", descKey: "v4_desc" },
        ].map((item) => (
          <div
            key={item.titleKey}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                color: "#F5C518",
                display: "block",
                marginBottom: "12px",
              }}
            >
              {item.icon}
            </span>
            <h3 style={{ color: "#fafafa", fontSize: "16px", fontWeight: 600, margin: "0 0 8px" }}>
              {t(`about.${item.titleKey}`)}
            </h3>
            <p style={{ color: "#71717a", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
              {t(`about.${item.descKey}`)}
            </p>
          </div>
        ))}
      </div>

      <div
        className="about-cta-block"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          padding: "48px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#fafafa",
            fontSize: "28px",
            fontWeight: 800,
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}
        >
          {t("about.cta_title")}
        </h2>
        <p style={{ color: "#71717a", fontSize: "16px", margin: "0 0 28px" }}>{t("about.cta_text")}</p>
        <Link
          href="/register"
          style={{
            display: "inline-block",
            background: "#F5C518",
            color: "#0a0a0a",
            fontWeight: 700,
            fontSize: "16px",
            padding: "14px 32px",
            borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(245,197,24,0.3)",
            transition: "all 0.2s",
          }}
        >
          {t("about.cta_button")}
        </Link>
      </div>
    </main>
  );
}
