# Bar App — Concept Doc

## One-line pitch
**BeReal for nightlife. Free for users. Bars pay for analytics.**

A real-time, location-based app where bar-goers post the live vibe (crowd, music, deals) of the bars they're at. Bars subscribe to see their own analytics and reach more customers.

---

## Core concept

A nightlife discovery app driven by live, crowd-sourced data that gets wiped at close every night. The data is intentionally ephemeral — what's hot tonight is irrelevant tomorrow.

**What users see (free, public):**
- Map of nearby bars with live activity heat
- Each bar's current vibe: crowd level, music genre, deals
- **Cover charge tonight** — yes/no, $ amount (crowd-sourced + bar-confirmed)
- **Avg line length** — rough estimate from recent posts (e.g. "~15 min wait", "no line")
- Photos of the venue/crowd (NOT user selfies — see safety section)
- Aggregate counts ("47 people posted here tonight")

**What bars see (paid dashboard):**
- Posts and reach for their venue tonight
- Compare to area average ("you got 47 posts, neighborhood avg is 23")
- Peak hours, demographics, deal performance
- **Cover & line trends** — what cover charge correlates with most foot traffic, average wait time during peak
- Aggregate trends over weeks/months
- Ability to post deals, set tonight's cover, pin specials

**Crowd-sourced data tags (what users add when posting):**
- Crowd level (dead / chill / busy / packed)
- Music genre + (optional) song
- Cover charge (none / $X) — first user to confirm sets it, others can correct
- Line length (no line / ~5 min / ~15 min / 30+ min / "we left, too long")
- Deal spotted (drink + price)
- Vibe tag (chill, hype, dive, dance, sports, date-night)

---

## Posting & engagement model (the most important section)

**The biggest risk to this app:** nobody at the bar wants to fill out a form. People are drinking, talking, dancing — they're not opening apps to type "the music is hip-hop and the cover is $5."

**Solution: bars post the data. Users confirm and react.**

**How posting actually works:**
1. **Bar staff posts** from the dashboard: tonight's cover, music genre, deals, vibe — all pre-set, takes 30 seconds at start of shift.
2. **Users see those posts** and just tap to confirm or correct ("👍 confirmed cover is $5" or "actually it's $10 now"). One tap, two seconds.
3. **Users can check in** with one tap: "I'm at [Bar Name]" auto-detected by GPS. That's the post. Counts toward "47 people here tonight." Optional vibe emoji (🔥/😴/💃).
4. **Photos and detailed posts are optional bonus**, never required. Most users never go past the one-tap check-in. That's fine — the data is in the count and the confirmations.

**Result:** The feed is never empty (bars fill it). Users do tiny low-friction actions that aggregate into useful intel.

---

## "Selfishly useful" — why users actually open the app

The app has to give the user something *for them*, not just ask them to feed data. Lock the good stuff behind a check-in:

- **"Post to unlock the map"** — see where the action is, where your friends are, but only after you check in somewhere yourself. Same lever BeReal used.
- **Your Night, Archived** — every night you check in becomes a personal scrapbook. Most-visited bars, photos, who you were out with, year-in-review at NYE. People love personal data and won't churn off something that owns their memories.
- **Streaks** — "5 Fridays in a row out" badge. Light gamification, optional.
- **Friends Out Tonight** (opt-in, mutual contacts only) — see which friends are out and at which bar. Massive pull factor — people open the app to check on their group, not for the bars.

---

## Notifications (drives daily opens)

Notifications are how this app stays alive. Two types:

**1. The "BeReal moment" — Friday/Saturday push at 9pm or 10pm**
> "📍 What's your night looking like? Tap to see what's hot tonight."

Creates a ritual. Even if user doesn't go out, they open it to see who is. Every weekend.

**2. Friends-driven (opt-in, mutual only)**
> "Sarah just checked in at The Tap House"
> "3 friends are out tonight — see where"
> "Mike posted from Bar X — looks busy"

