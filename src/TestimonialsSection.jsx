import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

const testimonials = [
  { quote: "I have worked with BrandingBeez now for over 3 years across 2 agencies I worked for. As well as personally. The team are amazing at design and development work. Nothing is too much trouble and they always go above and beyond. Amazing team! Thanks Raje!", name: "James Kearney", role: "Business Development Manager, Focus", countryCode: "gb" },
  { quote: "Branding Beez have been a great help to my business. Before meeting Raje and her team, I was doing the sales, building the websites and handling all the tech and aftercare. Now I have the time to grow the business, working 'ON' it, instead of constantly 'IN' it. So they've been a gamechanger for me and my business. Even taking my first holiday this year WITHOUT my laptop! Thanks so much!", name: "Gemma", role: "Founder, Website Architect", countryCode: "gb" },
  { quote: "I was sceptical at first, but the quality and communication blew me away. It feels like hiring a full-time team member without any of the HR headaches.", name: "Robert Black", role: "Founder, New Vision Tech", countryCode: "de" },
  { quote: "We scaled our content output threefold in 90 days. The specialist understood our brand voice from week one and just ran with it.", name: "Sarah Collins", role: "CEO, Bright Labs", countryCode: "au" },
  { quote: "BrandingBeez saved us from a very expensive agency retainer. Same output, a fraction of the cost, and we own every relationship directly.", name: "James Carter", role: "Head of Product, Stackly", countryCode: "ca" },
  { quote: "The onboarding was seamless. Within a week our new designer was producing work indistinguishable from what our in-house team creates.", name: "Priya Nair", role: "Founder, NovaBrand", countryCode: "sg" },
  { quote: "Real-time collaboration across time zones isn't just a promise — it's the daily reality. Our standups run on UK hours and nothing falls through the cracks.", name: "Tom Weller", role: "CTO, DevForge", countryCode: "nl" },
  { quote: "We doubled our Google Ads ROAS in three months. The specialist brought fresh strategy, not just execution, and it showed in the numbers.", name: "Emma Fitzgerald", role: "Director, GrowthHive", countryCode: "ie" },
  { quote: "Hiring through BrandingBeez was the smartest growth decision we made last year. Vetted talent, transparent pricing, zero drama.", name: "Luca Romano", role: "Founder, PixelStudio", countryCode: "it" },
];

function getInitial(name) { return name.charAt(0).toUpperCase(); }

function StarRating({ isMobile }) {
  const size = isMobile ? 13 : 18;
  return (
    <div style={{ display: "flex", gap: isMobile ? 3 : 4, marginBottom: isMobile ? 12 : 20 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="#f5a623">
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78z"/>
        </svg>
      ))}
    </div>
  );
}

const GAP = 16;
const VISIBLE = 2.3;

