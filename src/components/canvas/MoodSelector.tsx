"use client";

import { useCanvasStore } from "@/store/canvas";
import { MOOD_OPTIONS } from "@/lib/types";
import CanvasProgressDots from "./CanvasProgressDots";

export default function MoodSelector() {
  const { mood, setMood, nextStep, prevStep } = useCanvasStore();

  return (
    <div className="flex flex-col h-full">
      <CanvasProgressDots total={4} current={2} />
      <h2 className="text-xl font-bold text-center mb-1.5">
        What&rsquo;s the vibe?
      </h2>
      <p className="text-sm text-ic-text-light text-center mb-6">
        Choose how your Memory Canvas should feel.
      </p>

      <div className="flex flex-col gap-3">
        {MOOD_OPTIONS.map((option) => {
          const selected = mood === option.key;
          return (
            <button
              key={option.key}
              onClick={() => setMood(option.key)}
              className={[
                "p-5 rounded-2xl border-2.5 transition-all text-left",
                selected
                  ? "border-ic-primary bg-ic-hover-purple"
                  : "border-transparent bg-ic-card hover:border-ic-primary-light",
              ].join(" ")}
            >
              <div className="text-base font-bold text-ic-text mb-1">
                {option.label}
              </div>
              <div className="text-xs text-ic-text-light leading-snug mb-2.5">
                {option.description}
              </div>
              {/* Palette preview */}
              <div className="flex gap-1 h-1.5 rounded-full overflow-hidden">
                {option.palette.map((color, i) => (
                  <span
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex-1" />
      <div className="flex gap-3 mt-4">
        <button
          onClick={prevStep}
          className="flex-1 bg-ic-card text-ic-text rounded-xl py-3.5 px-6 text-base font-medium"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="flex-1 bg-ic-primary text-white rounded-xl py-3.5 px-6 text-base font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
