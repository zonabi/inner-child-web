import { getDecadeLabel, getNostalgiaPreview, submitOnboarding } from "../api";
import type { OnboardingAnswers } from "../types";

/**
 * API Stubs — Unit Tests
 *
 * Tests the stub logic so when we swap in real API calls,
 * we can verify the contract didn't change.
 */

describe("getDecadeLabel", () => {
  it("returns the '90s for someone born in 1985", () => {
    expect(getDecadeLabel(1985)).toBe("the '90s");
  });

  it("returns the '00s for someone born in 1995", () => {
    expect(getDecadeLabel(1995)).toBe("the '00s");
  });

  it("returns the '80s for someone born in 1975", () => {
    expect(getDecadeLabel(1975)).toBe("the '80s");
  });
});

describe("getNostalgiaPreview", () => {
  it("returns 4 items", () => {
    const items = getNostalgiaPreview(1988, "United States");
    expect(items).toHaveLength(4);
  });

  it("each item has an icon and label", () => {
    const items = getNostalgiaPreview(1990, "Mexico");
    items.forEach((item) => {
      expect(item.icon).toBeTruthy();
      expect(item.label).toBeTruthy();
    });
  });

  it("falls back to 90s items for unknown decades", () => {
    const items = getNostalgiaPreview(2015, "Japan");
    expect(items).toHaveLength(4);
  });
});

describe("submitOnboarding", () => {
  const validAnswers: OnboardingAnswers = {
    name: "Jose",
    childhood_nickname: "Josie",
    birth_year: 1988,
    gender: "male",
    country: "United States",
    childhood_word: "adventurous",
    goals: ["find_calm", "just_curious"],
    comfort_level: "gentle",
  };

  it("returns a user profile with matching data", async () => {
    const profile = await submitOnboarding(validAnswers);
    expect(profile.name).toBe("Jose");
    expect(profile.birth_year).toBe(1988);
    expect(profile.country).toBe("United States");
    expect(profile.onboarding_completed).toBe(true);
    expect(profile.id).toMatch(/^user_/);
  });

  it("throws if name is empty", async () => {
    await expect(
      submitOnboarding({ ...validAnswers, name: "" }),
    ).rejects.toThrow("Name is required");
  });

  it("throws if birth year is missing", async () => {
    await expect(
      submitOnboarding({ ...validAnswers, birth_year: null }),
    ).rejects.toThrow("Birth year is required");
  });

  it("throws if country is empty", async () => {
    await expect(
      submitOnboarding({ ...validAnswers, country: "" }),
    ).rejects.toThrow("Please select a country");
  });
});
