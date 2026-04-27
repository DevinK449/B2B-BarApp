import { useState, useEffect } from "react";

const C = {
  bg: "#0B0F0D",
  card: "#141A17",
  cardHover: "#1A221E",
  green: "#1D9E75",
  greenLight: "rgba(29,158,117,0.15)",
  greenBorder: "rgba(93,202,165,0.3)",
  greenMid: "#5DCAA5",
  greenDark: "#0F6E56",
  amber: "#F0A500",
  amberLight: "rgba(240,165,0,0.12)",
  red: "#E24B4A",
  border: "rgba(255,255,255,0.07)",
  text: "#EEF2F0",
  muted: "rgba(238,242,240,0.5)",
  faint: "rgba(238,242,240,0.22)",
};

const BARS = [
  { id: 1, name: "The Rusty Anchor", type: "Sports bar", distance: "0.3 mi", score: 8.4, line: "No line", cover: "Free", price: "$$", forecast: "peaking", forecastLabel: "Peaking 10–12a" },
  { id: 2, name: "Craft & Crown", type: "Cocktail bar", distance: "0.6 mi", score: 9.1, line: "~10 min", cover: "$10", price: "$$$", forecast: "rising", forecastLabel: "Rising fast" },
  { id: 3, name: "Neon Patio", type: "Rooftop", distance: "1.1 mi", score: 7.8, line: "30+ min", cover: "$5", price: "$$", forecast: "busy", forecastLabel: "Packed now" },
  { id: 4, name: "Barrel & Vine", type: "Wine bar", distance: "1.4 mi", score: 8.9, line: "No line", cover: "Free", price: "$$", forecast: "chill", forecastLabel: "Chill all night" },
];

const FRIENDS = [
  { id: 1, name: "Jake Reeves", init: "JR", color: "#B5D4F4", tc: "#0C447C", status: "down" },
  { id: 2, name: "Kim Marsh", init: "KM", color: "#F4C0D1", tc: "#72243E", status: "down" },
  { id: 3, name: "Tom Liu", init: "TL", color: "#C0DD97", tc: "#3B6D11", status: "maybe" },
  { id: 4, name: "Ava Santos", init: "AS", color: "#FAC775", tc: "#633806", status: "down" },
  { id: 5, name: "Ben Park", init: "BP", color: "#D4B5F4", tc: "#3A0C7C", status: "maybe" },
];

const VOTES = {
  1: ["JR", "KM", "AS"],
  2: ["TL", "BP", "JR"],
  3: ["KM"],
  4: ["AS", "TL"],
};

function Avatar({ init, color, tc, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, color: tc,
      fontSize: size * 0.33, fontWeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, fontFamily: "system-ui",
    }}>{init}</div>
  );
}

function PrimaryBtn({ label, onClick, disabled, small }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: small ? "9px 18px" : "13px 0",
      width: small ? "auto" : "100%",
      borderRadius: 12, background: disabled ? "rgba(29,158,117,0.2)" : C.green,
      color: disabled ? C.faint : "#fff", border: "none",
      fontSize: small ? 13 : 15, fontWeight: 600,
      fontFamily: "'DM Serif Display', Georgia, serif",
      cursor: disabled ? "default" : "pointer",
      boxShadow: disabled ? "none" : "0 0 20px rgba(29,158,117,0.3)",
      transition: "all 0.2s", letterSpacing: "0.01em",
    }}>{label}</button>
  );
}

function ScoreDot({ score }) {
  const color = score >= 8.5 ? C.green : score >= 7 ? C.amber : C.red;
  return <span style={{ fontSize: 17, fontWeight: 700, color, fontFamily: "system-ui" }}>{score}</span>;
}

