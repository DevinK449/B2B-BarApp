import { useState, useEffect, useRef } from "react";

// ── Luxury dark-gold palette ───────────────────────────────────────────────
const T = {
  void:     "#080706",
  obsidian: "#0F0D0A",
  ink:      "#181410",
  charcoal: "#221E18",
  gold:     "#C9A84C",
  goldHi:   "#E8C96A",
  goldDim:  "rgba(201,168,76,0.14)",
  goldBdr:  "rgba(201,168,76,0.32)",
  goldGlow: "rgba(201,168,76,0.22)",
  cream:    "#F5EDD8",
  text:     "#EDE6D6",
  muted:    "rgba(237,230,214,0.48)",
  faint:    "rgba(237,230,214,0.2)",
  ghost:    "rgba(237,230,214,0.06)",
  border:   "rgba(237,230,214,0.08)",
  green:    "#2AAD74",
  greenDim: "rgba(42,173,116,0.12)",
};

const FEATURES_FREE = [
  "Browse bars near you",
  "See live vibe scores",
  "Submit ratings",
  "Basic friend activity",
  "Group planning (up to 4 bars)",
];

const FEATURES_PRO = [
  { icon: "📈", label: "30-day bar history", desc: "See patterns beyond tonight" },
  { icon: "🔮", label: "Cover charge predictions", desc: "Know before you leave the house" },
  { icon: "⚡", label: "Real-time alerts", desc: "Line drops, cover changes, specials" },
  { icon: "🎟", label: "VIP bar specials", desc: "Deals only Pro users can unlock" },
  { icon: "👑", label: "Priority in group votes", desc: "Your vote counts 2x" },
  { icon: "🗓", label: "Full rating history export", desc: "Download your complete history" },
  { icon: "🤝", label: "Early access to new features", desc: "First to get everything new" },
  { icon: "🚫", label: "Ad-free experience", desc: "No promotions, ever" },
];

const TESTIMONIALS = [
  { name: "Jake R.", text: "The cover predictions alone paid for it on my first weekend. Saved $30.", stars: 5 },
  { name: "Mia T.", text: "Real-time alerts changed everything. Got notified the line dropped and walked right in.", stars: 5 },
  { name: "Chris B.", text: "VIP specials are insane. Got 2-for-1 at Craft & Crown on a Friday.", stars: 5 },
];

// ── Shared ─────────────────────────────────────────────────────────────────
const GoldBtn = ({ label, onClick, full, disabled, sub }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: full ? "100%" : "auto",
    padding: sub ? "10px 24px" : "14px 28px",
    borderRadius: 14,
    background: disabled ? "rgba(201,168,76,0.2)" : `linear-gradient(135deg, ${T.goldHi} 0%, ${T.gold} 60%, #A8782A 100%)`,
    color: disabled ? T.faint : "#1A1200",
    border: "none", fontSize: sub ? 13 : 16, fontWeight: 800,
    fontFamily: "'Playfair Display', 'Georgia', serif",
    cursor: disabled ? "default" : "pointer",
    boxShadow: disabled ? "none" : `0 0 32px ${T.goldGlow}, 0 4px 16px rgba(0,0,0,0.4)`,
    letterSpacing: "0.02em", transition: "all 0.25s",
    transform: "translateZ(0)",
  }}>{label}</button>
);

const GhostBtn = ({ label, onClick, full }) => (
  <button onClick={onClick} style={{
    width: full ? "100%" : "auto",
    padding: "12px 24px", borderRadius: 14,
    background: "transparent", color: T.muted,
    border: `1px solid ${T.border}`, fontSize: 14,
    fontFamily: "system-ui", cursor: "pointer",
    transition: "all 0.2s",
  }}>{label}</button>
);

// Shimmer line
const Shimmer = ({ width = "100%", height = 1, style = {} }) => (
  <div style={{
    width, height, background: `linear-gradient(90deg, transparent 0%, ${T.goldBdr} 50%, transparent 100%)`,
    ...style,
  }} />
);

// Gold star
const Stars = ({ n }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} style={{ color: T.gold, fontSize: 11 }}>★</span>
    ))}
  </div>
);

