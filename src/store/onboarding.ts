import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  OnboardingAnswers,
  OnboardingGoal,
  Gender,
  ComfortLevel,
  UserProfile,
} from "@/lib/types";
import { submitOnboarding } from "@/lib/api";

interface OnboardingState {
  /** Current step (0-indexed, 0 = welcome) */
  step: number;

  /** Animation direction: 1 = forward, -1 = back */
  direction: 1 | -1;

  /** Whether onboarding has been completed */
  completed: boolean;

  /** Collected answers */
  answers: OnboardingAnswers;

  /** User profile (populated after submission) */
  profile: UserProfile | null;

  /** Submission state */
  submitting: boolean;
  error: string | null;

  /** Actions */
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  setName: (name: string) => void;
  setNickname: (nickname: string) => void;
  setBirthYear: (year: number | null) => void;
  setGender: (gender: Gender) => void;
  setCountry: (country: string) => void;
  setChildhoodWord: (word: string) => void;
  toggleGoal: (goal: OnboardingGoal) => void;
  setComfortLevel: (level: ComfortLevel) => void;

  submit: () => Promise<void>;
  reset: () => void;
}

const INITIAL_ANSWERS: OnboardingAnswers = {
  name: "",
  childhood_nickname: "",
  birth_year: null,
  gender: "male",
  country: "",
  childhood_word: "",
  goals: [],
  comfort_level: "gentle",
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      step: 0,
      direction: 1 as const,
      completed: false,
      answers: { ...INITIAL_ANSWERS },
      profile: null,
      submitting: false,
      error: null,

      nextStep: () =>
        set((s) => ({ step: Math.min(s.step + 1, 4), direction: 1 as const })),
      prevStep: () =>
        set((s) => ({ step: Math.max(s.step - 1, 0), direction: -1 as const })),
      goToStep: (step) =>
        set((s) => ({
          step,
          direction: (step > s.step ? 1 : -1) as 1 | -1,
        })),

      setName: (name) =>
        set((s) => ({ answers: { ...s.answers, name } })),
      setNickname: (nickname) =>
        set((s) => ({
          answers: { ...s.answers, childhood_nickname: nickname },
        })),
      setBirthYear: (year) =>
        set((s) => ({ answers: { ...s.answers, birth_year: year } })),
      setGender: (gender) =>
        set((s) => ({ answers: { ...s.answers, gender } })),
      setCountry: (country) =>
        set((s) => ({ answers: { ...s.answers, country } })),
      setChildhoodWord: (word) =>
        set((s) => ({ answers: { ...s.answers, childhood_word: word } })),
      toggleGoal: (goal) =>
        set((s) => {
          const current = s.answers.goals;
          const goals = current.includes(goal)
            ? current.filter((g) => g !== goal)
            : [...current, goal];
          return { answers: { ...s.answers, goals } };
        }),
      setComfortLevel: (level) =>
        set((s) => ({ answers: { ...s.answers, comfort_level: level } })),

      submit: async () => {
        set({ submitting: true, error: null });
        try {
          const profile = await submitOnboarding(get().answers);
          set({ profile, completed: true, submitting: false });
        } catch (e) {
          set({
            error: e instanceof Error ? e.message : "Something went wrong",
            submitting: false,
          });
        }
      },

      reset: () =>
        set({
          step: 0,
          direction: 1 as const,
          completed: false,
          answers: { ...INITIAL_ANSWERS },
          profile: null,
          submitting: false,
          error: null,
        }),
    }),
    {
      name: "inner-child-onboarding",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      // Don't persist transient state
      partialize: (state) => ({
        step: state.step,
        completed: state.completed,
        answers: state.answers,
        profile: state.profile,
      }),
    }
  )
);
