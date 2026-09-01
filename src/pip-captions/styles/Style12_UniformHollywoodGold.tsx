import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const UniformHollywoodGoldStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 50,
}) => {
  const framesSinceLineStart = Math.max(
    0,
    ((absoluteTimeMs - line.startMs) / 1000) * fps
  );

  const lineOpacity = interpolate(framesSinceLineStart, [0, 12], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  const lineTranslateY = interpolate(framesSinceLineStart, [0, 14], [14, 0], {
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
        padding: "18px 44px",
        background: "rgba(18, 14, 8, 0.88)",
        border: "2px solid rgba(255, 215, 0, 0.6)",
        outline: "1px solid rgba(255, 215, 0, 0.3)",
        outlineOffset: "4px",
        boxShadow:
          "0 18px 45px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.15)",
        maxWidth: "92%",
        opacity: lineOpacity,
        transform: `translateY(${lineTranslateY}px)`,
        fontFamily: "'Marcellus', 'Cinzel', Georgia, serif",
        fontSize: `${fontSize}px`,
        color: "#FFD700",
        textShadow:
          "0 2px 4px rgba(0, 0, 0, 0.9), 0 0 16px rgba(255, 215, 0, 0.4)",
        letterSpacing: "0.08em",
        lineHeight: 1.35,
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
