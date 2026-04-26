/**
 * Inner Child — Web App Types
 *
 * Mirrors the shared types from dev/shared/types.ts,
 * adapted for the web MVP.
 */

export type Gender = "male" | "female" | "non-binary" | "other";

export type ComfortLevel = "gentle" | "moderate" | "deep";

export type OnboardingGoal =
  | "heal_old_wounds"
  | "understand_myself"
  | "find_calm"
  | "see_younger_self"
  | "improve_relationships"
  | "just_curious";

export interface OnboardingAnswers {
  name: string;
  childhood_nickname: string;
  birth_year: number | null;
  gender: Gender;
  country: string;
  childhood_word: string;
  goals: OnboardingGoal[];
  comfort_level: ComfortLevel;
}

export interface UserProfile {
  id: string;
  name: string;
  childhood_nickname?: string;
  birth_year: number;
  country: string;
  gender: Gender;
  comfort_level: ComfortLevel;
  goals: OnboardingGoal[];
  childhood_word: string;
  onboarding_completed: boolean;
  created_at: string;
}

/** Feature cards shown on the home dashboard */
export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  goalTags: OnboardingGoal[];
  available: boolean;
}

/** Goal metadata for the onboarding screen */
export interface GoalOption {
  id: OnboardingGoal;
  label: string;
  description: string;
  icon: string;
}

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: "heal_old_wounds",
    label: "Heal old wounds",
    description: "Process difficult childhood memories",
    icon: "\u{1F49C}", // 💜
  },
  {
    id: "understand_myself",
    label: "Understand myself better",
    description: "See how my childhood shaped who I am",
    icon: "\u{1F50C}", // 🔬  — using magnifying glass instead
  },
  {
    id: "find_calm",
    label: "Find calm",
    description: "Reduce stress and feel more grounded",
    icon: "\u{1F33F}", // 🌿
  },
  {
    id: "see_younger_self",
    label: "See my younger self",
    description: "AI portraits, memory art, nostalgia",
    icon: "\u{1F441}", // 👁
  },
  {
    id: "improve_relationships",
    label: "Improve my relationships",
    description: "Understand my patterns and triggers",
    icon: "\u{1F91D}", // 🤝
  },
  {
    id: "just_curious",
    label: "Just curious",
    description: "I want to explore and see what this is",
    icon: "\u{1F4A1}", // 💡
  },
];

export const FEATURES: FeatureCard[] = [
  {
    id: "portrait",
    title: "AI Child Portrait",
    description: "See what you looked like as a child",
    icon: "\u{1F5BC}", // 🖼
    href: "/portrait",
    goalTags: ["see_younger_self", "heal_old_wounds", "just_curious"],
    available: false,
  },
  {
    id: "memory-canvas",
    title: "Memory Canvas",
    description: "Create nostalgia wallpaper from your memories",
    icon: "\u{1F3A8}", // 🎨
    href: "/canvas",
    goalTags: ["see_younger_self", "just_curious", "find_calm"],
    available: false,
  },
  {
    id: "journal",
    title: "Inner Child Journal",
    description: "Write with your non-dominant hand",
    icon: "\u{270D}", // ✍
    href: "/journal",
    goalTags: ["heal_old_wounds", "understand_myself"],
    available: false,
  },
  {
    id: "companion",
    title: "Talk to Your Inner Child",
    description: "A conversation with your younger self",
    icon: "\u{1F4AC}", // 💬
    href: "/companion",
    goalTags: ["heal_old_wounds", "understand_myself", "improve_relationships"],
    available: false,
  },
  {
    id: "meditation",
    title: "Guided Meditations",
    description: "Inner child visualizations and reparenting",
    icon: "\u{1F338}", // 🌸
    href: "/meditation",
    goalTags: ["find_calm", "heal_old_wounds"],
    available: false,
  },
  {
    id: "letter",
    title: "Letter Exchange",
    description: "Write to your younger self and hear back",
    icon: "\u{1F48C}", // 💌
    href: "/letter",
    goalTags: ["heal_old_wounds", "understand_myself", "just_curious"],
    available: false,
  },
  {
    id: "timeline",
    title: "Emotional Timeline",
    description: "Map your memories across your life",
    icon: "\u{1F4C5}", // 📅
    href: "/timeline",
    goalTags: ["understand_myself", "improve_relationships"],
    available: false,
  },
  {
    id: "body-scan",
    title: "Body Scan",
    description: "Where do you feel your emotions?",
    icon: "\u{1F9D8}", // 🧘
    href: "/body-scan",
    goalTags: ["find_calm", "heal_old_wounds"],
    available: false,
  },
];
