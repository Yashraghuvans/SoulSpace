"use client";

import DashboardBrowserFrame from "./DashboardBrowserFrame";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const DETAILS = [
  {
    title: "Unified overview",
    body: "Wellness score, streaks, calm minutes, and journal counts in one glance.",
  },
  {
    title: "Trends & history",
    body: "Weekly mood bars plus a trend line — the same charts you’d see after real check-ins.",
  },
  {
    title: "Actionable next steps",
    body: "Recent activity, quick actions, and suggestions for beats, support, and surveys.",
  },
];

export default function DashboardPreviewSection() {
  return (
    <section
      id="dashboard-preview"
      className="section-pad border-t border-border bg-surface-muted/30"
    >
      <div className="container-wide">
        <SectionHeading
          eyebrow="Product preview"
          title="Your wellness dashboard"
          description="Animated mock of the Soul Space hub — sidebar, stats, charts, activity feed, and recommendations. Sample data for layout only."
        />

        <FadeIn className="relative mx-auto max-w-5xl">
          <DashboardBrowserFrame initialFrame={60} />
          <p className="mt-3 text-center text-xs text-text-muted">
            Loops automatically · click hero mini-preview for the full view below
          </p>
        </FadeIn>

        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {DETAILS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08} y={12}>
              <li className="rounded-2xl border border-border bg-surface-elevated/80 p-5 sm:p-6">
                <h3 className="text-base font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
