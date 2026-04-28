# OnTap — Venue Types (Bars vs Clubs)

How we distinguish bars from clubs in the app, both visually for users and structurally in the data model.

---

## The data model

Each venue has a `type` field on the record:

```ts
type VenueType = "bar" | "club" | "lounge" | "hybrid" | "other";

venues: {
  id: uuid
  name: string
  type: VenueType        // <— this field
  address: string
  lat: number
  lng: number
  // ...the rest (cover, music, deals, etc.)
}
```

For Five Points launch this is filled in during pre-seeding. Owners later claim their listing and can edit the type if it's wrong.

---

## Two ways a venue gets into the app

### 1. Owner self-onboards (the paying flow)
On the bar/club dashboard signup, one of the first questions:

```
What kind of venue is this?
○ Bar / pub / restaurant bar
○ Club / dance venue
○ Lounge / cocktail bar
○ Hybrid (bar early, club after 11pm)
○ Other
```

Answer → `venues.type` in Supabase. Editable later from settings.

### 2. We pre-seed the venue ourselves (admin)
For launch we populate Five Points (and other target neighborhoods) so the map isn't empty when users open the app on day one. Each venue gets tagged at admin-add time. CSV import or admin tool. Owners later "claim" their pre-seeded listing and inherit the type — can correct it if needed.

---

## What changes between bar and club in the app

`type` isn't just a visual flag — it changes prompts, defaults, and copy throughout the product.

| Field / behavior | Bar | Club |
|---|---|---|
| Default cover prompt | "No cover" pre-selected | "Tonight's cover: $___" required |
| Default hours suggested | 4pm – 2am | 9pm – 2am |
| Music tag prompt | Genre dropdown | Genre + DJ name field |
| Photos prompt | Crowd / venue | Crowd / DJ booth / lights |
| Notification copy | "live deals" | "doors open / DJ tonight" |
| Age policy default | 21+ (often 18+ early) | Strict 21+ |
| Capacity / wait-time tone | "~5 min wait" | "Line wraps the block" / "30+ min" |

---

## How users see the distinction in the app

1. **Pin styling on the map** — clubs get a slightly larger pin with a glowing neon ring; bars stay plain. Crowd color (green/yellow/red) still applies to both.
2. **Type chip in the detail sheet** — when a user taps a venue, "🍺 Bar" or "🪩 Club" shows up right under the name as a colored chip.
3. **Filter chips** at the top of the map — `🍺 Bars` / `🪩 Clubs` lets users isolate either.
4. **Friends panel** — friend status reads "at Rooftop" the same way regardless, but the venue's pin style is different on the map.

---

## Edge cases

- **Hybrid venues** (bar early, club late) — single record, `type: "hybrid"`. Pin renders with the club's glowing ring after a configurable hour (e.g. 10pm), bar style before. Owner sets the switch time in their dashboard.
- **Restaurants with bars** — counted as `bar` if they're a meaningful nightlife stop, otherwise excluded from Five-Points-style discovery feed.
- **Pop-ups / one-night DJ events at a bar** — handled separately as "events", not a venue type change. The bar stays a `bar` in the data; the event tags it as a club-style night.

---

## Why this matters for the business model

Clubs and bars often have different willingness-to-pay for the dashboard subscription:

- **Clubs** — care more about cover-charge optimization, crowd analytics, DJ promotion. Likely to pay the **Pro tier ($149/mo)** or sponsored placement ($199+/mo).
- **Bars** — care more about deal performance, foot traffic during slow hours. **Basic tier ($49/mo)** is the right fit.

Tagging type correctly at signup means the dashboard can show each owner the metrics that actually matter to them, and our pricing recommendations land closer to right the first time.