// Crown SVG
const Crown = ({ size = 32, color = T.gold }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M4 24h24M6 24L4 10l6 6 6-8 6 8 6-6-2 14z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
    <circle cx="4" cy="10" r="2" fill={color}/>
    <circle cx="16" cy="8" r="2" fill={color}/>
    <circle cx="28" cy="10" r="2" fill={color}/>
  </svg>
);

// ── Animated background ────────────────────────────────────────────────────
const GoldDust = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
    {Array.from({ length: 22 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        width: i % 4 === 0 ? 2 : 1,
        height: i % 4 === 0 ? 2 : 1,
        borderRadius: "50%",
        background: T.gold,
        opacity: 0.12 + (i % 5) * 0.06,
        top: `${5 + (i * 43) % 90}%`,
        left: `${4 + (i * 67) % 92}%`,
        animation: `dust ${4 + (i % 4)}s ease-in-out ${i * 0.25}s infinite alternate`,
      }} />
    ))}
    <style>{`@keyframes dust{from{opacity:0.1;transform:translateY(0)}to{opacity:0.5;transform:translateY(-8px)}}`}</style>
  </div>
);

// ── SCREEN 1: Feature gate ─────────────────────────────────────────────────
function FeatureGate({ feature = "30-day bar history", onUpgrade, onDismiss }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 60); }, []);

  return (
    <div style={{
      textAlign: "center", padding: "32px 24px 28px",
      position: "relative", overflow: "hidden",
    }}>
      <GoldDust />
      <div style={{
        position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
        width: 280, height: 280, borderRadius: "50%",
        background: `radial-gradient(circle, ${T.goldGlow} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.94)",
        transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        position: "relative", zIndex: 1,
      }}>
        {/* Lock icon */}
        <div style={{ width: 72, height: 72, borderRadius: 20, background: T.goldDim, border: `1.5px solid ${T.goldBdr}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: `0 0 40px ${T.goldGlow}` }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect x="5" y="13" width="20" height="14" rx="4" stroke={T.gold} strokeWidth="1.8" fill={T.goldDim}/>
            <path d="M9 13V10a6 6 0 0112 0v3" stroke={T.gold} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <circle cx="15" cy="20" r="2" fill={T.gold}/>
            <line x1="15" y1="22" x2="15" y2="25" stroke={T.gold} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>

        <div style={{ fontSize: 11, color: T.gold, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "system-ui", marginBottom: 12 }}>
          Pro feature
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: T.text, fontFamily: "'Playfair Display', 'Georgia', serif", lineHeight: 1.2, marginBottom: 10 }}>
          {feature} is<br />a Pro exclusive
        </div>
        <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.7, marginBottom: 24, maxWidth: 280, margin: "0 auto 24px" }}>
          Upgrade to Barbuddy Pro to unlock this and every other premium feature. Starting at $4.99/month.
        </div>

        {/* Mini feature list */}
        <div style={{ background: T.ghost, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 24, textAlign: "left" }}>
          {FEATURES_PRO.slice(0, 4).map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
              <span style={{ fontSize: 15 }}>{f.icon}</span>
              <span style={{ fontSize: 13, color: T.muted }}>{f.label}</span>
              <svg style={{ marginLeft: "auto" }} width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6l2.5 2.5 4-4" stroke={T.gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
          <div style={{ fontSize: 11, color: T.gold, textAlign: "center", marginTop: 10 }}>+ 4 more Pro features</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <GoldBtn label="Unlock Pro — from $4.99/mo" onClick={onUpgrade} full />
          <GhostBtn label="Maybe later" onClick={onDismiss} full />
        </div>
        <div style={{ fontSize: 11, color: T.faint, marginTop: 14 }}>Cancel anytime · No commitment</div>
      </div>
    </div>
  );
}

