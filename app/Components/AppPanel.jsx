"use client";

import { motion, useReducedMotion } from "motion/react";

export default function AppPanel({
  title,
  subtitle,
  children,
  className = "",
  maxWidth = "max-w-2xl",
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`glass-panel mx-auto w-full rounded-2xl p-5 sm:p-8 ${maxWidth} ${className}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {title ? (
        <header className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-sm sm:text-base text-text-muted">{subtitle}</p>
          ) : null}
        </header>
      ) : null}
      {children}
    </motion.div>
  );
}
