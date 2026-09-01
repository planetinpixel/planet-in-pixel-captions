---
name: planet-in-pixel-captions
description: >-
  Planet in Pixel (PIP) Official Video Captions Skill for Remotion.
  Create, style, and render 28 viral, cinematic, static, and dual-font keyword-emphasis captions tuned by Planet in Pixel.
  Use when creating subtitles or animated captions for videos, converting Whisper/transcription timestamps into Remotion captions, or applying Planet in Pixel brand typography.
---

# 🪐 Planet in Pixel &bull; Video Captions Pro Skill
> **Official Captions Suite by Planet in Pixel — India's Best Video Editing School.**

A battle-tested Remotion captions component engine featuring **28 fine-tuned caption styles** engineered for Reels, Shorts, YouTube long-form, and luxury cinematic videos.

---

## 📁 Branded Project Architecture

```text
my-video-project/
├── .agents/
│   └── skills/
│       └── planet-in-pixel-captions/      # 🪐 PIP Agent Skill
│           ├── SKILL.md                   # Skill instructions & style catalog
│           ├── scripts/
│           │   └── convert_whisper.js     # Whisper-to-PIP JSON converter
│           └── references/
│               └── styles_reference.md    # 28 Style typography & baseline guide
│
├── src/
│   └── pip-captions/                      # 🪐 PIP Captions Module
│       ├── pipConfig.ts                   # Central brand colors & keyword triggers
│       ├── types.ts                       # Type definitions
│       ├── CaptionRenderer.tsx            # Master caption renderer
│       ├── sampleData.ts                  # Sample showcase datasets
│       └── styles/                        # 28 Fine-Tuned Style Components
│           ├── EmphasisGradientDuoStyle.tsx
│           ├── EmphasisSerifCyanStyle.tsx
│           ├── StaticFrostCharcoalPillStyle.tsx
│           ├── CinematicTungstenStyle.tsx
│           └── ... (all 28 styles)
```

---

## 🚀 Quick Usage in Any Video

```tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Video } from "@remotion/media";
import { CaptionRenderer } from "./pip-captions/CaptionRenderer";
import myTranscribedLines from "./pip-captions/myLines.json";

export const MyVideoComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 1. Underlying Video */}
      <Video src="footage.mp4" />

      {/* 2. Planet in Pixel Captions Layer */}
      <CaptionRenderer
        styleId="emphasis-gradient-duo"
        lines={myTranscribedLines}
        fontSize={62}
        bottomPosition="25%"
        highlightWords={["Planet in Pixel", "Video Editing School", "Content creators"]}
      />
    </AbsoluteFill>
  );
};
```

---

## 🎨 The 28 Fine-Tuned Styles Catalog

1. **`emphasis-gradient-duo`** — Bold White + Italic Sunset/Violet Gradient (Dual-font emphasis).
2. **`emphasis-serif-cyan`** — Bold Sans + Glowing Cyan Italic Serif (Luxury contrast).
3. **`static-frost-charcoal-pill`** — Frosted Charcoal Rounded Box (`18px` corners).
4. **`static-neon-cyan-pill`** — Cyber Glass Rounded Box.
5. **`static-crimson-pill`** — Velvet Crimson Wine Rounded Box.
6. **`static-editorial-vogue`** — Vogue Sand-Ivory Roman Serif with Golden Rule.
7. **`static-broadcast-clean`** — Netflix Doc Sunshine Yellow with Crisp Outline.
8. **`uniform-swiss-chalk`** — Minimalist Chalk White (Wide tracking, no highlight).
9. **`uniform-vintage-sepia`** — 16mm Warm Sepia in Chocolate Glass Box.
10. **`uniform-cyber-emerald`** — Tactical Phosphor Green HUD with Reticle Brackets.
11. **`uniform-tokyo-orchid`** — Tokyo Neon Orchid in Plum Glass Box.
12. **`uniform-hollywood-gold`** — 24k Art Deco Solid Gold Roman Serif.
13. **`cinematic-tungsten`** — IMAX 70mm Tungsten Gold with Letterbox Brackets.
14. **`cinematic-nordic-frost`** — Nordic Arthouse Glacial Blue Rise.
15. **`cinematic-bladerunner`** — Neo-noir Anamorphic Teal & Gold with Chromatic Blur.
16. **`cinematic-champagne`** — Haute Couture Champagne Gold Diamond Jewelry Box.
17. **`cinematic-ethereal`** — Interstellar Monolith Lavender Edge Beams.
18. **`sunset-gradient`** — Smooth Coral-to-Gold Spoken Word Gradient (Clean, no box).
19. **`viral-pop`** — TikTok/Reels Yellow High-Energy Pop Scale.
20. **`curved-pill`** — Dark Glass Rounded Box with Cyan Pop.
21. **`cinema-minimal`** — Film Subtitle with Golden Underline.
22. **`neon-cyberpunk`** — Hot Pink Glow Box on Active Words.
23. **`sticker-badge`** — Steady Horizontal Neon Lime Sticker Plate.
24. **`terminal-code`** — Amber Hacker Terminal with Typewriter Reveal.
25. **`frosted-glass`** — Apple Frosted Glass Box with Clean Static Typography.
26. **`comic-3d`** — High-Impact 3D Extruded Comic Drop Shadows.
27. **`marker-brush`** — Permanent Marker Highlighter Lettering.
28. **`newsroom-split`** — Breaking News Uppercase Plates with Red Border.

---

## 🛠️ Engine Principles & Rules

1. **Locked Baseline Alignment**: When combining different typefaces (e.g. `Inter` + `Playfair Display Italic`), always use `verticalAlign: "baseline"` and `alignItems: "baseline"` to eliminate layout jitter.
2. **Chromium Drop-Shadow Decoupling**: CSS `filter: drop-shadow(...)` is always placed on the parent span wrapper to prevent Chromium from rendering background-clipped text as solid blocks.
3. **Refined Box Curvature**: Rounded box corner radius is standardized at `18px` (`rounded-2xl`).
