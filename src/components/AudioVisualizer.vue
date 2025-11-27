<template>
  <div
    class="flex flex-col items-center gap-8 p-8 md:p-12 bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-500/30 max-w-5xl mx-auto">
    <!-- File Upload Section -->
    <div class="w-full space-y-4">
      <div class="text-center mb-4">
        <h2 class="text-xl font-bold text-purple-200 font-sans mb-1">
          Audio Source
        </h2>
        <p class="text-sm text-purple-300/70 font-sans">
          Use default track or upload your own
        </p>
      </div>

      <!-- Custom File Upload Area -->
      <div
        @click="triggerFileInput"
        @dragover.prevent
        @drop.prevent="handleDrop"
        class="relative border-2 border-dashed border-purple-500/50 rounded-2xl p-8 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 hover:border-purple-400/70 hover:bg-purple-900/30 transition-all duration-300 cursor-pointer group">
        <input
          ref="fileInputRef"
          type="file"
          accept="audio/*"
          @change="loadAudioFromFile"
          class="hidden" />

        <div class="flex flex-col items-center justify-center gap-4">
          <div
            class="p-4 bg-purple-600/20 rounded-full group-hover:bg-purple-600/30 transition-colors">
            <svg
              class="w-10 h-10 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div class="text-center">
            <p class="text-purple-200 font-semibold font-sans mb-1">
              {{ currentFileName || "Click to upload or drag & drop" }}
            </p>
            <p class="text-xs text-purple-300/60 font-sans">
              {{
                currentFileName
                  ? "Click to change file"
                  : "MP3, WAV, OGG or other audio formats"
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div
        v-if="isLoading"
        class="flex items-center justify-center gap-2 text-purple-300">
        <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-sm font-sans">Loading audio...</span>
      </div>
    </div>

    <!-- Play/Pause Button -->
    <div class="flex flex-col items-center gap-3">
      <button
        @click="togglePlay"
        :disabled="!audioBuffer || isLoading"
        class="relative px-10 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-500 disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:transform-none disabled:hover:scale-100 min-w-[160px] font-sans group overflow-hidden">
        <span
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
        <span class="relative flex items-center justify-center gap-3">
          <svg
            v-if="!isPlaying"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
          {{ isPlaying ? "Pause" : "Play" }}
        </span>
      </button>

      <!-- Status Indicator -->
      <div
        v-if="audioBuffer"
        class="flex items-center gap-2 text-sm font-sans transition-all duration-300">
        <div
          :class="[
            'w-2 h-2 rounded-full animate-pulse',
            isPlaying ? 'bg-purple-400' : 'bg-green-400',
          ]"></div>
        <span
          :class="[
            isPlaying ? 'text-purple-300 font-semibold' : 'text-purple-300/70',
          ]">
          {{ isPlaying ? "Now Playing" : "Ready to play" }}
        </span>
      </div>
    </div>

    <!-- Equalizer Controls -->
    <div class="w-full space-y-4">
      <div class="text-center">
        <h3
          class="text-lg font-semibold text-purple-200 font-sans flex items-center justify-center gap-2">
          <svg
            class="w-5 h-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Equalizer
        </h3>
        <p class="text-xs text-purple-300/60 font-sans mt-1">
          Adjust bass, mid, and treble frequencies
        </p>
      </div>

      <div
        class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 p-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl border border-purple-500/30">
        <!-- Bass Control -->
        <div class="flex flex-col items-center gap-3 w-full md:w-auto">
          <label class="text-sm font-semibold text-purple-200 font-sans">
            Bass
          </label>
          <div class="relative w-full md:w-32">
            <input
              type="range"
              min="-20"
              max="20"
              step="1"
              v-model.number="bass"
              @input="updateEQ"
              class="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer slider-thumb"
              :disabled="!audioBuffer" />
          </div>
          <span
            :class="[
              'text-sm font-sans font-medium px-3 py-1 rounded-full',
              bass === 0
                ? 'text-purple-300/70 bg-purple-900/20'
                : bass > 0
                ? 'text-green-400 bg-green-500/20'
                : 'text-red-400 bg-red-500/20',
            ]">
            {{ bass > 0 ? "+" : "" }}{{ bass }} dB
          </span>
        </div>

        <!-- Mid Control -->
        <div class="flex flex-col items-center gap-3 w-full md:w-auto">
          <label class="text-sm font-semibold text-purple-200 font-sans">
            Mid
          </label>
          <div class="relative w-full md:w-32">
            <input
              type="range"
              min="-20"
              max="20"
              step="1"
              v-model.number="mid"
              @input="updateEQ"
              class="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer slider-thumb"
              :disabled="!audioBuffer" />
          </div>
          <span
            :class="[
              'text-sm font-sans font-medium px-3 py-1 rounded-full',
              mid === 0
                ? 'text-purple-300/70 bg-purple-900/20'
                : mid > 0
                ? 'text-green-400 bg-green-500/20'
                : 'text-red-400 bg-red-500/20',
            ]">
            {{ mid > 0 ? "+" : "" }}{{ mid }} dB
          </span>
        </div>

        <!-- Treble Control -->
        <div class="flex flex-col items-center gap-3 w-full md:w-auto">
          <label class="text-sm font-semibold text-purple-200 font-sans">
            Treble
          </label>
          <div class="relative w-full md:w-32">
            <input
              type="range"
              min="-20"
              max="20"
              step="1"
              v-model.number="treble"
              @input="updateEQ"
              class="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer slider-thumb"
              :disabled="!audioBuffer" />
          </div>
          <span
            :class="[
              'text-sm font-sans font-medium px-3 py-1 rounded-full',
              treble === 0
                ? 'text-purple-300/70 bg-purple-900/20'
                : treble > 0
                ? 'text-green-400 bg-green-500/20'
                : 'text-red-400 bg-red-500/20',
            ]">
            {{ treble > 0 ? "+" : "" }}{{ treble }} dB
          </span>
        </div>
      </div>
    </div>

    <!-- Visualizer Canvas -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <h3
          class="text-lg font-semibold text-purple-200 font-sans flex items-center gap-2">
          <svg
            class="w-5 h-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          Frequency Spectrum
        </h3>
        <div
          v-if="isPlaying"
          class="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-full border border-purple-400/30">
          <div class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          <span class="font-sans text-sm font-medium text-purple-300"
            >Live</span
          >
        </div>
      </div>
      <div
        :class="[
          'w-full bg-gradient-to-b from-black/60 via-purple-950/40 to-black/60 rounded-2xl p-6 border shadow-2xl backdrop-blur-sm transition-all duration-300',
          isPlaying
            ? 'border-purple-400/50 shadow-purple-500/20'
            : 'border-purple-500/30',
        ]">
        <canvas
          ref="canvasRef"
          width="800"
          height="300"
          class="w-full h-auto rounded-xl"></canvas>
        <div
          v-if="!isPlaying && audioBuffer"
          class="text-center mt-4 text-purple-300/50 text-sm font-sans flex items-center justify-center gap-2">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Click Play to start visualization
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let audioContext;
let sourceNode;
let analyser;

