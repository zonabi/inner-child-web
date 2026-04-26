"use client";

import { useOnboardingStore } from "@/store/onboarding";
import { GOAL_OPTIONS, type OnboardingGoal } from "@/lib/types";
import ProgressDots from "./ProgressDots";

export default function GoalsScreen() {
  const { answers, toggleGoal, nextStep, prevStep } = useOnboardingStore();

  return (
    <div className="flex flex-col h-full">
      <ProgressDots total={4} current={3} />

      <h2 className="text-xl font-bold text-center mb-1.5">
        What brings you here?
      </h2>
      <p className="text-sm text-ic-text-light text-center mb-5 leading-snug">
        Pick as many as feel right.&nbsp; You can always change these later.
      </p>

      <div className="flex flex-col gap-2.5 mb-5 overflow-y-auto">
        {GOAL_OPTIONS.map((goal) => {
          const selected = answers.goals.includes(goal.id);
          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={[
                "flex items-center gap-3 px-4 py-3.5 border-2 rounded-[14px] text-left transition-all",
                selected
                  ? "border-ic-primary bg-ic-hover-purple"
                  : "border-ic-border bg-white hover:border-ic-primary-light hover:bg-[#FDFAFF]",
              ].join(" ")}
            >
              {/* Icon */}
              <div
                className={[
                  "w-9 h-9 rounded-[10px] flex items-center justify-center text-lg shrink-0",
                  selected ? "bg-ic-primary-light" : "bg-ic-warm-glow",
                ].join(" ")}
              >
                {goal.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-ic-text">
                  {goal.label}
                </div>
                <div className="text-[11px] text-ic-text-light leading-snug">
                  {goal.description}
                </div>
              </div>

              {/* Check circle */}
              <div
                className={[
                  "w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center text-xs shrink-0 transition-colors",
                  selected
                    ? "bg-ic-primary border-ic-primary text-white"
                    : "border-ic-border text-transparent",
                ].join(" ")}
              >
                ✓
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex-1" />

      <button
        onClick={nextStep}
        className="w-full bg-ic-primary text-white rounded-[14px] py-4 px-6 text-base font-semibold hover:scale-[0.98] active:scale-[0.96] transition-transform mb-3"
      >
        Continue
      </button>

      <button
        onClick={prevStep}
        className="w-full text-ic-text-light text-sm py-3 hover:text-ic-text transition-colors"
      >
        Back
      </button>
    </div>
  );
}
