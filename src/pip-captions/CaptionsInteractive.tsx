import React from "react";
import { AbsoluteFill } from "remotion";
import { CaptionRenderer } from "./CaptionRenderer";
import { CaptionStyleId } from "./types";
import { CAPTION_STYLES_META } from "./sampleData";

export interface CaptionsInteractiveProps {
  styleId?: CaptionStyleId;
  backgroundTheme?: "dark-studio" | "cyber-grid" | "cinema-dark" | "transparent";
  fontSize?: number;
  bottomPosition?: string;
  showBadge?: boolean;
}

export const CaptionsInteractive: React.FC<CaptionsInteractiveProps> = ({
  styleId = "curved-pill",
  backgroundTheme = "dark-studio",
  fontSize,
  bottomPosition = "28%",
  showBadge = true,
}) => {
  const currentMeta =
    CAPTION_STYLES_META.find((m) => m.id === styleId) || CAPTION_STYLES_META[0];

  const getBackground = () => {
    switch (backgroundTheme) {
      case "cyber-grid":
        return "radial-gradient(circle at 50% 30%, #1e1b4b 0%, #030712 100%)";
      case "cinema-dark":
        return "radial-gradient(circle at 50% 50%, #18181b 0%, #09090b 100%)";
      case "transparent":
        return "transparent";
      case "dark-studio":
      default:
        return "radial-gradient(circle at 50% 40%, #1e293b 0%, #0b0f19 100%)";
    }
  };

  return (
    <AbsoluteFill
      style={{
        background: getBackground(),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Top watermark / info badge */}
      {showBadge && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "9999px",
            padding: "8px 20px",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: currentMeta.badgeColor,
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
            {currentMeta.name}
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#94A3B8",
              borderLeft: "1px solid rgba(255,255,255,0.2)",
              paddingLeft: "10px",
            }}
          >
            {currentMeta.category}
          </span>
        </div>
      )}

      {/* Render selected style */}
      <CaptionRenderer
        styleId={styleId}
        fontSize={fontSize}
        bottomPosition={bottomPosition}
      />
    </AbsoluteFill>
  );
};
