import { useState, useEffect } from "react";

const C = {
  bg: "#F5F4F1",
  card: "#FFFFFF",
  cardAlt: "#FAFAF8",
  green: "#1D9E75",
  greenLight: "#E8F8F2",
  greenMid: "#5DCAA5",
  greenDark: "#0F6E56",
  greenBorder: "#C0EAD8",
  amber: "#D4860A",
  amberLight: "#FEF3DC",
  amberBorder: "#F2C96B",
  red: "#C93333",
  redLight: "#FEECEC",
  redBorder: "#F0A0A0",
  border: "#E8E6E1",
  text: "#1A1A18",
  muted: "#7A7870",
  faint: "#B5B3AE",
  ink: "#2C2C2A",
};

const BARS = [
  {
    id: 1, name: "The Rusty Anchor", type: "Sports bar", distance: "0.3 mi",
    score: 8.4, ratingCount: 247,
    forecast: [
      { hour: "8p", busy: 15, cover: "Free", line: "None", label: "" },
      { hour: "9p", busy: 32, cover: "Free", line: "None", label: "" },
      { hour: "10p", busy: 68, cover: "Free", line: "~5 min", label: "Getting busy" },
      { hour: "11p", busy: 88, cover: "Free", line: "~10 min", label: "Peak hours" },
      { hour: "12a", busy: 95, cover: "Free", line: "~15 min", label: "Peak hours" },
      { hour: "1a", busy: 72, cover: "Free", line: "~5 min", label: "Winding down" },
    ],
    bestTime: "Before 10 PM",
    bestTimeReason: "No line, free entry, same great vibe",
    insight: "Cover stays free all night — rare for a Friday. Line peaks around midnight but clears fast.",
    tags: ["Free all night", "Sports crowd", "Game on tonight"],
    weekPattern: [62, 55, 58, 70, 95, 88, 40],
  },
  {
    id: 2, name: "Craft & Crown", type: "Cocktail bar", distance: "0.6 mi",
    score: 9.1, ratingCount: 189,
    forecast: [
      { hour: "8p", busy: 20, cover: "Free", line: "None", label: "" },
      { hour: "9p", busy: 45, cover: "$5", line: "~5 min", label: "" },
      { hour: "10p", busy: 78, cover: "$10", line: "~15 min", label: "Getting packed" },
      { hour: "11p", busy: 96, cover: "$10", line: "~25 min", label: "Peak — long wait" },
      { hour: "12a", busy: 90, cover: "$10", line: "~20 min", label: "Still packed" },
      { hour: "1a", busy: 65, cover: "$5", line: "~10 min", label: "Easing off" },
    ],
    bestTime: "8–9 PM",
    bestTimeReason: "Free cover, no line, and seats available",
    insight: "Cover jumps to $10 after 10 PM — go early and save. Line hits 25+ min at 11. Worth it for the vibe.",
    tags: ["Cover spikes late", "Best cocktails nearby", "Get there early"],
    weekPattern: [40, 35, 42, 60, 96, 80, 30],
  },
  {
    id: 3, name: "Neon Patio", type: "Rooftop bar", distance: "1.1 mi",
    score: 7.8, ratingCount: 134,
    forecast: [
      { hour: "8p", busy: 30, cover: "Free", line: "None", label: "" },
      { hour: "9p", busy: 60, cover: "$5", line: "~10 min", label: "" },
      { hour: "10p", busy: 85, cover: "$5", line: "~30 min", label: "Long line forming" },
      { hour: "11p", busy: 98, cover: "$5", line: "~45 min", label: "Very long wait" },
      { hour: "12a", busy: 88, cover: "$5", line: "~30 min", label: "Still busy" },
      { hour: "1a", busy: 55, cover: "Free", line: "~10 min", label: "Thinning out" },
    ],
    bestTime: "After 1 AM",
    bestTimeReason: "Line clears, cover drops, and rooftop view is stunning",
    insight: "Neon Patio has the longest lines on Fridays — 45 min at peak. If you're going, go late or go early.",
    tags: ["Expect a wait", "Late night gem", "Worth it after 1a"],
    weekPattern: [30, 28, 35, 55, 98, 75, 25],
  },
];

