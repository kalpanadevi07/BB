import { useState, useEffect } from "react";
import axios from "axios";
import logoImg from "./assets/BB_Logo_2.png";
import logoImg1 from "./assets/logo1.png";
import heroBg from "./assets/hero-bg.png";
import beeImg from "./assets/bee.png";
const ROLE_OPTIONS = ["Web Dev", "Full-Stack", "SEO", "Google Ads", "Designer", "Video Editor"];
const WORK_OPTIONS = ["Full-time", "Part-time"];

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

function Hex({ cx, cy, r, o }) {
  return (
    <polygon
      points={hexPoints(cx, cy, r)}
      fill="none"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth="1.2"
      opacity={o}
    />
  );
}

/* ── Shared smooth scroll helpers ── */
const scrollToForm = () => {
  const el = document.getElementById("contact-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const scrollToPricing = () => {
  const el = document.getElementById("pricing-section");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function HeroPage() {
  const [showButton, setShowButton] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => {
      setShowButton(window.scrollY > 10);
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const width = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isDesktop = width >= 1024;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedWork, setSelectedWork] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (item, list, setter) =>
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);

  const containerPad = isDesktop ? "clamp(0px, 4vw, 56px)" : "2px";
  
  const heroTitleSize = "clamp(30px, 5vw, 54px)";
  const gridGap = isMobile ? "16px" : "clamp(20px, 3vw, 40px)";

  const heroLayout = {
    marginTop: isMobile ? 12 : isTablet ? 12 : 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: gridGap,
    alignItems: "start",
  };

  const cardPad = isMobile
    ? "24px 16px 20px"
    : isTablet
      ? "20px 20px 16px"
      : "60px 36px 30px";
    

  const logoHeight = isMobile ? 40 : isTablet ? 44 : 52;

  return (
    <>
      {/* ── Navbar ── */}
      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? "#ffffff" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        transition: "background 0.3s, box-shadow 0.3s",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.28)" : "none",
      }}>
        <div style={{
          maxWidth: 1330,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : isTablet ? "0 24px" : "0 56px",
          height: isMobile ? 56 : 85,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img
              src={scrolled ? logoImg1 : logoImg}
              alt="BrandingBeez"
              style={{
                height: logoHeight,
                width: "auto",
                objectFit: "contain",
                transition: "opacity 0.2s ease",
              }}
            />
          </a>
          <div style={{
            opacity: showButton ? 1 : 0,
            pointerEvents: showButton ? "auto" : "none",
            transition: "opacity 0.2s ease",
          }}>
            <StickyBtn compact={isMobile} />
          </div>
        </div>
      </header>

      <div style={{
        ...s.page,
        paddingTop: isMobile ? 56 + 16 : isTablet ? 68 + 16 : 20 + 20,
        paddingBottom: isMobile ? 20 : isTablet ? 30 : 40,
        alignItems: "flex-start",
      }}>
        <div style={{ ...s.container, padding: containerPad }}>
          <div style={heroLayout}>

            {/* LEFT */}
            <div style={{
              textAlign: isMobile ? "center" : "left",
              maxWidth: isDesktop ? 760 : "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start",
            }}>
              <div style={{
                marginBottom: isMobile ? 10 : 2,
                marginTop: isMobile ? 0 : isTablet ? 12 : 50,
                fontSize: 14, color: "#1e1233", fontWeight: 600,
                display: "inline-flex", alignItems: "center", gap: 15,
                justifyContent: "center",
              }}>
                <span style={s.badgePill}>
                  <span style={s.badgeDot} />
                  Onboarding new specialists this week
                </span>
              </div>
              {!isMobile && <br />}
              <h1 style={{
                ...s.heroTitle,
                fontSize: heroTitleSize,
                textAlign: isMobile ? "center" : "left",
                marginTop: isMobile ? 14 : 18,
              }}>
                Hire Indian talents
                <span style={s.heroAccent}>in 7 days.</span>
              </h1>

              <p style={{
                ...s.heroDesc, fontSize: isMobile ? 16 : 20,
                marginTop: isMobile ? 10 : isTablet ? 12 : 0,
                marginBottom: isMobile ? 25 : isTablet ? 20 : 10,
                maxWidth: isDesktop ? 520 : isMobile ? 320 : "100%",
                textAlign: isMobile ? "center" : "left",
              }}>
                Plug a vetted developer, designer or marketer straight into your
                team. They work full-time on your projects, in your tools, on your
                time zone. BrandingBeez handles<br/>the rest.
              </p>
              {!isMobile && <br />}
              <HoverButton compact={isTablet || isDesktop} />
              {!isMobile && <br />}
              <div style={{
                ...s.trustRow,
                gap: isMobile ? 12 : isTablet ? 14 : 18,
                marginTop: isMobile ? 15 : isTablet ? 20 : 35,
                marginBottom: isMobile ? 0 : isTablet ? 20 : 30,
                justifyContent: isMobile ? "center" : "flex-start",
              }}>
                <TrustItem label="Only experts" compact={isTablet || isDesktop || isMobile} />
                <TrustItem label="Good communication" compact={isTablet || isDesktop || isMobile} />
                <TrustItem label="No drama" compact={isTablet || isDesktop || isMobile} />
              </div>
            </div>

            {/* RIGHT — form */}
            <div id="contact-form" style={{position: "relative" }}>
              <FormCard
                cardPad={cardPad} isTablet={isTablet} isDesktop={isDesktop} isMobile={isMobile}
                fullName={fullName} setFullName={setFullName}
                email={email} setEmail={setEmail}
                phone={phone} setPhone={setPhone}
                selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles}
                selectedWork={selectedWork} setSelectedWork={setSelectedWork}
                toggle={toggle}
                errors={errors} setErrors={setErrors}
                submitted={submitted} setSubmitted={setSubmitted}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

/* ══ Sticky header CTA — smooth scrolls to #pricing-section ══ */
function StickyBtn({ compact }) {
  const [hov, setHov] = useState(false);
  const label = "Hire for me";
  return (
    <button
      onClick={scrollToPricing}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#f5a623" : "#28174f",
        color: hov ? "#28174f" : "#ffffff",
        fontFamily: "Roobert Font Family, Sans-serif",
        fontSize: 16,
        fontWeight: 700,
        padding: compact ? "9px 16px" : "11px 24px",
        borderRadius: 50,
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        letterSpacing: "-0.01em",
        transition: "background 0.2s, color 0.2s",
        position: "relative",
        overflow: "hidden",
        height: compact ? 38 : 44,
        minWidth: "fit-content",
      }}
    >
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: 16,
        transform: hov ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: 16,
        transform: hov ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>
      <span style={{ visibility: "hidden", fontWeight: 700, fontSize: 16 }}>{label}</span>
    </button>
  );
}

