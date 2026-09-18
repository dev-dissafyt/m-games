'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Table3DViewer } from '@/components/table-3d-viewer';
import { formatZar } from '@m-games/ui';
import {
  evaluateTableClearance,
  PlacedTable,
  RoomLayout,
  TableClearanceResult,
  TABLE_SPECS,
  TableSizeKey,
} from '@m-games/clearance-engine';
import {
  Sparkles,
  Compass,
  Layers,
  Ruler,
  Check,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCw,
  Trash2,
  Plus,
  ArrowRight,
  Download,
  Eye,
  Sliders,
  Shield,
  Maximize2,
  Box,
} from 'lucide-react';

const SIZES = [
  {
    key: 'SEVEN_FOOT_PUB' as const,
    name: '7ft Pub Classic',
    subtitle: 'The Standard South African Tavern & Games Room Size',
    dims: '2.14m × 1.22m',
    room: '5.14m × 4.22m',
    weight: '310 kg',
    price: 32000,
    code: '7FT',
  },
  {
    key: 'EIGHT_FOOT_PRO' as const,
    name: '8ft Pro Tournament',
    subtitle: 'Championship Pro Playfield • Luxury Dining Conversion Ready',
    dims: '2.44m × 1.32m',
    room: '5.44m × 4.32m',
    weight: '380 kg',
    price: 38000,
    code: '8FT',
  },
  {
    key: 'TWELVE_FOOT_SNOOKER' as const,
    name: '12ft Championship Snooker',
    subtitle: 'Full-Scale Estate Snooker Table with 5-Piece Matched Slate',
    dims: '3.85m × 2.05m',
    room: '6.85m × 5.05m',
    weight: '1,100 kg',
    price: 75000,
    code: '12FT',
  },
];

const FELT_COLORS = [
  { name: 'Speed Green', hex: '#115e2e', code: 'GRN', desc: 'Classic English Championship Wool' },
  { name: 'Burgundy Red', hex: '#660b1d', code: 'BUR', desc: 'Opulent Warm Lounge Finish' },
  { name: 'Electric Blue', hex: '#0a4291', code: 'BLU', desc: 'Contemporary TV Tournament Speed' },
  { name: 'Slate Grey', hex: '#2e3740', code: 'GRY', desc: 'Monochrome Architectural Minimalist' },
  { name: 'Plum Royal', hex: '#441447', code: 'PLM', desc: 'Deep Velvet Luxury Shade' },
];

const WOOD_FINISHES = [
  {
    name: 'Wild Kiaat Natural Oil',
    hex: '#965225',
    code: 'KIAAT',
    surcharge: 0,
    desc: 'Indigenous South African flame grain, hand-rubbed satin oil',
  },
  {
    name: 'Solid African Walnut',
    hex: '#422714',
    code: 'WALNUT',
    surcharge: 2500,
    desc: 'Dark chocolate rich tones with deep interlocking grain',
  },
  {
    name: 'African Mahogany',
    hex: '#5c1f13',
    code: 'MAHOGANY',
    surcharge: 3000,
    desc: 'Classic reddish luster with high-polish gloss lacquer',
  },
  {
    name: 'Matte Black Steel A-Frame',
    hex: '#18191c',
    code: 'BLKSTEEL',
    surcharge: 4500,
    desc: 'Contemporary architectural powder-coated industrial trestle',
  },
  {
    name: 'Pure White Piano Lacquer',
    hex: '#f5f5f7',
    code: 'WHTLACQUER',
    surcharge: 2000,
    desc: 'Multi-coat hand-buffed high gloss penthouse luxury',
  },
];

const HARDWARE_FINISHES = [
  { name: 'Mirror Chrome', hex: '#d4d8df', code: 'CHR' },
  { name: 'Antique Cast Brass', hex: '#e5a522', code: 'BRS' },
  { name: 'Matte Obsidian Black', hex: '#161719', code: 'BLK' },
];

