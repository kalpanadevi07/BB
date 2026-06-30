// BuildTeamForm.jsx
import { useState } from "react";
import axios from "axios";

export default function BuildTeamForm({ onBack, selectedCounts, monthly }) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });

  const selectedRoles = selectedCounts
    ? Object.entries(selectedCounts)
        .filter(([, v]) => v > 0)
        .map(([id]) => {
          const map = {
            seo: "SEO", web: "Web Dev", ads: "Google Ads",
            dev: "Full-Stack", design: "Designer", video: "Video Editor",
          };
          return map[id];
        })
    : [];

  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState("");

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = true;
    if (!form.email.trim())    e.email    = true;
    if (!form.phone.trim())    e.phone    = true;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setSubmitted(true);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    setApiError("");

    try {
      await axios.post("http://localhost:5000/api/leads", {
        fullName:  form.fullName,
        email:     form.email,
        phone:     form.phone,
        roles:     selectedRoles,
        workTypes: ["Full-time"],
      });
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Submission failed. Please try again.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ── */
  if (success) {
    return (
      <div style={{
       minHeight: "auto", width: "100%",
background: "linear-gradient(135deg,#1a1340 0%,#251855 60%,#2a1a50 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        padding: "40px 20px", boxSizing: "border-box",
      }}>
        <div style={{
          background: "#ffffff", borderRadius: 20,
          padding: "48px 40px", maxWidth: 480, width: "100%",
          textAlign: "center", boxShadow: "0 24px 64px rgba(0,0,0,0.30)",
        }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
          <h2 style={{
            fontSize: 26, fontWeight: 900, color: "#0d0d0d",
            fontFamily: "'Sora',sans-serif", marginBottom: 12,
            letterSpacing: "-0.03em",
          }}>
            We'll be in touch!
          </h2>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, marginBottom: 28 }}>
            Our team will review your requirements and reach out within 24 hours.
            Check your inbox — a confirmation email is on its way.
          </p>

          {selectedRoles.length > 0 && (
            <div style={{
              background: "#f8f7ff", border: "1.5px solid #e0dcea",
              borderRadius: 12, padding: "14px 20px", marginBottom: 16,
              textAlign: "left",
            }}>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Roles requested
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {selectedRoles.map(r => (
                  <span key={r} style={{
                    background: "#1a1340", color: "#fff",
                    fontSize: 12, fontWeight: 600,
                    padding: "4px 12px", borderRadius: 50,
                  }}>{r}</span>
                ))}
              </div>
            </div>
          )}

          {monthly > 0 && (
            <div style={{
              background: "#fff8ed", border: "1.5px solid #f5a623",
              borderRadius: 12, padding: "14px 20px", marginBottom: 28,
            }}>
              <p style={{ fontSize: 13, color: "#92400e", margin: "0 0 4px", fontWeight: 600 }}>
                Your estimated monthly total
              </p>
              <p style={{ fontSize: 32, fontWeight: 900, color: "#f5a623", margin: 0, letterSpacing: "-0.05em" }}>
                £{monthly.toLocaleString()}/mo
              </p>
            </div>
          )}

          <button
            onClick={onBack}
            style={{
              background: "#1a1340", color: "#fff",
              fontSize: 14, fontWeight: 700, padding: "13px 32px",
              borderRadius: 50, border: "none", cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#2d2569"}
            onMouseLeave={e => e.currentTarget.style.background = "#1a1340"}
          >
            ← Back to team builder
          </button>
        </div>
      </div>
    );
  }

  const errMsg = (
    <span style={{ color: "#dc2626", fontSize: 11.5, marginTop: 3, display: "block", textAlign: "left" }}>
      Please complete this required field.
    </span>
  );

  /* ── Form ── */
  return (
    <div style={{
     minHeight: "auto", width: "100%",
background: "linear-gradient(135deg,#1a1340 0%,#251855 60%,#2a1a50 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      padding: "12px 20px", boxSizing: "border-box",
      position: "relative", overflow: "hidden",
    }}>

      {/* bg blobs */}
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "#7c3aed", filter: "blur(90px)", opacity: 0.15,
        top: -100, left: -100, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "#f5a623", filter: "blur(90px)", opacity: 0.08,
        bottom: 0, right: 0, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 520, width: "100%", position: "relative", zIndex: 1 }}>

        {/* back button */}
        <button
          onClick={onBack}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff", borderRadius: 50,
            padding: "8px 18px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", marginBottom: 15,
            fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.10)"}
        >
          ← Back
        </button>

        {/* card */}
        <div style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: "18px 36px 18px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.32)",
        }}>

          <h2 style={{
            fontSize: 26, fontWeight: 900, color: "#0d0d0d",
            fontFamily: "'Sora',sans-serif", margin: "0 0 6px",
            letterSpacing: "-0.03em",
          }}>
            Build your team
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 16px", lineHeight: 1.6 }}>
            Tell us what you need. We'll reach out within 24 hours.
          </p>

          {/* selected roles — read only */}
          {selectedRoles.length > 0 && (
            <div style={{
              background: "#f8f7ff", border: "1px solid #e0dcea",
              borderRadius: 10, padding: "12px 14px", marginBottom: 14,
            }}>
              <p style={{
                fontSize: 11, fontWeight: 700, color: "#9e9bc0",
                textTransform: "uppercase", letterSpacing: "0.07em",
                margin: "0 0 8px",
              }}>
                Your selected roles
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {selectedRoles.map(r => (
                  <span key={r} style={{
                    background: "#1a1340", color: "#ffffff",
                    fontSize: 12, fontWeight: 600,
                    padding: "4px 12px", borderRadius: 50,
                  }}>{r}</span>
                ))}
              </div>
            </div>
          )}

          {/* estimated total badge */}
          {monthly > 0 && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff8ed", border: "1.5px solid #f5a623",
              borderRadius: 50, padding: "5px 14px", marginBottom: 14,
            }}>
              <span style={{ fontSize: 12, color: "#92400e", fontWeight: 600 }}>
                Estimated total:
              </span>
              <span style={{ fontSize: 14, fontWeight: 900, color: "#f5a623", letterSpacing: "-0.03em" }}>
                £{monthly.toLocaleString()}/mo
              </span>
            </div>
          )}

          {/* Full name */}
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>
              Full name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              value={form.fullName}
              onChange={e => {
                setForm(p => ({ ...p, fullName: e.target.value }));
                if (submitted) setErrors(p => ({ ...p, fullName: !e.target.value.trim() }));
              }}
              style={{
                ...inp,
                backgroundColor: "#ffffff",
                borderColor: submitted && errors.fullName ? "#dc2626" : "#d1d5db",
              }}
              onFocus={e => e.target.style.borderColor = submitted && errors.fullName ? "#dc2626" : "#1a1340"}
              onBlur={e  => e.target.style.borderColor = submitted && errors.fullName ? "#dc2626" : "#d1d5db"}
            />
            {submitted && errors.fullName && errMsg}
          </div>

          {/* Company email */}
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>
              Company email <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={e => {
                setForm(p => ({ ...p, email: e.target.value }));
                if (submitted) setErrors(p => ({ ...p, email: !e.target.value.trim() }));
              }}
              style={{
                ...inp,
                backgroundColor: "#ffffff",
                borderColor: submitted && errors.email ? "#dc2626" : "#d1d5db",
              }}
              onFocus={e => e.target.style.borderColor = submitted && errors.email ? "#dc2626" : "#1a1340"}
              onBlur={e  => e.target.style.borderColor = submitted && errors.email ? "#dc2626" : "#d1d5db"}
            />
            {submitted && errors.email && errMsg}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>
              Phone number <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="tel"
              placeholder="+44 7700 900000"
              value={form.phone}
              onChange={e => {
                setForm(p => ({ ...p, phone: e.target.value }));
                if (submitted) setErrors(p => ({ ...p, phone: !e.target.value.trim() }));
              }}
              style={{
                ...inp,
                backgroundColor: "#ffffff",
                borderColor: submitted && errors.phone ? "#dc2626" : "#d1d5db",
              }}
              onFocus={e => e.target.style.borderColor = submitted && errors.phone ? "#dc2626" : "#1a1340"}
              onBlur={e  => e.target.style.borderColor = submitted && errors.phone ? "#dc2626" : "#d1d5db"}
            />
            {submitted && errors.phone && errMsg}
          </div>

          {/* API error */}
          {apiError && (
            <div style={{
              background: "#fef2f2", border: "1.5px solid #fca5a5",
              borderRadius: 10, padding: "10px 14px", marginBottom: 14,
              fontSize: 13, color: "#dc2626", fontWeight: 500,
            }}>
              {apiError}
            </div>
          )}

          {/* Submit — slide-up effect */}
          <SubmitRequirementsButton onClick={handleSubmit} loading={loading} />

          <p style={{
            fontSize: 11.5, color: "#9ca3af",
            textAlign: "center", margin: "10px 0 0", lineHeight: 1.6,
          }}>
            By submitting, you agree to be contacted about our services per our<br/>{" "}
            <a href="#" style={{ color: "#6b7280", textDecoration: "underline" }}>
              Privacy Policy & Terms
            </a>.
          </p>

        </div>
      </div>

      {/* ← global style to override any browser/OS dark mode input styling */}
      <style>{`
        input {
          background-color: #ffffff !important;
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
        }
        input::placeholder {
          color: #9ca3af !important;
          -webkit-text-fill-color: #9ca3af !important;
          opacity: 1;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
          -webkit-text-fill-color: #111827 !important;
          background-color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}

/* ══ Submit button — slide-up hover effect ══ */
function SubmitRequirementsButton({ onClick, loading }) {
  const [hov, setHov] = useState(false);
  const label = loading ? "Submitting…" : "Submit my requirements";

  return (
    <button
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => !loading && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", height: "48px",
        background: loading ? "#9ca3af" : (hov ? "#f5a623" : "#28174f"),
        color: loading ? "#ffffff" : (hov ? "#28174f" : "#ffffff"),
        fontSize: 15, fontWeight: 700, borderRadius: 50,
        border: "none", cursor: loading ? "default" : "pointer",
        fontFamily: "'DM Sans',sans-serif",
        transition: "background 0.2s, transform 0.2s",
        letterSpacing: "-0.01em",
        position: "relative", overflow: "hidden",
        transform: hov && !loading ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: 15,
        transform: hov && !loading ? "translateY(-100%)" : "translateY(0%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        whiteSpace: "nowrap", fontWeight: 700, fontSize: 15,
        transform: hov && !loading ? "translateY(0%)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>{label}</span>

      <span style={{ visibility: "hidden", fontWeight: 700, fontSize: 15 }}>{label}</span>
    </button>
  );
}

const lbl = {
  display: "block", fontSize: 13, fontWeight: 600,
  color: "#374151", marginBottom: 5,
  textAlign: "left", fontFamily: "'DM Sans',sans-serif",
};

const inp = {
  width: "100%",
  padding: "10px 13px",
  border: "1.5px solid #d1d5db",
  borderRadius: 10,
  fontSize: 14,
  color: "#111827",
  backgroundColor: "#ffffff",
  fontFamily: "'DM Sans',sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  WebkitAppearance: "none",
  appearance: "none",
};