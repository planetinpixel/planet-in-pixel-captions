import React from "react";
import { spring } from "remotion";
import { StyleRendererProps } from "../types";

export const MarkerBrushStyle: React.FC<StyleRendererProps> = ({
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
        fontFamily: "'Permanent Marker', cursive",
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

        const popSpring = spring({
          frame: framesSinceStart,
          fps,
          config: { damping: 10, mass: 0.3, stiffness: 250 },
        });

        const scale = isActive ? 1 + popSpring * 0.14 : 1;

        return (
          <span
            key={`${token.text}-${i}`}
            style={{
              display: "inline-block",
              position: "relative",
              margin: "4px 10px",
              verticalAlign: "middle",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                color: isActive ? "#FFD166" : isPast ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                textShadow:
                  "0 4px 10px rgba(0,0,0,0.85), 0 0 15px rgba(255, 112, 166, 0.4)",
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
