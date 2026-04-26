import { useOnboardingStore } from "../onboarding";

/**
 * Onboarding Store — Unit Tests
 *
 * Tests the Zustand store logic directly without rendering components.
 * Use this pattern for all store tests.
 */

// Reset store between tests
beforeEach(() => {
  useOnboardingStore.getState().reset();
});

describe("onboarding store", () => {
  describe("step navigation", () => {
    it("starts at step 0", () => {
      expect(useOnboardingStore.getState().step).toBe(0);
    });

    it("advances to the next step", () => {
      useOnboardingStore.getState().nextStep();
      expect(useOnboardingStore.getState().step).toBe(1);
    });

    it("goes back to the previous step", () => {
      useOnboardingStore.getState().nextStep();
      useOnboardingStore.getState().nextStep();
      useOnboardingStore.getState().prevStep();
      expect(useOnboardingStore.getState().step).toBe(1);
    });

    it("does not go below step 0", () => {
      useOnboardingStore.getState().prevStep();
      expect(useOnboardingStore.getState().step).toBe(0);
    });

    it("does not go above step 4", () => {
      for (let i = 0; i < 10; i++) {
        useOnboardingStore.getState().nextStep();
      }
      expect(useOnboardingStore.getState().step).toBe(4);
    });

    it("sets direction to 1 on nextStep", () => {
      useOnboardingStore.getState().nextStep();
      expect(useOnboardingStore.getState().direction).toBe(1);
    });

    it("sets direction to -1 on prevStep", () => {
      useOnboardingStore.getState().nextStep();
      useOnboardingStore.getState().prevStep();
      expect(useOnboardingStore.getState().direction).toBe(-1);
    });
  });

  describe("form answers", () => {
    it("updates name", () => {
      useOnboardingStore.getState().setName("Jose");
      expect(useOnboardingStore.getState().answers.name).toBe("Jose");
    });

    it("updates birth year", () => {
      useOnboardingStore.getState().setBirthYear(1988);
      expect(useOnboardingStore.getState().answers.birth_year).toBe(1988);
    });

    it("toggles goals on and off", () => {
      const store = useOnboardingStore.getState();
      store.toggleGoal("find_calm");
      expect(useOnboardingStore.getState().answers.goals).toContain(
        "find_calm",
      );

      useOnboardingStore.getState().toggleGoal("find_calm");
      expect(useOnboardingStore.getState().answers.goals).not.toContain(
        "find_calm",
      );
    });

    it("allows multiple goals", () => {
      useOnboardingStore.getState().toggleGoal("find_calm");
      useOnboardingStore.getState().toggleGoal("heal_old_wounds");
      useOnboardingStore.getState().toggleGoal("just_curious");

      const goals = useOnboardingStore.getState().answers.goals;
      expect(goals).toHaveLength(3);
      expect(goals).toContain("find_calm");
      expect(goals).toContain("heal_old_wounds");
      expect(goals).toContain("just_curious");
    });

    it("defaults comfort level to gentle", () => {
      expect(useOnboardingStore.getState().answers.comfort_level).toBe(
        "gentle",
      );
    });

    it("updates comfort level", () => {
      useOnboardingStore.getState().setComfortLevel("deep");
      expect(useOnboardingStore.getState().answers.comfort_level).toBe("deep");
    });
  });

  describe("reset", () => {
    it("resets all state to initial values", () => {
      // Modify everything
      useOnboardingStore.getState().setName("Jose");
      useOnboardingStore.getState().setBirthYear(1988);
      useOnboardingStore.getState().setCountry("United States");
      useOnboardingStore.getState().toggleGoal("find_calm");
      useOnboardingStore.getState().nextStep();
      useOnboardingStore.getState().nextStep();

      // Reset
      useOnboardingStore.getState().reset();

      const state = useOnboardingStore.getState();
      expect(state.step).toBe(0);
      expect(state.completed).toBe(false);
      expect(state.answers.name).toBe("");
      expect(state.answers.birth_year).toBeNull();
      expect(state.answers.goals).toHaveLength(0);
    });
  });
});
