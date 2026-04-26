"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding";
import CanvasFlow from "@/components/canvas/CanvasFlow";

export default function CanvasPage() {
  const router = useRouter();
  const { completed } = useOnboardingStore();

  // Guard: redirect to onboarding if the user hasn't completed it.
  useEffect(() => {
    if (!completed) {
      router.replace("/onboarding");
    }
  }, [completed, router]);

  if (!completed) return null;

  return (
    <div className="min-h-screen bg-ic-bg">
      <div className="max-w-lg mx-auto px-6 py-10 h-screen flex flex-col">
        {/* Back to home link */}
        <button
          onClick={() => router.push("/home")}
          className="text-sm text-ic-text-light hover:text-ic-primary transition-colors mb-4 self-start"
        >
          &larr; Back to home
        </button>

        <div className="flex-1 flex flex-col min-h-0">
          <CanvasFlow />
        </div>
      </div>
    </div>
  );
}
