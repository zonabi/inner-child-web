/**
 * Inner Child — API Stubs
 *
 * Mock implementations that simulate backend responses.
 * Replace with real fetch calls when the FastAPI backend is wired up.
 */

import type { OnboardingAnswers, UserProfile } from "./types";

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
  _country: string
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
