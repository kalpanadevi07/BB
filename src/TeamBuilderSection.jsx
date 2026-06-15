import { useState } from "react";
import { Search, Globe, BarChart2, Code2, Pen, Video } from "lucide-react";

const RATE = 800;

const roles = [
  { id: "seo",    label: "SEO Specialist",    Icon: Search    },
  { id: "web",    label: "Website Specialist", Icon: Globe     },
  { id: "ads",    label: "Google Ads Expert",  Icon: BarChart2 },
  { id: "dev",    label: "Developer",          Icon: Code2     },
  { id: "design", label: "Graphic Designer",   Icon: Pen       },
  { id: "video",  label: "Video Editor",       Icon: Video     },
];

/* ══ Build my team slide-up button ══ */
function BuildTeamButton({ total, monthly, onClick }) {
  const [hov, setHov] = useState(false);
  const active = total >= 2;
  const label  = active
    ? `Build my team — £${monthly.toLocaleString()}/mo `
    : "Pick at least 2 specialists";

  return (
    <button
      disabled={!active}
      onClick={() => { if (active) onClick(); }}
      onMouseEnter={() => { if (active) setHov(true); }}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        background: active ? (hov ? "#d97706" : "#f5a623") : "rgba(255,255,255,.10)",
        color: active ? "#0d0d0d" : "#ffffff",
        fontSize: 20, fontWeight: 700,
        height: "48px",
        borderRadius: "50px", border: "none",
        cursor: active ? "pointer" : "default",
        fontFamily: "Roobert Font Family, Sans-serif",
        transition: "background .25s, color .25s",
        marginTop: "10px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Text 1 — slides out upward */}
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: 20,
        transform: active && hov ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      {/* Text 2 — slides in from below */}
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: 20,
        transform: active && hov ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      {/* Spacer — keeps button width stable */}
      <span style={{ visibility: "hidden", fontWeight: 700, fontSize: 20 }}>{label}</span>
    </button>
  );
}

