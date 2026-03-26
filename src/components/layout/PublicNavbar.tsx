"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <nav
        className="flex items-center justify-between w-full max-w-3xl rounded-full border border-white/8 px-5 py-2.5"
        style={{ background: "rgba(9,9,11,0.85)", backdropFilter: "blur(12px)" }}
      >
        <Link href="/" className="flex items-center gap-2 text-white font-semibold text-sm">
          <span className="w-2 h-2 rounded-full bg-violet-500 inline-block" />
          dotadeaf
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/players" className="text-zinc-400 hover:text-white text-sm transition-colors">Players</Link>
          <Link href="/patches" className="text-zinc-400 hover:text-white text-sm transition-colors">Patches</Link>
          <Link href="/about" className="text-zinc-400 hover:text-white text-sm transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="text-zinc-400 hover:text-white text-sm transition-colors px-3 py-1.5">Log in</Link>
          <Link href="/register" className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors">Join</Link>
        </div>
      </nav>
    </motion.header>
  );
}
