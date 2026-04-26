"use client";

import { useOnboardingStore } from "@/store/onboarding";

const FEATURE_PEEKS = [
  { icon: "\u{1F5BC}", text: "See yourself as a child again" },
  { icon: "\u{1F3A8}", text: "Create nostalgia art from your memories" },
  { icon: "\u{1F4AC}", text: "Have a conversation with your younger self" },
];

export default function WelcomeScreen() {
  const nextStep = useOnboardingStore((s) => s.nextStep);

  return (
    <div className="flex flex-col h-full">
      {/* Floating icon */}
      <div className="mx-auto mt-8 mb-7 w-24 h-24 rounded-full bg-gradient-to-br from-ic-primary-light to-ic-accent flex items-center justify-center text-5xl animate-gentle-float">
        🌱
      </div>

      <h1 className="text-2xl font-bold text-center mb-3 leading-tight">
        Your inner child
        <br />
        is waiting for you.
      </h1>

      <p className="text-sm text-ic-text-light text-center mb-7 leading-relaxed">
        A gentle, private space to reconnect with the kid you used to be
        &mdash; through art, conversation, and reflection.
      </p>

      {/* Feature peeks */}
      <div className="flex flex-col gap-2.5 mb-7">
        {FEATURE_PEEKS.map((f) => (
          <div
            key={f.text}
            className="flex items-center gap-3 bg-ic-warm-glow px-3.5 py-3 rounded-xl text-sm text-ic-text"
          >
            <span className="text-xl shrink-0">{f.icon}</span>
            <span>{f.text}</span>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      <button
        onClick={nextStep}
        className="w-full bg-ic-primary text-white rounded-[14px] py-4 px-6 text-base font-semibold hover:scale-[0.98] active:scale-[0.96] transition-transform mb-3"
      >
        Get Started
      </button>

      <button className="w-full text-ic-text-light text-sm py-3 hover:text-ic-text transition-colors">
        I already have an account
      </button>
    </div>
  );
}
