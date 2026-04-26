"use client";

import { useCanvasStore } from "@/store/canvas";

export default function GenerationLoader() {
  const { progress, progressMessage, error, goToStep } = useCanvasStore();

  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center px-6">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-3xl mb-6">
          😔
        </div>
        <h2 className="text-xl font-bold text-ic-text mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-ic-text-light mb-8 leading-relaxed">
          {error}
        </p>
        <button
          onClick={() => goToStep(3)}
          className="bg-ic-primary text-white rounded-xl py-3.5 px-8 text-base font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full items-center justify-center text-center">
      {/* Pulsing ring animation */}
      <div className="w-30 h-30 rounded-full bg-ic-hover-purple flex items-center justify-center mb-8 animate-canvas-pulse">
        <div className="w-20 h-20 rounded-full bg-ic-primary flex items-center justify-center text-4xl">
          🎨
        </div>
      </div>

      <div className="text-xl font-semibold text-ic-text mb-2 min-h-[30px] transition-opacity duration-300">
        {progressMessage}
      </div>
      <div className="text-sm text-ic-text-light mb-6">
        This usually takes about 20 seconds
      </div>

      {/* Progress bar */}
      <div className="w-60 h-1.5 bg-ic-border rounded-full overflow-hidden">
        <div
          className="h-full bg-ic-primary rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
