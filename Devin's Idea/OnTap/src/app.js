// =============================================================
// OnTap — frontend demo logic
// All mock data and UI behavior lives here. No backend.
// =============================================================

// ---- Mock data -----------------------------------------------
// 11 real venues pulled from OpenStreetMap via Overpass API
// (https://overpass-api.de) — query: amenity=bar|pub|nightclub within
// 600m of Five Points center. Crowd / cover / deal / vibe / posts are
// mock for the demo; in production they come from Supabase real-time.
const BARS = [
  { id: 1,  name: "Group Therapy",          type: "bar",  lat: 34.00064, lng: -81.01625, crowd: "packed", music: "Hip-Hop",      cover: 5,  line: "~10 min", deal: "$3 fireballs til 11pm",  vibe: "Hype",  posts: 52, address: "2107 Greene St",   emoji: "🎤" },
  { id: 2,  name: "Pinch",                  type: "bar",  lat: 33.99851, lng: -81.01550, crowd: "busy",   music: "EDM",          cover: 10, line: "~5 min",  deal: null,                     vibe: "Dance", posts: 35, address: "Harden St",        emoji: "🪩" },
  { id: 3,  name: "Rooftop",                type: "club", lat: 33.99841, lng: -81.01546, crowd: "packed", music: "EDM",          cover: 10, line: "30+ min", deal: "Bottle service available",vibe: "Dance", posts: 58, address: "Harden St",        emoji: "🌃" },
  { id: 4,  name: "Jake's at 5 Points",     type: "bar",  lat: 33.99861, lng: -81.01502, crowd: "packed", music: "Country",      cover: 5,  line: "~15 min", deal: "$4 wells til 10pm",      vibe: "Hype",  posts: 47, address: "2112 Devine St",   emoji: "🤠" },
  { id: 5,  name: "Bar None",               type: "bar",  lat: 33.99809, lng: -81.01518, crowd: "chill",  music: "Indie",        cover: 0,  line: "no line", deal: "$8 craft cocktails",     vibe: "Chill", posts: 14, address: "Harden St",        emoji: "🥃" },
  { id: 6,  name: "Saloon at Five Points",  type: "club", lat: 34.00084, lng: -81.01647, crowd: "packed", music: "Country",      cover: 5,  line: "~20 min", deal: "Line dancing til 11pm",  vibe: "Hype",  posts: 41, address: "Harden St",        emoji: "🐴" },
  { id: 7,  name: "CJ's",                   type: "bar",  lat: 33.99987, lng: -81.01720, crowd: "busy",   music: "Top 40",       cover: 5,  line: "~5 min",  deal: "Karaoke til midnight",   vibe: "Hype",  posts: 26, address: "Harden St",        emoji: "🎶" },
  { id: 8,  name: "Jack Brown's",           type: "bar",  lat: 33.99914, lng: -81.01642, crowd: "chill",  music: "Rock",         cover: 0,  line: "no line", deal: "$5 burger + beer combo", vibe: "Chill", posts: 22, address: "711 Harden St",    emoji: "🍔" },
  { id: 9,  name: "Publick House",          type: "bar",  lat: 33.99893, lng: -81.01180, crowd: "chill",  music: "Pub mix",      cover: 0,  line: "no line", deal: "$3 draft pints",         vibe: "Chill", posts: 11, address: "Devine St",        emoji: "🍺" },
  { id: 10, name: "Lucky's of Columbia",    type: "bar",  lat: 33.99864, lng: -81.01555, crowd: "busy",   music: "Mixed",        cover: 0,  line: "~5 min",  deal: "$2 PBR + shot specials", vibe: "Dive",  posts: 29, address: "Harden St",        emoji: "🍀" },
  { id: 11, name: "Breakers Live",          type: "club", lat: 34.00064, lng: -81.01702, crowd: "packed", music: "Top 40 / EDM", cover: 10, line: "~25 min", deal: null,                     vibe: "Dance", posts: 73, address: "2009 Greene St",   emoji: "🎵" },
  { id: 12, name: "CB18 Bar and Grill",     type: "bar",  lat: 34.00048, lng: -81.01699, crowd: "packed", music: "Top 40 / Hip-Hop", cover: 5, line: "~15 min", deal: "18+ til midnight",     vibe: "Hype",  posts: 81, address: "Greene St",        emoji: "🎓" },
  { id: 13, name: "Salty Nut Cafe",         type: "bar",  lat: 33.99948, lng: -81.01835, crowd: "chill",  music: "Mixed",            cover: 0, line: "no line", deal: "$5 build-a-burger til 1am", vibe: "Chill", posts: 19, address: "2000 Greene St",   emoji: "🥜" },
];