export default function TeamBuilderSection() {
  const [counts, setCounts] = useState(
    Object.fromEntries(roles.map(r => [r.id, 0]))
  );

  const change = (id, delta) =>
    setCounts(prev => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));

  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const total       = Object.values(counts).reduce((a, b) => a + b, 0);
  const subtotal    = total * RATE;
  const discountPer = total >= 4 ? 150 : total >= 2 ? 100 : 0;
  const savings     = discountPer * total;
  const monthly     = Math.max(0, subtotal - savings);

  return (
    <>
      <section style={{
        width: "100%",
        background: "#ffffff",
        padding: "0px 48px 0px",
        fontFamily: "Roobert Font Family, Sans-serif",
        boxSizing: "border-box",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", marginTop: "0px", marginBottom: "40px" }}>

          <div className="tbWrap" style={{
            background: "linear-gradient(135deg,#1a1340 0%,#251855 60%,#2a1a50 100%)",
            borderRadius: "20px",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}>

            {/* ══ LEFT ══ */}
            <div style={{
              padding: "40px 30px",
              borderRight: "1px solid rgba(255,255,255,.08)",borderLeft: "10px solid rgba(255,255,255,.08)",
              display: "flex",
              flexDirection: "column",
            }}>
              <h2 style={{
                fontSize: "clamp(22px,2.4vw,36px)",
                fontWeight: 900, color: "#fff",
                letterSpacing: "-0.0em", lineHeight: 1.1,
                margin: "0 0 8px",
                textAlign: "left",
                fontFamily: "Roobert Font Family, Sans-serif",
              }}>
                Hire a full-time team
              </h2>

              <p style={{
                fontSize: 20, lineHeight: 1.55,
                color: "#ffffff",
                margin: "0 0 18px",
                textAlign: "left",
              }}>
                Pick any combination of specialists. The more you hire,
                the more you save automatic discount applied to your
                monthly total.
              </p>

              {/* discount badges */}
              <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
                {[
                  { tier: "2–3 SPECIALISTS", val: "£100 off", active: total >= 2 && total < 4 },
                  { tier: "4+ SPECIALISTS",  val: "£150 off", active: total >= 4 },
                ].map(d => (
                  <div key={d.tier} style={{
                    flex: 1, minWidth: 110,
                    background: d.active ? "rgba(245,166,35,.18)" : "rgba(255,255,255,.07)",
                    border: `1px solid ${d.active ? "rgba(245,166,35,.5)" : "rgba(255,255,255,.12)"}`,
                    borderRadius: 10, padding: "10px 14px",
                    transition: "all .25s",
                  }}>
                    <p style={{
                      fontSize: 18, fontWeight: 700,
                      letterSpacing: "0.0em", textTransform: "uppercase",
                      color: d.active ? "#f5a623" : "#ffffff",
                      margin: "0 0 3px",
                    }}>{d.tier}</p>
                    <p style={{
                      fontSize: 18, fontWeight: 900,
                      color: d.active ? "#f5a623" : "#ffffff",
                      margin: 0, letterSpacing: "-0.03em",
                    }}>{d.val}</p>
                  </div>
                ))}
              </div>

              {/* live summary box */}
              <div style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: 12, padding: "13px 15px",
                marginBottom: 16,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                  <span style={{ fontSize: 18, color: "#ffffff" }}>
                    {total} × Full-Time @ £{RATE}/mo
                  </span>
                  <span style={{ fontSize: 18, color: "#ffffff" }}>
                    £{subtotal.toLocaleString()}
                  </span>
                </div>

                {savings > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                    <span style={{ fontSize: 18, color: "#f5a623" }}>
                      Discount (£{discountPer}/specialist)
                    </span>
                    <span style={{ fontSize: 18, color: "#f5a623" }}>
                      −£{savings.toLocaleString()}
                    </span>
                  </div>
                )}

                <div style={{ borderTop: "1px dashed rgba(255,255,255,.18)", margin: "9px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 18, fontWeight: 600, color: "#ffffff" }}>
                    Your monthly total
                  </span>
                  <span style={{
                    fontSize: 20, fontWeight: 900, color: "#fff",
                    letterSpacing: "-0.05em", lineHeight: 1, transition: "all .2s",
                  }}>
                    £{monthly.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* ← replaced plain button with BuildTeamButton */}
              <BuildTeamButton total={total} monthly={monthly} onClick={scrollToForm} />
            </div>

            {/* ══ RIGHT ══ */}
            <div style={{ padding: "40px 30px", display: "flex", flexDirection: "column" }}>

              <h2 style={{
                fontSize: "clamp(22px,2.4vw,36px)",
                fontWeight: 900,
                color: "#f5a623",
                fontFamily: "Roobert Font Family, Sans-serif",
                letterSpacing: "-0.04em", lineHeight: 1.1,
                margin: "0 0 8px",
                textAlign: "left",
              }}>
                Pick Your Team
              </h2>

              <p style={{
                fontSize: 18, lineHeight: 1.55,
                color: "#ffffff",
                margin: "0 0 16px",
                textAlign: "left",
              }}>
                Choose any mix including multiple of the same role.
              </p>

              {/* role rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {roles.map(r => {
                  const { Icon } = r;
                  const n = counts[r.id];
                  return (
                    <div key={r.id} style={{
                      display: "flex", alignItems: "center",
                      background: n > 0 ? "rgba(245,166,35,.10)" : "rgba(255,255,255,.05)",
                      border: `1px solid ${n > 0 ? "rgba(245,166,35,.35)" : "rgba(255,255,255,.08)"}`,
                      borderRadius: 10, padding: "9px 13px", gap: 10,
                      transition: "all .2s",
                    }}>
                      <div style={{
                        width: 28, height: 28, flexShrink: 0,
                        background: n > 0 ? "rgba(245,166,35,.20)" : "rgba(255,255,255,.08)",
                        borderRadius: 7,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background .2s",
                      }}>
                        <Icon size={18} color={n > 0 ? "#f5a623" : "#ffffff"} strokeWidth={1.8} />
                      </div>

                      <span style={{
                        flex: 1, fontSize: 18, fontWeight: 600,
                        color: "#ffffff",
                        letterSpacing: "-0.0em",
                        textAlign: "left",
                      }}>{r.label}</span>

                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button
                          onClick={() => change(r.id, -1)}
                          style={{
                            width: 26, height: 26, borderRadius: "50%",
                            background: n > 0 ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.08)",
                            border: "none", cursor: n > 0 ? "pointer" : "default",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18, fontWeight: 700,
                            color: "#ffffff",
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

              {total > 0 && (
                <div style={{
                  marginTop: 12, padding: "10px 14px",
                  background: "rgba(245,166,35,.10)",
                  border: "1px solid rgba(245,166,35,.25)",
                  borderRadius: 9,
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{ fontSize: 16, color: "#ffffff" }}>
                    {total} specialist{total > 1 ? "s" : ""} selected
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#f5a623" }}>
                    £{monthly.toLocaleString()}/mo
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .tbWrap {
            grid-template-columns: 1fr !important;
          }
          .tbWrap > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,.08) !important;
          }
        }
        @media (max-width: 480px) {
          section { padding: 0px 20px 20px !important; }
        }
      `}</style>
    </>
  );
}