export default function TestimonialsSection() {
  const width     = useWindowWidth();
  const isMobile  = width < 600;
  const isTablet  = width >= 600 && width < 1024;
  const isDesktop = width >= 1024;

  const sidePad    = isMobile ? 40 : isTablet ? 64 : 80;
  const leftColW   = isDesktop ? 320 : 0;
  const rightW     = Math.min(width, 1200) - sidePad - leftColW;
  const visibleCards = isMobile ? 1.15 : isTablet ? 1.8 : VISIBLE;
  const CARD_W     = Math.floor((rightW - GAP * (Math.ceil(visibleCards) - 1)) / visibleCards);
  const CARD_HEIGHT = isMobile ? 360 : isTablet ? 480 : 600;

  const maxIndex = testimonials.length - Math.floor(visibleCards);
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));

  const containerPad = isMobile ? "32px 20px 40px" : isTablet ? "56px 32px" : "56px 40px";

  return (
    <div style={{ background: "#ffffff", width: "100%", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: containerPad }}>

        {/* Body row — left col + slider side by side */}
        <div style={{
          display: isDesktop ? "grid" : "flex",
          gridTemplateColumns: isDesktop ? "320px 1fr" : undefined,
          flexDirection: !isDesktop ? "column" : undefined,
          gap: 0,
          alignItems: "flex-start",
        }}>

          {/* LEFT — heading + arrows */}
          <div style={{ paddingRight: isDesktop ? 32 : 0, marginBottom: isMobile ? 20 : !isDesktop ? 32 : 0 }}>
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: isMobile ? 24 : isTablet ? 36 : 48,
              fontWeight: 800,
              color: "#000000",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginTop: 0,
              marginBottom: isMobile ? 18 : 32,
              textAlign: "left",
            }}>
              Proven by Results, Powered by Trust
            </h2>

            <div style={{ display: "flex", gap: isMobile ? 8 : 12 }}>
              <ArrowBtn direction="left"  onClick={prev} disabled={current === 0} isMobile={isMobile} />
              <ArrowBtn direction="right" onClick={next} disabled={current >= maxIndex} isMobile={isMobile} />
            </div>
          </div>

          {/* RIGHT — slider */}
          <div style={{ overflow: "hidden" }}>
            <div style={{
              display: "flex",
              gap: GAP,
              transition: "transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94)",
              transform: `translateX(-${current * (CARD_W + GAP)}px)`,
              willChange: "transform",
              alignItems: "stretch",
            }}>
              {testimonials.map((t, i) => (
                <Card key={i} t={t} cardWidth={CARD_W} cardHeight={CARD_HEIGHT} isMobile={isMobile} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Card({ t, cardWidth, cardHeight, isMobile }) {
  return (
    <div style={{
      minWidth: cardWidth,
      maxWidth: cardWidth,
      width: cardWidth,
      height: cardHeight,
      background: "#faf7f2",
      borderRadius: isMobile ? 12 : 16,
      padding: isMobile ? "16px 16px 14px" : "24px 22px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
      textAlign: "left",
    }}>

      {/* Top section: stars + quote */}
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <StarRating isMobile={isMobile} />

        <p style={{
          fontSize: isMobile ? 13 : 18,
          color: "#000000",
          lineHeight: isMobile ? 1.5 : 1.6,
          paddingRight: isMobile ? 4 : 8,
          margin: 0,
          flexGrow: 1,
        }}>
          {t.quote}
        </p>
      </div>

      {/* Author row — pinned to bottom */}
      <div style={{ borderTop: "1px solid #e8e0d4", paddingTop: isMobile ? 10 : 16, marginTop: isMobile ? 12 : 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 10 }}>
            <div style={{
              width: isMobile ? 30 : 40, height: isMobile ? 30 : 40, borderRadius: "50%",
              background: "#f5a623",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: "'Sora', sans-serif",
              fontWeight: 700, fontSize: isMobile ? 12 : 16, flexShrink: 0,
            }}>
              {getInitial(t.name)}
            </div>
            <div>
              <p style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: isMobile ? 13 : 18, fontWeight: 700,
                color: "#111", margin: 0,
              }}>
                {t.name}
              </p>
              <p style={{ fontSize: isMobile ? 11 : 14, color: "#131010", margin: 0, marginTop: 2, lineHeight: 1.3 }}>
                {t.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowBtn({ direction, onClick, disabled, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const size = isMobile ? 36 : 44;
  const iconSize = isMobile ? 12 : 14;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size, height: size, borderRadius: "50%",
        border: `1.5px solid ${disabled ? "#e5e7eb" : hovered ? "#111" : "#ccc"}`,
        background: hovered && !disabled ? "#111" : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        outline: "none", padding: 0,
        opacity: disabled ? 0.3 : 1, flexShrink: 0,
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 15 15" fill="none">
        {direction === "left"
          ? <path d="M9.5 3L5 7.5l4.5 4.5" stroke={hovered && !disabled ? "#fff" : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M5.5 3L10 7.5 5.5 12" stroke={hovered && !disabled ? "#fff" : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}
