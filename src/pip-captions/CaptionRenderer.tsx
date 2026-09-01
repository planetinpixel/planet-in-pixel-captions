import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionLine, CaptionStyleId } from "./types";
import { SAMPLE_CAPTION_LINES } from "./sampleData";

// Numbered Style Component Imports (01 to 28)
import { EmphasisGradientDuoStyle as Style01 } from "./styles/Style01_EmphasisGradientDuo";
import { EmphasisSerifCyanStyle as Style02 } from "./styles/Style02_EmphasisSerifCyan";
import { StaticFrostCharcoalPillStyle as Style03 } from "./styles/Style03_StaticFrostCharcoal";
import { StaticNeonCyanPillStyle as Style04 } from "./styles/Style04_StaticNeonCyan";
import { StaticCrimsonPillStyle as Style05 } from "./styles/Style05_StaticCrimson";
import { StaticEditorialVogueStyle as Style06 } from "./styles/Style06_StaticEditorialVogue";
import { StaticBroadcastCleanStyle as Style07 } from "./styles/Style07_StaticBroadcastClean";
import { UniformSwissChalkStyle as Style08 } from "./styles/Style08_UniformSwissChalk";
import { UniformVintageSepiaStyle as Style09 } from "./styles/Style09_UniformVintageSepia";
import { UniformCyberEmeraldStyle as Style10 } from "./styles/Style10_UniformCyberEmerald";
import { UniformTokyoOrchidStyle as Style11 } from "./styles/Style11_UniformTokyoOrchid";
import { UniformHollywoodGoldStyle as Style12 } from "./styles/Style12_UniformHollywoodGold";
import { CinematicTungstenStyle as Style13 } from "./styles/Style13_CinematicTungsten";
import { CinematicNordicFrostStyle as Style14 } from "./styles/Style14_CinematicNordicFrost";
import { CinematicBladeRunnerStyle as Style15 } from "./styles/Style15_CinematicBladeRunner";
import { CinematicChampagneStyle as Style16 } from "./styles/Style16_CinematicChampagne";
import { CinematicEtherealStyle as Style17 } from "./styles/Style17_CinematicEthereal";
import { GradientSunsetStyle as Style18 } from "./styles/Style18_SunsetGradient";
import { ViralPopStyle as Style19 } from "./styles/Style19_ViralPop";
import { CurvedPillStyle as Style20 } from "./styles/Style20_CurvedPill";
import { CinemaMinimalStyle as Style21 } from "./styles/Style21_CinemaMinimal";
import { NeonCyberpunkStyle as Style22 } from "./styles/Style22_NeonCyberpunk";
import { StickerBadgeStyle as Style23 } from "./styles/Style23_StickerBadge";
import { TerminalCodeStyle as Style24 } from "./styles/Style24_TerminalCode";
import { FrostedGlassStyle as Style25 } from "./styles/Style25_FrostedGlass";
import { Comic3DStyle as Style26 } from "./styles/Style26_Comic3D";
import { MarkerBrushStyle as Style27 } from "./styles/Style27_MarkerBrush";
import { NewsroomSplitStyle as Style28 } from "./styles/Style28_NewsroomSplit";

export interface CaptionRendererProps {
  /**
   * Style identifier: accepts numbers (1-28), number strings ("1", "01", "style-01"), or slug names ("emphasis-gradient-duo")
   */
  styleId?: CaptionStyleId | number | string;
  lines?: CaptionLine[];
  fontSize?: number;
  bottomPosition?: string; // e.g. "25%"
  highlightWords?: string[];
  isWordHighlighted?: (
    text: string,
    index: number,
    lineId?: string
  ) => boolean;
}

/**
 * Normalizes any input style representation (1, "01", "style-01", "viral-pop") into a canonical index 1-28
 */
