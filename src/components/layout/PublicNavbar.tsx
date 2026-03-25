"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

type PublicNavbarProps = {
  isAuthenticated: boolean;
};

const baseLinks = [
  { href: "/players", label: "Players" },
  { href: "/patches", label: "Patches" },
  { href: "/about", label: "About" },
];

const navTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const };

export function PublicNavbar({ isAuthenticated }: PublicNavbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 50);
  });

  const rightLinks = isAuthenticated
    ? [
        { href: "/messages", label: "Messages", solid: false },
        { href: "/dashboard", label: "Open Platform", solid: true },
      ]
    : [
        { href: "/login", label: "Login", solid: false },
        { href: "/register", label: "Join", solid: true },
      ];

  return (
    <>
      <AnimatePresence>
        {isVisible ? (
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={navTransition}
            className="fixed left-1/2 top-4 z-50 w-[min(95vw,72rem)] -translate-x-1/2"
          >
            <div className="flex items-center justify-between rounded-full border border-violet-400/25 bg-zinc-950/70 px-4 py-2 text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:px-5">
              <Link href="/" className="text-lg font-bold tracking-tight text-violet-400">
                ID
              </Link>

              <nav aria-label="Public navigation" className="hidden items-center gap-6 md:flex">
                {baseLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative text-sm font-medium text-zinc-200 transition-colors hover:text-white"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded bg-violet-400 transition-transform duration-200 group-hover:scale-x-100" />
                  </Link>
                ))}
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                {rightLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      link.solid
                        ? "rounded-full bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
                        : "rounded-full border border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:border-violet-400/40 hover:text-white"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-100 md:hidden"
              >
                <span className="text-xl leading-none">≡</span>
              </button>
            </div>
          </motion.header>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-md md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              className="flex h-full flex-col justify-center gap-6 px-8"
            >
              {[...baseLinks, ...rightLinks].map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: navTransition },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-semibold text-zinc-100"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
