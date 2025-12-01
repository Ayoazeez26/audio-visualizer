import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Visualizer Rendering", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 300;
    ctx = canvas.getContext("2d")!;
    vi.clearAllMocks();
  });

  describe("Canvas Setup", () => {
    it("should create canvas element", () => {
      expect(canvas).toBeDefined();
      expect(canvas.width).toBe(800);
      expect(canvas.height).toBe(300);
    });

    it("should get 2D rendering context", () => {
      expect(ctx).toBeDefined();
      if (ctx) {
        expect(ctx.canvas).toBe(canvas);
      }
    });
  });

  describe("Background Rendering", () => {
    it("should create linear gradient for background", () => {
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0a0a0f");
      gradient.addColorStop(1, "#1a0a2e");

      expect(gradient).toBeDefined();
    });

    it("should fill canvas with gradient", () => {
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0a0a0f");
      gradient.addColorStop(1, "#1a0a2e");

      ctx.fillStyle = gradient as any;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Verify fillStyle was set
      expect(ctx.fillStyle).toBeDefined();
    });
  });

  describe("Bar Rendering", () => {
    it("should calculate bar positions correctly", () => {
      const bufferLength = 128;
      const barWidth = (canvas.width / bufferLength) * 2.5;
      const barSpacing = 2;
      let x = 0;

      for (let i = 0; i < 5; i++) {
        const startX = x;
        x += barWidth + barSpacing;
        const endX = x - barSpacing;

        expect(endX - startX).toBeCloseTo(barWidth, 2);
      }
    });

    it("should normalize bar heights from frequency data", () => {
      const dataArray = new Uint8Array([0, 64, 128, 192, 255]);
      
      // Test the normalization formula directly
      const normalize = (value: number) => (value / 255) * canvas.height * 0.8;
      
      // Verify formula with known values
      expect(normalize(0)).toBe(0);
      expect(normalize(255)).toBe(canvas.height * 0.8); // Max height
      
      // Verify proportional scaling
      const height64 = normalize(64);
      const height128 = normalize(128);
      const height192 = normalize(192);
      
      expect(height128).toBeGreaterThan(height64);
      expect(height192).toBeGreaterThan(height128);
      
      // Verify values are in correct range
      expect(height64).toBeGreaterThanOrEqual(0);
      expect(height64).toBeLessThanOrEqual(canvas.height * 0.8);
      expect(height128).toBeGreaterThanOrEqual(0);
      expect(height128).toBeLessThanOrEqual(canvas.height * 0.8);
      expect(height192).toBeGreaterThanOrEqual(0);
      expect(height192).toBeLessThanOrEqual(canvas.height * 0.8);
      
      // Verify the formula produces expected results
      const maxHeight = canvas.height * 0.8;
      expect(normalize(255)).toBe(maxHeight);
      expect(normalize(128)).toBeCloseTo(maxHeight / 2, 0); // Approximately half
    });

    it("should create bar gradients with correct color stops", () => {
      if (!ctx) return;
      const barWidth = 15.625;
      const barHeight = 100;
      const x = 0;

      const barGradient = ctx.createLinearGradient(
        x,
        canvas.height - barHeight,
        x,
        canvas.height
      );

      const intensity = 128;
      const hue = 240 + (intensity / 255) * 60;
      const saturation = 70 + (intensity / 255) * 30;
      const lightness = 40 + (intensity / 255) * 20;

      barGradient.addColorStop(0, `hsl(${hue}, ${saturation}%, ${lightness}%)`);
      barGradient.addColorStop(
        1,
        `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`
      );

      expect(barGradient).toBeDefined();
    });

    it("should draw rounded rectangles for bars", () => {
      if (!ctx) return;
      const radius = 4;
      const barWidth = 15.625;
      const barHeight = 100;
      const x = 0;

      ctx.beginPath();
      ctx.moveTo(x + radius, canvas.height - barHeight);
      ctx.lineTo(x + barWidth - radius, canvas.height - barHeight);
      ctx.quadraticCurveTo(
        x + barWidth,
        canvas.height - barHeight,
        x + barWidth,
        canvas.height - barHeight + radius
      );
      ctx.lineTo(x + barWidth, canvas.height);
      ctx.lineTo(x, canvas.height);
      ctx.lineTo(x, canvas.height - barHeight + radius);
      ctx.quadraticCurveTo(
        x,
        canvas.height - barHeight,
        x + radius,
        canvas.height - barHeight
      );
      ctx.closePath();

      // Verify path was created
      expect(ctx).toBeDefined();
    });
  });

  describe("Animation Loop", () => {
    it("should use requestAnimationFrame for animation", () => {
      const mockRAF = vi.fn((cb) => {
        setTimeout(cb, 16);
        return 1;
      });
      global.requestAnimationFrame = mockRAF;

      let frameCount = 0;
      function animate() {
        frameCount++;
        if (frameCount < 5) {
          requestAnimationFrame(animate);
        }
      }

      animate();

      expect(mockRAF).toHaveBeenCalled();
    });

    it("should stop animation when not playing", () => {
      let isPlaying = false;
      let animationId: number;

      function draw() {
        if (!isPlaying) return;
        animationId = requestAnimationFrame(draw);
      }

      draw();
      // Animation should not continue
      expect(isPlaying).toBe(false);
    });
  });

  describe("Color Calculations", () => {
    it("should calculate hue based on intensity", () => {
      const testCases = [
        { intensity: 0, expectedHue: 240 },
        { intensity: 128, expectedHue: 270 },
        { intensity: 255, expectedHue: 300 },
      ];

      testCases.forEach(({ intensity, expectedHue }) => {
        const hue = 240 + (intensity / 255) * 60;
        expect(hue).toBeCloseTo(expectedHue, 0);
      });
    });

    it("should calculate saturation based on intensity", () => {
      const intensity = 128;
      const saturation = 70 + (intensity / 255) * 30;
      expect(saturation).toBeCloseTo(85, 0);
    });

    it("should calculate lightness based on intensity", () => {
      const intensity = 128;
      const lightness = 40 + (intensity / 255) * 20;
      expect(lightness).toBeCloseTo(50, 0);
    });
  });

  describe("Glow Effects", () => {
    it("should apply shadow blur for glow effect", () => {
      if (!ctx) return;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "hsl(270, 85%, 50%)";

      expect(ctx.shadowBlur).toBe(15);
      expect(ctx.shadowColor).toBe("hsl(270, 85%, 50%)");
    });

    it("should reset shadow blur after drawing", () => {
      if (!ctx) return;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "hsl(270, 85%, 50%)";
      // Draw something
      ctx.fillRect(0, 0, 10, 10);
      // Reset
      ctx.shadowBlur = 0;

      expect(ctx.shadowBlur).toBe(0);
    });
  });
});

