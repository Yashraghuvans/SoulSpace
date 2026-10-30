"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/beats", label: "Beats" },
  { href: "/copup", label: "Support" },
  { href: "/emotionWheel", label: "Journal" },
  { href: "/form", label: "Survey" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border,box-shadow] duration-300 ${
          scrolled
            ? "glass-panel border-b border-border shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide flex h-16 sm:h-[4.25rem] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 min-w-0 group"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-elevated">
              <Image
                src="/favicon.ico"
                alt="Soul Space"
                width={40}
                height={40}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </span>
            <span className="hidden sm:block font-medium tracking-tight text-text">
              Soul Space
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-text-muted transition-colors hover:text-text hover:bg-white/[0.04]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/copup"
              className="ml-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
            >
              Get support
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden rounded-lg border border-border p-2.5 text-text"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-black/60 md:hidden"
              aria-label="Close menu overlay"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(100%,20rem)] flex-col gap-1 border-l border-border glass-panel p-6 pt-20 md:hidden"
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-lg text-text hover:bg-white/[0.04]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
