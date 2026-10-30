"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PageShell from "../Components/PageShell";
import AppPanel from "../Components/AppPanel";

const questions = [
  {
    id: 1,
    text: "How often have you felt down, depressed, or hopeless in the past two weeks?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Several days" },
      { value: 3, label: "More than half the days" },
      { value: 4, label: "Nearly every day" },
      { value: 5, label: "Nearly every day and severely" },
    ],
    stressFactor: 2,
  },
  {
    id: 2,
    text: "How often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Several days" },
      { value: 3, label: "More than half the days" },
      { value: 4, label: "Nearly every day" },
      { value: 5, label: "Nearly every day and significantly impacting daily life" },
    ],
    stressFactor: 3,
  },
  {
    id: 3,
    text: "How would you rate your stress level in general (1 = very low, 10 = very high)?",
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
      value: n,
      label: String(n),
    })),
    stressFactor: 1,
  },
  {
    id: 4,
    text: "How often have you felt worried or anxious in the past two weeks?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Several days" },
      { value: 3, label: "More than half the days" },
      { value: 4, label: "Nearly every day" },
      { value: 5, label: "Nearly every day and causing significant distress" },
    ],
    stressFactor: 2.5,
  },
  {
    id: 5,
    text: "How much interest or pleasure have you had in doing things in the past two weeks?",
    options: [
      { value: 5, label: "Nearly every day" },
      { value: 4, label: "More than half the days" },
      { value: 3, label: "Several days" },
      { value: 2, label: "Not at all" },
      { value: 1, label: "No interest or pleasure in anything" },
    ],
    stressFactor: 2,
  },
];

export default function MentalHealthFormPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [mentalHealthScore, setMentalHealthScore] = useState(null);
  const [mentalAgeScore, setMentalAgeScore] = useState(null);
  const [mentalWellnessSolution, setMentalWellnessSolution] = useState(null);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: parseInt(value, 10) }));
  };

  const calculateScoresAndSolutions = () => {
    let totalMentalHealthScore = 0;
    let totalStressScore = 0;
    let stressCount = 0;

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        totalMentalHealthScore += answer;
        if (question.stressFactor) {
          totalStressScore += answer * question.stressFactor;
          stressCount++;
        }
      }
    });

    const maxPossibleScore = questions.length * 5;
    const calculatedMentalHealthScore = Math.round(
      (totalMentalHealthScore / maxPossibleScore) * 9 + 1
    );
    setMentalHealthScore(calculatedMentalHealthScore);

    if (stressCount > 0) {
      const averageStress = totalStressScore / stressCount;
      const normalizedStress = (averageStress - 1) / 4;
      const mentalAgeEstimate = Math.round(10 + normalizedStress * 20);
      setMentalAgeScore(Math.max(1, Math.min(10, mentalAgeEstimate)));
    } else {
      setMentalAgeScore(null);
    }

    if (calculatedMentalHealthScore <= 3) {
      setMentalWellnessSolution(
        "Prioritize rest and gentle self-care — affirmations, uplifting music, and time in nature can help."
      );
    } else if (calculatedMentalHealthScore <= 6) {
      setMentalWellnessSolution(
        "Try daily stress-reducing habits: binaural audio, breathing exercises, or short walks."
      );
    } else if (calculatedMentalHealthScore <= 9) {
      setMentalWellnessSolution(
        "You’re doing well — keep joy, hobbies, and connection in your routine."
      );
    } else {
      setMentalWellnessSolution(
        "Strong well-being signals — maintain your habits and stay connected to your support system."
      );
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    calculateScoresAndSolutions();
  };

  const reset = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers({});
    setMentalHealthScore(null);
    setMentalAgeScore(null);
    setMentalWellnessSolution(null);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + (showResults ? 1 : 0)) / questions.length) * 100;

  return (
    <PageShell mainClassName="pt-24 sm:pt-28 pb-16 min-h-screen px-4 sm:px-6">
      <div className="container-wide max-w-xl">
        <AppPanel title="Mental wellness check" subtitle="Five questions — about two minutes.">
          <div
            className="mb-6 h-1 overflow-hidden rounded-full bg-surface-muted"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${showResults ? 100 : progress}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-base sm:text-lg font-medium text-text leading-snug">
                  {question.text}
                </h2>
                <div className="mt-4 space-y-2">
                  {question.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface/40 px-3 py-2.5 text-sm text-text-muted transition-colors has-[:checked]:border-accent/40 has-[:checked]:bg-accent-soft has-[:checked]:text-text"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        className="mt-0.5 accent-[var(--color-accent)]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex justify-between gap-3">
                  {currentQuestion > 0 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestion((q) => q - 1)}
                      className="rounded-full border border-border px-5 py-2.5 text-sm text-text-muted hover:bg-white/[0.04]"
                    >
                      Previous
                    </button>
                  ) : (
                    <span />
                  )}
                  {currentQuestion < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestion((q) => q + 1)}
                      disabled={answers[question.id] === undefined}
                      className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-surface hover:bg-accent-hover disabled:opacity-40"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={answers[question.id] === undefined}
                      className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-surface hover:bg-accent-hover disabled:opacity-40"
                    >
                      See results
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center sm:text-left"
              >
                <h2 className="text-xl font-semibold text-text">Your results</h2>
                {mentalHealthScore !== null ? (
                  <p className="mt-3 text-sm text-text-muted">
                    Overall wellness score:{" "}
                    <span className="font-semibold text-text">{mentalHealthScore}/10</span>
                  </p>
                ) : null}
                {mentalAgeScore !== null ? (
                  <p className="mt-1 text-sm text-text-muted">
                    Stress-related score:{" "}
                    <span className="font-semibold text-text">{mentalAgeScore}/10</span>
                  </p>
                ) : null}
                {mentalWellnessSolution ? (
                  <p className="mt-4 text-sm leading-relaxed text-text-muted">
                    {mentalWellnessSolution}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm text-text hover:bg-white/[0.04]"
                >
                  Retake quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </AppPanel>
      </div>
    </PageShell>
  );
}
