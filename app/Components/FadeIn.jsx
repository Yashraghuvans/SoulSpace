"use client";

import { motion, useReducedMotion } from "motion/react";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 16,
  as: Tag = motion.div,
}) {
  const reduce = useReducedMotion();

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}
