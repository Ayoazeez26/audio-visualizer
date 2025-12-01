# Test Plan for Vue Audio Visualizer

## Test Types Overview

### 1. Unit Tests

Test individual functions and component logic in isolation.

**Areas to Test:**

- Component initialization and reactive state
- Audio file loading functions (`loadAudioFromFile`, `loadPreloadedAudio`, `loadAudioFromBuffer`)
- Equalizer update logic (`updateEQ`)
- Canvas resizing logic (`resizeCanvas`, `handleResize`)
- File validation and error handling
- Play/pause toggle logic
- Track selection state management

### 2. Integration Tests

Test component interactions and data flow between parts.

**Areas to Test:**

- Audio loading → buffer creation → playback readiness
- Equalizer changes → filter updates → audio routing
- File upload → state updates → UI feedback
- Track selection → audio loading → state synchronization
- Play button → audio playback → visualizer activation
- Canvas rendering → visualizer drawing → animation loop

### 3. Component Tests

Test Vue component behavior and rendering.

**Areas to Test:**

- Component mounts correctly
- Props and reactive state work as expected
- Event handlers are triggered
- Conditional rendering (loading states, play/pause buttons)
- File input interactions
- Drag and drop functionality
- Button disabled states
- Status indicators display correctly

### 4. Web Audio API Tests

Test Web Audio API setup and configuration.

**Areas to Test:**

- AudioContext creation
- AnalyserNode configuration (FFT size: 256)
- BiquadFilter setup (Bass, Mid, Treble)
- Filter frequency and Q values
- Audio routing chain (source → filters → analyser → destination)
- AudioBuffer decoding
- Source node creation and connection

### 5. Canvas/Visualization Tests

Test canvas rendering and visualizer functionality.

**Areas to Test:**

- Canvas element creation and sizing
- Responsive canvas resizing
- Frequency data extraction from analyser
- Bar chart rendering
- Gradient creation and application
- Animation loop (requestAnimationFrame)
- Visualizer stops when audio pauses

### 6. E2E (End-to-End) Tests

Test complete user workflows.

**User Flows to Test:**

1. **Select Pre-loaded Track → Play → Adjust EQ**

   - Click track selection button
   - Verify track loads
   - Click play button
   - Verify audio plays
   - Adjust equalizer sliders
   - Verify changes apply

2. **Upload File → Play → Visualize**

   - Click file upload area
   - Select audio file
   - Verify file loads
   - Click play
   - Verify visualizer displays
   - Verify frequency bars animate

3. **Drag & Drop File**

   - Drag audio file over drop zone
   - Drop file
   - Verify file loads
   - Verify UI updates

4. **Responsive Behavior**
   - Test on mobile viewport
   - Test on tablet viewport
   - Test on desktop viewport
   - Verify layout adapts correctly

### 7. Error Handling Tests

Test error scenarios and edge cases.

**Scenarios to Test:**

- Invalid audio file format
- Corrupted audio file
- Network error loading pre-loaded tracks
- AudioContext creation failure
- File upload cancellation
- Missing audio buffer when trying to play

### 8. Accessibility Tests

Test accessibility features.

**Areas to Test:**

- Keyboard navigation
- Screen reader compatibility
- ARIA labels and roles
- Focus management
- Button accessibility

### 9. Performance Tests

Test performance characteristics.

**Areas to Test:**

- Audio loading time
- Visualizer frame rate (should maintain ~60fps)
- Memory usage during playback
- Canvas rendering performance
- Resize handler performance

### 10. Browser Compatibility Tests

Test across different browsers.

**Browsers to Test:**

- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

---

## Test Implementation Strategy

1. **Unit Tests**: Vitest + Vue Test Utils
2. **Component Tests**: Vitest + @testing-library/vue
3. **E2E Tests**: Playwright
4. **Mocking**: Mock Web Audio API for unit tests
5. **Test Coverage**: Aim for 80%+ coverage
