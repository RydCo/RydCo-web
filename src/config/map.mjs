// Where the area map comes from: OpenFreeMap's vector tiles of OpenStreetMap, made ahead of time and served from a
// CDN. Free, no key, and commercial use allowed (openfreemap.org). Positron is its calm, light style. The security
// headers (security.mjs) allow this host, so changing it here keeps the two in step.
export const mapHost = "https://tiles.openfreemap.org";
export const mapStyle = `${mapHost}/styles/positron`;
