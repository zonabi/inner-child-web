"use client";

import { useCanvasStore } from "@/store/canvas";
import type { OutputFormat } from "@/lib/types";

const FORMAT_LABELS: { key: OutputFormat; label: string }[] = [
  { key: "phone", label: "Phone" },
  { key: "desktop", label: "Desktop" },
  { key: "square", label: "Square" },
  { key: "story", label: "Story" },
];

/** Aspect ratio CSS for the preview container. */
const FORMAT_ASPECT: Record<OutputFormat, string> = {
  phone: "aspect-[9/19.5]",
  desktop: "aspect-[16/9]",
  square: "aspect-square",
  story: "aspect-[9/16]",
};

export default function CanvasResult() {
  const { activeFormat, setActiveFormat, goToStep, reset } = useCanvasStore();

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-center mb-4">
        Your Memory Canvas
      </h2>

      {/* Preview area */}
      <div className="flex-1 bg-ic-card rounded-2xl overflow-hidden flex items-center justify-center p-4 min-h-[360px]">
        <div
          className={[
            "bg-gradient-to-br from-ic-primary-light via-ic-accent to-ic-primary rounded-xl max-h-full max-w-full flex items-center justify-center",
            FORMAT_ASPECT[activeFormat],
          ].join(" ")}
          style={{ width: "100%", maxHeight: "100%" }}
        >
          {/* Placeholder — will show real generated image when backend is wired. */}
          <div className="text-center text-white p-6">
            <div className="text-5xl mb-3">🎨</div>
            <div className="text-sm font-semibold opacity-90">
              Your canvas will appear here
            </div>
            <div className="text-xs opacity-70 mt-1">
              {activeFormat} format
            </div>
          </div>
        </div>
      </div>

      {/* Format tabs */}
      <div className="flex gap-2 justify-center my-4">
        {FORMAT_LABELS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFormat(key)}
            className={[
              "px-4 py-2 rounded-full text-xs font-semibold transition-all",
              activeFormat === key
                ? "bg-ic-primary text-white"
                : "bg-ic-card text-ic-text-light hover:bg-ic-hover-purple",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Action grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <button className="p-3.5 rounded-xl text-sm font-semibold bg-ic-primary text-white transition-transform active:scale-[0.97]">
          Download
        </button>
        <button className="p-3.5 rounded-xl text-sm font-semibold bg-ic-accent text-white transition-transform active:scale-[0.97]">
          Set Wallpaper
        </button>
        <button
          onClick={() => goToStep(1)}
          className="p-3.5 rounded-xl text-sm font-semibold bg-ic-hover-purple text-ic-primary transition-transform active:scale-[0.97]"
        >
          Tweak & Retry
        </button>
        <button
          onClick={() => {
            reset();
          }}
          className="p-3.5 rounded-xl text-sm font-semibold bg-ic-card text-ic-text transition-transform active:scale-[0.97]"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
