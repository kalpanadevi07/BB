import { useState } from "react";
import { Check } from "lucide-react";

const scrollToForm = () => {
  const el = document.getElementById("contact-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const partTimeFeatures = [
  "80 hours a month of dedicated work",
  "Fluent English communication",
  "2+ years of experience in their role",
  "NDA and confidentiality covered",
  "Monthly billing in GBP",
  "Weekly progress reports",
  "Free replacement if not the right fit",
];

const fullTimeFeatures = [
  "160 hours a month of dedicated work",
  "Fluent English communication",
  "2+ years of experience in their role",
  "NDA and confidentiality covered",
  "Monthly billing in GBP",
  "Daily standups, weekly reports",
  "Free replacement if not the right fit",
];

function GetStartedButton({ dark }) {
  const [hov, setHov] = useState(false);
  const label = "Get Started";

  const bg = dark
    ? (hov ? "#ffffff" : "#f5a623")
    : (hov ? "#f5a623" : "#1a1340");

  const text1Color = dark ? "#1a1340" : "#ffffff";
  const text2Color = dark ? "#1a1340" : "#1a1340";

  return (
    <button
      className="get-started-btn"
      onClick={scrollToForm}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg,
        fontSize: "16px",
        fontWeight: 700,
        height: "44px",
        padding: "0 28px",
        borderRadius: "50px",
        border: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.22s ease",
      }}
    >
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: text1Color,
        transform: hov ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {label}
      </span>
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: text2Color,
        transform: hov ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {label}
      </span>
      <span style={{ visibility: "hidden" }}>{label}</span>
    </button>
  );
}

const PricingSection = () => (
  <>
    {/* ↓ id="pricing-section" — StickyBtn in HeroPage scrolls here */}
    <section id="pricing-section" className="pricing-section" style={{
      width: "100%",
      background: "#ffffff",
      padding: "56px 48px 72px",
      fontFamily: "Roobert Font Family, Sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 className="pricing-heading" style={{
            fontSize: "clamp(26px, 3.2vw, 48px)",
            fontWeight: 900,
            fontFamily: "Roobert Font Family, Sans-serif",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#0d0d0d",
            margin: "0 0 14px 0",
          }}>
            A plan for every team.<br/>
            A price that makes sense.
          </h2>
          <p className="pricing-subtext" style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: "#0a0000",
            fontWeight: 500,
            margin: 0,
          }}>
            Pay only after your specialist is onboarded.
          </p>
        </div>

        {/* Cards */}
        <div className="pricingGrid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          alignItems: "stretch",
          textAlign: "left",
        }}>

          {/* ── Part-Time ── */}
          <div className="pricing-card" style={{
            background: "#ffffff",
            border: "1.5px solid #000000",
            borderRadius: "16px",
            padding: "28px 28px 28px",
            display: "flex",
            flexDirection: "column",
          }}>
            <h3 className="card-title" style={{
              fontSize: "36px",
              fontWeight: 800, color: "#0a0000",
              margin: "0 0 4px", letterSpacing: "-0.03em",
            }}>
              Hire Part-Time
            </h3>

            <div style={{ borderTop: "1px solid #000000", margin: "20px 0 18px" }} />

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px" }} className="feature-list">
              {partTimeFeatures.map(f => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <Check size={14} color="#f5a623" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "3px" }} />
                  <span className="feature-text" style={{ fontSize: "18px", color: "#000000", lineHeight: 1.45, fontWeight: 400 }}>{f}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <span className="price-value" style={{
                    fontSize: "clamp(34px, 4vw, 48px)",
                    fontWeight: 900, color: "#f5a623",
                    letterSpacing: "-0.05em", lineHeight: 1, display: "inline-block",
                  }}>£600</span>
                  <span className="price-suffix" style={{ fontSize: "14px", color: "#010008", fontWeight: 400, marginLeft: 8 }}>
                    / month per specialist
                  </span>
                </div>
                <GetStartedButton dark={false} />
              </div>
            </div>
          </div>

          {/* ── Full-Time ── */}
          <div className="pricing-card" style={{
            background: "#1a1340",
            borderRadius: "16px",
            padding: "28px 28px 28px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 12px 36px rgba(26,19,64,0.22)",
          }}>
            <div style={{
              position: "absolute", top: "-16px", left: "50%",
              transform: "translateX(-50%)",
              background: "#f5a623", color: "#28174F",
              fontSize: "10px", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "5px 16px", borderRadius: "50px", whiteSpace: "nowrap",
            }}>
              Recommended
            </div>

            <h3 className="card-title" style={{
              fontSize: "36px", fontWeight: 800, color: "#ffffff",
              margin: "0 0 4px", letterSpacing: "-0.03em",
            }}>
              Hire Full-Time
            </h3>

            <div style={{ borderTop: "1px solid rgba(255,255,255)", margin: "20px 0 18px" }} />

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px" }} className="feature-list">
              {fullTimeFeatures.map(f => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <Check size={14} color="#f5a623" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "3px" }} />
                  <span className="feature-text" style={{ fontSize: "18px", color: "rgba(255,255,255)", lineHeight: 1.45 }}>{f}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <span className="price-value" style={{
                    fontSize: "clamp(34px, 4vw, 48px)",
                    fontWeight: 900, color: "#ffffff",
                    letterSpacing: "-0.05em", lineHeight: 1, display: "inline-block",
                  }}>£800</span>
                  <span className="price-suffix" style={{ fontSize: "14px", color: "rgba(255,255,255)", marginLeft: 8 }}>
                    / month per specialist
                  </span>
                </div>
                <GetStartedButton dark={true} />
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1px", marginTop: "40px", marginBottom: "0px" }}>
          <div style={{ flex: 1, height: "1px", background: "#000000" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#000000", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            OR BUILD A FULL-TIME TEAM
          </span>
          <div style={{ flex: 1, height: "1px", background: "#000000" }} />
        </div>

      </div>
    </section>

    <style>{`
      @media (max-width: 1024px) and (min-width: 701px) {
        .pricing-section { padding: 48px 32px 56px !important; }
        .pricing-heading { font-size: 28px !important; line-height: 1.2 !important; }
        .pricing-subtext { font-size: 16px !important; line-height: 1.4 !important; }
        .card-title { font-size: 26px !important; line-height: 1.2 !important; }
        .feature-text { font-size: 15px !important; line-height: 1.3 !important; }
        .price-value { font-size: 32px !important; }
        .price-suffix { font-size: 12px !important; }
        .get-started-btn { font-size: 14px !important; height: 40px !important; padding: 0 22px !important; }
      }
      @media (max-width: 700px) {
        .pricingGrid { grid-template-columns: 1fr !important; gap: 32px !important; }
        .pricingGrid > div:last-child { padding-top: 40px !important; }
        .pricing-heading { font-size: 22px !important; line-height: 1.25 !important; }
        .pricing-subtext { font-size: 14px !important; line-height: 1.4 !important; }
        .card-title { font-size: 22px !important; line-height: 1.2 !important; }
        .feature-text { font-size: 14px !important; line-height: 1.3 !important; }
        .price-value { font-size: 34px !important; }
        .price-suffix { font-size: 11px !important; }
        .get-started-btn { font-size: 13px !important; height: 30px !important; padding: 0 9px !important; }
      }
      @media (max-width: 480px) {
        .pricing-section { padding: 40px 20px 48px !important; }
      }
    `}</style>
  </>
);

export default PricingSection;
