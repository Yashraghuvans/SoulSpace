"use client";

import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const features = [
  {
    id: 1,
    name: "Binaural beats",
    subHead: "Heal your mind with sound",
    description: [
      "Two slightly different frequencies in each ear create a perceived tone that can shift mental state.",
      "An immersive, therapeutic listen designed for balance and focus.",
    ],
  },
  {
    id: 2,
    name: "Instant mood booster",
    subHead: "Lift your spirits in seconds",
    description: [
      "Small nudges can change how the day feels.",
      "Science-backed ideas blended with quick, feel-good activities.",
    ],
  },
  {
    id: 3,
    name: "Emotion wheel journaling",
    subHead: "Explore feelings, one layer at a time",
    description: [
      "Identify, label, and process emotions with more clarity.",
      "Bridges the gap between feeling and understanding for healthier regulation.",
    ],
  },
  {
    id: 4,
    name: "Mental health questionnaire",
    subHead: "Understand your mind, one answer at a time",
    description: [
      "A self-assessment for emotional and behavioral well-being.",
      "Helps spot early signs of stress, anxiety, or burnout.",
    ],
  },
  {
    id: 5,
    name: "Coping skill matcher",
    subHead: "Matched to what helps you",
    description: [
      "Personalized strategies for stress, anxiety, and emotional challenges.",
      "Breathing, journaling, movement, grounding, and creative outlets.",
    ],
  },
];

export default function Services() {
  return (
    <section id="features" className="section-pad bg-surface-muted/40 border-t border-border">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Features"
          title="Built for real moments"
          description="Each tool is intentionally minimal — quick to open, easy to use, and respectful of your attention."
        />

        <ol className="relative space-y-6 sm:space-y-8 max-w-3xl mx-auto">
          <div
            className="absolute left-[1.125rem] sm:left-6 top-2 bottom-2 w-px bg-border hidden sm:block"
            aria-hidden
          />
          {features.map((feature, index) => (
            <FadeIn key={feature.id} delay={index * 0.05} y={12}>
              <li className="relative sm:pl-14">
                <span
                  className="absolute left-0 top-1.5 hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-xs font-medium text-accent"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <article className="rounded-2xl border border-border bg-surface-elevated/80 p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-text">{feature.name}</h3>
                  <p className="mt-1 text-sm text-accent">{feature.subHead}</p>
                  <ul className="mt-4 space-y-2">
                    {feature.description.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
