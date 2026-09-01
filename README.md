# 🪐 Planet in Pixel &bull; Video Captions Pro for Remotion

> **Official Captions Suite by Planet in Pixel — India's Best Video Editing School.**  
> 28 production-tested, fine-tuned caption styles numbered **01 to 28** for easy invocation.

---

## ⚡ 1-Line Quick Installation

### Option A: Install Components into an Existing Remotion Project
```bash
npx degit your-github-username/pip-captions/src/pip-captions src/pip-captions
```

### Option B: Install Antigravity AI Skill
```bash
npx degit your-github-username/pip-captions/.agents/skills/planet-in-pixel-captions .agents/skills/planet-in-pixel-captions
```

### Option C: Install via NPM / GitHub
```bash
npm install github:your-github-username/pip-captions
```

---

## 🚀 Easy Invocation: By Number (1–28) or By Name

You can invoke any style using **its number** (`1`, `"01"`, `"style-01"`) or **its slug**:

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Video } from "@remotion/media";
import { CaptionRenderer } from "./pip-captions/CaptionRenderer";
import myCaptions from "./pip-captions/myCaptions.json";

export const MyCaptionedVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Video src="my_video.mp4" />

      {/* Invoke by Style Number (e.g. 1, 2, 3... 28) */}
      <CaptionRenderer
        styleId={1} // or styleId="01" or styleId="emphasis-gradient-duo"
        lines={myCaptions}
        fontSize={62}
        bottomPosition="25%"
        highlightWords={["Planet in Pixel", "Video Editing School", "Content creators"]}
      />
    </AbsoluteFill>
  );
};
```

---

## 🎨 Complete Numbered Catalog (Styles 01 – 28)

### 🎯 1. Keyword Emphasis (Dual-Typography)
- **`01`** &bull; `emphasis-gradient-duo` — **Bold White + Italic Sunset/Violet Gradient** (Dual-font emphasis)
- **`02`** &bull; `emphasis-serif-cyan` — **Modern Sans + Cyan Italic Serif** (Luxury electric contrast)

### 🧊 2. Static Full-Line (Entire Line Appears at Once)
- **`03`** &bull; `static-frost-charcoal-pill` — **Frosted Charcoal Rounded Box** (`18px` glass corners)
- **`04`** &bull; `static-neon-cyan-pill` — **Cyber Glass Rounded Box** (Neon cyan edge glow)
- **`05`** &bull; `static-crimson-pill` — **Velvet Crimson Rounded Box** (Rich burgundy velvet backing)
- **`06`** &bull; `static-editorial-vogue` — **Vogue Line & Golden Rule** (Sand-ivory roman serif with accent line)
- **`07`** &bull; `static-broadcast-clean` — **Netflix Doc Subtitle** (High-contrast yellow with stroke outline)

### ✨ 3. Uniform (No Word Highlight)
- **`08`** &bull; `uniform-swiss-chalk` — **Swiss Editorial Minimal** (Chalk white, wide tracking)
- **`09`** &bull; `uniform-vintage-sepia` — **16mm Vintage Bolex Box** (Warm sepia text in chocolate box)
- **`10`** &bull; `uniform-cyber-emerald` — **Tactical Phosphor HUD** (Phosphor green monospace with reticle brackets)
- **`11`** &bull; `uniform-tokyo-orchid` — **Tokyo Neo Orchid Box** (Plum violet glass box with orchid text)
- **`12`** &bull; `uniform-hollywood-gold` — **Golden Age Art Deco** (24k solid gold Roman serif with double border)

### 🎬 4. Cinematic Slide (Slow Film Bottom-Slide)
- **`13`** &bull; `cinematic-tungsten` — **70mm Tungsten Gold** (IMAX 70mm title brackets with slow vertical rise)
- **`14`** &bull; `cinematic-nordic-frost` — **Nordic Arthouse Frost** (Glacial blue rise with frosted glass bar)
- **`15`** &bull; `cinematic-bladerunner` — **Anamorphic Teal & Gold** (Neo-noir crosshairs with chromatic focus blur)
- **`16`** &bull; `cinematic-champagne` — **Haute Couture Champagne** (Luxury diamond jewelry box with poetic rise)
- **`17`** &bull; `cinematic-ethereal` — **Deep Space Monolith** (Wide monolithic pillars with lavender edge beams)

### ⚡ 5. Pop & Animated (Word-by-Word Animation)
- **`18`** &bull; `sunset-gradient` — **Sunset Wave Gradient** (Coral-to-gold gradient text on spoken words, no box)
- **`19`** &bull; `viral-pop` — **Viral Pop (TikTok/Reels)** (High-energy yellow pop scale animation)
- **`20`** &bull; `curved-pill` — **Curved Cyan Box** (Dark glass rounded box with electric cyan active word pop)
- **`21`** &bull; `cinema-minimal` — **Cinema Minimal Subtitle** (Film subtitle with golden underline)
- **`22`** &bull; `neon-cyberpunk` — **Neon Cyberpunk Glow** (Hot pink neon glow box on active words)
- **`23`** &bull; `sticker-badge` — **Sticker Word Badge** (Steady horizontal neon lime sticker plate behind active words)
- **`24`** &bull; `terminal-code` — **Terminal / Hacker Code** (Monospace code block with amber typewriter reveal & cursor)
- **`25`** &bull; `frosted-glass` — **Frosted Glass Box** (Apple frosted glass box with clean static typography)
- **`26`** &bull; `comic-3d` — **Comic 3D Pop** (High-impact extruded comic 3D drop shadows)
- **`27`** &bull; `marker-brush` — **Marker Brush Lettering** (Hand-drawn highlighter marker lettering)
- **`28`** &bull; `newsroom-split` — **Newsroom Split Box** (Breaking-news uppercase plates with red highlight border)

---

## 🎙️ Video Transcription Workflow (Whisper -> Remotion)

1. **Extract Word Timestamps via Whisper**:
   ```bash
   whisper input_video.mp4 --model base --word_timestamps True --output_format json
   ```
2. **Convert to Remotion Caption Lines**:
   ```bash
   node .agents/skills/planet-in-pixel-captions/scripts/convert_whisper_json.js \
     --input input_video.json \
     --output src/pip-captions/myCaptions.json
   ```
3. **Render Video with Selected Style Number**:
   ```tsx
   <CaptionRenderer styleId={1} lines={myCaptions} />
   ```
4. **Export**:
   ```bash
   npx remotion render CaptionedVideo out.mp4 --gl=angle
   ```

---

## 🪐 About Planet in Pixel
Planet in Pixel is India's leading video editing and creative post-production school.  
Learn more at: **[Planet in Pixel](https://planet-in-pixel.com)**

---

## 📄 License
MIT License &copy; Planet in Pixel.
