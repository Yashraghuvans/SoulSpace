"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

function ToolCard({ data, index }) {
  return (
    <FadeIn delay={index * 0.06} y={20}>
      <motion.article
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
          <Image
            src={data.imgUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated/80 via-transparent to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-text">{data.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
            {data.description}
          </p>
          <Link
            href={data.url}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {data.action}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </motion.article>
    </FadeIn>
  );
}

const cardInformation = [
  {
    title: "Binaural beats",
    description: "Tune your mind with calming frequencies tailored to your state.",
    action: "Open beats",
    url: "/beats",
    imgUrl: "/beats.gif",
  },
  {
    title: "Calm & support",
    description: "Match coping skills to how you feel and the time you have.",
    action: "Find support",
    url: "/copup",
    imgUrl: "/back1.jpg",
  },
  {
    title: "Wellness survey",
    description: "A short check-in to reflect on stress, mood, and rest.",
    action: "Start survey",
    url: "/form",
    imgUrl: "/back3.jpg",
  },
  {
    title: "Emotion journal",
    description: "Name what you feel and capture thoughts in one calm space.",
    action: "Open journal",
    url: "/emotionWheel",
    imgUrl: "/journal.jpg",
  },
];

export default function Cards() {
  return (
    <section id="tools" className="section-pad border-t border-border bg-surface">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Toolkit"
          title="Everything in one calm place"
          description="Four focused experiences — sound, support, reflection, and check-ins — built to work on any screen."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {cardInformation.map((card, index) => (
            <ToolCard key={card.url} data={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
