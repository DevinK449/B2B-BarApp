import { useState } from "react";

const C = {
  green: "#1D9E75",
  greenLight: "#E1F5EE",
  greenMid: "#5DCAA5",
  greenDark: "#0F6E56",
  amber: "#BA7517",
  amberLight: "#FAEEDA",
  red: "#E24B4A",
  redLight: "#FCEBEB",
  bg: "#F7F7F5",
  card: "#FFFFFF",
  border: "#EBEBEB",
  text: "#111111",
  muted: "#777777",
  faint: "#AAAAAA",
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: OverviewIcon },
  { id: "specials", label: "Specials", icon: SpecialsIcon },
  { id: "menu", label: "Menu", icon: MenuIcon },
  { id: "ratings", label: "Ratings", icon: RatingsIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function OverviewIcon({ active }) {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="2" stroke={active ? C.green : C.muted} strokeWidth="1.4"/><rect x="10" y="1" width="7" height="7" rx="2" stroke={active ? C.green : C.muted} strokeWidth="1.4"/><rect x="1" y="10" width="7" height="7" rx="2" stroke={active ? C.green : C.muted} strokeWidth="1.4"/><rect x="10" y="10" width="7" height="7" rx="2" stroke={active ? C.green : C.muted} strokeWidth="1.4"/></svg>;
}
function SpecialsIcon({ active }) {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1l2 5.5H17l-4.5 3.3 1.7 5.5L9 12l-5.2 3.3 1.7-5.5L1 6.5h6z" stroke={active ? C.green : C.muted} strokeWidth="1.4" strokeLinejoin="round"/></svg>;
}
function MenuIcon({ active }) {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M3 9h12M3 13h8" stroke={active ? C.green : C.muted} strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
function RatingsIcon({ active }) {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2C5.13 2 2 5.13 2 9s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z" stroke={active ? C.green : C.muted} strokeWidth="1.4"/><path d="M6 9l2 2 4-4" stroke={active ? C.green : C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function SettingsIcon({ active }) {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke={active ? C.green : C.muted} strokeWidth="1.4"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.1 3.1l1.4 1.4M13.5 13.5l1.4 1.4M3.1 14.9l1.4-1.4M13.5 4.5l1.4-1.4" stroke={active ? C.green : C.muted} strokeWidth="1.4" strokeLinecap="round"/></svg>;
}

function Stat({ label, value, sub, trend, color }) {
  return (
    <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 500, color: color || C.text, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: trend > 0 ? C.green : trend < 0 ? C.red : C.muted }}>
        {trend > 0 ? `↑ ${trend}` : trend < 0 ? `↓ ${Math.abs(trend)}` : ""} {sub}
      </div>
    </div>
  );
}

function MiniBar({ val, max, color }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ width: "100%", height: 48, display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", height: `${Math.round((val / max) * 100)}%`, background: color || C.greenMid, borderRadius: "3px 3px 0 0", minHeight: 4, transition: "height 0.5s ease" }} />
      </div>
    </div>
  );
}