function normalizeStyleNumber(styleId: CaptionStyleId | number | string | undefined): number {
  if (typeof styleId === "number") {
    return styleId >= 1 && styleId <= 28 ? styleId : 1;
  }
  if (!styleId) return 1;

  const clean = String(styleId).toLowerCase().trim();

  // Check direct numbers / style- prefixes
  if (/^(style-)?0?1$/.test(clean) || clean === "emphasis-gradient-duo") return 1;
  if (/^(style-)?0?2$/.test(clean) || clean === "emphasis-serif-cyan") return 2;
  if (/^(style-)?0?3$/.test(clean) || clean === "static-frost-charcoal-pill") return 3;
  if (/^(style-)?0?4$/.test(clean) || clean === "static-neon-cyan-pill") return 4;
  if (/^(style-)?0?5$/.test(clean) || clean === "static-crimson-pill") return 5;
  if (/^(style-)?0?6$/.test(clean) || clean === "static-editorial-vogue") return 6;
  if (/^(style-)?0?7$/.test(clean) || clean === "static-broadcast-clean") return 7;
  if (/^(style-)?0?8$/.test(clean) || clean === "uniform-swiss-chalk") return 8;
  if (/^(style-)?0?9$/.test(clean) || clean === "uniform-vintage-sepia") return 9;
  if (/^(style-)?10$/.test(clean) || clean === "uniform-cyber-emerald") return 10;
  if (/^(style-)?11$/.test(clean) || clean === "uniform-tokyo-orchid") return 11;
  if (/^(style-)?12$/.test(clean) || clean === "uniform-hollywood-gold") return 12;
  if (/^(style-)?13$/.test(clean) || clean === "cinematic-tungsten") return 13;
  if (/^(style-)?14$/.test(clean) || clean === "cinematic-nordic-frost") return 14;
  if (/^(style-)?15$/.test(clean) || clean === "cinematic-bladerunner") return 15;
  if (/^(style-)?16$/.test(clean) || clean === "cinematic-champagne") return 16;
  if (/^(style-)?17$/.test(clean) || clean === "cinematic-ethereal") return 17;
  if (/^(style-)?18$/.test(clean) || clean === "sunset-gradient") return 18;
  if (/^(style-)?19$/.test(clean) || clean === "viral-pop") return 19;
  if (/^(style-)?20$/.test(clean) || clean === "curved-pill") return 20;
  if (/^(style-)?21$/.test(clean) || clean === "cinema-minimal") return 21;
  if (/^(style-)?22$/.test(clean) || clean === "neon-cyberpunk") return 22;
  if (/^(style-)?23$/.test(clean) || clean === "sticker-badge") return 23;
  if (/^(style-)?24$/.test(clean) || clean === "terminal-code") return 24;
  if (/^(style-)?25$/.test(clean) || clean === "frosted-glass") return 25;
  if (/^(style-)?26$/.test(clean) || clean === "comic-3d") return 26;
  if (/^(style-)?27$/.test(clean) || clean === "marker-brush") return 27;
  if (/^(style-)?28$/.test(clean) || clean === "newsroom-split") return 28;

  return 1;
}

export const CaptionRenderer: React.FC<CaptionRendererProps> = ({
  styleId = 1,
  lines = SAMPLE_CAPTION_LINES,
  fontSize,
  bottomPosition = "26%",
  highlightWords,
  isWordHighlighted,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const absoluteTimeMs = (frame / fps) * 1000;

  // Find the active line for the current frame
  const activeLine = lines.find(
    (line) => absoluteTimeMs >= line.startMs && absoluteTimeMs < line.endMs
  );

  if (!activeLine) {
    return null;
  }

  const num = normalizeStyleNumber(styleId);

  const props = {
    line: activeLine,
    absoluteTimeMs,
    fps,
    fontSize,
    highlightWords,
    isWordHighlighted,
  };

  const renderByNumber = () => {
    switch (num) {
      // 1-2: Keyword Emphasis
      case 1:
        return <Style01 {...props} />;
      case 2:
        return <Style02 {...props} />;

      // 3-7: Static Full-Line
      case 3:
        return <Style03 {...props} />;
      case 4:
        return <Style04 {...props} />;
      case 5:
        return <Style05 {...props} />;
      case 6:
        return <Style06 {...props} />;
      case 7:
        return <Style07 {...props} />;

      // 8-12: Uniform
      case 8:
        return <Style08 {...props} />;
      case 9:
        return <Style09 {...props} />;
      case 10:
        return <Style10 {...props} />;
      case 11:
        return <Style11 {...props} />;
      case 12:
        return <Style12 {...props} />;

      // 13-17: Cinematic
      case 13:
        return <Style13 {...props} />;
      case 14:
        return <Style14 {...props} />;
      case 15:
        return <Style15 {...props} />;
      case 16:
        return <Style16 {...props} />;
      case 17:
        return <Style17 {...props} />;

      // 18-28: Pop & Animated
      case 18:
        return <Style18 {...props} />;
      case 19:
        return <Style19 {...props} />;
      case 20:
        return <Style20 {...props} />;
      case 21:
        return <Style21 {...props} />;
      case 22:
        return <Style22 {...props} />;
      case 23:
        return <Style23 {...props} />;
      case 24:
        return <Style24 {...props} />;
      case 25:
        return <Style25 {...props} />;
      case 26:
        return <Style26 {...props} />;
      case 27:
        return <Style27 {...props} />;
      case 28:
        return <Style28 {...props} />;

      default:
        return <Style01 {...props} />;
    }
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: bottomPosition,
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderByNumber()}
      </div>
    </AbsoluteFill>
  );
};
