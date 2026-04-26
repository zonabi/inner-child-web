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

// ──────────────────────────────────────────────
// Memory Canvas Types
// ──────────────────────────────────────────────

export type Mood = "vibrant" | "calm" | "dreamy";

export type CanvasMetaphor =
  | "bedroom_floor"
  | "fridge_door"
  | "crayon_paper"
  | "bedroom_wall"
  | "trapper_keeper"
  | "toy_shelf"
  | "locker_door"
  | "skateboard_deck"
  | "mixtape_cover"
  | "band_poster_wall"
  | "zine_cover"
  | "vhs_sleeve";

export type InterestCategory =
  | "entertainment"
  | "music"
  | "games_and_play"
  | "toys_and_objects"
  | "food_and_candy"
  | "places_and_outdoors"
  | "fashion_and_style"
  | "school_and_friends";

export type OutputFormat = "phone" | "desktop" | "square" | "story";

export type AgeGroupKey = "little_kid" | "kid" | "tween" | "teen";

export interface AgeGroupConfig {
  key: AgeGroupKey;
  label: string;
  ageRange: string;
  representativeAge: number;
  metaphors: CanvasMetaphor[];
  emoji: string;
  description: string;
}

export const AGE_GROUPS: AgeGroupConfig[] = [
  {
    key: "little_kid",
    label: "Little Kid",
    ageRange: "3–5",
    representativeAge: 4,
    metaphors: ["bedroom_floor", "fridge_door", "crayon_paper"],
    emoji: "\u{1F9F8}", // 🧸
    description: "Scattered toys on the carpet, crayon drawings on the fridge",
  },
  {
    key: "kid",
    label: "Kid",
    ageRange: "6–9",
    representativeAge: 8,
    metaphors: ["bedroom_wall", "toy_shelf"],
    emoji: "\u{1F3E0}", // 🏠
    description: "Posters and stickers taped to your bedroom wall",
  },
  {
    key: "tween",
    label: "Tween",
    ageRange: "10–14",
    representativeAge: 12,
    metaphors: ["trapper_keeper", "skateboard_deck", "locker_door"],
    emoji: "\u{1F4CB}", // 📋
    description: "Doodle-covered binders and sticker-bombed skateboards",
  },
  {
    key: "teen",
    label: "Teen",
    ageRange: "15–17",
    representativeAge: 16,
    metaphors: ["mixtape_cover", "band_poster_wall", "zine_cover"],
    emoji: "\u{1F4FC}", // 📼
    description: "Mixtape art, band posters plastered wall-to-wall",
  },
];

export interface InterestPick {
  category: InterestCategory;
  value: string;
  is_custom: boolean;
}

export interface CategoryMeta {
  key: InterestCategory;
  label: string;
  emoji: string;
  prompt: string;
}

export const INTEREST_CATEGORIES: CategoryMeta[] = [
  {
    key: "entertainment",
    label: "Entertainment",
    emoji: "\u{1F4FA}", // 📺
    prompt:
      "What shows, movies, or books do you remember?  What did you watch after school?",
  },
  {
    key: "music",
    label: "Music",
    emoji: "\u{1F3B5}", // 🎵
    prompt:
      "What songs or artists take you back?  Did you make mixtapes or listen to the radio?",
  },
  {
    key: "games_and_play",
    label: "Games & Play",
    emoji: "\u{1F3AE}", // 🎮
    prompt:
      "What games did you play?  Board games, outdoor games, video games?",
  },
  {
    key: "toys_and_objects",
    label: "Toys",
    emoji: "\u{1FA80}", // 🪀
    prompt:
      "What toys or objects were special to you?  Action figures, dolls, collections?",
  },
  {
    key: "food_and_candy",
    label: "Food & Candy",
    emoji: "\u{1F36C}", // 🍬
    prompt:
      "What snacks or meals remind you of being a kid?  Lunchbox staples?",
  },
  {
    key: "places_and_outdoors",
    label: "Places",
    emoji: "\u{1F3E1}", // 🏡
    prompt:
      "Where did you spend time?  Parks, friend's houses, arcades?",
  },
  {
    key: "fashion_and_style",
    label: "Fashion",
    emoji: "\u{1F45F}", // 👟
    prompt:
      "What did you wear?  Any trends you loved?  Favorite shoes or accessories?",
  },
  {
    key: "school_and_friends",
    label: "School",
    emoji: "\u{1F392}", // 🎒
    prompt:
      "What was school like?  Favorite subjects, inside jokes, recess games?",
  },
];

