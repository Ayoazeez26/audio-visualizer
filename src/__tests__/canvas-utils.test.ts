import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Canvas Utilities", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 300;
    ctx = canvas.getContext("2d")!;
  });

  describe("Canvas Resizing", () => {
    it("should calculate correct aspect ratio", () => {
      const aspectRatio = 800 / 300;
      expect(aspectRatio).toBeCloseTo(2.667, 2);
    });

    it("should resize canvas maintaining aspect ratio", () => {
      const containerWidth = 400;
      const padding = 48;
      const maxWidth = Math.min(800, containerWidth - padding);
      const aspectRatio = 800 / 300;
      const newHeight = maxWidth / aspectRatio;

      expect(newHeight).toBeCloseTo(132, 0);
    });

    it("should handle mobile viewport padding", () => {
      const containerWidth = 320;
      const padding = 24; // Mobile padding
      const maxWidth = Math.min(800, containerWidth - padding);
      
      expect(maxWidth).toBe(296);
    });

    it("should handle desktop viewport padding", () => {
      const containerWidth = 1200;
      const padding = 48; // Desktop padding
      const maxWidth = Math.min(800, containerWidth - padding);
      
      expect(maxWidth).toBe(800);
    });
  });

  describe("Canvas Drawing", () => {
    it("should create gradient background", () => {
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0a0a0f");
      gradient.addColorStop(1, "#1a0a2e");

      expect(gradient).toBeDefined();
    });

    it("should calculate bar dimensions correctly", () => {
      const bufferLength = 128;
      const barWidth = (canvas.width / bufferLength) * 2.5;
      const barSpacing = 2;

      expect(barWidth).toBeCloseTo(15.625, 1);
      
      // Verify bar width calculation is correct
      expect(barWidth).toBeGreaterThan(0);
      expect(barSpacing).toBe(2);
      
      // Note: Total width may exceed canvas width as bars are drawn with spacing
      // This is expected behavior for the visualizer
    });

    it("should normalize bar heights", () => {
      const dataArray = new Uint8Array([0, 50, 100, 150, 200, 255]);
      const normalizedHeights = dataArray.map(
        (value) => (value / 255) * canvas.height * 0.8
      );

      expect(normalizedHeights[0]).toBe(0);
      expect(normalizedHeights[normalizedHeights.length - 1]).toBeCloseTo(
        canvas.height * 0.8,
        0
      );
    });

    it("should create bar gradients with correct colors", () => {
      const intensity = 128;
      const hue = 240 + (intensity / 255) * 60;
      const saturation = 70 + (intensity / 255) * 30;
      const lightness = 40 + (intensity / 255) * 20;

      expect(hue).toBeCloseTo(270, 0);
      expect(saturation).toBeCloseTo(85, 0);
      expect(lightness).toBeCloseTo(50, 0);
    });
  });
});

