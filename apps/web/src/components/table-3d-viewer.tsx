'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface Table3DViewerProps {
  tableSize: 'SEVEN_FOOT_PUB' | 'EIGHT_FOOT_PRO' | 'TWELVE_FOOT_SNOOKER';
  feltColor: string;
  woodColor: string;
  hardwareColor: string;
  coinOp: boolean;
  customWrapUrl?: string | null;
  onSnapshotReady?: (dataUrl: string) => void;
}

export function Table3DViewer({
  tableSize,
  feltColor,
  woodColor,
  hardwareColor,
  coinOp,
  customWrapUrl,
  onSnapshotReady,
}: Table3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const tableGroupRef = useRef<THREE.Group | null>(null);

  // Mesh references for real-time dynamic material updates
  const feltMeshRef = useRef<THREE.Mesh | null>(null);
  const cabinetMeshesRef = useRef<THREE.Mesh[]>([]);
  const hardwareMeshesRef = useRef<THREE.Mesh[]>([]);
  const coinOpMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0c0d10');

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4, 3.2, 4);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xa5c4ff, 0.8);
    fillLight.position.set(-5, 4, -4);
    scene.add(fillLight);

    // Ground plane with subtle shadow
    const floorGeo = new THREE.PlaneGeometry(15, 15);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      roughness: 0.9,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // Interactive mouse rotation / orbit controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraAngleX = 0.8;
    let cameraAngleY = 0.6;
    let cameraDistance = 5.2;

    const updateCamera = () => {
      camera.position.x = cameraDistance * Math.sin(cameraAngleX) * Math.cos(cameraAngleY);
      camera.position.y = cameraDistance * Math.sin(cameraAngleY);
      camera.position.z = cameraDistance * Math.cos(cameraAngleX) * Math.cos(cameraAngleY);
      camera.lookAt(0, 0.5, 0);
    };
    updateCamera();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      cameraAngleX += deltaX * 0.01;
      cameraAngleY = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, cameraAngleY + deltaY * 0.01));
      updateCamera();
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraDistance = Math.max(2.8, Math.min(8.0, cameraDistance + e.deltaY * 0.005));
      updateCamera();
    };

    // Touch controls for mobile
    let prevTouchX = 0;
    let prevTouchY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevTouchX;
        const deltaY = e.touches[0].clientY - prevTouchY;
        cameraAngleX += deltaX * 0.015;
        cameraAngleY = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, cameraAngleY + deltaY * 0.015));
        updateCamera();
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('touchstart', onTouchStart);
    domElement.addEventListener('touchmove', onTouchMove);

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Build / update 3D Table Geometry when tableSize changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (tableGroupRef.current) {
      scene.remove(tableGroupRef.current);
    }

    const tableGroup = new THREE.Group();
    tableGroupRef.current = tableGroup;
    cabinetMeshesRef.current = [];
    hardwareMeshesRef.current = [];

    // Scale dimensions based on table size
    let length = 2.14;
    let width = 1.22;
    if (tableSize === 'EIGHT_FOOT_PRO') {
      length = 2.44;
      width = 1.32;
    } else if (tableSize === 'TWELVE_FOOT_SNOOKER') {
      length = 3.85;
      width = 2.05;
    }

    const tableHeight = 0.82;
    const slateThickness = 0.05;
    const railWidth = 0.12;

    // 1. Legs (4 cylindrical tapered legs)
    const legRadiusTop = 0.07;
    const legRadiusBottom = 0.05;
    const legHeight = tableHeight - 0.2;
    const legPositions = [
      { x: -(length / 2 - 0.2), z: -(width / 2 - 0.15) },
      { x: length / 2 - 0.2, z: -(width / 2 - 0.15) },
      { x: -(length / 2 - 0.2), z: width / 2 - 0.15 },
      { x: length / 2 - 0.2, z: width / 2 - 0.15 },
    ];

    const legGeo = new THREE.CylinderGeometry(legRadiusTop, legRadiusBottom, legHeight, 16);
    const legMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woodColor),
      roughness: 0.4,
      metalness: 0.1,
    });

    legPositions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(pos.x, legHeight / 2, pos.z);
      leg.castShadow = true;
      tableGroup.add(leg);
      cabinetMeshesRef.current.push(leg);

      // Chrome/Brass foot leveling shoe
      const shoeGeo = new THREE.CylinderGeometry(0.065, 0.07, 0.04, 16);
      const shoeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(hardwareColor),
        metalness: 0.85,
        roughness: 0.2,
      });
      const shoe = new THREE.Mesh(shoeGeo, shoeMat);
      shoe.position.set(pos.x, 0.02, pos.z);
      tableGroup.add(shoe);
      hardwareMeshesRef.current.push(shoe);
    });

    // 2. Main Wooden Cabinet Body (Apron)
    const bodyHeight = 0.22;
    const bodyGeo = new THREE.BoxGeometry(length - 0.02, bodyHeight, width - 0.02);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woodColor),
      roughness: 0.45,
      metalness: 0.05,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, tableHeight - bodyHeight / 2, 0);
    body.castShadow = true;
    tableGroup.add(body);
    cabinetMeshesRef.current.push(body);

    // 3. Slate Bed & Felt Cloth
    const playLength = length - 2 * railWidth;
    const playWidth = width - 2 * railWidth;
    const feltGeo = new THREE.BoxGeometry(playLength, slateThickness, playWidth);
    const feltMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(feltColor),
      roughness: 0.85,
      metalness: 0.0,
    });
    const felt = new THREE.Mesh(feltGeo, feltMat);
    felt.position.set(0, tableHeight + slateThickness / 2, 0);
    felt.receiveShadow = true;
    tableGroup.add(felt);
    feltMeshRef.current = felt;

    // 4. Rails (4 raised cushion edges)
    const railHeight = 0.06;
    const topRailGeo = new THREE.BoxGeometry(length, railHeight, railWidth);
    const sideRailGeo = new THREE.BoxGeometry(railWidth, railHeight, playWidth);

    const railMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woodColor),
      roughness: 0.35,
      metalness: 0.1,
    });

    // North rail
    const northRail = new THREE.Mesh(topRailGeo, railMat);
    northRail.position.set(0, tableHeight + railHeight / 2, -(width / 2 - railWidth / 2));
    northRail.castShadow = true;
    tableGroup.add(northRail);
    cabinetMeshesRef.current.push(northRail);

    // South rail
    const southRail = new THREE.Mesh(topRailGeo, railMat);
    southRail.position.set(0, tableHeight + railHeight / 2, width / 2 - railWidth / 2);
    southRail.castShadow = true;
    tableGroup.add(southRail);
    cabinetMeshesRef.current.push(southRail);

    // West rail
    const westRail = new THREE.Mesh(sideRailGeo, railMat);
    westRail.position.set(-(length / 2 - railWidth / 2), tableHeight + railHeight / 2, 0);
    westRail.castShadow = true;
    tableGroup.add(westRail);
    cabinetMeshesRef.current.push(westRail);

    // East rail
    const eastRail = new THREE.Mesh(sideRailGeo, railMat);
    eastRail.position.set(length / 2 - railWidth / 2, tableHeight + railHeight / 2, 0);
    eastRail.castShadow = true;
    tableGroup.add(eastRail);
    cabinetMeshesRef.current.push(eastRail);

    // 5. Pocket Castings & Corners (6 metallic chrome/brass brackets)
    const cornerPockets = [
      { x: -(length / 2 - railWidth / 2), z: -(width / 2 - railWidth / 2) },
      { x: length / 2 - railWidth / 2, z: -(width / 2 - railWidth / 2) },
      { x: -(length / 2 - railWidth / 2), z: width / 2 - railWidth / 2 },
      { x: length / 2 - railWidth / 2, z: width / 2 - railWidth / 2 },
      { x: 0, z: -(width / 2 - railWidth / 2) }, // Middle pocket 1
      { x: 0, z: width / 2 - railWidth / 2 },  // Middle pocket 2
    ];

    const pocketGeo = new THREE.CylinderGeometry(0.065, 0.06, 0.07, 16);
    const pocketMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(hardwareColor),
      metalness: 0.9,
      roughness: 0.15,
    });

    cornerPockets.forEach((pos) => {
      const pocket = new THREE.Mesh(pocketGeo, pocketMat);
      pocket.position.set(pos.x, tableHeight + 0.03, pos.z);
      tableGroup.add(pocket);
      hardwareMeshesRef.current.push(pocket);
    });

    // 6. Coin-Op Assembly (Optional)
    const coinOpBoxGeo = new THREE.BoxGeometry(0.18, 0.14, 0.05);
    const coinOpMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(hardwareColor),
      metalness: 0.9,
      roughness: 0.2,
    });
    const coinOpBox = new THREE.Mesh(coinOpBoxGeo, coinOpMat);
    coinOpBox.position.set(length / 4, tableHeight - bodyHeight / 2, width / 2 + 0.01);
    coinOpBox.visible = coinOp;
    tableGroup.add(coinOpBox);
    coinOpMeshRef.current = coinOpBox;

    scene.add(tableGroup);
  }, [tableSize]);

  // Update dynamic materials when colors change without rebuilding geometry
  useEffect(() => {
    if (feltMeshRef.current) {
      (feltMeshRef.current.material as THREE.MeshStandardMaterial).color.set(feltColor);
    }
    cabinetMeshesRef.current.forEach((m) => {
      (m.material as THREE.MeshStandardMaterial).color.set(woodColor);
    });
    hardwareMeshesRef.current.forEach((m) => {
      (m.material as THREE.MeshStandardMaterial).color.set(hardwareColor);
    });
    if (coinOpMeshRef.current) {
      coinOpMeshRef.current.visible = coinOp;
      (coinOpMeshRef.current.material as THREE.MeshStandardMaterial).color.set(hardwareColor);
    }
  }, [feltColor, woodColor, hardwareColor, coinOp]);

  // Capture Snapshot Handler
  const captureSnapshot = () => {
    if (rendererRef.current && onSnapshotReady) {
      const dataUrl = rendererRef.current.domElement.toDataURL('image/webp', 0.9);
      onSnapshotReady(dataUrl);
    }
  };

  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Snapshot and 3D instruction pill */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="px-3 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-700/60 text-[11px] text-zinc-300 font-mono">
          Drag to rotate 360° • Scroll to zoom
        </div>

        <button
          type="button"
          onClick={captureSnapshot}
          className="pointer-events-auto px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md backdrop-blur transition-all flex items-center gap-1.5"
        >
          Capture Spec Render
        </button>
      </div>
    </div>
  );
}
