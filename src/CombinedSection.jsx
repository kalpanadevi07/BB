import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import teamImg from "./assets/team.png";
import teamOffice from "./assets/team-office.png";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

const aboutFeatures = [
  {
    title: "Top Talent from India",
    desc: "Experienced experts ready to contribute immediately.",
  },
  {
    title: "Pre-Vetted Experts",
    desc: "Verified expertise, experience, and communication skills.",
  },
  {
    title: "Flexible Hiring",
    desc: "Hire full-time, part-time, or project-based.",
  },
  {
    title: "UK Time Zone Friendly",
    desc: "Work seamlessly during your business hours.",
  },
];

const managePoints = [
  {
    title: "Works With Your Tools",
    desc: "Slack, Teams, ClickUp, Asana, Notion, and more.",
  },
  {
    title: "One Simple Monthly Invoice",
    desc: "Billed monthly in GBP. No timesheets to argue over.",
  },
  {
    title: "We Handle the Admin",
    desc: "Payroll, HR, and compliance are taken care of.",
  },
  {
    title: "Stay in Control",
    desc: "Regular Updates, Total Transparency",
  },
];

function FeatureItem({ title, desc }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start",textAlign: "left",maxWidth:500, }}>
      <div style={{ flexShrink: 0, marginTop: 2, alignItems: "justify-content", }}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#f5a623" />
          <path d="M5.5 10.5l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p style={{
          fontFamily: "Roobert Font Family, Sans-serif", fontSize: 18, fontWeight: 700,
          color: "#000000", lineHeight: 1.2, marginBottom: 2, marginTop: 0,
          textAlign: "justify-content,",
        }}>{title}</p>
        <p style={{
          fontSize: 18, color: "#000000", lineHeight: 1.8, margin:0,fontWeight: 500,
          textAlign: "left",
        }}>{desc}</p>
      </div>
    </div>
  );
}

function HireButton({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#28174f" : "#f5a623",
        color: hovered ? "#ffffff" : "#28174f",
        border: "none",
        borderRadius: "999px",
        padding: "0 28px",
        height: "52px",
        minWidth: "220px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease, color 0.3s ease",
        fontFamily: "Roobert Font Family, Sans-serif",
      }}
    >
      {/* Text 1 — visible by default, slides UP on hover */}
      <span style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        fontSize: "18px",
        fontWeight: 600,
        transform: hovered ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        Hire for my company 
      </span>

      {/* Text 2 — hidden below, slides IN on hover */}
      <span style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        fontSize: "18px",
        fontWeight: 600,
        transform: hovered ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        Hire for my company 
      </span>

      {/* Spacer — keeps button width stable */}
      <span style={{
        visibility: "hidden",
        fontSize: "18px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}>
        Hire for my company 
      </span>
    </button>
  );
}

