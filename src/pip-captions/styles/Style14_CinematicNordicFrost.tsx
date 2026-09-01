import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const CinematicNordicFrostStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 50,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "16px 36px",
        borderRadius: "14px",
        background: "rgba(15, 23, 42, 0.65)",
        border: "1px solid rgba(147, 197, 253, 0.3)",
        boxShadow:
          "0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(24px)",
        maxWidth: "94%",
        boxSizing: "border-box",
        fontFamily: "'Tenor Sans', sans-serif",
        fontSize: `${fontSize}px`,
        letterSpacing: "0.06em",
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

        // Slow cinematic upward glide
        const translateY = interpolate(framesSinceStart, [0, 20], [30, 0], {
          easing: Easing.bezier(0.19, 1, 0.22, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Delicate fade-in
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
                  ? "#93C5FD" // Glacial Ice Blue
                  : isPast
                  ? "#F8FAFC" // Polar White
                  : "rgba(248, 250, 252, 0.35)",
                textShadow: isActive
                  ? "0 0 18px rgba(147, 197, 253, 0.8), 0 2px 10px rgba(0,0,0,0.8)"
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
  );
};
