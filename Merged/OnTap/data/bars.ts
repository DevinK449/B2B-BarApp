export type Bar = {
  id: number;
  name: string;
  type: string;
  distance: string;
  score: number;
  crowd: string;
  crowdClass: "good" | "mid" | "bad";
  cover: string;
  coverClass: "good" | "mid" | "bad";
  line: string;
  lineClass: "good" | "mid" | "bad";
  friends: string[];
  live: boolean;
  music: string;
  forecast: { hour: string; busy: number }[];
  deals: { title: string; desc: string }[];
  bestTime: string;
  insight: string;
};

export const BARS: Bar[] = [
  {
    id: 1,
    name: "The Rusty Anchor",
    type: "Sports bar",
    distance: "0.3 mi",
    score: 8.4,
    crowd: "Busy",
    crowdClass: "good",
    cover: "Free",
    coverClass: "good",
    line: "~5 min",
    lineClass: "good",
    friends: ["JR", "KM", "TL"],
    live: true,
    music: "Hip-hop",
    forecast: [
      { hour: "9p", busy: 32 },
      { hour: "10p", busy: 68 },
      { hour: "11p", busy: 88 },
      { hour: "12a", busy: 95 },
      { hour: "1a", busy: 72 },
    ],
    deals: [
      { title: "$3 well shots til 11pm", desc: "Posted by The Rusty Anchor · 2h ago" },
      { title: "$2 off draft beers", desc: "All night for game watchers" },
    ],
    bestTime: "before 10 PM",
    insight: "Same vibe early, no line, free cover stays all night.",
  },
  {
    id: 2,
    name: "Craft & Crown",
    type: "Cocktail bar",
    distance: "0.6 mi",
    score: 9.1,
    crowd: "Packed",
    crowdClass: "mid",
    cover: "$10",
    coverClass: "mid",
    line: "~25 min",
    lineClass: "bad",
    friends: ["KM"],
    live: true,
    music: "House",
    forecast: [
      { hour: "9p", busy: 45 },
      { hour: "10p", busy: 78 },
      { hour: "11p", busy: 96 },
      { hour: "12a", busy: 90 },
      { hour: "1a", busy: 65 },
    ],
    deals: [
      { title: "$8 craft cocktail of the night", desc: "Featured: Smoked Old Fashioned" },
    ],
    bestTime: "8–9 PM",
    insight: "Cover jumps to $10 after 10 PM — go early and save.",
  },
  {
    id: 3,
    name: "The Tap House",
    type: "Brewery",
    distance: "0.8 mi",
    score: 7.6,
    crowd: "Chill",
    crowdClass: "good",
    cover: "Free",
    coverClass: "good",
    line: "None",
    lineClass: "good",
    friends: [],
    live: false,
    music: "Indie",
    forecast: [
      { hour: "9p", busy: 22 },
      { hour: "10p", busy: 40 },
      { hour: "11p", busy: 55 },
      { hour: "12a", busy: 48 },
      { hour: "1a", busy: 30 },
    ],
    deals: [
      { title: "Flight of 4 brews — $12", desc: "All in-house brews" },
    ],
    bestTime: "all night",
    insight: "Easy hang, never gets crazy. Bring a date.",
  },
  {
    id: 4,
    name: "Neon Underground",
    type: "Club",
    distance: "1.1 mi",
    score: 8.0,
    crowd: "Packed",
    crowdClass: "mid",
    cover: "$15",
    coverClass: "bad",
    line: "~30 min",
    lineClass: "bad",
    friends: ["AS"],
    live: true,
    music: "EDM",
    forecast: [
      { hour: "9p", busy: 18 },
      { hour: "10p", busy: 55 },
      { hour: "11p", busy: 85 },
      { hour: "12a", busy: 98 },
      { hour: "1a", busy: 92 },
    ],
    deals: [
      { title: "Ladies free til 11", desc: "Cover for guys after 10pm" },
    ],
    bestTime: "before 10 PM",
    insight: "Skip the cover, leave before peak chaos.",
  },
];

export const FRIENDS_OUT = [
  { initials: "JR", name: "Jake Reeves", bar: "The Rusty Anchor", when: "30 min ago", color: 1 },
  { initials: "KM", name: "Kim Marsh", bar: "Craft & Crown", when: "12 min ago", color: 2 },
  { initials: "TL", name: "Tom Liu", bar: "The Rusty Anchor", when: "18 min ago", color: 3 },
];

export const ARCHIVE = [
  { date: "Apr 26", bar: "The Rusty Anchor", with: "Jake, Kim", photos: 3, vibe: "🔥" },
  { date: "Apr 19", bar: "Craft & Crown", with: "Solo", photos: 1, vibe: "😊" },
  { date: "Apr 12", bar: "The Rusty Anchor", with: "Tom, Ava", photos: 5, vibe: "💃" },
  { date: "Apr 5", bar: "The Tap House", with: "Kim", photos: 2, vibe: "😊" },
];
