"use client";

import { useOnboardingStore } from "@/store/onboarding";
import { getDecadeLabel, getNostalgiaPreview } from "@/lib/api";
import ProgressDots from "./ProgressDots";

const COUNTRIES = [
  "United States",
  "Mexico",
  "Canada",
  "United Kingdom",
  "Australia",
  "Japan",
  "South Korea",
  "Brazil",
  "Germany",
  "India",
  "France",
  "Spain",
  "Colombia",
  "Argentina",
  "Philippines",
  "Nigeria",
  "South Africa",
];

export default function ChildhoodScreen() {
  const {
    answers,
    setCountry,
    setChildhoodWord,
    nextStep,
    prevStep,
  } = useOnboardingStore();

  const canContinue = answers.country.length > 0;
  const hasYear = answers.birth_year !== null;
  const decadeLabel = hasYear ? getDecadeLabel(answers.birth_year!) : null;
  const nostalgia =
    hasYear && answers.country
      ? getNostalgiaPreview(answers.birth_year!, answers.country)
      : null;

  return (
    <div className="flex flex-col h-full">
      <ProgressDots total={4} current={2} />

      <h2 className="text-xl font-bold text-center mb-1.5">
        Where did you grow up?
      </h2>
      <p className="text-sm text-ic-text-light text-center mb-6 leading-snug">
        This helps us fill your experience with things from your actual
        childhood.
      </p>

      {/* Country */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-ic-text mb-1.5">
          Country or region
        </label>
        <select
          value={answers.country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full px-4 py-3.5 border-2 border-ic-border rounded-xl text-base text-ic-text bg-ic-input-bg outline-none focus:border-ic-primary-light focus:bg-white appearance-none cursor-pointer transition-colors"
        >
          <option value="" disabled>
            Select your country
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Childhood word */}
      <div className="mb-1">
        <label className="block text-sm font-semibold text-ic-text mb-1.5">
          Describe your childhood in one word
        </label>
        <input
          type="text"
          placeholder="Happy, complicated, adventurous..."
          value={answers.childhood_word}
          onChange={(e) => setChildhoodWord(e.target.value)}
          className="w-full px-4 py-3.5 border-2 border-ic-border rounded-xl text-base text-ic-text bg-ic-input-bg outline-none focus:border-ic-primary-light focus:bg-white placeholder:text-[#C0B8B0] transition-colors"
        />
        <p className="text-[11px] text-ic-text-light mt-1">
          There&rsquo;s no wrong answer.&nbsp; Just whatever comes to mind
          first.
        </p>
      </div>

      {/* Nostalgia preview */}
      {nostalgia && decadeLabel && (
        <div className="mt-5 bg-gradient-to-br from-[#F8F0FF] to-ic-warm-glow rounded-2xl p-4 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ic-primary mb-2.5">
            Your decade: {decadeLabel}
          </div>
          <div className="flex justify-center gap-4 mb-2">
            {nostalgia.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-[22px] shadow-sm">
                  {item.icon}
                </div>
                <span className="text-[10px] text-ic-text-light">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-ic-text-light mt-1">
            We&rsquo;ll personalize your experience with era-specific touches
          </p>
        </div>
      )}

      <div className="flex-1" />

      <button
        onClick={nextStep}
        disabled={!canContinue}
        className="w-full bg-ic-primary text-white rounded-[14px] py-4 px-6 text-base font-semibold hover:scale-[0.98] active:scale-[0.96] transition-transform mb-3 disabled:opacity-40 disabled:pointer-events-none"
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
