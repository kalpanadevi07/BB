// ─────────────────────────────────────────────────────────────────
//  LogoMarqueeSection.jsx
// ─────────────────────────────────────────────────────────────────

import logo1 from "./assets/logo-1.png";
import logo2 from "./assets/logo-2.png";
import logo3 from "./assets/logo-3.png";
import logo4 from "./assets/logo-4.png";
import logo5 from "./assets/logo-5.png";
import logo6 from "./assets/logo-6.png";
import logo7 from "./assets/logo-7.png";
import logo8 from "./assets/logo-8.png";

const logos = [
  { src: logo1, alt: "The Economist" },
  { src: logo2, alt: "Darwinbox"     },
  { src: logo3, alt: "SoFi"          },
  { src: logo4, alt: "Rightship"     },
  { src: logo5, alt: "PwC"           },
  { src: logo6, alt: "Korn Ferry"    },
  { src: logo7, alt: "Eposnow"       },
  { src: logo8, alt: "Partner 8"     },
];

/* duplicate once so the loop looks seamless */
const track = [...logos, ...logos, ...logos, ...logos];

export default function LogoMarqueeSection() {
  return (
    <>
      <section className="logo-marquee-section" style={{
        width: "100%",
        background: "#ffffff",
        borderTop: "1px solid #f0eef8",
        borderBottom: "0px solid #f0eef8",
        padding: "24px 0",
        overflow: "hidden",
        fontFamily: "Roobert Font Family, Sans-serif",
        marginbottom: 0,
      }}>
        {/* scrolling track */}
        <div className="marquee-track"
         style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 60s linear infinite",
        }}>
          {track.map((logo, i) => (
            <div key={i} className="logo-item" style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 90px",
              height: 56,
            }}>
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: 56,
                  width: "auto",
                  maxWidth: 150,
                  objectFit: "contain",
                  filter: "opacity(0.85)",
                  transition: "filter 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = "opacity(1)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "opacity(0.85)")}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* keyframe + mobile-only overrides */}
      <style>{`
  .marquee-track:hover {
    animation-play-state: paused;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-25%);
    }
  }

  /* ── Mobile-only spacing reduction ── */
  @media (max-width: 640px) {
    .logo-marquee-section {
      padding: 12px 0 !important;
    }
    .logo-item {
      padding: 0 28px !important;
      height: 36px !important;
    }
    .logo-item img {
      height: 36px !important;
      max-width: 100px !important;
    }
  }
`}</style>
    </>
  );
}