// ─── OVERVIEW ───────────────────────────────────────────────────────────────
function Overview() {
  const hours = [
    { label: "8p", views: 12, checkins: 2 },
    { label: "9p", views: 28, checkins: 6 },
    { label: "10p", views: 55, checkins: 14 },
    { label: "11p", views: 80, checkins: 22 },
    { label: "12a", views: 95, checkins: 28 },
    { label: "1a", views: 62, checkins: 18 },
    { label: "Now", views: 44, checkins: 11 },
  ];
  const maxViews = Math.max(...hours.map(h => h.views));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 }}>
        <Stat label="Profile views tonight" value="376" sub="vs last Fri" trend={42} />
        <Stat label="Check-ins tonight" value="101" sub="vs last Fri" trend={18} />
        <Stat label="Vibe score" value="8.4" sub="from 14 ratings" color={C.green} trend={0.3} />
        <Stat label="Avg wait reported" value="0 min" sub="No line" color={C.green} trend={0} />
      </div>

      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 14 }}>Tonight's traffic</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 64, marginBottom: 8 }}>
          {hours.map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", height: Math.round((h.views / maxViews) * 56), background: i === 6 ? C.green : "#C0DD97", borderRadius: "3px 3px 0 0", minHeight: 4, transition: "height 0.5s" }} />
              <div style={{ fontSize: 9, color: i === 6 ? C.green : C.faint }}>{h.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.muted }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: C.greenMid }} />Profile views
          </div>
        </div>
      </div>

      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 12 }}>Live conditions right now</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Line wait", val: "No line", status: "good" },
            { label: "Cover charge", val: "Free tonight", status: "good" },
            { label: "Crowd level", val: "Medium — getting busier", status: "mid" },
            { label: "Drink prices", val: "$$ · Moderate", status: "mid" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: C.muted }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: row.status === "good" ? C.green : row.status === "mid" ? C.amber : C.red }}>{row.val}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: C.faint }}>Source: community ratings · updated 4 min ago</div>
      </div>

      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 12 }}>This week at a glance</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0,1fr))", gap: 4, marginBottom: 6 }}>
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 9, color: C.faint }}>{d}</div>
          ))}
          {[22, 18, 35, 28, 80, 95, 44].map((v, i) => (
            <div key={i} style={{ height: 36, background: i >= 4 ? C.green : C.greenLight, borderRadius: 4, opacity: 0.3 + (v / 95) * 0.7 }} />
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.faint }}>Profile view intensity by day</div>
      </div>
    </div>
  );
}

