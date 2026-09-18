export type TableSizeKey = 'SEVEN_FOOT_PUB' | 'EIGHT_FOOT_PRO' | 'TWELVE_FOOT_SNOOKER';

export interface Vector2D {
  x: number;
  y: number;
}

export interface Polygon {
  vertices: Vector2D[];
}

export interface TableDimensions {
  key: TableSizeKey;
  label: string;
  playfieldWidth: number;   // meters
  playfieldLength: number;  // meters
  cabinetWidth: number;     // meters (H in specs, e.g. 1.22m)
  cabinetLength: number;    // meters (W in specs, e.g. 2.14m)
  minRoomWidth57: number;   // meters
  minRoomLength57: number;  // meters
  minRoomWidth48: number;   // meters
  minRoomLength48: number;  // meters
}

export interface OrientedBoundingBox {
  center: Vector2D;
  width: number;    // length along local X (cabinetLength)
  height: number;   // width along local Y (cabinetWidth)
  rotation: number; // in radians
}

export interface PlacedTable {
  id: string;
  sizeKey: TableSizeKey;
  center: Vector2D;
  rotation: number; // in radians (0 to 2*PI)
}

export interface WallSegment {
  start: Vector2D;
  end: Vector2D;
}

export interface RoomLayout {
  width?: number;       // For simple rectangular rooms (meters)
  length?: number;      // For simple rectangular rooms (meters)
  polygon?: Polygon;    // For arbitrary rooms defined by perimeter vertices
  obstacles?: Polygon[];// Pillars, bars, posts, structural elements
}

export type ClearanceStatus = 'GREEN' | 'AMBER' | 'RED';

export interface SideClearance {
  side: 'front' | 'back' | 'left' | 'right';
  clearanceMeters: number;
  requiredCueLengthInches: 57 | 48 | 36;
  isRestricted: boolean;
  message?: string;
}

export interface TableClearanceResult {
  tableId: string;
  status: ClearanceStatus;
  physicalIntersects: boolean;
  cueIntersects: boolean;
  sideClearances: SideClearance[];
  summaryMessage: string;
  physicalPolygon: Polygon;
  cuePolygon: Polygon;
}
