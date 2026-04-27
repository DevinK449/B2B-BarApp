import { useState, useEffect } from "react";

// ── Design tokens — editorial cream & ink ─────────────────────────────────
const T = {
  cream:    "#F5F0E8",
  paper:    "#FBF8F3",
  ink:      "#1C1A16",
  inkLight: "#3D3A34",
  muted:    "#8A8478",
  faint:    "#C4BDAF",
  border:   "#E2DAD0",
  green:    "#1A7A58",
  greenBg:  "#EAF5EF",
  greenBdr: "#A8D5BE",
  amber:    "#B07820",
  amberBg:  "#FEF6E4",
  red:      "#B03020",
  stamp1:   "#1A7A58",
  stamp2:   "#B07820",
  stamp3:   "#8B3A8B",
  stamp4:   "#1A5A7A",
  stamp5:   "#B03020",
  stamp6:   "#4A7A1A",
};

const TABS = ["Profile", "Passport", "History", "Stats"];

// ── Stamp data ─────────────────────────────────────────────────────────────
const STAMPS = [
  { id: 1, name: "The Rusty Anchor", type: "Sports Bar", visits: 14, color: T.stamp1, icon: "⚓", earned: true, date: "Jan 2025" },
  { id: 2, name: "Craft & Crown", type: "Cocktail Bar", visits: 9, color: T.stamp2, icon: "👑", earned: true, date: "Mar 2025" },
  { id: 3, name: "Neon Patio", type: "Rooftop", visits: 7, color: T.stamp3, icon: "🌃", earned: true, date: "May 2025" },
  { id: 4, name: "Barrel & Vine", type: "Wine Bar", visits: 4, color: T.stamp4, icon: "🍷", earned: true, date: "Jul 2025" },
  { id: 5, name: "The Dive", type: "Dive Bar", visits: 3, color: T.stamp5, icon: "🎱", earned: true, date: "Sep 2025" },
  { id: 6, name: "Sky Lounge", type: "Rooftop Club", visits: 0, color: T.faint, icon: "☁️", earned: false, date: null },
  { id: 7, name: "Blind Tiger", type: "Speakeasy", visits: 0, color: T.faint, icon: "🐯", earned: false, date: null },
  { id: 8, name: "Draft House", type: "Brewery", visits: 0, color: T.faint, icon: "🍺", earned: false, date: null },
  { id: 9, name: "The Velvet Room", type: "Jazz Bar", visits: 0, color: T.faint, icon: "🎷", earned: false, date: null },
];

const ACHIEVEMENTS = [
  { icon: "🌟", label: "First Rating", desc: "Submitted your first rating", earned: true },
  { icon: "🔥", label: "On a Roll", desc: "Rated 5 nights in a row", earned: true },
  { icon: "🗺️", label: "Explorer", desc: "Visited 5 different bars", earned: true },
  { icon: "👑", label: "Regular", desc: "Visited one bar 10+ times", earned: true },
  { icon: "🤝", label: "Social Butterfly", desc: "Went out with 5+ friends", earned: true },
  { icon: "💯", label: "Perfect Night", desc: "Gave a 10/10 vibe score", earned: true },
  { icon: "🌙", label: "Night Owl", desc: "Checked in after 1 AM", earned: false },
  { icon: "🎯", label: "Verified Rater", desc: "100+ ratings submitted", earned: false },
];

const HISTORY = [
  { date: "Fri Apr 25", bar: "The Rusty Anchor", vibe: 9, line: "No line", cover: "Free", friends: ["JR", "KM"] },
  { date: "Wed Apr 23", bar: "Barrel & Vine", vibe: 8, line: "No line", cover: "Free", friends: ["AS"] },
  { date: "Sat Apr 19", bar: "Craft & Crown", vibe: 7, line: "~10 min", cover: "$10", friends: ["TL", "BP"] },
  { date: "Fri Apr 18", bar: "Neon Patio", vibe: 8, line: "~20 min", cover: "$5", friends: ["JR"] },
  { date: "Sat Apr 12", bar: "The Rusty Anchor", vibe: 10, line: "No line", cover: "Free", friends: ["JR","KM","TL","AS"] },
  { date: "Fri Apr 11", bar: "The Dive", vibe: 7, line: "No line", cover: "Free", friends: ["BP"] },
];

const FRIENDS = [
  { init: "JR", name: "Jake Reeves", mutual: 22, color: "#B5D4F4", tc: "#0C447C", status: "out" },
  { init: "KM", name: "Kim Marsh", mutual: 15, color: "#F4C0D1", tc: "#72243E", status: "out" },
  { init: "TL", name: "Tom Liu", mutual: 11, color: "#C0DD97", tc: "#3B6D11", status: "home" },
  { init: "AS", name: "Ava Santos", mutual: 8, color: "#FAC775", tc: "#633806", status: "home" },
  { init: "BP", name: "Ben Park", mutual: 6, color: "#D4B5F4", tc: "#3A0C7C", status: "out" },
];

