import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const CinematicChampagneStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 54,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 44px",
        borderRadius: "18px",
        background:
          "linear-gradient(180deg, rgba(28, 25, 23, 0.9) 0%, rgba(12, 10, 9, 0.95) 100%)",
        border: "1px solid rgba(212, 175, 55, 0.45)",
        boxShadow:
          "0 18px 45px rgba(0, 0, 0, 0.75), inset 0 0 15px rgba(212, 175, 55, 0.15)",
        maxWidth: "92%",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative Gold Jewelry Diamonds */}
      <div
        style={{
          position: "absolute",
          top: "-5px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#D4AF37",
          fontSize: "10px",
          letterSpacing: "4px",
        }}
      >
        &#9670;
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: `${fontSize}px`,
          letterSpacing: "0.03em",
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

          const translateY = interpolate(framesSinceStart, [0, 18], [24, 0], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const opacity = interpolate(framesSinceStart, [0, 15], [0, 1], {
            easing: Easing.out(Easing.quad),
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
                  color: isActive
                    ? "#D4AF37" // Champagne Gold
                    : isPast
                    ? "#FFFDF7" // Pearl Ivory
                    : "rgba(255, 253, 247, 0.35)",
                  textShadow: isActive
                    ? "0 0 20px rgba(212, 175, 55, 0.7), 0 2px 10px rgba(0,0,0,0.8)"
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