// EQ filters
let bassFilter;
let midFilter;
let trebleFilter;

const audioBuffer = ref(null);
const isPlaying = ref(false);
const canvasRef = ref(null);
const fileInputRef = ref(null);
const isLoading = ref(false);
const currentFileName = ref("Default Audio Track");

// EQ values
const bass = ref(0);
const mid = ref(0);
const treble = ref(0);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleDrop = async (event) => {
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("audio/")) {
    await loadAudioFromFile({ target: { files: [file] } });
  }
};

const loadAudioFromFile = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  isLoading.value = true;
  currentFileName.value = file.name;

  try {
    const arrayBuffer = await file.arrayBuffer();
    await loadAudioFromBuffer(arrayBuffer);
  } catch (error) {
    console.error("Failed to load audio file:", error);
    currentFileName.value = "Error loading file";
  } finally {
    isLoading.value = false;
  }
};

const loadAudioFromBuffer = async (arrayBuffer) => {
  if (!audioContext) {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    // Setup EQ filters
    bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = "lowshelf";
    bassFilter.frequency.value = 100;

    midFilter = audioContext.createBiquadFilter();
    midFilter.type = "peaking";
    midFilter.frequency.value = 1000;
    midFilter.Q.value = 1;

    trebleFilter = audioContext.createBiquadFilter();
    trebleFilter.type = "highshelf";
    trebleFilter.frequency.value = 5000;
  }

  audioBuffer.value = await audioContext.decodeAudioData(arrayBuffer);

  // Initialize EQ values
  updateEQ();
};