const ROOM_PRESETS = [
  { name: 'Standard Pub Bar', length: 6.5, width: 5.2, desc: 'Ideal for 7ft Pub table' },
  { name: 'Spacious Sports Lounge', length: 8.0, width: 6.2, desc: 'Ample 57" cue clearance for 8ft tables' },
  { name: 'Tight Harbour Tavern', length: 4.8, width: 3.8, desc: 'Demonstrates Amber short-cue restriction' },
];

function UnifiedDesignerStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mode switcher: '3d' (Table Atelier) vs 'planner' (2D Venue CAD)
  const [designerMode, setDesignerMode] = useState<'3d' | 'planner'>(
    searchParams.get('mode') === 'planner' ? 'planner' : '3d'
  );

  // -------------------------------------------------------------
  // 3D Table Configurator State
  // -------------------------------------------------------------
  const sizeParam = searchParams.get('size');
  const matchedSize = SIZES.find((s) => s.key === sizeParam);
  const [selectedSize, setSelectedSize] = useState<typeof SIZES[0]>(matchedSize || SIZES[1]); // Default 8ft Pro or param
  const [selectedFelt, setSelectedFelt] = useState<typeof FELT_COLORS[0]>(FELT_COLORS[2]);
  const [selectedWood, setSelectedWood] = useState<typeof WOOD_FINISHES[0]>(WOOD_FINISHES[0]);
  const [selectedHardware, setSelectedHardware] = useState<typeof HARDWARE_FINISHES[0]>(HARDWARE_FINISHES[1]);
  const [coinOp, setCoinOp] = useState(false);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  // Price Calculation
  const basePrice = selectedSize.price;
  const woodSurcharge = selectedWood.surcharge;
  const coinOpPrice = coinOp ? 3500 : 0;
  const totalPrice = basePrice + woodSurcharge + coinOpPrice;
  const depositPrice = Math.round(totalPrice * 0.5);

  const generatedSku = `MG-${selectedSize.code}-${selectedWood.code}-${selectedFelt.code}${
    coinOp ? '-COIN' : ''
  }-${selectedHardware.code}`;

  // -------------------------------------------------------------
  // 2D Venue CAD Planner State
  // -------------------------------------------------------------
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [roomLength, setRoomLength] = useState<number>(6.5);
  const [roomWidth, setRoomWidth] = useState<number>(5.2);

  const [tables, setTables] = useState<PlacedTable[]>([
    {
      id: 'table-1',
      sizeKey: selectedSize.key,
      center: { x: 3.25, y: 2.6 },
      rotation: 0,
    },
  ]);

  const [selectedTableId, setSelectedTableId] = useState<string>('table-1');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Synchronize 3D table selection into the 2D CAD Planner
  const handleSelectSize = (size: typeof SIZES[0]) => {
    setSelectedSize(size);
    setTables((prev) =>
      prev.map((t, idx) => (idx === 0 ? { ...t, sizeKey: size.key } : t))
    );
  };

  const roomLayout: RoomLayout = { length: roomLength, width: roomWidth };
  const clearanceResults: TableClearanceResult[] = tables.map((t) =>
    evaluateTableClearance(t, roomLayout)
  );
  const selectedTable = tables.find((t) => t.id === selectedTableId);
  const selectedResult = clearanceResults.find((r) => r.tableId === selectedTableId);

  // Canvas scaling
  const PADDING = 44;
  const canvasWidth = 780;
  const canvasHeight = 540;
  const scale = Math.min(
    (canvasWidth - 2 * PADDING) / roomLength,
    (canvasHeight - 2 * PADDING) / roomWidth
  );
  const originX = (canvasWidth - roomLength * scale) / 2;
  const originY = (canvasHeight - roomWidth * scale) / 2;

  // Render 2D CAD Canvas Blueprint
  useEffect(() => {
    if (designerMode !== 'planner') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 1. Blueprint Background
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Grid lines
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#0e1828';
    for (let x = 0; x <= roomLength; x += 0.25) {
      const px = originX + x * scale;
      ctx.beginPath();
      ctx.moveTo(px, originY);
      ctx.lineTo(px, originY + roomWidth * scale);
      ctx.stroke();
    }
    for (let y = 0; y <= roomWidth; y += 0.25) {
      const py = originY + y * scale;
      ctx.beginPath();
      ctx.moveTo(originX, py);
      ctx.lineTo(originX + roomLength * scale, py);
      ctx.stroke();
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#1b2940';
    for (let x = 0; x <= roomLength; x += 1.0) {
      const px = originX + x * scale;
      ctx.beginPath();
      ctx.moveTo(px, originY);
      ctx.lineTo(px, originY + roomWidth * scale);
      ctx.stroke();
    }
    for (let y = 0; y <= roomWidth; y += 1.0) {
      const py = originY + y * scale;
      ctx.beginPath();
      ctx.moveTo(originX, py);
      ctx.lineTo(originX + roomLength * scale, py);
      ctx.stroke();
    }

    // 3. Concrete Perimeter Walls
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(originX, originY, roomLength * scale, roomWidth * scale);

    // Wall Dimension Labels
    ctx.fillStyle = '#7dd3fc';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `ROOM LENGTH: ${roomLength.toFixed(2)}m`,
      originX + (roomLength * scale) / 2,
      originY - 14
    );

    ctx.save();
    ctx.translate(originX - 16, originY + (roomWidth * scale) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`ROOM WIDTH: ${roomWidth.toFixed(2)}m`, 0, 0);
    ctx.restore();

    // 4. Tables with 1.45m Cue Envelopes
    tables.forEach((table) => {
      const result = evaluateTableClearance(table, roomLayout);
      const isSelected = table.id === selectedTableId;

      ctx.save();
      const centerX = originX + table.center.x * scale;
      const centerY = originY + table.center.y * scale;
      ctx.translate(centerX, centerY);
      ctx.rotate(table.rotation);

      const spec = TABLE_SPECS[table.sizeKey];
      const cabLen = spec.cabinetLength * scale;
      const cabWid = spec.cabinetWidth * scale;
      const cueBuffer = 1.45 * scale;

      // 1.45m Cue Envelope
      let envStroke = 'rgba(34, 197, 94, 0.8)';
      let envFill = 'rgba(34, 197, 94, 0.08)';
      if (result.status === 'RED') {
        envStroke = 'rgba(239, 68, 68, 0.9)';
        envFill = 'rgba(239, 68, 68, 0.18)';
      } else if (result.status === 'AMBER') {
        envStroke = 'rgba(245, 158, 11, 0.85)';
        envFill = 'rgba(245, 158, 11, 0.12)';
      }

      ctx.fillStyle = envFill;
      ctx.strokeStyle = envStroke;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      const envW = cabLen + 2 * cueBuffer;
      const envH = cabWid + 2 * cueBuffer;
      ctx.strokeRect(-envW / 2, -envH / 2, envW, envH);
      ctx.fillRect(-envW / 2, -envH / 2, envW, envH);
      ctx.setLineDash([]);

      // Cabinet Frame
      ctx.fillStyle = result.status === 'RED' ? '#7f1d1d' : '#172033';
      ctx.strokeStyle = isSelected ? '#fbbf24' : '#475569';
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.strokeRect(-cabLen / 2, -cabWid / 2, cabLen, cabWid);
      ctx.fillRect(-cabLen / 2, -cabWid / 2, cabLen, cabWid);

      // Playfield Felt
      const playLen = spec.playfieldLength * scale;
      const playWid = spec.playfieldWidth * scale;
      ctx.fillStyle = selectedFelt.hex;
      ctx.fillRect(-playLen / 2, -playWid / 2, playLen, playWid);

      // Pockets
      ctx.fillStyle = '#022c22';
      const pw = cabWid / 2 - 4;
      const pl = cabLen / 2 - 4;
      [
        [-pl, -pw],
        [pl, -pw],
        [-pl, pw],
        [pl, pw],
        [0, -pw],
        [0, pw],
      ].forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(spec.label.split(' ')[0], 0, -3);
      ctx.font = '10px monospace';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`ROT: ${Math.round((table.rotation * 180) / Math.PI)}°`, 0, 11);

      if (isSelected) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(cabLen, cabWid) / 2 + 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    });
  }, [tables, roomLength, roomWidth, selectedTableId, scale, originX, originY, designerMode, selectedFelt.hex]);

  // Touch and Mouse Handlers for 2D Dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleFactorX = canvas.width / rect.width;
    const scaleFactorY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleFactorX;
    const mouseY = (e.clientY - rect.top) * scaleFactorY;

    const meterX = (mouseX - originX) / scale;
    const meterY = (mouseY - originY) / scale;

    for (const table of tables) {
      const spec = TABLE_SPECS[table.sizeKey];
      const radius = Math.max(spec.cabinetLength, spec.cabinetWidth) / 1.4;
      const dist = Math.hypot(meterX - table.center.x, meterY - table.center.y);

      if (dist <= radius) {
        setSelectedTableId(table.id);
        setIsDragging(true);
        setDragOffset({
          x: meterX - table.center.x,
          y: meterY - table.center.y,
        });
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedTableId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleFactorX = canvas.width / rect.width;
    const scaleFactorY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleFactorX;
    const mouseY = (e.clientY - rect.top) * scaleFactorY;

    const rawMeterX = (mouseX - originX) / scale;
    const rawMeterY = (mouseY - originY) / scale;

    const newX = Math.max(0.6, Math.min(roomLength - 0.6, rawMeterX - dragOffset.x));
    const newY = Math.max(0.6, Math.min(roomWidth - 0.6, rawMeterY - dragOffset.y));

    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedTableId
          ? {
              ...t,
              center: {
                x: Math.round(newX * 100) / 100,
                y: Math.round(newY * 100) / 100,
              },
            }
          : t
      )
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleFactorX = canvas.width / rect.width;
    const scaleFactorY = canvas.height / rect.height;

    const touchX = (e.touches[0].clientX - rect.left) * scaleFactorX;
    const touchY = (e.touches[0].clientY - rect.top) * scaleFactorY;

    const meterX = (touchX - originX) / scale;
    const meterY = (touchY - originY) / scale;

    for (const table of tables) {
      const spec = TABLE_SPECS[table.sizeKey];
      const radius = Math.max(spec.cabinetLength, spec.cabinetWidth) / 1.4;
      const dist = Math.hypot(meterX - table.center.x, meterY - table.center.y);

      if (dist <= radius) {
        setSelectedTableId(table.id);
        setIsDragging(true);
        setDragOffset({
          x: meterX - table.center.x,
          y: meterY - table.center.y,
        });
        return;
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedTableId || e.touches.length !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleFactorX = canvas.width / rect.width;
    const scaleFactorY = canvas.height / rect.height;

    const touchX = (e.touches[0].clientX - rect.left) * scaleFactorX;
    const touchY = (e.touches[0].clientY - rect.top) * scaleFactorY;

    const rawMeterX = (touchX - originX) / scale;
    const rawMeterY = (touchY - originY) / scale;

    const newX = Math.max(0.6, Math.min(roomLength - 0.6, rawMeterX - dragOffset.x));
    const newY = Math.max(0.6, Math.min(roomWidth - 0.6, rawMeterY - dragOffset.y));

    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedTableId
          ? {
              ...t,
              center: {
                x: Math.round(newX * 100) / 100,
                y: Math.round(newY * 100) / 100,
              },
            }
          : t
      )
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const addTable = (sizeKey: TableSizeKey) => {
    const newId = `table-${Date.now()}`;
    const newTable: PlacedTable = {
      id: newId,
      sizeKey,
      center: {
        x: Math.round((roomLength / 2) * 10) / 10,
        y: Math.round((roomWidth / 2) * 10) / 10,
      },
      rotation: 0,
    };
    setTables([...tables, newTable]);
    setSelectedTableId(newId);
  };

  const rotateSelectedTable = (deltaDegrees: number) => {
    if (!selectedTableId) return;
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === selectedTableId) {
          const currentDeg = (t.rotation * 180) / Math.PI;
          const newDeg = (currentDeg + deltaDegrees + 360) % 360;
          return {
            ...t,
            rotation: (newDeg * Math.PI) / 180,
          };
        }
        return t;
      })
    );
  };

  const removeSelectedTable = () => {
    if (!selectedTableId) return;
    const next = tables.filter((t) => t.id !== selectedTableId);
    setTables(next);
    setSelectedTableId(next.length > 0 ? next[0].id : '');
  };

  const applyPreset = (p: typeof ROOM_PRESETS[0]) => {
    setRoomLength(p.length);
    setRoomWidth(p.width);
    setTables([
      {
        id: 'table-1',
        sizeKey: selectedSize.key,
        center: { x: p.length / 2, y: p.width / 2 },
        rotation: 0,
      },
    ]);
  };

  const exportBlueprintPng = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `M-Games-Architectural-Blueprint-${roomLength}x${roomWidth}m.png`;
    a.click();
  };

  const handleProceed = () => {
    const query = new URLSearchParams({
      sku: generatedSku,
      size: selectedSize.key,
      sizeName: selectedSize.name,
      felt: selectedFelt.name,
      wood: selectedWood.name,
      hardware: selectedHardware.name,
      coinOp: coinOp.toString(),
      totalPrice: totalPrice.toString(),
      depositPrice: depositPrice.toString(),
    });
    router.push(`/checkout/ingress?${query.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-28 lg:pb-12 space-y-6 sm:space-y-8">
      {/* Studio Header with Segmented Variation Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-800/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-[11px] font-mono text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> M-Games Precision Design Studio
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            {designerMode === '3d'
              ? '3D Table Atelier & Material Configurator'
              : '2D Venue Clearance & Cue Envelope CAD'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {designerMode === '3d'
              ? 'Customize tournament worsted wool, native South African hardwoods, and pocket iron castings in live 3D.'
              : 'Simulate 1.45m tournament cue stroke envelopes, room perimeter walls, and SAT polygon clearances.'}
          </p>
        </div>

        {/* Segmented Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setDesignerMode('3d')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              designerMode === '3d'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>3D Table Atelier</span>
          </button>

          <button
            type="button"
            onClick={() => setDesignerMode('planner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              designerMode === 'planner'
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>2D Venue Planner</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          VARIATION 1: 3D TABLE ATELIER MODE
         ========================================================= */}
      {designerMode === '3d' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: 3D Canvas & Tech Specs (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Table3DViewer
              tableSize={selectedSize.key}
              feltColor={selectedFelt.hex}
              woodColor={selectedWood.hex}
              hardwareColor={selectedHardware.hex}
              coinOp={coinOp}
              onSnapshotReady={(data) => setSnapshotUrl(data)}
            />

            {/* Quick Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#090b10] border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-mono uppercase">OUTER DIMS</div>
                <div className="text-xs font-bold text-white font-mono mt-0.5">{selectedSize.dims}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#090b10] border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-mono uppercase">MIN ROOM (57&quot;)</div>
                <div className="text-xs font-bold text-amber-400 font-mono mt-0.5">{selectedSize.room}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#090b10] border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-mono uppercase">SLATE MASS</div>
                <div className="text-xs font-bold text-white font-mono mt-0.5">{selectedSize.weight}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[#090b10] border border-zinc-800 text-center">
                <div className="text-[10px] text-zinc-500 font-mono uppercase">LEAD TIME</div>
                <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">4–6 Weeks</div>
              </div>
            </div>

            {/* Switch to 2D Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-zinc-900 to-zinc-900 border border-sky-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <span className="font-bold text-white">Will this table fit your exact room?</span>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    Test your venue walls in the 2D CAD Planner with full 1.45m cue stroke safety envelopes.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDesignerMode('planner')}
                className="px-4 py-2 rounded-xl bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-700/50 font-semibold shrink-0 transition-colors text-center"
              >
                Switch to 2D Planner →
              </button>
            </div>
          </div>

          {/* Right: Customization Selectors (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  1. Table Size & Playfield
                </label>
                <span className="text-[11px] text-zinc-500">19mm Italian Slate</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {SIZES.map((size) => {
                  const isSelected = selectedSize.key === size.key;
                  return (
                    <button
                      key={size.key}
                      type="button"
                      onClick={() => handleSelectSize(size)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-amber-500/80 bg-amber-950/20 text-white shadow-md'
                          : 'border-zinc-800 bg-[#090b10] text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm flex items-center gap-2">
                            {size.name}
                            {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">{size.subtitle}</div>
                          <div className="text-[11px] text-zinc-500 mt-1 font-mono">
                            {size.dims} • Room: <span className="text-amber-400/90">{size.room}</span>
                          </div>
                        </div>
                        <div className="text-sm font-extrabold text-white font-mono">
                          {formatZar(size.price)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Felt */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  2. Tournament Worsted Wool
                </label>
                <span className="text-[11px] text-zinc-400 font-medium">Strachan 6811 Spec</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {FELT_COLORS.map((felt) => {
                  const isSelected = selectedFelt.hex === felt.hex;
                  return (
                    <button
                      key={felt.hex}
                      type="button"
                      onClick={() => setSelectedFelt(felt)}
                      className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all text-left ${
                        isSelected
                          ? 'border-amber-500/80 bg-zinc-900 text-white shadow-sm'
                          : 'border-zinc-800/80 bg-[#090b10] text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-xl shadow-md border border-white/20 shrink-0"
                        style={{ backgroundColor: felt.hex }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{felt.name}</div>
                        <div className="text-[11px] text-zinc-500 truncate">{felt.desc}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Wood Finish */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  3. South African Hardwood Finish
                </label>
                <span className="text-[11px] text-zinc-400 font-medium">Hand-Rubbed Satin</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {WOOD_FINISHES.map((wood) => {
                  const isSelected = selectedWood.name === wood.name;
                  return (
                    <button
                      key={wood.name}
                      type="button"
                      onClick={() => setSelectedWood(wood)}
                      className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all text-left ${
                        isSelected
                          ? 'border-amber-500/80 bg-amber-950/20 text-white shadow-sm'
                          : 'border-zinc-800/80 bg-[#090b10] text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-xl shadow-md border border-white/20 shrink-0"
                        style={{ backgroundColor: wood.hex }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{wood.name}</div>
                        <div className="text-[11px] text-zinc-500 truncate">{wood.desc}</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-zinc-400 shrink-0">
                        {wood.surcharge > 0 ? `+${formatZar(wood.surcharge)}` : 'Included'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Hardware */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono block">
                4. Corner Pocket Castings & Accents
              </label>
              <div className="grid grid-cols-3 gap-2">
                {HARDWARE_FINISHES.map((hw) => {
                  const isSelected = selectedHardware.name === hw.name;
                  return (
                    <button
                      key={hw.name}
                      type="button"
                      onClick={() => setSelectedHardware(hw)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-950/20 text-white'
                          : 'border-zinc-800 bg-[#090b10] text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: hw.hex }}
                      />
                      <span className="text-[11px] text-center font-medium">{hw.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Coin-Op */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <label className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-800 bg-[#090b10] cursor-pointer hover:border-amber-500/50 transition-colors">
                <div>
                  <div className="text-xs font-bold text-white">Commercial Mechanical Coin Acceptor</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Pre-calibrated dual coin drop with key cash box
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-amber-400 font-bold">+R 3,500</span>
                  <input
                    type="checkbox"
                    checked={coinOp}
                    onChange={(e) => setCoinOp(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-zinc-950 border-zinc-700"
                  />
                </div>
              </label>
            </div>

            {/* Pricing Summary Box */}
            <div className="p-6 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-950/30 to-[#07080d] space-y-5 shadow-2xl">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Base ({selectedSize.name}):</span>
                  <span className="font-mono text-zinc-200">{formatZar(basePrice)}</span>
                </div>
                {woodSurcharge > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>{selectedWood.name}:</span>
                    <span className="font-mono text-zinc-200">+{formatZar(woodSurcharge)}</span>
                  </div>
                )}
                {coinOp && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Coin-Op Mechanism:</span>
                    <span className="font-mono text-zinc-200">+{formatZar(coinOpPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-3 border-t border-zinc-800/80 text-white">
                  <span className="font-bold text-sm">Quoted Total:</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {formatZar(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>50% Manufacturing Deposit:</span>
                  <span className="font-mono text-zinc-300 font-bold">{formatZar(depositPrice)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-950 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Lock Spec & Check Stairway Access
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          VARIATION 2: 2D VENUE CAD PLANNER MODE
         ========================================================= */}
      {designerMode === 'planner' && (
        <div className="space-y-6">
          {/* Room Preset Chips */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 shrink-0">
              Room Presets:
            </span>
            {ROOM_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-3 py-1.5 rounded-xl bg-[#0b0e14] border border-zinc-800 hover:border-sky-500/50 text-xs text-zinc-300 hover:text-white shrink-0 transition-colors flex items-center gap-2"
              >
                <span className="font-semibold">{p.name}</span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  ({p.length}m × {p.width}m)
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={exportBlueprintPng}
              className="ml-auto px-3.5 py-1.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-200 flex items-center gap-1.5 shrink-0 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export CAD PNG</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: Interactive Canvas (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#060a12] shadow-2xl">
                <canvas
                  ref={canvasRef}
                  width={canvasWidth}
                  height={canvasHeight}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                  className="w-full h-auto cursor-crosshair block select-none touch-none"
                />

                {/* Legend */}
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto flex flex-wrap items-center gap-3 bg-[#080c14]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-zinc-800 text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> 57&quot; Stroke (&gt;1.45m)
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> 48&quot; Short Cue
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Wall Clash
                  </span>
                </div>
              </div>

              {/* Rotation & Quick Action Toolbar */}
              {selectedTable && (
                <div className="p-4 rounded-2xl bg-[#090b10] border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">Selected Table:</span>
                    <span className="font-bold text-white">
                      {TABLE_SPECS[selectedTable.sizeKey].label}
                    </span>
                    <span className="font-mono text-amber-400">
                      ({selectedTable.center.x}m, {selectedTable.center.y}m)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => rotateSelectedTable(-15)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                      title="Rotate -15°"
                    >
                      <RotateCw className="w-4 h-4 -scale-x-100" />
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateSelectedTable(15)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                      title="Rotate +15°"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateSelectedTable(90)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono font-bold"
                    >
                      +90°
                    </button>
                    <button
                      type="button"
                      onClick={removeSelectedTable}
                      className="p-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/70 text-rose-300 border border-rose-800/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Room Dimension Sliders, Table Addition & SAT Diagnostic (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Outer Walls */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#090b10] border border-zinc-800 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                  Room Outer Dimensions (Meters)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Room Length (X)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="3.5"
                      max="16.0"
                      value={roomLength}
                      onChange={(e) => setRoomLength(parseFloat(e.target.value) || 5.0)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Room Width (Y)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="3.0"
                      max="14.0"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(parseFloat(e.target.value) || 4.0)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Add Table Controls */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#090b10] border border-zinc-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                  Add Additional Tables
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => addTable('SEVEN_FOOT_PUB')}
                    className="flex items-center justify-between p-3 rounded-2xl border border-zinc-800 hover:border-sky-500/60 bg-zinc-950 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-sky-400">
                        + Add 7ft Pub Classic
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">2.14m × 1.22m Outer Footprint</div>
                    </div>
                    <Plus className="w-4 h-4 text-zinc-500 group-hover:text-sky-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => addTable('EIGHT_FOOT_PRO')}
                    className="flex items-center justify-between p-3 rounded-2xl border border-zinc-800 hover:border-sky-500/60 bg-zinc-950 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-sky-400">
                        + Add 8ft Pro Tournament
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">2.44m × 1.32m Outer Footprint</div>
                    </div>
                    <Plus className="w-4 h-4 text-zinc-500 group-hover:text-sky-400" />
                  </button>
                </div>
              </div>

              {/* SAT Collision Diagnostic */}
              {selectedResult && (
                <div
                  className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-3.5 shadow-xl ${
                    selectedResult.status === 'GREEN'
                      ? 'bg-emerald-950/25 border-emerald-500/50 text-emerald-100'
                      : selectedResult.status === 'AMBER'
                      ? 'bg-amber-950/25 border-amber-500/50 text-amber-100'
                      : 'bg-rose-950/25 border-rose-500/50 text-rose-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {selectedResult.status === 'GREEN' && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {selectedResult.status === 'AMBER' && (
                      <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    {selectedResult.status === 'RED' && (
                      <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                    )}

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider font-mono">
                        {selectedResult.status === 'GREEN'
                          ? 'Optimal Tournament Clearance'
                          : selectedResult.status === 'AMBER'
                          ? 'Restricted Stroke Flagged'
                          : 'Physical Obstruction'}
                      </div>
                      <p className="text-xs mt-1 text-zinc-300 leading-relaxed font-normal">
                        {selectedResult.summaryMessage}
                      </p>
                    </div>
                  </div>

                  {/* Wall Clearances */}
                  <div className="pt-2 border-t border-white/10 space-y-1 text-xs font-mono">
                    {selectedResult.sideClearances.map((s) => (
                      <div key={s.side} className="flex justify-between items-center">
                        <span className="capitalize text-zinc-400">{s.side} Wall:</span>
                        <span
                          className={`font-semibold ${
                            s.isRestricted ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {s.clearanceMeters}m ({s.requiredCueLengthInches}&quot;)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Proceed to Checkout CTA */}
              <button
                type="button"
                onClick={handleProceed}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 text-black font-extrabold text-sm shadow-xl shadow-sky-950 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Confirm Floor Plan & Proceed to Ingress
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Summary Action Bar (Only in 3D Mode on small screens) */}
      {designerMode === '3d' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#06080d]/95 backdrop-blur-xl border-t border-zinc-800/90 p-3 sm:p-4 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono text-zinc-400 uppercase truncate">
              {selectedSize.name.split(' ')[0]} • {selectedFelt.name}
            </div>
            <div className="text-lg font-black text-amber-400 font-mono leading-tight">
              {formatZar(totalPrice)}
            </div>
            <div className="text-[10px] text-zinc-500 font-mono truncate">
              50% Dep: {formatZar(depositPrice)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleProceed}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-950/60 flex items-center gap-1.5 active:scale-95 shrink-0"
          >
            <span>Lock Spec</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function UnifiedDesignerStudioPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#030305] text-zinc-400 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
            <span>INITIALIZING STUDIO DESIGNER...</span>
          </div>
        </div>
      }
    >
      <UnifiedDesignerStudioContent />
    </React.Suspense>
  );
}
