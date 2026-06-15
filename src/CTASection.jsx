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
  { number: "6+",     label: "UK agencies using\nour specialists" },
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
              fontSize: isMobile ? 28 : isTablet ? 36 : 64,
              fontWeight: 800,
              color: "#1e0f3c",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 50,
            }}>
              Ready when you are.
            </h2>

             <div>
            <GetStartedButton onClick={handleGetStarted} />
              </div>

            {/* Divider */}
            <div style={{
              width: "55%",
              maxWidth: 800,
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
                    fontSize: isMobile ? 24 : 40,
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

          </div>

        </div>
      </div>
    </div>
  );
}

/* ══ Get Started — slide-up effect ══ */
function GetStartedButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const label = "Get started";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered ? "#2a1650" : "#1e0f3c",
        color: "#ffffff",
        border: "none",
        outline: "none",
        boxShadow: "none",
        WebkitAppearance: "none",
        appearance: "none",
        borderRadius: 100,
        padding: "0 30px",
        height: "58px",
        fontFamily: "Roobert Font Family, Sans-serif",
        fontSize: 20,
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.22s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Text 1 — slides out upward */}
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 600, fontSize: 20,
        transform: hovered ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      {/* Text 2 — slides in from below */}
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 600, fontSize: 20,
        transform: hovered ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      {/* Spacer — keeps button width stable */}
      <span style={{ visibility: "hidden", fontWeight: 600, fontSize: 20 }}>{label}</span>
    </button>
  );
}