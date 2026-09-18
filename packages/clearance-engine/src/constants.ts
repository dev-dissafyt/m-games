import { TableDimensions, TableSizeKey } from './types';

export const STANDARD_CUE_CLEARANCE_METERS = 1.45; // 57" cue stroke envelope
export const SHORT_CUE_48_CLEARANCE_METERS = 1.20; // 48" cue stroke envelope
export const SHORT_CUE_36_CLEARANCE_METERS = 0.90; // 36" cue stroke envelope

export const TABLE_SPECS: Record<TableSizeKey, TableDimensions> = {
  SEVEN_FOOT_PUB: {
    key: 'SEVEN_FOOT_PUB',
    label: '7ft Pub Table',
    playfieldLength: 1.98,
    playfieldWidth: 0.99,
    cabinetLength: 2.14,
    cabinetWidth: 1.22,
    minRoomLength57: 5.14,
    minRoomWidth57: 4.22,
    minRoomLength48: 4.54,
    minRoomWidth48: 3.62,
  },
  EIGHT_FOOT_PRO: {
    key: 'EIGHT_FOOT_PRO',
    label: '8ft Pro Tournament Table',
    playfieldLength: 2.24,
    playfieldWidth: 1.12,
    cabinetLength: 2.44,
    cabinetWidth: 1.32,
    minRoomLength57: 5.44,
    minRoomWidth57: 4.32,
    minRoomLength48: 4.84,
    minRoomWidth48: 3.72,
  },
  TWELVE_FOOT_SNOOKER: {
    key: 'TWELVE_FOOT_SNOOKER',
    label: '12ft Championship Snooker Table',
    playfieldLength: 3.56,
    playfieldWidth: 1.78,
    cabinetLength: 3.85,
    cabinetWidth: 2.05,
    minRoomLength57: 6.85,
    minRoomWidth57: 5.05,
    minRoomLength48: 6.25,
    minRoomWidth48: 4.45,
  },
};