// ── SCREEN 2: Upgrade page ─────────────────────────────────────────────────
function UpgradePage({ onSelect, onBack }) {
  const [plan, setPlan] = useState("yearly");
  const [vis, setVis] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  const plans = {
    monthly: { price: "$4.99", period: "per month", total: "$4.99/mo", save: null, badge: null },
    yearly: { price: "$2.99", period: "per month", total: "$35.99/yr", save: "Save 40%", badge: "Best value" },
  };

  const current = plans[plan];

  return (
    <div style={{ overflowY: "auto", maxHeight: 580, position: "relative" }}>
      <GoldDust />

      {/* Hero */}
      <div style={{
        padding: "28px 24px 24px", textAlign: "center", position: "relative",
        background: `linear-gradient(180deg, #14100A 0%, ${T.obsidian} 100%)`,
      }}>
        <div style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", width: 300, height: 200, background: `radial-gradient(ellipse, ${T.goldGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, background: T.ghost, border: `1px solid ${T.border}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, color: T.muted, cursor: "pointer", fontFamily: "system-ui" }}>← Back</button>

        <div style={{
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.5s ease", position: "relative", zIndex: 1,
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg, ${T.goldHi}22, ${T.goldDim})`, border: `1.5px solid ${T.goldBdr}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${T.goldGlow}` }}>
              <Crown size={34} />
            </div>
          </div>
          <div style={{ fontSize: 11, color: T.gold, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "system-ui", marginBottom: 10 }}>Barbuddy Pro</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: T.text, fontFamily: "'Playfair Display', 'Georgia', serif", lineHeight: 1.1, marginBottom: 10 }}>
            Your VIP pass<br />to the night
          </div>
          <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.7 }}>
            Everything in free, plus the tools that<br />actually change your night out.
          </div>
        </div>
      </div>

      <Shimmer />

      {/* Plan toggle */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ background: T.charcoal, border: `1px solid ${T.border}`, borderRadius: 14, padding: 4, display: "flex", marginBottom: 16, position: "relative" }}>
          {["monthly", "yearly"].map(p => (
            <button key={p} onClick={() => setPlan(p)} style={{
              flex: 1, padding: "10px 0", borderRadius: 11,
              background: plan === p ? `linear-gradient(135deg, ${T.goldHi}22, ${T.goldDim})` : "transparent",
              border: plan === p ? `1px solid ${T.goldBdr}` : "1px solid transparent",
              color: plan === p ? T.goldHi : T.muted,
              fontSize: 14, fontWeight: plan === p ? 700 : 400,
              cursor: "pointer", fontFamily: "system-ui", transition: "all 0.2s",
              textTransform: "capitalize", position: "relative",
            }}>
              {p === "yearly" ? "Annual" : "Monthly"}
              {p === "yearly" && (
                <span style={{ position: "absolute", top: -10, right: 8, background: T.gold, color: "#1A1000", fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 10, letterSpacing: "0.04em" }}>SAVE 40%</span>
              )}
            </button>
          ))}
        </div>

        {/* Price display */}
        <div style={{
          background: T.goldDim, border: `1.5px solid ${T.goldBdr}`,
          borderRadius: 18, padding: "20px 22px", marginBottom: 20,
          textAlign: "center", position: "relative", overflow: "hidden",
          boxShadow: `0 0 40px ${T.goldGlow}`,
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${T.goldGlow}, transparent 70%)` }} />
          <div style={{ fontSize: 11, color: T.gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10, fontFamily: "system-ui" }}>
            {plan === "yearly" ? "Best value — annual plan" : "Monthly plan"}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 2, marginBottom: 4 }}>
            <span style={{ fontSize: 22, color: T.gold, fontWeight: 700, marginTop: 8, fontFamily: "'Playfair Display', serif" }}>$</span>
            <span style={{ fontSize: 56, fontWeight: 800, color: T.goldHi, fontFamily: "'Playfair Display', 'Georgia', serif", lineHeight: 1 }}>
              {plan === "yearly" ? "2.99" : "4.99"}
            </span>
          </div>
          <div style={{ fontSize: 14, color: T.muted, marginBottom: plan === "yearly" ? 8 : 0 }}>per month</div>
          {plan === "yearly" && (
            <div style={{ fontSize: 12, color: T.gold, fontWeight: 600 }}>Billed as $35.99/year · Save $24</div>
          )}
        </div>

        {/* Feature list */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: T.faint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontFamily: "system-ui" }}>What you unlock</div>
          <div style={{ background: T.ink, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
            {FEATURES_PRO.map((f, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "13px 16px",
                  borderBottom: i < FEATURES_PRO.length - 1 ? `1px solid ${T.border}` : "none",
                  background: hoveredFeature === i ? T.goldDim : "transparent",
                  transition: "background 0.15s", cursor: "default",
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 1 }}>{f.label}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{f.desc}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="6" stroke={T.goldBdr} strokeWidth="1.2" fill={T.goldDim}/>
                  <path d="M4.5 7l2 2 3-3" stroke={T.gold} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison: Free vs Pro */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: T.faint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontFamily: "system-ui" }}>Free vs Pro</div>
          <div style={{ background: T.ink, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px", background: T.charcoal, padding: "10px 16px", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 11, color: T.faint }}>Feature</div>
              <div style={{ fontSize: 11, color: T.faint, textAlign: "center" }}>Free</div>
              <div style={{ fontSize: 11, color: T.gold, textAlign: "center", fontWeight: 700 }}>Pro</div>
            </div>
            {[
              ["Live bar ratings", true, true],
              ["Map & discovery", true, true],
              ["Friend activity", true, true],
              ["Group planning", true, true],
              ["30-day history", false, true],
              ["Cover predictions", false, true],
              ["Real-time alerts", false, true],
              ["VIP specials", false, true],
              ["Ad-free", false, true],
            ].map(([label, free, pro], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px", padding: "10px 16px", borderBottom: i < 8 ? `1px solid ${T.border}` : "none", background: !free && pro ? T.goldDim : "transparent" }}>
                <div style={{ fontSize: 12, color: !free && pro ? T.text : T.muted }}>{label}</div>
                <div style={{ textAlign: "center", fontSize: 14 }}>{free ? "✓" : <span style={{ color: T.faint, fontSize: 16 }}>–</span>}</div>
                <div style={{ textAlign: "center", fontSize: 14, color: T.gold }}>✓</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: T.faint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontFamily: "system-ui" }}>What Pro users say</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: T.ink, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <Stars n={t.stars} />
                </div>
                <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, marginBottom: 8, fontStyle: "italic" }}>"{t.text}"</div>
                <div style={{ fontSize: 11, color: T.faint }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginBottom: 12 }}>
          <GoldBtn label={`Start Pro — ${current.total}`} onClick={() => onSelect(plan)} full />
        </div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: T.faint, marginBottom: 4 }}>7-day free trial · Cancel anytime</div>
          <div style={{ fontSize: 11, color: T.faint }}>Manage subscription in Settings · No hidden fees</div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 3: Payment ──────────────────────────────────────────────────────
