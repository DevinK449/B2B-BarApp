import { useState, useEffect, useRef } from "react";

// ── Design tokens ──────────────────────────────────────────────────────────
const T = {
  bg: "#0A0F0D",
  card: "#111916",
  green: "#1D9E75",
  greenLight: "#E1F5EE",
  greenMid: "#5DCAA5",
  greenDark: "#0F6E56",
  greenGlow: "rgba(29,158,117,0.18)",
  border: "rgba(255,255,255,0.08)",
  borderGreen: "rgba(93,202,165,0.35)",
  text: "#F0F4F2",
  muted: "rgba(240,244,242,0.5)",
  faint: "rgba(240,244,242,0.25)",
  amber: "#F0A500",
  red: "#E24B4A",
};

// ── Shared primitives ──────────────────────────────────────────────────────
const Pill = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "9px 18px", borderRadius: 30, fontSize: 14,
      border: `1px solid ${selected ? T.greenMid : T.border}`,
      background: selected ? T.greenGlow : "transparent",
      color: selected ? T.greenMid : T.muted,
      cursor: "pointer", fontFamily: "'Georgia', serif",
      transition: "all 0.2s", letterSpacing: "0.01em",
      transform: selected ? "scale(1.03)" : "scale(1)",
    }}
  >
    {label}
  </button>
);

const PrimaryBtn = ({ label, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: "100%", padding: "15px 0", borderRadius: 14,
      background: disabled ? "rgba(29,158,117,0.25)" : T.green,
      color: disabled ? T.faint : "#fff",
      border: "none", fontSize: 16, fontWeight: 600,
      fontFamily: "'Georgia', serif", cursor: disabled ? "default" : "pointer",
      letterSpacing: "0.02em", transition: "all 0.2s",
      boxShadow: disabled ? "none" : `0 0 24px rgba(29,158,117,0.35)`,
    }}
  >
    {label}
  </button>
);

const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{
      width: "100%", padding: "14px 16px",
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${T.border}`,
      borderRadius: 12, fontSize: 15, color: T.text,
      fontFamily: "'Georgia', serif", outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s",
    }}
    onFocus={e => e.target.style.borderColor = T.greenMid}
    onBlur={e => e.target.style.borderColor = T.border}
  />
);

// ── Progress dots ──────────────────────────────────────────────────────────
const Steps = ({ total, current }) => (
  <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 32 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        height: 4, borderRadius: 2,
        width: i === current ? 24 : 8,
        background: i <= current ? T.green : T.border,
        transition: "all 0.3s ease",
      }} />
    ))}
  </div>
);

// ── Logo mark ──────────────────────────────────────────────────────────────
const Logo = ({ size = 48 }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.28,
    background: `radial-gradient(135deg, #2DBF8C 0%, #0F6E56 100%)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: `0 0 28px rgba(29,158,117,0.4)`,
  }}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
      <path d="M4 18V10a4 4 0 014-4h8a4 4 0 014 4v8" stroke="#E1F5EE" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <path d="M1 18h22" stroke="#E1F5EE" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="12" cy="11" r="2" fill="#E1F5EE" opacity="0.8"/>
    </svg>
  </div>
);

// ── Animated background ────────────────────────────────────────────────────
const NightBg = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
    <div style={{
      position: "absolute", top: -80, right: -60, width: 320, height: 320,
      borderRadius: "50%", background: "radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%)",
    }} />
    <div style={{
      position: "absolute", bottom: -60, left: -40, width: 240, height: 240,
      borderRadius: "50%", background: "radial-gradient(circle, rgba(93,202,165,0.08) 0%, transparent 70%)",
    }} />
    {[...Array(18)].map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        width: i % 3 === 0 ? 2 : 1.5,
        height: i % 3 === 0 ? 2 : 1.5,
        borderRadius: "50%",
        background: `rgba(93,202,165,${0.2 + (i % 4) * 0.1})`,
        top: `${8 + (i * 47) % 85}%`,
        left: `${5 + (i * 61) % 90}%`,
        animation: `twinkle ${2 + (i % 3)}s ease-in-out ${i * 0.3}s infinite alternate`,
      }} />
    ))}
    <style>{`@keyframes twinkle { from { opacity: 0.2; } to { opacity: 1; } }`}</style>
  </div>
);

