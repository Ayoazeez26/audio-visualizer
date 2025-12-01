import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/vue";
import "@testing-library/jest-dom";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Web Audio API
global.AudioContext = class MockAudioContext {
  state = "running";
  destination = {};
  sampleRate = 44100;

  createAnalyser() {
    return {
      fftSize: 256,
      frequencyBinCount: 128,
      getByteFrequencyData: vi.fn((array) => {
        // Fill with mock frequency data
        for (let i = 0; i < array.length; i++) {
          array[i] = Math.random() * 255;
        }
      }),
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }

  createBiquadFilter() {
    return {
      type: "lowshelf",
      frequency: { value: 100 },
      gain: { value: 0 },
      Q: { value: 1 },
      connect: vi.fn(function (destination) {
        return destination;
      }),
      disconnect: vi.fn(),
    };
  }

  createBufferSource() {
    return {
      buffer: null,
      connect: vi.fn(function (destination) {
        return destination;
      }),
      start: vi.fn(),
      stop: vi.fn(),
    };
  }

  decodeAudioData(arrayBuffer: ArrayBuffer) {
    return Promise.resolve({
      duration: 100,
      sampleRate: 44100,
      numberOfChannels: 2,
      length: 44100,
    });
  }

  suspend() {
    this.state = "suspended";
    return Promise.resolve();
  }

  resume() {
    this.state = "running";
    return Promise.resolve();
  }
} as any;

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
  } as Response)
);

// Mock window methods
Object.defineProperty(window, "innerWidth", {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, "addEventListener", {
  writable: true,
  configurable: true,
  value: vi.fn(),
});

Object.defineProperty(window, "removeEventListener", {
  writable: true,
  configurable: true,
  value: vi.fn(),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});

global.cancelAnimationFrame = vi.fn();
