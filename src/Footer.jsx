import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logoImg from "./assets/BB_Logo_2.png";

const socialLinks = [
  { Icon: FaFacebookF,  href: "https://www.facebook.com/Brandingbeezuk",                                label: "Facebook"  },
  { Icon: FaXTwitter,   href: "#",                                                                        label: "X"         },
  { Icon: FaInstagram,  href: "https://www.instagram.com/brandingbeez/?igsh=ZHY0eGtvY2p3bm5p",         label: "Instagram" },
  { Icon: FaYoutube,    href: "https://www.youtube.com/@brandingbeez.official",                          label: "YouTube"   },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/brandingbeez/",                          label: "LinkedIn"  },
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

export default function FooterSection() {
  const width    = useWindowWidth();
  const isMobile = width < 600;

  return (
    <footer style={{ background: "#1B0B3B", width: "100%", padding: "22px 40px" }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}>

        {/* Logo */}
        <div>
          <img
            src={logoImg}
            alt="Branding Beez"
            style={{ height: "42px", objectFit: "contain" }}
          />
        </div>

        {/* Center Links */}
        <div style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "15px", fontWeight: 400 }}>
            Privacy Policy
          </a>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "15px", fontWeight: 400 }}>
            Terms of Service
          </a>
        </div>

        {/* Right Side */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
          <span style={{
            color: "#FFFFFF",
            fontSize: isMobile ? "12px" : "14px",
            textAlign: isMobile ? "left" : "left", /* always left, was centered on mobile due to flexWrap */
            width: "100%",
          }}>
            © Copyright BrandingBeez 2026 - All rights reserved
          </span>

          <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: "#fff", display: "flex", alignItems: "center", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
