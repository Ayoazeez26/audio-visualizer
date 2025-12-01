import { vi } from "vitest";

// Mock audio file
export const createMockAudioFile = (name = "test.mp3", type = "audio/mpeg") => {
  const file = new File(["mock audio content"], name, { type });
  return file;
};

// Mock FileList
export const createMockFileList = (files: File[]) => {
  const fileList = {
    length: files.length,
    item: (index: number) => files[index] || null,
    ...files,
  };
  return fileList as FileList;
};

// Mock DataTransfer for drag and drop
export const createMockDataTransfer = (files: File[]) => {
  return {
    files: createMockFileList(files),
    items: [],
    types: [],
    dropEffect: "none" as DataTransfer["dropEffect"],
    effectAllowed: "all" as DataTransfer["effectAllowed"],
    getData: vi.fn(),
    setData: vi.fn(),
    clearData: vi.fn(),
    setDragImage: vi.fn(),
  } as DataTransfer;
};

// Mock AudioContext with more control
export const createMockAudioContext = () => {
  const analyser = {
    fftSize: 256,
    frequencyBinCount: 128,
    getByteFrequencyData: vi.fn((array: Uint8Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 255);
      }
    }),
    connect: vi.fn(),
    disconnect: vi.fn(),
  };

  const bassFilter = {
    type: "lowshelf",
    frequency: { value: 100 },
    gain: { value: 0 },
    connect: vi.fn((dest: any) => dest),
    disconnect: vi.fn(),
  };

  const midFilter = {
    type: "peaking",
    frequency: { value: 1000 },
    gain: { value: 0 },
    Q: { value: 1 },
    connect: vi.fn((dest: any) => dest),
    disconnect: vi.fn(),
  };

  const trebleFilter = {
    type: "highshelf",
    frequency: { value: 5000 },
    gain: { value: 0 },
    connect: vi.fn((dest: any) => dest),
    disconnect: vi.fn(),
  };

  const sourceNode = {
    buffer: null,
    connect: vi.fn((dest: any) => dest),
    start: vi.fn(),
    stop: vi.fn(),
  };

  const audioContext = {
    state: "running",
    destination: {},
    sampleRate: 44100,
    createAnalyser: vi.fn(() => analyser),
    createBiquadFilter: vi.fn((type?: string) => {
      if (type === "lowshelf") return bassFilter;
      if (type === "peaking") return midFilter;
      if (type === "highshelf") return trebleFilter;
      return bassFilter;
    }),
    createBufferSource: vi.fn(() => sourceNode),
    decodeAudioData: vi.fn(() =>
      Promise.resolve({
        duration: 100,
        sampleRate: 44100,
        numberOfChannels: 2,
        length: 44100,
      })
    ),
    suspend: vi.fn(() => Promise.resolve()),
    resume: vi.fn(() => Promise.resolve()),
  };

  return {
    audioContext,
    analyser,
    bassFilter,
    midFilter,
    trebleFilter,
    sourceNode,
  };
};
