"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PageShell from "../Components/PageShell";
import AppPanel from "../Components/AppPanel";

const copingSkillsLibrary = [
  {
    id: 1,
    name: "Deep Breathing Exercise",
    description: "Slow, deep breaths can calm your nervous system.",
    feelingTags: ["stressed", "anxious", "overwhelmed"],
    timeRequired: "< 5 minutes",
    steps: [
      "Find a comfortable position.",
      "Inhale deeply through your nose, counting to 4.",
      "Hold your breath for a count of 4.",
      "Exhale slowly through your mouth, counting to 6.",
      "Repeat several times.",
    ],
  },
  {
    id: 2,
    name: "Mindful Observation",
    description: "Engage your senses to ground yourself in the present moment.",
    feelingTags: ["stressed", "anxious", "disconnected"],
    timeRequired: "< 5 minutes",
    steps: [
      "Pick an object near you.",
      "Observe it carefully — color, shape, texture.",
      "Engage all your senses without judgment.",
    ],
  },
  {
    id: 3,
    name: "Listen to Calming Music",
    description: "Soothing music can help shift your mood.",
    feelingTags: ["low mood", "stressed", "sad"],
    timeRequired: "5-15 minutes",
    steps: [
      "Put on instrumental or calming music.",
      "Focus on the sounds and how they make you feel.",
    ],
  },
  {
    id: 4,
    name: "Quick Walk",
    description: "Gentle movement can boost mood and reduce stress.",
    feelingTags: ["low mood", "stressed", "restless"],
    timeRequired: "10-20 minutes",
    steps: [
      "Step outside if possible.",
      "Take a brisk walk and notice your surroundings.",
    ],
  },
  {
    id: 5,
    name: "Journaling Prompt",
    description: "Writing can provide clarity.",
    feelingTags: ["low mood", "stressed", "confused"],
    timeRequired: "10-15 minutes",
    steps: [
      "Write about what you are feeling right now.",
      "Note what might have triggered it.",
      "Identify one small step to feel a bit better.",
    ],
  },
  {
    id: 6,
    name: "Connect with Someone",
    description: "Talking to someone you trust can help.",
    feelingTags: ["low mood", "lonely", "stressed"],
    timeRequired: "Variable",
    steps: ["Reach out to someone you trust.", "Share how you are feeling."],
  },
  {
    id: 7,
    name: "Engage in a Hobby",
    description: "Enjoyable activities can lift your spirits.",
    feelingTags: ["low mood", "bored", "disconnected"],
    timeRequired: "15+ minutes",
    steps: [
      "Choose a hobby you enjoy.",
      "Dedicate time and let worries fade.",
    ],
  },
  {
    id: 8,
    name: "Progressive Muscle Relaxation",
    description: "Tense and release muscle groups to reduce tension.",
    feelingTags: ["stressed", "anxious", "tense"],
    timeRequired: "15-20 minutes",
    steps: [
      "Tense a muscle group for 5–10 seconds, then release.",
      "Repeat through arms, shoulders, face, and legs.",
    ],
  },
  {
    id: 9,
    name: "Visualize a Calm Place",
    description: "Imagine a peaceful, safe environment.",
    feelingTags: ["stressed", "anxious", "overwhelmed"],
    timeRequired: "< 5 minutes",
    steps: [
      "Close your eyes and picture a calm place.",
      "Engage sight, sound, smell, and touch.",
    ],
  },
  {
    id: 10,
    name: "Do a Puzzle",
    description: "A simple puzzle can distract from worry.",
    feelingTags: ["anxious", "bored", "restless"],
    timeRequired: "10-20 minutes",
    steps: [
      "Choose a simple puzzle.",
      "Focus on solving it.",
    ],
  },
];

const feelingKeywords = [
  ...new Set(copingSkillsLibrary.flatMap((skill) => skill.feelingTags)),
].sort();

