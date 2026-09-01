import React from "react";
import { StyleRendererProps } from "../types";

export const NewsroomSplitStyle: React.FC<StyleRendererProps> = ({
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
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        fontSize: `${fontSize}px`,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        lineHeight: 1.2,
        maxWidth: "96%",
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
              margin: "4px 6px",
              backgroundColor: isActive ? "#FFFFFF" : "#000000",
              color: isActive ? "#000000" : isPast ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
              padding: "4px 14px",
              borderLeft: "4px solid",
              borderLeftColor: isActive ? "#EF4444" : "transparent",
              boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
              whiteSpace: "nowrap",
            }}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};