const FRIENDS = [
  { name: "Sarah", initial: "S", color: "#ff5470", barId: 1,  mins: 12, status: "at" },           // Group Therapy
  { name: "Mike",  initial: "M", color: "#00f5d4", barId: 11, mins: 8,  status: "at" },           // Breakers Live
  { name: "Jess",  initial: "J", color: "#ffd166", barId: null, mins: 25, status: "pregaming" },
  { name: "Tom",   initial: "T", color: "#a78bfa", barId: 3,  mins: 5,  status: "at" },           // Rooftop
  { name: "Em",    initial: "E", color: "#38d9a9", barId: null, mins: 0, status: "heading-out" },
];

const ARCHIVE = [
  { date: "Last Friday",     bars: ["Group Therapy", "Lucky's"],                                       friends: ["Sarah", "Mike"],      photos: 14, vibe: "Gamecock pregame → Five Points" },
  { date: "Last Saturday",   bars: ["Pinch", "Breakers Live", "Rooftop"],                               friends: ["Tom", "Em", "Sarah"], photos: 23, vibe: "Dance till 2am" },
  { date: "Two Fridays ago", bars: ["Publick House", "Bar None"],                                       friends: ["Mike"],               photos: 8,  vibe: "Chill craft beer" },
  { date: "Bid day",         bars: ["Group Therapy", "Jake's at 5 Points", "Breakers Live", "Pinch"],   friends: ["Crew of 8"],          photos: 47, vibe: "🍻🍻🍻" },
];

// =============================================================
// Theme handling (persists in localStorage, swaps map tiles)
// =============================================================
const TILE_DARK  = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_LIGHT = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

let activeTileLayer = null;

function getTheme() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("ontap-theme", theme);
  if (map) updateMapTiles();
}

function toggleTheme() {
  applyTheme(getTheme() === "dark" ? "light" : "dark");
}

function updateMapTiles() {
  if (activeTileLayer) map.removeLayer(activeTileLayer);
  const url = getTheme() === "dark" ? TILE_DARK : TILE_LIGHT;
  activeTileLayer = L.tileLayer(url, {
    attribution: '&copy; OpenStreetMap, &copy; CARTO',
    subdomains: "abcd",
    maxZoom: 20,
  }).addTo(map);
}

// On load: apply saved theme if any
const savedTheme = localStorage.getItem("ontap-theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
document.getElementById("themeToggle").addEventListener("click", toggleTheme);

// =============================================================
// Map setup with custom pins
// =============================================================
const map = L.map("leaflet-map", {
  center: [33.99940, -81.01595],
  zoom: 16,
  zoomControl: false,
  attributionControl: true,
});
updateMapTiles();

const markers = [];

function makePin(bar) {
  const typeClass = bar.type === "club" ? "is-club" : "is-bar";
  const html = `<div class="bar-pin crowd-${bar.crowd} ${typeClass}"><span class="pin-emoji">${bar.emoji}</span></div>`;
  return L.divIcon({
    html,
    className: "pin-wrapper",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
}

function placeMarkers(filterFn) {
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;
  BARS.filter(filterFn).forEach(bar => {
    const m = L.marker([bar.lat, bar.lng], { icon: makePin(bar) }).addTo(map);
    m.on("click", () => openBarSheet(bar));
    markers.push(m);
  });
}

placeMarkers(() => true);

// Filter chips
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    if (f === "all")           placeMarkers(() => true);
    else if (f === "deal")     placeMarkers(b => !!b.deal);
    else if (f === "no-cover") placeMarkers(b => b.cover === 0);
    else if (f === "bars")     placeMarkers(b => b.type === "bar");
    else if (f === "clubs")    placeMarkers(b => b.type === "club");
    else                       placeMarkers(b => b.crowd === f);
  });
});

// =============================================================
// Bottom nav (screen switching)
// =============================================================
document.querySelectorAll(".nav-btn[data-screen]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.screen;
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(target).classList.add("active");
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (target === "map-screen") setTimeout(() => map.invalidateSize(), 50);
  });
});

// =============================================================
// Bar sheet (slide-up detail panel)
// =============================================================
const sheet = document.getElementById("barSheet");
let currentBar = null;

function openBarSheet(bar) {
  currentBar = bar;
  document.getElementById("bsName").textContent  = bar.name;
  document.getElementById("bsAddr").textContent  = bar.address;
  const typeEl = document.getElementById("bsType");
  typeEl.textContent = bar.type === "club" ? "🪩 Club" : "🍺 Bar";
  typeEl.className = "chip-strong type-" + bar.type;
  document.getElementById("bsVibe").textContent  = bar.vibe;
  const crowdEl = document.getElementById("bsCrowd");
  crowdEl.textContent = capitalize(bar.crowd);
  crowdEl.className = "chip-strong crowd-" + bar.crowd;
  document.getElementById("bsPosts").textContent = bar.posts;
  document.getElementById("bsCover").textContent = bar.cover === 0 ? "No cover" : "$" + bar.cover;
  document.getElementById("bsLine").textContent  = bar.line;
  document.getElementById("bsMusic").textContent = bar.music;
  const dealBlock = document.getElementById("bsDealBlock");
  if (bar.deal) {
    dealBlock.classList.remove("empty");
    document.getElementById("bsDeal").textContent = bar.deal;
  } else {
    dealBlock.classList.add("empty");
  }
  // Reset confirm-button states
  document.querySelectorAll(".ot-confirm").forEach(b => b.classList.remove("tapped"));
  sheet.classList.add("open");
}