This is the killer one. Friend-of-friend FOMO drives more nightlife decisions than any algorithm. People go where their people are.

**3. Smart bar notifications (opt-in)**
> "Bar X is offering $3 shots til 11pm — 0.4 mi away"
> "Live jazz starting now at The Standard"

Only fires for bars near user, only at relevant times, must be opt-in. If overdone, kills the app.

**4. End-of-night recap**
> "Your night: 2 bars, 1 friend out with you, photos saved to your archive ✨"

Soft re-engagement, reinforces the "Your Night, Archived" feature.

---

## Monetization

**Single revenue stream: bars pay, users are free forever.**

| Tier | Price | Who |
|---|---|---|
| Free claim | $0 | Bar lists itself, sees basic post count |
| Basic | $49/mo | Full analytics, post deals, claim profile |
| Pro | $149/mo | Multi-location, exportable reports, priority placement |
| Sponsored | $199+/mo | Pinned on map, top of "deals tonight" feed |

**Future passive revenue:**
- Rideshare partnership cut (Uber/Lyft promo at 1am — useful AND revenue)
- Drink brand sponsorships (e.g., "Tito's Shot of the Night")

**Decided NOT to do:**
- Banner ads in user feed (would kill the BeReal-style vibe)
- $2/mo user subscription (splits user base, weak revenue per user, friction kills growth)

---

## Safety model (critical)

The original BeReal-style mechanic with selfies + real-time location would be a stalker/predator nightmare for an app centered on public venues. Mitigations:

1. **No selfies in public feed.** Back-camera photos of venue/crowd/vibe only. The app's value is the *vibe*, not the *people*.
2. **Friends-only for any identifying content.** Public users see venue photos and aggregate data. Only mutual contacts see who is at which bar (opt-in).
3. **Aggregate-only public data.** Public sees "Bar X is packed, hip-hop, $3 shots." Never sees individual user identities.
4. **No live profile location.** A user's profile never shows their current bar in real time.
5. **On-device face blur** for any incidental faces in venue photos.
6. **18+ verification** at signup.
7. **Ephemeral posts** (your idea) — posts wipe at close. Less data exists to exploit.
8. **Fast block/report**, no public comments on individual posts.
9. **Photo upload only** (no live camera while standing in line) — post once you're inside.

---

---

## V2 / future features (build after MVP works)

These come after the core loop is proven. Don't build day one, but worth designing the data model with these in mind.

**Squad mode (group nightlife planning)**
- Create a "squad" for the night — invite friends to a private group
- Vote on where to go (swipe left/right on bars)
- Shared group chat that wipes at close (matches the ephemeral theme)
- Shared photo album auto-deletes after 7 days
- "Squad is heading to Bar X" pushes to all members

**Bar crawl mode**
- Pre-planned or live crawl routes ("Downtown Crawl: 4 bars, $15 total cover")
- Bars can sponsor crawls to be on the route
- Group earns badges for completing
- Map shows progress, next stop, walking time

**Safety + rideshare**
- "I'm home safe" button — sends to a designated friend at end of night
- Designated Driver mode — DD gets a badge + free non-alc drink at participating bars (sponsor opportunity)
- One-tap Uber/Lyft with promo code at end of night (your rideshare cut)
- Auto-prompt at 1:45am: "Need a ride home?"

**Verified posts**
- Blue checkmark for bar staff/owners
- "Bouncer says line is 20 min" carries more weight than random user
- Verified posts pin to top of that bar's tonight feed

**On This Day**
- Push: "1 year ago tonight you were at The Tap House with Sarah and Mike"
- Pure nostalgia retention play, costs nothing, hits hard
- Reinforces "Your Night, Archived" feature

**Capacity / closing alerts**
- "Bar X is at capacity — may be turning people away"
- "Last call at Bar X in 30 min, Bar Y open till 4am 0.3 mi away"
- Surfaced when relevant, not spammed

