import { describe, expect, it } from 'vitest';
import {
  TABLE_SPECS,
  evaluateTableClearance,
  getObbVertices,
  testPolygonPolygonSAT,
  STANDARD_CUE_CLEARANCE_METERS,
} from '../src';

describe('Clearance Engine Specifications', () => {
  it('has exact metric table dimensions from spec', () => {
    const pub7 = TABLE_SPECS.SEVEN_FOOT_PUB;
    expect(pub7.cabinetLength).toBe(2.14);
    expect(pub7.cabinetWidth).toBe(1.22);
    expect(pub7.minRoomLength57).toBe(5.14);
    expect(pub7.minRoomWidth57).toBe(4.22);

    const pro8 = TABLE_SPECS.EIGHT_FOOT_PRO;
    expect(pro8.cabinetLength).toBe(2.44);
    expect(pro8.cabinetWidth).toBe(1.32);

    const snooker12 = TABLE_SPECS.TWELVE_FOOT_SNOOKER;
    expect(snooker12.cabinetLength).toBe(3.85);
    expect(snooker12.cabinetWidth).toBe(2.05);
  });
});

describe('OBB Geometry & SAT Collision', () => {
  it('generates correct vertices for an axis-aligned table', () => {
    const vertices = getObbVertices({
      center: { x: 3, y: 3 },
      width: 2,
      height: 1,
      rotation: 0,
    });

    expect(vertices).toHaveLength(4);
    expect(vertices[0]).toEqual({ x: 2, y: 2.5 });
    expect(vertices[1]).toEqual({ x: 4, y: 2.5 });
    expect(vertices[2]).toEqual({ x: 4, y: 3.5 });
    expect(vertices[3]).toEqual({ x: 2, y: 3.5 });
  });

  it('detects polygon collisions using SAT', () => {
    const polyA = {
      vertices: [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
      ],
    };

    const polyBOverlapping = {
      vertices: [
        { x: 1.5, y: 1.5 },
        { x: 3, y: 1.5 },
        { x: 3, y: 3 },
        { x: 1.5, y: 3 },
      ],
    };

    const polyCSeparate = {
      vertices: [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 6, y: 6 },
        { x: 5, y: 6 },
      ],
    };

    expect(testPolygonPolygonSAT(polyA, polyBOverlapping)).toBe(true);
    expect(testPolygonPolygonSAT(polyA, polyCSeparate)).toBe(false);
  });
});

describe('Room Clearance Evaluation', () => {
  it('classifies a spacious room as GREEN', () => {
    // 7ft table (2.14m x 1.22m) centered in a 6.0m x 5.0m room
    const result = evaluateTableClearance(
      {
        id: 'table-1',
        sizeKey: 'SEVEN_FOOT_PUB',
        center: { x: 3.0, y: 2.5 },
        rotation: 0,
      },
      {
        length: 6.0,
        width: 5.0,
      }
    );

    expect(result.status).toBe('GREEN');
    expect(result.physicalIntersects).toBe(false);
    expect(result.cueIntersects).toBe(false);
    expect(result.sideClearances.every((s) => !s.isRestricted)).toBe(true);
  });

  it('classifies restricted walls as AMBER with short cue advisories', () => {
    // 7ft table centered in a 4.6m x 3.8m room (clearance < 1.45m on sides)
    const result = evaluateTableClearance(
      {
        id: 'table-2',
        sizeKey: 'SEVEN_FOOT_PUB',
        center: { x: 2.3, y: 1.9 },
        rotation: 0,
      },
      {
        length: 4.6,
        width: 3.8,
      }
    );

    expect(result.status).toBe('AMBER');
    expect(result.physicalIntersects).toBe(false);
    expect(result.cueIntersects).toBe(true);
    expect(result.sideClearances.some((s) => s.isRestricted)).toBe(true);
    expect(result.summaryMessage).toContain('short cue');
  });

  it('classifies physical collision as RED', () => {
    // 7ft table placed so that it collides with the wall (x=0.5m)
    const result = evaluateTableClearance(
      {
        id: 'table-3',
        sizeKey: 'SEVEN_FOOT_PUB',
        center: { x: 0.5, y: 0.5 },
        rotation: 0,
      },
      {
        length: 6.0,
        width: 5.0,
      }
    );

    expect(result.status).toBe('RED');
    expect(result.physicalIntersects).toBe(true);
    expect(result.summaryMessage).toContain('Critical: Table physically collides');
  });
});
