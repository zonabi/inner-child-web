"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding";
import { useHydrated } from "@/lib/useHydrated";

/**
 * Root page — redirects to /onboarding or /home
 * based on whether the user has completed onboarding.
 */
export default function RootPage() {
  const router = useRouter();
  const completed = useOnboardingStore((s) => s.completed);
  const hydrated = useHydrated();

  useEffect(() => {
    if (hydrated) {
      router.replace(completed ? "/home" : "/onboarding");
    }
  }, [completed, hydrated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-ic-text-light text-sm">Loading...</div>
    </div>
  );
}
