# 28 Production Caption Styles Reference

This reference document outlines all 28 available caption styles in the Remotion Captions library, their typographic rules, and their visual styling parameters.

---

## 🎯 1. Keyword Emphasis Styles (Dual-Typography)

### 1. `emphasis-gradient-duo` (Style 28)
- **Primary Font**: `Inter` 900 / `Montserrat` 900
- **Base Words**: Crisp White (`#FFFFFF`), `alignItems: baseline`, `verticalAlign: baseline`.
- **Emphasized Words**: Italic Sunset-to-Violet gradient (`linear-gradient(135deg, #F43F5E 0%, #EC4899 25%, #A855F7 65%, #3B82F6 100%)`) with safe wrapper drop-shadow.
- **Customization Prop**: `highlightWords={["words", "to", "gradient"]}`.

### 2. `emphasis-serif-cyan` (Style 29)
- **Primary Fonts**: `Inter` 800 (Sans Base) + `Playfair Display` 600 Italic (Serif Accent).
- **Base Words**: Bold Pure White Sans.
- **Emphasized Words**: Glowing Electric Cyan Italic Serif (`#00C2FF`, `textShadow: 0 0 18px rgba(0, 194, 255, 0.75)`).
- **Customization Prop**: `highlightWords={["words", "to", "cyan"]}`.

---

## 🧊 2. Static Full-Line Styles (Entire Line Appears at Once)

### 3. `static-frost-charcoal-pill` (Style 27)
- **Font**: `Sora` 600
- **Look**: Dark charcoal frosted glass (`rgba(18, 22, 30, 0.9)`), silver frost typography, `borderRadius: 18px`.

### 4. `static-neon-cyan-pill` (Style 23)
- **Font**: `Orbitron` 800
- **Look**: Deep cyber blue glass (`rgba(6, 30, 45, 0.92)`), cyan border (`#00F0FF`), `borderRadius: 18px`.

### 5. `static-crimson-pill` (Style 25)
- **Font**: `Poppins` 800
- **Look**: Velvet crimson wine glass (`rgba(45, 10, 20, 0.92)`), rose border (`#F43F5E`), `borderRadius: 18px`.

### 6. `static-editorial-vogue` (Style 24)
- **Font**: `Cormorant Garamond` 600
- **Look**: Unboxed luxury sand-ivory roman serif (`#F5EBE0`), wide tracking (`0.14em`).

### 7. `static-broadcast-clean` (Style 26)
- **Font**: `DM Sans` 800
- **Look**: Unboxed broadcast sunshine yellow (`#FFD200`) with high-contrast black outline stroke.

---

## ✨ 3. Uniform / No Highlight Styles

### 8. `uniform-swiss-chalk` (Style 18)
- **Font**: `Inter` / `DM Sans` 600
- **Look**: Pure chalk white text with letter-spacing `0.16em` and subtle ambient vignette.

### 9. `uniform-vintage-sepia` (Style 19)
- **Font**: `Cormorant Garamond` Italic 600
- **Look**: 16mm warm cream text in a dark chocolate glass box (`borderRadius: 18px`).

### 10. `uniform-cyber-emerald` (Style 20)
- **Font**: `Fira Code` 700
- **Look**: Phosphor green HUD monospace with tactical corner brackets.

### 11. `uniform-tokyo-orchid` (Style 21)
- **Font**: `Outfit` 800
- **Look**: Electric neon orchid text inside a dark plum glass box (`borderRadius: 18px`).

### 12. `uniform-hollywood-gold` (Style 22)
- **Font**: `Marcellus` / `Cinzel` 700
- **Look**: 24k solid gold Roman serif with geometric Art Deco double border.

---

## 🎬 4. Cinematic Bottom-Slide Styles (Slow Rising Glide)

### 13. `cinematic-tungsten` (Style 13)
- **Font**: `Cinzel` 700
- **Look**: IMAX 70mm amber gold title brackets with slow vertical rise.

### 14. `cinematic-nordic-frost` (Style 14)
- **Font**: `Tenor Sans` 600
- **Look**: Glacial blue text on minimalist frosted glass bar with slow upward flow.

### 15. `cinematic-bladerunner` (Style 15)
- **Font**: `Sora` 700
- **Look**: Neo-noir anamorphic teal & gold text with crosshair reticles.

### 16. `cinematic-champagne` (Style 16)
- **Font**: `Playfair Display` 600 Italic
- **Look**: Luxury champagne gold text in a dark jewelry box with diamond accent.

### 17. `cinematic-ethereal` (Style 17)
- **Font**: `Space Grotesk` 700
- **Look**: Wide-spaced interstellar monolith text with lavender edge beams.

---

## ⚡ 5. Pop & Creative Styles (Word-by-Word Animation)

### 18. `sunset-gradient` (Style 11)
- **Font**: `Outfit` 900
- **Look**: Coral-to-gold gradient on active spoken word, solid white on other words (no box).

### 19. `viral-pop` (Style 01)
- **Font**: `Montserrat` 900
- **Look**: TikTok/Shorts high-energy yellow pop scale animation with black stroke.

### 20. `curved-pill` (Style 02)
- **Font**: `Poppins` 700
- **Look**: Dark glass rounded box with electric cyan active word pop.

### 21. `cinema-minimal` (Style 03)
- **Font**: `Playfair Display` 600
- **Look**: Minimalist film subtitle with golden underline on active words.

### 22. `neon-cyberpunk` (Style 04)
- **Font**: `Orbitron` 900
- **Look**: Hot pink neon glow box on active words with cyber cyan base.

### 23. `sticker-badge` (Style 06)
- **Font**: `Inter` 900
- **Look**: Steady horizontal lime-yellow sticker plate behind active words.

### 24. `terminal-code` (Style 07)
- **Font**: `Fira Code` 700
- **Look**: Hacker terminal with typewriter reveal and blinking cursor.

### 25. `frosted-glass` (Style 08)
- **Font**: `Inter` 600
- **Look**: Frosted glass rounded box with crisp, uniform typography.

### 26. `comic-3d` (Style 09)
- **Font**: `Bangers`
- **Look**: Energetic 3D extruded comic book drop shadows.

### 27. `marker-brush` (Style 10)
- **Font**: `Permanent Marker`
- **Look**: Highlighter marker lettering with organic spring bounce (no underline).

### 28. `newsroom-split` (Style 12)
- **Font**: `Barlow Condensed` 900
- **Look**: Heavy uppercase documentary plates with red highlight indicator.
