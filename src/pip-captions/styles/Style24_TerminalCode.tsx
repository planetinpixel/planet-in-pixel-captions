import React from "react";
import { StyleRendererProps } from "../types";

export const TerminalCodeStyle: React.FC<StyleRendererProps> = ({
  line,
  absoluteTimeMs,
  fps,
  fontSize = 46,
}) => {
  const currentFrame = Math.round((absoluteTimeMs / 1000) * fps);
  const isCursorVisible = Math.floor(currentFrame / 10) % 2 === 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px 32px",
        borderRadius: "16px",
        background: "rgba(10, 15, 20, 0.95)",
        border: "1px solid rgba(255, 176, 0, 0.4)",
        boxShadow:
          "0 16px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 176, 0, 0.15)",
        fontFamily: "'Fira Code', monospace",
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        color: "#FFB000",
        lineHeight: 1.4,
        width: "88%",
        minHeight: "130px",
        boxSizing: "border-box",
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
          opacity: 0.6,
          fontSize: "14px",
          letterSpacing: "0.1em",
          color: "#94A3B8",
        }}
      >
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#EF4444",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#F59E0B",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#10B981",
            display: "inline-block",
          }}
        />
        <span style={{ marginLeft: "8px" }}>pip_terminal // bash</span>
      </div>

      {/* Terminal Line Content - Left aligned with zero layout jump */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          textAlign: "left",
          gap: "6px 12px",
          width: "100%",
        }}
      >
        <span style={{ color: "#00FF66", userSelect: "none", marginRight: "4px" }}>
          &gt;
        </span>
        {line.tokens.map((token, i) => {
          const isActive =
            absoluteTimeMs >= token.fromMs && absoluteTimeMs < token.toMs;
          const isPast = absoluteTimeMs >= token.toMs;

          if (absoluteTimeMs < token.fromMs) {
            return null;
          }

          return (
            <span
              key={`${token.text}-${i}`}
              style={{
                display: "inline-block",
                color: isActive ? "#FFFFFF" : isPast ? "#FFB000" : "#94A3B8",
                textShadow: isActive
                  ? "0 0 16px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 176, 0, 0.8)"
                  : "0 0 8px rgba(255, 176, 0, 0.4)",
                backgroundColor: isActive
                  ? "rgba(255, 176, 0, 0.2)"
                  : "transparent",
                padding: "2px 6px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}
            >
              {token.text}
            </span>
          );
        })}
        <span
          style={{
            display: "inline-block",
            color: "#FFB000",
            opacity: isCursorVisible ? 1 : 0,
            marginLeft: "2px",
          }}
        >
          █
        </span>
      </div>
    </div>
  );
};
