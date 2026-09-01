import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const UniformCyberEmeraldStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 46,
}) => {
  const framesSinceLineStart = Math.max(
    0,
    ((absoluteTimeMs - line.startMs) / 1000) * fps
  );

  const lineOpacity = interpolate(framesSinceLineStart, [0, 8], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "18px 36px",
        background: "rgba(4, 20, 14, 0.9)",
        border: "1px solid rgba(0, 255, 136, 0.4)",
        boxShadow:
          "0 16px 36px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 255, 136, 0.2)",
        maxWidth: "92%",
        opacity: lineOpacity,
        boxSizing: "border-box",
      }}
    >
      {/* HUD Corner Tech Markers */}
      <div
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: "8px",
          height: "8px",
          borderTop: "2px solid #00FF88",
          borderLeft: "2px solid #00FF88",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-2px",
          right: "-2px",
          width: "8px",
          height: "8px",
          borderTop: "2px solid #00FF88",
          borderRight: "2px solid #00FF88",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-2px",
          left: "-2px",
          width: "8px",
          height: "8px",
          borderBottom: "2px solid #00FF88",
          borderLeft: "2px solid #00FF88",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-2px",
          right: "-2px",
          width: "8px",
          height: "8px",
          borderBottom: "2px solid #00FF88",
          borderRight: "2px solid #00FF88",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'Fira Code', monospace",
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          letterSpacing: "0.06em",
          lineHeight: 1.35,
          color: "#00FF88",
          textShadow:
            "0 0 14px rgba(0, 255, 136, 0.7), 0 2px 8px rgba(0, 0, 0, 0.9)",
        }}
      >
        {line.tokens.map((token, i) => (
          <span
            key={`${token.text}-${i}`}
            style={{
              display: "inline-block",
              margin: "4px 8px",
              verticalAlign: "middle",
              whiteSpace: "nowrap",
            }}
          >
            {token.text}
          </span>
        ))}
      </div>
    </div>
  );
};