// ── STEP 0: Splash ─────────────────────────────────────────────────────────
function Splash({ onNext }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 580, textAlign: "center", padding: "0 24px" }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <Logo size={72} />
        <div>
          <div style={{ fontSize: 38, fontWeight: 700, color: T.text, fontFamily: "'Georgia', serif", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Barbuddy
          </div>
          <div style={{ fontSize: 15, color: T.muted, marginTop: 8, letterSpacing: "0.04em" }}>
            The live pulse of your night out
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 280, marginTop: 16 }}>
          {[
            "🗺  Live bar conditions near you",
            "⭐  Community-powered ratings",
            "👥  See where friends are tonight",
          ].map((f, i) => (
            <div key={i} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-12px)",
              transition: `all 0.5s ease ${0.2 + i * 0.12}s`,
              fontSize: 14, color: T.muted, textAlign: "left",
              padding: "10px 14px",
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${T.border}`, borderRadius: 10,
            }}>{f}</div>
          ))}
        </div>
        <div style={{ width: "100%", maxWidth: 280, marginTop: 8, opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }}>
          <PrimaryBtn label="Get started →" onClick={onNext} />
          <div style={{ fontSize: 12, color: T.faint, marginTop: 12 }}>
            Must be 21+ to use Barbuddy
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STEP 1: Age gate ───────────────────────────────────────────────────────
function AgeGate({ onNext, onFail }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const check = () => {
    const dob = new Date(`${year}-${month}-${day}`);
    const age = (Date.now() - dob) / (365.25 * 24 * 3600 * 1000);
    if (isNaN(age)) { setError("Please enter a valid date."); return; }
    if (age < 21) { onFail(); return; }
    onNext();
  };

  const ready = month && day && year.length === 4;

  return (
    <div style={{ padding: "0 24px" }}>
      <Steps total={6} current={1} />
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: T.text, fontFamily: "'Georgia', serif", marginBottom: 8 }}>
          Quick check 🔞
        </div>
        <div style={{ fontSize: 14, color: T.muted }}>You must be 21 or older to use Barbuddy</div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
        <input placeholder="MM" value={month} onChange={e => setMonth(e.target.value.slice(0,2))} maxLength={2}
          style={{ flex: 1, padding: "14px 0", textAlign: "center", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 12, fontSize: 20, color: T.text, fontFamily: "'Georgia', serif", outline: "none" }}
          onFocus={e => e.target.style.borderColor = T.greenMid} onBlur={e => e.target.style.borderColor = T.border} />
        <input placeholder="DD" value={day} onChange={e => setDay(e.target.value.slice(0,2))} maxLength={2}
          style={{ flex: 1, padding: "14px 0", textAlign: "center", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 12, fontSize: 20, color: T.text, fontFamily: "'Georgia', serif", outline: "none" }}
          onFocus={e => e.target.style.borderColor = T.greenMid} onBlur={e => e.target.style.borderColor = T.border} />
        <input placeholder="YYYY" value={year} onChange={e => setYear(e.target.value.slice(0,4))} maxLength={4}
          style={{ flex: 2, padding: "14px 0", textAlign: "center", background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, borderRadius: 12, fontSize: 20, color: T.text, fontFamily: "'Georgia', serif", outline: "none" }}
          onFocus={e => e.target.style.borderColor = T.greenMid} onBlur={e => e.target.style.borderColor = T.border} />
      </div>
      {error && <div style={{ fontSize: 13, color: T.red, marginBottom: 12, textAlign: "center" }}>{error}</div>}
      <div style={{ fontSize: 11, color: T.faint, textAlign: "center", marginBottom: 24 }}>Date of birth</div>
      <PrimaryBtn label="Confirm age" onClick={check} disabled={!ready} />
    </div>
  );
}

// ── AGE FAIL ───────────────────────────────────────────────────────────────
function AgeFail() {
  return (
    <div style={{ padding: "0 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, justifyContent: "center", minHeight: 400 }}>
      <div style={{ fontSize: 48 }}>🚫</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: T.text, fontFamily: "'Georgia', serif" }}>Sorry, not quite</div>
      <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>
        Barbuddy is only available to users 21 and older. Come back when you're of legal drinking age!
      </div>
    </div>
  );
}

// ── STEP 2: Create account ─────────────────────────────────────────────────
function CreateAccount({ onNext }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [method, setMethod] = useState("email");
  const ready = form.name && form.email && form.password.length >= 6;

  return (
    <div style={{ padding: "0 24px" }}>
      <Steps total={6} current={2} />
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: T.text, fontFamily: "'Georgia', serif", marginBottom: 8 }}>Create your account</div>
        <div style={{ fontSize: 14, color: T.muted }}>Join the Barbuddy community</div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["email", "apple", "google"].map(m => (
          <button key={m} onClick={() => setMethod(m)} style={{
            flex: 1, padding: "11px 0", borderRadius: 12, border: `1px solid ${method === m ? T.greenMid : T.border}`,
            background: method === m ? T.greenGlow : "transparent", color: method === m ? T.greenMid : T.muted,
            fontSize: 12, cursor: "pointer", fontFamily: "'Georgia', serif", transition: "all 0.2s", textTransform: "capitalize",
          }}>
            {m === "apple" ? "🍎 Apple" : m === "google" ? "G Google" : "✉ Email"}
          </button>
        ))}
      </div>

      {method === "email" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <Input placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" />
          <Input placeholder="Password (min 6 chars)" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} type="password" />
        </div>
      )}

      {method !== "email" && (
        <div style={{ textAlign: "center", padding: "28px 0", color: T.muted, fontSize: 14, marginBottom: 20 }}>
          Tap below to continue with {method === "apple" ? "Apple" : "Google"}
        </div>
      )}

      <PrimaryBtn label="Create account →" onClick={onNext} disabled={method === "email" && !ready} />
      <div style={{ fontSize: 12, color: T.faint, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
        By continuing you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
}

// ── STEP 3: Location ───────────────────────────────────────────────────────
function LocationStep({ onNext }) {
  const [granted, setGranted] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = () => {
    setLoading(true);
    setTimeout(() => { setGranted(true); setLoading(false); }, 1400);
  };

  return (
    <div style={{ padding: "0 24px" }}>
      <Steps total={6} current={3} />
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📍</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: T.text, fontFamily: "'Georgia', serif", marginBottom: 8 }}>Enable location</div>
        <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.7 }}>
          Barbuddy uses your location to show live conditions at bars near you. We never share your precise location with other users.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
        {[
          { icon: "🗺", title: "Nearby bars", desc: "See what's happening around you in real time" },
          { icon: "👥", title: "Find friends", desc: "Know when friends are at a bar near you" },
          { icon: "🔒", title: "Private by default", desc: "Your location is never shared publicly" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 14px", background: "rgba(255,255,255,0.03)", border: `1px solid ${T.border}`, borderRadius: 12 }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: T.muted }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {granted ? (
        <div style={{ marginBottom: 16 }}>
          <div style={{ background: T.greenGlow, border: `1px solid ${T.borderGreen}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: T.greenMid, textAlign: "center", marginBottom: 14 }}>
            ✓ Location access granted — Fort Mill, SC
          </div>
          <PrimaryBtn label="Continue →" onClick={onNext} />
        </div>
      ) : (
        <PrimaryBtn label={loading ? "Requesting…" : "Allow location access"} onClick={request} disabled={loading} />
      )}

      <button onClick={onNext} style={{ width: "100%", marginTop: 12, padding: "12px 0", background: "none", border: "none", color: T.faint, fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif" }}>
        Skip for now
      </button>
    </div>
  );
}