function closeBarSheet() {
  sheet.classList.remove("open");
  currentBar = null;
}

document.getElementById("closeSheet").addEventListener("click", closeBarSheet);

// One-tap "confirm" buttons (the core mechanic)
document.querySelectorAll(".ot-confirm").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.add("tapped");
    btn.textContent = "✓ Confirmed";
  });
});
document.querySelectorAll(".ot-correct").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("In production: opens a small editor for this stat. (Demo stub.)");
  });
});

// =============================================================
// Check-in flow
// =============================================================
const checkinModal = document.getElementById("checkinModal");

function openCheckinModal(bar) {
  document.getElementById("ciBarName").textContent = bar ? bar.name : "Nearby spot";
  const old = bar ? bar.posts : 0;
  document.getElementById("ciOld").textContent = old;
  document.getElementById("ciNew").textContent = old + 1;
  if (bar) bar.posts += 1;
  checkinModal.classList.add("open");
  closeBarSheet();
}

document.getElementById("checkInBtn").addEventListener("click", () => openCheckinModal(currentBar));
document.getElementById("quickCheckIn").addEventListener("click", () => {
  // Quick check-in uses the closest packed bar as a demo target
  const closest = BARS.find(b => b.crowd === "packed") || BARS[0];
  openCheckinModal(closest);
});
document.getElementById("closeCheckin").addEventListener("click", () => {
  checkinModal.classList.remove("open");
  // Refresh the live count on map screen
  document.getElementById("livePosts").textContent =
    BARS.reduce((sum, b) => sum + b.posts, 0);
});

// =============================================================
// Splash modal (signup demo)
// =============================================================
const splashModal = document.getElementById("splashModal");
document.getElementById("showSplashBtn").addEventListener("click", () => splashModal.classList.add("open"));
document.getElementById("closeSplash").addEventListener("click", () => splashModal.classList.remove("open"));

// =============================================================
// Friends list rendering
// =============================================================
function renderFriends() {
  const list = document.getElementById("friendsList");
  list.innerHTML = "";
  FRIENDS.forEach(f => {
    const bar = f.barId ? BARS.find(b => b.id === f.barId) : null;
    let statusHtml = "";
    let dotClass = "status-dot";
    if (f.status === "at" && bar) {
      statusHtml = `at <span class="where">${bar.name}</span>`;
    } else if (f.status === "pregaming") {
      statusHtml = `pregaming`;
      dotClass += " pregaming";
    } else {
      statusHtml = `heading out soon`;
      dotClass += " heading";
    }
    const time = f.mins > 0 ? `${f.mins}m ago` : "now";
    const card = document.createElement("div");
    card.className = "friend-card";
    card.innerHTML = `
      <div class="avatar" style="background:${f.color}">${f.initial}</div>
      <div class="friend-info">
        <div class="friend-name">${f.name}</div>
        <div class="friend-status">${statusHtml}</div>
      </div>
      <div class="friend-time">${time}</div>
      <div class="${dotClass}"></div>
    `;
    if (bar) card.addEventListener("click", () => {
      // Switch to map screen + open the bar
      document.querySelector('.nav-btn[data-screen="map-screen"]').click();
      setTimeout(() => openBarSheet(bar), 200);
    });
    list.appendChild(card);
  });
}
renderFriends();

// =============================================================
// Archive rendering
// =============================================================
function renderArchive() {
  const list = document.getElementById("archiveList");
  list.innerHTML = "";
  ARCHIVE.forEach(a => {
    const card = document.createElement("div");
    card.className = "archive-card";
    card.innerHTML = `
      <div class="archive-date">${a.date}</div>
      <div class="archive-vibe">${a.vibe}</div>
      <div class="archive-meta">
        <strong>${a.bars.length} bar${a.bars.length === 1 ? "" : "s"}:</strong> ${a.bars.join(" · ")}<br/>
        <strong>With:</strong> ${a.friends.join(", ")} · <strong>${a.photos} photos</strong>
      </div>
      <div class="archive-photos">
        ${Array.from({ length: 4 }, () => `<div class="archive-photo">${randomEmoji()}</div>`).join("")}
      </div>
    `;
    list.appendChild(card);
  });
}
renderArchive();

// =============================================================
// Helpers
// =============================================================
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function randomEmoji() {
  const choices = ["🍻", "🎉", "🎶", "📸", "💃", "🌃", "✨", "🎤"];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Initial live counts
document.getElementById("livePosts").textContent = BARS.reduce((sum, b) => sum + b.posts, 0);
document.getElementById("liveBars").textContent = BARS.length;
