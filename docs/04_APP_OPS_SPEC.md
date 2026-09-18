# 04 - App Specification: `apps/ops` (ops.m-games.co.za)

## Purpose & Target Device
Mobile web tool used on site by pool table delivery teams, rigging technicians, and field assemblers.

---

## Key Features & Page Structure

### 1. Active Job Board (`/jobs`)
- Filtered by installation date and assigned delivery vehicle.
- Displays key logistics badges:
  - Destination address with one-tap navigation to Google Maps / Waze.
  - Required crew size (2-man vs. 4-man).
  - Special gear flags (piano straps, ramps, short cues).

### 2. Site Mission Pack (`/jobs/[id]`)
- **Walkway Video Preview:** Quick 20-second replay of the stairs and hallways before unloading the truck.
- **Room Blueprint & Placement Diagram:**
  - Vector layout showing exact distances from walls and doors to table legs.
  - Alerts technicians to any narrow walls requiring short cues.

### 3. Digital Installation Certificate & Sign-Off (`/jobs/[id]/signoff`)
- **Technician Checklist:**
  - [x] Slate leveled on all 3 axes using machinist spirit level.
  - [x] Bed cloth stretched and staple-tensioned to tournament spec.
  - [x] Cushion rails torqued and aligned.
  - [x] Ball return / coin-op mechanism verified.
- **Photo Uploads:**
  - Snap photo of spirit level showing dead center.
  - Snap photo of completed table in the room.
- **Customer Sign-Off:**
  - On-screen touch signature canvas for the pub manager or homeowner.
  - Clicking **"Complete Sign-Off"** updates order status to `INSTALLED_ACTIVE`, emails the warranty certificate, and triggers recurring rental billing.