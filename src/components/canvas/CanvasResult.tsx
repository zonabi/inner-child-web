"use client";

import { useState } from "react";
import { useCanvasStore } from "@/store/canvas";
import { getCanvasImageUrl, downloadCanvasFormat } from "@/lib/api";
import type { OutputFormat } from "@/lib/types";

const FORMAT_LABELS: { key: OutputFormat; label: string }[] = [
  { key: "phone", label: "Phone" },
  { key: "desktop", label: "Desktop" },
  { key: "square", label: "Square" },
  { key: "story", label: "Story" },
];

export default function CanvasResult() {
  const { canvasId, activeFormat, setActiveFormat, goToStep, reset } =
    useCanvasStore();

  const [downloading, setDownloading] = useState(false);
  const [imageError, setImageError] = useState(false);

  /** The real image URL from the backend, or null if no canvas yet. */
  const imageUrl = canvasId
    ? getCanvasImageUrl(canvasId, activeFormat)
    : null;

  async function handleDownload() {
    if (!canvasId) return;
    setDownloading(true);
    try {
      await downloadCanvasFormat(canvasId, activeFormat);
    } catch {
      // Download failed — the browser may have blocked the popup.
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-center mb-4">
        Your Memory Canvas
      </h2>

      {/* Preview area */}
      <div className="flex-1 bg-ic-card rounded-2xl overflow-hidden flex items-center justify-center p-4 min-h-[360px]">
        {imageUrl && !imageError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageUrl}
            alt="Your Memory Canvas"
            className="max-h-full max-w-full rounded-xl object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-center text-ic-text-light p-6">
            <div className="text-5xl mb-3">🎨</div>
            <div className="text-sm font-semibold">
              {imageError
                ? "Couldn't load your canvas.  Try downloading instead."
                : "Your canvas will appear here"}
            </div>
          </div>
        )}
      </div>

      {/* Format tabs */}
      <div className="flex gap-2 justify-center my-4">
        {FORMAT_LABELS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              setActiveFormat(key);
              setImageError(false);
            }}
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
        <button
          onClick={handleDownload}
          disabled={downloading || !canvasId}
          className="p-3.5 rounded-xl text-sm font-semibold bg-ic-primary text-white transition-transform active:scale-[0.97] disabled:opacity-50"
        >
          {downloading ? "Saving..." : "Download"}
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
          onClick={() => reset()}
          className="p-3.5 rounded-xl text-sm font-semibold bg-ic-card text-ic-text transition-transform active:scale-[0.97]"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
