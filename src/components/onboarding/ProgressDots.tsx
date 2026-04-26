"use client";

interface ProgressDotsProps {
  /** Total number of steps (excluding welcome) */
  total: number;
  /** Current step (1-indexed; 0 = welcome, which has no dots) */
  current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex justify-center gap-2 mb-7">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;

        return (
          <div
            key={i}
            className={[
              "h-2 rounded-full transition-all duration-300",
              isActive
                ? "w-6 bg-ic-primary"
                : isDone
                  ? "w-2 bg-ic-primary-light"
                  : "w-2 bg-ic-border",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
