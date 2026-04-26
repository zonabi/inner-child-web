"use client";

import { useCanvasStore } from "@/store/canvas";
import {
  INTEREST_CATEGORIES,
  INTEREST_SUGGESTIONS,
  type InterestCategory,
} from "@/lib/types";
import CanvasProgressDots from "./CanvasProgressDots";

export default function InterestPicker() {
  const {
    interests,
    activeCategory,
    categoryMemories,
    setActiveCategory,
    toggleInterest,
    setCategoryMemory,
    nextStep,
    prevStep,
  } = useCanvasStore();

  const pickCount = interests.length;
  const canContinue = pickCount >= 3;

  /** Count picks within a single category. */
  function countForCategory(cat: InterestCategory): number {
    return interests.filter((i) => i.category === cat).length;
  }

  /** Check if a specific suggestion is already picked. */
  function isPicked(cat: InterestCategory, value: string): boolean {
    return interests.some((i) => i.category === cat && i.value === value);
  }

  const activeMeta = INTEREST_CATEGORIES.find(
    (c) => c.key === activeCategory
  );
  const activeSuggestions = activeCategory
    ? INTEREST_SUGGESTIONS[activeCategory] ?? []
    : [];

  return (
    <div className="flex flex-col h-full">
      <CanvasProgressDots total={4} current={1} />
      <h2 className="text-xl font-bold text-center mb-1.5">
        What did your world look like?
      </h2>
      <p className="text-sm text-ic-text-light text-center mb-4">
        Pick the things you loved.&nbsp; Tap a category, then choose.
      </p>

      {/* Pick counter */}
      <div className="text-center text-sm text-ic-text-light mb-3">
        <span className="font-bold text-ic-primary">{pickCount}</span> of 3+
        picked
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {INTEREST_CATEGORIES.map((cat) => {
          const count = countForCategory(cat.key);
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() =>
                setActiveCategory(isActive ? null : cat.key)
              }
              className={[
                "rounded-xl p-3.5 border-2 transition-all text-center",
                isActive
                  ? "border-ic-primary bg-ic-hover-purple"
                  : "border-transparent bg-ic-card hover:border-ic-primary-light",
              ].join(" ")}
            >
              <div className="text-2xl mb-1">{cat.emoji}</div>
              <div className="text-xs font-semibold text-ic-text">
                {cat.label}
              </div>
              {count > 0 && (
                <div className="text-[11px] text-ic-primary mt-0.5">
                  {count} picked
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Suggestion panel — visible when a category is expanded */}
      {activeCategory && activeMeta && (
        <div className="bg-ic-card rounded-xl p-4 mb-3">
          <h4 className="text-sm font-semibold text-ic-text mb-2.5">
            {activeMeta.label}
          </h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {activeSuggestions.map((suggestion) => {
              const picked = isPicked(activeCategory, suggestion);
              return (
                <button
                  key={suggestion}
                  onClick={() =>
                    toggleInterest({
                      category: activeCategory,
                      value: suggestion,
                      is_custom: false,
                    })
                  }
                  className={[
                    "px-3.5 py-2 rounded-full text-xs transition-all border-1.5",
                    picked
                      ? "bg-ic-primary text-white border-ic-primary"
                      : "bg-white text-ic-text border-ic-border hover:border-ic-primary",
                  ].join(" ")}
                >
                  {suggestion}
                </button>
              );
            })}
          </div>

          {/* Category memory field */}
          <label className="text-sm font-semibold text-ic-text mb-1.5 block">
            {activeMeta.emoji} Share a {activeMeta.label.toLowerCase()} memory
          </label>
          <textarea
            className="w-full min-h-16 p-3 rounded-xl border-1.5 border-ic-primary-light bg-ic-card text-sm text-ic-text font-[inherit] resize-none outline-none focus:border-ic-primary transition-colors placeholder:text-ic-text-light leading-relaxed"
            placeholder={activeMeta.prompt}
            maxLength={200}
            value={categoryMemories[activeCategory] ?? ""}
            onChange={(e) =>
              setCategoryMemory(activeCategory, e.target.value)
            }
          />
        </div>
      )}

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
          disabled={!canContinue}
          className={[
            "flex-1 rounded-xl py-3.5 px-6 text-base font-semibold transition-opacity",
            canContinue
              ? "bg-ic-primary text-white"
              : "bg-ic-primary text-white opacity-40 cursor-not-allowed",
          ].join(" ")}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
