"use client";

import { useOnboardingStore } from "@/store/onboarding";
import ProgressDots from "./ProgressDots";
import type { Gender } from "@/lib/types";

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

export default function AboutYouScreen() {
  const { answers, setName, setNickname, setBirthYear, setGender, nextStep, prevStep } =
    useOnboardingStore();

  const canContinue = answers.name.trim().length > 0 && answers.birth_year !== null;

  return (
    <div className="flex flex-col h-full">
      <ProgressDots total={4} current={1} />

      <h2 className="text-xl font-bold text-center mb-1.5">
        Let&rsquo;s get to know you
      </h2>
      <p className="text-sm text-ic-text-light text-center mb-6 leading-snug">
        We&rsquo;ll use this to personalize your experience.&nbsp; Nothing is
        shared.
      </p>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-ic-text mb-1.5">
          Your name
        </label>
        <input
          type="text"
          placeholder="First name"
          value={answers.name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3.5 border-2 border-ic-border rounded-xl text-base text-ic-text bg-ic-input-bg outline-none focus:border-ic-primary-light focus:bg-white placeholder:text-[#C0B8B0] transition-colors"
        />
      </div>

      {/* Nickname */}
      <div className="mb-3">
        <label className="block text-sm font-semibold text-ic-text mb-1.5">
          Childhood nickname{" "}
          <span className="font-normal text-ic-text-light">(optional)</span>
        </label>
        <input
          type="text"
          placeholder="What did people call you as a kid?"
          value={answers.childhood_nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-3.5 border-2 border-ic-border rounded-xl text-base text-ic-text bg-ic-input-bg outline-none focus:border-ic-primary-light focus:bg-white placeholder:text-[#C0B8B0] transition-colors"
        />
      </div>

      <div className="bg-ic-warm-glow rounded-[10px] px-3 py-2.5 text-xs text-ic-text-light text-center leading-snug mb-5">
        If you had a different name as a child, we&rsquo;ll use it when your
        inner child speaks to you.
      </div>

      {/* Birth year + Gender row */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-ic-text mb-1.5">
            Birth year
          </label>
          <input
            type="number"
            placeholder="1990"
            value={answers.birth_year ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setBirthYear(v ? parseInt(v, 10) : null);
            }}
            className="w-full px-4 py-3.5 border-2 border-ic-border rounded-xl text-base text-ic-text bg-ic-input-bg outline-none focus:border-ic-primary-light focus:bg-white placeholder:text-[#C0B8B0] transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-ic-text mb-1.5">
            Gender
          </label>
          <select
            value={answers.gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="w-full px-4 py-3.5 border-2 border-ic-border rounded-xl text-base text-ic-text bg-ic-input-bg outline-none focus:border-ic-primary-light focus:bg-white appearance-none cursor-pointer transition-colors"
          >
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

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