function PaymentScreen({ plan, onConfirm, onBack }) {
  const [method, setMethod] = useState("apple");
  const [processing, setProcessing] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const price = plan === "yearly" ? "$35.99/year" : "$4.99/month";
  const trial = "Free for 7 days, then";

  const handlePay = () => {
    if (method === "card" && (!cardNum || !expiry || !cvv)) return;
    setProcessing(true);
    setTimeout(() => { setProcessing(false); onConfirm(); }, 2200);
  };

  const fmtCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExpiry = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

  return (
    <div style={{ overflowY: "auto", maxHeight: 580, padding: "20px 20px 32px", position: "relative" }}>
      <GoldDust />

      <button onClick={onBack} style={{ background: T.ghost, border: `1px solid ${T.border}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, color: T.muted, cursor: "pointer", fontFamily: "system-ui", marginBottom: 20 }}>← Back</button>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Crown size={28} />
        <div style={{ fontSize: 22, fontWeight: 700, color: T.text, fontFamily: "'Playfair Display', 'Georgia', serif", marginTop: 10, marginBottom: 4 }}>Complete your upgrade</div>
        <div style={{ fontSize: 13, color: T.muted }}>{trial} <span style={{ color: T.gold, fontWeight: 600 }}>{price}</span></div>
      </div>

      {/* Order summary */}
      <div style={{ background: T.goldDim, border: `1px solid ${T.goldBdr}`, borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>Barbuddy Pro — {plan === "yearly" ? "Annual" : "Monthly"}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.gold }}>{plan === "yearly" ? "$35.99" : "$4.99"}</div>
        </div>
        <Shimmer style={{ marginBottom: 8 }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: T.muted }}>
          <span>7-day free trial</span>
          <span style={{ color: T.green, fontWeight: 600 }}>-{plan === "yearly" ? "$35.99" : "$4.99"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, color: T.text, marginTop: 8 }}>
          <span>Due today</span>
          <span style={{ color: T.green }}>$0.00</span>
        </div>
      </div>

      {/* Payment method */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: T.faint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontFamily: "system-ui" }}>Payment method</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {[
            { id: "apple", label: "🍎 Apple Pay" },
            { id: "google", label: "G Google Pay" },
            { id: "card", label: "💳 Card" },
          ].map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 11,
              border: `1px solid ${method === m.id ? T.goldBdr : T.border}`,
              background: method === m.id ? T.goldDim : T.ghost,
              color: method === m.id ? T.gold : T.muted,
              fontWeight: method === m.id ? 700 : 400,
              cursor: "pointer", fontFamily: "system-ui", transition: "all 0.18s",
            }}>{m.label}</button>
          ))}
        </div>

        {method === "card" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Card number", val: cardNum, set: v => setCardNum(fmtCard(v)), placeholder: "1234 5678 9012 3456", max: 19 },
            ].map((f, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, color: T.faint, marginBottom: 5, fontFamily: "system-ui" }}>{f.label}</div>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} maxLength={f.max}
                  style={{ width: "100%", padding: "12px 14px", background: T.ghost, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 15, color: T.text, fontFamily: "system-ui", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = T.goldBdr}
                  onBlur={e => e.target.style.borderColor = T.border}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "Expiry", val: expiry, set: v => setExpiry(fmtExpiry(v)), placeholder: "MM/YY", max: 5 },
                { label: "CVV", val: cvv, set: v => setCvv(v.replace(/\D/g,"").slice(0,3)), placeholder: "•••", max: 3 },
              ].map((f, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.faint, marginBottom: 5, fontFamily: "system-ui" }}>{f.label}</div>
                  <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} maxLength={f.max}
                    style={{ width: "100%", padding: "12px 14px", background: T.ghost, border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 15, color: T.text, fontFamily: "system-ui", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = T.goldBdr}
                    onBlur={e => e.target.style.borderColor = T.border}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {(method === "apple" || method === "google") && (
          <div style={{ background: T.ghost, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{method === "apple" ? "🍎" : "G"}</div>
            <div style={{ fontSize: 13, color: T.muted }}>Tap confirm to authenticate with {method === "apple" ? "Face ID / Touch ID" : "Google Pay"}</div>
          </div>
        )}
      </div>

      {/* Trust badges */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[["🔒", "Encrypted"], ["↩", "Cancel anytime"], ["📋", "No hidden fees"]].map(([icon, label], i) => (
          <div key={i} style={{ flex: 1, background: T.ghost, border: `1px solid ${T.border}`, borderRadius: 10, padding: "9px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
            <div style={{ fontSize: 10, color: T.faint }}>{label}</div>
          </div>
        ))}
      </div>

      {processing ? (
        <div style={{ textAlign: "center", padding: "14px 0" }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: T.gold, animation: `ppulse 1.2s ease ${i*0.2}s infinite alternate` }} />
            ))}
          </div>
          <div style={{ fontSize: 13, color: T.muted }}>Processing…</div>
          <style>{`@keyframes ppulse{from{opacity:0.2;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}`}</style>
        </div>
      ) : (
        <GoldBtn label="Start free trial →" onClick={handlePay} full
          disabled={method === "card" && (!cardNum || cardNum.length < 19 || !expiry || expiry.length < 5 || !cvv || cvv.length < 3)}
        />
      )}

      <div style={{ fontSize: 11, color: T.faint, textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>
        By confirming you agree to our Terms. You won't be charged until your trial ends on {new Date(Date.now() + 7*86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}.
      </div>
    </div>
  );
}

// ── SCREEN 4: Success ──────────────────────────────────────────────────────
function SuccessScreen({ onDone }) {
  const [vis, setVis] = useState(false);
  const [confetti, setConfetti] = useState([]);
  useEffect(() => {
    setTimeout(() => setVis(true), 100);
    setConfetti(Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      dur: 1.5 + Math.random(),
      size: 4 + Math.random() * 5,
      color: [T.gold, T.goldHi, T.cream, T.green][i % 4],
    })));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "40px 28px 36px", position: "relative", overflow: "hidden", minHeight: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Confetti */}
      {confetti.map((c, i) => (
        <div key={i} style={{
          position: "absolute", left: `${c.x}%`, top: -10,
          width: c.size, height: c.size, borderRadius: "50%",
          background: c.color, opacity: 0,
          animation: `fall ${c.dur}s ease ${c.delay}s forwards`,
        }} />
      ))}
      <style>{`@keyframes fall{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(600px) rotate(720deg)}}`}</style>

      <GoldDust />

      <div style={{ position: "relative", zIndex: 1, opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.85)", transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>
        {/* Crown glow */}
        <div style={{ width: 90, height: 90, borderRadius: 24, background: T.goldDim, border: `2px solid ${T.goldBdr}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: `0 0 60px ${T.goldGlow}` }}>
          <Crown size={46} color={T.goldHi} />
        </div>

        <div style={{ fontSize: 11, color: T.gold, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "system-ui", marginBottom: 12 }}>Welcome to the club</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: T.text, fontFamily: "'Playfair Display', 'Georgia', serif", lineHeight: 1.15, marginBottom: 12 }}>
          You're officially<br /><span style={{ color: T.goldHi }}>Barbuddy Pro</span>
        </div>
        <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.75, marginBottom: 32, maxWidth: 280, margin: "0 auto 32px" }}>
          Your 7-day free trial starts now. All Pro features are unlocked. Enjoy the night — you've earned it.
        </div>

        {/* Unlocked features */}
        <div style={{ background: T.goldDim, border: `1px solid ${T.goldBdr}`, borderRadius: 16, padding: "16px 18px", marginBottom: 28, textAlign: "left" }}>
          <div style={{ fontSize: 11, color: T.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontFamily: "system-ui" }}>Now unlocked for you</div>
          {FEATURES_PRO.slice(0, 4).map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 3 ? 10 : 0 }}>
              <span style={{ fontSize: 16 }}>{f.icon}</span>
              <span style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>{f.label}</span>
              <div style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          ))}
        </div>

        <GoldBtn label="Start exploring →" onClick={onDone} full />
        <div style={{ fontSize: 11, color: T.faint, marginTop: 14 }}>
          Trial ends {new Date(Date.now() + 7*86400000).toLocaleDateString("en-US", { month: "long", day: "numeric" })} · Manage in Settings
        </div>
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
const SCREENS = ["gate", "upgrade", "payment", "success"];

