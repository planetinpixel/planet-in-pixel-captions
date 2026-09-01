import React from "react";
import { spring } from "remotion";
import { StyleRendererProps } from "../types";

export const ViralPopStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 68,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 900,
        fontSize: `${fontSize}px`,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
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
          config: { damping: 12, mass: 0.35, stiffness: 240 },
        });

        const scale = isActive ? 1 + popSpring * 0.16 : 1;

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
                color: isActive ? "#FFE600" : isPast ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                WebkitTextStroke: "4px #000000",
                paintOrder: "stroke fill",
                textShadow: isActive
                  ? "0 0 28px rgba(255, 230, 0, 0.8), 0 8px 16px rgba(0,0,0,0.95)"
                  : "0 6px 14px rgba(0,0,0,0.9)",
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
