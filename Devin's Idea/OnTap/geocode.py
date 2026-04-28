"""
Geocode the OnTap bars via Nominatim (free OSM geocoder).
Respects 1 req/sec policy. Prints JSON-ready BARS array.
"""
import urllib.request
import urllib.parse
import json
import time

# (id, name, search_query, fallback_address) — query is what we send to Nominatim
BARS = [
    (1, "Group Therapy",      "Group Therapy bar, Columbia, SC 29205",      "2107 Greene St, Columbia, SC"),
    (2, "Pavlov's",           "Pavlov's, Five Points, Columbia, SC",         "2009 Greene St, Columbia, SC"),
    (3, "Five Points Pub",    "Five Points Pub, Columbia, SC",               "2020 Saluda Ave, Columbia, SC"),
    (4, "The Roost",          "The Roost rooftop, Columbia, SC",             "807 Harden St, Columbia, SC"),
    (5, "Jake's at 5 Points", "Jake's, Five Points, Columbia, SC",           "2112 Devine St, Columbia, SC"),
    (6, "Pinch",              "Pinch, Five Points, Columbia, SC",            "2007 Devine St, Columbia, SC"),
    (7, "Bar None",           "Bar None, Five Points, Columbia, SC",         "620 Harden St, Columbia, SC"),
    (8, "Salty Nut Cafe",     "Salty Nut Cafe, Columbia, SC",                "2000 Greene St, Columbia, SC"),
]

UA = "Mozilla/5.0 OnTap-Demo/0.1"

def geocode(query):
    # Photon (komoot) — same OSM data as Nominatim, no aggressive blocking
    url = "https://photon.komoot.io/api/?" + urllib.parse.urlencode({
        "q": query, "limit": 1
    })
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=15) as r:
        data = json.loads(r.read())
    feats = data.get("features", [])
    if feats:
        lon, lat = feats[0]["geometry"]["coordinates"]
        props = feats[0].get("properties", {})
        display = ", ".join(filter(None, [
            props.get("name"), props.get("street"), props.get("city"), props.get("state")
        ]))
        return float(lat), float(lon), display
    return None

results = []
for bid, name, query, fallback in BARS:
    print(f"[{bid}] {name}: querying '{query}'...")
    res = geocode(query)
    if not res:
        print(f"    -> name lookup empty, trying address: '{fallback}'")
        time.sleep(1.1)
        res = geocode(fallback)
    if res:
        lat, lon, display = res
        print(f"    OK: {lat}, {lon}  ({display[:80]})")
        results.append((bid, name, lat, lon, display))
    else:
        print(f"    FAILED — no geocode result")
        results.append((bid, name, None, None, None))
    time.sleep(1.1)

print("\n\n===== RESULTS =====\n")
for bid, name, lat, lon, _ in results:
    if lat:
        print(f"  id={bid:<2} {name:<22} lat={lat:.5f}  lng={lon:.5f}")
    else:
        print(f"  id={bid:<2} {name:<22} <FAILED>")
