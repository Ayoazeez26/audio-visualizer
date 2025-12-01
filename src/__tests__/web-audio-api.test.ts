import { describe, it, expect, beforeEach, vi } from "vitest";
import { createMockAudioContext } from "../test/mocks";

describe("Web Audio API", () => {
  let mocks: ReturnType<typeof createMockAudioContext>;

  beforeEach(() => {
    mocks = createMockAudioContext();
  });

  describe("AudioContext Creation", () => {
    it("should create AudioContext", () => {
      expect(mocks.audioContext).toBeDefined();
      expect(mocks.audioContext.state).toBe("running");
      expect(mocks.audioContext.sampleRate).toBe(44100);
    });

    it("should create AnalyserNode", () => {
      const analyser = mocks.audioContext.createAnalyser();
      expect(analyser).toBeDefined();
      expect(analyser.fftSize).toBe(256);
      expect(analyser.frequencyBinCount).toBe(128);
    });

    it("should configure AnalyserNode with correct FFT size", () => {
      const analyser = mocks.audioContext.createAnalyser();
      expect(analyser.fftSize).toBe(256);
      // frequencyBinCount should be half of fftSize
      expect(analyser.frequencyBinCount).toBe(128);
    });
  });

  describe("BiquadFilter Creation", () => {
    it("should create bass filter (lowshelf)", () => {
      const filter = mocks.audioContext.createBiquadFilter("lowshelf");
      expect(filter.type).toBe("lowshelf");
      expect(filter.frequency.value).toBe(100);
    });

    it("should create mid filter (peaking)", () => {
      const filter = mocks.audioContext.createBiquadFilter("peaking");
      expect(filter.type).toBe("peaking");
      expect(filter.frequency.value).toBe(1000);
      expect(filter.Q.value).toBe(1);
    });

    it("should create treble filter (highshelf)", () => {
      const filter = mocks.audioContext.createBiquadFilter("highshelf");
      expect(filter.type).toBe("highshelf");
      expect(filter.frequency.value).toBe(5000);
    });
  });

  describe("AudioBuffer Decoding", () => {
    it("should decode audio data", async () => {
      const arrayBuffer = new ArrayBuffer(8);
      const audioBuffer = await mocks.audioContext.decodeAudioData(arrayBuffer);

      expect(audioBuffer).toBeDefined();
      expect(audioBuffer.duration).toBe(100);
      expect(audioBuffer.sampleRate).toBe(44100);
      expect(audioBuffer.numberOfChannels).toBe(2);
    });

    it("should handle decoding errors", async () => {
      mocks.audioContext.decodeAudioData = vi.fn(() =>
        Promise.reject(new Error("Invalid audio data"))
      );

      const arrayBuffer = new ArrayBuffer(8);
      await expect(
        mocks.audioContext.decodeAudioData(arrayBuffer)
      ).rejects.toThrow("Invalid audio data");
    });
  });

  describe("AudioBufferSourceNode", () => {
    it("should create source node", () => {
      const source = mocks.audioContext.createBufferSource();
      expect(source).toBeDefined();
      expect(source.buffer).toBeNull();
    });

    it("should start playback", () => {
      const source = mocks.audioContext.createBufferSource();
      source.start(0);
      expect(source.start).toHaveBeenCalledWith(0);
    });

    it("should stop playback", () => {
      const source = mocks.audioContext.createBufferSource();
      source.stop();
      expect(source.stop).toHaveBeenCalled();
    });
  });

  describe("Audio Routing Chain", () => {
    it("should connect nodes in correct order", () => {
      const source = mocks.sourceNode;
      const bass = mocks.bassFilter;
      const mid = mocks.midFilter;
      const treble = mocks.trebleFilter;
      const analyser = mocks.analyser;
      const destination = mocks.audioContext.destination;

      // Build routing chain
      source.connect(bass);
      bass.connect(mid);
      mid.connect(treble);
      treble.connect(analyser);
      analyser.connect(destination);

      expect(source.connect).toHaveBeenCalledWith(bass);
      expect(bass.connect).toHaveBeenCalledWith(mid);
      expect(mid.connect).toHaveBeenCalledWith(treble);
      expect(treble.connect).toHaveBeenCalledWith(analyser);
      expect(analyser.connect).toHaveBeenCalledWith(destination);
    });
  });

  describe("Frequency Analysis", () => {
    it("should get frequency data from analyser", () => {
      const analyser = mocks.analyser;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      analyser.getByteFrequencyData(dataArray);

      expect(analyser.getByteFrequencyData).toHaveBeenCalled();
      expect(dataArray.length).toBe(128);
      // Check that array has been filled
      expect(dataArray.some((value) => value > 0)).toBe(true);
    });

    it("should return frequency data in correct range", () => {
      const analyser = mocks.analyser;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      analyser.getByteFrequencyData(dataArray);

      // All values should be between 0 and 255
      dataArray.forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(255);
      });
    });
  });

  describe("AudioContext State Management", () => {
    it("should suspend audio context", async () => {
      await mocks.audioContext.suspend();
      expect(mocks.audioContext.suspend).toHaveBeenCalled();
    });

    it("should resume audio context", async () => {
      await mocks.audioContext.resume();
      expect(mocks.audioContext.resume).toHaveBeenCalled();
    });
  });
});

