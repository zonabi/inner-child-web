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

/**
 * Age-aware interest suggestions.
 *
 * Each category has suggestions per age group.  The getter function
 * applies soft filtering: returns the target group's items plus a
 * few from adjacent groups for overlap.
 */
const AGE_SUGGESTIONS: Record<
  AgeGroupKey,
  Record<InterestCategory, string[]>
> = {
  little_kid: {
    entertainment: [
      "A big purple dinosaur singing",
      "Animated puppets in a neighborhood",
      "A curious monkey in a yellow hat",
      "A friendly red dog the size of a house",
      "Colorful construction vehicles cartoon",
      "A talking blue puppy finding clues",
      "Fairy tale storybook pages",
      "Animated trains with faces",
    ],
    music: [
      "Nursery rhyme sing-along",
      "Kids' music cassette tape",
      "A song about the alphabet",
      "Silly animal songs",
      "A music box melody",
      "Clapping and stomping rhythms",
    ],
    games_and_play: [
      "Building with colorful blocks",
      "Playing pretend kitchen",
      "Sandbox with toy shovels",
      "Ring around the rosie",
      "Playing with a toy train set",
      "Blowing bubbles in the yard",
      "Hide and seek",
      "Duck duck goose",
    ],
    toys_and_objects: [
      "A stuffed animal best friend",
      "Plastic dinosaur collection",
      "Toy cars and trucks",
      "A blankie or security blanket",
      "Colorful stacking rings",
      "Play-Doh containers",
      "Finger paint set",
      "A favorite picture book",
    ],
    food_and_candy: [
      "Animal-shaped crackers",
      "Juice box with a tiny straw",
      "PB&J with the crusts cut off",
      "Goldfish crackers",
      "Alphabet soup",
      "Fruit roll-ups",
      "String cheese",
      "Cereal with marshmallow shapes",
    ],
    places_and_outdoors: [
      "The playground with a big slide",
      "Backyard sprinkler on a hot day",
      "Grandma's house",
      "A sandbox at the park",
      "The kiddie pool",
      "Daycare or preschool classroom",
      "A blanket fort in the living room",
      "The backyard with fireflies",
    ],
    fashion_and_style: [
      "Light-up sneakers",
      "Overalls with snaps",
      "A favorite character t-shirt",
      "Velcro shoes",
      "Rain boots and a slicker",
      "A superhero cape (towel)",
      "Mittens on a string",
    ],
    school_and_friends: [
      "Circle time on the carpet",
      "Finger painting at a tiny table",
      "Nap time with a mat",
      "Show and tell",
      "A cubby with your name on it",
      "Playground best friend",
      "Coloring inside the lines",
    ],
  },
  kid: {
    entertainment: [
      "Saturday morning cartoons",
      "A yellow animated family",
      "Kids cable channel w/ slime",
      "After-school cartoon block",
      "A friendly talking sponge",
      "Animated kids with superpowers",
      "A magical school bus",
      "Reading a comic book series",
    ],
    music: [
      "Pop hits on the radio",
      "A movie soundtrack you loved",
      "Singing along in the car",
      "Boy band or girl group CD",
      "A Walkman or Discman",
      "Music video countdown show",
      "A karaoke machine at a party",
    ],
    games_and_play: [
      "Trading creature cards",
      "Handheld green-screen game",
      "Capture the flag",
      "Kickball at recess",
      "Building with interlocking bricks",
      "Virtual pet keychain",
      "Board game night",
      "Tag and freeze tag",
      "Jump rope and hopscotch",
    ],
    toys_and_objects: [
      "Super soaker water gun",
      "Glow-in-the-dark stars on ceiling",
      "Bouncy ball collection",
      "Action figures or dolls",
      "A scooter or roller blades",
      "Silly putty and slime",
      "Beanie plush collection",
      "A yo-yo",
    ],
    food_and_candy: [
      "Fruit snacks & juice box",
      "Push-up popsicle",
      "Ring candy",
      "Pizza day at school",
      "Marshmallow cereal",
      "Dunkaroos and Gushers",
      "Ice cream truck treats",
      "Lunchable with a tiny pizza",
    ],
    places_and_outdoors: [
      "Cul-de-sac with bikes",
      "Community pool",
      "Library kids corner",
      "Video rental store",
      "A friend's house for a sleepover",
      "The creek or woods behind the neighborhood",
      "Roller skating rink",
      "Playground monkey bars",
      "Summer camp",
    ],
    fashion_and_style: [
      "Light-up sneakers",
      "Character backpack",
      "Friendship bracelets",
      "Jelly sandals",
      "Slap bracelets",
      "Tie-dye shirt",
      "Colorful hair clips",
      "Velcro wallet",
    ],
    school_and_friends: [
      "Passing folded notes",
      "Green vinyl school bus",
      "Gel pen collection",
      "Book fair day",
      "Field trip permission slip",
      "Recess games",
      "Spelling bee nerves",
      "A trapper keeper binder",
    ],
  },
  tween: {
    entertainment: [
      "Kids cable channel w/ slime",
      "Sketch comedy show",
      "A yellow animated family",
      "Sitcom about nothing",
      "Saturday morning cartoons",
      "Anime on late-night TV",
      "A teen drama on the WB",
      "Sci-fi show with aliens",
      "A mystery book series",
    ],
    music: [
      "Boy band CD",
      "Pop princess CD",
      "Hip-hop mixtape",
      "Ska-punk album",
      "Burning a mix CD",
      "Music video countdown show",
      "Downloading songs one at a time",
      "A portable CD player with anti-skip",
    ],
    games_and_play: [
      "16-bit game console",
      "Fighting game arcade",
      "Trading creature cards",
      "Skateboarding after school",
      "A new 3D adventure game",
      "LAN party at a friend's house",
      "Cheat codes from a magazine",
      "Basketball at the park",
      "Truth or dare at sleepovers",
    ],
    toys_and_objects: [
      "Pog slammers",
      "Trapper Keeper binder",
      "Slap bracelets",
      "A bead lizard keychain",
      "Skateboard with stickers",
      "Lava lamp on the desk",
      "Poster-covered bedroom walls",
      "A journal or diary with a lock",
    ],
    food_and_candy: [
      "Sour candy powder",
      "Pizza day at school",
      "Cafeteria tray lunch",
      "Vending machine snacks",
      "Ramen noodles after school",
      "Frozen burritos in the microwave",
      "Energy drinks (first sip)",
      "Candy from the corner store",
    ],
    places_and_outdoors: [
      "Neon arcade in a mall",
      "The mall food court",
      "Video rental store",
      "Skateboard park",
      "A friend's basement",
      "Movie theater on weekends",
      "The bus stop after school",
      "Basketball court at the park",
      "An internet cafe or computer lab",
      "The corner store",
    ],
    fashion_and_style: [
      "Backwards baseball cap",
      "Platform sneakers",
      "Butterfly clips",
      "Cargo pants with pockets",
      "Band t-shirt",
      "Choker necklace",
      "Frosted tips or hair gel",
      "Studded belt",
      "Chunky shoes",
    ],
    school_and_friends: [
      "Locker w/ magazine cutouts",
      "Passing folded notes",
      "Yearbook signatures",
      "Gel pen collection",
      "School dance decorations",
      "AIM screen names",
      "Inside jokes with your crew",
      "A crush you never told anyone about",
    ],
  },
  teen: {
    entertainment: [
      "Sitcom friends in apartment",
      "Sketch comedy show",
      "Late-night talk show",
      "A cult classic indie movie",
      "Anime on late-night TV",
      "A teen drama with a soundtrack",
      "Binge-watching a series on DVD",
      "Underground comic books",
      "A movie you snuck into",
    ],
    music: [
      "Grunge album cover",
      "Hip-hop mixtape",
      "Ska-punk album",
      "Burned mix CDs for friends",
      "A vinyl record collection starting",
      "Concert ticket stubs",
      "Band posters plastered on walls",
      "Making playlists for hours",
      "A guitar or instrument in the corner",
    ],
    games_and_play: [
      "Fighting game arcade",
      "A new console launch day",
      "LAN parties all night",
      "Online multiplayer with strangers",
      "Skateboarding and filming tricks",
      "Pickup basketball games",
      "Road trips with new license",
      "Late-night diner runs",
    ],
    toys_and_objects: [
      "Band posters wall-to-wall",
      "A lava lamp glowing",
      "Sticker-covered laptop or binder",
      "Concert wristbands collection",
      "A beat-up pair of headphones",
      "Zines and flyers from shows",
      "Polaroid photos of friends",
      "A skateboard deck as wall art",
    ],
    food_and_candy: [
      "Late-night fast food drive-thru",
      "Ramen noodles at 2am",
      "Gas station snack runs",
      "Frozen pizza with friends",
      "Energy drinks and candy",
      "Diner coffee and fries",
      "Movie theater popcorn",
      "Vending machine dinner",
    ],
    places_and_outdoors: [
      "A basement with band equipment",
      "The parking lot after school",
      "Neon arcade in a mall",
      "Late-night diner booth",
      "A rooftop or lookout point",
      "Concert venue general admission",
      "The record store",
      "A friend's garage hangout",
      "Driving around with no destination",
      "The coffee shop where everyone went",
    ],
    fashion_and_style: [
      "Baggy jeans chain wallet",
      "Flannel around waist",
      "Band t-shirt collection",
      "Doc Martens or Converse",
      "Beanie pulled low",
      "Studded belt and patches",
      "Thrift store finds",
      "Dark eyeliner phase",
      "Safety pin accessories",
    ],
    school_and_friends: [
      "Yearbook signatures",
      "Locker w/ magazine cutouts",
      "Study hall note passing",
      "Sneaking out at night",
      "Prom or school dance photos",
      "Senior skip day",
      "A mix CD for your crush",
      "Late-night phone calls",
      "Writing on each other's shoes",
    ],
  },
};

