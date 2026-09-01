import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame } from "remotion";
import { CaptionRenderer } from "./CaptionRenderer";
import { CAPTION_STYLES_META, TOTAL_DURATION_FRAMES } from "./sampleData";

export const StaticCaptionsShowcase: React.FC = () => {
  const staticStyles = CAPTION_STYLES_META.filter(
    (s) =>
      s.id.startsWith("static-") ||
      s.id === "newsroom-split" ||
      s.id === "cinema-minimal"
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080A10",
        color: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(20, 26, 38, 0.85) 0%, rgba(8, 10, 16, 1) 100%)",
        }}
      />

      {/* Top Header Bar */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "60px",
          right: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "4px 12px",
              border: "1px solid rgba(56, 189, 248, 0.5)",
              borderRadius: "4px",
              color: "#38BDF8",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.15em",
            }}
          >
            STATIC FULL-LINE SUITE
          </div>
          <div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#F8FAFC",
              }}
            >
              PLANET IN PIXEL
            </div>
          </div>
        </div>
      </div>

      {/* Series Sequence for all Static Styles */}
      <Series>
        {staticStyles.map((meta, index) => {
          return (
            <Series.Sequence
              key={meta.id}
              durationInFrames={TOTAL_DURATION_FRAMES}
            >
              <StaticShowcaseSlide
                meta={meta}
                index={index}
                total={staticStyles.length}
              />
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};

const StaticShowcaseSlide: React.FC<{
  meta: (typeof CAPTION_STYLES_META)[0];
  index: number;
  total: number;
}> = ({ meta, index, total }) => {
  const frame = useCurrentFrame();

  const enterOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: enterOpacity }}>
      {/* Title Header Card (Clean - No subtitle description) */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          textAlign: "center",
          maxWidth: "85%",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            letterSpacing: "0.2em",
            color: meta.badgeColor,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          STATIC STYLE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <h2
          style={{
            fontSize: "36px",
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "2px 0",
            letterSpacing: "-0.01em",
          }}
        >
          {meta.name}
        </h2>
      </div>

      {/* Render the Static Caption */}
      <CaptionRenderer styleId={meta.id} bottomPosition="34%" />
    </AbsoluteFill>
  );
};
