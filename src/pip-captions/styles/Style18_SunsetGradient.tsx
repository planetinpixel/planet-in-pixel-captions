import React from "react";
import { spring } from "remotion";
import { StyleRendererProps } from "../types";

export const GradientSunsetStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 64,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 900,
        fontSize: `${fontSize}px`,
        lineHeight: 1.25,
        maxWidth: "96%",
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

        const glowSpring = spring({
          frame: framesSinceStart,
          fps,
          config: { damping: 11, mass: 0.35, stiffness: 220 },
        });

        const scale = isActive ? 1 + glowSpring * 0.14 : 1;

        return (
          <span
            key={`${token.text}-${i}`}
            style={{
              display: "inline-block",
              position: "relative",
              margin: "6px 10px",
              verticalAlign: "middle",
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              filter: isActive
                ? "drop-shadow(0 0 16px rgba(255, 230, 109, 0.85)) drop-shadow(0 4px 10px rgba(0,0,0,0.95))"
                : "drop-shadow(0 4px 10px rgba(0,0,0,0.9))",
            }}
          >
            {isActive ? (
              <span
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #FFE66D 0%, #FF7E5F 50%, #FF6B6B 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {token.text}
              </span>
            ) : isPast ? (
              <span
                style={{
                  display: "inline-block",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                }}
              >
                {token.text}
              </span>
            ) : (
              <span
                style={{
                  display: "inline-block",
                  color: "rgba(255, 255, 255, 0.55)",
                  whiteSpace: "nowrap",
                }}
              >
                {token.text}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
