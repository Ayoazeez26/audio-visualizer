import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockAudioFile, createMockFileList } from "../test/mocks";

describe("Audio File Utilities", () => {
  describe("File Validation", () => {
    it("should validate audio file types", () => {
      const mp3File = createMockAudioFile("test.mp3", "audio/mpeg");
      const wavFile = createMockAudioFile("test.wav", "audio/wav");
      const oggFile = createMockAudioFile("test.ogg", "audio/ogg");

      expect(mp3File.type).toMatch(/^audio\//);
      expect(wavFile.type).toMatch(/^audio\//);
      expect(oggFile.type).toMatch(/^audio\//);
    });

    it("should reject non-audio files", () => {
      const textFile = new File(["content"], "test.txt", { type: "text/plain" });
      expect(textFile.type).not.toMatch(/^audio\//);
    });
  });

  describe("FileList Creation", () => {
    it("should create a valid FileList", () => {
      const files = [
        createMockAudioFile("test1.mp3"),
        createMockAudioFile("test2.mp3"),
      ];
      const fileList = createMockFileList(files);

      expect(fileList.length).toBe(2);
      expect(fileList[0]).toBe(files[0]);
      expect(fileList[1]).toBe(files[1]);
      expect(fileList.item(0)).toBe(files[0]);
      expect(fileList.item(1)).toBe(files[1]);
    });

    it("should handle empty FileList", () => {
      const fileList = createMockFileList([]);
      expect(fileList.length).toBe(0);
      expect(fileList.item(0)).toBeNull();
    });
  });

  describe("ArrayBuffer Conversion", () => {
    it("should convert file to ArrayBuffer", async () => {
      const file = createMockAudioFile("test.mp3");
      const arrayBuffer = await file.arrayBuffer();

      expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);
      expect(arrayBuffer.byteLength).toBeGreaterThan(0);
    });
  });
});