/* ══ Form card ══ */
function FormCard({
  cardPad, isTablet, isDesktop, isMobile,
  fullName, setFullName,
  email, setEmail,
  selectedRoles, setSelectedRoles,
  selectedWork, setSelectedWork,
  phone, setPhone,
  toggle,
  errors, setErrors, submitted, setSubmitted,
}) {
  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = true;
    if (!email.trim()) e.email = true;
    if (!phone.trim()) e.phone = true;
    if (selectedRoles.length === 0) e.roles = true;
    if (selectedWork.length === 0) e.work = true;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    setSubmitted(true);

    if (Object.keys(e).length === 0) {
      try {
        const response = await axios.post(
          "https://hire-ind-talents-backend.onrender.com",
          { fullName, email, phone, roles: selectedRoles, workTypes: selectedWork }
        );
        console.log(response.data);
        alert("Form submitted successfully!");
        setFullName("");
        setEmail("");
        setSelectedRoles([]);
        setSelectedWork([]);
        setPhone("");
      } catch (error) {
        console.error(error);
        alert("Submission failed");
      }
    }
  };

  const errMsg = (
    <span style={{ color: "#dc2626", fontSize: 11.5, marginTop: 3, display: "block", textAlign: "left" }}>
      Please complete this required field.
    </span>
  );

  return (
    <div style={{
      ...s.card,
      padding: cardPad,
      minHeight: isMobile ? "auto" : "clamp(480px, 70vh, 600px)",
      marginTop: isMobile ? 0 : 45,
    }}>
    

      <h2 style={{ ...s.cardTitle, textAlign: "left", fontSize: isMobile ? 22 : isTablet ? 15 : 28, marginBottom: isMobile ? 6 : isTablet ? 3 : 10 }}>
        Let's find your person
      </h2>
      <p style={{ ...s.cardSubtitle, textAlign: "left", fontSize: isMobile ? 13 : isTablet ? 11 : 16, marginBottom: isMobile ? 16 : isTablet ? 10 : 10, marginTop: isMobile ? 40 : isTablet ? 40 : 25 }}>
        Tell us what you need. We'll set up a quick call to confirm fit, then send specialist profiles within 24 hours.
      </p>

      {[
        { label: "Full name*",     type: "text",  ph: "Jane Doe",         val: fullName, set: setFullName, errKey: "fullName" },
        { label: "Company email*", type: "email", ph: "jane@company.com", val: email,    set: setEmail,    errKey: "email"    },
        { label: "Phone number",   type: "tel",   ph: "+44 1234 567890",  val: phone,    set: setPhone,    errKey: "phone"    },
      ].map(f => (
        <div key={f.label} style={{ ...s.field, marginBottom: isMobile ? 10 : isTablet ? 8 : 10 }}>
          <label style={{ ...s.fieldLabel, fontSize: isMobile ? 13 : isTablet ? 11.5 : 16, marginBottom: isMobile ? 5 : 8 }}>{f.label}</label>
          <input
            style={{
              ...s.fieldInput,
              padding: isMobile ? "9px 12px" : isTablet ? "7px 11px" : "8px 8px",
              fontSize: isMobile ? 13 : isTablet ? 12.5 : 14,
              borderColor: submitted && errors[f.errKey] ? "#dc2626" : "#d1d5db",
            }}
            type={f.type}
            placeholder={f.ph}
            value={f.val}
            onChange={e => {
              f.set(e.target.value);
              if (submitted) setErrors(prev => ({ ...prev, [f.errKey]: !e.target.value.trim() }));
            }}
            onFocus={e => (e.target.style.borderColor = submitted && errors[f.errKey] ? "#dc2626" : "#1e1233")}
            onBlur={e =>  (e.target.style.borderColor = submitted && errors[f.errKey] ? "#dc2626" : "#d1d5db")}
          />
          {submitted && errors[f.errKey] && errMsg}
        </div>
      ))}

      {[
        { label: "Roles you're after*",                 opts: ROLE_OPTIONS, sel: selectedRoles, setSel: setSelectedRoles, errKey: "roles" },
        { label: "How do you want to work with them?*", opts: WORK_OPTIONS,  sel: selectedWork,  setSel: setSelectedWork,  errKey: "work"  },
      ].map(g => (
        <div key={g.label} style={{ marginBottom: isMobile ? 6 : 4 }}>
          <span style={{
            ...s.groupLabel, display: "block", textAlign: "left",
            marginTop: isMobile ? 6 : isTablet ? 8 : 4,
            marginBottom: isMobile ? 6 : isTablet ? 5 : 6,
            fontSize: isMobile ? 13 : isTablet ? 11.5 : 16,
          }}>{g.label}</span>
          <div style={{ ...s.tagGroup, gap: isMobile ? 6 : isTablet ? 5 : 4 }}>
            {g.opts.map(opt => (
              <Tag key={opt} label={opt} compact={isTablet}
                active={g.sel.includes(opt)}
                highlight={opt === "Web Dev" || opt === "Full-time"}
                onClick={() => {
                  toggle(opt, g.sel, g.setSel);
                  if (submitted) setErrors(prev => ({ ...prev, [g.errKey]: false }));
                }}
              />
            ))}
          </div>
          {submitted && errors[g.errKey] && errMsg}
        </div>
      ))}

      <SubmitButton compact={isTablet} onClick={handleSubmit} isMobile={isMobile} />

      <p style={{ ...s.finePrint, marginTop: isMobile ? 10 : isTablet ? 8 : 14, fontSize: isMobile ? 9 : isTablet ? 10.5 : 14 }}>
        By submitting, you agree to be contacted about our services per our{" "}
        <a href="#" style={s.finePrintLink}><br />Privacy Policy &amp; Terms.</a>
      </p>
    </div>
  );
}

