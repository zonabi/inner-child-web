import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  AgeGroupKey,
  Mood,
  InterestPick,
  InterestCategory,
  OutputFormat,
} from "@/lib/types";

// ──────────────────────────────────────────────
// State shape
// ──────────────────────────────────────────────

interface CanvasState {
  /** Current step (0-indexed).  0=age, 1=interests, 2=mood, 3=freetext, 4=loading, 5=result */
  step: number;

  /** Animation direction: 1 = forward, -1 = back */
  direction: 1 | -1;

  /** Selected age group */
  ageGroup: AgeGroupKey;

  /** Picked interests across all categories */
  interests: InterestPick[];

  /** Currently expanded category in the interest picker */
  activeCategory: InterestCategory | null;

  /** Per-category free-text memories */
  categoryMemories: Partial<Record<InterestCategory, string>>;

  /** Selected mood */
  mood: Mood;

  /** Global free-text field (screen 4) */
  additionalContext: string;

  /** Generation state */
  generating: boolean;
  progress: number;
  progressMessage: string;
  error: string | null;

  /** Result */
  canvasId: string | null;
  canvasImageUrl: string | null;
  activeFormat: OutputFormat;

  /** Actions — navigation */
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  /** Actions — age */
  setAgeGroup: (age: AgeGroupKey) => void;

  /** Actions — interests */
  setActiveCategory: (cat: InterestCategory | null) => void;
  toggleInterest: (pick: InterestPick) => void;
  setCategoryMemory: (cat: InterestCategory, text: string) => void;

  /** Actions — mood */
  setMood: (mood: Mood) => void;

  /** Actions — free text */
  setAdditionalContext: (text: string) => void;

  /** Actions — generation */
  startGeneration: () => void;
  setProgress: (progress: number, message: string) => void;
  generationComplete: (canvasId: string, imageUrl: string) => void;
  generationFailed: (error: string) => void;

  /** Actions — result */
  setActiveFormat: (format: OutputFormat) => void;

  /** Reset the whole flow */
  reset: () => void;
}

// ──────────────────────────────────────────────
// Store
// ──────────────────────────────────────────────

export const useCanvasStore = create<CanvasState>()(
  persist(
    (set) => ({
      step: 0,
      direction: 1 as const,
      ageGroup: "kid",
      interests: [],
      activeCategory: null,
      categoryMemories: {},
      mood: "vibrant",
      additionalContext: "",
      generating: false,
      progress: 0,
      progressMessage: "",
      error: null,
      canvasId: null,
      canvasImageUrl: null,
      activeFormat: "phone",

      // Navigation
      nextStep: () =>
        set((s) => ({ step: Math.min(s.step + 1, 5), direction: 1 as const })),
      prevStep: () =>
        set((s) => ({ step: Math.max(s.step - 1, 0), direction: -1 as const })),
      goToStep: (step) =>
        set((s) => ({
          step,
          direction: (step > s.step ? 1 : -1) as 1 | -1,
        })),

      // Age
      setAgeGroup: (ageGroup) => set({ ageGroup }),

      // Interests
      setActiveCategory: (activeCategory) => set({ activeCategory }),
      toggleInterest: (pick) =>
        set((s) => {
          const exists = s.interests.find(
            (i) => i.category === pick.category && i.value === pick.value
          );
          if (exists) {
            return {
              interests: s.interests.filter(
                (i) =>
                  !(i.category === pick.category && i.value === pick.value)
              ),
            };
          }
          return { interests: [...s.interests, pick] };
        }),
      setCategoryMemory: (cat, text) =>
        set((s) => ({
          categoryMemories: { ...s.categoryMemories, [cat]: text },
        })),

      // Mood
      setMood: (mood) => set({ mood }),

      // Free text
      setAdditionalContext: (additionalContext) => set({ additionalContext }),

      // Generation
      startGeneration: () =>
        set({
          generating: true,
          progress: 0,
          progressMessage: "Gathering your memories...",
          error: null,
        }),
      setProgress: (progress, progressMessage) =>
        set({ progress, progressMessage }),
      generationComplete: (canvasId, canvasImageUrl) =>
        set({
          generating: false,
          progress: 100,
          progressMessage: "Done!",
          canvasId,
          canvasImageUrl,
          step: 5,
          direction: 1 as const,
        }),
      generationFailed: (error) =>
        set({ generating: false, error }),

      // Result
      setActiveFormat: (activeFormat) => set({ activeFormat }),

      // Reset
      reset: () =>
        set({
          step: 0,
          direction: 1 as const,
          ageGroup: "kid",
          interests: [],
          activeCategory: null,
          categoryMemories: {},
          mood: "vibrant",
          additionalContext: "",
          generating: false,
          progress: 0,
          progressMessage: "",
          error: null,
          canvasId: null,
          canvasImageUrl: null,
          activeFormat: "phone",
        }),
    }),
    {
      name: "inner-child-canvas",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      // Only persist user-entered data — never loading states or errors.
      partialize: (state) => ({
        step: state.step,
        ageGroup: state.ageGroup,
        interests: state.interests,
        categoryMemories: state.categoryMemories,
        mood: state.mood,
        additionalContext: state.additionalContext,
        canvasId: state.canvasId,
        canvasImageUrl: state.canvasImageUrl,
        activeFormat: state.activeFormat,
      }),
    }
  )
);
