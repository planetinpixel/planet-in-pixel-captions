import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const CinematicEtherealStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 50,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "22px 42px",
        background: "rgba(10, 10, 20, 0.75)",
        borderTop: "1px solid rgba(192, 132, 252, 0.3)",
        borderBottom: "1px solid rgba(192, 132, 252, 0.3)",
        boxShadow:
          "0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(192, 132, 252, 0.15)",
        backdropFilter: "blur(20px)",
        maxWidth: "92%",
        boxSizing: "border-box",
      }}
    >
      {/* Monolith Pillar Left and Right Accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "3px",
          backgroundColor: "#C084FC",
          boxShadow: "0 0 10px #C084FC",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "3px",
          backgroundColor: "#C084FC",
          boxShadow: "0 0 10px #C084FC",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          lineHeight: 1.35,
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

          const translateY = interpolate(framesSinceStart, [0, 20], [30, 0], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const opacity = interpolate(framesSinceStart, [0, 16], [0, 1], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <span
              key={`${token.text}-${i}`}
              style={{
                display: "inline-block",
                position: "relative",
                margin: "4px 9px",
                verticalAlign: "middle",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `translateY(${translateY}px)`,
                  opacity,
                  color: isActive
                    ? "#C084FC" // Starlight Violet
                    : isPast
                    ? "#E2E8F0" // Moonlit Platinum
                    : "rgba(226, 232, 240, 0.35)",
                  textShadow: isActive
                    ? "0 0 20px rgba(192, 132, 252, 0.8), 0 2px 10px rgba(0,0,0,0.8)"
                    : "0 2px 8px rgba(0,0,0,0.7)",
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
