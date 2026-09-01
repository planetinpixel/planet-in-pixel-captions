import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame } from "remotion";
import { CaptionRenderer } from "./CaptionRenderer";
import { CAPTION_STYLES_META, TOTAL_DURATION_FRAMES } from "./sampleData";

export const UniformCaptionsShowcase: React.FC = () => {
  const uniformStyles = CAPTION_STYLES_META.filter(
    (s) => s.category === "Uniform"
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07090E",
        color: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Studio Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 45%, rgba(18, 24, 38, 0.8) 0%, rgba(7, 9, 14, 1) 100%)",
        }}
      />

      {/* Header Bar */}
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
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.15em",
            }}
          >
            UNIFORM SUITE
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

      {/* Series Sequence for the 5 Uniform Styles */}
      <Series>
        {uniformStyles.map((meta, index) => {
          return (
            <Series.Sequence
              key={meta.id}
              durationInFrames={TOTAL_DURATION_FRAMES}
            >
              <UniformShowcaseSlide
                meta={meta}
                index={index}
                total={uniformStyles.length}
              />
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};

const UniformShowcaseSlide: React.FC<{
  meta: (typeof CAPTION_STYLES_META)[0];
  index: number;
  total: number;
}> = ({ meta, index, total }) => {
  const frame = useCurrentFrame();

  const enterOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const enterSlideY = interpolate(frame, [0, 15], [16, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: enterOpacity,
        transform: `translateY(${enterSlideY}px)`,
      }}
    >
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
          UNIFORM STYLE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
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

      {/* Render the Uniform Caption */}
      <CaptionRenderer styleId={meta.id} bottomPosition="34%" />
    </AbsoluteFill>
  );
};
