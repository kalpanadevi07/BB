import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function FooterSection() {
    return (
        <footer
            style={{
                background: "#1B0B3B",
                width: "100%",
                padding: "22px 40px",
            }}
        >
            <div
                style={{
                    maxWidth: "1120px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "right",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex-direction: column",
                        alignItems: "right",
                        gap: "20px",
                    }}
                >
                    <img
                       src="/src/assets/BB_Logo_2.png"
                        alt="Branding Beez"
                        style={{
                            height: "42px",
                            objectFit: "right",
                        }}
                    />
                </div>

                {/* Center Links */}
                <div
                    style={{
                        display: "flex",
                        gap: "40px",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <a
                        href="#"
                        style={{
                            color: "#FFFFFF",
                            textDecoration: "none",
                            fontSize: "15px",
                            fontWeight: 400,
                        }}
                    >
                        Privacy Policy
                    </a>

                    <a
                        href="#"
                        style={{
                            color: "#FFFFFF",
                            textDecoration: "none",
                            fontSize: "15px",
                            fontWeight: 400,
                        }}
                    >
                        Terms of Service
                    </a>
                </div>

                {/* Right Side */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        gap: "12px",
                    }}
                >
                    <span
                        style={{
                            color: "#FFFFFF",
                            fontSize: "14px",
                        }}
                    >
                        © Copyright BrandingBeez 2026 - All rights reserved
                    </span>

                    <div
                        style={{
                            display: "flex",
                            gap: "18px",
                        }}
                    >
                        <FaFacebookF size={18} color="#fff" />

                        <FaXTwitter size={18} color="#fff" />
                        <FaInstagram size={18} color="#fff" />
                        <FaYoutube size={18} color="#fff" />
                        <FaLinkedinIn size={18} color="#fff" />
                    </div>
                </div>
            </div>
        </footer>
    );
}