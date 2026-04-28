"use client";

import { useSearchParams } from "next/navigation";
import { useCanvasStore } from "@/store/canvas";
import { useOnboardingStore } from "@/store/onboarding";
import { AGE_GROUPS, getHintPills } from "@/lib/types";
import { generateCanvas, toIsoCountry, type PipelineVersion } from "@/lib/api";
import CanvasProgressDots from "./CanvasProgressDots";

export default function FreeTextInput() {
  const {
    additionalContext,
    setAdditionalContext,
    ageGroup,
    interests,
    mood,
    prevStep,
    goToStep,
    startGeneration,
    setProgress,
    generationComplete,
    generationFailed,
  } = useCanvasStore();

  const { answers } = useOnboardingStore();
  const searchParams = useSearchParams();

  // Dev toggle: add ?pipeline=v1_template to the URL to compare against v1
  const pipelineParam = searchParams.get("pipeline") as PipelineVersion | null;
  const pipelineVersion: PipelineVersion =
    pipelineParam === "v1_template" ? "v1_template" : "v2_enriched";

  const charCount = additionalContext.length;
  const maxChars = 500;

  // Dynamic hints based on age group + selected interests
  const hintPills = getHintPills(ageGroup, interests);

  /** Append a hint pill to the text area. */
  function addHint(text: string) {
    const next = additionalContext
      ? additionalContext + ", " + text
      : text;
    if (next.length <= maxChars) {
      setAdditionalContext(next);
    }
  }

  /** Kick off canvas generation and navigate to the loader. */
  async function handleCreate() {
    const ageConfig = AGE_GROUPS.find((g) => g.key === ageGroup);
    const targetAge = ageConfig?.representativeAge ?? 8;

    startGeneration();
    goToStep(4); // Move to loader screen.

    try {
      const result = await generateCanvas(
        {
          birth_year: answers.birth_year ?? 1990,
          country: toIsoCountry(answers.country || "US"),
          age_group: ageGroup,
          target_age: targetAge,
          interests,
          mood,
          additional_context: additionalContext || undefined,
          pipeline_version: pipelineVersion,
          output_formats: ["phone", "desktop", "square", "story"],
        },
        (progress, message) => {
          setProgress(progress, message);
        }
      );
      generationComplete(result.canvas_id, result.image_url);
    } catch (e) {
      generationFailed(
        e instanceof Error ? e.message : "Something went wrong"
      );
    }
  }

  return (
    <div className="flex flex-col h-full">
      <CanvasProgressDots total={4} current={3} />
      <h2 className="text-xl font-bold text-center mb-1.5">
        Anything else?
      </h2>
      <p className="text-sm text-ic-text-light text-center mb-6">
        Tell us anything about your childhood that matters to you.&nbsp; This is
        optional.
      </p>

      {/* Hint pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {hintPills.map((hint) => (
          <button
            key={hint}
            onClick={() => addHint(hint)}
            className="bg-ic-hover-purple text-ic-primary px-3 py-1.5 rounded-2xl text-xs transition-colors hover:bg-ic-primary hover:text-white"
          >
            {hint}
          </button>
        ))}
      </div>

      {/* Text area */}
      <textarea
        className="w-full min-h-40 p-4 rounded-xl border-2 border-ic-border bg-white text-base text-ic-text font-[inherit] resize-none outline-none focus:border-ic-primary transition-colors placeholder:text-ic-text-light leading-relaxed"
        placeholder="I grew up on a farm... or my favorite spot was the creek behind our house... or I always had my nose in a book..."
        maxLength={maxChars}
        value={additionalContext}
        onChange={(e) => setAdditionalContext(e.target.value)}
      />
      <div className="text-right text-xs text-ic-text-light mt-1.5">
        {charCount}/{maxChars}
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
          onClick={handleCreate}
          className="flex-1 bg-ic-primary text-white rounded-xl py-3.5 px-6 text-base font-semibold"
        >
          Create My Canvas
        </button>
      </div>
    </div>
  );
}