/** Stub suggestions for each interest category (90s-flavored defaults). */
export const INTEREST_SUGGESTIONS: Record<InterestCategory, string[]> = {
  entertainment: [
    "A yellow animated family",
    "Saturday morning cartoons",
    "Kids cable channel w/ slime",
    "Sitcom friends in apartment",
    "After-school specials",
    "Sketch comedy show",
  ],
  music: [
    "Grunge album cover",
    "Boy band CD",
    "Hip-hop mixtape",
    "Pop princess CD",
    "Ska-punk album",
    "Music video countdown show",
  ],
  games_and_play: [
    "16-bit game console",
    "Fighting game arcade",
    "Handheld green screen",
    "Trading creature cards",
    "Virtual pet keychain",
    "Capture the flag",
  ],
  toys_and_objects: [
    "Slap bracelets",
    "Pog slammers",
    "Super soaker",
    "Glow-in-the-dark stars",
    "Trapper Keeper binder",
    "Bouncy ball collection",
  ],
  food_and_candy: [
    "Fruit snacks & juice box",
    "Push-up popsicle",
    "Ring candy",
    "Sour candy powder",
    "Pizza day at school",
    "Marshmallow cereal",
  ],
  places_and_outdoors: [
    "Video rental store",
    "Neon arcade in a mall",
    "Cul-de-sac with bikes",
    "Community pool",
    "Library kids corner",
  ],
  fashion_and_style: [
    "Baggy jeans chain wallet",
    "Backwards baseball cap",
    "Platform sneakers",
    "Flannel around waist",
    "Butterfly clips",
    "Jelly sandals",
  ],
  school_and_friends: [
    "Locker w/ magazine cutouts",
    "Passing folded notes",
    "Green vinyl school bus",
    "Yearbook signatures",
    "Gel pen collection",
  ],
};

export interface MoodOption {
  key: Mood;
  label: string;
  description: string;
  palette: string[];
}

export const MOOD_OPTIONS: MoodOption[] = [
  {
    key: "vibrant",
    label: "Vibrant & Playful",
    description:
      "Full energy, bold colors, busy with memories.  For your lock screen and sharing.",
    palette: ["#FF00FF", "#008080", "#FF4500", "#32CD32", "#6A0DAD"],
  },
  {
    key: "calm",
    label: "Calm & Reflective",
    description:
      "Soft, warm, spacious.  Perfect for meditation and quiet moments.",
    palette: ["#D4A87C", "#B8A090", "#C9B8A8", "#E8DDD0", "#D4856A"],
  },
  {
    key: "dreamy",
    label: "Dreamy & Hazy",
    description:
      "Film grain, light leaks, faded pastels.  Like trying to remember a dream.",
    palette: ["#DDA0DD", "#D2B48C", "#C4B8A8", "#E6D8CC", "#B0A090"],
  },
];

export const LOADER_MESSAGES: string[] = [
  "Gathering your memories...",
  "Painting your childhood...",
  "Mixing the perfect colors...",
  "Scattering the polaroids...",
  "Adding some warmth...",
  "Almost there...",
];

export const HINT_PILLS: string[] = [
  "Saturday morning cartoons in pajamas",
  "The smell of grandma's kitchen",
  "Riding bikes until the streetlights came on",
  "The sound of the ice cream truck",
];

// ──────────────────────────────────────────────
// Onboarding Types
// ──────────────────────────────────────────────

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
    available: true,
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
