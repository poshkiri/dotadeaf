"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const baseLinks = [
  { href: "/players", label: "Players" },
  { href: "/patches", label: "Patches" },
  { href: "/about", label: "About" },
];

const navTransition = { duration: 0.4, delay: 0.1, ease: "easeOut" as const };

export function PublicNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={navTransition}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[720px] -translate-x-1/2"
    >
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-[rgba(9,9,11,0.8)] px-5 py-2.5 backdrop-blur-[12px]">
        <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold text-white">
          <span className="text-violet-400">●</span>
          <span>dotadeaf</span>
        </Link>

        <nav aria-label="Public navigation" className="hidden items-center gap-6 md:flex">
          {baseLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-full border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-violet-500"
          >
            Join
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