// ── Stamp component ────────────────────────────────────────────────────────
function Stamp({ stamp, onPress, selected }) {
  return (
    <div onClick={() => onPress(stamp)} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      cursor: "pointer", opacity: stamp.earned ? 1 : 0.35,
    }}>
      <div style={{
        width: 68, height: 68, borderRadius: 8,
        border: `2.5px dashed ${stamp.earned ? stamp.color : T.faint}`,
        background: stamp.earned ? `${stamp.color}12` : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", transition: "all 0.2s",
        boxShadow: selected ? `0 0 0 2px ${stamp.color}` : "none",
        transform: selected ? "scale(1.08)" : "scale(1)",
      }}>
        <div style={{ fontSize: 26 }}>{stamp.icon}</div>
        {stamp.earned && (
          <div style={{
            position: "absolute", bottom: -1, right: -1,
            width: 18, height: 18, borderRadius: "50%",
            background: stamp.color, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M1.5 4.5l2 2 4-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <div style={{ fontSize: 9, color: stamp.earned ? T.inkLight : T.faint, textAlign: "center", maxWidth: 64, lineHeight: 1.3, fontFamily: "system-ui" }}>
        {stamp.name.split(" ").slice(0, 2).join(" ")}
      </div>
    </div>
  );
}

// ── Tab: Profile ───────────────────────────────────────────────────────────
function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("Fort Mill local. Sports bars and free covers. Out most Fridays. 🍺");

  return (
    <div style={{ padding: "0 20px 28px" }}>
      {/* Hero card */}
      <div style={{
        background: T.ink, borderRadius: 20, padding: "24px 22px 20px",
        marginBottom: 16, position: "relative", overflow: "hidden",
      }}>
        {/* decorative lines */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, borderRadius: "0 20px 0 100%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />

        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #1A7A58, #5DCAA5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "system-ui" }}>
              AR
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 18, height: 18, borderRadius: "50%", background: "#4ADE80", border: "2px solid #1C1A16" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Georgia', serif", marginBottom: 2 }}>Alex Reynolds</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>@alexr · Fort Mill, SC</div>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <span style={{ fontSize: 11, background: "rgba(29,158,117,0.2)", color: "#5DCAA5", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(93,202,165,0.3)" }}>
                🏅 Verified Rater
              </span>
              <span style={{ fontSize: 11, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", padding: "3px 10px", borderRadius: 20 }}>
                Member since Jan 2025
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {editing ? (
          <div>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2}
              style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#fff", fontFamily: "system-ui", resize: "none", outline: "none", boxSizing: "border-box" }} />
            <button onClick={() => setEditing(false)} style={{ marginTop: 8, padding: "7px 16px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "system-ui" }}>Save</button>
          </div>
        ) : (
          <div onClick={() => setEditing(true)} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 14, marginBottom: 14 }}>
            {bio} <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>tap to edit</span>
          </div>
        )}

        {/* Quick stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {[["47", "Nights out"], ["5", "Bars stamped"], ["134", "Ratings"]].map(([val, label], i) => (
            <div key={i} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none", padding: "4px 0" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Georgia', serif" }}>{val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div style={{ background: T.amberBg, border: `1px solid ${T.amberBdr || "#E8D0A0"}`, borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 36 }}>🎯</div>
          <div>
            <div style={{ fontSize: 11, color: T.amber, textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "system-ui", marginBottom: 3 }}>Your personality</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: "'Georgia', serif" }}>The Creature of Habit</div>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Loyal regular · Sports lover · Free cover hunter</div>
          </div>
        </div>
      </div>

      {/* Friends section */}
      <div style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: "'Georgia', serif" }}>Friends</div>
          <div style={{ fontSize: 12, color: T.green, cursor: "pointer" }}>See all →</div>
        </div>
        {FRIENDS.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", borderBottom: i < FRIENDS.length - 1 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: f.color, color: f.tc, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>{f.init}</div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: f.status === "out" ? "#4ADE80" : T.faint, border: `1.5px solid ${T.paper}` }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{f.name}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{f.mutual} nights together</div>
            </div>
            <div style={{ fontSize: 11, color: f.status === "out" ? T.green : T.faint, fontWeight: 500 }}>
              {f.status === "out" ? "● Out tonight" : "● Home"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Passport ──────────────────────────────────────────────────────────
function PassportTab() {
  const [selected, setSelected] = useState(null);
  const earned = STAMPS.filter(s => s.earned).length;

  return (
    <div style={{ padding: "0 20px 28px" }}>
      {/* Passport header */}
      <div style={{
        background: `linear-gradient(135deg, ${T.ink} 0%, #2C2416 100%)`,
        borderRadius: 18, padding: "20px 22px", marginBottom: 16,
        border: `3px solid #3D3520`, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 8, right: 8, opacity: 0.06, fontSize: 80 }}>🍺</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Republic of Nightlife</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#F5C842", fontFamily: "'Georgia', serif", letterSpacing: "0.04em" }}>BAR PASSPORT</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Issued to Alex Reynolds</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ width: 52, height: 52, borderRadius: 8, background: "linear-gradient(135deg, #1A7A58, #5DCAA5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🍻</div>
          </div>
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 20 }}>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Stamps collected</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#F5C842", fontFamily: "'Georgia', serif" }}>{earned} <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>/ {STAMPS.length}</span></div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total visits</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "'Georgia', serif" }}>37</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Rank</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#F5C842", fontFamily: "'Georgia', serif", marginTop: 4 }}>Regular 🥈</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 14 }}>
          <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(earned / STAMPS.length) * 100}%`, background: "#F5C842", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 5 }}>
            {STAMPS.length - earned} more stamps to become a Barbuddy Legend
          </div>
        </div>
      </div>

      {/* Stamp detail */}
      {selected && (
        <div style={{ background: selected.earned ? `${selected.color}0F` : T.paper, border: `1px solid ${selected.earned ? selected.color + "44" : T.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 14, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ fontSize: 36 }}>{selected.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "'Georgia', serif" }}>{selected.name}</div>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{selected.type}</div>
            {selected.earned ? (
              <div style={{ fontSize: 12, color: selected.color, marginTop: 4, fontWeight: 500 }}>
                ✓ {selected.visits} visits · Stamped {selected.date}
              </div>
            ) : (
              <div style={{ fontSize: 12, color: T.faint, marginTop: 4 }}>Not yet visited — go check it out!</div>
            )}
          </div>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: T.faint, fontSize: 18, cursor: "pointer", padding: 4 }}>×</button>
        </div>
      )}

      {/* Stamp grid */}
      <div style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, padding: "18px 16px" }}>
        <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, fontFamily: "system-ui" }}>Tap a stamp to see details</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {STAMPS.map(s => (
            <Stamp key={s.id} stamp={s} onPress={setSelected} selected={selected?.id === s.id} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ marginTop: 16, background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: "'Georgia', serif" }}>Achievements</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} style={{
              padding: "12px 14px", opacity: a.earned ? 1 : 0.4,
              borderRight: i % 2 === 0 ? `1px solid ${T.border}` : "none",
              borderBottom: i < ACHIEVEMENTS.length - 2 ? `1px solid ${T.border}` : "none",
            }}>
              <div style={{ fontSize: 22, marginBottom: 5 }}>{a.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginBottom: 2 }}>{a.label}</div>
              <div style={{ fontSize: 10, color: T.muted, lineHeight: 1.3 }}>{a.desc}</div>
              {a.earned && <div style={{ marginTop: 4, fontSize: 9, color: T.green, fontWeight: 700 }}>EARNED</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tab: History ───────────────────────────────────────────────────────────
function HistoryTab() {
  const friendColors = { JR: ["#B5D4F4","#0C447C"], KM: ["#F4C0D1","#72243E"], TL: ["#C0DD97","#3B6D11"], AS: ["#FAC775","#633806"], BP: ["#D4B5F4","#3A0C7C"] };

  return (
    <div style={{ padding: "0 20px 28px" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {[["47", "Nights out"], ["134", "Ratings"], ["8.1", "Avg vibe"]].map(([v, l], i) => (
          <div key={i} style={{ flex: 1, background: T.paper, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: T.ink, fontFamily: "'Georgia', serif" }}>{v}</div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 13, fontWeight: 700, color: T.ink, fontFamily: "'Georgia', serif" }}>
          Rating history
        </div>
        {HISTORY.map((h, i) => {
          const vibeColor = h.vibe >= 9 ? T.green : h.vibe >= 7 ? T.amber : T.red;
          return (
            <div key={i} style={{ padding: "13px 18px", borderBottom: i < HISTORY.length - 1 ? `1px solid ${T.border}` : "none", display: "flex", gap: 14, alignItems: "center" }}>
              {/* Vibe score circle */}
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: `${vibeColor}14`, border: `1.5px solid ${vibeColor}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: vibeColor, fontFamily: "'Georgia', serif" }}>{h.vibe}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, fontFamily: "'Georgia', serif", marginBottom: 2 }}>{h.bar}</div>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 5 }}>{h.date}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[h.line, h.cover].map((s, j) => (
                    <span key={j} style={{ fontSize: 10, background: T.cream, borderRadius: 10, padding: "2px 8px", color: T.muted, border: `1px solid ${T.border}` }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                {h.friends.map((f, j) => {
                  const [bg, tc] = friendColors[f] || ["#ddd","#333"];
                  return (
                    <div key={j} style={{ marginLeft: j > 0 ? -7 : 0, width: 24, height: 24, borderRadius: "50%", background: bg, color: tc, fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${T.paper}`, fontFamily: "system-ui" }}>{f}</div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Tab: Stats ─────────────────────────────────────────────────────────────
function StatsTab() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const dayVals = [5, 8, 18, 12, 52, 38, 20];
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const monthVals = [2,3,4,3,5,6,8,7,5,4,6,7];
  const maxDay = Math.max(...dayVals);
  const maxMonth = Math.max(...monthVals);

  return (
    <div style={{ padding: "0 20px 28px" }}>
      {/* Personality deep dive */}
      <div style={{ background: T.ink, borderRadius: 16, padding: "18px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14, fontFamily: "system-ui" }}>Your nightlife DNA</div>
        {[
          { label: "Loyalty", val: 68, desc: "Return visitor", color: "#F5C842" },
          { label: "Adventure", val: 32, desc: "Explorer spirit", color: "#60A5FA" },
          { label: "Social", val: 78, desc: "Group goer", color: "#4ADE80" },
          { label: "Budget", val: 82, desc: "Value seeker", color: "#FB923C" },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{s.label}</span>
              <span style={{ fontSize: 12, color: s.color, fontWeight: 700 }}>{s.val}% · {s.desc}</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${s.val}%`, background: s.color, borderRadius: 3, opacity: 0.85, transition: "width 0.8s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Favorite night */}
      <div style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontFamily: "system-ui" }}>Nights out by day</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 64, marginBottom: 8 }}>
          {days.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: "100%", height: Math.round((dayVals[i] / maxDay) * 56),
                background: i === 4 ? T.green : i === 5 ? T.amber : `${T.green}44`,
                borderRadius: "3px 3px 0 0", minHeight: 4,
              }} />
              <div style={{ fontSize: 8, color: i === 4 || i === 5 ? T.inkLight : T.faint }}>{d.slice(0,2)}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: T.muted }}>Friday is your night — <span style={{ color: T.ink, fontWeight: 600 }}>52% of your outings</span></div>
      </div>

      {/* Monthly activity */}
      <div style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontFamily: "system-ui" }}>Monthly activity 2025</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 56, marginBottom: 8 }}>
          {monthVals.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", height: Math.round((v / maxMonth) * 48), background: T.green, borderRadius: "2px 2px 0 0", opacity: 0.25 + (v / maxMonth) * 0.75, minHeight: 4 }} />
              <div style={{ fontSize: 8, color: T.faint }}>{months[i]}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: T.muted }}>Peak: <span style={{ color: T.ink, fontWeight: 600 }}>July — 8 nights out</span></div>
      </div>

      {/* Top stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { icon: "⭐", label: "Avg vibe given", val: "8.1 / 10" },
          { icon: "🎟", label: "Cover paid total", val: "$85" },
          { icon: "⏰", label: "Latest night", val: "3:22 AM" },
          { icon: "🏃", label: "Earliest arrival", val: "8:04 PM" },
          { icon: "👥", label: "Largest group", val: "7 people" },
          { icon: "🗺", label: "Bars visited", val: "12 total" },
        ].map((s, i) => (
          <div key={i} style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 12, padding: "13px 14px" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, fontFamily: "'Georgia', serif", marginBottom: 2 }}>{s.val}</div>
            <div style={{ fontSize: 10, color: T.muted }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function UserProfile() {
  const [tab, setTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: T.cream, maxWidth: 390, margin: "0 auto", borderRadius: 20, border: `1px solid ${T.border}`, overflow: "hidden", minHeight: 640 }}>

      {/* Top header */}
      <div style={{ background: T.paper, borderBottom: `1px solid ${T.border}`, padding: "14px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: "'Georgia', serif" }}>My Profile</div>
          <button style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, color: T.muted, cursor: "pointer", fontFamily: "system-ui" }}>
            Edit profile
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0 }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              flex: 1, padding: "10px 4px 12px", fontSize: 13,
              fontWeight: tab === i ? 700 : 400,
              color: tab === i ? T.green : T.muted,
              background: "none", border: "none",
              borderBottom: tab === i ? `2.5px solid ${T.green}` : "2.5px solid transparent",
              cursor: "pointer", fontFamily: "'Georgia', serif",
              transition: "all 0.15s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ overflowY: "auto", maxHeight: 540, paddingTop: 16 }}>
        {tab === 0 && <ProfileTab />}
        {tab === 1 && <PassportTab />}
        {tab === 2 && <HistoryTab />}
        {tab === 3 && <StatsTab />}
      </div>
    </div>
  );
}
