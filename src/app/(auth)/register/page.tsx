import {
  GoogleSignInButton,
  RegisterForm,
} from "@/components/forms/auth";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const t = await getTranslations();

  return (
    <main className="ui-auth-page">
      <div className="ui-auth-backdrop" aria-hidden>
        <div className="ui-auth-orb ui-auth-orb-gold" />
        <div className="ui-auth-orb ui-auth-orb-red" />
      </div>

      <section className="ui-auth-panel" aria-label={t("auth_page.register_panel")}>
        <header className="ui-auth-header ui-auth-hero">
          <p className="ui-auth-kicker">{t("auth_page.register_panel")}</p>
          <h1 className="ui-heading-1 ui-auth-title">{t("auth_page.register_title")}</h1>
          <p className="ui-muted ui-auth-subtitle">{t("auth_page.register_subtitle")}</p>
        </header>

        <div className="ui-auth-stack">
          <RegisterForm />

          <section aria-label={t("auth_page.or_continue")} className="ui-section ui-auth-card ui-auth-alt-card">
            <h2 className="ui-heading-2 ui-auth-alt-title">{t("auth_page.or_continue")}</h2>
            <GoogleSignInButton label={t("auth_page.register_google")} />
          </section>
        </div>

        <p className="ui-muted ui-auth-switch">
          {t("auth_page.have_account")} <Link href="/login">{t("auth_page.log_in")}</Link>
        </p>
      </section>
    </main>
  );
}