/**
 * Get suggestions for a category, soft-filtered by age group.
 *
 * Returns the target group's suggestions plus a handful from
 * adjacent groups for natural overlap.
 */
export function getSuggestionsForAge(
  category: InterestCategory,
  ageGroup: AgeGroupKey
): string[] {
  const primary = AGE_SUGGESTIONS[ageGroup]?.[category] ?? [];

  // Adjacent groups for soft overlap.
  const adjacency: Record<AgeGroupKey, AgeGroupKey[]> = {
    little_kid: ["kid"],
    kid: ["little_kid", "tween"],
    tween: ["kid", "teen"],
    teen: ["tween"],
  };

  const adjacentItems: string[] = [];
  for (const adj of adjacency[ageGroup] ?? []) {
    const adjSuggestions = AGE_SUGGESTIONS[adj]?.[category] ?? [];
    // Pull 2 items from each adjacent group.
    adjacentItems.push(...adjSuggestions.slice(0, 2));
  }

  // Deduplicate (primary items take priority).
  const primarySet = new Set(primary);
  const extras = adjacentItems.filter((item) => !primarySet.has(item));

  return [...primary, ...extras];
}

/** @deprecated Use getSuggestionsForAge instead.  Kept for API fallback. */
export const INTEREST_SUGGESTIONS: Record<InterestCategory, string[]> = {
  entertainment: AGE_SUGGESTIONS.kid.entertainment,
  music: AGE_SUGGESTIONS.kid.music,
  games_and_play: AGE_SUGGESTIONS.kid.games_and_play,
  toys_and_objects: AGE_SUGGESTIONS.kid.toys_and_objects,
  food_and_candy: AGE_SUGGESTIONS.kid.food_and_candy,
  places_and_outdoors: AGE_SUGGESTIONS.kid.places_and_outdoors,
  fashion_and_style: AGE_SUGGESTIONS.kid.fashion_and_style,
  school_and_friends: AGE_SUGGESTIONS.kid.school_and_friends,
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

/**
 * Static HINT_PILLS kept for backward compat.  Prefer getHintPills()
 * which returns age-aware and interest-informed hints.
 */
export const HINT_PILLS: string[] = [
  "Saturday morning cartoons in pajamas",
  "The smell of grandma's kitchen",
  "Riding bikes until the streetlights came on",
  "The sound of the ice cream truck",
];

// ── Age-aware hint pill bank ──

const AGE_HINT_BANK: Record<AgeGroupKey, string[]> = {
  little_kid: [
    "Watching cartoons in footie pajamas",
    "The smell of Play-Doh",
    "Blanket forts in the living room",
    "Splashing in puddles after the rain",
    "Bedtime stories with a stuffed animal",
    "Finger painting at the kitchen table",
    "Chasing bubbles in the backyard",
    "Hiding in the clothes rack at the store",
    "The way band-aids made everything better",
    "Falling asleep in the car on the way home",
    "Your favorite cup or plate you always wanted",
    "Dancing to music in the living room",
    "The feeling of grass between your toes",
    "Your parent carrying you when you were sleepy",
    "A song someone used to sing to you",
    "The sound of rain on the window at naptime",
  ],
  kid: [
    "Saturday morning cartoons in pajamas",
    "Riding bikes until the streetlights came on",
    "The sound of the ice cream truck",
    "Trading cards at recess",
    "Building forts out of couch cushions",
    "Sleepovers with sleeping bags on the floor",
    "Running through the sprinklers",
    "The smell of a new box of crayons",
    "Begging for five more minutes outside",
    "The school bus ride home with friends",
    "Your lunchbox and what was inside",
    "Catching fireflies in a jar",
    "The first day of summer vacation",
    "Winning a prize at the school fair",
    "A birthday party you still remember",
    "The way the library smelled",
  ],
  tween: [
    "Passing notes in class",
    "Your first school dance",
    "Staying up late on a Friday night",
    "Decorating your locker or binder",
    "Learning to ride without training wheels",
    "Sleepovers with scary movies",
    "The mall on a Saturday afternoon",
    "Writing in a secret diary or journal",
    "The first time you felt embarrassed at school",
    "Getting dropped off somewhere by yourself",
    "A crush you never told anyone about",
    "The song you played on repeat",
    "A friendship bracelet or necklace",
    "The feeling of the last day of school",
    "Pretending to be older than you were",
    "A book series you couldn't put down",
  ],
  teen: [
    "Driving around with friends, no destination",
    "The mixtape someone made you",
    "Late-night phone calls",
    "Your bedroom walls covered in posters",
    "Sneaking out or staying out past curfew",
    "The first concert you ever went to",
    "Hanging out at someone's basement",
    "Writing song lyrics on your notebooks",
    "A road trip that changed everything",
    "The job you got to have your own money",
    "A conversation that stayed with you forever",
    "The freedom of getting your license",
    "A late night that turned into an adventure",
    "The band or artist that defined that year",
    "Staying up all night talking about life",
    "The place everyone gathered on weekends",
  ],
};

/** Category-specific hint fragments keyed by InterestCategory. */
const CATEGORY_HINT_FRAGMENTS: Partial<Record<InterestCategory, string[]>> = {
  music: [
    "The first album you ever owned",
    "A song that still gives you chills",
    "Listening to the radio under the covers",
    "The soundtrack of your summer",
  ],
  entertainment: [
    "A show you'd rush home to watch",
    "A movie you watched a hundred times",
    "Renting something from the video store",
    "The theme song you still know by heart",
  ],
  games_and_play: [
    "A game you could never beat",
    "The friend you always played with",
    "Making up rules as you went along",
    "The game that always started a fight",
  ],
  food_and_candy: [
    "The snack you'd beg for at the store",
    "A meal that smelled like home",
    "The candy you'd trade at school",
    "Cooking or baking with someone you loved",
  ],
  places_and_outdoors: [
    "A secret spot only you knew about",
    "The walk or ride to school",
    "A place that felt like another world",
    "Where you went when you needed to be alone",
  ],
  fashion_and_style: [
    "An outfit you felt unstoppable in",
    "The shoes everyone wanted",
    "Something you wore until it fell apart",
    "A haircut or style that defined that era",
  ],
  school_and_friends: [
    "A teacher who believed in you",
    "The friend who always had your back",
    "A moment at school you'll never forget",
    "The feeling of walking into school on the first day",
  ],
  toys_and_objects: [
    "The toy you never let anyone touch",
    "Something you saved up forever to buy",
    "An object you still wish you had",
    "The thing you brought everywhere with you",
  ],
};

/**
 * Simple seeded shuffle so the same session sees a consistent order
 * but different interest combos produce different arrangements.
 */
function seededShuffle(arr: string[], seed: number): string[] {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Return dynamic hint pills tailored to the user's age group and
 * selected interest categories.  Shows 6–9 pills total:
 * 6 age-appropriate hints + up to 3 category-specific ones.
 */
export function getHintPills(
  ageGroup: AgeGroupKey,
  interests: InterestPick[]
): string[] {
  // Use interest count as a lightweight seed so the order shifts
  // as the user picks more items, but stays stable otherwise.
  const seed = interests.length * 7 + ageGroup.length;

  // Pick 6 age-appropriate hints from the shuffled bank
  const ageHints = AGE_HINT_BANK[ageGroup] ?? AGE_HINT_BANK.kid;
  const shuffledAge = seededShuffle(ageHints, seed);
  const selectedAge = shuffledAge.slice(0, 6);

  // Gather category-specific hints from the user's picked categories
  const pickedCategories = [...new Set(interests.map((i) => i.category))];
  const catHints: string[] = [];
  for (const cat of pickedCategories) {
    const fragments = CATEGORY_HINT_FRAGMENTS[cat];
    if (fragments && fragments.length > 0) {
      // Rotate which fragment we pick based on how many interests are in that category
      const countInCat = interests.filter((i) => i.category === cat).length;
      catHints.push(fragments[countInCat % fragments.length]);
    }
    if (catHints.length >= 3) break;
  }

  // Combine: age hints first, then category-specific, no dupes
  const seen = new Set(selectedAge);
  const extras = catHints.filter((h) => !seen.has(h));
  return [...selectedAge, ...extras];
}

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
