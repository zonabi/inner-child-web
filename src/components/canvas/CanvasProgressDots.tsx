"use client";

/**
 * Progress dots for the Memory Canvas flow.
 * Steps: Age (0) → Interests (1) → Mood (2) → Free Text (3).
 * Steps 4 (loading) and 5 (result) don't show dots.
 */
export default function CanvasProgressDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex gap-2 justify-center mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={[
            "h-2 rounded-full transition-all duration-300",
            i === current
              ? "w-6 bg-ic-primary"
              : i < current
                ? "w-2 bg-ic-safe-green"
                : "w-2 bg-ic-border",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
