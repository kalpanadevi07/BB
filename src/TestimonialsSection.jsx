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
  { quote: "I have worked with BrandingBeez now for over 3 years across 2 agencies I worked for. As well as personally. The team are amazing at design and development work. Nothing is too much trouble and they always go above and beyond. Amazing team! Thanks Raje!"
, name: "James Kearney", role: "Business Development Manager,Focus", countryCode: "gb" },
  { quote: "Our paid media results improved significantly within the first month. Having a dedicated specialist who's fully focused on our account made all the difference.", name: "Daniel Fechete", role: "COO, New Vision Tech", countryCode: "gb" },
  { quote: "I was sceptical at first, but the quality and communication blew me away. It feels like hiring a full-time team member without any of the HR headaches.", name: "Robert Black", role: "Founder, New Vision Tech", countryCode: "de" },
  { quote: "We scaled our content output threefold in 90 days. The specialist understood our brand voice from week one and just ran with it.", name: "Sarah Collins", role: "CEO, Bright Labs", countryCode: "au" },
  { quote: "BrandingBeez saved us from a very expensive agency retainer. Same output, a fraction of the cost, and we own every relationship directly.", name: "James Carter", role: "Head of Product, Stackly", countryCode: "ca" },
  { quote: "The onboarding was seamless. Within a week our new designer was producing work indistinguishable from what our in-house team creates.", name: "Priya Nair", role: "Founder, NovaBrand", countryCode: "sg" },
  { quote: "Real-time collaboration across time zones isn't just a promise — it's the daily reality. Our standups run on UK hours and nothing falls through the cracks.", name: "Tom Weller", role: "CTO, DevForge", countryCode: "nl" },
  { quote: "We doubled our Google Ads ROAS in three months. The specialist brought fresh strategy, not just execution, and it showed in the numbers.", name: "Emma Fitzgerald", role: "Director, GrowthHive", countryCode: "ie" },
  { quote: "Hiring through BrandingBeez was the smartest growth decision we made last year. Vetted talent, transparent pricing, zero drama.", name: "Luca Romano", role: "Founder, PixelStudio", countryCode: "it" },
];

function getInitial(name) { return name.charAt(0).toUpperCase(); }

function FlagIcon({ countryCode }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
      alt={countryCode.toUpperCase()}
      style={{ width: 26, height: 18, objectFit: "cover", borderRadius: 3, flexShrink: 0 }}
    />
  );
}

const CARD_HEIGHT = 420;
const GAP = 16;
const VISIBLE = 2.3; // 2 full cards + partial peek

export default function TestimonialsSection() {
  const width = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isDesktop = width >= 1024;

  const sidePad = isMobile ? 40 : isTablet ? 64 : 80;
  const leftColW = isDesktop ? 320 : 0;
  const rightW = Math.min(width, 1200) - sidePad - leftColW;
  const visibleCards = isMobile ? 1.2 : isTablet ? 1.8 : VISIBLE;
  const CARD_W = Math.floor((rightW - GAP * (Math.ceil(visibleCards) - 1)) / visibleCards);

  const maxIndex = testimonials.length - Math.floor(visibleCards);
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));

  const containerPad = isMobile ? "48px 20px" : isTablet ? "56px 32px" : "56px 40px";

  return (
    <div style={{ background: "#ffffff", width: "100%", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: containerPad }}>

        <h2
  style={{
    fontFamily: "Roobert Font Family, Sans-serif",
    fontSize: isMobile ? 38 : isTablet ? 36 : 40,
    fontWeight: 800,
    color: "#000000",
    lineHeight: 1.12,
    letterSpacing: "-0.02em",
    marginTop:0,
    marginBottom: 32,
    textAlign: "left",
  }}
>
  Loved by teams who hate
  <br />
  hiring drama.
</h2>

        {/* Body row — left col + slider side by side */}
        <div style={{
          display: isDesktop ? "grid" : "flex",
          gridTemplateColumns: isDesktop ? "320px 1fr" : undefined,
          flexDirection: !isDesktop ? "column" : undefined,
          gap: 0,
          alignItems: "flex-start",
        }}>

          {/* LEFT — description + arrows */}
          <div style={{ paddingRight: isDesktop ? 32 : 0, marginBottom: !isDesktop ? 32 : 0 }}>
            <p style={{
              fontSize: 16,
              color: "#000000",
              lineHeight: 1.7,
              marginBottom: 40,
              textAlign: "left",
            }}>
              Over 50 UK businesses trust BrandingBeez to scale their teams without the agency fees, long notice periods, or hiring headaches.
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <ArrowBtn direction="left"  onClick={prev} disabled={current === 0} />
              <ArrowBtn direction="right" onClick={next} disabled={current >= maxIndex} />
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
                <Card key={i} t={t} cardWidth={CARD_W} cardHeight={CARD_HEIGHT} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Card({ t, cardWidth, cardHeight }) {
  return (
    <div style={{
      minWidth: cardWidth,
      maxWidth: cardWidth,
      width: cardWidth,
      height: cardHeight,
      background: "#faf7f2",
      borderRadius: 16,
      padding: "24px 22px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
       textAlign: "left",
    }}>
      <div style={{
        position: "absolute", top: 18, right: 20,
        color: "#f5a623", fontSize: 30,
        fontFamily: "Roobert Font Family, Sans-serif", lineHeight: 1,
      }}>"</div>

      <p style={{
        fontSize: 16, color: "#000000", lineHeight: 1.7,
        paddingRight: 24, alignSelf: "flex-start", flexGrow: 1,
      }}>
        {t.quote}
      </p>

      <div style={{ borderTop: "1px solid #e8e0d4", paddingTop: 16, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "#f5a623",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: "Roobert Font Family, Sans-serif", fontWeight: 700, fontSize: 18,
              flexShrink: 0,
            }}>
              {getInitial(t.name)}
            </div>
            <div>
              <p style={{ fontFamily: "Roobert Font Family, Sans-serif", fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 1 }}>
                {t.name}
              </p>
              <p style={{ fontSize: 14, color: "#000000",lineHeight: 1. }}>{t.role}</p>
            </div>
          </div>
          <FlagIcon countryCode={t.countryCode} />
        </div>
      </div>
    </div>
  );
}

function ArrowBtn({ direction, onClick, disabled }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44, borderRadius: "50%",
        border: `1.5px solid ${disabled ? "#e5e7eb" : hovered ? "#111" : "#ccc"}`,
        background: hovered && !disabled ? "#111" : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        outline: "none", padding: 0,
        opacity: disabled ? 0.3 : 1, flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        {direction === "left"
          ? <path d="M9.5 3L5 7.5l4.5 4.5" stroke={hovered && !disabled ? "#fff" : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M5.5 3L10 7.5 5.5 12" stroke={hovered && !disabled ? "#fff" : "#555"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}