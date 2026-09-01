/**
 * 🪐 PLANET IN PIXEL (PIP) - CAPTIONS BRAND CONFIG & PRESETS
 * India's Best Video Editing School & Creative Suite
 *
 * Centralized theme settings, custom brand palettes, and default word emphasis rules.
 */

export interface PIPBrandConfig {
  brandName: string;
  defaultStyleId: string;
  defaultFontSize: number;
  defaultBottomPosition: string;
  brandColors: {
    primary: string;       // PIP Electric Cyan / Pink
    accent: string;        // PIP Sunset Gold
    backgroundDark: string;// PIP Deep Studio Charcoal
    textLight: string;
    textMuted: string;
  };
  defaultEmphasisKeywords: string[];
}

export const PIP_DEFAULT_CONFIG: PIPBrandConfig = {
  brandName: "Planet in Pixel",
  defaultStyleId: "emphasis-gradient-duo",
  defaultFontSize: 62,
  defaultBottomPosition: "25%",
  brandColors: {
    primary: "#EC4899",       // Rose / Pink
    accent: "#00C2FF",        // Electric Cyan
    backgroundDark: "#0B0F19",// Studio Obsidian
    textLight: "#FFFFFF",
    textMuted: "#94A3B8",
  },
  defaultEmphasisKeywords: [
    "Planet",
    "Pixel",
    "Video",
    "Editing",
    "School",
    "Content",
    "creators",
    "Editors",
    "viral",
    "cinematic",
    "secret",
    "money",
    "growth",
  ],
};
