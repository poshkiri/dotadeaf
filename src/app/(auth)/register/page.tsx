import {
  GoogleSignInButton,
  RegisterForm,
} from "@/components/forms/auth";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function RegisterPage() {
  const t = await getTranslations();

  return (
    <main className="ui-auth-page">
      <section className="ui-auth-panel" aria-label={t("auth_page.register_panel")}>
        <header className="ui-auth-header">
          <h1 className="ui-heading-1">{t("auth_page.register_title")}</h1>
          <p className="ui-muted">{t("auth_page.register_subtitle")}</p>
        </header>

        <RegisterForm />

        <hr className="ui-divider" />

        <section aria-label={t("auth_page.or_continue")} className="ui-section ui-card">
          <h2 className="ui-heading-2">{t("auth_page.or_continue")}</h2>
          <GoogleSignInButton label={t("auth_page.register_google")} />
        </section>

        <p className="ui-muted">
          {t("auth_page.have_account")} <Link href="/login">{t("auth_page.log_in")}</Link>
        </p>
      </section>
    </main>
  );
}
