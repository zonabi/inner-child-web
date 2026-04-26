"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding";
import type { ComfortLevel } from "@/lib/types";
import ProgressDots from "./ProgressDots";

const COMFORT_OPTIONS: {
  level: ComfortLevel;
  icon: string;
  label: string;
  description: string;
}[] = [
  {
    level: "gentle",
    icon: "\u{1F331}", // 🌱
    label: "Gentle",
    description:
      "Light reflections, calming exercises, nostalgia and creativity.  Great for getting started.",
  },
  {
    level: "moderate",
    icon: "\u{1F31F}", // 🌟
    label: "Moderate",
    description:
      "Deeper journaling prompts, guided visualizations, and emotional exploration.",
  },
  {
    level: "deep",
    icon: "\u{1F30A}", // 🌊
    label: "Deep",
    description:
      "Intensive reparenting work, trauma processing, and therapeutic exercises.  Best with therapist support.",
  },
];

export default function ReadyScreen() {
  const { answers, setComfortLevel, submit, submitting, prevStep } =
    useOnboardingStore();
  const router = useRouter();

  const handleSubmit = async () => {
    await submit();
    router.push("/home");
  };

  return (
    <div className="flex flex-col h-full">
      <ProgressDots total={4} current={4} />

      <h2 className="text-xl font-bold text-center mb-1.5">One last thing</h2>
      <p className="text-sm text-ic-text-light text-center mb-6 leading-snug">
        Inner child work can bring up big feelings.&nbsp; How deep do you want
        to go?
      </p>

      {/* Comfort level cards */}
      <div className="flex flex-col gap-2.5 mb-5">
        {COMFORT_OPTIONS.map((opt) => {
          const selected = answers.comfort_level === opt.level;
          return (
            <button
              key={opt.level}
              onClick={() => setComfortLevel(opt.level)}
              className={[
                "flex items-start gap-3 px-4 py-3.5 border-2 rounded-[14px] text-left transition-all",
                selected
                  ? "border-ic-primary bg-ic-hover-purple"
                  : "border-ic-border bg-white hover:border-ic-primary-light",
              ].join(" ")}
            >
              {/* Radio */}
              <div
                className={[
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                  selected ? "border-ic-primary" : "border-ic-border",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    selected ? "bg-ic-primary" : "bg-transparent",
                  ].join(" ")}
                />
              </div>

              {/* Text */}
              <div>
                <div className="text-sm font-semibold text-ic-text mb-0.5">
                  {opt.icon}&nbsp;&nbsp;{opt.label}
                </div>
                <div className="text-xs text-ic-text-light leading-snug">
                  {opt.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Reassurance note */}
      <div className="bg-ic-warm-glow rounded-xl px-4 py-3.5 flex gap-2.5 items-start text-sm text-ic-text leading-relaxed">
        <span className="text-lg shrink-0 mt-0.5">💜</span>
        <span>
          You can change this anytime.&nbsp; There&rsquo;s no rush.&nbsp; Go at
          whatever pace feels right for you.
        </span>
      </div>

      <div className="flex-1" />

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-ic-primary text-white rounded-[14px] py-4 px-6 text-base font-semibold hover:scale-[0.98] active:scale-[0.96] transition-transform mb-3 disabled:opacity-60"
      >
        {submitting ? "Setting things up..." : "Meet Your Inner Child"}
      </button>

      <button
        onClick={prevStep}
        disabled={submitting}
        className="w-full text-ic-text-light text-sm py-3 hover:text-ic-text transition-colors disabled:opacity-40"
      >
        Back
      </button>
    </div>
  );
}