**Event surfacing**
- Trivia Tuesday, karaoke nights, live music, sports games
- Bars set recurring weekly events from dashboard
- Filter map by "live music tonight" / "trivia" / "sports" / "ladies night"

**Vibe matching / recommendations**
- "You usually like dive bars and hip-hop — Bar X matches"
- Builds over time from check-in history
- Privacy: opt-in only, all on-device if possible

**Refer a friend**
- "Get a friend to install and check in once = free drink at participating bar"
- Bar covers the drink (loss leader for foot traffic), you take a tiny processing fee
- Drives organic growth without paid ads

**Status indicator**
- "Pregaming" / "In transit" / "At bar" / "After-hours"
- Friends see your status in the friends panel
- Pregaming users are leads for nearby bars ("3 people pregaming nearby — flash a deal")

**Late-night filter**
- "Open after 2am" filter for after-hours crowd
- Diner/food filter for "where's open and serving food right now"

---

## Tech stack (recommended)

- **Mobile app:** React Native + Expo (one codebase, iPhone + Android)
- **Backend:** Supabase (Postgres, real-time, auth, storage, all in one)
- **Maps:** Mapbox (cleaner than Google Maps for this style of app)
- **Push notifications:** Expo Notifications (free, simple)
- **Bar dashboard:** Next.js web app (separate, lives at dashboard.yourapp.com)
- **Payments:** Stripe Billing for bar subscriptions
- **Hosting:** Vercel (web dashboard) + Supabase (backend)

**Total monthly cost while small:** ~$0–25 (Supabase free tier covers a lot, Vercel free, Mapbox free up to 50k loads)

---

## Name ideas

Strong contenders (vibe + availability worth checking):

- **BarReal** — most obvious BeReal callout, may have trademark issues
- **LastCall** — strong nightlife branding, easy to remember
- **OnTap** — short, beer-coded, memorable
- **Tapped** — clean, modern, works as a verb
- **Pour** — minimalist, premium feel
- **Pulse** — captures the "live energy" idea
- **BarPulse** — more specific
- **AfterDark** — evocative, niche
- **The Scene** / **Scene** — captures social discovery
- **TonightOut** — descriptive
- **NightTap** — combines nightlife + tap
- **BarBeat** — music + bar
- **HopIn** — bar-hopping reference, friendly
- **Spillover** — when one bar gets too packed, you go next door
- **Closing Time** — too long, but iconic
- **Local** — too generic, probably taken
- **BarHop** — descriptive, possibly taken

**My picks for shortlist:** LastCall, OnTap, Tapped, BarPulse, HopIn

**Action:** check each on the App Store, Trademark search (uspto.gov), and Namecheap for the .com before falling in love with one.

---

---

## Legal & launch

### Patent / IP protection

You **can't patent** "BeReal for bars" — software business ideas haven't been patentable in the US since *Alice Corp v CLS Bank* (2014). Patents are for novel technical inventions, not app concepts. Even if you could, patents take 2–4 years and cost $10–30K+. Useless for a startup.

What you actually want:
- **Trademark™** the name + logo once you pick one (~$250 + USPTO filing). Protects brand, not idea.
- **Copyright** is automatic on your code and content the moment you write it.
- **Terms of Service + Privacy Policy** on the app from day one (Termly.io or Iubenda generates these for ~$10/mo).
- **LLC** to shield personal liability — file in Delaware or your home state ($50–500 depending on state).

**Real moat = speed + execution + community,** not patents. Snapchat couldn't patent "disappearing photos" either.

### Data storage & costs

**Stack:** Supabase (Postgres + Auth + Storage + Real-time, all-in-one).

| What | Where | Cost at launch | Cost at 10K users | Cost at 100K users |
|---|---|---|---|---|
| Database | Supabase Postgres | $0 (free tier) | $25/mo Pro | $25–100/mo |
| Photos | Supabase Storage → swap to Cloudflare R2 at scale | $0 | ~$10/mo | ~$50–150/mo |
| Real-time | Built into Supabase | $0 | $0 | included |
| Auth | Supabase Auth | $0 | $0 | $0 |
| Maps | Mapbox | $0 (free up to 50K loads/mo) | $0–10 | ~$50/mo |
| Hosting (web dashboard) | Vercel | $0 | $0 | $20/mo |

