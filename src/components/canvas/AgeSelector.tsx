"use client";

import { useCanvasStore } from "@/store/canvas";
import { AGE_GROUPS } from "@/lib/types";
import CanvasProgressDots from "./CanvasProgressDots";

export default function AgeSelector() {
  const { ageGroup, setAgeGroup, nextStep } = useCanvasStore();

  return (
    <div className="flex flex-col h-full">
      <CanvasProgressDots total={4} current={0} />
      <h2 className="text-xl font-bold text-center mb-1.5">
        How old is your inner child?
      </h2>
      <p className="text-sm text-ic-text-light text-center mb-6">
        Pick the age you want to revisit.&nbsp; We&rsquo;ll build a canvas of
        that world.
      </p>

      <div className="flex flex-col gap-3 flex-1">
        {AGE_GROUPS.map((group) => {
          const selected = ageGroup === group.key;
          return (
            <button
              key={group.key}
              onClick={() => setAgeGroup(group.key)}
              className={[
                "flex items-center p-4.5 rounded-2xl border-2.5 transition-all text-left",
                selected
                  ? "border-ic-primary bg-ic-hover-purple"
                  : "border-transparent bg-ic-card hover:border-ic-primary-light",
              ].join(" ")}
            >
              <span className="text-3xl mr-3.5 flex-shrink-0">
                {group.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-base font-bold text-ic-text">
                    {group.label}
                  </span>
                  <span className="text-xs font-semibold text-ic-primary">
                    ages {group.ageRange}
                  </span>
                </div>
                <div className="text-xs text-ic-text-light leading-snug">
                  {group.description}
                </div>
              </div>
              {selected && (
                <div className="w-6 h-6 rounded-full bg-ic-primary flex items-center justify-center text-white text-xs font-bold ml-2 flex-shrink-0">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex-1" />
      <button
        onClick={nextStep}
        className="w-full bg-ic-primary text-white rounded-[14px] py-4 px-6 text-base font-semibold mt-4"
      >
        Continue
      </button>
    </div>
  );
}