// ── STEP 4: Preferences ────────────────────────────────────────────────────
function Preferences({ onNext }) {
  const [vibes, setVibes] = useState([]);
  const [types, setTypes] = useState([]);
  const [musts, setMusts] = useState([]);

  const toggle = (arr, setArr, val) =>
    setArr(a => a.includes(val) ? a.filter(x => x !== val) : [...a, val]);

  const ready = vibes.length > 0 || types.length > 0;

  return (
    <div style={{ padding: "0 24px" }}>
      <Steps total={6} current={4} />
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: T.text, fontFamily: "'Georgia', serif", marginBottom: 8 }}>Your nightlife style</div>
        <div style={{ fontSize: 14, color: T.muted }}>We'll personalize your recommendations</div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 11, color: T.faint, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>What's your usual vibe?</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Chill & low-key", "Turn up", "Meet people", "Watch sports", "Date night", "Group outing"].map(v => (
            <Pill key={v} label={v} selected={vibes.includes(v)} onClick={() => toggle(vibes, setVibes, v)} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 11, color: T.faint, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Bar types you love</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Sports bar", "Craft cocktails", "Dive bar", "Rooftop", "Club", "Wine bar", "Karaoke", "Brewery"].map(v => (
            <Pill key={v} label={v} selected={types.includes(v)} onClick={() => toggle(types, setTypes, v)} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: T.faint, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Must-haves</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["No cover", "Short wait", "Outdoor seating", "Cheap drinks", "Live music", "Happy hour"].map(v => (
            <Pill key={v} label={v} selected={musts.includes(v)} onClick={() => toggle(musts, setMusts, v)} />
          ))}
        </div>
      </div>

      <PrimaryBtn label="Save preferences →" onClick={onNext} disabled={!ready} />
      <button onClick={onNext} style={{ width: "100%", marginTop: 12, padding: "12px 0", background: "none", border: "none", color: T.faint, fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif" }}>
        Skip, I'll set these later
      </button>
    </div>
  );
}

