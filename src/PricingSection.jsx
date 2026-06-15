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

/* ══ Reusable slide-up Get Started button ══ */
function GetStartedButton({ dark }) {
  const [hov, setHov] = useState(false);
  const label = "Get Started";

  const bg        = dark
    ? (hov ? "#d97706" : "#f5a623")
    : (hov ? "#2d2569" : "#1a1340");
  const textColor = dark ? "#0d0d0d" : "#ffffff";

  return (
    <button
      onClick={scrollToForm}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        marginTop: "24px",
        width: "100%",
        background: bg,
        color: textColor,
        fontSize: "20px",
        fontWeight: 700,
        height: "48px",
        borderRadius: "50px",
        border: "none",
        cursor: "pointer",
        fontFamily: "Roobert Font Family, Sans-serif",
        transition: "background 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Text 1 — slides out upward */}
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: "20px",
        transform: hov ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      {/* Text 2 — slides in from below */}
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: "20px",
        transform: hov ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      {/* Spacer */}
      <span style={{ visibility: "hidden", fontWeight: 700, fontSize: "16px" }}>{label}</span>
    </button>
  );
}

const PricingSection = () => (
  <>
    <section style={{
      width: "100%",
      background: "#ffffff",
      padding: "56px 48px 72px",
      fontFamily: "Roobert Font Family, Sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{
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
          <p style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: "#0a0000",
            fontWeight: 500,
            margin: 0,
          }}>
            Transparent monthly pricing in pounds. Pay only after your specialist is onboarded.
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
          <div style={{
            background: "#ffffff",
            border: "1.5px solid #000000",
            borderRadius: "16px",
            padding: "28px 28px 28px",
            display: "flex",
            flexDirection: "column",
          }}>
            <h3 style={{
              fontSize: "36px",
              fontWeight: 800, color: "#0a0000",
              margin: "0 0 4px", letterSpacing: "-0.03em",
            }}>
              Hire Part-Time
            </h3>
             {/*<p style={{ fontSize: "20px", color: "#010008", margin: "15px 0 20px" }}>
              Half the hours. All the focus.
            </p>*/}

            <p style={{
              fontSize: "12px", fontWeight: 700, letterSpacing: "0.03em",
              color: "#000000", margin: "0 0 4px", textTransform: "uppercase",marginTop:"20px",
            }}>Starting From</p>
            <span style={{
              fontSize: "clamp(34px, 4vw, 48px)",
              fontWeight: 900, color: "#f5a623",
              letterSpacing: "-0.05em", lineHeight: 1, display: "block",marginTop:"0px",
            }}>£600</span>
            <p style={{ fontSize: "14px", color: "#010008", margin: "4px 0 20px",fontWeight: 400  }}>
              / month per specialist
            </p>

            <div style={{ borderTop: "1px solid #000000", marginBottom: "18px" }} />

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 auto", display: "flex", flexDirection: "column", gap: "10px" }}>
              {partTimeFeatures.map(f => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <Check size={14} color="#f5a623" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "3px" }} />
                  <span style={{ fontSize: "18px", color: "#000000", lineHeight: 1.45,fontWeight: 400 }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* ← slide-up button, dark variant */}
            <GetStartedButton dark={false} />
          </div>

          {/* ── Full-Time ── */}
          <div style={{
            background: "#1a1340",
            borderRadius: "16px",
            padding: "28px 28px 28px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 12px 36px rgba(26,19,64,0.22)",
          }}>
            {/* Badge */}
            <div style={{
              position: "absolute", top: "-16px", left: "50%",
              transform: "translateX(-50%)",
              background: "#f5a623", color: "#0d0d0d",
              fontSize: "10px", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "5px 16px", borderRadius: "50px", whiteSpace: "nowrap",
            }}>
              Most Popular
            </div>

            <h3 style={{
              fontSize: "36px", fontWeight: 800, color: "#ffffff",
              margin: "0 0 4px", letterSpacing: "-0.03em",
            }}>
              Hire Full-Time
            </h3>
            {/*<p style={{ fontSize: "20px", color: "rgb(255, 255, 255)", margin: "15px 0 20px" }}>
              All the hours. All the commitment.
            </p>*/}

            <p style={{
              fontSize: "12px", fontWeight: 700, letterSpacing: "0.03em",
              color: "#f5a623", margin: "0 0 4px", textTransform: "uppercase",marginTop:"20px",
            }}>Starting From</p>
            <span style={{
              fontSize: "clamp(34px, 4vw, 48px)",
              fontWeight: 900, color: "#ffffff",
              letterSpacing: "-0.05em", lineHeight: 1, display: "block",
            }}>£800</span>
            <p style={{ fontSize: "14px", color: "rgb(255, 255, 255)", margin: "4px 0 20px" }}>
              / month per specialist
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255)", marginBottom: "18px" }} />

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 auto", display: "flex", flexDirection: "column", gap: "10px" }}>
              {fullTimeFeatures.map(f => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <Check size={14} color="#f5a623" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "3px" }} />
                  <span style={{ fontSize: "18px", color: "rgba(255,255,255)", lineHeight: 1.45 }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* ← slide-up button, amber variant */}
            <GetStartedButton dark={true} />
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
      @media (max-width: 700px) {
        .pricingGrid {
          grid-template-columns: 1fr !important;
          gap: 32px !important;
        }
        .pricingGrid > div:last-child {
          padding-top: 40px !important;
        }
      }
      @media (max-width: 480px) {
        section { padding: 48px 20px 56px !important; }
      }
    `}</style>
  </>
);

export default PricingSection;
