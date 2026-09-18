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
  Maximize2,
  Plus,
  RotateCw,
  Trash2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Layers,
} from 'lucide-react';

export default function FloorPlannerPage() {
  const router = useRouter();
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

  // Selected table for editing
  const [selectedTableId, setSelectedTableId] = useState<string>('table-1');
  const [activeTab, setActiveTab] = useState<'planner' | 'blueprint'>('planner');

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Evaluation results for all placed tables
  const roomLayout: RoomLayout = { length: roomLength, width: roomWidth };
  const clearanceResults: TableClearanceResult[] = tables.map((t) =>
    evaluateTableClearance(t, roomLayout)
  );

  const selectedTable = tables.find((t) => t.id === selectedTableId);
  const selectedResult = clearanceResults.find((r) => r.tableId === selectedTableId);

  // Pixels per meter scale
  const PADDING = 40;
  const canvasWidth = 750;
  const canvasHeight = 520;
  const scale = Math.min(
    (canvasWidth - 2 * PADDING) / roomLength,
    (canvasHeight - 2 * PADDING) / roomWidth
  );

  const originX = (canvasWidth - roomLength * scale) / 2;
  const originY = (canvasHeight - roomWidth * scale) / 2;

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw Dark Blueprint Grid
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Grid lines (every 0.5m)
    ctx.strokeStyle = '#1a2233';
    ctx.lineWidth = 1;
    for (let x = 0; x <= roomLength; x += 0.5) {
      const px = originX + x * scale;
      ctx.beginPath();
      ctx.moveTo(px, originY);
      ctx.lineTo(px, originY + roomWidth * scale);
      ctx.stroke();
    }
    for (let y = 0; y <= roomWidth; y += 0.5) {
      const py = originY + y * scale;
      ctx.beginPath();
      ctx.moveTo(originX, py);
      ctx.lineTo(originX + roomLength * scale, py);
      ctx.stroke();
    }

    // Draw Room Perimeter Walls
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(originX, originY, roomLength * scale, roomWidth * scale);

    // Dimension labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${roomLength.toFixed(1)}m (Length)`,
      originX + (roomLength * scale) / 2,
      originY - 12
    );
    ctx.save();
    ctx.translate(originX - 16, originY + (roomWidth * scale) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${roomWidth.toFixed(1)}m (Width)`, 0, 0);
    ctx.restore();

    // Render Each Table
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

      // 1. Draw Cue Envelope (1.45m buffer)
      let envStroke = 'rgba(34, 197, 94, 0.7)'; // Green
      let envFill = 'rgba(34, 197, 94, 0.08)';
      if (result.status === 'RED') {
        envStroke = 'rgba(239, 68, 68, 0.9)'; // Red
        envFill = 'rgba(239, 68, 68, 0.15)';
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
      ctx.setLineDash([]); // Reset dash

      // 2. Draw Table Cabinet
      ctx.fillStyle = result.status === 'RED' ? '#7f1d1d' : '#1e293b';
      ctx.strokeStyle = isSelected ? '#38bdf8' : '#64748b';
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.strokeRect(-cabLen / 2, -cabWid / 2, cabLen, cabWid);
      ctx.fillRect(-cabLen / 2, -cabWid / 2, cabLen, cabWid);

      // 3. Draw Green Felt Playfield
      const playLen = spec.playfieldLength * scale;
      const playWid = spec.playfieldWidth * scale;
      ctx.fillStyle = '#065f46';
      ctx.fillRect(-playLen / 2, -playWid / 2, playLen, playWid);

      // 4. Draw Table Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(spec.label.split(' ')[0], 0, -4);
      ctx.font = '9px monospace';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`θ: ${Math.round((table.rotation * 180) / Math.PI)}°`, 0, 10);

      // 5. Draw Selection Ring
      if (isSelected) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(cabLen, cabWid) / 2 + 10, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    });
  }, [tables, roomLength, roomWidth, selectedTableId, scale, originX, originY]);

  // Drag and Drop Table Interactions
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouse to room coordinates (meters)
    const meterX = (mouseX - originX) / scale;
    const meterY = (mouseY - originY) / scale;

    // Find clicked table
    for (const table of tables) {
      const spec = TABLE_SPECS[table.sizeKey];
      const radius = Math.max(spec.cabinetLength, spec.cabinetWidth) / 1.5;
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
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add Table
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

  // Rotate Table
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

  // Delete Selected Table
  const removeSelectedTable = () => {
    if (!selectedTableId) return;
    const next = tables.filter((t) => t.id !== selectedTableId);
    setTables(next);
    setSelectedTableId(next.length > 0 ? next[0].id : '');
  };

  // Export Blueprint PNG
  const exportBlueprintPng = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `M-Games-FloorPlan-${roomLength}x${roomWidth}m.png`;
    a.click();
  };

  // Export JSON Placement matrix
  const exportPlacementJson = () => {
    const data = {
      venueRoom: { lengthMeters: roomLength, widthMeters: roomWidth },
      exportedAt: new Date().toISOString(),
      tables: tables.map((t) => ({
        id: t.id,
        model: t.sizeKey,
        coordinates: {
          xMeters: t.center.x,
          yMeters: t.center.y,
          rotationDegrees: Math.round((t.rotation * 180) / Math.PI),
        },
        clearance: clearanceResults.find((r) => r.tableId === t.id)?.status,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `M-Games-Placement-Matrix.json`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-zinc-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" /> B2B Spatial Clearance Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            2D Venue Floor Plan & Cue Stroke Planner
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Ensure tables have tournament-spec 57" cue clearance (1.45m envelope) before booking commercial dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportBlueprintPng}
            className="px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            Export Blueprint PNG
          </button>
          <button
            type="button"
            onClick={exportPlacementJson}
            className="px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            Export Ops JSON
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive 2D Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-[#0a0d14] shadow-2xl">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-auto cursor-crosshair block select-none"
            />

            {/* In-canvas quick legend overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-zinc-950/80 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-800 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Full 57" Cue
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> 48"/36" Short Cue
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Wall Collision
              </span>
            </div>
          </div>

          {/* Quick Table Manipulation Toolbar */}
          {selectedTable && (
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Selected:</span>
                <span className="font-semibold text-white">
                  {TABLE_SPECS[selectedTable.sizeKey].label}
                </span>
                <span className="font-mono text-zinc-500">
                  ({selectedTable.center.x}m, {selectedTable.center.y}m)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => rotateSelectedTable(-15)}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                  title="Rotate Counter-Clockwise 15°"
                >
                  <RotateCw className="w-4 h-4 -scale-x-100" />
                </button>
                <button
                  type="button"
                  onClick={() => rotateSelectedTable(15)}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                  title="Rotate Clockwise 15°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => rotateSelectedTable(45)}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono transition-colors"
                >
                  +45°
                </button>
                <button
                  type="button"
                  onClick={removeSelectedTable}
                  className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition-colors"
                  title="Remove Table"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Clearance Controls & Diagnostic Alert (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Room Setup Box */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Room Outer Perimeter
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Length (meters)</label>
                <input
                  type="number"
                  step="0.1"
                  min="3.5"
                  max="15.0"
                  value={roomLength}
                  onChange={(e) => setRoomLength(parseFloat(e.target.value) || 5.0)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Width (meters)</label>
                <input
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="12.0"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(parseFloat(e.target.value) || 4.0)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Add Table Controls */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Add Tables to Canvas
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => addTable('SEVEN_FOOT_PUB')}
                className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500 bg-zinc-950 text-left transition-colors group"
              >
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-400">
                    + Add 7ft Pub Classic
                  </div>
                  <div className="text-[10px] text-zinc-500">2.14m × 1.22m footprint</div>
                </div>
                <Plus className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400" />
              </button>

              <button
                type="button"
                onClick={() => addTable('EIGHT_FOOT_PRO')}
                className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500 bg-zinc-950 text-left transition-colors group"
              >
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-400">
                    + Add 8ft Pro Tournament
                  </div>
                  <div className="text-[10px] text-zinc-500">2.44m × 1.32m footprint</div>
                </div>
                <Plus className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Live Clearance Diagnostic Card */}
          {selectedResult && (
            <div
              className={`p-5 rounded-2xl border transition-colors space-y-3 ${
                selectedResult.status === 'GREEN'
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                  : selectedResult.status === 'AMBER'
                  ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                  : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {selectedResult.status === 'GREEN' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {selectedResult.status === 'AMBER' && (
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                {selectedResult.status === 'RED' && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    {selectedResult.status === 'GREEN'
                      ? 'Optimal Tournament Clearance'
                      : selectedResult.status === 'AMBER'
                      ? 'Cue Stroke Restriction Warning'
                      : 'Physical Wall Collision'}
                  </div>
                  <p className="text-xs mt-1 text-zinc-300 leading-relaxed">
                    {selectedResult.summaryMessage}
                  </p>
                </div>
              </div>

              {/* Side Breakdown Table */}
              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] font-mono">
                {selectedResult.sideClearances.map((s) => (
                  <div key={s.side} className="flex justify-between items-center">
                    <span className="capitalize text-zinc-400">{s.side} Side:</span>
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

          {/* Action to Book Lease */}
          <div className="pt-2">
            <Link
              href="/checkout/ingress"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              Confirm Plan & Video Walkway Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
