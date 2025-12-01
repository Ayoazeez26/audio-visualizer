# Vue Audio Visualizer

A modern, interactive audio visualizer built with Vue.js that provides real-time frequency spectrum visualization with built-in equalizer controls. Upload your own audio files or choose from pre-loaded tracks and watch the music come to life with beautiful, animated visualizations.

![Vue Audio Visualizer](https://img.shields.io/badge/Vue-3.4.0-4FC08D?logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)

## 🎵 Features

### Audio Playback

- **Multiple Audio Sources**: Choose from pre-loaded tracks or upload your own audio files
- **Drag & Drop Support**: Easily upload files by dragging and dropping
- **Play/Pause Controls**: Simple and intuitive playback controls
- **Real-time Audio Analysis**: Live frequency analysis using Web Audio API

### Audio Equalizer

- **3-Band EQ**: Adjust Bass, Mid, and Treble frequencies independently
- **Real-time Processing**: Instant audio filtering with Biquad filters
- **Visual Feedback**: Color-coded dB indicators (green for boost, red for cut)
- **Range Control**: ±20dB adjustment range for each band

### Visualizer

- **Frequency Spectrum Display**: Real-time bar chart visualization
- **Dynamic Color Gradients**: Purple-to-pink gradient bars that respond to audio intensity
- **Smooth Animations**: 60fps animations using requestAnimationFrame
- **Glow Effects**: Beautiful glow effects on frequency bars
- **Responsive Canvas**: Automatically adapts to screen size

### User Interface

- **Modern Design**: Beautiful gradient backgrounds and glassmorphism effects
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **BioRhyme Font**: Custom typography from Google Fonts
- **Smooth Transitions**: Polished animations and hover effects
- **Loading States**: Visual feedback during audio loading
- **Status Indicators**: Clear visual indicators for playback state

## 🛠️ Technologies Used

### Core Framework

- **Vue.js 3.4.0**: Progressive JavaScript framework for building user interfaces
  - Composition API with `<script setup>` syntax
  - Reactive refs and computed properties
  - Component-based architecture

### Build Tools

- **Vite 5.0.0**: Next-generation frontend build tool
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ES modules support

### Styling

- **Tailwind CSS 3.4.18**: Utility-first CSS framework
  - Responsive design utilities
  - Custom color palette (purple/indigo theme)
  - Gradient and backdrop blur effects
- **PostCSS 8.5.6**: CSS processing tool
- **Autoprefixer 10.4.22**: Automatic vendor prefixing

### Web APIs

- **Web Audio API**: Core audio processing and analysis
  - `AudioContext`: Main audio processing context
  - `AnalyserNode`: Real-time frequency analysis (FFT size: 256)
  - `BiquadFilterNode`: Audio equalization filters
    - Low-shelf filter for Bass (100Hz)
    - Peaking filter for Mid (1000Hz, Q: 1)
    - High-shelf filter for Treble (5000Hz)
  - `AudioBufferSourceNode`: Audio playback
- **Canvas API**: 2D graphics rendering for visualizer
  - Gradient fills and shadows
  - Rounded rectangle drawing
  - Real-time bar chart rendering

### Fonts

- **BioRhyme**: Google Fonts - Serif font family for typography

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Setup Steps

1. **Clone or download the project**

   ```bash
   cd audio-visualizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will be available at `http://localhost:5173`
   - Vite will automatically open it in your default browser

## 🚀 Usage

### Development

```bash
npm run dev
```

Starts the development server with hot module replacement.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

Previews the production build locally.

## 🧪 Testing

The project includes a comprehensive test suite covering all major functionality.

### Test Types

1. **Unit Tests** (84 tests)

   - Audio file utilities and validation
   - Canvas rendering and calculations
   - Equalizer logic and filter configuration
   - Web Audio API setup and routing
   - Visualizer rendering and animations
   - Error handling scenarios

2. **Component Tests**

   - Vue component rendering
   - User interactions
   - State management
   - Responsive behavior

3. **E2E Tests** (Playwright)
   - Complete user workflows
   - Cross-browser testing
   - Mobile responsiveness
   - File upload and playback

### Running Tests

```bash
# Run all unit and component tests (watch mode)
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with interactive UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run E2E tests (requires dev server)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run all tests (unit + E2E)
npm run test:all
```

### Test Coverage

The test suite provides comprehensive coverage of:

- ✅ Audio loading and decoding
- ✅ Equalizer functionality
- ✅ Canvas visualization
- ✅ Web Audio API integration
- ✅ Component rendering and interactions
- ✅ Error handling
- ✅ Responsive design

See [TESTING.md](./TESTING.md) and [TEST_PLAN.md](./TEST_PLAN.md) for detailed testing documentation.

## 📁 Project Structure

```
audio-visualizer/
├── public/                          # Static assets
│   ├── Asake-Badman-Gangsta-ft.Tiakola.mp3
│   └── CIZA_ft_Tems_Omah_Lay_Thukuthela_Jazzworx_Lekaa_Beats_-_Isaka_II_6am.mp3
├── src/
│   ├── components/
│   │   └── AudioVisualizer.vue     # Main audio visualizer component
│   ├── App.vue                     # Root component
│   ├── main.ts                     # Application entry point
│   └── style.css                   # Tailwind CSS directives
├── index.html                      # HTML template
├── package.json                    # Project dependencies and scripts
├── vite.config.ts                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── README.md                       # This file
```

## 🎨 Key Components

### AudioVisualizer.vue

The main component that handles:

- Audio file loading and decoding
- Web Audio API setup and routing
- Equalizer filter configuration
- Canvas visualization rendering
- Playback controls
- File upload interface

**Key Functions:**

- `loadPreloadedAudio()`: Loads pre-configured audio tracks
- `loadAudioFromFile()`: Handles user file uploads
- `loadAudioFromBuffer()`: Decodes and prepares audio data
- `updateEQ()`: Applies equalizer settings to audio filters
- `playAudio()`: Starts playback with proper audio routing
- `drawVisualizer()`: Renders frequency spectrum visualization

### Audio Routing Chain

```
Audio Source → Bass Filter → Mid Filter → Treble Filter → Analyser → Speakers
```

## 🎛️ Equalizer Details

The equalizer uses three Biquad filters:

1. **Bass (Low-shelf)**

   - Frequency: 100Hz
   - Type: `lowshelf`
   - Range: -20dB to +20dB

2. **Mid (Peaking)**

   - Frequency: 1000Hz
   - Type: `peaking`
   - Q Factor: 1
   - Range: -20dB to +20dB

3. **Treble (High-shelf)**
   - Frequency: 5000Hz
   - Type: `highshelf`
   - Range: -20dB to +20dB

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: 320px+ (sm: 640px)
- **Tablet**: 768px+ (md: 768px)
- **Desktop**: 1024px+ (lg: 1024px)
- **Large Desktop**: 1280px+ (xl: 1280px)

All components adapt their:

- Padding and spacing
- Font sizes
- Layout (flex/grid)
- Canvas dimensions
- Button sizes

## 🎨 Design Features

- **Color Scheme**: Purple and indigo gradients with pink accents
- **Typography**: BioRhyme serif font from Google Fonts
- **Effects**:
  - Glassmorphism (backdrop blur)
  - Gradient backgrounds
  - Shadow effects
  - Smooth transitions
  - Hover animations

## 🔧 Configuration

### Tailwind CSS

Custom configuration in `tailwind.config.js`:

- Content paths for Vue components
- Custom font family (BioRhyme)
- Extended theme options

### Vite

Configuration in `vite.config.ts`:

- Vue plugin integration
- Development server settings
- Build optimizations

## 📝 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Web Audio API support is required. All modern browsers support this API.

## 🐛 Troubleshooting

### Audio not playing

- Ensure your browser allows autoplay (user interaction may be required)
- Check browser console for errors
- Verify audio file format is supported (MP3, WAV, OGG)

### Visualizer not showing

- Make sure audio is playing
- Check that Web Audio API is supported in your browser
- Verify canvas element is properly rendered

### Styles not loading

- Ensure Tailwind CSS is properly configured
- Check that `style.css` is imported in `main.ts`
- Verify PostCSS is processing correctly

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Web Audio API for powerful audio processing capabilities
- Google Fonts for the BioRhyme font family

---

**Enjoy visualizing your music! 🎵✨**
