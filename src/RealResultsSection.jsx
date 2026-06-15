import { useState, useEffect, useRef, useCallback } from "react";
import client1 from "./assets/client-1.png";
import client2 from "./assets/client-2.png";
import client3 from "./assets/client-3.png";
import client4 from "./assets/client-4.png";
import client5 from "./assets/client-5.png";
import client6 from "./assets/client-6.png";

const cards = [
  {
    logo: client1, duration: "+30 Months Onwards",
    name: "Social Land", category: "Digital Marketing",
    desc: "6-person dedicated team with UK agency achieving seamless borderless collaboration",
    stats: [
      { label: "Project Output", value: "150%" },
      { label: "Cost Savings",   value: "60%"  },
      { label: "Team Size",      value: "6 People" },
    ],
  },
  {
    logo: client2, duration: "+24 Months Onwards",
    name: "Koala Digital", category: "Digital Marketing",
    desc: "2-person specialized team transformed UK agency delivery with 55% cost savings",
    stats: [
      { label: "Campaign Output", value: "150%" },
      { label: "Cost Reduction",   value: "55%"  },
      { label: "Team Size",      value: "2 People" },
    ],
  },
  {
    logo: client3, duration: "+12 Months Onwards",
    name: "Website Architect", category: "Web Development",
    desc: "3-person team transformed solo founder from overworked to empowered growth",
    stats: [
      { label: "Monthly Output", value: "200%" },
      { label: "New Services",   value: "SEO Added"  },
      { label: "Team Size",      value: "3 People" },
    ],
  },
  {
    logo: client4, duration: "Newly Onboarded",
    name: "FSE Digital", category: "Google Ads",
    desc: " Dedicated Google Ads specialist supporting Agency with fulltime whitelabel delivery",
    stats: [
      { label: "Delivery Output", value: "100%" },
      { label: "Hiring Overhead",   value: "0%"  },
      { label: "Team Size",      value: "1 Person" },
    ],
  },
  /*{
    logo: client5, duration: "+24 Months Onwards",
    name: "BrightScale", category: "Paid Advertising",
    desc: "2-person Google Ads team delivering 4× ROAS consistently for a retail brand",
    stats: [
      { label: "Project Output", value: "400%" },
      { label: "Cost Savings",   value: "50%"  },
      { label: "Team Size",      value: "2 People" },
    ],
  },
  {
    logo: client6, duration: "+12 Months Onwards",
    name: "Orbit Media", category: "Video & Social",
    desc: "5-person video & social team scaling content output for a UK media agency",
    stats: [
      { label: "Project Output", value: "250%" },
      { label: "Cost Savings",   value: "58%"  },
      { label: "Team Size",      value: "5 People" },
    ],
  },*/
];

const SLIDE_COUNT   = 2;
const AUTO_INTERVAL = 5000;

export default function RealResultsSection() {
  const [slide, setSlide]   = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef            = useRef(null);

  const goTo = useCallback((idx) => setSlide(idx), []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setSlide(prev => (prev + 1) % SLIDE_COUNT);
    }, AUTO_INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [slide, paused]);

  const visible = cards.slice(slide * 3, slide * 3 + 3);

  return (
    <section style={{
      width: "100%",
      background: "#ffffff",
      padding: "56px 48px 48px",   /* ← reduced top/bottom padding */
      fontFamily: "Roobert Font Family, Sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <h2 style={{
          fontSize: "clamp(28px,4vw,48px)",
          fontWeight: 900,
          fontFamily: 
          "Roobert Font Family, Sans-serif",
          letterSpacing: "-0.04em",
          color: "#000000",           /* ← black */
          margin: "0 0 40px",
          textAlign: "left",
        }}>
          Real teams. Real results.
        </h2>
        

        {/* Cards */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: 18, marginTop: 30,
  alignItems: "stretch",
}} className="rrGrid">
            {visible.map((c, i) => (
              <Card key={`${slide}-${i}`} card={c} />
            ))}
          </div>

          {/* dot indicators */}
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 8, marginTop: 24,marginBottom: 0,   /* ← reduced margin */
          }}>
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width:  i === slide ? 24 : 8,
                  height: 8,
                  borderRadius: 100,
                  background: i === slide ? "#000000" : "#d1d5db",
                  border: "none", cursor: "pointer", padding: 0,
                  /*transition: "all .35s ease",*/
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .rrGrid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .rrGrid { grid-template-columns: 1fr !important; }
          section { padding: 40px 20px !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Card ── */
function Card({ card }) {
  return (
   <div style={{
  background: "#fdf8f0",
  border: "1px solid #f0e8d8",
  borderRadius: 16,
  padding: "20px 20px 22px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  /*animation: "fadeUp .4s ease both",*/
  minHeight: 320,   // ← forces all cards same minimum height
}}>

      {/* duration badge */}
      <div style={{
        position: "absolute",
        top: -13, left: "50%",
        transform: "translateX(-50%)",
        background: "#1a1340",
        color: "#f5a623",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.04em",
        padding: "4px 12px",
        borderRadius: 100,
        whiteSpace: "nowrap",
      }}>
        {card.duration}
      </div>

      {/* logo + category row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14, marginTop: 6,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "#fff",
          border: "1px solid #ede8df",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,.06)",
        }}>
          <img src={card.logo} alt={card.name} style={{ width: 30, height: 30, objectFit: "contain" }} />
        </div>

        <span style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#000000",           /* ← black */
          background: "#fef3c7",
          border: "1px solid #fde68a",
          padding: "4px 10px",
          borderRadius: 100,
        }}>
          {card.category}
        </span>
      </div>

      {/* name + desc */}
      <p style={{
        fontSize: 20,
        fontWeight: 800,
        color: "#000000",             /* ← black */
        margin: "0 0 6px",
        letterSpacing: "-0.02em",
        textAlign: "left",           /* ← force left */
      }}>
        {card.name}
      </p>
      <p style={{
        fontSize: 18,
        color: "#000000",             /* ← black */
        lineHeight: 1.6,
        margin: "8px 0 10px",
        textAlign: "left",
                   /* ← force left */
      }}>
        {card.desc}
      </p>

      {/* divider */}
      <div style={{ borderTop: "1px solid #ede8df", marginBottom: 14 }} />

      {/* stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {card.stats.map(s => (
          <div key={s.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 16, color: "#000000" }}>{s.label}</span>   {/* ← black */}
            <span style={{ fontSize: 16, fontWeight: 800, color: "#000000" }}>{s.value}</span> {/* ← black */}
          </div>
        ))}
      </div>

    </div>
  );
}
