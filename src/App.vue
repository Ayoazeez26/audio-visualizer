<template>
  <main
    class="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8 md:py-12 px-4 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <div class="text-center mb-10 md:mb-12">
        <h1
          class="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-3 text-center font-sans drop-shadow-lg">
          Vue Audio Visualizer
        </h1>
        <p
          class="text-purple-300/90 text-center mb-2 text-base md:text-lg font-sans">
          Upload an audio file and watch it come to life
        </p>
        <div class="flex items-center justify-center gap-2 mt-4">
          <div
            class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
          <div
            class="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"
            style="animation-delay: 0.2s"></div>
          <div
            class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"
            style="animation-delay: 0.4s"></div>
        </div>
      </div>

      <AudioVisualizer />
    </div>
  </main>
</template>

<script setup>
import AudioVisualizer from "./components/AudioVisualizer.vue";
</script>
