import {
  AuthFormMessage,
  GoogleSignInButton,
  LoginForm,
} from "@/components/forms/auth";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function resolveAuthErrorMessage(
  errorCode: string | undefined,
  t: Awaited<ReturnType<typeof getTranslations>>,
) {
  switch (errorCode) {
    case "oauth_callback_missing_code":
    case "oauth_callback_exchange_failed":
    case "oauth_callback_user_not_found":
      return t("auth_form.oauth_failed");
    default:
      return undefined;
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const t = await getTranslations();
  const sp = await searchParams;
  const authErrorMessage = resolveAuthErrorMessage(sp.error, t);

  return (
    <main className="ui-auth-page">
      <div className="ui-auth-backdrop" aria-hidden>
        <div className="ui-auth-orb ui-auth-orb-gold" />
        <div className="ui-auth-orb ui-auth-orb-red" />
      </div>

      <section className="ui-auth-panel" aria-label={t("auth_page.login_panel")}>
        <header className="ui-auth-header ui-auth-hero">
          <p className="ui-auth-kicker">{t("auth_page.login_panel")}</p>
          <h1 className="ui-heading-1 ui-auth-title">{t("auth_page.login_title")}</h1>
          <p className="ui-muted ui-auth-subtitle">{t("auth_page.login_subtitle")}</p>
        </header>

        <div className="ui-auth-stack">
          <AuthFormMessage message={authErrorMessage} />
          <LoginForm />

          <section aria-label={t("auth_page.or_continue")} className="ui-section ui-auth-card ui-auth-alt-card">
            <h2 className="ui-heading-2 ui-auth-alt-title">{t("auth_page.or_continue")}</h2>
            <GoogleSignInButton label={t("auth_page.login_google")} />
          </section>
        </div>

        <p className="ui-muted ui-auth-switch">
          {t("auth_page.no_account")} <Link href="/register">{t("auth_page.create_one")}</Link>
        </p>
      </section>
    </main>
  );
}