const timeOptionsMap = {
  stressed: ["< 5 minutes", "5-15 minutes", "15+ minutes"],
  anxious: ["< 5 minutes", "5-15 minutes", "15+ minutes"],
  overwhelmed: ["< 5 minutes", "5-15 minutes"],
  "low mood": ["5-15 minutes", "15+ minutes"],
  sad: ["5-15 minutes", "15+ minutes"],
  restless: ["10-20 minutes", "15+ minutes"],
  confused: ["5-15 minutes", "15+ minutes"],
  lonely: ["Variable", "5-15 minutes", "15+ minutes"],
  disconnected: ["< 5 minutes", "5-15 minutes", "15+ minutes"],
  bored: ["15+ minutes", "5-15 minutes"],
  tense: ["15-20 minutes", "5-15 minutes", "< 5 minutes"],
};

export default function CopingSkillMatcherPage() {
  const [currentFeeling, setCurrentFeeling] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [timeOptions, setTimeOptions] = useState([
    { value: "", label: "Select time" },
    { value: "< 5 minutes", label: "Less than 5 minutes" },
    { value: "5-15 minutes", label: "5–15 minutes" },
    { value: "15+ minutes", label: "15+ minutes" },
    { value: "Variable", label: "Variable" },
  ]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (currentFeeling) {
      const relevant =
        timeOptionsMap[currentFeeling.toLowerCase()] || [
          "< 5 minutes",
          "5-15 minutes",
          "15+ minutes",
          "Variable",
        ];
      setTimeOptions([
        { value: "", label: "Select time" },
        ...relevant.map((option) => ({ value: option, label: option })),
      ]);
      setAvailableTime("");
    }
  }, [currentFeeling]);

  const handleFindSkills = () => {
    if (!currentFeeling || !availableTime) {
      setSuggestions([]);
      return;
    }

    setSuggestions(
      copingSkillsLibrary.filter((skill) => {
        const feelingMatch = skill.feelingTags.some((tag) =>
          currentFeeling.toLowerCase().includes(tag.toLowerCase())
        );
        const timeMatch = skill.timeRequired.includes(availableTime);
        return feelingMatch && timeMatch;
      })
    );
  };

  const fieldClass =
    "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

  return (
    <PageShell mainClassName="pt-24 sm:pt-28 pb-16 min-h-screen px-4 sm:px-6">
      <div className="container-wide max-w-xl">
        <AppPanel
          title="Find calm & support"
          subtitle="Tell us how you feel and how much time you have — we’ll suggest coping ideas."
        >
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block text-text-muted">
                How are you feeling right now?
              </span>
              <select
                className={fieldClass}
                value={currentFeeling}
                onChange={(e) => setCurrentFeeling(e.target.value)}
              >
                <option value="">Select a feeling</option>
                {feelingKeywords.map((keyword) => (
                  <option key={keyword} value={keyword}>
                    {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block text-text-muted">
                How much time do you have?
              </span>
              <select
                className={fieldClass}
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                disabled={!currentFeeling}
              >
                {timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={handleFindSkills}
              disabled={!currentFeeling || !availableTime}
              className="w-full rounded-full bg-accent py-3 text-sm font-medium text-surface transition-colors hover:bg-accent-hover disabled:opacity-40"
            >
              Find suggestions
            </button>
          </div>

          <AnimatePresence mode="wait">
            {suggestions.length > 0 ? (
              <motion.div
                key="results"
                className="mt-8 max-h-[50vh] space-y-3 overflow-y-auto pr-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <h3 className="text-sm font-medium text-text">Suggestions</h3>
                {suggestions.map((skill) => (
                  <article
                    key={skill.id}
                    className="rounded-xl border border-border bg-surface/60 p-4"
                  >
                    <h4 className="font-medium text-text">{skill.name}</h4>
                    <p className="mt-1 text-sm text-text-muted">{skill.description}</p>
                    {skill.steps?.length ? (
                      <ol className="mt-3 list-decimal list-inside space-y-1 text-sm text-text-muted">
                        {skill.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    ) : null}
                    <p className="mt-2 text-xs text-text-muted">
                      Time: {skill.timeRequired}
                    </p>
                  </article>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {suggestions.length === 0 && currentFeeling && availableTime ? (
            <p className="mt-6 text-sm italic text-text-muted">
              No exact match — try another feeling or time frame.
            </p>
          ) : null}
        </AppPanel>
      </div>
    </PageShell>
  );
}
