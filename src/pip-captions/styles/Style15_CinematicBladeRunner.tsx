import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const CinematicBladeRunnerStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 52,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 40px",
        background: "rgba(13, 20, 28, 0.85)",
        border: "1px solid rgba(45, 212, 191, 0.35)",
        boxShadow:
          "0 16px 36px rgba(0, 0, 0, 0.8), 0 0 20px rgba(45, 212, 191, 0.15)",
        maxWidth: "92%",
        boxSizing: "border-box",
      }}
    >
      {/* Anamorphic Scope Corner Crosshairs */}
      <div
        style={{
          position: "absolute",
          top: "-3px",
          left: "-3px",
          width: "10px",
          height: "10px",
          borderTop: "2px solid #2DD4BF",
          borderLeft: "2px solid #2DD4BF",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-3px",
          right: "-3px",
          width: "10px",
          height: "10px",
          borderTop: "2px solid #2DD4BF",
          borderRight: "2px solid #2DD4BF",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-3px",
          left: "-3px",
          width: "10px",
          height: "10px",
          borderBottom: "2px solid #2DD4BF",
          borderLeft: "2px solid #2DD4BF",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-3px",
          right: "-3px",
          width: "10px",
          height: "10px",
          borderBottom: "2px solid #2DD4BF",
          borderRight: "2px solid #2DD4BF",
        }}
      />

      {/* Scope Metadata Tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "#2DD4BF",
          marginBottom: "6px",
          opacity: 0.8,
          textTransform: "uppercase",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        <span>[ 2.39:1 ANAMORPHIC ]</span>
      </div>

      {/* Words Container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          letterSpacing: "0.04em",
          lineHeight: 1.3,
        }}
      >
        {line.tokens.map((token, i) => {
          const isActive =
            absoluteTimeMs >= token.fromMs && absoluteTimeMs < token.toMs;
          const isPast = absoluteTimeMs >= token.toMs;

          const framesSinceStart = Math.max(
            0,
            ((absoluteTimeMs - token.fromMs) / 1000) * fps
          );

          const translateY = interpolate(framesSinceStart, [0, 18], [28, 0], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const opacity = interpolate(framesSinceStart, [0, 14], [0, 1], {
            easing: Easing.out(Easing.quad),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const blurPx = interpolate(framesSinceStart, [0, 10], [6, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <span
              key={`${token.text}-${i}`}
              style={{
                display: "inline-block",
                position: "relative",
                margin: "4px 8px",
                verticalAlign: "middle",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `translateY(${translateY}px)`,
                  opacity,
                  filter: `blur(${blurPx}px)`,
                  color: isActive
                    ? "#FCD34D" // Anamorphic Gold
                    : isPast
                    ? "#FFFFFF"
                    : "rgba(255, 255, 255, 0.4)",
                  textShadow: isActive
                    ? "0 0 16px rgba(252, 211, 77, 0.8), 0 0 30px rgba(45, 212, 191, 0.4)"
                    : "0 2px 8px rgba(0,0,0,0.8)",
                  whiteSpace: "nowrap",
                }}
              >
                {token.text}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
