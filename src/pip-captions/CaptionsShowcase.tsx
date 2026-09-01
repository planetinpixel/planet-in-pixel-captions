import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame } from "remotion";
import { CaptionRenderer } from "./CaptionRenderer";
import { CAPTION_STYLES_META, TOTAL_DURATION_FRAMES } from "./sampleData";

export const CaptionsShowcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0F19",
        color: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Background Atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, rgba(30, 41, 59, 0.7) 0%, rgba(11, 15, 25, 1) 100%)",
        }}
      />

      {/* Subtle Studio Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.8,
        }}
      />

      {/* Global Top Header Bar (Clean branding without progress bar) */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "50px",
          right: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #FFE600, #FF3B30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: "#000000",
              fontSize: "18px",
            }}
          >
            P
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "0.05em" }}>
              PLANET IN PIXEL
            </div>
            <div style={{ fontSize: "13px", color: "#94A3B8", letterSpacing: "0.08em" }}>
              CAPTION STYLES SHOWCASE
            </div>
          </div>
        </div>
      </div>

      {/* Series Sequence for all Caption Styles */}
      <Series>
        {CAPTION_STYLES_META.map((meta, index) => {
          return (
            <Series.Sequence
              key={meta.id}
              durationInFrames={TOTAL_DURATION_FRAMES}
            >
              <StyleShowcaseSlide
                meta={meta}
                index={index}
                total={CAPTION_STYLES_META.length}
              />
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};

const StyleShowcaseSlide: React.FC<{
  meta: (typeof CAPTION_STYLES_META)[0];
  index: number;
  total: number;
}> = ({ meta, index, total }) => {
  const frame = useCurrentFrame();

  // Slide entrance transition
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const enterSlideY = interpolate(frame, [0, 12], [20, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: enterOpacity, transform: `translateY(${enterSlideY}px)` }}>
      {/* Clean Style Title (No subtitle description) */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#CBD5E1",
            }}
          >
            STYLE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <span
            style={{
              padding: "4px 12px",
              borderRadius: "9999px",
              backgroundColor: `${meta.badgeColor}22`,
              border: `1px solid ${meta.badgeColor}66`,
              fontSize: "13px",
              fontWeight: 700,
              color: meta.badgeColor,
            }}
          >
            {meta.category}
          </span>
        </div>

        <h2
          style={{
            fontSize: "38px",
            fontWeight: 800,
            margin: "4px 0",
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
          }}
        >
          {meta.name}
        </h2>
      </div>

      {/* Render the Caption Style */}
      <CaptionRenderer styleId={meta.id} bottomPosition="34%" />
    </AbsoluteFill>
  );
};
