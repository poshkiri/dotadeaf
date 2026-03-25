import Link from "next/link";

export default function PublicHomePage() {
  return (
    <main className="ui-page ui-public-page">
      <section className="ui-public-hero" aria-label="Intro">
        <div className="ui-public-hero-main">
          <p className="ui-public-eyebrow">InterestingDeaf</p>
          <h1 className="ui-heading-1">
            A Dota 2 platform built for deaf and hard-of-hearing players
          </h1>
          <p className="ui-muted">
            InterestingDeaf exists for matches where communication and role fit matter. It
            combines structured player profiles, practical discovery, one-to-one chat, and
            Russian-language patch coverage in a focused, distraction-free experience.
          </p>
          <div className="ui-inline-actions ui-public-hero-actions">
            <Link href="/register" className="ui-button">
              Start finding teammates
            </Link>
            <Link href="/players">Find players</Link>
            <Link href="/patches">Read patches</Link>
          </div>
        </div>
        <aside className="ui-public-hero-side" aria-label="Product focus">
          <div className="ui-public-hero-meta" aria-label="Product context">
            <span>Dota 2</span>
            <span>Deaf & hard-of-hearing first</span>
            <span>Russian patch coverage</span>
          </div>
          <h2 className="ui-heading-2">Built for real communication</h2>
          <ul className="ui-public-list">
            <li>Designed for players who need communication to stay clear from the first match.</li>
            <li>Structured profiles reduce random teammate mismatches.</li>
            <li>Focused product flow without noisy, unnecessary features.</li>
          </ul>
        </aside>
      </section>

      <section className="ui-public-value" aria-label="What users can do">
        <h2 className="ui-heading-2">How the platform helps in practice</h2>
        <div className="ui-public-feature-grid">
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
        </div>
      </section>

      <section className="ui-public-flow-grid" aria-label="Start paths">
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

        <article className="ui-card ui-interactive-card ui-public-flow-card">
          <h2 className="ui-heading-2">Need game update context?</h2>
          <p className="ui-muted">
            Read published patch pages in Russian to stay current with Dota 2 changes.
          </p>
          <p>
            <Link href="/patches">Read patches</Link>
          </p>
        </article>
      </section>
    </main>
  );
}