/* ══ Sub-components ══ */
function Tag({ label, active, onClick, compact, highlight }) {
  const [hov, setHov] = useState(false);
  const highlightStyle = highlight && !active
    ? { background: "#f5a623", opacity: 1, border: "1.5px solid #1e1233", color: "#1e1233" }
    : {};
  return (
    <span onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        ...s.tag, padding: compact ? "4px 6px" : "8px 12px", fontSize: compact ? 10.5 : 12.5,
        ...highlightStyle,
        ...(active ? s.tagActive : hov && !highlight ? { borderColor: "#1e1233", color: "#1e1233" } : {}),
      }}
    >{label}</span>
  );
}

function HoverButton({ compact }) {
  const [hov, setHov] = useState(false);
  const label = "See how it works";
  const fs = 18;
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...s.btnDark,
        fontSize: fs,
        paddingLeft: compact ? 18 : 22,
        paddingRight: 6,
        background: hov ? "#f5a623" : "#ffffff",
        color: "#28174f",
        transition: "background 0.22s ease",
        height: compact ? 46 : 52,
        gap: 0,
        overflow: "hidden",
        marginTop: compact ? 1 : 0,
        marginBottom: compact ? -20 : 20,
      }}
    >
      <div style={{
        position: "relative",
        height: compact ? 46 : 52,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        marginRight: 12,
      }}>
        <span style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          whiteSpace: "nowrap", fontWeight: 600, fontSize: fs,
          transform: hov ? "translateY(-100%)" : "translateY(0%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}>{label}</span>
        <span style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          whiteSpace: "nowrap", fontWeight: 600, fontSize: fs,
          transform: hov ? "translateY(0%)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}>{label}</span>
        <span style={{ visibility: "hidden", whiteSpace: "nowrap", fontWeight: 600, fontSize: fs }}>{label}</span>
      </div>
    </button>
  );
}

