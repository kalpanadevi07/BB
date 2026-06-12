// ─────────────────────────────────────────────────────────────────
//  LogoMarqueeSection.jsx
//
//  Copy your logo PNGs into src/assets/ like this:
//    src/assets/logo-1.png   (The Economist)
//    src/assets/logo-2.png   (Darwinbox)
//    src/assets/logo-3.png   (SoFi)
//    src/assets/logo-4.png   (Rightship)
//    src/assets/logo-5.png   (PwC)
//    src/assets/logo-6.png   (Korn Ferry)
//    src/assets/logo-7.png   (Eposnow)
//    src/assets/logo-8.png   (add as many as you have)
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
      <section style={{
        width: "100%",
        background: "#ffffff",
        borderTop: "1px solid #f0eef8",
        borderBottom: "0px solid #f0eef8",
        padding: "24px 0",
        overflow: "hidden",
        fontFamily: "Roobert Font Family, Sans-serif",
      }}>
        {/* scrolling track */}
        <div className="marquee-track"
         style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 60s linear infinite",
        }}>
          {track.map((logo, i) => (
            <div key={i} style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 70px",
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

      {/* keyframe in a <style> tag — no CSS file needed */}
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
`}</style>
    </>
  );
}