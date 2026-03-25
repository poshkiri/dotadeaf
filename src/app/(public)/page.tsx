import Link from "next/link";
import { HomeHero } from "@/components/features/site/HomeHero";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export default function PublicHomePage() {
  return (
    <main className="ui-page ui-public-page">
      <HomeHero />

      <section className="ui-public-value" aria-label="What users can do">
        <AnimatedSection as="h2" className="ui-heading-2" variant="heading">
          How the platform helps in practice
        </AnimatedSection>
        <AnimatedSection className="ui-public-feature-grid" variant="featureCards">
          <article className="ui-card ui-public-feature-card">
            <h3 className="ui-heading-2">Present your play style clearly</h3>
            <p className="ui-muted">
              Set your Dota nickname, rank, role preferences, language, and region so other
              players can quickly understand how you play and whether the fit is real.
            </p>
          </article>

          <article className="ui-card ui-public-feature-card">
            <h3 className="ui-heading-2">Search with structured matchmaking filters</h3>
            <p className="ui-muted">
              Discover players by rank, role, language, region, and availability without
              guessing from incomplete profiles.
            </p>
          </article>

          <article className="ui-card ui-public-feature-card">
            <h3 className="ui-heading-2">Coordinate through direct chat</h3>
            <p className="ui-muted">
              Move from discovery to one-to-one conversation without losing context or clarity.
            </p>
          </article>

          <article className="ui-card ui-public-feature-card">
            <h3 className="ui-heading-2">Stay updated with Russian patch pages</h3>
            <p className="ui-muted">
              Follow published Dota 2 updates in Russian, formatted for easy reading and quick
              scanning.
            </p>
          </article>
        </AnimatedSection>
      </section>

      <section className="ui-public-flow-grid" aria-label="Start paths">
        <AnimatedSection variant="cta">
          <article className="ui-card ui-interactive-card ui-public-flow-card">
            <h2 className="ui-heading-2">New here?</h2>
            <p className="ui-muted">
              Create your account, complete your profile, and start connecting with compatible
              teammates who match your role, language, and expectations.
            </p>
            <p>
              <Link href="/register">Start now</Link>
            </p>
          </article>
        </AnimatedSection>

        <AnimatedSection variant="cta">
          <article className="ui-card ui-interactive-card ui-public-flow-card">
            <h2 className="ui-heading-2">Ready to discover players?</h2>
            <p className="ui-muted">
              Explore the public players listing and narrow results with filters that keep matching
              practical.
            </p>
            <p>
              <Link href="/players">Open players</Link>
            </p>
          </article>
        </AnimatedSection>

        <AnimatedSection variant="cta">
          <article className="ui-card ui-interactive-card ui-public-flow-card">
            <h2 className="ui-heading-2">Need game update context?</h2>
            <p className="ui-muted">
              Read published patch pages in Russian to stay current with Dota 2 changes.
            </p>
            <p>
              <Link href="/patches">Read patches</Link>
            </p>
          </article>
        </AnimatedSection>
      </section>
    </main>
  );
}
