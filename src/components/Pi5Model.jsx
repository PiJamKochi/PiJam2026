import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Cpu } from 'lucide-react';

export default function Pi5Model() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const stateRef = useRef({ hoveredGroup: null });
  const activeComponentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Annotation state
  const [activeAnnotation, setActiveAnnotation] = useState(null);

  // DOM Refs for dynamic annotation tracking
  const domAnnotationRef = useRef(null);
  const domSvgLineRef = useRef(null);
  const domSvgCircleRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 400;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7.5, 9.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // --- ORBIT CONTROLS ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground level
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.enableZoom = false;


    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(6, 12, 8);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd5c198, 0.9); // Rich Brass/Gold fill light
    dirLight2.position.set(-6, -2, -8);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xfff0db, 1.4, 20); // Warm point light
    pointLight.position.set(0, 3.5, 0);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2.5);
    spotLight.position.set(0, 6, 3);
    spotLight.angle = Math.PI / 3;
    spotLight.penumbra = 0.6;
    scene.add(spotLight);

    // --- RASPBERRY PI 5 GROUP ---
    const piGroup = new THREE.Group();
    scene.add(piGroup);

    const interactiveObjects = [];

    // Helper to create an interactive hitbox and hover highlight boundaries
    const createInteractiveZone = (name, category, spec, details, size, position) => {
      const group = new THREE.Group();
      group.position.copy(position);

      // 1. Hitbox (invisible but raycastable)
      const hitGeo = new THREE.BoxGeometry(size.x, size.y, size.z);
      const hitMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0, // Fully invisible to user
      });
      const hitbox = new THREE.Mesh(hitGeo, hitMat);
      hitbox.position.y = size.y / 2;
      group.add(hitbox);

      // 2. Highlight Indicator (Neo-brutalism themed colored blocks)
      const highlightGeo = new THREE.BoxGeometry(size.x * 1.08, size.y * 1.08, size.z * 1.08);
      
      // Semi-transparent hot pink fill
      const fillMat = new THREE.MeshBasicMaterial({
        color: 0xff4097, // Hot Pink
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        visible: false,
      });
      const fillMesh = new THREE.Mesh(highlightGeo, fillMat);
      fillMesh.position.y = size.y / 2;
      group.add(fillMesh);

      // Thick vibrant blue outline
      const edges = new THREE.EdgesGeometry(highlightGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x1a80e6, // Vibrant Blue
        visible: false,
      });
      const outline = new THREE.LineSegments(edges, lineMat);
      outline.position.y = size.y / 2;
      group.add(outline);

      // Store references for animation / hover triggers
      group.userData = {
        name,
        category,
        spec,
        details,
        originalY: position.y,
        fillMesh,
        outline,
        targetY: position.y,
      };

      // Bind parent reference for raycaster mapping
      hitbox.userData.parentGroup = group;
      interactiveObjects.push(hitbox);

      piGroup.add(group);
      return group;
    };

    // --- LOAD 3D STEP-CONVERTED CAD MODEL ---
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      `${import.meta.env.BASE_URL}raspberry_pi_5.glb`,
      (gltf) => {
        const model = gltf.scene;

        // Auto-detect size, scale, and center the CAD geometry
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        
        const targetWidth = 9.5;
        let scaleFactor = targetWidth / size.x;

        // If height (y) is larger than depth (z) in CAD space, it's Z-up oriented
        if (size.y > size.z) {
          model.rotation.x = -Math.PI / 2;
          
          const rotatedBox = new THREE.Box3().setFromObject(model);
          const rotatedSize = rotatedBox.getSize(new THREE.Vector3());
          const rotatedCenter = rotatedBox.getCenter(new THREE.Vector3());
          scaleFactor = targetWidth / rotatedSize.x;
          model.scale.set(scaleFactor, scaleFactor, scaleFactor);
          model.position.set(
            -rotatedCenter.x * scaleFactor,
            -rotatedCenter.y * scaleFactor + 0.08,
            -rotatedCenter.z * scaleFactor
          );
        } else {
          const rotatedBox = new THREE.Box3().setFromObject(model);
          const rotatedSize = rotatedBox.getSize(new THREE.Vector3());
          const rotatedCenter = rotatedBox.getCenter(new THREE.Vector3());
          scaleFactor = targetWidth / rotatedSize.x;
          model.scale.set(scaleFactor, scaleFactor, scaleFactor);
          model.position.set(
            -rotatedCenter.x * scaleFactor,
            -rotatedCenter.y * scaleFactor + 0.08,
            -rotatedCenter.z * scaleFactor
          );
        }

        // Apply realistic shadow maps and high performance materials
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            if (node.material) {
              node.material.roughness = 0.45;
              node.material.metalness = 0.35;
            }
          }
        });

        piGroup.add(model);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading CAD GLB model:', error);
        setIsLoading(false);
      }
    );

    // --- INTERACTIVE ZONES SETUP ---
    const boardTopY = 0.08;

    createInteractiveZone(
      "Broadcom BCM2712 SOC",
      "PROCESSOR // CORE_BLOCK",
      "Quad-core A76 @ 2.4GHz",
      "The brain of the Pi 5. A 16nm application processor delivering 2-3x CPU performance gains over the Pi 4, with cryptography extensions and 2MB shared L3 cache.",
      new THREE.Vector3(1.8, 0.3, 1.8),
      new THREE.Vector3(-1.0, boardTopY, 0.4)
    );

    createInteractiveZone(
      "LPDDR4X Memory",
      "REGISTER // MEM_BUS",
      "8GB LPDDR4X / 4267MHz",
      "Ultra-high bandwidth RAM operating at 4267MHz. Provides fast memory allocation for heavy workloads, compiles, and AI tasks.",
      new THREE.Vector3(1.4, 0.3, 1.4),
      new THREE.Vector3(1.1, boardTopY, 0.5)
    );

    createInteractiveZone(
      "RP1 I/O Controller",
      "CHIP // SOUTHBRIDGE",
      "Raspberry Pi Silicon",
      "In-house designed silicon chip managing I/O peripherals. Powers the GPIO pins, camera/display interfaces, Gigabit Ethernet, and USB controllers.",
      new THREE.Vector3(1.2, 0.25, 1.2),
      new THREE.Vector3(1.5, boardTopY, -1.6)
    );

    createInteractiveZone(
      "40-Pin GPIO Header",
      "GPIO // PIN_OUTS",
      "40-pin Color Coded Bus",
      "Dual-row 40-pin GPIO pin header. Provides UART, I2C, SPI, PWM, and power rails for hardware prototyping and edge attachments.",
      new THREE.Vector3(7.8, 0.9, 0.5),
      new THREE.Vector3(-0.2, boardTopY, -2.7)
    );

    createInteractiveZone(
      "Gigabit Ethernet Port",
      "PORT // LAN_RJ45",
      "1000 Mbps High-Speed Bus",
      "Gigabit Ethernet port powered by high-speed I/O. Supports Power over Ethernet (PoE+) using a separate HAT.",
      new THREE.Vector3(1.6, 1.3, 1.4),
      new THREE.Vector3(4.0, boardTopY, 1.8)
    );

    createInteractiveZone(
      "Dual USB 3.0 Ports",
      "PORT // USB_3",
      "5 Gbps High-Speed Bus",
      "Two blue USB 3.0 ports offering SuperSpeed 5Gbps transfer speeds. Perfect for external SSDs, high-res cameras, and fast networking.",
      new THREE.Vector3(1.6, 1.3, 1.4),
      new THREE.Vector3(4.0, boardTopY, -0.1)
    );

    createInteractiveZone(
      "Dual USB 2.0 Ports",
      "PORT // USB_2",
      "480 Mbps Peripheral Bus",
      "Two standard USB 2.0 ports. Ideal for keyboard, mouse, microcontrollers, flash drives, and legacy low-speed USB peripherals.",
      new THREE.Vector3(1.6, 1.3, 1.4),
      new THREE.Vector3(4.0, boardTopY, -1.8)
    );

    createInteractiveZone(
      "USB-C Power Input",
      "PORT // DC_PWR_IN",
      "5V / 5A Power Delivery",
      "USB Type-C power connector. Supports 5V/5A power profiles, allowing the Pi 5 to supply extra current to connected USB peripherals.",
      new THREE.Vector3(0.9, 0.6, 0.9),
      new THREE.Vector3(-3.2, boardTopY, 2.9)
    );

    createInteractiveZone(
      "Dual Micro-HDMI Ports",
      "PORT // AV_OUT",
      "Dual 4K @ 60Hz HDR",
      "Two micro-HDMI ports supporting dual displays up to 4K resolution at 60Hz. Supports modern HDR and immersive digital surround sound audio.",
      new THREE.Vector3(2.0, 0.6, 0.8),
      new THREE.Vector3(-1.0, boardTopY, 2.9)
    );

    createInteractiveZone(
      "PCIe 2.0 Interface",
      "EXPANSION // PCI_E",
      "FPC Connector / Gen 2",
      "Single-lane PCIe 2.0 ribbon interface. Enables native high-speed connection to M.2 NVMe SSDs, AI accelerators, and high-bandwidth network adapters.",
      new THREE.Vector3(0.5, 0.3, 1.7),
      new THREE.Vector3(-3.7, boardTopY, 0.4)
    );

    createInteractiveZone(
      "Dual MIPI Transceivers",
      "BUS // MIPI_CSI_DSI",
      "4-lane Camera / Display",
      "Two 4-lane MIPI camera/display transceivers. Supports any combination of Raspberry Pi camera modules and high-resolution touchscreen displays.",
      new THREE.Vector3(1.3, 0.3, 0.5),
      new THREE.Vector3(2.8, boardTopY, -2.8)
    );

    createInteractiveZone(
      "Onboard Power Button",
      "REGISTER // SYS_CTRL",
      "Soft Power Switch",
      "Dedicated hardware power switch. Tap to boot, long-hold to execute safe shutdown sequence, or double-tap to enter sleep mode.",
      new THREE.Vector3(0.5, 0.4, 0.5),
      new THREE.Vector3(-4.5, boardTopY, 1.7)
    );

    // Set rotation to make it look heroic/isometric (rotated 180 degrees around Y axis)
    piGroup.rotation.x = 0.25;
    piGroup.rotation.y = -0.4 + Math.PI;

    // --- RAYCASTING (HOVER DETECTION) ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseLeave = () => {
      mouse.set(-9999, -9999);
    };

    // Genuine click verification (ignore drags)
    let pointerStartX = 0;
    let pointerStartY = 0;

    const handlePointerDown = (event) => {
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
    };

    const handlePointerUp = (event) => {
      const diffX = Math.abs(event.clientX - pointerStartX);
      const diffY = Math.abs(event.clientY - pointerStartY);
      // If the pointer did not move, it's a click selection
      if (diffX < 6 && diffY < 6) {
        performSelection();
      }
    };

    const performSelection = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, true);

      if (intersects.length > 0) {
        let current = intersects[0].object;
        let foundGroup = null;
        while (current && current !== scene) {
          if (current.userData && current.userData.parentGroup) {
            foundGroup = current.userData.parentGroup;
            break;
          }
          current = current.parent;
        }

        if (foundGroup) {
          activeComponentRef.current = foundGroup;
          controls.autoRotate = false; // Pause rotation when inspecting details
          
          setActiveAnnotation({
            name: foundGroup.userData.name,
            category: foundGroup.userData.category,
            spec: foundGroup.userData.spec,
            details: foundGroup.userData.details,
            x: 0,
            y: 0
          });
        }
      } else {
        // Clicked outside, dismiss the active annotation and resume autorotate
        setActiveAnnotation(null);
        activeComponentRef.current = null;
        controls.autoRotate = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);

    const highlightGroup = (group, isHighlighted) => {
      const fill = group.userData.fillMesh;
      const outline = group.userData.outline;

      if (fill) fill.visible = isHighlighted;
      if (outline) outline.visible = isHighlighted;

      const targetY = isHighlighted ? group.userData.originalY + 0.15 : group.userData.originalY;
      group.userData.targetY = targetY;
    };

    // --- ANIMATION LOOP ---
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp active components vertical hover positions
      piGroup.children.forEach((child) => {
        if (child.userData && child.userData.targetY !== undefined) {
          child.position.y += (child.userData.targetY - child.position.y) * 0.15;
        }
      });

      // Sync controls auto-rotate state
      if (!activeComponentRef.current) {
        controls.autoRotate = true;
      } else {
        controls.autoRotate = false;
      }

      controls.update();

      // Check hover intersections
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, true);

      let foundGroup = null;

      if (intersects.length > 0) {
        let current = intersects[0].object;
        while (current && current !== scene) {
          if (current.userData && current.userData.parentGroup) {
            foundGroup = current.userData.parentGroup;
            break;
          }
          current = current.parent;
        }
      }

      const prevHovered = stateRef.current.hoveredGroup;

      if (foundGroup !== prevHovered) {
        if (prevHovered) {
          highlightGroup(prevHovered, false);
        }
        if (foundGroup) {
          highlightGroup(foundGroup, true);
        }
        stateRef.current.hoveredGroup = foundGroup;
      }

      // Track active clicked annotation projection
      if (activeComponentRef.current && domAnnotationRef.current && domSvgLineRef.current) {
        const tempV = new THREE.Vector3();
        activeComponentRef.current.getWorldPosition(tempV);
        tempV.project(camera);

        const rect = renderer.domElement.getBoundingClientRect();
        const x = (tempV.x * 0.5 + 0.5) * rect.width;
        const y = (tempV.y * -0.5 + 0.5) * rect.height;

        // Visual offset positions for the info box (top-right of node)
        const boxWidth = 240;
        const boxHeight = 160;
        
        let boxX = x + 60;
        let boxY = y - 110;

        // Bounding clamp checks to keep card inside the viewport area
        if (boxX + boxWidth > rect.width) {
          boxX = x - boxWidth - 60;
        }
        if (boxY < 10) {
          boxY = y + 30;
        }

        // Apply direct CSS changes to bypass React cycles
        domAnnotationRef.current.style.transform = `translate(${boxX}px, ${boxY}px)`;
        
        // Update SVG line segments
        domSvgLineRef.current.setAttribute('x1', x);
        domSvgLineRef.current.setAttribute('y1', y);
        
        // Connect to nearest edge of box
        const connX = boxX < x ? boxX + boxWidth : boxX;
        const connY = boxY < y ? boxY + boxHeight / 2 : boxY;
        domSvgLineRef.current.setAttribute('x2', connX);
        domSvgLineRef.current.setAttribute('y2', connY);

        if (domSvgCircleRef.current) {
          domSvgCircleRef.current.setAttribute('cx', x);
          domSvgCircleRef.current.setAttribute('cy', y);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 400;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement) {
        renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
        renderer.domElement.removeEventListener('pointerup', handlePointerUp);
        renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      piGroup.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
      
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] relative select-none">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-kasavu-dark z-20 border-3 border-teak rounded-xl shadow-[4px_4px_0px_0px_var(--color-teak)]">
          <div className="flex items-center space-x-2 text-teak font-mono text-xs font-black uppercase mb-4 animate-pulse">
            <Cpu className="w-5 h-5 animate-spin mr-1.5 text-brass" />
            Booting 3D System // LOAD_CAD_MODEL...
          </div>
          <div className="w-48 bg-kasavu border-2 border-teak rounded-full h-3 overflow-hidden shadow-[2px_2px_0px_0px_var(--color-teak)]">
            <div className="bg-terracotta h-full w-2/3 animate-[pulse_1.5s_infinite] rounded-full" />
          </div>
        </div>
      )}

      {/* Floating 2D Annotations Layer */}
      {activeAnnotation && (
        <>
          {/* SVG Connecting Lines (z-20) */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full z-20">
            <line
              ref={domSvgLineRef}
              stroke="#ff4097"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <circle
              ref={domSvgCircleRef}
              r="4.5"
              fill="#ff4097"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </svg>

          {/* HTML Overlay Detail Bubble (z-30) */}
          <div
            ref={domAnnotationRef}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}
            className="w-[240px] bg-kasavu-dark border-2 border-teak p-4.5 rounded-lg shadow-[3px_3px_0px_0px_var(--color-teak)] z-30 font-mono text-left select-none relative animate-fadeIn"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveAnnotation(null);
                activeComponentRef.current = null;
                if (stateRef.current) {
                  // Resume autoRotate on close
                  // We can't access controls directly here unless we save a reference or it is clean
                }
              }}
              className="absolute top-2 right-2.5 text-brass hover:text-terracotta font-mono font-black text-[10px] cursor-pointer"
            >
              [X]
            </button>
            
            <div className="text-[8px] text-terracotta font-black uppercase tracking-wider mb-1">
              {activeAnnotation.category}
            </div>
            
            <h4 className="font-sans font-black text-xs text-teak mb-1.5 leading-tight">
              {activeAnnotation.name}
            </h4>
            
            <div className="inline-block bg-brass text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm mb-2.5 border border-teak/10">
              {activeAnnotation.spec}
            </div>
            
            <p className="font-serif text-[10px] text-teak-light leading-normal font-bold">
              {activeAnnotation.details}
            </p>
          </div>
        </>
      )}

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing rounded-xl" />
    </div>
  );
}