// ── STEP 5: Find friends ───────────────────────────────────────────────────
function FindFriends({ onNext }) {
  const [connected, setConnected] = useState([]);
  const [added, setAdded] = useState([]);
  const suggested = [
    { id: 1, name: "Jake Reeves", mutual: "3 mutual friends", color: "#B5D4F4", tc: "#0C447C" },
    { id: 2, name: "Kim Marsh", mutual: "5 mutual friends", color: "#F4C0D1", tc: "#72243E" },
    { id: 3, name: "Tom Liu", mutual: "2 mutual friends", color: "#C0DD97", tc: "#3B6D11" },
    { id: 4, name: "Ava Santos", mutual: "1 mutual friend", color: "#FAC775", tc: "#633806" },
  ];

  const addFriend = (id) => setAdded(a => a.includes(id) ? a : [...a, id]);
  const connectContacts = () => setConnected(["contacts"]);

  return (
    <div style={{ padding: "0 24px" }}>
      <Steps total={6} current={5} />
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: T.text, fontFamily: "'Georgia', serif", marginBottom: 8 }}>Find your crew</div>
        <div style={{ fontSize: 14, color: T.muted }}>See where friends are going out tonight</div>
      </div>

      <button onClick={connectContacts} style={{
        width: "100%", padding: "14px 16px", marginBottom: 20,
        borderRadius: 14, border: `1px solid ${connected.includes("contacts") ? T.borderGreen : T.border}`,
        background: connected.includes("contacts") ? T.greenGlow : "rgba(255,255,255,0.03)",
        color: connected.includes("contacts") ? T.greenMid : T.muted,
        display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left",
        fontFamily: "'Georgia', serif", transition: "all 0.2s",
      }}>
        <div style={{ fontSize: 28 }}>📱</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{connected.includes("contacts") ? "✓ Contacts connected" : "Connect your contacts"}</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Find friends already on Barbuddy</div>
        </div>
      </button>

      <div style={{ fontSize: 11, color: T.faint, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Suggested for you</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {suggested.map(f => (
          <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "rgba(255,255,255,0.03)", border: `1px solid ${added.includes(f.id) ? T.borderGreen : T.border}`, borderRadius: 12, transition: "border-color 0.2s" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: f.color, color: f.tc, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {f.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: T.text }}>{f.name}</div>
              <div style={{ fontSize: 12, color: T.faint }}>{f.mutual}</div>
            </div>
            <button onClick={() => addFriend(f.id)} style={{
              padding: "7px 14px", borderRadius: 20, border: `1px solid ${added.includes(f.id) ? T.borderGreen : T.border}`,
              background: added.includes(f.id) ? T.greenGlow : "transparent",
              color: added.includes(f.id) ? T.greenMid : T.muted,
              fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif", transition: "all 0.2s",
            }}>
              {added.includes(f.id) ? "Added ✓" : "Add"}
            </button>
          </div>
        ))}
      </div>

      <PrimaryBtn label={added.length > 0 ? `Add ${added.length} friend${added.length > 1 ? "s" : ""} & continue →` : "Continue →"} onClick={onNext} />
      <button onClick={onNext} style={{ width: "100%", marginTop: 12, padding: "12px 0", background: "none", border: "none", color: T.faint, fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif" }}>
        Skip for now
      </button>
    </div>
  );
}

// ── STEP 6: All done ───────────────────────────────────────────────────────
function AllDone({ onFinish }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 520, textAlign: "center", padding: "0 24px" }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.85)", transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div style={{ fontSize: 72, marginBottom: 24, lineHeight: 1 }}>🍻</div>
        <div style={{ fontSize: 30, fontWeight: 700, color: T.text, fontFamily: "'Georgia', serif", marginBottom: 8 }}>You're all set!</div>
        <div style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, marginBottom: 32 }}>
          Barbuddy is ready to help you find the perfect spot tonight. See you out there.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {["Live bar conditions near you", "Friend activity in real time", "Personalized recommendations"].map((item, i) => (
            <div key={i} style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.4s ease ${0.3 + i * 0.15}s`,
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 16px", borderRadius: 12,
              background: "rgba(29,158,117,0.08)", border: `1px solid ${T.borderGreen}`,
            }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 13, color: T.muted }}>{item}</span>
            </div>
          ))}
        </div>
        <PrimaryBtn label="Explore Barbuddy →" onClick={onFinish} />
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
const STEPS = ["splash", "agegate", "account", "location", "prefs", "friends", "done", "agefail"];

export default function App() {
  const [step, setStep] = useState("splash");
  const next = (s) => setStep(s);

  const stepMap = {
    splash:   <Splash        onNext={() => next("agegate")} />,
    agegate:  <AgeGate       onNext={() => next("account")} onFail={() => next("agefail")} />,
    agefail:  <AgeFail />,
    account:  <CreateAccount onNext={() => next("location")} />,
    location: <LocationStep  onNext={() => next("prefs")} />,
    prefs:    <Preferences   onNext={() => next("friends")} />,
    friends:  <FindFriends   onNext={() => next("done")} />,
    done:     <AllDone       onFinish={() => next("splash")} />,
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: T.bg, minHeight: 620, maxWidth: 390, margin: "0 auto", borderRadius: 20, border: `0.5px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
      <NightBg />
      <div style={{ position: "relative", zIndex: 1, padding: "28px 0 32px" }}>
        {step !== "splash" && step !== "done" && step !== "agefail" && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px 24px" }}>
            <button onClick={() => {
              const order = ["agegate","account","location","prefs","friends"];
              const i = order.indexOf(step);
              if (i > 0) setStep(order[i - 1]);
            }} style={{ background: "none", border: "none", color: T.faint, fontSize: 13, cursor: "pointer", fontFamily: "'Georgia', serif", padding: 0 }}>
              ← Back
            </button>
            <Logo size={28} />
          </div>
        )}
        {stepMap[step]}
      </div>
    </div>
  );
}