function BusyBar({ val, hour, isNow, isBest }) {
  const color = val >= 85 ? C.red : val >= 60 ? C.amber : C.green;
  const bgColor = val >= 85 ? C.redLight : val >= 60 ? C.amberLight : C.greenLight;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      {isBest && (
        <div style={{ fontSize: 8, color: C.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Best</div>
      )}
      {!isBest && <div style={{ fontSize: 8, color: "transparent" }}>·</div>}
      <div style={{ width: "100%", height: 72, display: "flex", alignItems: "flex-end", position: "relative" }}>
        {isNow && (
          <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", width: 1, height: "calc(100% + 8px)", background: C.green, opacity: 0.4 }} />
        )}
        <div style={{
          width: "100%", height: `${val}%`,
          background: isBest ? C.green : color,
          borderRadius: "3px 3px 0 0",
          opacity: isNow ? 1 : 0.65,
          transition: "height 0.6s ease",
          border: isBest ? `1px solid ${C.greenDark}` : "none",
          minHeight: 4,
        }} />
      </div>
      <div style={{ fontSize: 9, color: isNow ? C.green : C.faint, fontWeight: isNow ? 700 : 400 }}>{hour}</div>
    </div>
  );
}

function Tag({ text, type = "neutral" }) {
  const styles = {
    good: { bg: C.greenLight, color: C.greenDark, border: C.greenBorder },
    warn: { bg: C.amberLight, color: C.amber, border: C.amberBorder },
    bad: { bg: C.redLight, color: C.red, border: C.redBorder },
    neutral: { bg: "#F0EEE9", color: C.muted, border: C.border },
  };
  const s = styles[type];
  return (
    <span style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 20, background: s.bg, color: s.color, border: `1px solid ${s.border}`, whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}

function WeekHeatmap({ pattern }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const max = Math.max(...pattern);
  return (
    <div>
      <div style={{ fontSize: 11, color: C.faint, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Typical weekly busyness</div>
      <div style={{ display: "flex", gap: 4 }}>
        {days.map((d, i) => {
          const pct = pattern[i] / max;
          const color = pct > 0.85 ? C.red : pct > 0.6 ? C.amber : C.green;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", height: 32, borderRadius: 4, background: color, opacity: 0.15 + pct * 0.7, transition: "height 0.5s" }} />
              <div style={{ fontSize: 9, color: i === 4 ? C.ink : C.faint, fontWeight: i === 4 ? 700 : 400 }}>{d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BarForecastCard({ bar, expanded, onToggle }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { if (expanded) setTimeout(() => setAnimated(true), 50); else setAnimated(false); }, [expanded]);

  const nowIdx = 3; // 11pm = index 3
  const bestIdx = bar.forecast.findIndex(f => f.busy === Math.min(...bar.forecast.map(x => x.busy)));
  const currentSlot = bar.forecast[nowIdx];
  const busynessColor = currentSlot.busy >= 85 ? C.red : currentSlot.busy >= 60 ? C.amber : C.green;
  const busynessLabel = currentSlot.busy >= 85 ? "Very busy" : currentSlot.busy >= 60 ? "Moderate" : "Quiet";

  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 18,
      overflow: "hidden", marginBottom: 14,
      boxShadow: expanded ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
      transition: "box-shadow 0.2s",
    }}>
      {/* Card header */}
      <div onClick={onToggle} style={{ padding: "16px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 3 }}>
            {bar.name}
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>{bar.type} · {bar.distance}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: busynessColor === C.red ? C.redLight : busynessColor === C.amber ? C.amberLight : C.greenLight, borderRadius: 20, padding: "4px 10px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: busynessColor }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: busynessColor }}>{busynessLabel} now</span>
            </div>
            <Tag text={`Best time: ${bar.bestTime}`} type="good" />
          </div>
        </div>
        <div style={{ textAlign: "right", marginLeft: 14 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.green, fontFamily: "system-ui" }}>{bar.score}</div>
          <div style={{ fontSize: 10, color: C.faint }}>vibe</div>
          <div style={{ fontSize: 11, color: C.faint, marginTop: 8 }}>{expanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {/* Expanded forecast */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "16px 18px", opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(-8px)", transition: "all 0.3s ease" }}>

          {/* Busyness chart */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: C.faint, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Tonight's forecast</div>
            <div style={{ display: "flex", gap: 4, alignItems: "flex-end" }}>
              {bar.forecast.map((slot, i) => (
                <BusyBar key={i} val={slot.busy} hour={slot.hour} isNow={i === nowIdx} isBest={i === bestIdx} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <div style={{ fontSize: 11, color: C.muted }}>▲ Green line = right now (11 PM)</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 10, color: C.green }}>● Low</span>
                <span style={{ fontSize: 10, color: C.amber }}>● Med</span>
                <span style={{ fontSize: 10, color: C.red }}>● Busy</span>
              </div>
            </div>
          </div>

          {/* Hourly breakdown table */}
          <div style={{ background: C.cardAlt, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 60px 80px", gap: 0 }}>
              {["Time", "Crowd", "Cover", "Line"].map((h, i) => (
                <div key={i} style={{ padding: "8px 12px", fontSize: 10, color: C.faint, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${C.border}`, background: "#F8F7F4" }}>
                  {h}
                </div>
              ))}
              {bar.forecast.map((slot, i) => {
                const isNow = i === nowIdx;
                const rowBg = isNow ? C.greenLight : i % 2 === 0 ? C.card : C.cardAlt;
                return [
                  <div key={`t${i}`} style={{ padding: "9px 12px", fontSize: 12, fontWeight: isNow ? 700 : 400, color: isNow ? C.greenDark : C.ink, background: rowBg, borderBottom: `1px solid ${C.border}` }}>{slot.hour}{isNow ? " ←" : ""}</div>,
                  <div key={`b${i}`} style={{ padding: "9px 12px", background: rowBg, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ height: 5, background: slot.busy >= 85 ? C.red : slot.busy >= 60 ? C.amber : C.green, borderRadius: 3, width: `${slot.busy}%`, opacity: 0.7 }} />
                    {slot.label && <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{slot.label}</div>}
                  </div>,
                  <div key={`c${i}`} style={{ padding: "9px 12px", fontSize: 12, color: slot.cover === "Free" ? C.green : C.amber, fontWeight: 500, background: rowBg, borderBottom: `1px solid ${C.border}` }}>{slot.cover}</div>,
                  <div key={`l${i}`} style={{ padding: "9px 12px", fontSize: 12, color: slot.line === "None" ? C.green : slot.line.includes("45") ? C.red : C.amber, background: rowBg, borderBottom: `1px solid ${C.border}` }}>{slot.line}</div>,
                ];
              })}
            </div>
          </div>

          {/* Best time callout */}
          <div style={{ background: C.greenLight, border: `1px solid ${C.greenBorder}`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>⏰</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.greenDark, marginBottom: 3 }}>Best time to arrive: {bar.bestTime}</div>
              <div style={{ fontSize: 12, color: C.green }}>{bar.bestTimeReason}</div>
            </div>
          </div>

          {/* Insight */}
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, marginBottom: 16, padding: "0 2px" }}>
            💡 {bar.insight}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {bar.tags.map((t, i) => {
              const type = t.toLowerCase().includes("free") || t.toLowerCase().includes("worth") || t.toLowerCase().includes("gem") ? "good"
                : t.toLowerCase().includes("wait") || t.toLowerCase().includes("spike") || t.toLowerCase().includes("long") ? "warn" : "neutral";
              return <Tag key={i} text={t} type={type} />;
            })}
          </div>

          {/* Week heatmap */}
          <WeekHeatmap pattern={bar.weekPattern} />

          {/* CTA */}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button style={{ flex: 1, padding: "10px 0", background: C.green, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Playfair Display', Georgia, serif", boxShadow: "0 2px 12px rgba(29,158,117,0.25)" }}>
              Rate this bar →
            </button>
            <button style={{ flex: 1, padding: "10px 0", background: "none", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.muted, cursor: "pointer", fontFamily: "system-ui" }}>
              Add to plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BarForecast() {
  const [expanded, setExpanded] = useState(1);
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: "All bars" },
    { id: "free", label: "Free cover" },
    { id: "low", label: "Short wait" },
    { id: "top", label: "Top rated" },
  ];

  const filtered = BARS.filter(b => {
    if (filter === "free") return b.forecast[3].cover === "Free";
    if (filter === "low") return b.forecast[3].busy < 70;
    if (filter === "top") return b.score >= 8.5;
    return true;
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: C.bg, minHeight: 620, maxWidth: 390, margin: "0 auto", borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden" }}>

      {/* Header */}
      <div style={{ padding: "22px 20px 16px", background: C.card, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.ink, fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.01em" }}>
              Bar Forecast
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Predicted conditions for tonight</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: C.faint }}>Updated</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>11:04 PM</div>
          </div>
        </div>

        {/* Tonight summary strip */}
        <div style={{ display: "flex", gap: 8, marginTop: 14, padding: "10px 14px", background: "#F2F0EB", borderRadius: 12 }}>
          <div style={{ fontSize: 16 }}>📍</div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
            <span style={{ color: C.ink, fontWeight: 600 }}>Fort Mill, SC</span> · Friday night · 4 bars tracked · <span style={{ color: C.green, fontWeight: 600 }}>2 with no cover</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, padding: "12px 20px", overflowX: "auto", scrollbarWidth: "none", background: C.card, borderBottom: `1px solid ${C.border}` }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            flexShrink: 0, padding: "6px 14px", borderRadius: 20, fontSize: 12,
            border: `1px solid ${filter === f.id ? C.greenBorder : C.border}`,
            background: filter === f.id ? C.greenLight : "transparent",
            color: filter === f.id ? C.greenDark : C.muted,
            fontWeight: filter === f.id ? 600 : 400,
            cursor: "pointer", fontFamily: "system-ui", transition: "all 0.15s",
            whiteSpace: "nowrap",
          }}>{f.label}</button>
        ))}
      </div>

      {/* Bar cards */}
      <div style={{ padding: "16px 16px 24px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.faint, fontSize: 14 }}>
            No bars match this filter right now
          </div>
        ) : (
          filtered.map(bar => (
            <BarForecastCard
              key={bar.id}
              bar={bar}
              expanded={expanded === bar.id}
              onToggle={() => setExpanded(expanded === bar.id ? null : bar.id)}
            />
          ))
        )}

        {/* Data note */}
        <div style={{ textAlign: "center", fontSize: 11, color: C.faint, lineHeight: 1.6, marginTop: 8 }}>
          Forecasts are based on historical community ratings and real-time data. Accuracy improves with more ratings.
        </div>
      </div>
    </div>
  );
}
