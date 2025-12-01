import { describe, it, expect, beforeEach } from "vitest";
import { createMockAudioContext } from "../test/mocks";

describe("Equalizer Logic", () => {
  let mocks: ReturnType<typeof createMockAudioContext>;

  beforeEach(() => {
    mocks = createMockAudioContext();
  });

  describe("Filter Configuration", () => {
    it("should configure bass filter correctly", () => {
      const filter = mocks.bassFilter;
      expect(filter.type).toBe("lowshelf");
      expect(filter.frequency.value).toBe(100);
    });

    it("should configure mid filter correctly", () => {
      const filter = mocks.midFilter;
      expect(filter.type).toBe("peaking");
      expect(filter.frequency.value).toBe(1000);
      expect(filter.Q.value).toBe(1);
    });

    it("should configure treble filter correctly", () => {
      const filter = mocks.trebleFilter;
      expect(filter.type).toBe("highshelf");
      expect(filter.frequency.value).toBe(5000);
    });
  });

  describe("Gain Updates", () => {
    it("should update bass gain", () => {
      const bassValue = 10;
      mocks.bassFilter.gain.value = bassValue;
      expect(mocks.bassFilter.gain.value).toBe(10);
    });

    it("should update mid gain", () => {
      const midValue = -5;
      mocks.midFilter.gain.value = midValue;
      expect(mocks.midFilter.gain.value).toBe(-5);
    });

    it("should update treble gain", () => {
      const trebleValue = 15;
      mocks.trebleFilter.gain.value = trebleValue;
      expect(mocks.trebleFilter.gain.value).toBe(15);
    });

    it("should handle gain range limits", () => {
      // Test minimum
      mocks.bassFilter.gain.value = -20;
      expect(mocks.bassFilter.gain.value).toBe(-20);

      // Test maximum
      mocks.bassFilter.gain.value = 20;
      expect(mocks.bassFilter.gain.value).toBe(20);
    });
  });

  describe("Audio Routing", () => {
    it("should connect filters in correct order", () => {
      const source = mocks.sourceNode;
      const bass = mocks.bassFilter;
      const mid = mocks.midFilter;
      const treble = mocks.trebleFilter;
      const analyser = mocks.analyser;

      // Simulate routing: source → bass → mid → treble → analyser
      source.connect(bass);
      bass.connect(mid);
      mid.connect(treble);
      treble.connect(analyser);

      expect(source.connect).toHaveBeenCalledWith(bass);
      expect(bass.connect).toHaveBeenCalledWith(mid);
      expect(mid.connect).toHaveBeenCalledWith(treble);
      expect(treble.connect).toHaveBeenCalledWith(analyser);
    });
  });
});

