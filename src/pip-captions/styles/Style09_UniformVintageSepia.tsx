import React from "react";
import { interpolate, Easing } from "remotion";
import { StyleRendererProps } from "../types";

export const UniformVintageSepiaStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 54,
}) => {
  const framesSinceLineStart = Math.max(
    0,
    ((absoluteTimeMs - line.startMs) / 1000) * fps
  );

  const lineOpacity = interpolate(framesSinceLineStart, [0, 12], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  const lineTranslateY = interpolate(framesSinceLineStart, [0, 14], [16, 0], {
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
        background: "rgba(28, 20, 16, 0.85)",
        border: "1px solid rgba(245, 215, 160, 0.45)",
        boxShadow:
          "0 18px 40px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(245, 215, 160, 0.3)",
        backdropFilter: "blur(18px)",
        maxWidth: "94%",
        opacity: lineOpacity,
        transform: `translateY(${lineTranslateY}px)`,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: `${fontSize}px`,
        color: "#FDF6E2",
        textShadow: "0 2px 10px rgba(0, 0, 0, 0.9), 0 0 15px rgba(245, 215, 160, 0.2)",
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
