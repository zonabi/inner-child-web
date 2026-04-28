/**
 * Inner Child — API Layer
 *
 * Onboarding stubs (local) + real backend calls for Memory Canvas.
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

/**
 * Maps display country names (from onboarding) to ISO 2-letter codes.
 * The backend expects 2-3 char ISO codes.
 */
const COUNTRY_TO_ISO: Record<string, string> = {
  "United States": "US",
  "Mexico": "MX",
  "Canada": "CA",
  "United Kingdom": "GB",
  "Australia": "AU",
  "Japan": "JP",
  "South Korea": "KR",
  "Brazil": "BR",
  "Germany": "DE",
  "India": "IN",
  "France": "FR",
  "Spain": "ES",
  "Colombia": "CO",
  "Argentina": "AR",
  "Philippines": "PH",
  "Nigeria": "NG",
  "South Africa": "ZA",
};

/** Convert a display country name to its ISO code.  Falls back to "US". */
export function toIsoCountry(displayName: string): string {
  return COUNTRY_TO_ISO[displayName] ?? displayName.slice(0, 2).toUpperCase();
}

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
// Memory Canvas API
// ──────────────────────────────────────────────

import { API_BASE_URL } from "./config";

export type PipelineVersion = "v1_template" | "v2_enriched";

export interface CanvasGenerateParams {
  birth_year: number;
  country: string;
  age_group: AgeGroupKey;
  target_age: number;
  interests: InterestPick[];
  mood: Mood;
  additional_context?: string;
  pipeline_version?: PipelineVersion;
  output_formats: OutputFormat[];
}

export interface CanvasProgressCallback {
  (progress: number, message: string): void;
}

/** How often (ms) to poll for job status during canvas generation. */
const POLL_INTERVAL_MS = 1500;

/**
 * Start canvas generation, poll for progress, and resolve when complete.
 *
 * POST /api/v1/canvas/generate → GET /api/v1/canvas/jobs/{job_id}/status
 */
export async function generateCanvas(
  params: CanvasGenerateParams,
  onProgress: CanvasProgressCallback
): Promise<{ canvas_id: string; image_url: string }> {
  // 1. POST to start the generation job.
  const res = await fetch(`${API_BASE_URL}/api/v1/canvas/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      birth_year: params.birth_year,
      country: params.country,
      target_age: params.target_age,
      interests: params.interests,
      mood: params.mood,
      canvas_override: null,
      additional_context: params.additional_context ?? null,
      pipeline_version: params.pipeline_version ?? "v2_enriched",
      seed: null,
      output_formats: params.output_formats,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const msg =
      (body as { message?: string })?.message ??
      (body as { detail?: string })?.detail ??
      "Failed to start generation";
    throw new Error(msg);
  }

  const job = (await res.json()) as {
    job_id: string;
    status: string;
    poll_url: string;
    estimated_seconds: number;
  };

  // 2. Poll for progress until complete or failed.
  const pollUrl = `${API_BASE_URL}${job.poll_url}`;
  const deadlineMs = (job.estimated_seconds + 60) * 1000;
  const startTime = Date.now();

  while (true) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));

    if (Date.now() - startTime > deadlineMs) {
      throw new Error("Generation timed out.  Please try again.");
    }

    let data: {
      status: string;
      progress?: number;
      message?: string;
      canvas_id?: string;
      formats?: string[];
      error?: { code?: string; message?: string };
      can_retry?: boolean;
    };

    try {
      const pollRes = await fetch(pollUrl);
      if (!pollRes.ok) {
        // Transient error — keep polling.
        continue;
      }
      data = await pollRes.json();
    } catch {
      // Network blip — keep polling.
      continue;
    }

    const pct = Math.round((data.progress ?? 0) * 100);
    onProgress(pct, data.message ?? "Working...");

    if (data.status === "complete" && data.canvas_id) {
      onProgress(100, "Done!");
      const imageUrl = `${API_BASE_URL}/api/v1/canvas/${data.canvas_id}/image/phone`;
      return { canvas_id: data.canvas_id, image_url: imageUrl };
    }

    if (data.status === "failed") {
      throw new Error(
        data.error?.message ?? "Generation failed.  Please try again."
      );
    }
  }
}

/**
 * Get interest suggestions for a category, filtered by decade + country.
 *
 * GET /api/v1/canvas/suggestions/{category}?birth_year=X&target_age=Y&country=Z
 *
 * Falls back to static client-side suggestions if the backend is unreachable.
 */
export async function getCanvasSuggestions(
  category: InterestCategory,
  birthYear: number,
  country: string,
  targetAge: number = 8
): Promise<string[]> {
  try {
    const params = new URLSearchParams({
      birth_year: String(birthYear),
      target_age: String(targetAge),
      country: country || "US",
      limit: "6",
    });

    const res = await fetch(
      `${API_BASE_URL}/api/v1/canvas/suggestions/${category}?${params}`
    );

    if (res.ok) {
      const data = (await res.json()) as { suggestions: string[] };
      return data.suggestions;
    }
  } catch {
    // Backend unreachable — fall through to static suggestions.
  }

  // Fallback: use the client-side static suggestions.
  const { INTEREST_SUGGESTIONS } = await import("./types");
  return INTEREST_SUGGESTIONS[category] ?? [];
}

/**
 * Get the image URL for a specific canvas format.
 *
 * GET /api/v1/canvas/{canvas_id}/image/{format}
 *
 * Returns a URL string that can be used directly in an <img> src
 * or fetched as a blob for download.
 */
export function getCanvasImageUrl(
  canvasId: string,
  format: OutputFormat
): string {
  return `${API_BASE_URL}/api/v1/canvas/${canvasId}/image/${format}`;
}

/**
 * Download a formatted canvas image as a blob and trigger a browser download.
 *
 * GET /api/v1/canvas/{canvas_id}/image/{format}
 */
export async function downloadCanvasFormat(
  canvasId: string,
  format: OutputFormat
): Promise<void> {
  const url = getCanvasImageUrl(canvasId, format);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to download canvas image.");
  }

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  // Trigger browser download.
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `memory-canvas-${format}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}
