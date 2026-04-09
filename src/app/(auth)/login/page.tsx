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
      <section className="ui-auth-panel" aria-label={t("auth_page.login_panel")}>
        <header className="ui-auth-header">
          <h1 className="ui-heading-1">{t("auth_page.login_title")}</h1>
          <p className="ui-muted">{t("auth_page.login_subtitle")}</p>
        </header>

        <AuthFormMessage message={authErrorMessage} />

        <LoginForm />

        <hr className="ui-divider" />

        <section aria-label={t("auth_page.or_continue")} className="ui-section ui-card">
          <h2 className="ui-heading-2">{t("auth_page.or_continue")}</h2>
          <GoogleSignInButton label={t("auth_page.login_google")} />
        </section>

        <p className="ui-muted">
          {t("auth_page.no_account")} <Link href="/register">{t("auth_page.create_one")}</Link>
        </p>
      </section>
    </main>
  );
}
