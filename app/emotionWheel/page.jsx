"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import PageShell from "../Components/PageShell";
import AppPanel from "../Components/AppPanel";

const emotionWheel = {
  core: ["Happy", "Sad", "Angry", "Fearful", "Surprised", "Disgusted"],
  secondary: {
    Happy: ["Joyful", "Excited", "Content", "Proud"],
    Sad: ["Lonely", "Depressed", "Grief", "Disappointed"],
    Angry: ["Frustrated", "Irritated", "Furious", "Resentful"],
    Fearful: ["Anxious", "Scared", "Terrified", "Insecure"],
    Surprised: ["Amazed", "Confused", "Astonished", "Shocked"],
    Disgusted: ["Repulsed", "Appalled", "Offended", "Revolted"],
  },
};

export default function EmotionWheelJournalPage() {
  const [selectedCoreEmotion, setSelectedCoreEmotion] = useState("");
  const [selectedSecondaryEmotion, setSelectedSecondaryEmotion] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      emotion: "Happy",
      text: "Had a wonderful morning walk in the park. Grateful for simple moments that bring joy.",
      timestamp: "05/04/2025, 03:42:36",
      topic: "Morning serenity",
      upvotes: 0,
      downvotes: 0,
    },
    {
      id: 2,
      emotion: "Frustrated",
      text: "Debugging took hours — taking a break to reset and return with fresh eyes.",
      timestamp: "04/04/2025, 03:42:36",
      topic: "Coding challenges",
      upvotes: 0,
      downvotes: 0,
    },
  ]);

  const fieldClass =
    "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

  const handleSaveEntry = () => {
    if (!journalEntry.trim()) return;
    const newEntry = {
      id: Date.now(),
      emotion: selectedSecondaryEmotion || selectedCoreEmotion || "Unspecified",
      text: journalEntry.trim(),
      timestamp: new Date().toLocaleString(),
      topic: "Untitled",
      upvotes: 0,
      downvotes: 0,
    };
    setJournalEntries([newEntry, ...journalEntries]);
    setJournalEntry("");
  };

  return (
    <PageShell mainClassName="pt-24 sm:pt-28 pb-16 min-h-screen px-4 sm:px-6">
      <div className="container-wide max-w-3xl">
        <AppPanel
          title="Emotion wheel journal"
          subtitle="Select how you feel, then write freely — your entries stay on this device."
        >
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block text-text-muted">Primary emotion</span>
              <select
                className={fieldClass}
                value={selectedCoreEmotion}
                onChange={(e) => {
                  setSelectedCoreEmotion(e.target.value);
                  setSelectedSecondaryEmotion("");
                }}
              >
                <option value="">Select a core emotion</option>
                {emotionWheel.core.map((emotion) => (
                  <option key={emotion} value={emotion}>
                    {emotion}
                  </option>
                ))}
              </select>
            </label>

            {selectedCoreEmotion ? (
              <label className="block text-sm">
                <span className="mb-1.5 block text-text-muted">More specifically</span>
                <select
                  className={fieldClass}
                  value={selectedSecondaryEmotion}
                  onChange={(e) => setSelectedSecondaryEmotion(e.target.value)}
                >
                  <option value="">Optional refinement</option>
                  {emotionWheel.secondary[selectedCoreEmotion]?.map((emotion) => (
                    <option key={emotion} value={emotion}>
                      {emotion}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <label className="block text-sm">
              <span className="mb-1.5 block text-text-muted">Journal entry</span>
              <textarea
                className={`${fieldClass} min-h-[8rem] resize-y`}
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Start writing here…"
              />
            </label>

            <button
              type="button"
              onClick={handleSaveEntry}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-surface hover:bg-accent-hover"
            >
              Save entry
            </button>
          </div>

          {journalEntries.length > 0 ? (
            <div className="mt-10 space-y-3">
              <h3 className="text-sm font-medium text-text-muted">Past entries</h3>
              {journalEntries.map((entry, index) => (
                <motion.article
                  key={entry.id}
                  className="rounded-xl border border-border bg-surface/50 p-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <div className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-medium text-accent">
                      {entry.emotion.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-text">{entry.topic}</p>
                      <p className="text-xs text-text-muted">
                        {entry.emotion} · {entry.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{entry.text}</p>
                  <div className="mt-3 flex gap-4 text-xs text-text-muted">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 hover:text-accent"
                      onClick={() =>
                        setJournalEntries((prev) =>
                          prev.map((e) =>
                            e.id === entry.id ? { ...e, upvotes: e.upvotes + 1 } : e
                          )
                        )
                      }
                    >
                      <FaThumbsUp /> {entry.upvotes}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 hover:text-red-400"
                      onClick={() =>
                        setJournalEntries((prev) =>
                          prev.map((e) =>
                            e.id === entry.id ? { ...e, downvotes: e.downvotes + 1 } : e
                          )
                        )
                      }
                    >
                      <FaThumbsDown /> {entry.downvotes}
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : null}
        </AppPanel>
      </div>
    </PageShell>
  );
}
