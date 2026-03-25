import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="ui-page ui-public-page">
      <section className="ui-card ui-section">
        <h1 className="ui-heading-1">About InterestingDeaf</h1>
        <p className="ui-muted">
          InterestingDeaf is a focused MVP platform for deaf and hard-of-hearing Dota 2
          players. The product keeps core tasks simple: show who you are as a player, find
          compatible teammates, communicate directly, and follow patch updates in Russian.
        </p>
      </section>

      <section className="ui-card ui-section">
        <h2 className="ui-heading-2">What you can do right now</h2>
        <ul className="ui-public-list">
          <li>Create an account and complete your player profile.</li>
          <li>Discover players using practical filters (rank, role, language, region).</li>
          <li>Use one-to-one messaging inside the platform area.</li>
          <li>Read published Russian patch pages.</li>
        </ul>
      </section>

      <section className="ui-card ui-section">
        <h2 className="ui-heading-2">Product principles</h2>
        <p className="ui-muted">
          The experience is intentionally calm, readable, and maintainable. We avoid
          overcomplicated flows and keep each MVP feature honest, clear, and useful.
        </p>
        <p>
          <Link href="/players">Browse players</Link> or{" "}
          <Link href="/register">create your account</Link>.
        </p>
      </section>
    </main>
  );
}
