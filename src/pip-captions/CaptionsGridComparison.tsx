import React from "react";
import { AbsoluteFill } from "remotion";
import { CaptionRenderer } from "./CaptionRenderer";
import { CaptionStyleId } from "./types";

interface GridItemProps {
  title: string;
  styleId: CaptionStyleId;
  tag: string;
  tagColor: string;
}

const GridCell: React.FC<GridItemProps> = ({
  title,
  styleId,
  tag,
  tagColor,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      {/* Top Label */}
      <div
        style={{
          position: "absolute",
          top: "18px",
          left: "22px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: "18px",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: tagColor,
            backgroundColor: `${tagColor}22`,
            border: `1px solid ${tagColor}55`,
            padding: "2px 8px",
            borderRadius: "9999px",
          }}
        >
          {tag}
        </span>
      </div>

      {/* Captions inside cell */}
      <CaptionRenderer
        styleId={styleId}
        fontSize={36}
        bottomPosition="28%"
      />
    </div>
  );
};

export const CaptionsGridComparison: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070A11",
        padding: "36px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Planet in Pixel &bull; Side-by-Side Captions Matrix
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#94A3B8" }}>
            Real-time multi-style synchronized comparison
          </p>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "20px",
        }}
      >
        <GridCell
          title="Viral Pop (Hormozi)"
          styleId="viral-pop"
          tag="Animated Bounce"
          tagColor="#FFE600"
        />
        <GridCell
          title="Curved Line Pill"
          styleId="curved-pill"
          tag="Curved Background"
          tagColor="#00E5FF"
        />
        <GridCell
          title="Cinema Subtitle"
          styleId="cinema-minimal"
          tag="No Animation"
          tagColor="#F5D77F"
        />
        <GridCell
          title="Cyberpunk Neon"
          styleId="neon-cyberpunk"
          tag="Glow & Pulse"
          tagColor="#FF007F"
        />
      </div>
    </AbsoluteFill>
  );
};
