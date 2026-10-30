"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import PageShell from "../Components/PageShell";
import AppPanel from "../Components/AppPanel";

const frequencyOptions = [
  { value: 200, label: "200 Hz (Default)" },
  { value: 150, label: "150 Hz" },
  { value: 250, label: "250 Hz" },
];

const differenceOptions = [
  { value: 10, label: "10 Hz (Default)" },
  { value: 5, label: "5 Hz (Delta — deep sleep)" },
  { value: 15, label: "15 Hz (Beta — alertness)" },
  { value: 20, label: "20 Hz (Beta — high alertness)" },
  { value: 40, label: "40 Hz (Gamma — focus)" },
];

export default function BinauralBeatsPage() {
  const [baseFrequency, setBaseFrequency] = useState(200);
  const [frequencyDifference, setFrequencyDifference] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [oscillatorLeft, setOscillatorLeft] = useState(null);
  const [oscillatorRight, setOscillatorRight] = useState(null);
  const [gainNodeLeft, setGainNodeLeft] = useState(null);
  const [gainNodeRight, setGainNodeRight] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);

    const gainL = audioCtx.createGain();
    const gainR = audioCtx.createGain();
    setGainNodeLeft(gainL);
    setGainNodeRight(gainR);

    const oscL = audioCtx.createOscillator();
    const oscR = audioCtx.createOscillator();
    setOscillatorLeft(oscL);
    setOscillatorRight(oscR);

    oscL.connect(gainL);
    oscR.connect(gainR);
    gainL.connect(audioCtx.destination);
    gainR.connect(audioCtx.destination);

    oscL.start();
    oscR.start();
    gainL.gain.setValueAtTime(0, audioCtx.currentTime);
    gainR.gain.setValueAtTime(0, audioCtx.currentTime);

    return () => {
      oscL.stop();
      oscR.stop();
      audioCtx.close();
    };
  }, []);

  useEffect(() => {
    if (!oscillatorLeft || !oscillatorRight || !audioContext || !gainNodeLeft || !gainNodeRight) {
      return;
    }

    if (isPlaying) {
      oscillatorLeft.frequency.setValueAtTime(
        baseFrequency - frequencyDifference / 2,
        audioContext.currentTime
      );
      oscillatorRight.frequency.setValueAtTime(
        baseFrequency + frequencyDifference / 2,
        audioContext.currentTime
      );
      gainNodeLeft.gain.setValueAtTime(0.35, audioContext.currentTime);
      gainNodeRight.gain.setValueAtTime(0.35, audioContext.currentTime);
    } else {
      gainNodeLeft.gain.setValueAtTime(0, audioContext.currentTime);
      gainNodeRight.gain.setValueAtTime(0, audioContext.currentTime);
    }
  }, [
    baseFrequency,
    frequencyDifference,
    isPlaying,
    oscillatorLeft,
    oscillatorRight,
    audioContext,
    gainNodeLeft,
    gainNodeRight,
  ]);

  const togglePlay = () => {
    if (!audioContext) return;
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    setIsPlaying((p) => !p);
  };

  const fieldClass =
    "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

  return (
    <PageShell mainClassName="relative pt-24 sm:pt-28 pb-16 min-h-screen px-4 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        aria-hidden
      >
        <video autoPlay loop muted playsInline className="h-full w-full object-cover">
          <source src="/beats_b.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-surface/85" />
      </div>

      <div className="container-wide">
        <AppPanel
          title="Binaural harmony"
          subtitle="Tune your mind with Soul Space — adjust frequencies, then press play."
          maxWidth="max-w-3xl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <motion.div
              className="shrink-0"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 8,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear",
              }}
            >
              <Image
                src="/beats.gif"
                alt="Binaural beats visual"
                width={160}
                height={160}
                className="rounded-full border border-border"
              />
            </motion.div>

            <div className="flex-1 w-full space-y-4">
              <label className="block text-sm">
                <span className="mb-1.5 block text-text-muted">Base frequency (Hz)</span>
                <select
                  className={fieldClass}
                  value={baseFrequency}
                  onChange={(e) => setBaseFrequency(parseInt(e.target.value, 10))}
                >
                  {frequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block text-text-muted">Frequency difference (Hz)</span>
                <select
                  className={fieldClass}
                  value={frequencyDifference}
                  onChange={(e) =>
                    setFrequencyDifference(parseInt(e.target.value, 10))
                  }
                >
                  {differenceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={togglePlay}
                disabled={!audioContext}
                className={`w-full rounded-full py-3 text-sm font-medium transition-colors ${
                  isPlaying
                    ? "bg-red-500/90 text-white hover:bg-red-500"
                    : "bg-accent text-surface hover:bg-accent-hover"
                } disabled:opacity-50`}
              >
                {isPlaying ? "Stop" : "Play"}
              </button>

              {audioContext?.state === "suspended" ? (
                <p className="text-xs text-amber-400/90">
                  Tap play once to enable audio in your browser.
                </p>
              ) : null}
            </div>
          </div>
        </AppPanel>
      </div>
    </PageShell>
  );
}
