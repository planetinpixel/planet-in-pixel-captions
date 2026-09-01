import React from "react";
import { spring } from "remotion";
import { StyleRendererProps } from "../types";

export const Comic3DStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 76,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Bangers', cursive",
        fontSize: `${fontSize}px`,
        letterSpacing: "0.06em",
        lineHeight: 1.1,
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
          config: { damping: 9, mass: 0.3, stiffness: 320 },
        });

        const scale = isActive ? 1 + popSpring * 0.22 : 1;
        const rotate = isActive ? (i % 2 === 0 ? -4 : 4) * popSpring : 0;

        return (
          <span
            key={`${token.text}-${i}`}
            style={{
              display: "inline-block",
              position: "relative",
              margin: "6px 12px",
              verticalAlign: "middle",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                transformOrigin: "center center",
                color: isActive ? "#FF3B30" : isPast ? "#FFD600" : "#FFFFFF",
                WebkitTextStroke: "3px #000000",
                paintOrder: "stroke fill",
                textShadow:
                  "3px 3px 0 #000, 5px 5px 0 #000, 7px 7px 0 #000, 9px 9px 16px rgba(0,0,0,0.85)",
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
