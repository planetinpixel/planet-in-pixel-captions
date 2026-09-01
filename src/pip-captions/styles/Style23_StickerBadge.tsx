import React from "react";
import { spring } from "remotion";
import { StyleRendererProps } from "../types";

export const StickerBadgeStyle: React.FC<StyleRendererProps> = ({
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
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900,
        fontSize: `${fontSize}px`,
        lineHeight: 1.3,
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

        const badgeSpring = spring({
          frame: framesSinceStart,
          fps,
          config: { damping: 11, mass: 0.3, stiffness: 280 },
        });

        const scale = isActive ? 1 + badgeSpring * 0.12 : 1;

        return (
          <span
            key={`${token.text}-${i}`}
            style={{
              display: "inline-block",
              position: "relative",
              margin: "8px 12px",
              verticalAlign: "middle",
            }}
          >
            {/* Steady Horizontal Background Sticker Badge Layer */}
            <span
              style={{
                position: "absolute",
                inset: "-6px -12px",
                borderRadius: "10px",
                backgroundColor: "#CCFF00",
                border: "2px solid #000000",
                boxShadow: "0 8px 24px rgba(204, 255, 0, 0.45), 0 4px 12px rgba(0,0,0,0.5)",
                opacity: isActive ? 1 : 0,
                transform: `scale(${scale})`,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Text Layer */}
            <span
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                color: isActive ? "#000000" : isPast ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                textShadow: isActive ? "none" : "0 4px 12px rgba(0,0,0,0.9)",
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
