import React from "react";
import { StyleRendererProps } from "../types";

export const CinemaMinimalStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fontSize = 54,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: `${fontSize}px`,
        letterSpacing: "0.03em",
        lineHeight: 1.35,
        maxWidth: "92%",
      }}
    >
      {line.tokens.map((token, i) => {
        const isActive =
          absoluteTimeMs >= token.fromMs && absoluteTimeMs < token.toMs;
        const isPast = absoluteTimeMs >= token.toMs;

        return (
          <span
            key={`${token.text}-${i}`}
            style={{
              display: "inline-block",
              margin: "4px 8px",
              verticalAlign: "middle",
            }}
          >
            <span
              style={{
                display: "inline-block",
                color: isActive
                  ? "#F5D77F" // Warm Cinema Gold
                  : isPast
                  ? "#FDFBF7" // Ivory White
                  : "rgba(253, 251, 247, 0.65)",
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.8)",
                borderBottom: "2px solid",
                borderBottomColor: isActive
                  ? "rgba(245, 215, 127, 0.85)"
                  : "transparent",
                paddingBottom: "2px",
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