**Region:** US-East. Lowest latency for most users, simplest compliance.

**Privacy/legal to set up early:**
- GDPR/CCPA: users must be able to request data deletion → build "delete my account" button day one
- Photos with people in them: clear consent in TOS that posting grants license to display
- Bar info: factual data is fine, opinions/reviews need TOS protection
- Data retention: ephemeral posts wipe nightly (good for privacy AND storage costs)

**Total monthly cost while small:** $0–25. App is cheap to run until it's huge.

### App Store launch

**Apple App Store:**
- Apple Developer Account: **$99/year** (developer.apple.com, 1–2 days for entity approval)
- Build with **Expo EAS Build** — handles iOS signing/certs (free tier or $29/mo for faster builds)
- **TestFlight** for beta (free, up to 10K testers)
- Submit to App Store Review — usually approved in **24–48 hours**
- Required: privacy policy URL, screenshots, app icon, description, age rating

**Google Play Store:**
- Google Play Console: **$25 one-time** fee
- Same Expo build → outputs `.aab` file
- Internal → Closed beta → Production
- Approval is usually **a few hours**, way faster than Apple

**Specific requirements for a nightlife/alcohol app:**
- **17+ age rating** required on both stores
- **Apple's User-Generated Content rules** — must have: report system, block system, moderation policy, ToS users agree to. Skip these = instant rejection.
- **Location permissions** — must have clear in-app explanation ("we use your location to show you bars near you")
- **No promoting underage drinking** anywhere in marketing or in-app copy
- Apple may flag alcohol-related apps for extra review — usually fine but expect 1–2 extra days first time

**Realistic timeline (code done → live on App Store):**
- iOS: 1–2 weeks (account setup + first review can be slow)
- Android: 3–5 days

**Total launch cost:** ~$150
- $99 Apple Developer
- $25 Google Play
- $20 trademark search
- $10/mo privacy policy generator

---

## What's next

1. Pick a name from the shortlist (or veto them all)
2. Lock the stack
3. Sketch the first three screens (post moment, feed/map, bar profile)
4. Set up Expo project + Supabase project
5. Build a clickable prototype before writing any "real" code
6. Talk to 5 actual bar owners before building the dashboard — make sure they'd actually pay $49/mo
7. Talk to 10 actual bar-goers — make sure they'd open the app on a Friday night

---

## TOMORROW'S SESSION — Signup screen mockup

Plan: build a polished signup screen as a single HTML/React mockup first (no Expo setup yet) so we can iterate on the visual design fast. Once it looks right, rebuild it as the real React Native screen with Supabase auth.

**Three approaches discussed:**
1. **HTML/React mockup** (chosen for tomorrow) — fast, iterate on look
2. **Real Expo + React Native screen** — do this after the mockup is locked
3. **v0.dev or Claude artifacts** — alternative if you want to drive the design yourself

**Questions to answer at the start of tomorrow's session:**
- **Working name** to put on the screen (LastCall? OnTap? Tapped? BarPulse? HopIn? — or new pick)
- **Vibe direction:**
  - Sleek/minimal (Linear, Vercel-style)
  - Dark/clubby (nightlife brand, neon accents)
  - Bright/fun (BeReal-style, playful)
  - Something else
- **Signup method:**
  - Email + password
  - Phone number (SMS code) — strongest for nightlife (real people, no burner emails)
  - "Continue with Apple / Google" (fastest UX, lowest friction)
  - Combination

**Defaults if you don't decide:** name = "LastCall", vibe = dark/clubby with neon accent, signup = phone + Apple/Google.

Open this folder tomorrow, answer those three Qs, then I'll build the screen.
