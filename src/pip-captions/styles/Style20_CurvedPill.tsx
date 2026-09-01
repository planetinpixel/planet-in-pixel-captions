import React from "react";
import { spring } from "remotion";
import { StyleRendererProps } from "../types";

export const CurvedPillStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 58,
}) => {
  // Line entrance animation
  const framesSinceLineStart = Math.max(
    0,
    ((absoluteTimeMs - line.startMs) / 1000) * fps
  );

  const lineSpring = spring({
    frame: framesSinceLineStart,
    fps,
    config: { damping: 14, mass: 0.5, stiffness: 180 },
  });

  const lineScale = Math.min(1, 0.85 + lineSpring * 0.15);
  const lineOpacity = Math.min(1, lineSpring);

  return (
    <div
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        lineHeight: 1.3,
        padding: "18px 38px",
        borderRadius: "18px",
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.88) 100%)",
        border: "2px solid rgba(0, 229, 255, 0.45)",
        boxShadow:
          "0 14px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 229, 255, 0.25)",
        backdropFilter: "blur(20px)",
        transform: `scale(${lineScale})`,
        opacity: lineOpacity,
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

        const wordSpring = spring({
          frame: framesSinceStart,
          fps,
          config: { damping: 12, mass: 0.3, stiffness: 260 },
        });

        const wordScale = isActive ? 1 + wordSpring * 0.12 : 1;

        return (
          <span
            key={`${token.text}-${i}`}
            style={{
              display: "inline-block",
              position: "relative",
              margin: "4px 8px",
              verticalAlign: "middle",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `scale(${wordScale})`,
                transformOrigin: "center center",
                color: isActive
                  ? "#00E5FF"
                  : isPast
                  ? "#FFFFFF"
                  : "rgba(255, 255, 255, 0.6)",
                textShadow: isActive
                  ? "0 0 20px rgba(0, 229, 255, 0.9), 0 2px 10px rgba(0,0,0,0.8)"
                  : "0 2px 6px rgba(0,0,0,0.6)",
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
