"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding";
import { FEATURES } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const { completed, profile, answers } = useOnboardingStore();

  useEffect(() => {
    if (!completed) {
      router.replace("/onboarding");
    }
  }, [completed, router]);

  if (!completed) return null;

  const name = profile?.name ?? answers.name;
  const goals = profile?.goals ?? answers.goals;

  // Sort features: goal-matching first, then the rest
  const sortedFeatures = [...FEATURES].sort((a, b) => {
    const aMatch = a.goalTags.some((t) => goals.includes(t));
    const bMatch = b.goalTags.some((t) => goals.includes(t));
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-ic-bg">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ic-primary-light to-ic-accent mx-auto mb-4 flex items-center justify-center text-3xl">
            🌱
          </div>
          <h1 className="text-2xl font-bold text-ic-text mb-2">
            Welcome, {name}.
          </h1>
          <p className="text-sm text-ic-text-light leading-relaxed">
            Your inner child is glad you&rsquo;re here.&nbsp; Where would you
            like to start?
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedFeatures.map((feature) => {
            const isRelevant = feature.goalTags.some((t) => goals.includes(t));

            return (
              <button
                key={feature.id}
                disabled={!feature.available}
                className={[
                  "relative text-left p-5 rounded-2xl border-2 transition-all group",
                  feature.available
                    ? "border-ic-border bg-ic-card hover:border-ic-primary-light hover:shadow-md cursor-pointer"
                    : "border-ic-border bg-ic-card opacity-60 cursor-default",
                ].join(" ")}
              >
                {/* Relevance indicator */}
                {isRelevant && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-ic-primary" />
                )}

                <div className="text-2xl mb-3">{feature.icon}</div>
                <div className="text-base font-semibold text-ic-text mb-1">
                  {feature.title}
                </div>
                <div className="text-xs text-ic-text-light leading-snug">
                  {feature.description}
                </div>

                {!feature.available && (
                  <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-ic-primary-light">
                    Coming soon
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Comfort level reminder */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-ic-warm-glow px-4 py-2.5 rounded-full text-xs text-ic-text">
            <span>
              {answers.comfort_level === "gentle"
                ? "🌱"
                : answers.comfort_level === "moderate"
                  ? "🌟"
                  : "🌊"}
            </span>
            <span>
              Comfort level:{" "}
              <span className="font-semibold capitalize">
                {answers.comfort_level}
              </span>
            </span>
            <button
              className="text-ic-primary font-semibold hover:underline ml-1"
              onClick={() => {
                /* TODO: open settings */
              }}
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
