import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const UniformTokyoOrchidStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 52,
}) => {
  const framesSinceLineStart = Math.max(
    0,
    ((absoluteTimeMs - line.startMs) / 1000) * fps
  );

  const lineOpacity = interpolate(framesSinceLineStart, [0, 10], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  const lineTranslateY = interpolate(framesSinceLineStart, [0, 12], [14, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "16px 36px",
        borderRadius: "18px",
        background: "rgba(25, 10, 40, 0.9)",
        border: "2px solid rgba(232, 121, 249, 0.45)",
        boxShadow:
          "0 18px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(232, 121, 249, 0.25)",
        backdropFilter: "blur(20px)",
        maxWidth: "94%",
        opacity: lineOpacity,
        transform: `translateY(${lineTranslateY}px)`,
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 800,
        fontSize: `${fontSize}px`,
        color: "#E879F9",
        textShadow:
          "0 0 16px rgba(232, 121, 249, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
        lineHeight: 1.3,
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
  );
};
