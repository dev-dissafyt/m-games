# 05 - Clearance Engine & Room Physics Math

## Technical Overview
The clearance engine (`packages/clearance-engine`) calculates real-world spatial buffers to prevent delivery failures and wall interference.

---

## Table Dimensions & Envelope Math

### 1. Standard Metric Dimensions

| Table Size | Playfield Surface | Outer Cabinet Footprint | Required Room Size (57" Cue / 1.5m Stroke) | Minimum Room Size (48" Short Cue / 1.2m Stroke) |
| :--- | :--- | :--- | :--- | :--- |
| **7ft Pub** | $1.98\text{ m} \times 0.99\text{ m}$ | $2.14\text{ m} \times 1.22\text{ m}$ | **$5.14\text{ m} \times 4.22\text{ m}$** | **$4.54\text{ m} \times 3.62\text{ m}$** |
| **8ft Pro** | $2.24\text{ m} \times 1.12\text{ m}$ | $2.44\text{ m} \times 1.32\text{ m}$ | **$5.44\text{ m} \times 4.32\text{ m}$** | **$4.84\text{ m} \times 3.72\text{ m}$** |
| **12ft Snooker** | $3.56\text{ m} \times 1.78\text{ m}$ | $3.85\text{ m} \times 2.05\text{ m}$ | **$6.85\text{ m} \times 5.05\text{ m}$** | **$6.25\text{ m} \times 4.45\text{ m}$** |

---

## Mathematical Collision Models

Let a table be represented as an oriented bounding box (OBB):
$$\text{Table} = \{ C, W, H, \theta \}$$
Where:
- $C = (x, y)$ is the center position in canvas meters.
- $W, H$ are the outer physical dimensions (length and width).
- $\theta$ is the rotation angle in radians.

### 1. Physical Polygon ($P_{\text{physical}}$)
Vertices calculated by rotating rectangle offsets:
$$V_i = C + R(\theta) \begin{bmatrix} \pm W/2 \\ \pm H/2 \end{bmatrix}$$
Where $R(\theta)$ is the standard 2D rotation matrix:
$$R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

### 2. Cue Clearance Buffer Envelope ($P_{\text{cue}}$)
The playing envelope extends the physical outer frame by the cue stroke distance $D_{\text{cue}} = 1.45\text{ m}$ (standard 57" cue):
$$W_{\text{cue}} = W + 2 \cdot D_{\text{cue}}$$
$$H_{\text{cue}} = H + 2 \cdot D_{\text{cue}}$$

### 3. Collision Classification Rules
1. **Critical Collision (Red Alert):**
   $$\text{Intersection}(P_{\text{physical}}, \text{Obstacle}) \neq \emptyset$$
   *Output:* Table does not physically fit in the selected space.
2. **Cue Restriction Warning (Amber Alert):**
   $$\text{Intersection}(P_{\text{cue}}, \text{Obstacle}) \neq \emptyset \quad \text{AND} \quad \text{Intersection}(P_{\text{physical}}, \text{Obstacle}) = \emptyset$$
   *Output:* Clearance restricted on intersecting sides. Advises packing short cues ($1.2\text{ m}$ or $0.9\text{ m}$).