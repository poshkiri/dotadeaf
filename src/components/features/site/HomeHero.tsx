"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const headlineWords = ["Find", "your", "silent", "squad"];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.4, ease: "easeOut" },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22, delay: 0.25 },
  },
};

const infoRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.55,
    },
  },
};

const infoItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function HomeHero() {
  return (
    <section className="ui-home-hero" aria-label="Intro">
      <div className="ui-home-hero-ambient" aria-hidden="true" />

      <motion.div
        className="ui-home-hero-main"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          className="ui-home-hero-badge"
          variants={badgeVariants}
          style={{
            border: "1px solid rgba(192,57,43,0.35)",
            boxShadow: "0 0 12px rgba(192,57,43,0.15)",
          }}
        >
          Built for deaf players • Dota 2
        </motion.p>

        <h1 className="ui-home-hero-title">
          {headlineWords.map((word) => (
            <motion.span
              key={word}
              variants={wordVariants}
              className={word === "silent" || word === "squad" ? "ui-home-hero-title-accent" : undefined}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p className="ui-home-hero-subtitle" variants={subtitleVariants}>
          Clear profiles, practical matchmaking filters, one-to-one chat, and Russian patch
          coverage - in one focused platform.
        </motion.p>

        <motion.div className="ui-home-hero-actions" variants={subtitleVariants}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/register" className="ui-home-hero-cta-primary">
              Start finding teammates
            </Link>
          </motion.div>
          <Link href="/players" className="ui-home-hero-cta-secondary">
            Browse players
          </Link>
        </motion.div>

        <motion.div className="ui-home-hero-info-row" variants={infoRowVariants}>
          <motion.div className="ui-home-hero-info-item" variants={infoItemVariants}>
            <span>◈</span>
            <span>Role fit</span>
          </motion.div>
          <motion.div className="ui-home-hero-info-item" variants={infoItemVariants}>
            <span>◉</span>
            <span>Rank clarity</span>
          </motion.div>
          <motion.div className="ui-home-hero-info-item" variants={infoItemVariants}>
            <span>◍</span>
            <span>Region match</span>
          </motion.div>
        </motion.div>
      </motion.div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #09090b)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}