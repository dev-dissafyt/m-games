import { Polygon, Vector2D } from './types';
import { dotProduct, normalizeVector, subtractVectors } from './geometry';

/**
 * Projects a polygon onto an axis and returns [min, max].
 */
function projectPolygonOntoAxis(poly: Polygon, axis: Vector2D): [number, number] {
  let min = dotProduct(poly.vertices[0], axis);
  let max = min;

  for (let i = 1; i < poly.vertices.length; i++) {
    const projection = dotProduct(poly.vertices[i], axis);
    if (projection < min) min = projection;
    if (projection > max) max = projection;
  }

  return [min, max];
}

/**
 * Checks if two 1D intervals overlap.
 */
function intervalsOverlap(a: [number, number], b: [number, number], tolerance = 1e-5): boolean {
  return a[1] >= b[0] - tolerance && b[1] >= a[0] - tolerance;
}

/**
 * Extracts unique edge perpendicular normal axes for a polygon.
 */
function getAxesForPolygon(poly: Polygon): Vector2D[] {
  const axes: Vector2D[] = [];
  const vertices = poly.vertices;

  for (let i = 0; i < vertices.length; i++) {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % vertices.length];
    const edge = subtractVectors(p2, p1);
    // Perpendicular normal: (-edge.y, edge.x)
    const normal = normalizeVector({ x: -edge.y, y: edge.x });
    axes.push(normal);
  }

  return axes;
}

/**
 * Separating Axis Theorem (SAT) collision test between two convex polygons.
 * Returns true if the polygons intersect, false if a separating axis exists.
 */
export function testPolygonPolygonSAT(polyA: Polygon, polyB: Polygon): boolean {
  const axes = [...getAxesForPolygon(polyA), ...getAxesForPolygon(polyB)];

  for (const axis of axes) {
    if (axis.x === 0 && axis.y === 0) continue;

    const projA = projectPolygonOntoAxis(polyA, axis);
    const projB = projectPolygonOntoAxis(polyB, axis);

    if (!intervalsOverlap(projA, projB)) {
      return false; // Found separating axis, no intersection
    }
  }

  return true; // No separating axis found -> collision
}

/**
 * Line segment intersection test between AB and CD.
 */
export function testSegmentSegmentIntersection(
  a: Vector2D,
  b: Vector2D,
  c: Vector2D,
  d: Vector2D
): boolean {
  const ccw = (p1: Vector2D, p2: Vector2D, p3: Vector2D) => {
    return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
  };

  return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

/**
 * Tests if any edge of polygon intersects line segment.
 */
export function testPolygonSegmentIntersection(poly: Polygon, segStart: Vector2D, segEnd: Vector2D): boolean {
  const vertices = poly.vertices;
  for (let i = 0; i < vertices.length; i++) {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % vertices.length];
    if (testSegmentSegmentIntersection(p1, p2, segStart, segEnd)) {
      return true;
    }
  }
  return false;
}
