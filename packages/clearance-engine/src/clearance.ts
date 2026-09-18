import {
  SHORT_CUE_36_CLEARANCE_METERS,
  SHORT_CUE_48_CLEARANCE_METERS,
  STANDARD_CUE_CLEARANCE_METERS,
  TABLE_SPECS,
} from './constants';
import {
  addVectors,
  distancePointToSegment,
  getCueEnvelopePolygon,
  getObbVertices,
  isPointInsidePolygon,
  rotateVector,
} from './geometry';
import { testPolygonPolygonSAT, testPolygonSegmentIntersection } from './sat';
import {
  OrientedBoundingBox,
  PlacedTable,
  Polygon,
  RoomLayout,
  SideClearance,
  TableClearanceResult,
  Vector2D,
  WallSegment,
} from './types';

/**
 * Extracts wall segments from a room layout.
 */
export function getRoomWallSegments(room: RoomLayout): WallSegment[] {
  const segments: WallSegment[] = [];

  if (room.polygon && room.polygon.vertices.length >= 3) {
    const v = room.polygon.vertices;
    for (let i = 0; i < v.length; i++) {
      segments.push({
        start: v[i],
        end: v[(i + 1) % v.length],
      });
    }
  } else if (room.width && room.length) {
    // Standard rectangular room from (0,0) to (length, width)
    const p1: Vector2D = { x: 0, y: 0 };
    const p2: Vector2D = { x: room.length, y: 0 };
    const p3: Vector2D = { x: room.length, y: room.width };
    const p4: Vector2D = { x: 0, y: room.width };

    segments.push({ start: p1, end: p2 });
    segments.push({ start: p2, end: p3 });
    segments.push({ start: p3, end: p4 });
    segments.push({ start: p4, end: p1 });
  }

  // Add obstacle segments
  if (room.obstacles) {
    for (const obs of room.obstacles) {
      const v = obs.vertices;
      for (let i = 0; i < v.length; i++) {
        segments.push({
          start: v[i],
          end: v[(i + 1) % v.length],
        });
      }
    }
  }

  return segments;
}

/**
 * Calculates distance from a table side midpoint to all wall segments.
 */
function getSideDistanceToWalls(
  midpoint: Vector2D,
  walls: WallSegment[]
): number {
  let minDistance = Infinity;

  for (const wall of walls) {
    const dist = distancePointToSegment(midpoint, wall.start, wall.end);
    if (dist < minDistance) {
      minDistance = dist;
    }
  }

  return minDistance;
}

/**
 * Evaluates clearance for a single placed table within a room.
 */