export default function ProUpgrade() {
  const [screen, setScreen] = useState("gate");
  const [plan, setPlan] = useState("yearly");
  const [prevScreen, setPrevScreen] = useState(null);

  const go = (s) => { setPrevScreen(screen); setScreen(s); };

  return (
    <div style={{
      fontFamily: "system-ui, sans-serif",
      background: T.obsidian,
      maxWidth: 390, margin: "0 auto",
      borderRadius: 24, border: `0.5px solid ${T.goldBdr}`,
      overflow: "hidden", minHeight: 600,
      boxShadow: `0 0 80px rgba(201,168,76,0.08)`,
    }}>

      {/* Top pill nav */}
      <div style={{ padding: "14px 16px 10px", background: T.ink, borderBottom: `1px solid ${T.border}`, display: "flex", gap: 6 }}>
        {[["gate","Gate"],["upgrade","Plans"],["payment","Pay"],["success","Done"]].map(([s, label], i) => {
          const idx = SCREENS.indexOf(s);
          const cur = SCREENS.indexOf(screen);
          return (
            <button key={s} onClick={() => go(s)} style={{
              flex: 1, padding: "6px 0", borderRadius: 20, fontSize: 10,
              border: `1px solid ${screen === s ? T.goldBdr : T.border}`,
              background: screen === s ? T.goldDim : "transparent",
              color: screen === s ? T.gold : idx <= cur ? T.muted : T.faint,
              fontWeight: screen === s ? 700 : 400,
              cursor: "pointer", fontFamily: "system-ui", transition: "all 0.15s",
            }}>{label}</button>
          );
        })}
      </div>

      {/* Screen content */}
      <div key={screen} style={{ animation: "fadeIn 0.25s ease both" }}>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        {screen === "gate"    && <FeatureGate onUpgrade={() => go("upgrade")} onDismiss={() => go("gate")} />}
        {screen === "upgrade" && <UpgradePage onSelect={p => { setPlan(p); go("payment"); }} onBack={() => go("gate")} />}
        {screen === "payment" && <PaymentScreen plan={plan} onConfirm={() => go("success")} onBack={() => go("upgrade")} />}
        {screen === "success" && <SuccessScreen onDone={() => go("gate")} />}
      </div>
    </div>
  );
}
