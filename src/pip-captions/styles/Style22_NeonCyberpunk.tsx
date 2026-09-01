import React from "react";
import { spring } from "remotion";
import { StyleRendererProps } from "../types";

export const NeonCyberpunkStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 62,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 900,
        fontSize: `${fontSize}px`,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        lineHeight: 1.25,
        maxWidth: "94%",
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
          config: { damping: 10, mass: 0.25, stiffness: 300 },
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
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                color: isActive
                  ? "#FFFFFF"
                  : isPast
                  ? "#00F0FF"
                  : "rgba(0, 240, 255, 0.4)",
                textShadow: isActive
                  ? "0 0 10px #FF007F, 0 0 25px #FF007F, 0 0 50px #FF007F, 0 0 80px #FF007F"
                  : isPast
                  ? "0 0 12px rgba(0, 240, 255, 0.6)"
                  : "none",
                border: "1px solid",
                borderColor: isActive ? "rgba(255, 0, 127, 0.5)" : "transparent",
                padding: "4px 8px",
                borderRadius: "6px",
                backgroundColor: isActive
                  ? "rgba(255, 0, 127, 0.15)"
                  : "transparent",
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