// ─── SPECIALS ────────────────────────────────────────────────────────────────
function Specials() {
  const [specials, setSpecials] = useState([
    { id: 1, title: "Draft beers", desc: "All domestic drafts", price: "$5", active: true, ends: "11:00 PM" },
    { id: 2, title: "Whiskey shots", desc: "Well whiskey", price: "$4", active: true, ends: "Close" },
    { id: 3, title: "Wings bucket", desc: "20pc wings + pitcher", price: "$28", active: false, ends: "10:00 PM" },
  ]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "", price: "", ends: "" });
  const [saved, setSaved] = useState(false);

  const toggle = (id) => setSpecials(s => s.map(sp => sp.id === id ? { ...sp, active: !sp.active } : sp));
  const remove = (id) => setSpecials(s => s.filter(sp => sp.id !== id));
  const addSpecial = () => {
    if (!form.title) return;
    setSpecials(s => [...s, { id: Date.now(), ...form, active: true }]);
    setForm({ title: "", desc: "", price: "", ends: "" });
    setAdding(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {saved && <div style={{ background: C.greenLight, border: `0.5px solid ${C.greenMid}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.greenDark, textAlign: "center" }}>✓ Special pushed live to all users</div>}

      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `0.5px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Active specials</div>
          <button onClick={() => setAdding(true)} style={{ fontSize: 12, color: C.green, background: C.greenLight, border: "none", borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontFamily: "system-ui" }}>+ Add special</button>
        </div>
        {specials.map((sp, i) => (
          <div key={sp.id} style={{ padding: "14px 18px", borderBottom: i < specials.length - 1 ? `0.5px solid ${C.border}` : "none", display: "flex", alignItems: "center", gap: 12 }}>
            <div
              onClick={() => toggle(sp.id)}
              style={{ width: 36, height: 20, borderRadius: 10, background: sp.active ? C.green : "#DDD", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}
            >
              <div style={{ position: "absolute", top: 3, left: sp.active ? 18 : 3, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: sp.active ? C.text : C.muted }}>{sp.title}</div>
              <div style={{ fontSize: 12, color: C.faint }}>{sp.desc} · Ends {sp.ends}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: sp.active ? C.green : C.faint }}>{sp.price}</div>
            <button onClick={() => remove(sp.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.faint, padding: 4, fontSize: 16 }}>×</button>
          </div>
        ))}
      </div>

      {adding && (
        <div style={{ background: C.card, border: `1.5px solid ${C.green}`, borderRadius: 12, padding: "16px 18px" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>New special</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { key: "title", label: "Title", placeholder: "e.g. Happy hour drafts" },
              { key: "desc", label: "Description", placeholder: "e.g. All domestic beers" },
              { key: "price", label: "Price", placeholder: "e.g. $5" },
              { key: "ends", label: "Ends at", placeholder: "e.g. 10:00 PM" },
            ].map(f => (
              <div key={f.key}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{f.label}</div>
                <input
                  value={form[f.key]}
                  onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ width: "100%", padding: "8px 12px", border: `0.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontFamily: "system-ui", outline: "none", background: C.bg, color: C.text }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button onClick={addSpecial} style={{ flex: 1, padding: 10, background: C.green, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "system-ui" }}>Push live</button>
              <button onClick={() => setAdding(false)} style={{ padding: "10px 16px", background: "none", border: `0.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.muted, cursor: "pointer", fontFamily: "system-ui" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: C.amberLight, border: `0.5px solid #EF9F27`, borderRadius: 10, padding: "12px 16px", fontSize: 13, color: C.amber, lineHeight: 1.5 }}>
        💡 Tip: Bars that post specials before 9 PM get 2.4× more profile views on Barbuddy.
      </div>
    </div>
  );
}

// ─── MENU EDITOR ─────────────────────────────────────────────────────────────
function MenuEditor() {
  const [items, setItems] = useState([
    { id: 1, cat: "drinks", name: "Draft beers", desc: "8 taps rotating", price: "$5–$8" },
    { id: 2, cat: "drinks", name: "House cocktails", desc: "Classic & seasonal", price: "$9–$13" },
    { id: 3, cat: "drinks", name: "Wine by glass", desc: "Red, white, rosé", price: "$8–$11" },
    { id: 4, cat: "food", name: "Wings (10pc)", desc: "Choice of 6 sauces", price: "$13" },
    { id: 5, cat: "food", name: "Loaded fries", desc: "Cheese, bacon, sour cream", price: "$9" },
    { id: 6, cat: "food", name: "Pretzel bites", desc: "With beer cheese dip", price: "$7" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [activeCat, setActiveCat] = useState("drinks");
  const [saved, setSaved] = useState(false);

  const save = () => { setEditingId(null); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const remove = (id) => setItems(s => s.filter(i => i.id !== id));
  const update = (id, field, val) => setItems(s => s.map(i => i.id === id ? { ...i, [field]: val } : i));
  const addItem = () => {
    const newItem = { id: Date.now(), cat: activeCat, name: "New item", desc: "", price: "" };
    setItems(s => [...s, newItem]);
    setEditingId(newItem.id);
  };

  const filtered = items.filter(i => i.cat === activeCat);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {saved && <div style={{ background: C.greenLight, border: `0.5px solid ${C.greenMid}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.greenDark, textAlign: "center" }}>✓ Menu updated for all users</div>}

      <div style={{ display: "flex", gap: 8 }}>
        {["drinks", "food"].map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)} style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: `0.5px solid ${activeCat === cat ? C.green : C.border}`, background: activeCat === cat ? C.greenLight : C.card, color: activeCat === cat ? C.greenDark : C.muted, fontSize: 13, fontWeight: activeCat === cat ? 500 : 400, cursor: "pointer", fontFamily: "system-ui", textTransform: "capitalize" }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        {filtered.map((item, i) => (
          <div key={item.id} style={{ borderBottom: i < filtered.length - 1 ? `0.5px solid ${C.border}` : "none" }}>
            {editingId === item.id ? (
              <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                {["name", "desc", "price"].map(f => (
                  <input key={f} value={item[f]} onChange={e => update(item.id, f, e.target.value)}
                    placeholder={{ name: "Item name", desc: "Description", price: "Price" }[f]}
                    style={{ padding: "7px 10px", border: `0.5px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: "system-ui", outline: "none", color: C.text, background: C.bg }} />
                ))}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={save} style={{ flex: 1, padding: 8, background: C.green, color: "#fff", border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "system-ui" }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ padding: "8px 14px", background: "none", border: `0.5px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.muted, cursor: "pointer", fontFamily: "system-ui" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ padding: "13px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: C.faint }}>{item.desc}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.muted, marginRight: 8 }}>{item.price}</div>
                <button onClick={() => setEditingId(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.faint, fontSize: 12, padding: "4px 8px" }}>Edit</button>
                <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.faint, fontSize: 18, lineHeight: 1 }}>×</button>
              </div>
            )}
          </div>
        ))}
        <div style={{ padding: "12px 18px", borderTop: filtered.length > 0 ? `0.5px solid ${C.border}` : "none" }}>
          <button onClick={addItem} style={{ width: "100%", padding: 10, background: "none", border: `1px dashed ${C.border}`, borderRadius: 8, fontSize: 13, color: C.green, cursor: "pointer", fontFamily: "system-ui" }}>+ Add item</button>
        </div>
      </div>
    </div>
  );
}

// ─── RATINGS ─────────────────────────────────────────────────────────────────
function Ratings() {
  const [ratings] = useState([
    { id: 1, time: "8 min ago", vibe: 9, body: "Game is on every screen, no wait to get in. Great energy tonight.", pills: ["No line", "Free cover", "$$"], replied: false },
    { id: 2, time: "31 min ago", vibe: 8, body: "Getting crowded but still good. Bartenders are fast.", pills: ["No line", "Free cover", "$$"], replied: false },
    { id: 3, time: "1 hr ago", vibe: 5, body: "Ran out of my drink order twice. Bit chaotic.", pills: ["Short wait", "$5 cover", "$$$"], replied: false },
    { id: 4, time: "2 hrs ago", vibe: 7, body: "Pretty decent spot. Would come back for the draft prices.", pills: ["No line", "Free cover", "$$"], replied: true },
  ]);
  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sentIds, setSentIds] = useState([4]);

  const send = (id) => {
    if (!replyText.trim()) return;
    setSentIds(s => [...s, id]);
    setReplyId(null);
    setReplyText("");
  };

  const avg = (ratings.reduce((a, r) => a + r.vibe, 0) / ratings.length).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 }}>
        <Stat label="Avg vibe score" value={avg} sub="tonight" color={C.green} trend={0} />
        <Stat label="Total ratings" value={ratings.length} sub="tonight" trend={2} />
      </div>

      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `0.5px solid ${C.border}`, fontSize: 13, fontWeight: 500 }}>Recent community ratings</div>
        {ratings.map((r, i) => (
          <div key={r.id} style={{ padding: "14px 18px", borderBottom: i < ratings.length - 1 ? `0.5px solid ${C.border}` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: C.faint }}>Anonymous · {r.time}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: r.vibe >= 7 ? C.green : r.vibe >= 5 ? C.amber : C.red }}>Vibe {r.vibe}/10</span>
            </div>
            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5, marginBottom: 8 }}>{r.body}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              {r.pills.map((p, j) => <span key={j} style={{ fontSize: 10, background: C.bg, borderRadius: 10, padding: "2px 8px", color: C.muted, border: `0.5px solid ${C.border}` }}>{p}</span>)}
            </div>

            {sentIds.includes(r.id) ? (
              <div style={{ fontSize: 12, color: C.green, display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={C.green} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Owner replied
              </div>
            ) : replyId === r.id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Write a public reply..."
                  rows={2}
                  style={{ width: "100%", padding: "8px 10px", border: `0.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "system-ui", resize: "none", outline: "none", background: C.bg, color: C.text, boxSizing: "border-box" }}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => send(r.id)} style={{ flex: 1, padding: 8, background: C.green, color: "#fff", border: "none", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: "system-ui" }}>Post reply</button>
                  <button onClick={() => setReplyId(null)} style={{ padding: "8px 12px", background: "none", border: `0.5px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.muted, cursor: "pointer", fontFamily: "system-ui" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setReplyId(r.id)} style={{ fontSize: 12, color: C.green, background: C.greenLight, border: "none", borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontFamily: "system-ui" }}>Reply publicly</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
function Settings() {
  const [form, setForm] = useState({
    name: "The Rusty Anchor",
    type: "Sports bar",
    address: "123 Main St, Fort Mill, SC",
    hours: "4:00 PM – 2:00 AM",
    phone: "(803) 555-0192",
    website: "rustysbar.com",
  });
  const [saved, setSaved] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {saved && <div style={{ background: C.greenLight, border: `0.5px solid ${C.greenMid}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.greenDark, textAlign: "center" }}>✓ Profile updated</div>}

      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Bar profile</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries({ name: "Bar name", type: "Bar type", address: "Address", hours: "Hours", phone: "Phone", website: "Website" }).map(([k, label]) => (
            <div key={k}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{label}</div>
              <input value={form[k]} onChange={e => update(k, e.target.value)}
                style={{ width: "100%", padding: "8px 12px", border: `0.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontFamily: "system-ui", outline: "none", background: C.bg, color: C.text, boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <button onClick={save} style={{ marginTop: 16, width: "100%", padding: 11, background: C.green, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "system-ui" }}>Save changes</button>
      </div>

      <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "16px 18px" }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Subscription</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 14, color: C.text }}>Barbuddy Business</div>
            <div style={{ fontSize: 12, color: C.muted }}>$99/month · renews Jun 1</div>
          </div>
          <div style={{ background: C.greenLight, color: C.greenDark, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 10 }}>Active</div>
        </div>
        <button style={{ width: "100%", padding: 10, background: "none", border: `0.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.muted, cursor: "pointer", fontFamily: "system-ui" }}>Manage billing</button>
      </div>

      <div style={{ background: C.redLight, border: `0.5px solid #F09595`, borderRadius: 10, padding: "12px 16px" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.red, marginBottom: 4 }}>Danger zone</div>
        <div style={{ fontSize: 12, color: C.red, opacity: 0.8, marginBottom: 10 }}>Removing your listing will delete all analytics data and cannot be undone.</div>
        <button style={{ fontSize: 12, color: C.red, background: "none", border: `0.5px solid ${C.red}`, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontFamily: "system-ui" }}>Remove listing</button>
      </div>
    </div>
  );
}

// ─── SHELL ────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("overview");

  const screens = { overview: Overview, specials: Specials, menu: MenuEditor, ratings: Ratings, settings: Settings };
  const Screen = screens[active];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: C.bg, minHeight: 600, display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: C.card, borderBottom: `0.5px solid ${C.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "#3B6D11", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 13V6a2 2 0 012-2h8a2 2 0 012 2v7" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" strokeLinecap="round" fill="none"/><path d="M0 13h16" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>The Rusty Anchor</div>
            <div style={{ fontSize: 11, color: C.green, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green }} />Owner dashboard
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: C.muted, background: C.bg, border: `0.5px solid ${C.border}`, padding: "5px 10px", borderRadius: 20 }}>
          Fri 10:42 PM
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar nav */}
        <div style={{ width: 180, background: C.card, borderRight: `0.5px solid ${C.border}`, padding: "16px 0", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 18px",
                  background: isActive ? C.greenLight : "none",
                  border: "none", borderLeft: isActive ? `2px solid ${C.green}` : "2px solid transparent",
                  cursor: "pointer", textAlign: "left", fontSize: 13,
                  color: isActive ? C.greenDark : C.muted,
                  fontWeight: isActive ? 500 : 400,
                  fontFamily: "system-ui", transition: "all 0.15s",
                }}
              >
                <Icon active={isActive} />
                {item.label}
              </button>
            );
          })}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "12px 18px", fontSize: 11, color: C.faint }}>Barbuddy Business<br />Plan · $99/mo</div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "20px 20px 28px", overflowY: "auto" }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: C.text, marginBottom: 16 }}>
            {{ overview: "Tonight's overview", specials: "Manage specials", menu: "Edit menu", ratings: "Community ratings", settings: "Bar settings" }[active]}
          </div>
          <Screen />
        </div>
      </div>
    </div>
  );
}
