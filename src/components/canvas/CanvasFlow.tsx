"use client";

import { useCanvasStore } from "@/store/canvas";
import { useHydrated } from "@/lib/useHydrated";
import AgeSelector from "./AgeSelector";
import InterestPicker from "./InterestPicker";
import MoodSelector from "./MoodSelector";
import FreeTextInput from "./FreeTextInput";
import GenerationLoader from "./GenerationLoader";
import CanvasResult from "./CanvasResult";

/**
 * Orchestrates the 6-screen Memory Canvas flow.
 * Reads the current step from the canvas store and renders
 * the matching screen component with a slide transition.
 */
export default function CanvasFlow() {
  const { step, direction } = useCanvasStore();
  const hydrated = useHydrated();

  // Wait for the store to hydrate from sessionStorage before rendering.
  if (!hydrated) return null;

  const screens = [
    <AgeSelector key="age" />,
    <InterestPicker key="interests" />,
    <MoodSelector key="mood" />,
    <FreeTextInput key="freetext" />,
    <GenerationLoader key="loading" />,
    <CanvasResult key="result" />,
  ];

  const animClass =
    direction === 1 ? "animate-slide-in" : "animate-slide-back";

  return (
    <div key={step} className={`flex flex-col h-full ${animClass}`}>
      {screens[step]}
    </div>
  );
}
