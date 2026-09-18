import { NextResponse } from 'next/server';
import { orderStore, OrderWithRelations } from '@m-games/database';

export async function GET() {
  const orders = orderStore.getAll();
  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderNumber = `MG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `ord-${Date.now()}`;
    const userId = `usr-${Date.now()}`;

    const newOrder: OrderWithRelations = {
      id,
      orderNumber,
      userId,
      type: body.orderType || 'PURCHASE_CUSTOM',
      status: 'LEAD_NEW',
      quotedTotalZar: parseFloat(body.totalPrice) || 38000,
      depositRequiredZar: parseFloat(body.depositPrice) || 19000,
      depositPaidAt: new Date().toISOString(),
      leadTimeWeeks: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: userId,
        name: body.customerName || 'Private Client',
        email: body.customerEmail || 'client@example.co.za',
        phone: body.customerPhone || '+27820000000',
        companyName: body.companyName || null,
        vatNumber: body.vatNumber || null,
        venueType: body.venueType || 'Residential',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      configuration: {
        id: `cfg-${Date.now()}`,
        orderId: id,
        tableSize: body.size || 'EIGHT_FOOT_PRO',
        bodyFinishType: 'WOOD_SOLID',
        bodyColorFinish: body.wood || 'Solid Walnut',
        feltColor: body.felt || 'Electric Blue',
        feltTexture: 'tournament_worsted',
        customWrapUrl: null,
        coinOpMechanic: body.coinOp === 'true',
        hardwareFinish: body.hardware || 'chrome',
        generatedSku: body.sku || 'MG-8FT-WALNUT-BLU-72',
        renderSnapshotUrl: null,
      },
      siteAudit: {
        id: `aud-${Date.now()}`,
        orderId: id,
        deliveryAddress: body.deliveryAddress || '123 Main Street',
        deliveryCity: body.deliveryCity || 'Cape Town',
        postalCode: body.postalCode || '8001',
        isGroundFloor: body.isGroundFloor === 'true',
        hasElevator: body.hasElevator === 'true',
        stairsCount: parseInt(body.stairsCount) || 0,
        stairType: body.stairType || 'straight',
        doorwayWidthCm: parseFloat(body.doorwayWidthCm) || 90,
        floorPlanJson: null,
        floorPlanImageUrl: null,
        ingressVideoUrl: body.ingressVideoUrl || null,
        videoReviewNotes: null,
        crewRecommended: body.isGroundFloor === 'true' ? 2 : 4,
        requiresRiggingGear: body.isGroundFloor !== 'true',
      },
      rentalAgreement:
        body.orderType === 'RENTAL_COMMERCIAL'
          ? {
              id: `agr-${Date.now()}`,
              orderId: id,
              term: body.rentalTerm || 'SIX_MONTHS',
              monthlyRateZar: parseFloat(body.monthlyRate) || 2200,
              depositZar: parseFloat(body.depositPrice) || 4500,
              coinOpSplitPct: 50.0,
              includedReclothMonths: 6,
              nextServiceDueDate: null,
              contractSignedAt: new Date().toISOString(),
              contractPdfUrl: null,
            }
          : null,
      installationSignoff: null,
    };

    orderStore.create(newOrder);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
