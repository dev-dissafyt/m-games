'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Eye, Sun, Sparkles, Maximize2, RotateCcw } from 'lucide-react';

export interface Table3DViewerProps {
  tableSize: 'SEVEN_FOOT_PUB' | 'EIGHT_FOOT_PRO' | 'TWELVE_FOOT_SNOOKER';
  feltColor: string;
  woodColor: string;
  hardwareColor: string;
  coinOp: boolean;
  customWrapUrl?: string | null;
  onSnapshotReady?: (dataUrl: string) => void;
}

type LightingMode = 'studio' | 'penthouse' | 'pub';
type CameraView = 'orbit' | 'aim' | 'top' | 'corner';

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

  // Mesh and lighting references
  const feltMeshRef = useRef<THREE.Mesh | null>(null);
  const cabinetMeshesRef = useRef<THREE.Mesh[]>([]);
  const hardwareMeshesRef = useRef<THREE.Mesh[]>([]);
  const coinOpMeshRef = useRef<THREE.Mesh | null>(null);
  const mainLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);

  // Active view states
  const [lightingMode, setLightingMode] = useState<LightingMode>('studio');
  const [activeView, setActiveView] = useState<CameraView>('orbit');
  const [isCapturing, setIsCapturing] = useState(false);

  // Target camera positions for smooth interpolation
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(4, 3.2, 4));
  const targetCamLookRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.5, 0));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#080a0f');

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4, 3.2, 4);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    // 3. Renderer with high shadow precision & tonemapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const mainLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);
    mainLightRef.current = mainLight;

    const fillLight = new THREE.DirectionalLight(0x90b0e0, 0.9);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Focused table spotlight for overhead dramatic illumination
    const spotLight = new THREE.SpotLight(0xfff5dd, 4.5);
    spotLight.position.set(0, 4.5, 0);
    spotLight.angle = Math.PI / 3.2;
    spotLight.penumbra = 0.4;
    spotLight.decay = 1.2;
    spotLight.distance = 12;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);
    spotLightRef.current = spotLight;

    // 5. Luxury Architectural Floor with subtle grid reflection
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e14,
      roughness: 0.65,
      metalness: 0.25,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // 6. Interactive Orbit & Drag Handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraAngleX = 0.8;
    let cameraAngleY = 0.6;
    let cameraDistance = 5.4;

    const updateCameraFromAngles = () => {
      targetCamPosRef.current.set(
        cameraDistance * Math.sin(cameraAngleX) * Math.cos(cameraAngleY),
        cameraDistance * Math.sin(cameraAngleY),
        cameraDistance * Math.cos(cameraAngleX) * Math.cos(cameraAngleY)
      );
      targetCamLookRef.current.set(0, 0.45, 0);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      cameraAngleX += deltaX * 0.009;
      cameraAngleY = Math.max(0.12, Math.min(Math.PI / 2 - 0.05, cameraAngleY + deltaY * 0.009));
      updateCameraFromAngles();
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraDistance = Math.max(2.4, Math.min(9.0, cameraDistance + e.deltaY * 0.004));
      updateCameraFromAngles();
    };

    // Touch controls
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
        cameraAngleX += deltaX * 0.012;
        cameraAngleY = Math.max(0.12, Math.min(Math.PI / 2 - 0.05, cameraAngleY + deltaY * 0.012));
        updateCameraFromAngles();
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

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render & Smooth Camera Lerp Loop
    let animationFrameId: number;
    const currentLookAt = new THREE.Vector3(0, 0.45, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation towards target
      camera.position.lerp(targetCamPosRef.current, 0.08);
      currentLookAt.lerp(targetCamLookRef.current, 0.08);
      camera.lookAt(currentLookAt);

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

  // Update Scene Lighting Mode
  useEffect(() => {
    if (!ambientLightRef.current || !mainLightRef.current || !spotLightRef.current) return;

    if (lightingMode === 'studio') {
      ambientLightRef.current.color.setHex(0xffffff);
      ambientLightRef.current.intensity = 1.3;
      mainLightRef.current.color.setHex(0xfffaed);
      mainLightRef.current.intensity = 2.4;
      spotLightRef.current.intensity = 3.5;
    } else if (lightingMode === 'penthouse') {
      ambientLightRef.current.color.setHex(0xffdfba);
      ambientLightRef.current.intensity = 1.0;
      mainLightRef.current.color.setHex(0xffaa5e);
      mainLightRef.current.intensity = 2.0;
      spotLightRef.current.intensity = 4.0;
    } else if (lightingMode === 'pub') {
      ambientLightRef.current.color.setHex(0x334455);
      ambientLightRef.current.intensity = 0.6;
      mainLightRef.current.color.setHex(0xffeedd);
      mainLightRef.current.intensity = 1.2;
      spotLightRef.current.intensity = 6.5; // Dramatic overhead cone
    }
  }, [lightingMode]);

  // Update Camera View Presets
  useEffect(() => {
    if (activeView === 'orbit') {
      targetCamPosRef.current.set(4, 3.2, 4);
      targetCamLookRef.current.set(0, 0.5, 0);
    } else if (activeView === 'aim') {
      // Player aiming down the table at the break ball
      targetCamPosRef.current.set(-1.8, 1.05, 0);
      targetCamLookRef.current.set(0.6, 0.78, 0);
    } else if (activeView === 'top') {
      // Straight top-down architectural bird's eye
      targetCamPosRef.current.set(0, 5.5, 0.01);
      targetCamLookRef.current.set(0, 0, 0);
    } else if (activeView === 'corner') {
      // Macro shot of corner pocket casting and tournament cloth
      targetCamPosRef.current.set(1.4, 1.2, 0.9);
      targetCamLookRef.current.set(1.05, 0.82, 0.6);
    }
  }, [activeView]);

  // Construct Realistic 3D Pool Table Geometry with Balls, Pockets & Rail Sights
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

    // Scale dimensions
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
    const railWidth = 0.125;
    const railHeight = 0.055;

    // Wood texture material with gentle specular reflection
    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woodColor),
      roughness: 0.38,
      metalness: 0.12,
    });

    // Hardware trim material (Chrome/Brass/Matte)
    const hardwareMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(hardwareColor),
      metalness: 0.92,
      roughness: 0.18,
    });

    // Felt material
    const feltMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(feltColor),
      roughness: 0.88,
      metalness: 0.02,
    });

    // 1. LEGS: 4 Architectural Solid Tapered Legs with Leveling Brass Shoes
    const legHeight = tableHeight - 0.22;
    const legRadiusTop = 0.085;
    const legRadiusBottom = 0.06;
    const legPositions = [
      { x: -(length / 2 - 0.24), z: -(width / 2 - 0.18) },
      { x: length / 2 - 0.24, z: -(width / 2 - 0.18) },
      { x: -(length / 2 - 0.24), z: width / 2 - 0.18 },
      { x: length / 2 - 0.24, z: width / 2 - 0.18 },
    ];

    const legGeo = new THREE.CylinderGeometry(legRadiusTop, legRadiusBottom, legHeight, 20);
    legPositions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeo, woodMat);
      leg.position.set(pos.x, legHeight / 2 + 0.04, pos.z);
      leg.castShadow = true;
      leg.receiveShadow = true;
      tableGroup.add(leg);
      cabinetMeshesRef.current.push(leg);

      // Machined foot shoe
      const shoeGeo = new THREE.CylinderGeometry(0.075, 0.08, 0.04, 20);
      const shoe = new THREE.Mesh(shoeGeo, hardwareMat);
      shoe.position.set(pos.x, 0.02, pos.z);
      shoe.castShadow = true;
      tableGroup.add(shoe);
      hardwareMeshesRef.current.push(shoe);
    });

    // 2. CABINET APRON: Arched Beveled Solid Wood Apron
    const bodyHeight = 0.24;
    const bodyGeo = new THREE.BoxGeometry(length - 0.04, bodyHeight, width - 0.04);
    const body = new THREE.Mesh(bodyGeo, woodMat);
    body.position.set(0, tableHeight - bodyHeight / 2, 0);
    body.castShadow = true;
    body.receiveShadow = true;
    tableGroup.add(body);
    cabinetMeshesRef.current.push(body);

    // 3. SLATE BED & WORSTED FELT
    const playLength = length - 2 * railWidth;
    const playWidth = width - 2 * railWidth;
    const feltGeo = new THREE.BoxGeometry(playLength, slateThickness, playWidth);
    const felt = new THREE.Mesh(feltGeo, feltMat);
    felt.position.set(0, tableHeight + slateThickness / 2, 0);
    felt.receiveShadow = true;
    felt.castShadow = false;
    tableGroup.add(felt);
    feltMeshRef.current = felt;

    // 4. TOURNAMENT CUSHION RAILS
    const topRailGeo = new THREE.BoxGeometry(length, railHeight, railWidth);
    const sideRailGeo = new THREE.BoxGeometry(railWidth, railHeight, playWidth);

    // North Rail
    const nRail = new THREE.Mesh(topRailGeo, woodMat);
    nRail.position.set(0, tableHeight + railHeight / 2, -(width / 2 - railWidth / 2));
    nRail.castShadow = true;
    tableGroup.add(nRail);
    cabinetMeshesRef.current.push(nRail);

    // South Rail
    const sRail = new THREE.Mesh(topRailGeo, woodMat);
    sRail.position.set(0, tableHeight + railHeight / 2, width / 2 - railWidth / 2);
    sRail.castShadow = true;
    tableGroup.add(sRail);
    cabinetMeshesRef.current.push(sRail);

    // West Rail
    const wRail = new THREE.Mesh(sideRailGeo, woodMat);
    wRail.position.set(-(length / 2 - railWidth / 2), tableHeight + railHeight / 2, 0);
    wRail.castShadow = true;
    tableGroup.add(wRail);
    cabinetMeshesRef.current.push(wRail);

    // East Rail
    const eRail = new THREE.Mesh(sideRailGeo, woodMat);
    eRail.position.set(length / 2 - railWidth / 2, tableHeight + railHeight / 2, 0);
    eRail.castShadow = true;
    tableGroup.add(eRail);
    cabinetMeshesRef.current.push(eRail);

    // 5. DIAMOND SIGHT INLAYS (Mother of Pearl / Brass Dots along Rails)
    const sightGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.004, 12);
    const sightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
    });

    // Inlays on North & South Rails (6 sights each side)
    [-0.35, -0.2, -0.07, 0.07, 0.2, 0.35].forEach((ratio) => {
      const xPos = ratio * length;
      // North
      const nSight = new THREE.Mesh(sightGeo, sightMat);
      nSight.position.set(xPos, tableHeight + railHeight + 0.001, -(width / 2 - railWidth / 2));
      tableGroup.add(nSight);
      // South
      const sSight = new THREE.Mesh(sightGeo, sightMat);
      sSight.position.set(xPos, tableHeight + railHeight + 0.001, width / 2 - railWidth / 2);
      tableGroup.add(sSight);
    });

    // Inlays on West & East Rails (3 sights each side)
    [-0.22, 0, 0.22].forEach((ratio) => {
      const zPos = ratio * width;
      // West
      const wSight = new THREE.Mesh(sightGeo, sightMat);
      wSight.position.set(-(length / 2 - railWidth / 2), tableHeight + railHeight + 0.001, zPos);
      tableGroup.add(wSight);
      // East
      const eSight = new THREE.Mesh(sightGeo, sightMat);
      eSight.position.set(length / 2 - railWidth / 2, tableHeight + railHeight + 0.001, zPos);
      tableGroup.add(eSight);
    });

    // 6. AUTHENTIC CORNER & SIDE POCKET CASTINGS (6 Chrome/Brass Plates)
    const pocketPositions = [
      { x: -(length / 2 - railWidth / 2), z: -(width / 2 - railWidth / 2) },
      { x: length / 2 - railWidth / 2, z: -(width / 2 - railWidth / 2) },
      { x: -(length / 2 - railWidth / 2), z: width / 2 - railWidth / 2 },
      { x: length / 2 - railWidth / 2, z: width / 2 - railWidth / 2 },
      { x: 0, z: -(width / 2 - railWidth / 2) }, // Middle N
      { x: 0, z: width / 2 - railWidth / 2 },  // Middle S
    ];

    const pocketGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.08, 16);
    const leatherGeo = new THREE.CylinderGeometry(0.05, 0.045, 0.07, 16);
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x1a1510,
      roughness: 0.9,
    });

    pocketPositions.forEach((pos) => {
      const pocketPlate = new THREE.Mesh(pocketGeo, hardwareMat);
      pocketPlate.position.set(pos.x, tableHeight + 0.035, pos.z);
      pocketPlate.castShadow = true;
      tableGroup.add(pocketPlate);
      hardwareMeshesRef.current.push(pocketPlate);

      // Inner dark drop pocket hole
      const innerPocket = new THREE.Mesh(leatherGeo, leatherMat);
      innerPocket.position.set(pos.x, tableHeight + 0.04, pos.z);
      tableGroup.add(innerPocket);
    });

    // 7. TOURNAMENT BALLS: Racked Triangle at the Foot + Cue Ball at the Head
    const ballRadius = 0.026;
    const ballGeo = new THREE.SphereGeometry(ballRadius, 24, 24);

    const ballColors = [
      0xfbbf24, // 1 Yellow
      0x2563eb, // 2 Blue
      0xdc2626, // 3 Red
      0x7c3aed, // 4 Purple
      0xf97316, // 5 Orange
      0x16a34a, // 6 Green
      0x991b1b, // 7 Maroon
      0x09090b, // 8 Black (Center)
      0xfbbf24, // 9
      0x2563eb, // 10
      0xdc2626, // 11
      0x7c3aed, // 12
      0xf97316, // 13
      0x16a34a, // 14
      0x991b1b, // 15
    ];

    // Foot spot location for rack (X = +0.55m)
    const rackCenterX = length * 0.24;
    const rackY = tableHeight + slateThickness + ballRadius;
    const spacing = ballRadius * 2.05;

    let ballIndex = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col <= row; col++) {
        if (ballIndex >= ballColors.length) break;
        const bx = rackCenterX + row * (spacing * 0.866);
        const bz = (col - row / 2) * spacing;

        const bMat = new THREE.MeshStandardMaterial({
          color: ballColors[ballIndex],
          roughness: 0.12,
          metalness: 0.1,
        });
        const ball = new THREE.Mesh(ballGeo, bMat);
        ball.position.set(bx, rackY, bz);
        ball.castShadow = true;
        tableGroup.add(ball);
        ballIndex++;
      }
    }

    // Cue Ball at Head Spot (X = -0.55m)
    const cueBallMat = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      roughness: 0.1,
      metalness: 0.05,
    });
    const cueBall = new THREE.Mesh(ballGeo, cueBallMat);
    cueBall.position.set(-length * 0.28, rackY, 0);
    cueBall.castShadow = true;
    tableGroup.add(cueBall);

    // 8. COIN-OP ASSEMBLY (Optional)
    const coinOpBoxGeo = new THREE.BoxGeometry(0.2, 0.15, 0.06);
    const coinOpBox = new THREE.Mesh(coinOpBoxGeo, hardwareMat);
    coinOpBox.position.set(length / 3.8, tableHeight - bodyHeight / 2, width / 2 + 0.015);
    coinOpBox.visible = coinOp;
    coinOpBox.castShadow = true;
    tableGroup.add(coinOpBox);
    coinOpMeshRef.current = coinOpBox;

    scene.add(tableGroup);
  }, [tableSize]);

  // Live Material Swatch Updates without rebuilding geometry
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

  // High-Resolution Spec Snapshot
  const captureSnapshot = () => {
    if (rendererRef.current && onSnapshotReady) {
      setIsCapturing(true);
      const dataUrl = rendererRef.current.domElement.toDataURL('image/webp', 0.95);
      onSnapshotReady(dataUrl);
      setTimeout(() => setIsCapturing(false), 1000);
    }
  };

  return (
    <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[580px] rounded-3xl overflow-hidden bg-[#07080d] border border-zinc-800 shadow-2xl group">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-none" />

      {/* Top Floating Controls: Camera Perspectives & Lighting */}
      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between gap-1.5 sm:gap-2 pointer-events-none">
        {/* Camera Views Scrollable Strip */}
        <div className="pointer-events-auto flex items-center gap-0.5 sm:gap-1 bg-[#090b10]/90 backdrop-blur-xl border border-zinc-700/60 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl shadow-xl overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveView('orbit')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
              activeView === 'orbit'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Showroom
          </button>
          <button
            type="button"
            onClick={() => setActiveView('aim')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
              activeView === 'aim'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Aiming
          </button>
          <button
            type="button"
            onClick={() => setActiveView('top')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
              activeView === 'top'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Bird&apos;s Eye
          </button>
          <button
            type="button"
            onClick={() => setActiveView('corner')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
              activeView === 'corner'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Pocket
          </button>
        </div>

        {/* Studio Lighting Mood Toggle */}
        <div className="pointer-events-auto flex items-center gap-0.5 sm:gap-1 bg-[#090b10]/90 backdrop-blur-xl border border-zinc-700/60 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl shadow-xl shrink-0">
          <button
            type="button"
            onClick={() => setLightingMode('studio')}
            title="Studio Daylight"
            className={`p-1.5 rounded-xl text-xs transition-all ${
              lightingMode === 'studio'
                ? 'bg-zinc-800 text-amber-400 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={() => setLightingMode('penthouse')}
            title="Warm Penthouse Lounge"
            className={`p-1.5 rounded-xl text-xs transition-all ${
              lightingMode === 'penthouse'
                ? 'bg-zinc-800 text-amber-400 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={() => setLightingMode('pub')}
            title="Moody Tavern Spotlight"
            className={`p-1.5 rounded-xl text-xs transition-all ${
              lightingMode === 'pub'
                ? 'bg-zinc-800 text-emerald-400 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
        <div className="hidden sm:block px-3.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur border border-zinc-800 text-[11px] text-zinc-400 font-mono">
          Drag to rotate 360° • Pinch / Scroll to zoom
        </div>
        <div className="sm:hidden px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur border border-zinc-800 text-[10px] text-zinc-400 font-mono">
          360° Orbit
        </div>

        <button
          type="button"
          onClick={captureSnapshot}
          className="pointer-events-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold shadow-lg shadow-amber-950 transition-all flex items-center gap-1.5 active:scale-95 shrink-0"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{isCapturing ? 'Rendering...' : 'Capture Spec'}</span>
        </button>
      </div>
    </div>
  );
}
