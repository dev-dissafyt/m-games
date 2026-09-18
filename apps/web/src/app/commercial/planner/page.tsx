'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  evaluateTableClearance,
  PlacedTable,
  RoomLayout,
  TableClearanceResult,
  TABLE_SPECS,
  TableSizeKey,
} from '@m-games/clearance-engine';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Plus,
  RotateCw,
  Trash2,
  XCircle,
  ArrowRight,
  Layers,
  Ruler,
  Compass,
  Sparkles,
  Building,
} from 'lucide-react';

const ROOM_PRESETS = [
  { name: 'Standard Pub Bar', length: 6.5, width: 5.2, desc: 'Ideal for 7ft Pub table' },
  { name: 'Spacious Sports Lounge', length: 8.0, width: 6.2, desc: 'Ample 57" cue clearance for 8ft tables' },
  { name: 'Tight Harbour Tavern', length: 4.8, width: 3.8, desc: 'Demonstrates Amber short-cue restriction' },
];

export default function FloorPlannerPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/designer?mode=planner');
  }, [router]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Room state (meters)
  const [roomLength, setRoomLength] = useState<number>(6.5);
  const [roomWidth, setRoomWidth] = useState<number>(5.2);

  // Placed tables state
  const [tables, setTables] = useState<PlacedTable[]>([
    {
      id: 'table-1',
      sizeKey: 'SEVEN_FOOT_PUB',
      center: { x: 3.25, y: 2.6 },
      rotation: 0,
    },
  ]);

  const [selectedTableId, setSelectedTableId] = useState<string>('table-1');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

  // Render Architectural CAD Blueprint
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 1. Dark Blueprint Background
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Blueprint Grid: Minor lines (0.25m) and Major lines (1.0m)
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

    // 3. Room Perimeter Concrete Walls (4px Architectural Solid Cyan/Blue)
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

    // 4. Render Tables with Dynamic Cue Envelope (1.45m / 57" Cue)
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

      // Outer 1.45m Cue Envelope
      let envStroke = 'rgba(34, 197, 94, 0.8)'; // Green
      let envFill = 'rgba(34, 197, 94, 0.08)';
      if (result.status === 'RED') {
        envStroke = 'rgba(239, 68, 68, 0.9)'; // Red
        envFill = 'rgba(239, 68, 68, 0.18)';
      } else if (result.status === 'AMBER') {
        envStroke = 'rgba(245, 158, 11, 0.85)'; // Amber
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

      // Cabinet Outer Wood Frame
      ctx.fillStyle = result.status === 'RED' ? '#7f1d1d' : '#172033';
      ctx.strokeStyle = isSelected ? '#fbbf24' : '#475569';
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.strokeRect(-cabLen / 2, -cabWid / 2, cabLen, cabWid);
      ctx.fillRect(-cabLen / 2, -cabWid / 2, cabLen, cabWid);

      // Green Felt Surface
      const playLen = spec.playfieldLength * scale;
      const playWid = spec.playfieldWidth * scale;
      ctx.fillStyle = '#065f46';
      ctx.fillRect(-playLen / 2, -playWid / 2, playLen, playWid);

      // Pockets (6 dots)
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

      // Table Model & Rotation Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(spec.label.split(' ')[0], 0, -3);
      ctx.font = '10px monospace';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`ROT: ${Math.round((table.rotation * 180) / Math.PI)}°`, 0, 11);

      // Selection Halo
      if (isSelected) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(cabLen, cabWid) / 2 + 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    });
  }, [tables, roomLength, roomWidth, selectedTableId, scale, originX, originY]);

  // Drag and Drop Table Interactions (Mouse & Touch)
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
        sizeKey: 'SEVEN_FOOT_PUB',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-zinc-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800/40 text-[11px] font-mono text-sky-400 uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" /> B2B Clearance Engine • SAT Polygon Physics
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            2D Venue Clearance & Cue Envelope Planner
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Prevent costly delivery rejections. Simulate 1.45m tournament cue envelopes before commissioning manufacture or commercial lease dispatch.
          </p>
        </div>

        <button
          type="button"
          onClick={exportBlueprintPng}
          className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-200 flex items-center gap-2 transition-all shadow-md"
        >
          <Download className="w-4 h-4 text-sky-400" />
          Export CAD Blueprint PNG
        </button>
      </div>

      {/* Preset Room Quick Select Chips */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Canvas (8 Cols) */}
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

            {/* In-Canvas CAD Status Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-[#080c14]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-800 text-xs font-mono">
              <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" /> Full 57&quot; Stroke (&gt;1.45m)
              </span>
              <span className="flex items-center gap-2 text-amber-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" /> 48&quot;/36&quot; Short Cue
              </span>
              <span className="flex items-center gap-2 text-rose-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" /> Wall Clash
              </span>
            </div>
          </div>

          {/* Quick Rotation Toolbar */}
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

        {/* Right Column: Parameters & Real-Time SAT Diagnostic (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Room Dimensions */}
          <div className="p-6 rounded-3xl bg-[#090b10] border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Venue Room Outer Walls (Meters)
            </h3>

            <div className="grid grid-cols-2 gap-4">
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
          <div className="p-6 rounded-3xl bg-[#090b10] border border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Add Tables to Floor Plan
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => addTable('SEVEN_FOOT_PUB')}
                className="flex items-center justify-between p-3 rounded-2xl border border-zinc-800 hover:border-amber-500/60 bg-zinc-950 text-left transition-colors group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-400">
                    + Add 7ft Pub Classic
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">2.14m × 1.22m Outer Footprint</div>
                </div>
                <Plus className="w-4 h-4 text-zinc-500 group-hover:text-amber-400" />
              </button>

              <button
                type="button"
                onClick={() => addTable('EIGHT_FOOT_PRO')}
                className="flex items-center justify-between p-3 rounded-2xl border border-zinc-800 hover:border-amber-500/60 bg-zinc-950 text-left transition-colors group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-400">
                    + Add 8ft Pro Tournament
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">2.44m × 1.32m Outer Footprint</div>
                </div>
                <Plus className="w-4 h-4 text-zinc-500 group-hover:text-amber-400" />
              </button>
            </div>
          </div>

          {/* Live SAT Collision Diagnostic Card */}
          {selectedResult && (
            <div
              className={`p-6 rounded-3xl border transition-all space-y-4 shadow-xl ${
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
                      ? 'Cue Stroke Restriction Flagged'
                      : 'Physical Obstruction Detected'}
                  </div>
                  <p className="text-xs mt-1.5 text-zinc-300 leading-relaxed font-normal">
                    {selectedResult.summaryMessage}
                  </p>
                </div>
              </div>

              {/* Side Clearance Table */}
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono">
                {selectedResult.sideClearances.map((s) => (
                  <div key={s.side} className="flex justify-between items-center">
                    <span className="capitalize text-zinc-400">{s.side} Wall:</span>
                    <span
                      className={`font-semibold ${
                        s.isRestricted ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {s.clearanceMeters}m ({s.requiredCueLengthInches}&quot; cue)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action to Proceed */}
          <div className="pt-2">
            <Link
              href="/checkout/ingress"
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-950 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              Confirm Floor Plan & Stairway Video Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
