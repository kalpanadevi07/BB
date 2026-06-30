import { useState, useEffect } from "react";

const faqs = [
  { question: "Will the specialist work only on my projects?", answer: "Yes — 100%. No shared time, no split focus, no second clients on the side." },
  { question: "How fast can someone start?", answer: "Shortlists in 48 hours. Most specialists are live in your workflow within 7 working days." },
  { question: "How do we actually communicate?", answer: "Directly. Slack, Teams, Zoom, Google Meet, email — whatever you use. Daily standups and weekly reports come standard." },
  { question: "What's bundled into the monthly price?", answer: "Salary, equipment, taxes and HR. One predictable invoice, billed monthly in GBP." },
  { question: "What's the minimum commitment?", answer: "Three months. After that, scale up, scale down, or pause with 30 days' notice." },
  { question: "What if they're not the right fit?", answer: "We replace them, free, with reasonable notice. It rarely happens — everyone is pre-vetted before you ever see a profile." },
  { question: "How is confidentiality handled?", answer: "All staff sign an NDA before they're brought into your workflow. Your credentials and data are kept safe and secure — nothing will be compromised." },
  { question: "Do you work in UK time zones?", answer: "Yes. All specialists work UK working hours (9 to 6 GMT/BST), so you collaborate in real time — same day, same hours, no overnight delays." },
  { question: "Do I need to pay for the software?", answer: "Yes — software and tool licences are covered from your end, since they're tied to your account and stay with you." },
];

export default function FAQSection() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const isMobile  = width < 600;
  const isTablet  = width >= 600 && width < 1024;
  const isDesktop = width >= 1024;

  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ background: "#ffffff", width: "100%" }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "28px 20px" : isTablet ? "60px 32px" : "72px 40px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: isMobile ? 20 : isDesktop ? 60 : 40,
        }}>

          {/* LEFT */}
          <div style={{
            flexShrink: 0,
            width: isDesktop ? "35%" : "100%",
            textAlign: "left",
          }}>
            {/* Mobile: heading and button side by side */}
            {isMobile ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 14,
              }}>
                <h2 style={{
                  fontFamily: "Roobert Font Family, Sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#000000",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}>
                  Questions,<br />answered.
                </h2>
                <TalkButton isMobile={isMobile} />
              </div>
            ) : (
              <>
                <h2 style={{
                  fontFamily: "Roobert Font Family, Sans-serif",
                  fontSize: isTablet ? 36 : 48,
                  fontWeight: 800,
                  color: "#000000",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  marginBottom: 24,
                  marginTop: 0,
                }}>
                  Questions,<br />answered.
                </h2>
                <TalkButton isMobile={false} />
              </>
            )}
          </div>

          {/* RIGHT — FAQ list */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 8 : 10,
            width: "100%",
          }}>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                isMobile={isMobile}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function FAQItem({ faq, isOpen, onToggle, isMobile }) {
  return (
    <div style={{
      border: isOpen ? "1.5px solid #f5a623" : "1.5px solid #ede5d8",
      borderRadius: isMobile ? 10 : 12,
      background: "#fdf8f2",
      overflow: "hidden",
      transition: "border-color 0.2s ease",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "12px 14px" : "18px 22px",
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: isMobile ? 10 : 16,
        }}
      >
        <span style={{
          fontFamily: "Roobert Font Family, Sans-serif",
          fontSize: isMobile ? 13.5 : 18,
          fontWeight: 600,
          color: "#000000",
          lineHeight: 1.4,
        }}>
          {faq.question}
        </span>

        <span style={{
          flexShrink: 0,
          color: "#f5a623",
          fontSize: isMobile ? 18 : 24,
          fontWeight: 300,
          lineHeight: 1,
          width: isMobile ? 16 : 22,
          textAlign: "center",
        }}>
          {isOpen ? "×" : "+"}
        </span>
      </button>

      <div style={{
        maxHeight: isOpen ? 200 : 0,
        overflow: "hidden",
        transition: "max-height 0.32s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <p style={{
          padding: isMobile ? "0 14px 12px" : "0 22px 18px",
          margin: 0,
          fontSize: isMobile ? 12.5 : 16,
          fontWeight: 400,
          color: "#000000",
          lineHeight: 1.6,
          textAlign: "left",
        }}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

/* ══ Talk to us — slide-up effect ══ */
function TalkButton({ isMobile }) {
  const [hovered, setHovered] = useState(false);
  const label = "Talk to us";
  const fs = isMobile ? 13 : 18;
  const height = isMobile ? 38 : 50;

  return (
    <button
      onClick={() => window.open("https://calendly.com/raje-brandingbeez", "_blank")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered ? "#f5a623" : "#28174f",
        color: hovered ? "#28174f" : "#ffffff",
        border: "none",
        outline: "none",
        boxShadow: "none",
        WebkitAppearance: "none",
        appearance: "none",
        borderRadius: 100,
        padding: isMobile ? "0 16px" : "0 28px",
        height: `${height}px`,
        fontFamily: "Roobert Font Family, Sans-serif",
        fontSize: fs,
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.22s ease, color 0.22s ease",
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 600, fontSize: fs,
        transform: hovered ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 600, fontSize: fs,
        transform: hovered ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      <span style={{ visibility: "hidden", fontWeight: 600, fontSize: fs }}>{label}</span>
    </button>
  );
}
