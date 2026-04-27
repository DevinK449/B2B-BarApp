import { useState, useRef } from "react";

const GREEN = "#1D9E75";
const GREEN_LIGHT = "#E1F5EE";
const GREEN_MID = "#5DCAA5";
const GREEN_DARK = "#0F6E56";
const AMBER = "#BA7517";
const RED = "#E24B4A";
const GRAY_BG = "#f8f8f6";
const BORDER = "#e8e8e8";

const MENU_CATEGORIES = [
  {
    id: "specials",
    label: "Tonight's specials",
    owner: true,
    items: [
      { name: "Anchor IPA draft", desc: "Local craft, rotating tap", price: "$5", badge: "Deal" },
      { name: "Whiskey shots", desc: "Well whiskey all night", price: "$4", badge: "Deal" },
      { name: "Nachos basket", desc: "Chips, cheese, jalapeños", price: "$8", badge: null },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    owner: true,
    items: [
      { name: "Draft beers", desc: "8 taps, ask your bartender", price: "$5–$8", badge: null },
      { name: "Cocktails", desc: "House classics & seasonals", price: "$9–$13", badge: null },
      { name: "Wine", desc: "Red, white, rosé by glass", price: "$8–$11", badge: null },
      { name: "Shots", desc: "Well & premium options", price: "$4–$7", badge: null },
      { name: "Non-alcoholic", desc: "Sodas, juice, sparkling water", price: "$2–$3", badge: null },
    ],
  },
  {
    id: "food",
    label: "Food",
    owner: true,
    items: [
      { name: "Wings (10pc)", desc: "Choice of 6 sauces", price: "$13", badge: null },
      { name: "Loaded fries", desc: "Cheese, bacon, sour cream", price: "$9", badge: null },
      { name: "Sliders (3pc)", desc: "Beef, served with fries", price: "$12", badge: null },
      { name: "Pretzel bites", desc: "Served with beer cheese dip", price: "$7", badge: null },
    ],
  },
];

const INITIAL_PHOTOS = [
  { id: 1, label: "Drinks menu", user: "Owner · verified", color: "#3B6D11", isOwner: true },
  { id: 2, label: "Food menu", user: "Owner · verified", color: "#085041", isOwner: true },
  { id: 3, label: "Happy hour board", user: "Uploaded by Jake R.", color: "#0F6E56", isOwner: false },
];

function Badge({ text }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 500, background: GREEN_LIGHT, color: GREEN_DARK, borderRadius: 10, padding: "2px 7px", marginLeft: 6, whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, padding: "10px 4px", fontSize: 13, fontWeight: active ? 500 : 400,
        color: active ? GREEN : "#888", background: "none", border: "none",
        borderBottom: active ? `2px solid ${GREEN}` : "2px solid transparent",
        cursor: "pointer", fontFamily: "system-ui, sans-serif", transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function PhotoCard({ photo, onDelete }) {
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `0.5px solid ${BORDER}` }}>
      <div style={{ height: 100, background: photo.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {photo.isOwner ? (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="6" width="24" height="18" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
            <circle cx="14" cy="15" r="5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
            <path d="M10 6l1.5-3h5L18 6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="6" width="24" height="18" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
            <circle cx="14" cy="15" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
            <path d="M10 6l1.5-3h5L18 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        )}
      </div>
      <div style={{ padding: "8px 10px", background: "#fff" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#222", marginBottom: 2 }}>{photo.label}</div>
        <div style={{ fontSize: 10, color: "#aaa", display: "flex", alignItems: "center", gap: 4 }}>
          {photo.isOwner && <span style={{ color: GREEN, fontWeight: 500 }}>✓</span>}
          {photo.user}
        </div>
      </div>
      {!photo.isOwner && (
        <button
          onClick={() => onDelete(photo.id)}
          style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, background: "rgba(0,0,0,0.45)", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

function UploadZone({ onUpload }) {
  const fileRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleFile = () => {
    onUpload();
    fileRef.current.value = "";
  };

  return (
    <div
      onClick={() => fileRef.current.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); onUpload(); }}
      style={{
        border: `1.5px dashed ${dragging ? GREEN : BORDER}`,
        borderRadius: 10, padding: "20px 16px", textAlign: "center",
        cursor: "pointer", background: dragging ? GREEN_LIGHT : GRAY_BG,
        transition: "all 0.15s",
      }}
    >
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      <div style={{ marginBottom: 6 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ margin: "0 auto", display: "block" }}>
          <rect x="2" y="6" width="24" height="18" rx="3" stroke={GREEN} strokeWidth="1.5" fill="none"/>
          <circle cx="14" cy="15" r="5" stroke={GREEN} strokeWidth="1.5" fill="none"/>
          <path d="M10 6l1.5-3h5L18 6" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M14 12v6M11 15h6" stroke={GREEN} strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: GREEN, marginBottom: 3 }}>Upload a menu photo</div>
      <div style={{ fontSize: 11, color: "#aaa" }}>Tap to choose or drag an image here</div>
    </div>
  );
}

function MenuSection({ category }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {category.label}
        </div>
        {category.owner && (
          <span style={{ fontSize: 10, color: GREEN_DARK, background: GREEN_LIGHT, borderRadius: 10, padding: "2px 7px", fontWeight: 500 }}>
            ✓ Owner verified
          </span>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 10, overflow: "hidden", border: `0.5px solid ${BORDER}` }}>
        {category.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", padding: "11px 14px",
              background: "#fff", borderBottom: i < category.items.length - 1 ? `0.5px solid ${BORDER}` : "none",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#222", display: "flex", alignItems: "center" }}>
                {item.name}
                {item.badge && <Badge text={item.badge} />}
              </div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{item.desc}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#444", marginLeft: 12, whiteSpace: "nowrap" }}>{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("menu");
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [filterCat, setFilterCat] = useState("all");

  const handleUpload = () => {
    const newPhoto = {
      id: Date.now(),
      label: "Community photo",
      user: "Uploaded by you · just now",
      color: "#1D9E75",
      isOwner: false,
    };
    setPhotos(prev => [...prev, newPhoto]);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const filteredCategories = filterCat === "all"
    ? MENU_CATEGORIES
    : MENU_CATEGORIES.filter(c => c.id === filterCat);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 390, margin: "0 auto", background: "#fff", borderRadius: 12, border: `0.5px solid ${BORDER}`, overflow: "hidden" }}>

      {/* Header */}
      <div style={{ padding: "14px 16px 0", borderBottom: `0.5px solid ${BORDER}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "#3B6D11", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 14V6c0-1.1.9-2 2-2h8a2 2 0 012 2v8" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
              <path d="M1 14h16" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M7 10h4M9 8v4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#111" }}>The Rusty Anchor</div>
            <div style={{ fontSize: 12, color: "#888" }}>Menu & photos</div>
          </div>
          <div style={{ marginLeft: "auto", background: GREEN_LIGHT, color: GREEN_DARK, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 10 }}>
            ✓ Owner verified
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex" }}>
          <Tab label="Menu" active={tab === "menu"} onClick={() => setTab("menu")} />
          <Tab label={`Photos (${photos.length})`} active={tab === "photos"} onClick={() => setTab("photos")} />
        </div>
      </div>

      {/* MENU TAB */}
      {tab === "menu" && (
        <div style={{ padding: "14px 16px 16px" }}>

          {/* Category filter pills */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", marginBottom: 16, paddingBottom: 2 }}>
            {[{ id: "all", label: "All" }, { id: "specials", label: "Specials" }, { id: "drinks", label: "Drinks" }, { id: "food", label: "Food" }].map(c => (
              <button
                key={c.id}
                onClick={() => setFilterCat(c.id)}
                style={{
                  flexShrink: 0, fontSize: 12, padding: "5px 13px", borderRadius: 20,
                  border: `0.5px solid ${filterCat === c.id ? GREEN : BORDER}`,
                  background: filterCat === c.id ? GREEN_LIGHT : "#fff",
                  color: filterCat === c.id ? GREEN_DARK : "#888",
                  cursor: "pointer", fontFamily: "system-ui, sans-serif", whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {filteredCategories.map(cat => <MenuSection key={cat.id} category={cat} />)}

          {/* Suggest an edit */}
          <div style={{ border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1v16M1 9h16" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>Suggest a menu item</div>
              <div style={{ fontSize: 11, color: "#aaa" }}>Help keep this menu accurate</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}

      {/* PHOTOS TAB */}
      {tab === "photos" && (
        <div style={{ padding: "14px 16px 16px" }}>

          {/* Upload success toast */}
          {uploadSuccess && (
            <div style={{ background: GREEN_LIGHT, border: `0.5px solid ${GREEN_MID}`, borderRadius: 8, padding: "9px 14px", fontSize: 13, color: GREEN_DARK, marginBottom: 12, textAlign: "center" }}>
              ✓ Photo uploaded — thanks for contributing!
            </div>
          )}

          {/* Upload zone */}
          <UploadZone onUpload={handleUpload} />

          <div style={{ fontSize: 11, color: "#aaa", textAlign: "center", marginTop: 8, marginBottom: 16 }}>
            Photos are reviewed before appearing publicly
          </div>

          {/* Owner section */}
          <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
            Official photos
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 8, marginBottom: 16 }}>
            {photos.filter(p => p.isOwner).map(p => (
              <PhotoCard key={p.id} photo={p} onDelete={handleDelete} />
            ))}
          </div>

          {/* Community section */}
          <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
            Community photos ({photos.filter(p => !p.isOwner).length})
          </div>
          {photos.filter(p => !p.isOwner).length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0", color: "#bbb", fontSize: 13 }}>
              No community photos yet — be the first!
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 8 }}>
              {photos.filter(p => !p.isOwner).map(p => (
                <PhotoCard key={p.id} photo={p} onDelete={handleDelete} />
              ))}
            </div>
          )}

          {/* Report */}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button style={{ fontSize: 12, color: "#bbb", background: "none", border: "none", cursor: "pointer", fontFamily: "system-ui" }}>
              Report an inappropriate photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
