const stats = [
  { value: "48", suffix: "hrs", desc: "To deliver your vetted candidates" },
  { value: "6", suffix: "+",    desc: "Specialist roles ready to deploy in days" },
  { value: "6", suffix: "+",    desc: "UK agencies actively using our specialists" },
];

const WhyBrandingBeezSection = () => (
  <>
    <section className="why-section" style={{
      width: "100%",
      background: "#f5a623",
      padding: "80px 48px",
      fontFamily: "Roobert Font Family, Sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Heading */}
        <h2 className="why-heading" style={{
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
              <div className="why-pill" style={{
                background: "#ffffff",
                borderRadius: "100px",
                padding: "22px 36px",
                display: "inline-flex",
                alignItems: "baseline",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                minWidth: "160px",
              }}>
                <span className="why-value" style={{
                  fontSize: "72px",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#1a1340",
                  lineHeight: 1,
                }}>
                  {s.value}
                </span>
                {s.suffix && (
                  <span className="why-value" style={{
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
              <p className="why-desc" style={{
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
     /* ── Tablet ── */
@media (max-width: 1024px) and (min-width: 768px) {
  .why-section {
    padding: 56px 32px !important;
  }
  .why-heading {
    font-size: 40px !important;
    margin-bottom: 36px !important;
  }
  .whyGrid {
    flex-direction: column !important;
    align-items: center !important;
    gap: 20px !important;
  }
  .whyStat {
    flex: none !important;
    gap: 8px !important;
    max-width: 480px !important;
    width: 100%;
    background: #ffffff !important;
    border-radius: 20px !important;
    padding: 22px 24px !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06) !important;
  }
  .why-pill {
    padding: 0 !important;
    min-width: 0 !important;
    box-shadow: none !important;
    background: transparent !important;
  }
  .why-value {
    font-size: 40px !important;
  }
  .why-desc {
    font-size: 17px !important;
    max-width: 320px !important;
    font-weight: 600 !important;
  }
}
      /* ── Mobile ── */
      @media (max-width: 768px) {
        .why-section {
          padding: 32px 20px !important;
        }
        .why-heading {
          font-size: 26px !important;
          margin-bottom: 24px !important;
        }
        .whyGrid {
          flex-direction: column !important;
          align-items: center !important;
          gap: 16px !important;
        }
        .whyStat {
          flex: none !important;
          gap: 6px !important;
          max-width: 100% !important;
          width: 100%;
          background: #ffffff !important;
          border-radius: 18px !important;
          padding: 16px 16px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06) !important;
        }
        .why-pill {
          padding: 0 !important;
          min-width: 0 !important;
          box-shadow: none !important;
          background: transparent !important;
        }
        .why-value {
          font-size: 26px !important;
        }
        .why-desc {
          font-size: 13px !important;
          max-width: 240px !important;
          font-weight: 600 !important;
          line-height: 1.4 !important;
        }
      }
    `}</style>
  </>
);

export default WhyBrandingBeezSection;