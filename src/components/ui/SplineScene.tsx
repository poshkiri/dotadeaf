"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "2px solid rgba(245,197,24,0.15)",
          borderTop: "2px solid #F5C518",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  ),
});

export function SplineScene() {
  return (
    <Spline
      scene="https://prod.spline.design/89EHOSJiOV1sDVTu/scene.splinecode"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