export default function CombinedSection() {
  const width     = useWindowWidth();
  const isMobile  = width < 640;
  const isTablet  = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const handleHire = () => {
    const el = document.getElementById("contact-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hPad = isMobile ? "20px" : isTablet ? "32px" : "56px";

  return (
    <>
      {/* ── ABOUT SECTION ── */}
      <div style={{ background: "#ffffff", width: "100%" }}>
        <div style={{
          maxWidth: 1330, margin: "0 auto",
          padding: `80px ${hPad} 40px`,
        }}>
          <div style={isDesktop
            ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }
            : { display: "flex", flexDirection: "column", gap: 28 }
          }>
            {/* LEFT — Image (desktop only) */}
            {isDesktop && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <img
                  src={teamImg}
                  alt="Team working in office"
                  style={{
                    width: "100%", maxWidth: 600,
                    height: 550, objectFit: "cover",
                    borderRadius: 60, display: "block",
                    boxShadow: "0 8px 36px rgba(0,0,0,0.10)",
                  }}
                  draggable={false}
                />
              </div>
            )}

            {/* RIGHT — Content */}
            <div style={{ textAlign: "left" }}>
              <h2 style={{
                fontFamily: "Roobert Font Family, Sans-serif", fontWeight: 900,
                color: "#000000", lineHeight: 1, letterSpacing: "-0.03em",
                fontSize: isMobile ? 24 : isTablet ? 28 : 48,
                marginBottom: 10, marginTop: 0,marginLeft:0,marginRight:0,
                textAlign: "left",
              }}>
               Build your dream team in days,
                <span style={{ color: "#f5a623" }}> not months.</span>
              </h2>
              <p style={{
                fontSize: 18, color: "#000000", lineHeight: 1.5,fontWeight: 520,
                marginBottom: 18, maxWidth: 500, textAlign: "justify",letterSpacing: "-0.00em ",
              }}>
                Get skilled professionals from India without recruiter fees, HR headaches, or lengthy hiring processes.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 22, fontSize: 18, textAlign: "justify", maxWidth:500,lineHeight:1.2, }}>
                {aboutFeatures.map((f, i) => (
                  <FeatureItem key={i} title={f.title} desc={f.desc} />
                ))}
              </div>
              <HireButton onClick={handleHire} />
            </div>

          </div>
        </div>
      </div>

      {/* ── MANAGE TEAM SECTION ── */}
      <div style={{ background: "#ffffff", width: "100%" }}>
        <div style={{
          maxWidth: 1330, margin: "0 auto",
          padding: `24px ${hPad} 48px`,
        }}>
          <div style={isDesktop
            ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }
            : { display: "flex", flexDirection: "column", gap: 28 }
          }>

            {/* LEFT — Content */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
               <h2 style={{
                fontFamily: "Roobert Font Family, Sans-serif", fontWeight: 900,
                color: "#000000", lineHeight: 1, letterSpacing: "-0.03em",
                fontSize: isMobile ? 24 : isTablet ? 28 : 48,
                marginBottom: 10, marginTop: 0,marginLeft:0,marginRight:0,
                textAlign: "left",maxWidth: 600,
              }}>
                Manage your extended team like 
                 <span style={{ color: "#f5a623" }}> it's in-house.</span>
              </h2>

              <p style={{
                fontSize: 18, lineHeight: 1.3, color: "#000000",
                margin: "0 0 18px 0",
                textAlign: "justify",maxWidth:460,letterSpacing: "-0.0em",
              }}>
              Same tools. Same standups. Same reporting. Just a much bigger team for a much smaller bill.
              </p>

              <ul style={{
                display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start",
                listStyle: "none", padding: 0, margin: "0 0 20px 0", width: "100%",
              }}>
                {managePoints.map(p => (
                  <li key={p.title} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      <CheckCircle2 size={18} color="#f59e0b" fill="#fef3c7" strokeWidth={2} />
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p style={{
                        fontSize: 18, fontWeight: 700, color: "#0d0d0d",
                        letterSpacing: "-0.01em", lineHeight: 1.2,
                        margin: "0 0 2px 0", fontFamily: "Roobert Font Family, Sans-serif",
                        textAlign: "left",
                      }}>
                        {p.title}
                      </p>
                      <p style={{
                        fontSize: 18, lineHeight: 1.5, color: "#000000",
                        margin: 0, textAlign: "left",maxWidth:430,gap: 5,lineHeight:1.8
                      }}>
                        {p.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* ← replaced plain button with HireButton */}
              <HireButton onClick={handleHire} />

              {/* tablet/mobile: image below CTA */}
              {!isDesktop && (
                <div style={{ width: "100%", marginTop: 24 }}>
                  <img
                    src={teamOffice}
                    alt="Team working in office"
                    style={{
                      width: "100%", maxWidth: isTablet ? 400 : "100%",
                      height: "auto", borderRadius: 14, objectFit: "cover",
                      display: "block", boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
                    }}
                    draggable={false}
                  />
                </div>
              )}
            </div>

            {/* RIGHT — Image (desktop only) */}
            {isDesktop && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <img
                  src={teamOffice}
                  alt="Team working in office"
                  style={{
                    width: "100%", maxWidth: 600,
                    height: 550, objectFit: "cover",
                    borderRadius: 60, display: "block",
                    boxShadow: "0 8px 36px rgba(0,0,0,0.10)",
                  }}
                  draggable={false}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
