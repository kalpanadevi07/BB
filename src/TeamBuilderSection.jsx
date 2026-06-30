import { useState, useEffect } from "react";
import { Search, Globe, BarChart2, Code2, Pen, Video } from "lucide-react";
import BuildTeamForm from "./BuildTeamForm";

const RATE = 800;

const roles = [
  { id: "seo",    label: "SEO Specialist",    Icon: Search    },
  { id: "web",    label: "Website Specialist", Icon: Globe     },
  { id: "ads",    label: "Google Ads Expert",  Icon: BarChart2 },
  { id: "dev",    label: "Developer",          Icon: Code2     },
  { id: "design", label: "Graphic Designer",   Icon: Pen       },
  { id: "video",  label: "Video Editor",       Icon: Video     },
];

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

/* ══ Build my team slide-up button ══ */
function BuildTeamButton({ total, monthly, onClick, isMobile }) {
  const [hov, setHov] = useState(false);
  const active = total >= 2;
  const label  = active
    ? `Build my team — £${monthly.toLocaleString()}/mo `
    : "Pick at least 2 specialists";

  const fs = isMobile ? 15 : 20;

  return (
    <button
      disabled={!active}
      onClick={() => { if (active) onClick(); }}
      onMouseEnter={() => { if (active) setHov(true); }}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        background: active ? (hov ? "#ffffff" : "#f5a623") : "rgba(255,255,255,.10)",
        color: active ? "#0d0d0d" : "#ffffff",
        fontSize: fs, fontWeight: 700,
        height: isMobile ? "46px" : "48px",
        borderRadius: "50px", border: "none",
        cursor: active ? "pointer" : "default",
        fontFamily: "Roobert Font Family, Sans-serif",
        transition: "background .25s, color .25s",
        marginTop: "10px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: fs,
        transform: active && hov ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: fs,
        transform: active && hov ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      <span style={{ visibility: "hidden", fontWeight: 700, fontSize: fs }}>{label}</span>
    </button>
  );
}

