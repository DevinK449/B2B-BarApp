import { useState, useEffect } from "react";

const bars = {
  name: "The Rusty Anchor",
  type: "Sports bar",
  distance: "0.3 mi",
  hours: "Open until 2:00 AM",
  score: 8.4,
  ratings: 14,
  stats: [
    { label: "Line wait", val: "No line", sub: "Updated 4 min ago", cls: "g" },
    { label: "Cover charge", val: "Free tonight", sub: "Updated 12 min ago", cls: "g" },
    { label: "Drink prices", val: "$$ · Moderate", sub: "$6–$9 avg per drink", cls: "y" },
    { label: "Crowd level", val: "Medium", sub: "Getting busier", cls: "y" },
  ],
  hours_data: [
    { label: "8p", val: 15 }, { label: "9p", val: 35 }, { label: "10p", val: 55 },
    { label: "11p", val: 75 }, { label: "12a", val: 85 }, { label: "1a", val: 70 },
    { label: "Now", val: 60 },
  ],
  friends: [
    { initials: "JR", name: "Jake Reeves", detail: "Checked in 8 min ago · Vibe 9/10", color: "#B5D4F4", text: "#0C447C" },
    { initials: "KM", name: "Kim Marsh", detail: "Checked in 34 min ago", color: "#F4C0D1", text: "#72243E" },
  ],
  tags: ["Sports on all screens", "Good for groups", "Loud", "Pool tables", "Happy hour til 7", "Draft beers"],
  reviews: [
    { time: "8 min ago", vibe: 9, body: "Game is on every screen, no wait to get in. Great energy tonight.", pills: ["No line", "Free cover", "$$"] },
    { time: "31 min ago", vibe: 8, body: "Getting crowded but still good. Bartenders are fast.", pills: ["No line", "Free cover", "$$"] },
    { time: "1 hr ago", vibe: 7, body: "Pretty dead earlier but picking up now. Good happy hour prices.", pills: ["No line", "Free cover", "$"] },
  ],
};

const colors = { g: "#1D9E75", y: "#BA7517", r: "#E24B4A" };

export default function App() {
  const [barFill, setBarFill] = useState(0);
  const [barHeights, setBarHeights] = useState(bars.hours_data.map(() => 0));
  const [rated, setRated] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBarFill(84), 300);
    const timers = bars.hours_data.map((d, i) =>
      setTimeout(() => setBarHeights(prev => {
        const next = [...prev];
        next[i] = Math.round(d.val * 0.48);
        return next;
      }), 200 + i * 60)
    );
    return () => { clearTimeout(t1); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 390, margin: "0 auto", background: "#fff", borderRadius: 12, border: "0.5px solid #e0e0e0", overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 180, background: "#3B6D11", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55))" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "14px 16px", width: "100%" }}>
          <div style={{ fontSize: 20, fontWeight: 500, color: "#fff", marginBottom: 3 }}>{bars.name}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{bars.type} · {bars.distance} · {bars.hours}</div>
        </div>
      </div>

      {/* Score row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "0.5px solid #e8e8e8" }}>
        <div style={{ fontSize: 36, fontWeight: 500, color: "#1D9E75", lineHeight: 1 }}>{bars.score}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Vibe score tonight</div>
          <div style={{ height: 6, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${barFill}%`, background: "#1D9E75", borderRadius: 3, transition: "width 0.8s ease" }} />
          </div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Based on {bars.ratings} live ratings</div>
        </div>
        <div style={{ background: "#FCEBEB", color: "#A32D2D", fontSize: 11, padding: "4px 10px", borderRadius: 10, fontWeight: 500, display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
          <div style={{ width: 6, height: 6, background: "#E24B4A", borderRadius: "50%" }} />Live
        </div>
      </div>

      {/* Stat grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 8, padding: "14px 16px", borderBottom: "0.5px solid #e8e8e8" }}>
        {bars.stats.map((s, i) => (
          <div key={i} style={{ background: "#f8f8f6", borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: colors[s.cls] }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Busyness chart */}
      <div style={{ padding: "14px 16px", borderBottom: "0.5px solid #e8e8e8" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Busyness tonight</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
          {bars.hours_data.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", height: barHeights[i], background: i === 6 ? "#1D9E75" : "#C0DD97", borderRadius: "3px 3px 0 0", transition: "height 0.6s ease" }} />
              <div style={{ fontSize: 9, color: i === 6 ? "#1D9E75" : "#aaa" }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Friends */}
      <div style={{ padding: "14px 16px", borderBottom: "0.5px solid #e8e8e8" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Friends here now</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {bars.friends.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: f.color, color: f.text, fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{f.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: "#aaa" }}>{f.detail}</div>
              </div>
              <button style={{ fontSize: 12, color: "#1D9E75", background: "#E1F5EE", border: "none", borderRadius: 20, padding: "5px 12px", cursor: "pointer", whiteSpace: "nowrap" }}>Join</button>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ padding: "14px 16px", borderBottom: "0.5px solid #e8e8e8" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Tags</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {bars.tags.map((t, i) => (
            <span key={i} style={{ fontSize: 12, background: "#f8f8f6", borderRadius: 20, padding: "5px 12px", color: "#666", border: "0.5px solid #e8e8e8" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding: "14px 16px", borderBottom: "0.5px solid #e8e8e8" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Recent ratings</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {bars.reviews.map((r, i) => (
            <div key={i} style={{ border: "0.5px solid #e8e8e8", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Anonymous · {r.time}</span>
                <span style={{ fontSize: 11, color: "#888" }}>Vibe {r.vibe}/10</span>
              </div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{r.body}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                {r.pills.map((p, j) => <span key={j} style={{ fontSize: 10, background: "#f8f8f6", borderRadius: 10, padding: "2px 8px", color: "#888" }}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro banner */}
      <div style={{ margin: "14px 16px 0", background: "#E1F5EE", border: "0.5px solid #5DCAA5", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 20 }}>⭐</div>
        <div style={{ flex: 1, fontSize: 12, color: "#0F6E56", lineHeight: 1.4 }}>Barbuddy Pro — see full 30-day history, cover predictions & VIP specials</div>
        <button style={{ fontSize: 11, fontWeight: 500, color: "#0F6E56", background: "#9FE1CB", border: "none", borderRadius: 20, padding: "5px 10px", cursor: "pointer", whiteSpace: "nowrap" }}>Try free</button>
      </div>

      {/* CTA row */}
      <div style={{ display: "flex", gap: 8, padding: "14px 16px 16px" }}>
        <button onClick={() => setRated(true)} style={{ flex: 1, padding: 11, background: rated ? "#0F6E56" : "#1D9E75", color: "#E1F5EE", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          {rated ? "Rating submitted ✓" : "Rate this bar now"}
        </button>
        <button style={{ padding: "11px 16px", background: "none", border: "0.5px solid #ccc", borderRadius: 8, fontSize: 14, color: "#666", cursor: "pointer" }}>Share</button>
      </div>
    </div>
  );
}
