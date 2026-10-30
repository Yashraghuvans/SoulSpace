"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import DashboardBrowserFrame from "./DashboardBrowserFrame";
import HeroBackground from "./HeroBackground";

const stats = [
  { value: "15K+", label: "Active users" },
  { value: "4", label: "Wellness tools" },
  { value: "90%", label: "Report feeling better" },
];

export default function Main() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden"
    >
      <HeroBackground />

      <div className="container-wide section-pad relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_min(100%,420px)] lg:gap-10 xl:grid-cols-[1fr_440px] xl:gap-14">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.p
              className="mb-4 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-accent"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Mental well-being, simplified
            </motion.p>

            <motion.h1
              className="max-w-xl text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-6xl font-semibold leading-[1.08] tracking-tight text-text"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Your pocket companion for{" "}
              <span className="text-accent">calm and clarity</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-text-muted"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              Breathe, reflect, and find support with gentle tools designed for
              everyday mental wellness — no overwhelm, just space to reset.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
            >
              <Link
                href="#dashboard-preview"
                className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
              >
                See dashboard
              </Link>
              <Link
                href="#tools"
                className="inline-flex min-w-[11rem] items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-text transition-colors hover:bg-white/[0.04]"
              >
                Explore tools
              </Link>
              <Link
                href="/form"
                className="inline-flex min-w-[11rem] items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-text transition-colors hover:bg-white/[0.04]"
              >
                Wellness check
              </Link>
            </motion.div>

            <motion.ul
              className="mt-12 sm:mt-14 grid w-full max-w-lg grid-cols-3 gap-4 sm:gap-6 border-t border-border pt-8 lg:max-w-none"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {stats.map((item) => (
                <li key={item.label} className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-semibold tabular-nums text-text">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-text-muted">{item.label}</p>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-center text-xs font-medium tracking-[0.15em] uppercase text-text-muted lg:text-left">
              Dashboard preview
            </p>
            <DashboardBrowserFrame compact initialFrame={90} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
