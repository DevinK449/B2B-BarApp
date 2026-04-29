# Barbuddy — Merged Concept (Devin + Noah)

> Single source of truth combining Devin's strategy doc with Noah's UI prototypes.
> Where the two visions conflict, this doc takes a position and explains why.

---

## One-line pitch

**The live pulse of your night out. Free for users. Bars pay for analytics.**

A real-time, location-based app where bar-goers post the live vibe (crowd, music, deals, line, cover) of the bars they're at. Bars subscribe to see their analytics, post deals, and reach more customers.

---

## Working name

**Barbuddy.** (From Noah's prototype.)

- Already designed around it (logo, color system, onboarding copy)
- Friendly, clear, easy to say
- Action item: trademark search (uspto.gov), App Store search, .com check before locking

Backup shortlist if Barbuddy is taken: **LastCall, OnTap, Tapped, BarPulse, HopIn**.

---

## Conflict resolutions (read this first)

| Issue | Devin's doc | Noah's prototype | **Decision** |
|---|---|---|---|
| Age gate | 18+ | 21+ | **21+** — US legal drinking age, lower legal risk, matches Apple's alcohol app review expectations |
| Posting model | One-tap check-in + bar-confirm | Multi-slider Rate screen | **One-tap is primary; sliders are optional "deep rating"** for power users (5% will use them, that's fine) |
| Visual vibe | Open / "dark/clubby with neon" | Dark green + Georgia serif | **Keep Noah's dark green system** for user app. Owner dashboard stays light (his existing design). Reconsider Georgia serif — feels editorial, may not match nightlife energy. Test both. |
| Score system | "busy / chill / dead" labels | 8.4/10 numeric vibe score | **Both** — show numeric score on map/cards (Noah's UX wins), use word labels in posts (Devin's posting UX wins) |
| Squad/group mode | V2 / future | Already prototyped | **MVP includes Friends panel only.** Full group planning + voting moves to V2 (Noah's screen becomes the V2 spec) |
| Tagline | "BeReal for nightlife" | "The live pulse of your night out" | **Public tagline:** Noah's. **Internal/pitch shorthand:** Devin's. |
| Forecast feature | Not in concept | Full prototype with hourly predictions | **Keep — major differentiator.** This is something BeReal-style apps can't do. Adds to V1.5 (after MVP, before pitch). |

---

## Core concept

A nightlife discovery app driven by live, crowd-sourced data that wipes at close every night. Data is intentionally ephemeral — what's hot tonight is irrelevant tomorrow.

**What users see (free, public):**
- **Discover screen** — list/map of nearby bars with live vibe score (numeric) + tags
- **Bar detail** — current crowd, music, cover, line, deals, friend activity
- **Forecast** — predicted busyness, cover, line by hour (from Noah's prototype) — this is sticky
- **Friends panel** — opt-in mutual contacts, see who's out tonight
- **Your Night Archived** — personal scrapbook of past check-ins
- **Map view** — live activity heat across nearby bars

**What bars see (paid dashboard):**
- Posts and reach for their venue tonight
- Compare to area average
- Peak hours, deal performance, cover/line trends
- Aggregate trends over weeks/months
- Post deals, set tonight's cover, pin specials, manage menu

---

## Posting & engagement model

**The biggest risk:** nobody at the bar wants to fill out a form. People are drinking and dancing — they're not opening apps to type "the music is hip-hop and the cover is $5."

**Solution: bars post the data, users confirm.**

1. **Bar staff posts from the dashboard** at start of shift: tonight's cover, music genre, deals, vibe — pre-set, ~30 seconds.
2. **Users see those posts** and one-tap to confirm or correct ("👍 confirmed cover is $5" / "actually it's $10 now"). 2 seconds.
3. **GPS-detected check-in** with one tap: "I'm at [Bar Name]." Optional vibe emoji (🔥 / 😴 / 💃). Counts toward "47 people here tonight."
4. **Optional deeper rating** (Noah's slider screen) for users who want to go further — vibe / price / crowd / music / service. Surfaces in the bar's Ratings tab. Most users skip it. That's fine.
5. **Photos** — optional bonus, never required. Back-camera only (see Safety).

**Result:** feed is never empty (bars fill it), users do tiny low-friction actions that aggregate into useful intel, the 5% of power users add depth via sliders.

---

## "Selfishly useful" — why users open the app

The app must give users something *for them*, not just ask them to feed data.

- **"Post to unlock the map"** — see what's hot, but only after you check in somewhere. (BeReal lever.)
- **Your Night, Archived** — every night becomes a personal scrapbook. Most-visited bars, photos, who you were out with, year-in-review at NYE. Retention play.
- **Friends Out Tonight** (opt-in, mutual only) — the killer feature. Friend FOMO drives more nightlife decisions than any algorithm.
- **Forecast** (Noah's contribution) — "go to Craft & Crown before 10pm to skip the $10 cover." Genuinely useful, hard to replicate.
- **Streaks** — "5 Fridays in a row out" badge. Optional, light gamification.

---

## Notifications (drives daily opens)

**1. The "Barbuddy moment" — Friday/Saturday push at 9pm**
> "📍 What's your night looking like? Tap to see what's hot tonight."

**2. Friends-driven (opt-in, mutual only)**
> "Sarah just checked in at The Tap House"
> "3 friends are out tonight — see where"

**3. Forecast-driven**
> "Craft & Crown's cover jumps to $10 in 45 min — head there now"
> "The Rusty Anchor is filling up faster than expected — line forming soon"

**4. Smart bar deals (opt-in, throttled)**
> "Bar X: $3 shots til 11pm — 0.4 mi away"

**5. End-of-night recap**
> "Your night: 2 bars, 1 friend out with you, photos saved to your archive ✨"

---

## Monetization

**Single revenue stream: bars pay, users are free forever.**

| Tier | Price | Features |
|---|---|---|
| Free claim | $0 | Bar listed, sees basic post count |
| Basic | $49/mo | Full analytics, post deals, claim profile, menu management |
| Pro | $149/mo | Multi-location, exportable reports, priority placement, forecast insights for owners |
| Sponsored | $199+/mo | Pinned on map, top of "deals tonight" feed |

**Future passive revenue:**
- Rideshare partnership cut (Uber/Lyft promo at 1am)
- Drink brand sponsorships ("Tito's Shot of the Night")
- Refer-a-friend with bar-comped drink

**NOT doing:** banner ads (kills vibe), user subscription (splits base, kills growth).

---

## Safety model (critical)

A real-time location app for nightlife is a stalker risk if done wrong. Mitigations:

1. **No selfies in public feed.** Back-camera venue/crowd photos only.
2. **Friends-only for identifying content.** Public users see venue photos and aggregate data. Mutual contacts only see who is at which bar.
3. **Aggregate-only public data.** Public sees "Bar X is packed, hip-hop, $3 shots." Never individual user identities.
4. **No live profile location.** Profile never shows current bar in real time.
5. **On-device face blur** for incidental faces in venue photos.
6. **21+ verification at signup.**
7. **Ephemeral posts** — wipe at close. Less data to exploit.
8. **Fast block/report**, no public comments on individual posts.
9. **Photo upload only** (no live camera while in line) — post once inside.

---

## MVP scope (V1)

**5 user screens, ported from Noah's prototypes, in order of priority:**

1. **Onboarding** — Splash → 21+ age gate → account (email/Apple/Google) → location → preferences → friends → done. *(Noah's screen, ready to port.)*
2. **Discover (list + map toggle)** — nearby bars, live scores, filters. *(Noah's screen.)*
3. **Bar detail** — vibe, cover, line, deals, friends here, photos, ratings. *(Noah's screen.)*
4. **Post / Check-in** — one-tap GPS check-in, optional vibe emoji, optional photo, optional deep rating. *(New screen — merge of Devin's one-tap + Noah's Rate.)*
5. **Personal profile / Your Night Archived** — past check-ins, friends, settings. *(Noah's screen.)*

**Owner dashboard (web, 1 screen for MVP):**
- Overview tab only — set tonight's cover, post a deal, view tonight's post count + reach. *(Noah's dashboard, simplified for MVP.)*

**Cut to V2:**
- Group planning / squad mode (Noah's full prototype)
- Bar crawl mode
- Verified posts / blue checkmarks
- On This Day nostalgia push
- Capacity alerts
- Vibe matching / recommendations
- Refer-a-friend
- Status indicators (pregaming/in transit)
- Late-night filter

**V1.5 (between MVP and pitch):**
- Forecast (Noah's prototype) — major differentiator
- Owner dashboard — Specials, Menu, Ratings, Settings tabs (rest of Noah's dashboard)

---

## Tech stack

| Layer | Tool | Why |
|---|---|---|
| Mobile app | React Native + Expo | One codebase, iOS + Android |
| Backend | Supabase | Postgres + Auth + Storage + Real-time, all-in-one |
| Maps | Mapbox | Cleaner than Google Maps for this style |
| Push | Expo Notifications | Free, simple |
| Owner dashboard | Next.js | Web app at dashboard.barbuddy.com |
| Payments | Stripe Billing | Bar subscriptions |
| Hosting | Vercel + Supabase | Cheap until huge |

**Total monthly cost while small:** $0–25.

---

## Design system (from Noah)

**User app:** Dark — `#0A0F0D` bg, `#1D9E75` green primary, `#5DCAA5` mid, `#E1F5EE` light.
**Owner dashboard:** Light — `#F7F7F5` bg, same green family.
**Font:** Georgia serif (Noah's pick) — **flag for review**, may swap to a modern sans for nightlife energy. Test both.
**Mobile width:** 390px (iPhone reference).

---

## Launch plan (4 phases)

| Phase | Goal | Duration |
|---|---|---|
| **1. Build MVP** | 5 user screens + 1 owner screen | 1–3 months |
| **2. One neighborhood** | 1 dense bar district, 5 free bars, ~500 users | 1–3 months |
| **3. Prove paid** | Convert free bars to $49/mo. If 3 of 5 pay, it's a business | 1–2 months |
| **4. Pitch** | Raise to expand to more cities, with traction proof | only after Phase 3 |

**Founder split decision points (settle before writing more code):**
- Equity split (default 50/50)
- Decision-making (who breaks ties on product? on business?)
- Commitment level (full-time vs side project)

---

## Legal & launch checklist

- **Trademark™** the name + logo (~$250 + USPTO)
- **LLC** in Delaware or home state ($50–500)
- **Terms of Service + Privacy Policy** day one (Termly.io ~$10/mo)
- **Apple Developer Account** — $99/year
- **Google Play Console** — $25 one-time
- **17+ rating** required on both stores (alcohol app)
- **Apple UGC rules:** report system, block system, moderation policy, ToS — non-optional
- **Location permissions** with clear in-app explanation
- **GDPR/CCPA:** "delete my account" button day one

**Total launch cost:** ~$150.

---

## What's next (action list)

1. **Founder agreement** — equity, decision-making, commitment. Don't skip.
2. **Trademark + domain** — confirm Barbuddy is available
3. **Lock the spec** — review this doc together, mark anything you disagree with
4. **Port Noah's onboarding screen** to real Expo + Supabase project
5. **Build the one-tap Post/Check-in screen** (the only screen Noah hasn't designed yet)
6. **Talk to 5 actual bar owners** — would they pay $49/mo?
7. **Talk to 10 actual bar-goers** — would they open this Friday at 9pm?

---

## File index in this folder

- `concept.md` — this doc (single source of truth)

Source folders (do not edit):
- `../Devin's Idea/concept.md` — original strategy doc
- `../Noah's Prototype/*.jsx + *.html` — original UI prototypes