export function evaluateTableClearance(
  table: PlacedTable,
  room: RoomLayout,
  cueClearance = STANDARD_CUE_CLEARANCE_METERS
): TableClearanceResult {
  const spec = TABLE_SPECS[table.sizeKey];

  const tableObb: OrientedBoundingBox = {
    center: table.center,
    width: spec.cabinetLength,
    height: spec.cabinetWidth,
    rotation: table.rotation,
  };

  const physicalVertices = getObbVertices(tableObb);
  const physicalPolygon: Polygon = { vertices: physicalVertices };
  const cuePolygon = getCueEnvelopePolygon(tableObb, cueClearance);

  const walls = getRoomWallSegments(room);

  // 1. Check physical intersection with any wall/obstacle segment
  let physicalIntersects = false;
  for (const wall of walls) {
    if (testPolygonSegmentIntersection(physicalPolygon, wall.start, wall.end)) {
      physicalIntersects = true;
      break;
    }
  }

  // If room is defined as a polygon, make sure table is inside
  if (room.polygon && room.polygon.vertices.length >= 3) {
    // If any vertex is outside the room polygon
    for (const vertex of physicalVertices) {
      if (!isPointInsidePolygon(vertex, room.polygon)) {
        physicalIntersects = true;
        break;
      }
    }
  } else if (room.width && room.length) {
    // Check if any physical vertex is out of rectangular room bounds [0..length, 0..width]
    for (const vertex of physicalVertices) {
      if (
        vertex.x < 0 ||
        vertex.x > room.length ||
        vertex.y < 0 ||
        vertex.y > room.width
      ) {
        physicalIntersects = true;
        break;
      }
    }
  }

  // Check physical intersection with any obstacle polygon using SAT
  if (!physicalIntersects && room.obstacles) {
    for (const obstacle of room.obstacles) {
      if (testPolygonPolygonSAT(physicalPolygon, obstacle)) {
        physicalIntersects = true;
        break;
      }
    }
  }

  // 2. Check cue envelope intersection
  let cueIntersects = false;
  for (const wall of walls) {
    if (testPolygonSegmentIntersection(cuePolygon, wall.start, wall.end)) {
      cueIntersects = true;
      break;
    }
  }

  if (!cueIntersects && room.polygon && room.polygon.vertices.length >= 3) {
    for (const vertex of cuePolygon.vertices) {
      if (!isPointInsidePolygon(vertex, room.polygon)) {
        cueIntersects = true;
        break;
      }
    }
  } else if (!cueIntersects && room.width && room.length) {
    for (const vertex of cuePolygon.vertices) {
      if (
        vertex.x < 0 ||
        vertex.x > room.length ||
        vertex.y < 0 ||
        vertex.y > room.width
      ) {
        cueIntersects = true;
        break;
      }
    }
  }

  if (!cueIntersects && room.obstacles) {
    for (const obstacle of room.obstacles) {
      if (testPolygonPolygonSAT(cuePolygon, obstacle)) {
        cueIntersects = true;
        break;
      }
    }
  }

  // 3. Compute side clearances
  // Corners: [0: TL, 1: TR, 2: BR, 3: BL]
  // Front: edge 0-1 (top edge in local space)
  // Right: edge 1-2 (right edge)
  // Back: edge 2-3 (bottom edge)
  // Left: edge 3-0 (left edge)
  const sides: Array<{ side: 'front' | 'back' | 'left' | 'right'; idx1: number; idx2: number }> = [
    { side: 'front', idx1: 0, idx2: 1 },
    { side: 'right', idx1: 1, idx2: 2 },
    { side: 'back', idx1: 2, idx2: 3 },
    { side: 'left', idx1: 3, idx2: 0 },
  ];

  const sideClearances: SideClearance[] = sides.map(({ side, idx1, idx2 }) => {
    const p1 = physicalVertices[idx1];
    const p2 = physicalVertices[idx2];
    const midpoint: Vector2D = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };

    let dist = getSideDistanceToWalls(midpoint, walls);

    // If simple rectangular room, ensure bounds considered
    if (room.width && room.length) {
      const dLeft = midpoint.x;
      const dRight = room.length - midpoint.x;
      const dTop = midpoint.y;
      const dBottom = room.width - midpoint.y;
      dist = Math.min(dist, dLeft, dRight, dTop, dBottom);
    }

    const roundedDist = Math.max(0, Math.round(dist * 100) / 100);

    let requiredCue: 57 | 48 | 36 = 57;
    let isRestricted = false;
    let message: string | undefined = undefined;

    if (roundedDist < STANDARD_CUE_CLEARANCE_METERS) {
      isRestricted = true;
      if (roundedDist >= SHORT_CUE_48_CLEARANCE_METERS) {
        requiredCue = 48;
        message = `${roundedDist}m clearance: requires 48-inch short cue`;
      } else {
        requiredCue = 36;
        message = `${roundedDist}m clearance: requires 36-inch short cue`;
      }
    }

    return {
      side,
      clearanceMeters: roundedDist,
      requiredCueLengthInches: requiredCue,
      isRestricted,
      message,
    };
  });

  // 4. Determine overall status & summary
  let status: 'GREEN' | 'AMBER' | 'RED' = 'GREEN';
  let summaryMessage = 'Optimal: Full 57" tournament cue clearance on all 4 sides.';

  if (physicalIntersects) {
    status = 'RED';
    summaryMessage = 'Critical: Table physically collides with room wall or structural obstacle!';
  } else if (cueIntersects || sideClearances.some((s) => s.isRestricted)) {
    status = 'AMBER';
    const restrictedSides = sideClearances
      .filter((s) => s.isRestricted)
      .map((s) => `${s.side} (${s.clearanceMeters}m → ${s.requiredCueLengthInches}" cue)`)
      .join(', ');
    summaryMessage = `Clearance restricted on: ${restrictedSides}. Advise supplying short cues.`;
  }

  return {
    tableId: table.id,
    status,
    physicalIntersects,
    cueIntersects,
    sideClearances,
    summaryMessage,
    physicalPolygon,
    cuePolygon,
  };
}
