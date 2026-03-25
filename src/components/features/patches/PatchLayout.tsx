"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export type PatchTocItem = {
  id: string;
  label: string;
};

type PatchLayoutProps = {
  children: ReactNode;
  tocItems: PatchTocItem[];
};

export function PatchLayout({ children, tocItems }: PatchLayoutProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.2,
  });

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[55] h-0.5 origin-left bg-violet-500"
        style={{ scaleX: progress }}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,680px)_220px] lg:items-start lg:justify-center">
        <article className="mx-auto w-full max-w-[680px]">{children}</article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 backdrop-blur-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-zinc-400">
              Heroes
            </p>
            {tocItems.length === 0 ? (
              <p className="text-sm text-zinc-500">No section anchors</p>
            ) : (
              <nav aria-label="Patch table of contents" className="flex flex-col gap-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-zinc-300 transition-colors hover:text-violet-300"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
