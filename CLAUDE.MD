# Cyberspace Portal - Web App Cantanti Famosi

## Project Overview

A modern React TypeScript web application featuring an immersive cyberspace portal experience with character selection. The app provides a 3-stage interactive journey: portal entrance, tunnel transition, and character selection screen featuring famous Italian personalities.

**Live App**: https://ai.studio/apps/drive/1I07eW1rLAH0Pz0tl9wDI7I5PnyXPpJgb

## Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Animation**: Framer Motion 12.23.25
- **3D Graphics**: Three.js 0.181.2
- **Icons**: Lucide React 0.555.0
- **Styling**: Tailwind CSS (via inline utility classes)

## Project Structure

```
/
├── App.tsx                          # Main app component with state management
├── index.tsx                        # React entry point
├── index.html                       # HTML template
├── components/
│   ├── CharacterSelect.tsx          # Character selection screen with cards and modal
│   ├── PortalCard.tsx               # Initial portal entrance card
│   └── TunnelEffect.tsx             # Tunnel transition animation
├── constants.ts                     # Character data and color scheme
├── types.ts                         # TypeScript type definitions
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
├── package.json                     # Dependencies and scripts
└── public/                          # Static assets (character images)
    ├── angelina.png
    ├── ronaldo.png
    ├── geolier.png
    └── anna.png
```

## Key Components

### App.tsx (App.tsx:1)
Main application component managing three view states:
- `portal`: Initial entrance screen
- `tunnel`: Transition animation (2.5s duration)
- `selection`: Character selection screen

State flows: portal → tunnel → selection (with back button to portal)

### CharacterSelect.tsx (components/CharacterSelect.tsx:1)
Character selection interface featuring:
- Grid layout (responsive: 1/2/4 columns)
- 4 character cards with hover effects
- Floating animation on cards
- Modal overlay for detailed character info
- Back button navigation

### PortalCard.tsx (components/PortalCard.tsx:1)
Initial portal entrance card with:
- Glassmorphic design
- Animated "Enter Portal" button
- Fade out during tunnel transition

### TunnelEffect.tsx (components/TunnelEffect.tsx:1)
3D tunnel transition effect using Three.js:
- Particle system creating tunnel depth
- Acceleration effect when active
- Ambient background effect when inactive

## Character Data

Defined in `constants.ts`, featuring 4 personalities:

1. **Angelina Mango** - Artist/Performer
2. **Cristiano Ronaldo** - Football Legend
3. **Geolier** - Rapper/Artist
4. **Anna Pepe** - Rapper/Icon

Each character has:
- Unique ID
- Name and role
- Image reference (in `/public`)
- Description

## Color Scheme (constants.ts:40)

```typescript
{
  primary: '#00ffaa',    // Bright cyan/green
  secondary: '#00a3ff',  // Electric blue
  bg: '#0a0a0a',        // Near black
  glass: 'rgba(10, 12, 18, 0.6)' // Glassmorphic overlay
}
```

## Type Definitions (types.ts:1)

- `Character`: Interface for character data structure
- `ViewState`: Union type for app state ('portal' | 'tunnel' | 'selection')

## Development

### Prerequisites
- Node.js (latest LTS recommended)
- npm or yarn

### Setup & Run

```bash
# Install dependencies
npm install

# Set GEMINI_API_KEY in .env.local (if using AI features)
# Note: Current implementation doesn't require API key

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
Vite dev server runs on `http://localhost:5173` (default)

## Animation & Interaction Flow

1. **Initial Load**: Portal card fades in with glassmorphic effect
2. **User Clicks "Enter Portal"**:
   - Portal card fades out
   - Tunnel effect activates
   - View transitions to tunnel state
3. **After 2.5s**: Character selection screen fades in
4. **Character Selection**:
   - Cards float with staggered animations
   - Hover effects: scale, border glow, content reveal
   - Click opens modal with detailed info
5. **Back Navigation**: Immediate return to portal

## Key Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion
- **3D Effects**: Three.js tunnel visualization
- **Glassmorphic UI**: Modern aesthetic with backdrop blur
- **Hover Interactions**: Enhanced UX with visual feedback
- **Modal System**: Non-intrusive character detail view

## Styling Approach

- Utility-first CSS with Tailwind classes
- Inline styles for dynamic effects (shadows, transforms)
- Custom animations via Framer Motion
- Responsive grid system
- Dark theme with neon accents

## Git Configuration

**Current Branch**: `claude/update-claude-md-01Dgz4Mz7kGDjLyAi52F4EHJ`

## Important Notes

1. **Image Assets**: Ensure all character images are present in `/public` directory:
   - angelina.png
   - ronaldo.png
   - geolier.png
   - anna.png

2. **Browser Compatibility**: Requires modern browser with:
   - ES6+ support
   - WebGL support (for Three.js)
   - CSS backdrop-filter support

3. **Performance**: Three.js tunnel effect may impact performance on low-end devices

## Future Enhancement Ideas

- Add sound effects for transitions
- Implement character-specific landing pages
- Add more interactive 3D elements
- Integrate Gemini AI for character interactions
- Add multilingual support (Italian/English)
- Implement character comparison feature
- Add social sharing capabilities

## Troubleshooting

**Issue**: Tunnel effect not rendering
- Solution: Check WebGL support in browser, ensure Three.js is installed

**Issue**: Images not loading
- Solution: Verify image files exist in `/public` with correct filenames

**Issue**: Build fails
- Solution: Run `npm install` to ensure all dependencies are installed
