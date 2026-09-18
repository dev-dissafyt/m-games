export type OrderType =
  | 'PURCHASE_CUSTOM'
  | 'RENTAL_COMMERCIAL'
  | 'RENTAL_RESIDENTIAL';

export type RentalTerm =
  | 'MONTH_TO_MONTH'
  | 'THREE_MONTHS'
  | 'SIX_MONTHS'
  | 'TWELVE_MONTHS';

export type OrderStatus =
  | 'LEAD_NEW'
  | 'CALL_SCHEDULED'
  | 'SPEC_APPROVED'
  | 'DEPOSIT_PENDING'
  | 'IN_MANUFACTURE'
  | 'READY_FOR_DISPATCH'
  | 'DISPATCHED'
  | 'INSTALLED_ACTIVE'
  | 'CANCELLED';

export type TableSize =
  | 'SEVEN_FOOT_PUB'
  | 'EIGHT_FOOT_PRO'
  | 'TWELVE_FOOT_SNOOKER';

export type FinishType =
  | 'WOOD_SOLID'
  | 'STEEL_POWDER_COAT'
  | 'VINYL_WRAP';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string | null;
  vatNumber?: string | null;
  venueType?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TableConfiguration {
  id: string;
  orderId: string;
  tableSize: TableSize;
  bodyFinishType: FinishType;
  bodyColorFinish: string;
  feltColor: string;
  feltTexture: string;
  customWrapUrl?: string | null;
  coinOpMechanic: boolean;
  hardwareFinish: string;
  generatedSku: string;
  renderSnapshotUrl?: string | null;
}

export interface SiteAudit {
  id: string;
  orderId: string;
  deliveryAddress: string;
  deliveryCity: string;
  postalCode: string;
  isGroundFloor: boolean;
  hasElevator: boolean;
  stairsCount: number;
  stairType?: string | null;
  doorwayWidthCm?: number | null;
  floorPlanJson?: any;
  floorPlanImageUrl?: string | null;
  ingressVideoUrl?: string | null;
  videoReviewNotes?: string | null;
  crewRecommended: number;
  requiresRiggingGear: boolean;
}

export interface RentalAgreement {
  id: string;
  orderId: string;
  term: RentalTerm;
  monthlyRateZar: number;
  depositZar: number;
  coinOpSplitPct?: number | null;
  includedReclothMonths: number;
  nextServiceDueDate?: string | null;
  contractSignedAt?: string | null;
  contractPdfUrl?: string | null;
}

export interface InstallationSignoff {
  id: string;
  orderId: string;
  installerName: string;
  slateLeveled: boolean;
  clothTensioned: boolean;
  cushionsChecked: boolean;
  spiritLevelPhotoUrl?: string | null;
  completedRoomPhotoUrl?: string | null;
  customerSignatureUrl?: string | null;
  signedAt: string;
}

export interface OrderWithRelations {
  id: string;
  orderNumber: string;
  userId: string;
  user: User;
  type: OrderType;
  status: OrderStatus;
  quotedTotalZar: number;
  depositRequiredZar: number;
  depositPaidAt?: string | null;
  leadTimeWeeks: number;
  configuration?: TableConfiguration | null;
  siteAudit?: SiteAudit | null;
  rentalAgreement?: RentalAgreement | null;
  installationSignoff?: InstallationSignoff | null;
  createdAt: string;
  updatedAt: string;
}
