import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const CinematicTungstenStyle: React.FC<StyleRendererProps> = ({
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
        padding: "24px 44px",
        maxWidth: "92%",
        boxSizing: "border-box",
      }}
    >
      {/* Top and Bottom Fine Gold Cinematic Hairline Accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.6) 50%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.6) 50%, transparent 100%)",
        }}
      />

      {/* Cinematic Brackets */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          bottom: "8px",
          left: "6px",
          width: "8px",
          borderLeft: "2px solid rgba(245, 158, 11, 0.8)",
          borderTop: "2px solid rgba(245, 158, 11, 0.8)",
          borderBottom: "2px solid rgba(245, 158, 11, 0.8)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "8px",
          bottom: "8px",
          right: "6px",
          width: "8px",
          borderRight: "2px solid rgba(245, 158, 11, 0.8)",
          borderTop: "2px solid rgba(245, 158, 11, 0.8)",
          borderBottom: "2px solid rgba(245, 158, 11, 0.8)",
        }}
      />

      {/* Text Container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'Cinzel', Georgia, serif",
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          letterSpacing: "0.08em",
          lineHeight: 1.35,
          overflow: "hidden", // Clean cinematic letterbox mask
          padding: "4px 0",
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

          // Slow, graceful cinematic rise curve
          const translateY = interpolate(framesSinceStart, [0, 18], [34, 0], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Soft luminance fade
          const opacity = interpolate(framesSinceStart, [0, 14], [0, 1], {
            easing: Easing.out(Easing.quad),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Subtle optical de-focus reveal
          const blurPx = interpolate(framesSinceStart, [0, 12], [8, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <span
              key={`${token.text}-${i}`}
              style={{
                display: "inline-block",
                position: "relative",
                margin: "4px 10px",
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
                    ? "#F59E0B" // Tungsten Gold Highlight
                    : isPast
                    ? "#FEF3C7" // Warm Ivory
                    : "rgba(254, 243, 199, 0.3)",
                  textShadow: isActive
                    ? "0 0 20px rgba(245, 158, 11, 0.7), 0 4px 12px rgba(0,0,0,0.9)"
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
