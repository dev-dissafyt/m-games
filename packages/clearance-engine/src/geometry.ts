import { OrientedBoundingBox, Polygon, Vector2D } from './types';

export function rotateVector(v: Vector2D, angleRad: number): Vector2D {
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return {
    x: v.x * cos - v.y * sin,
    y: v.x * sin + v.y * cos,
  };
}

export function addVectors(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function subtractVectors(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function dotProduct(a: Vector2D, b: Vector2D): number {
  return a.x * b.x + a.y * b.y;
}

export function vectorLength(v: Vector2D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalizeVector(v: Vector2D): Vector2D {
  const len = vectorLength(v);
  if (len === 0) return { x: 0, y: 0 };
  return { x: v.x / len, y: v.y / len };
}

/**
 * Computes the 4 corners of an Oriented Bounding Box (OBB).
 * Corners are ordered clockwise: [Top-Left, Top-Right, Bottom-Right, Bottom-Left]
 */
export function getObbVertices(obb: OrientedBoundingBox): Vector2D[] {
  const halfW = obb.width / 2;
  const halfH = obb.height / 2;

  const localCorners: Vector2D[] = [
    { x: -halfW, y: -halfH }, // Top-Left / Front-Left
    { x: halfW, y: -halfH },  // Top-Right / Front-Right
    { x: halfW, y: halfH },   // Bottom-Right / Back-Right
    { x: -halfW, y: halfH },  // Bottom-Left / Back-Left
  ];

  return localCorners.map((corner) => {
    const rotated = rotateVector(corner, obb.rotation);
    return addVectors(obb.center, rotated);
  });
}

/**
 * Creates the cue envelope OBB by expanding width and height by 2 * cueClearance.
 */
export function getCueEnvelopePolygon(
  obb: OrientedBoundingBox,
  cueClearanceMeters: number
): Polygon {
  const expandedObb: OrientedBoundingBox = {
    center: obb.center,
    width: obb.width + 2 * cueClearanceMeters,
    height: obb.height + 2 * cueClearanceMeters,
    rotation: obb.rotation,
  };

  return {
    vertices: getObbVertices(expandedObb),
  };
}

/**
 * Distance from point P to line segment AB.
 */
export function distancePointToSegment(p: Vector2D, a: Vector2D, b: Vector2D): number {
  const ab = subtractVectors(b, a);
  const ap = subtractVectors(p, a);
  const abLenSq = dotProduct(ab, ab);

  if (abLenSq === 0) {
    return vectorLength(ap);
  }

  // Projection scalar t onto line AB clamped to [0, 1]
  const t = Math.max(0, Math.min(1, dotProduct(ap, ab) / abLenSq));
  const projection = {
    x: a.x + t * ab.x,
    y: a.y + t * ab.y,
  };

  return vectorLength(subtractVectors(p, projection));
}

/**
 * Checks if point is inside a polygon using ray casting algorithm.
 */
export function isPointInsidePolygon(point: Vector2D, poly: Polygon): boolean {
  let inside = false;
  const vertices = poly.vertices;
  const n = vertices.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const vi = vertices[i];
    const vj = vertices[j];

    const intersect =
      vi.y > point.y !== vj.y > point.y &&
      point.x < ((vj.x - vi.x) * (point.y - vi.y)) / (vj.y - vi.y) + vi.x;

    if (intersect) inside = !inside;
  }

  return inside;
}
