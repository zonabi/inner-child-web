/**
 * Inner Child — API Stubs
 *
 * Mock implementations that simulate backend responses.
 * Replace with real fetch calls when the FastAPI backend is wired up.
 */

import type {
  OnboardingAnswers,
  UserProfile,
  AgeGroupKey,
  Mood,
  InterestPick,
  InterestCategory,
  OutputFormat,
} from "./types";

/** Simulates a network delay */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Submit onboarding answers and receive a user profile.
 *
 * STUB: Returns a mock profile after a short delay.
 * REAL: POST /api/v1/onboarding
 */
export async function submitOnboarding(
  answers: OnboardingAnswers
): Promise<UserProfile> {
  await delay(800);

  if (!answers.name.trim()) {
    throw new Error("Name is required.");
  }

  if (!answers.birth_year) {
    throw new Error("Birth year is required.");
  }

  if (!answers.country) {
    throw new Error("Please select a country.");
  }

  const profile: UserProfile = {
    id: `user_${Date.now()}`,
    name: answers.name.trim(),
    childhood_nickname: answers.childhood_nickname?.trim() || undefined,
    birth_year: answers.birth_year,
    country: answers.country,
    gender: answers.gender,
    comfort_level: answers.comfort_level,
    goals: answers.goals,
    childhood_word: answers.childhood_word.trim(),
    onboarding_completed: true,
    created_at: new Date().toISOString(),
  };

  return profile;
}

/**
 * Get the decade label for a birth year.
 * Used in the nostalgia preview during onboarding.
 */
export function getDecadeLabel(birthYear: number): string {
  // Inner child age is roughly 6-10, so add ~8 years to birth year
  const childhoodYear = birthYear + 8;
  const decade = Math.floor(childhoodYear / 10) * 10;
  const shortDecade = decade.toString().slice(-2);
  return `the '${shortDecade}s`;
}

/**
 * Get nostalgia preview items for a given birth year + country.
 *
 * STUB: Returns generic items based on decade.
 * REAL: GET /api/v1/nostalgia/preview?birth_year=X&country=Y
 */
export function getNostalgiaPreview(
  birthYear: number,
  _country: string // eslint-disable-line @typescript-eslint/no-unused-vars -- will be used with real API
): { icon: string; label: string }[] {
  const decade = Math.floor((birthYear + 8) / 10) * 10;

  const items: Record<number, { icon: string; label: string }[]> = {
    1970: [
      { icon: "\u{1F3B8}", label: "Rock" },
      { icon: "\u{1F4FA}", label: "TV" },
      { icon: "\u{1F36C}", label: "Candy" },
      { icon: "\u{1F6F9}", label: "Play" },
    ],
    1980: [
      { icon: "\u{1F3AE}", label: "Arcade" },
      { icon: "\u{1F4FC}", label: "VHS" },
      { icon: "\u{1F36D}", label: "Snacks" },
      { icon: "\u{1F3B5}", label: "Boombox" },
    ],
    1990: [
      { icon: "\u{1F3AE}", label: "Games" },
      { icon: "\u{1F4FA}", label: "Shows" },
      { icon: "\u{1F36C}", label: "Snacks" },
      { icon: "\u{1F3B5}", label: "Music" },
    ],
    2000: [
      { icon: "\u{1F4F1}", label: "Tech" },
      { icon: "\u{1F3AC}", label: "Movies" },
      { icon: "\u{1F355}", label: "Food" },
      { icon: "\u{1F3A7}", label: "Music" },
    ],
    2010: [
      { icon: "\u{1F4F1}", label: "Apps" },
      { icon: "\u{1F3AC}", label: "Streaming" },
      { icon: "\u{1F9C1}", label: "Treats" },
      { icon: "\u{1F3B5}", label: "Playlists" },
    ],
  };

  return items[decade] ?? items[1990]!;
}

// ──────────────────────────────────────────────
// Memory Canvas API Stubs
// ──────────────────────────────────────────────

export interface CanvasGenerateParams {
  birth_year: number;
  country: string;
  age_group: AgeGroupKey;
  target_age: number;
  interests: InterestPick[];
  mood: Mood;
  additional_context?: string;
  output_formats: OutputFormat[];
}

export interface CanvasGenerateResult {
  job_id: string;
  status: "queued" | "processing" | "complete" | "failed";
  estimated_seconds: number;
}

export interface CanvasProgressCallback {
  (progress: number, message: string): void;
}

/**
 * Start canvas generation.  Returns a job ID and calls the progress
 * callback as the generation proceeds.
 *
 * STUB: Simulates a ~4-second generation with progress ticks.
 * REAL: POST /api/v1/canvas/generate  (returns websocket_url for progress)
 */
export async function generateCanvas(
  params: CanvasGenerateParams,
  onProgress: CanvasProgressCallback
): Promise<{ canvas_id: string; image_url: string }> {
  // Suppress unused-var lint — params will be sent to real API.
  void params;

  const messages = [
    "Gathering your memories...",
    "Painting your childhood...",
    "Mixing the perfect colors...",
    "Scattering the polaroids...",
    "Adding some warmth...",
    "Almost there...",
  ];

  let progress = 0;
  let msgIdx = 0;

  // Simulate incremental progress over ~4 seconds.
  for (let tick = 0; tick < 12; tick++) {
    await delay(350);
    progress += Math.random() * 10 + 4;
    if (progress > 95) progress = 95;

    if (progress > (msgIdx + 1) * 16) {
      msgIdx = Math.min(msgIdx + 1, messages.length - 1);
    }
    onProgress(Math.round(progress), messages[msgIdx]!);
  }

  // Final completion.
  onProgress(100, "Done!");
  await delay(400);

  return {
    canvas_id: `canvas_${Date.now()}`,
    image_url: "/mock-canvas.png",
  };
}

/**
 * Get interest suggestions for a category + decade + country.
 *
 * STUB: Returns the static suggestions from types.ts.
 * REAL: GET /api/v1/canvas/suggestions?category=X&decade=Y&country=Z
 */
export async function getCanvasSuggestions(
  category: InterestCategory,
  _birthYear: number,
  _country: string
): Promise<string[]> {
  await delay(200);

  // Import the static suggestions.  In production, the backend returns
  // era-filtered + country-specific suggestions.
  const { INTEREST_SUGGESTIONS } = await import("./types");
  return INTEREST_SUGGESTIONS[category] ?? [];
}

/**
 * Download a formatted canvas image.
 *
 * STUB: Returns a placeholder blob URL after a short delay.
 * REAL: GET /api/v1/canvas/{canvas_id}/image/{format}
 */
export async function downloadCanvasFormat(
  _canvasId: string,
  _format: OutputFormat
): Promise<string> {
  await delay(600);
  // In production, returns a signed URL to the cropped image.
  return "/mock-canvas.png";
}