const loadDefaultAudio = async () => {
  isLoading.value = true;
  try {
    const response = await fetch("/default-audio.mp3");
    const arrayBuffer = await response.arrayBuffer();
    await loadAudioFromBuffer(arrayBuffer);
    currentFileName.value = "Default Audio Track";
  } catch (error) {
    console.error("Failed to load default audio:", error);
    currentFileName.value = "Error loading default audio";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadDefaultAudio();
});

const updateEQ = () => {
  if (!audioContext || !bassFilter || !midFilter || !trebleFilter) return;

  bassFilter.gain.value = bass.value;
  midFilter.gain.value = mid.value;
  trebleFilter.gain.value = treble.value;
};

const togglePlay = async () => {
  if (isPlaying.value) {
    audioContext.suspend();
    isPlaying.value = false;
  } else {
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
    playAudio();
  }
};

const playAudio = () => {
  if (!audioBuffer.value) return;

  // Stop previous source if exists
  if (sourceNode) {
    try {
      sourceNode.stop();
    } catch (e) {
      // Source already stopped
    }
  }

  sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer.value;

  // Audio routing: source → bass → mid → treble → analyser → speakers
  sourceNode
    .connect(bassFilter)
    .connect(midFilter)
    .connect(trebleFilter)
    .connect(analyser)
    .connect(audioContext.destination);

  sourceNode.start(0);
  isPlaying.value = true;

  updateEQ();
  drawVisualizer();
};

const drawVisualizer = () => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    if (!isPlaying.value) return;

    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#0a0a0f");
    gradient.addColorStop(1, "#1a0a2e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    const barSpacing = 2;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
      const normalizedHeight = Math.max(2, barHeight);

      // Create gradient for each bar
      const barGradient = ctx.createLinearGradient(
        x,
        canvas.height - normalizedHeight,
        x,
        canvas.height
      );

      const intensity = dataArray[i];
      const hue = 240 + (intensity / 255) * 60; // Purple to pink gradient
      const saturation = 70 + (intensity / 255) * 30;
      const lightness = 40 + (intensity / 255) * 20;

      barGradient.addColorStop(0, `hsl(${hue}, ${saturation}%, ${lightness}%)`);
      barGradient.addColorStop(
        1,
        `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`
      );

      ctx.fillStyle = barGradient;

      // Draw rounded rectangle for each bar
      const radius = 4;
      ctx.beginPath();
      ctx.moveTo(x + radius, canvas.height - normalizedHeight);
      ctx.lineTo(x + barWidth - radius, canvas.height - normalizedHeight);
      ctx.quadraticCurveTo(
        x + barWidth,
        canvas.height - normalizedHeight,
        x + barWidth,
        canvas.height - normalizedHeight + radius
      );
      ctx.lineTo(x + barWidth, canvas.height);
      ctx.lineTo(x, canvas.height);
      ctx.lineTo(x, canvas.height - normalizedHeight + radius);
      ctx.quadraticCurveTo(
        x,
        canvas.height - normalizedHeight,
        x + radius,
        canvas.height - normalizedHeight
      );
      ctx.closePath();
      ctx.fill();

      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.fill();
      ctx.shadowBlur = 0;

      x += barWidth + barSpacing;
    }
  }

  draw();
};
</script>

<style scoped>
/* Custom slider styling */
.slider-thumb::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9333ea, #6366f1);
  cursor: pointer;
  border: 2px solid rgba(192, 132, 252, 0.5);
  box-shadow: 0 2px 8px rgba(147, 51, 234, 0.4);
  transition: all 0.2s ease;
}

.slider-thumb::-webkit-slider-thumb:hover {
  background: linear-gradient(135deg, #a855f7, #818cf8);
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.6);
  transform: scale(1.1);
}

.slider-thumb::-webkit-slider-thumb:active {
  transform: scale(0.95);
}

.slider-thumb::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9333ea, #6366f1);
  cursor: pointer;
  border: 2px solid rgba(192, 132, 252, 0.5);
  box-shadow: 0 2px 8px rgba(147, 51, 234, 0.4);
  transition: all 0.2s ease;
}

.slider-thumb::-moz-range-thumb:hover {
  background: linear-gradient(135deg, #a855f7, #818cf8);
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.6);
  transform: scale(1.1);
}

.slider-thumb:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slider-thumb:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
  opacity: 0.5;
}

.slider-thumb:disabled::-moz-range-thumb {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
