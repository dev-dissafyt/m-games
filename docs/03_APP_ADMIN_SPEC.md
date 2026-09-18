# 03 - App Specification: `apps/admin` (admin.m-games.co.za)

## Purpose & Target Device
A dedicated mobile-first Progressive Web App (PWA) built specifically for the business owner's smartphone. Designed around his natural workflow: **voice calls, fast WhatsApp updates, and rapid dispatch triage**.

---

## Key Features & Page Structure

### 1. Incoming Order & Lead Stream (`/leads`)
- Real-time order stream using Supabase Realtime subscriptions.
- Each lead is rendered as a clean, actionable card with distinct badges:
  - `NEW CUSTOM ORDER: 8ft Walnut / Blue Felt`
  - `COMMERCIAL LEASE: The Brass Bell Pub (2 Tables • 6-Month Contract)`
- **One-Tap "Call Customer" Action:**
  - Massive green button triggering a direct mobile call using the `tel:+27...` protocol.
  - Contextual summary pinned to the call card: Customer name, table size, venue type, and deposit status.
- **One-Tap "WhatsApp Pro-Forma":**
  - Sends a pre-filled quote message directly via `https://wa.me/27...` including order summary and delivery window.

### 2. Logistics & Ingress Video Audit (`/dispatch`)
- **Embedded Ingress Player:**
  - Scrub through the customer's uploaded 15-30 second walkway video directly in the app.
- **Delivery Pre-Flight Verification:**
  - View floor plan blueprint and wall clearances.
  - **Crew Sizing Switch:** Toggle between *2-Man Standard* and *4-Man Heavy Rig* (for stair navigation).
  - **Rigging Gear Checklist:** Piano straps, stair climbing trolley, slate ramps.
  - **Dispatch Approval:** Clicking **"Approve for Delivery"** instantly publishes the job card to `ops.m-games.co.za`.

### 3. Catalog & Price Toggles (`/catalog`)
- Instant inventory controls:
  - Toggle felt colors on/off (e.g., mark "Charcoal Felt" as temporarily unavailable in the 3D configurator).
  - Adjust base manufacturing deposit requirements.
  - Update rental tier prices for Month-to-Month, 3-Month, 6-Month, and 12-Month lease options.

---

## PWA Configuration (`apps/admin/public/manifest.json`)
```json
{
  "name": "M-Games Admin",
  "short_name": "MG Admin",
  "start_url": "/leads",
  "display": "standalone",
  "background_color": "#09090b",
  "theme_color": "#16a34a",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```