/* ══ Live summary box ══ */
function SummaryBox({ total, subtotal, discountPer, savings, monthly, isMobile }) {
  const fs = isMobile ? 14 : 18;
  return (
    <div style={{
      background: "rgba(255,255,255,.06)",
      border: "1px solid rgba(255,255,255,.10)",
      borderRadius: 12, padding: isMobile ? "12px 14px" : "13px 15px",
      marginBottom: 16,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
        <span style={{ fontSize: fs, color: "#ffffff" }}>
          {total} × Full-Time @ £{RATE}/mo
        </span>
        <span style={{ fontSize: fs, color: "#ffffff" }}>
          £{subtotal.toLocaleString()}
        </span>
      </div>

      {savings > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
          <span style={{ fontSize: fs, color: "#f5a623" }}>
            Discount (£{discountPer}/specialist)
          </span>
          <span style={{ fontSize: fs, color: "#f5a623" }}>
            −£{savings.toLocaleString()}
          </span>
        </div>
      )}

      <div style={{ borderTop: "1px dashed rgba(255,255,255,.18)", margin: "9px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: fs, fontWeight: 600, color: "#ffffff" }}>
          Your monthly total
        </span>
        <span style={{
          fontSize: isMobile ? 18 : 20, fontWeight: 900, color: "#fff",
          letterSpacing: "-0.05em", lineHeight: 1, transition: "all .2s",
        }}>
          £{monthly.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function TeamBuilderSection() {
  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 900;

  const [showForm, setShowForm] = useState(false);   // ← form toggle

  const [counts, setCounts] = useState(
    Object.fromEntries(roles.map(r => [r.id, 0]))
  );

  const change = (id, delta) =>
    setCounts(prev => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));

  const total       = Object.values(counts).reduce((a, b) => a + b, 0);
  const subtotal    = total * RATE;
  const discountPer = total >= 4 ? 150 : total >= 3 ? 100 : 0;
  const savings     = discountPer * total;
  const monthly     = Math.max(0, subtotal - savings);

  const openForm = () => setShowForm(true);           // ← replaces scrollToForm

  /* ── Show BuildTeamForm when button clicked ── */
  if (showForm) {
    return (
      <BuildTeamForm
        onBack={() => setShowForm(false)}
        selectedCounts={counts}
        monthly={monthly}
      />
    );
  }

  /* ── responsive sizing tokens ── */
  const sectionPad  = isMobile ? "0px 0px 0px" : "0px 48px 0px";
  const cardPad     = isMobile ? "26px 20px" : isTablet ? "32px 24px" : "40px 30px";
  const headingSize = isMobile ? "22px" : isTablet ? "28px" : "clamp(22px,2.4vw,36px)";
  const bodyFont    = isMobile ? 14 : 18;
  const labelFont   = isMobile ? 14 : 18;
  const radius      = isMobile ? "16px" : "20px";
  const gridLayout  = (isMobile || isTablet) ? "1fr" : "1fr 1fr";

  return (
    <>
      <section style={{
        width: "100%",
        background: "#ffffff",
        padding: sectionPad,
        fontFamily: "Roobert Font Family, Sans-serif",
        boxSizing: "border-box",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          marginTop: isMobile ? "-54px" : "0px",
          marginBottom: isMobile ? "0px" : "40px",
        }}>

          <div className="tbWrap" style={{
            background: "linear-gradient(135deg,#1a1340 0%,#251855 60%,#2a1a50 100%)",
            borderRadius: radius,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: gridLayout,
          }}>

            {/* ══ LEFT — heading, discount badges, summary, CTA ══ */}
            <div style={{
              padding: cardPad,
              borderRight: (isMobile || isTablet) ? "none" : "1px solid rgba(255,255,255,.08)",
              borderBottom: (isMobile || isTablet) ? "1px solid rgba(255,255,255,.08)" : "none",
              display: "flex", flexDirection: "column",
              order: 1,
            }}>
              <h2 style={{
                fontSize: headingSize, fontWeight: 900, color: "#fff",
                letterSpacing: "-0.0em", lineHeight: 1.15,
                margin: "0 0 8px", textAlign: "left",
                fontFamily: "Roobert Font Family, Sans-serif",
              }}>
                Hire a full-time team
              </h2>

              <p style={{
                fontSize: bodyFont, lineHeight: 1.5, color: "#ffffff",
                margin: "0 0 16px", textAlign: "left",
              }}>
                Pick any combination of specialists. The more you hire,
                the more you save — automatic discount applied to your
                monthly total.
              </p>

              {/* discount badges */}
              <div style={{ display: "flex", gap: isMobile ? 8 : 10, marginBottom: isMobile ? 16 : 18, flexWrap: "wrap" }}>
                {[
                  { tier: "3 SPECIALISTS", val: "£100 off", active: total >= 3 && total < 4 },
                  { tier: "4+ SPECIALISTS", val: "£150 off", active: total >= 4 },
                ].map(d => (
                  <div key={d.tier} style={{
                    flex: 1, minWidth: isMobile ? 130 : 110,
                    background: d.active ? "rgba(245,166,35,.18)" : "rgba(255,255,255,.07)",
                    border: `1px solid ${d.active ? "rgba(245,166,35,.5)" : "rgba(255,255,255,.12)"}`,
                    borderRadius: 10, padding: isMobile ? "9px 12px" : "10px 14px",
                    transition: "all .25s",
                  }}>
                    <p style={{
                      fontSize: isMobile ? 11 : 14, fontWeight: 700,
                      letterSpacing: "0.02em", textTransform: "uppercase",
                      color: d.active ? "#f5a623" : "#ffffff", margin: "0 0 3px",
                    }}>{d.tier}</p>
                    <p style={{
                      fontSize: isMobile ? 16 : 20, fontWeight: 900,
                      color: d.active ? "#f5a623" : "#ffffff",
                      margin: 0, letterSpacing: "-0.03em",
                    }}>{d.val}</p>
                  </div>
                ))}
              </div>

              {/* desktop: summary + CTA on left */}
              {!isMobile && (
                <>
                  <SummaryBox
                    total={total} subtotal={subtotal}
                    discountPer={discountPer} savings={savings}
                    monthly={monthly} isMobile={isMobile}
                  />
                  <BuildTeamButton
                    total={total} monthly={monthly}
                    onClick={openForm}              /* ← openForm */
                    isMobile={isMobile}
                  />
                </>
              )}
            </div>

            {/* ══ RIGHT — Pick Your Team ══ */}
            <div style={{ padding: cardPad, display: "flex", flexDirection: "column", order: 2 }}>

              <h2 style={{
                fontSize: headingSize, fontWeight: 900, color: "#f5a623",
                fontFamily: "Roobert Font Family, Sans-serif",
                letterSpacing: "-0.02em", lineHeight: 1.15,
                margin: "0 0 8px", textAlign: "left",
              }}>
                Pick Your Team
              </h2>

              <p style={{
                fontSize: bodyFont, lineHeight: 1.5, color: "#ffffff",
                margin: "0 0 16px", textAlign: "left",
              }}>
                Choose any mix including multiple of the same role.
              </p>

              {/* role rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 8 }}>
                {roles.map(r => {
                  const { Icon } = r;
                  const n = counts[r.id];
                  return (
                    <div key={r.id} style={{
                      display: "flex", alignItems: "center",
                      background: n > 0 ? "rgba(245,166,35,.10)" : "rgba(255,255,255,.05)",
                      border: `1px solid ${n > 0 ? "rgba(245,166,35,.35)" : "rgba(255,255,255,.08)"}`,
                      borderRadius: 10,
                      padding: isMobile ? "10px 12px" : "9px 13px",
                      gap: 10, transition: "all .2s",
                    }}>
                      <div style={{
                        width: isMobile ? 32 : 28, height: isMobile ? 32 : 28, flexShrink: 0,
                        background: n > 0 ? "rgba(245,166,35,.20)" : "rgba(255,255,255,.08)",
                        borderRadius: 7,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background .2s",
                      }}>
                        <Icon
                          size={isMobile ? 16 : 18}
                          color={n > 0 ? "#f5a623" : "#ffffff"}
                          strokeWidth={1.8}
                        />
                      </div>

                      <span style={{
                        flex: 1, fontSize: labelFont, fontWeight: 600,
                        color: "#ffffff", letterSpacing: "-0.0em", textAlign: "left",
                      }}>{r.label}</span>

                      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 12 }}>
                        <button
                          onClick={() => change(r.id, -1)}
                          style={{
                            width: 26, height: 26, borderRadius: "50%",
                            background: n > 0 ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)",
                            border: "none", cursor: n > 0 ? "pointer" : "default",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18, fontWeight: 700, color: "#ffffff",
                            lineHeight: 1, transition: "background .15s",
                          }}
                        >−</button>

                        <span style={{
                          fontSize: 18, fontWeight: 700, color: "#fff",
                          minWidth: 14, textAlign: "center",
                        }}>{n}</span>

                        <button
                          onClick={() => change(r.id, +1)}
                          style={{
                            width: 26, height: 26, borderRadius: "50%",
                            background: "#f5a623", border: "none", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18, fontWeight: 700,
                            color: "#0d0d0d", lineHeight: 1,
                            transition: "background .15s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#d97706"}
                          onMouseLeave={e => e.currentTarget.style.background = "#f5a623"}
                        >+</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {total > 0 && !isMobile && (
                <div style={{
                  marginTop: 12, padding: "10px 14px",
                  background: "rgba(245,166,35,.10)",
                  border: "1px solid rgba(245,166,35,.25)",
                  borderRadius: 9,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 16, color: "#ffffff" }}>
                    {total} specialist{total > 1 ? "s" : ""} selected
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#f5a623" }}>
                    £{monthly.toLocaleString()}/mo
                  </span>
                </div>
              )}

              {/* mobile: summary + CTA after role list */}
              {isMobile && (
                <div style={{ marginTop: 16 }}>
                  <SummaryBox
                    total={total} subtotal={subtotal}
                    discountPer={discountPer} savings={savings}
                    monthly={monthly} isMobile={isMobile}
                  />
                  <BuildTeamButton
                    total={total} monthly={monthly}
                    onClick={openForm}              /* ← openForm */
                    isMobile={isMobile}
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .tbWrap > div:first-child {
            border-right: none !important;
          }
        }
      `}</style>
    </>
  );
}