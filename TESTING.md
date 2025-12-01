# Testing Documentation

## Test Suite Overview

This project includes a comprehensive test suite covering unit tests, component tests, integration tests, and end-to-end (E2E) tests.

## Test Types Implemented

### 1. Unit Tests (`src/__tests__/`)

#### Audio Utilities (`audio-utils.test.ts`)

- File validation (audio file types)
- FileList creation and manipulation
- ArrayBuffer conversion
- File type checking

#### Canvas Utilities (`canvas-utils.test.ts`)

- Canvas resizing calculations
- Aspect ratio maintenance
- Responsive padding calculations
- Bar dimension calculations
- Gradient creation
- Color calculations

#### Equalizer Logic (`equalizer.test.ts`)

- Filter configuration (Bass, Mid, Treble)
- Gain updates and range limits
- Audio routing chain verification
- Filter connection order

#### Web Audio API (`web-audio-api.test.ts`)

- AudioContext creation and state management
- AnalyserNode configuration (FFT size: 256)
- BiquadFilter setup for each band
- AudioBuffer decoding
- AudioBufferSourceNode creation
- Audio routing chain
- Frequency analysis
- Context suspend/resume

#### Visualizer (`visualizer.test.ts`)

- Canvas setup and context retrieval
- Background gradient rendering
- Bar position calculations
- Bar height normalization
- Bar gradient creation
- Rounded rectangle drawing
- Animation loop with requestAnimationFrame
- Color calculations (hue, saturation, lightness)
- Glow effects

#### Error Handling (`error-handling.test.ts`)

- File upload errors
- Invalid file formats
- Audio loading errors
- Network errors
- Audio decode errors
- AudioContext creation failures
- Canvas errors
- User interaction errors

### 2. Component Tests (`src/components/__tests__/`)

#### AudioVisualizer Component (`AudioVisualizer.test.ts`)

- Component rendering
- Track selection functionality
- File upload handling
- Play/Pause button states
- Equalizer controls rendering
- Loading states
- Status indicators
- Responsive behavior

### 3. E2E Tests (`e2e/`)

#### Audio Visualizer E2E (`audio-visualizer.spec.ts`)

- Application loading
- UI element visibility
- Track selection and loading
- Equalizer slider interaction
- File upload area
- Play button states
- Responsive design (mobile, tablet, desktop)

## Running Tests

### Unit and Component Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed
```

### Run All Tests

```bash
# Run both unit and E2E tests
npm run test:all
```

## Test Coverage

The test suite aims for **80%+ code coverage** including:

- ✅ All audio loading functions
- ✅ Equalizer logic and filter configuration
- ✅ Canvas rendering and visualization
- ✅ Web Audio API setup and routing
- ✅ Component rendering and interactions
- ✅ Error handling scenarios
- ✅ Responsive behavior

## Test Structure

```
audio-visualizer/
├── src/
│   ├── __tests__/              # Unit tests
│   │   ├── audio-utils.test.ts
│   │   ├── canvas-utils.test.ts
│   │   ├── equalizer.test.ts
│   │   ├── web-audio-api.test.ts
│   │   ├── visualizer.test.ts
│   │   └── error-handling.test.ts
│   ├── components/
│   │   └── __tests__/          # Component tests
│   │       └── AudioVisualizer.test.ts
│   └── test/                   # Test utilities
│       ├── setup.ts            # Test setup and mocks
│       └── mocks.ts            # Mock helpers
├── e2e/                        # E2E tests
│   └── audio-visualizer.spec.ts
├── vitest.config.ts            # Vitest configuration
└── playwright.config.ts        # Playwright configuration
```

## Mocking Strategy

### Web Audio API Mocks

- `AudioContext` - Mocked with all required methods
- `AnalyserNode` - Mocked with frequency analysis
- `BiquadFilterNode` - Mocked for all three bands
- `AudioBufferSourceNode` - Mocked for playback control

### Browser API Mocks

- `fetch` - For loading pre-loaded audio files
- `requestAnimationFrame` - For animation loops
- `window.addEventListener/removeEventListener` - For resize handling
- `File` and `FileList` - For file upload testing

## Test Configuration

### Vitest Configuration

- **Environment**: happy-dom (lightweight DOM implementation)
- **Globals**: Enabled for cleaner test syntax
- **Coverage**: v8 provider with HTML, JSON, and text reports

### Playwright Configuration

- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Base URL**: http://localhost:5173
- **Auto-start**: Development server starts automatically

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from "vitest";

describe("My Feature", () => {
  it("should do something", () => {
    expect(true).toBe(true);
  });
});
```

### Component Test Example

```typescript
import { mount } from "@vue/test-utils";
import MyComponent from "../MyComponent.vue";

describe("MyComponent", () => {
  it("should render", () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.exists()).toBe(true);
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from "@playwright/test";

test("should do something", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
});
```

## Continuous Integration

Tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm run test:all
```

## Test Maintenance

- Keep tests updated with code changes
- Add tests for new features
- Maintain mock accuracy
- Update E2E tests for UI changes
- Review coverage reports regularly
