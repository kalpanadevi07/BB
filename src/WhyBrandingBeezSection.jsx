const stats = [
  { value: "48", suffix: "hrs", desc: "To deliver your vetted shortlist" },
  { value: "6", suffix: "+",    desc: "Specialist roles ready to deploy" },
  { value: "5", suffix: "+",    desc: "UK agencies actively using our specialists" },
];

const WhyBrandingBeezSection = () => (
  <>
    <section style={{const stats = [
  { value: "48", suffix: "hrs", desc: "To deliver your vetted shortlist" },
  { value: "6", suffix: "+",    desc: "Specialist roles ready to deploy" },
  { value: "5", suffix: "+",    desc: "UK agencies actively using our specialists" },
];

const WhyBrandingBeezSection = () => (
  <>
    <section style={{
      width: "100%",
      background: "#f5a623",
      padding: "80px 48px",
      fontFamily: "Roobert Font Family, Sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Heading */}
        <h2 style={{
          textAlign: "center",
          fontSize: "64px",
          fontWeight: 900,
          letterSpacing: "-0.0em",
          color: "#0d0d0d",
          margin: "0 0 56px 0",
        }}>
          Why BrandingBeez?
        </h2>

        {/* Stats row */}
        <div className="whyGrid" style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          flexWrap: "wrap",
        }}>
          {stats.map((s, i) => (
            <div key={i} className="whyStat" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              flex: "1 1 240px",
              maxWidth: "300px",
            }}>
              {/* White pill badge */}
              <div style={{
                background: "#ffffff",
                borderRadius: "100px",
                padding: "22px 36px",
                display: "inline-flex",
                alignItems: "baseline",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                minWidth: "160px",
              }}>
                <span style={{
                  fontSize: "72px",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#1a1340",
                  lineHeight: 1,
                }}>
                  {s.value}
                </span>
                {s.suffix && (
                  <span style={{
                    fontSize: "72px",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: "#f5a623",
                    lineHeight: 1,
                    marginLeft: "2px",
                  }}>
                    {s.suffix}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#0d0d0d",
                textAlign: "center",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "200px",
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>

    <style>{`
      @media (max-width: 315px) {
        .whyGrid {
          flex-direction: column !important;
          align-items: center !important;
          gap: 10px !important;       /* ← reduced from 40px to 20px */
        }
        .whyStat {
          gap: 10px !important;       /* ← tighter gap between pill and text */
          max-width: 100% !important;
          width: 100%;
        }
      }
    `}</style>
  </>
);

export default WhyBrandingBeezSection;

      width: "100%",
      background: "#f5a623",
      padding: "80px 48px",
      fontFamily: "Roobert Font Family, Sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Heading */}
        <h2 style={{
          textAlign: "center",
          fontSize: "64px",
          fontWeight: 900,
          letterSpacing: "-0.0em",
          color: "#0d0d0d",
          margin: "0 0 56px 0",
        }}>
          Why BrandingBeez?
        </h2>

        {/* Stats row */}
        <div className="whyGrid" style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          flexWrap: "wrap",
        }}>
          {stats.map((s, i) => (
            <div key={i} className="whyStat" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              flex: "1 1 240px",
              maxWidth: "300px",
            }}>
              {/* White pill badge */}
              <div style={{
                background: "#ffffff",
                borderRadius: "100px",
                padding: "22px 36px",
                display: "inline-flex",
                alignItems: "baseline",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                minWidth: "160px",
              }}>
                <span style={{
                  fontSize: "72px",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#1a1340",
                  lineHeight: 1,
                }}>
                  {s.value}
                </span>
                {s.suffix && (
                  <span style={{
                    fontSize: "72px",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: "#f5a623",
                    lineHeight: 1,
                    marginLeft: "2px",
                  }}>
                    {s.suffix}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#0d0d0d",
                textAlign: "center",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "200px",
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>

    <style>{`
      @media (max-width: 315px) {
        .whyGrid {
          flex-direction: column !important;
          align-items: center !important;
          gap: 10px !important;       /* ← reduced from 40px to 20px */
        }
        .whyStat {
          gap: 10px !important;       /* ← tighter gap between pill and text */
          max-width: 100% !important;
          width: 100%;
        }
      }
    `}</style>
  </>
);

export default WhyBrandingBeezSection;
