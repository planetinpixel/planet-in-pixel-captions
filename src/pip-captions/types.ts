export interface CaptionToken {
  text: string;
  fromMs: number;
  toMs: number;
}

export interface CaptionLine {
  id: string;
  startMs: number;
  endMs: number;
  tokens: CaptionToken[];
  fullText: string;
}

export type CaptionStyleId =
  // 1 to 28 Numbered Identifiers
  | "01" | "1" | "style-01" | "emphasis-gradient-duo"
  | "02" | "2" | "style-02" | "emphasis-serif-cyan"
  | "03" | "3" | "style-03" | "static-frost-charcoal-pill"
  | "04" | "4" | "style-04" | "static-neon-cyan-pill"
  | "05" | "5" | "style-05" | "static-crimson-pill"
  | "06" | "6" | "style-06" | "static-editorial-vogue"
  | "07" | "7" | "style-07" | "static-broadcast-clean"
  | "08" | "8" | "style-08" | "uniform-swiss-chalk"
  | "09" | "9" | "style-09" | "uniform-vintage-sepia"
  | "10" | "style-10" | "uniform-cyber-emerald"
  | "11" | "style-11" | "uniform-tokyo-orchid"
  | "12" | "style-12" | "uniform-hollywood-gold"
  | "13" | "style-13" | "cinematic-tungsten"
  | "14" | "style-14" | "cinematic-nordic-frost"
  | "15" | "style-15" | "cinematic-bladerunner"
  | "16" | "style-16" | "cinematic-champagne"
  | "17" | "style-17" | "cinematic-ethereal"
  | "18" | "style-18" | "sunset-gradient"
  | "19" | "style-19" | "viral-pop"
  | "20" | "style-20" | "curved-pill"
  | "21" | "style-21" | "cinema-minimal"
  | "22" | "style-22" | "neon-cyberpunk"
  | "23" | "style-23" | "sticker-badge"
  | "24" | "style-24" | "terminal-code"
  | "25" | "style-25" | "frosted-glass"
  | "26" | "style-26" | "comic-3d"
  | "27" | "style-27" | "marker-brush"
  | "28" | "style-28" | "newsroom-split";

export interface CaptionStyleMeta {
  number: number;
  id: CaptionStyleId;
  slug: string;
  name: string;
  category:
    | "Keyword Emphasis"
    | "Static Full-Line"
    | "Uniform"
    | "Cinematic"
    | "Pop & Animated";
  fontFamily: string;
  description: string;
  badgeColor: string;
}

export interface StyleRendererProps {
  line: CaptionLine;
  absoluteTimeMs: number;
  fps: number;
  fontSize?: number;
}