// ── SCREEN 1: Plan list / home ─────────────────────────────────────────────
function PlanHome({ onCreate, onOpen }) {
  const plans = [
    { id: 1, name: "Friday night crew 🍻", members: 5, status: "voting", winner: null, bars: 4 },
  ];

  return (
    <div style={{ padding: "20px 20px 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 4 }}>
          Group Plans
        </div>
        <div style={{ fontSize: 13, color: C.muted }}>Decide together, go out smarter</div>
      </div>

      {plans.map(p => (
        <div key={p.id} onClick={() => onOpen(p.id)}
          style={{ background: C.card, border: `1px solid ${C.greenBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14, cursor: "pointer", transition: "border-color 0.2s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>{p.name}</div>
            <div style={{ background: C.amberLight, color: C.amber, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, border: `1px solid rgba(240,165,0,0.3)` }}>
              Voting open
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.muted }}>
            <span>👥 {p.members} members</span>
            <span>🍺 {p.bars} bars in contention</span>
          </div>
          <div style={{ marginTop: 12, height: 1, background: C.border }} />
          <div style={{ marginTop: 10, fontSize: 12, color: C.green }}>Tap to view votes →</div>
        </div>
      ))}

      <button onClick={onCreate} style={{
        width: "100%", padding: "14px 0", borderRadius: 16,
        border: `1px dashed rgba(29,158,117,0.4)`,
        background: "transparent", color: C.green,
        fontSize: 15, cursor: "pointer", fontFamily: "'DM Serif Display', Georgia, serif",
        transition: "all 0.2s",
      }}>
        + Start a new plan
      </button>
    </div>
  );
}

// ── SCREEN 2: Create plan ──────────────────────────────────────────────────
function CreatePlan({ onNext, onBack }) {
  const [name, setName] = useState("Friday night crew 🍻");
  const [invited, setInvited] = useState([1, 2, 3]);
  const toggle = (id) => setInvited(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id]);

  return (
    <div style={{ padding: "20px 20px 28px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.faint, fontSize: 13, cursor: "pointer", fontFamily: "system-ui", marginBottom: 20, padding: 0 }}>← Back</button>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 4 }}>New plan</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>Pick a name and invite your crew</div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.faint, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Plan name</div>
        <input value={name} onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 15, color: C.text, fontFamily: "system-ui", outline: "none", boxSizing: "border-box" }}
          onFocus={e => e.target.style.borderColor = C.greenMid}
          onBlur={e => e.target.style.borderColor = C.border}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: C.faint, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Invite friends</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FRIENDS.map(f => {
            const sel = invited.includes(f.id);
            return (
              <div key={f.id} onClick={() => toggle(f.id)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                background: sel ? C.greenLight : "rgba(255,255,255,0.03)",
                border: `1px solid ${sel ? C.greenBorder : C.border}`,
                borderRadius: 12, cursor: "pointer", transition: "all 0.18s",
              }}>
                <Avatar init={f.init} color={f.color} tc={f.tc} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: f.status === "down" ? C.green : C.amber }}>
                    {f.status === "down" ? "● Down to go out" : "● Maybe tonight"}
                  </div>
                </div>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1.5px solid ${sel ? C.green : C.border}`, background: sel ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                  {sel && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PrimaryBtn label={`Invite ${invited.length} friend${invited.length !== 1 ? "s" : ""} →`} onClick={onNext} disabled={!name || invited.length === 0} />
    </div>
  );
}

// ── SCREEN 3: Pick bars ────────────────────────────────────────────────────
function PickBars({ onNext, onBack }) {
  const [selected, setSelected] = useState([1, 2, 4]);
  const toggle = (id) => setSelected(a => a.includes(id) ? a.filter(x => x !== id) : [...a, id]);

  return (
    <div style={{ padding: "20px 20px 28px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.faint, fontSize: 13, cursor: "pointer", fontFamily: "system-ui", marginBottom: 20, padding: 0 }}>← Back</button>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 4 }}>Add options</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Select bars to put to a vote</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {BARS.map(b => {
          const sel = selected.includes(b.id);
          return (
            <div key={b.id} onClick={() => toggle(b.id)} style={{
              background: sel ? C.greenLight : "rgba(255,255,255,0.03)",
              border: `1px solid ${sel ? C.greenBorder : C.border}`,
              borderRadius: 14, padding: "14px 16px", cursor: "pointer", transition: "all 0.18s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 2 }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{b.type} · {b.distance}</div>
                </div>
                <div style={{ display: "flex", align: "center", gap: 8 }}>
                  <ScoreDot score={b.score} />
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${sel ? C.green : C.border}`, background: sel ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", marginLeft: 8 }}>
                    {sel && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {[`🚶 ${b.line}`, `🎟 ${b.cover}`, `💸 ${b.price}`].map((s, i) => (
                  <span key={i} style={{ fontSize: 11, background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "3px 9px", color: C.muted }}>{s}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <PrimaryBtn label={`Put ${selected.length} bar${selected.length !== 1 ? "s" : ""} to a vote →`} onClick={onNext} disabled={selected.length < 2} />
    </div>
  );
}

// ── SCREEN 4: Voting board ─────────────────────────────────────────────────
function VotingBoard({ onDecide, onBack }) {
  const [myVotes, setMyVotes] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleVote = (id) => {
    if (submitted) return;
    setMyVotes(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);
  };

  const submit = () => setSubmitted(true);

  const allVotes = { ...VOTES };
  if (submitted) {
    myVotes.forEach(id => {
      allVotes[id] = [...(allVotes[id] || []), "You"];
    });
  }

  const maxVotes = Math.max(...Object.values(allVotes).map(v => v.length));

  return (
    <div style={{ padding: "20px 20px 28px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.faint, fontSize: 13, cursor: "pointer", fontFamily: "system-ui", marginBottom: 20, padding: 0 }}>← Back</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>Friday night crew 🍻</div>
        <div style={{ background: C.amberLight, color: C.amber, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, border: `1px solid rgba(240,165,0,0.3)`, whiteSpace: "nowrap", marginTop: 4 }}>Voting</div>
      </div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>5 members · {submitted ? "All voted" : "Waiting on your vote"}</div>

      {/* Member avatars */}
      <div style={{ display: "flex", gap: 10, marginBottom: 22, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 14, border: `1px solid ${C.border}` }}>
        {FRIENDS.map(f => (
          <div key={f.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <Avatar init={f.init} color={f.color} tc={f.tc} size={34} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${C.green}`, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.green, fontWeight: 700 }}>You</div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: submitted ? C.green : C.border }} />
        </div>
      </div>

      {/* Bar vote cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {BARS.slice(0, 3).map(b => {
          const votes = allVotes[b.id] || [];
          const pct = maxVotes > 0 ? votes.length / maxVotes : 0;
          const isTop = votes.length === maxVotes && maxVotes > 0;
          const myVoted = myVotes.includes(b.id);

          return (
            <div key={b.id} onClick={() => toggleVote(b.id)} style={{
              background: isTop ? C.greenLight : "rgba(255,255,255,0.03)",
              border: `1px solid ${isTop ? C.greenBorder : myVoted ? "rgba(93,202,165,0.2)" : C.border}`,
              borderRadius: 14, padding: "14px 16px", cursor: submitted ? "default" : "pointer",
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.text, display: "flex", alignItems: "center", gap: 8 }}>
                    {b.name}
                    {isTop && <span style={{ fontSize: 10, background: C.green, color: "#fff", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>LEADING</span>}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{b.type} · {b.distance}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: isTop ? C.green : C.text }}>{votes.length}</div>
                  <div style={{ fontSize: 10, color: C.faint }}>vote{votes.length !== 1 ? "s" : ""}</div>
                </div>
              </div>

              {/* Vote bar */}
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 10, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct * 100}%`, background: isTop ? C.green : C.greenMid, borderRadius: 3, transition: "width 0.5s ease" }} />
              </div>

              {/* Voter avatars */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  {votes.map((v, i) => {
                    const fr = FRIENDS.find(f => f.init === v);
                    return fr ? (
                      <div key={i} style={{ marginLeft: i > 0 ? -8 : 0, border: `1.5px solid ${C.bg}`, borderRadius: "50%" }}>
                        <Avatar init={fr.init} color={fr.color} tc={fr.tc} size={24} />
                      </div>
                    ) : v === "You" ? (
                      <div key={i} style={{ marginLeft: i > 0 ? -8 : 0, width: 24, height: 24, borderRadius: "50%", border: `1.5px solid ${C.green}`, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: C.green, fontWeight: 700 }}>You</div>
                    ) : null;
                  })}
                </div>
                {!submitted && (
                  <div style={{ fontSize: 12, color: myVoted ? C.green : C.faint }}>
                    {myVoted ? "✓ Voted" : "Tap to vote"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <PrimaryBtn label={myVotes.length > 0 ? `Submit ${myVotes.length} vote${myVotes.length > 1 ? "s" : ""}` : "Select bars to vote"} onClick={submit} disabled={myVotes.length === 0} />
      ) : (
        <button onClick={onDecide} style={{
          width: "100%", padding: 13, background: C.green, color: "#fff",
          border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600,
          fontFamily: "'DM Serif Display', Georgia, serif", cursor: "pointer",
          boxShadow: "0 0 24px rgba(29,158,117,0.35)",
        }}>
          🎉 Lock in The Rusty Anchor →
        </button>
      )}
    </div>
  );
}

// ── SCREEN 5: Decision ─────────────────────────────────────────────────────
function Decision({ onBack }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <div style={{ padding: "20px 20px 32px" }}>
      <div style={{ textAlign: "center", marginBottom: 28, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: 6 }}>The people have spoken!</div>
        <div style={{ fontSize: 14, color: C.muted }}>Tonight's destination is locked in</div>
      </div>

      <div style={{ background: C.greenLight, border: `1.5px solid ${C.greenBorder}`, borderRadius: 18, padding: "20px 20px", marginBottom: 20, opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
        <div style={{ display: "flex", justify: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>The Rusty Anchor</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Sports bar · 0.3 mi away</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.green }}>8.4</div>
            <div style={{ fontSize: 10, color: C.muted }}>vibe score</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 14 }}>
          {[{ label: "Line", val: "No line", good: true }, { label: "Cover", val: "Free", good: true }, { label: "Price", val: "$$", good: false }].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "9px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.faint, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: s.good ? C.green : C.amber }}>{s.val}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
          <div style={{ display: "flex" }}>
            {FRIENDS.slice(0, 3).map((f, i) => (
              <div key={f.id} style={{ marginLeft: i > 0 ? -7 : 0, border: `1.5px solid ${C.card}`, borderRadius: "50%" }}>
                <Avatar init={f.init} color={f.color} tc={f.tc} size={22} />
              </div>
            ))}
          </div>
          Jake, Kim, Tom + 2 others voted for this
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 0.35s" }}>
        <button style={{ flex: 1, padding: 12, background: C.green, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Serif Display', Georgia, serif", boxShadow: "0 0 20px rgba(29,158,117,0.3)" }}>
          Get directions 📍
        </button>
        <button style={{ flex: 1, padding: 12, background: "rgba(255,255,255,0.05)", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 14, cursor: "pointer", fontFamily: "system-ui" }}>
          Share to group 💬
        </button>
      </div>

      <button onClick={onBack} style={{ width: "100%", padding: 11, background: "none", border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 13, color: C.faint, cursor: "pointer", fontFamily: "system-ui" }}>
        Start a new plan
      </button>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function GroupPlanning() {
  const [screen, setScreen] = useState("home");

  const NightDots = () => (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", width: 1.5, height: 1.5, borderRadius: "50%",
          background: `rgba(93,202,165,${0.15 + (i % 4) * 0.08})`,
          top: `${10 + (i * 53) % 80}%`, left: `${8 + (i * 67) % 85}%`,
          animation: `tw ${2.5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite alternate`,
        }} />
      ))}
      <style>{`@keyframes tw { from { opacity: 0.15; } to { opacity: 0.8; } }`}</style>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: 620, maxWidth: 390, margin: "0 auto", borderRadius: 20, border: `0.5px solid ${C.border}`, position: "relative", overflow: "hidden", fontFamily: "system-ui, sans-serif" }}>
      <NightDots />
      <div style={{ position: "relative", zIndex: 1 }}>
        {screen === "home" && <PlanHome onCreate={() => setScreen("create")} onOpen={() => setScreen("vote")} />}
        {screen === "create" && <CreatePlan onNext={() => setScreen("bars")} onBack={() => setScreen("home")} />}
        {screen === "bars" && <PickBars onNext={() => setScreen("vote")} onBack={() => setScreen("create")} />}
        {screen === "vote" && <VotingBoard onDecide={() => setScreen("decision")} onBack={() => setScreen("bars")} />}
        {screen === "decision" && <Decision onBack={() => setScreen("home")} />}
      </div>
    </div>
  );
}
