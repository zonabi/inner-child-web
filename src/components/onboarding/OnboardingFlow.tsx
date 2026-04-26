"use client";

import { useOnboardingStore } from "@/store/onboarding";
import WelcomeScreen from "./WelcomeScreen";
import AboutYouScreen from "./AboutYouScreen";
import ChildhoodScreen from "./ChildhoodScreen";
import GoalsScreen from "./GoalsScreen";
import ReadyScreen from "./ReadyScreen";

const SCREENS = [
  WelcomeScreen,
  AboutYouScreen,
  ChildhoodScreen,
  GoalsScreen,
  ReadyScreen,
];

export default function OnboardingFlow() {
  const step = useOnboardingStore((s) => s.step);
  const direction = useOnboardingStore((s) => s.direction);
  const Screen = SCREENS[step] ?? WelcomeScreen;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-ic-bg">
      {/* Phone-style container — max-width keeps it feeling like a mobile app */}
      <div className="w-full max-w-[400px] min-h-[680px] bg-ic-card rounded-[32px] border-2 border-ic-border shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Status bar */}
        <div className="h-11 bg-ic-card flex items-center justify-center text-xs font-semibold text-ic-text border-b border-ic-border">
          Inner Child
        </div>

        {/* Screen content — key forces remount on step change for animation */}
        <div className="px-5 py-6 h-[calc(100%-44px)] min-h-[620px] flex flex-col overflow-hidden">
          <div
            key={step}
            className={direction === 1 ? "animate-slide-in" : "animate-slide-back"}
          >
            <Screen />
          </div>
        </div>
      </div>
    </div>
  );
}
