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
];

const SLIDE_COUNT     = 2;
const AUTO_INTERVAL   = 5000;
const SWIPE_THRESHOLD = 50;

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

export default function RealResultsSection() {
  const width    = useWindowWidth();
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 900;
  const isStacked = isMobile || isTablet;
  const cardsPerView = isMobile ? 1 : isTablet ? 2 : 3;

  /* on mobile/tablet we slide one card at a time; on desktop we slide in groups of 3 */
  const slideCountMobile = cards.length - cardsPerView + 1;

  const [slide, setSlide]   = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef            = useRef(null);

  // swipe tracking
  const touchStartX = useRef(null);
  const touchDeltaX  = useRef(0);
  const isDragging   = useRef(false);

  const goTo = useCallback((idx) => setSlide(idx), []);

  const goNext = useCallback(() => {
    if (isStacked) {
      setSlide(prev => (prev + 1) % slideCountMobile);
    } else {
      setSlide(prev => (prev + 1) % SLIDE_COUNT);
    }
  }, [isStacked, slideCountMobile]);

  const goPrev = useCallback(() => {
    if (isStacked) {
      setSlide(prev => (prev - 1 + slideCountMobile) % slideCountMobile);
    } else {
      setSlide(prev => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
    }
  }, [isStacked, slideCountMobile]);

  /* reset slide index when breakpoint changes to avoid out-of-range index */
  useEffect(() => {
    setSlide(0);
  }, [isStacked, cardsPerView]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      if (isStacked) {
        setSlide(prev => (prev + 1) % slideCountMobile);
      } else {
        setSlide(prev => (prev + 1) % SLIDE_COUNT);
      }
    }, AUTO_INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [slide, paused, isStacked, slideCountMobile]);

  /* ── Touch handlers (mobile) ── */
  const handleTouchStart = (e) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) {
      if (touchDeltaX.current < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setPaused(false);
  };

  /* ── Mouse drag handlers (desktop trackpad/mouse) ── */
  const handleMouseDown = (e) => {
    isDragging.current = true;
    setPaused(true);
    touchStartX.current = e.clientX;
    touchDeltaX.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || touchStartX.current === null) return;
    touchDeltaX.current = e.clientX - touchStartX.current;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) {
      if (touchDeltaX.current < 0) goNext();
      else goPrev();
    }
    isDragging.current = false;
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setPaused(false);
  };

  const visible = isStacked
    ? cards.slice(slide, slide + cardsPerView)
    : cards.slice(slide * 3, slide * 3 + 3);

  const dotCount = isStacked ? slideCountMobile : SLIDE_COUNT;

  return (
    <section style={{
      width: "100%",
      background: "#ffffff",
      padding: "56px 48px 48px",
      fontFamily: "Roobert Font Family, Sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <h2 style={{
          fontSize: "clamp(28px,4vw,48px)",
          fontWeight: 900,
          fontFamily: "Roobert Font Family, Sans-serif",
          letterSpacing: "-0.04em",
          color: "#000000",
          margin: "0 0 40px",
          textAlign: "left",
        }}>
          Real teams. Real results.
        </h2>

        {/* Cards — swipeable */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); isDragging.current = false; }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMoveCapture={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            cursor: "grab",
            userSelect: "none",
            touchAction: "pan-y",
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: isStacked ? `repeat(${cardsPerView}, 1fr)` : "repeat(3,1fr)",
            gap: 18, marginTop: 30,
            alignItems: "stretch",
          }}>
            {visible.map((c, i) => (
              <Card key={`${slide}-${i}`} card={c} />
            ))}
          </div>

          {/* dot indicators */}
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 8, marginTop: 24, marginBottom: 0,
          }}>
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width:  i === slide ? 24 : 8,
                  height: 8,
                  borderRadius: 100,
                  background: i === slide ? "#000000" : "#d1d5db",
                  border: "none", cursor: "pointer", padding: 0,
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 580px) {
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
      minHeight: 320,
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
          color: "#000000",
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
        color: "#000000",
        margin: "0 0 6px",
        letterSpacing: "-0.02em",
        textAlign: "left",
      }}>
        {card.name}
      </p>
      <p style={{
        fontSize: 18,
        color: "#000000",
        lineHeight: 1.6,
        margin: "8px 0 10px",
        textAlign: "left",
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
            <span style={{ fontSize: 16, color: "#000000" }}>{s.label}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#000000" }}>{s.value}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
