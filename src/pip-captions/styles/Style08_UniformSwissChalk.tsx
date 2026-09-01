import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const UniformSwissChalkStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 48,
}) => {
  // Smooth line-level entrance without any word-by-word highlight
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
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Inter', 'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: `${fontSize}px`,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        lineHeight: 1.35,
        color: "#F8FAFC",
        textShadow: "0 2px 10px rgba(0, 0, 0, 0.9), 0 4px 20px rgba(0,0,0,0.8)",
        opacity: lineOpacity,
        transform: `translateY(${lineTranslateY}px)`,
        maxWidth: "92%",
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