function SubmitButton({ compact, onClick, isMobile }) {
  const [hov, setHov] = useState(false);
  const label = "Hire for my company";
  const fs = compact ? 13 : isMobile ? 15 : 18;
  const height = compact ? 42 : isMobile ? 48 : 56;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...s.btnPrimary, padding: 0, height, fontSize: fs,
        marginTop: compact ? 10 : isMobile ? 14 : 24,
        background: hov ? "#f5a623" : "#28174f",
        color: hov ? "#28174f" : "#ffffff",
        boxShadow: hov ? "0 8px 24px rgba(30,18,51,0.35)" : "none",
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        transition: "all 0.22s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      <span style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 600, fontSize: fs,
        transform: hov ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>
      <span style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 600, fontSize: fs,
        transform: hov ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>
      <span style={{ visibility: "hidden", fontWeight: 600, fontSize: fs }}>{label}</span>
    </button>
  );
}

function TrustItem({ label, compact }) {
  return (
    <div style={{ ...s.trustItem, fontSize: compact ? 14 : 14  }}>
      <svg width={compact ? 18 : 20} height={compact ? 18 : 20} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="10" cy="10" r="10" fill="#f5a623" />
        <path d="M5.5 10.5l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </div>
  );
}

/* ══ Styles ══ */
const s = {
  page: {
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
    width: "100%",
    minHeight: "85vh",
  },
  blob: { position: "absolute", borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none", opacity: 0.18 },
  container: { maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 },
  badgePill: {
    display: "inline-flex", alignItems: "center", gap: 9,
    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 100, padding: "7px 16px", fontSize: 14, color: "#ffffff",
  },
  badgeDot: { width: 8, height: 8, background: "#22c55e", borderRadius: "50%", boxShadow: "0 0 7px #22c55e", flexShrink: 0 },
  heroTitle: { fontFamily: "Roobert Font Family, Sans-serif", fontWeight: 600, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-1.12px" },
  heroAccent: { color: "#f5a623", fontWeight: 600, display: "block", lineHeight: 1.1, letterSpacing: "-1.12px" },
  heroDesc: { color: "#ffffff", lineHeight: 1.3, textAlign: "left" },
  btnDark: {
    display: "inline-flex", alignItems: "center", gap: 12,
    background: "rgba(255,255,255,0.12)", border: "none",
    color: "#ffffff", fontFamily: "Roobert Font Family, Sans-serif",
    fontWeight: 600, borderRadius: 100, cursor: "pointer", transition: "background 0.22s ease",
  },
  trustRow: { display: "flex", flexWrap: "wrap", alignItems: "center" },
  trustItem: { display: "flex", alignItems: "center", gap: 7, color: "#ffffff", fontWeight: 500,marginTop: 0},
  card: { background: "#ffffff", borderRadius: 20, boxShadow: "0 24px 70px rgba(0,0,0,0.38)", position: "relative" },
 
  cardTitle: { position: "absolute", fontFamily: "Roobert Font Family, Sans-serif", fontWeight: 700, color: "#111827", marginTop: 0, top: 30 },
  cardSubtitle: { color: "#0d0d0d", lineHeight: 1.5, top: 0, marginTop: 0, marginBottom: 20 },
  field: {},
  fieldLabel: { display: "block", fontWeight: 500, color: "#000000", marginBottom: 8, textAlign: "left" },
  fieldInput: { width: "100%", border: "1.5px solid #d1d5db", borderRadius: 9, fontFamily: "Roobert Font Family, Sans-serif", fontSize: 14, color: "#111827", outline: "none", background: "#fff", transition: "border-color 0.2s ease", boxSizing: "border-box" },
  groupLabel: { fontWeight: 500, color: "#000000", textAlign: "left" },
  tagGroup: { display: "flex", flexWrap: "wrap" },
  tag: { borderRadius: 100, fontWeight: 500, border: "1.5px solid #d1d5db", background: "#ffffff", color: "#374151", cursor: "pointer", transition: "all 0.18s ease", userSelect: "none" },
  tagActive: { background: "#1e1233", color: "#ffffff", borderColor: "#1e1233" },
  btnPrimary: { width: "100%", background: "#1e1233", color: "#ffffff", border: "none", borderRadius: 10, fontFamily: "Roobert Font Family, Sans-serif", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.22s ease", letterSpacing: "0.01em" },
  finePrint: { fontSize: 11.5, color: "#000000", textAlign: "center", lineHeight: 1.6 },
  finePrintLink: { color: "#000000", textDecoration: "underline" },
};
