import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

const stats = [
  { number: "48hrs",  label: "Shortlist\ndelivery" },
  { number: "5+",     label: "UK agencies using\nour specialists" },
  { number: "7 days", label: "To live in your\nworkflow" },
];

export default function CTASection() {
  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;

  const handleGetStarted = () => {
    const el = document.getElementById("contact-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{
      background: "#ffffff",
      width: "100%",
      padding: isMobile ? "24px 20px" : "32px 24px",
    }}>
      <div style={{ maxWidth: 2000, margin: "0 auto" }}>
        <div style={{
          background: "#f5a623",
          borderRadius: 20,
          padding: isMobile ? "40px 24px" : isTablet ? "48px 40px" : "56px 60px",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* TOP-LEFT hexagon */}
          <svg
            viewBox="0 0 200 220"
            style={{
              position: "absolute",
              top: -30, left: -30,
              width: isMobile ? 140 : 190,
              height: isMobile ? 155 : 210,
              pointerEvents: "none",
            }}
          >
            <polygon
              points="100,0 190,50 190,150 100,200 10,150 10,50"
              fill="rgba(0,0,0,0.09)"
            />
          </svg>

          {/* BOTTOM-RIGHT hexagon */}
          <svg
            viewBox="0 0 160 180"
            style={{
              position: "absolute",
              bottom: -28, right: -28,
              width: isMobile ? 110 : 155,
              height: isMobile ? 125 : 175,
              pointerEvents: "none",
            }}
          >
            <polygon
              points="80,0 155,40 155,120 80,160 5,120 5,40"
              fill="rgba(0,0,0,0.07)"
            />
          </svg>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>

            <h2 style={{
              fontFamily: "Roobert Font Family, Sans-serif",
              fontSize: isMobile ? 28 : isTablet ? 36 : 48,
              fontWeight: 800,
              color: "#1e0f3c",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 0,
            }}>
              Ready when you are.
            </h2>

            {/* Divider */}
            <div style={{
              width: "55%",
              maxWidth: 480,
              height: 1,
              background: "rgba(30,15,60,0.15)",
              margin: "32px auto",
            }} />

            {/* Stats */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: isMobile ? 24 : 64,
              flexWrap: "wrap",
              marginBottom: 36,
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "Roobert Font Family, Sans-serif",
                    fontSize: isMobile ? 24 : 34,
                    fontWeight: 800,
                    color: "#1e0f3c",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: 16,
                    color: "#000000",
                    opacity: 1,
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <GetStartedButton onClick={handleGetStarted} />
          </div>

        </div>
      </div>
    </div>
  );
}

function GetStartedButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: hovered ? "#2a1650" : "#1e0f3c",
        color: "#ffffff",
        border: "none",
        outline: "none",
        boxShadow: "none",
        WebkitAppearance: "none",
        appearance: "none",
        borderRadius: 100,
        padding: "14px 30px",
        fontFamily: "Roobert Font Family, Sans-serif",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      Get started
      <span style={{ fontSize: 16 }}>→</span>
    </button>
  );
}