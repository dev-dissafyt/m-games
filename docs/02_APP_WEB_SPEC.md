# 02 - App Specification: `apps/web` (m-games.co.za)

## Purpose & Target Audience
The primary customer-facing portal and digital showroom. Serves both residential table buyers and commercial B2B rental prospects (pubs, sports bars, leisure venues, corporate offices).

---

## Key Features & Page Structure

### 1. Marketing & Storefront (`/`)
- Brand showcase highlighting custom craftsmanship, slate bed quality, and commercial leasing options.
- Dynamic CTA routing:
  - **"Configure Custom Pool Table"** $\rightarrow$ `/configurator`
  - **"B2B Commercial Leasing"** $\rightarrow$ `/commercial`

### 2. 3D Pool Table Configurator (`/configurator`)
- **Rendering Engine:** Built with `@react-three/fiber` and `@react-three/drei` (Three.js abstraction for React).
- **3D Asset Management:**
  - Standardized `.glb` model optimized for mobile GPU rendering (< 3.5 MB).
  - Material slots targeted via Raycasting: `feltMesh`, `cabinetRailsMesh`, `legsMesh`, `pocketCastingsMesh`.
- **Interactive Component Controls:**
  - **Felt Finishes:** Green, Burgundy, Electric Blue, Slate Grey, Plum.
  - **Body Stains & Materials:** Kiaat, Solid Walnut, African Mahogany, Matte Black Steel, White Lacquer.
  - **Custom Wraps:** Upload PNG/JPEG to dynamically create a canvas texture mapped onto table sides.
- **Dynamic Spec & Snapshot:**
  - Generates real-time visual canvas snapshot (`canvas.toDataURL("image/webp")`).
  - Auto-calculates base price, custom wrap surcharge, and estimated manufacturing lead time (4–6 weeks).

### 3. 2D Room Clearance & Floor Plan Planner (`/commercial/planner`)
- **Canvas Engine:** HTML5 Canvas via `react-konva` or `fabric.js`.
- **Workflow Steps:**
  1. **Upload or Draw:** Upload an architectural venue PDF/image OR draw perimeter walls with 90° snapping.
  2. **Calibrate:** Draw a 2-point line across a known doorway/wall and enter length in meters.
  3. **Drag & Drop Tables:** Drop 7ft, 8ft, or 12ft table icons with 360° rotation handles.
  4. **Dynamic Cue Stroke Envelope:**
     - Outer 1.5m perimeter line around all 4 sides of the table.
     - **Green:** Full 57" cue clearance.
     - **Amber:** Clearance restricted (1.0m – 1.4m) $\rightarrow$ flags alert: *"Requires 48-inch or 36-inch short cues for this wall"*.
     - **Red:** Table physically intersects wall or pillar.
  5. **Export:** Renders both a visual blueprint PNG and a scaled JSON matrix of table $(x, y, \theta)$ coordinates for the delivery crew.

### 4. Walkway & Stair Ingress Audit (`/checkout/ingress`)
- **Video Capture Flow:**
  - One-tap mobile camera recording: `<input type="file" accept="video/*" capture="environment">`.
  - Prompt: *"Record a 15-30 second walk-through starting from the driveway/loading bay, through any doors, stairs, or elevators, up to the room where the table will sit."*
- **Direct-to-Supabase Storage Upload:**
  - Client uploads directly to Supabase storage bucket `ingress-videos` via presigned URL.
- **Logistical Checklist:**
  - Ground floor vs. stairs toggle.
  - If stairs: Number of steps, straight vs. spiral.
  - Narrowest doorway opening measurement.

### 5. Mock Checkout & Rental Agreement (`/checkout`)
- Simulated payment checkout (50% manufacturing deposit or commercial lease reservation).
- Automatically persists order data, customer contact, configuration SKU, and site audit specs to Postgres via Next.js Server Actions.