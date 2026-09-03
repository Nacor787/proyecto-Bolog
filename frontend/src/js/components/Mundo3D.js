import * as THREE from 'three/webgpu';
import { step, normalWorldGeometry, output, texture, vec3, vec4, normalize, positionWorld, bumpMap, cameraPosition, color, uniform, mix, uv, max, time, fract, smoothstep } from 'three/tsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initVantaGlobe } from './VantaGlobe.js';

let renderer, scene, camera, controls, globe, atmosphere, timer;
let animationId;
let isVisible = true;
let isInitialized = false;

// We'll store our vehicles to animate them
const vehicles = [];

// SVGs for the icons (High-tech glowing white for a corporate radar aesthetic)
const planeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" stroke="transparent" stroke-width="0" stroke-linejoin="round"><path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z"/></svg>`;
const shipSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" stroke="transparent" stroke-width="0" stroke-linejoin="round"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.93V8c0-1.1-.9-2-2-2h-3V3c0-1.1-.9-2-2-2H9C7.9 1 7 1.9 7 3v3H4c-1.1 0-2 .9-2 2v2.93l-1.28.11c-.26.08-.48.26-.6.5s-.14.52-.06.78L3.95 19zM9 3h6v3H9V3zm-5 5h16v2H4V8zm.22 5.09l12.82-1.07-1.11 3.88c-.64-.59-1.5-.9-2.43-.9-1.6 0-3.02.88-4 2-.98-1.12-2.4-2-4-2-.93 0-1.79.31-2.43.9L4.22 13.09z"/></svg>`;
const truckSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" stroke="transparent" stroke-width="0" stroke-linejoin="round"><path d="M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M17,12V9.5H19.5L21.47,12H17Z"/></svg>`;

function createSVGTexture(svgString) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  // Add a soft glow behind the icon
  ctx.shadowColor = 'rgba(56, 189, 248, 0.8)'; // sky-400
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  const img = new Image();
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const texture = new THREE.CanvasTexture(canvas);
  
  img.onload = () => {
    ctx.drawImage(img, 16, 16, 96, 96);
    texture.needsUpdate = true;
    URL.revokeObjectURL(url);
  };
  img.src = url;
  
  return texture;
}

const planeTexture = createSVGTexture(planeSVG);
const shipTexture = createSVGTexture(shipSVG);
const truckTexture = createSVGTexture(truckSVG);

export function initMundo3D() {
  try {
    const container = document.getElementById('earth-container');
    if (!container) return;
    if (isInitialized) {
      return;
    }
    isInitialized = true;

    container.innerHTML = '';

  timer = new THREE.Timer();
  timer.connect( document );

  camera = new THREE.PerspectiveCamera( 25, container.clientWidth / container.clientHeight, 0.1, 100 );
  // Centrar cámara en Bolivia (Hub Central) pero más alejada para ver mejor las rutas
  if (window.innerWidth < 768) {
    camera.position.set( 2.8, 0.5, 6.5 ); // Centrado verticalmente y zoom out para móviles
  } else {
    camera.position.set( 1.8, -1.2, 3.8 );
  }

  scene = new THREE.Scene();
  scene.background = null;

  const sun = new THREE.DirectionalLight( '#ffffff', 2.5 );
  sun.position.set( 0, 1, 3 );
  scene.add( sun );

  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  // uniforms
  const atmosphereDayColor = uniform( color( '#4db2ff' ) );
  const atmosphereTwilightColor = uniform( color( '#003b5c' ) ); 
  const roughnessLow = uniform( 0.25 );
  const roughnessHigh = uniform( 0.35 );

  // textures
  const isMobile = window.innerWidth < 768;
  const anisotropy = isMobile ? 1 : 4;

  const textureLoader = new THREE.TextureLoader();
  // Using unpkg instead of raw.githubusercontent to prevent corporate firewall blocks
  const baseUrl = 'https://unpkg.com/three@0.160.0/examples/textures/planets/';
  
  const dayTexture = textureLoader.load( baseUrl + 'earth_day_4096.jpg' );
  dayTexture.colorSpace = THREE.SRGBColorSpace;
  dayTexture.anisotropy = anisotropy;

  const nightTexture = textureLoader.load( baseUrl + 'earth_night_4096.jpg' );
  nightTexture.colorSpace = THREE.SRGBColorSpace;
  nightTexture.anisotropy = anisotropy;

  const bumpRoughnessCloudsTexture = textureLoader.load( baseUrl + 'earth_bump_roughness_clouds_4096.jpg' );
  bumpRoughnessCloudsTexture.anisotropy = anisotropy;

  // fresnel
  const viewDirection = positionWorld.sub( cameraPosition ).normalize();
  const fresnel = viewDirection.dot( normalWorldGeometry ).abs().oneMinus().toVar();
  const sunOrientation = normalWorldGeometry.dot( normalize( sun.position ) ).toVar();
  const atmosphereColor = mix( atmosphereTwilightColor, atmosphereDayColor, sunOrientation.smoothstep( - 0.25, 0.75 ) );

  // globe
  const globeMaterial = new THREE.MeshStandardNodeMaterial();
  const cloudsStrength = texture( bumpRoughnessCloudsTexture, uv() ).b.smoothstep( 0.2, 1 );

  globeMaterial.colorNode = mix( texture( dayTexture ), vec3( 1 ), cloudsStrength.mul( 2 ) );

  const roughness = max(
    texture( bumpRoughnessCloudsTexture ).g,
    step( 0.01, cloudsStrength )
  );
  globeMaterial.roughnessNode = roughness.remap( 0, 1, roughnessLow, roughnessHigh );

  const night = texture( nightTexture );
  const dayStrength = sunOrientation.smoothstep( - 0.25, 0.5 );
  const atmosphereDayStrength = sunOrientation.smoothstep( - 0.5, 1 );
  const atmosphereMix = atmosphereDayStrength.mul( fresnel.pow( 2 ) ).clamp( 0, 1 );

  let finalOutput = mix( night.rgb, output.rgb, dayStrength );
  finalOutput = mix( finalOutput, atmosphereColor, atmosphereMix );

  globeMaterial.outputNode = vec4( finalOutput, output.a );

  const bumpElevation = max(
    texture( bumpRoughnessCloudsTexture ).r,
    cloudsStrength
  );
  globeMaterial.normalNode = bumpMap( bumpElevation );

  const sphereGeometry = new THREE.SphereGeometry( 1, 48, 48 );
  globe = new THREE.Mesh( sphereGeometry, globeMaterial );
  scene.add( globe );

  // atmosphere
  const atmosphereMaterial = new THREE.MeshBasicNodeMaterial( { side: THREE.BackSide, transparent: true } );
  let alpha = fresnel.remap( 0.73, 1, 1, 0 ).pow( 3 );
  alpha = alpha.mul( sunOrientation.smoothstep( - 0.5, 1 ) );
  atmosphereMaterial.outputNode = vec4( atmosphereColor, alpha );

  atmosphere = new THREE.Mesh( sphereGeometry, atmosphereMaterial );
  atmosphere.scale.setScalar( 1.04 );
  scene.add( atmosphere );

  // Add realistic routes
  vehicles.length = 0; // Clear previous
  addRoutesToGlobe(globe);

  // renderer
  const _isMobile = window.innerWidth < 768;
  renderer = new THREE.WebGPURenderer({ alpha: true, antialias: !_isMobile });
  
  // Cap pixel ratio on mobile to drastically improve performance
  const pixelRatio = _isMobile ? Math.min(window.devicePixelRatio, 1.25) : window.devicePixelRatio;
  renderer.setPixelRatio( pixelRatio );
  
  renderer.setSize( container.clientWidth, container.clientHeight );
  renderer.setAnimationLoop( animate );
  
  container.appendChild( renderer.domElement );

  // controls
  const interactionArea = document.getElementById('map-interaction-area');
  controls = new OrbitControls( camera, interactionArea || renderer.domElement );
  controls.enableDamping = true;
  controls.enableZoom = false; // Disabling mouse wheel zoom so it doesn't break page scroll
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.3; // Slower for map exploration

  window.setGlobeInteractionArea = function(elementId) {
    if (controls) {
      const el = document.getElementById(elementId);
      if (el) {
        controls.dispose();
        controls = new OrbitControls(camera, el);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
      }
    }
  };

  window.addEventListener( 'resize', onWindowResize );

  window.setupGlobeZoomButtons = function() {
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    if(zoomInBtn) {
      // Remove old listeners by cloning
      const newZoomInBtn = zoomInBtn.cloneNode(true);
      zoomInBtn.parentNode.replaceChild(newZoomInBtn, zoomInBtn);
      newZoomInBtn.addEventListener('click', () => {
        camera.position.multiplyScalar(0.85);
        if(camera.position.length() < 1.5) camera.position.setLength(1.5);
      });
    }
    if(zoomOutBtn) {
      const newZoomOutBtn = zoomOutBtn.cloneNode(true);
      zoomOutBtn.parentNode.replaceChild(newZoomOutBtn, zoomOutBtn);
      newZoomOutBtn.addEventListener('click', () => {
        camera.position.multiplyScalar(1.15);
        if(camera.position.length() > 6) camera.position.setLength(6);
      });
    }
  };

  // Connect UI zoom buttons initially
  window.setupGlobeZoomButtons();

  // (Parallax eliminado para no interferir con OrbitControls)
  } catch (err) {
    console.warn("Mundo3D WebGPU no soportado o falló, cayendo en fallback a Vanta:", err);
    const container = document.getElementById('earth-container');
    if (container) {
      container.innerHTML = '';
      initVantaGlobe('earth-container');
    }
  }
}

function getSplineFromCoords(lat0, lng0, lat1, lng1, radius, isAir = true) {
  const phi0 = (90 - lat0) * (Math.PI / 180);
  const theta0 = (lng0 + 180) * (Math.PI / 180);

  const phi1 = (90 - lat1) * (Math.PI / 180);
  const theta1 = (lng1 + 180) * (Math.PI / 180);

  const start = new THREE.Vector3(
    - (radius * Math.sin(phi0) * Math.cos(theta0)),
    radius * Math.cos(phi0),
    radius * Math.sin(phi0) * Math.sin(theta0)
  );

  const end = new THREE.Vector3(
    - (radius * Math.sin(phi1) * Math.cos(theta1)),
    radius * Math.cos(phi1),
    radius * Math.sin(phi1) * Math.sin(theta1)
  );

  if (start.clone().add(end).length() < 0.01) {
    end.x += 0.01;
    end.normalize().multiplyScalar(radius);
  }

  const distance = start.distanceTo(end);
  // Air routes go higher, maritime routes hug the surface
  const maxHeight = isAir ? (distance * 0.15) : (distance * 0.02); 

  const points = [];
  const segments = 50;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pos = start.clone().lerp(end, t).normalize();
    const height = radius + Math.sin(t * Math.PI) * maxHeight;
    pos.multiplyScalar(height);
    points.push(pos);
  }

  return new THREE.CatmullRomCurve3(points);
}

function addRoutesToGlobe(globeMesh) {
  window.globeRouteMeshes = []; // Reset on add
  // Hubs Bolivia
  const boliviaSCZ = [-17.7833, -63.1821]; // Santa Cruz (Air/Land)
  const boliviaLPB = [-16.4897, -68.1193]; // La Paz (Air/Land)

  // Puertos Marítimos (Lat, Lng)
  const santos = [-23.9515, -46.3332]; // Brasil
  const arica = [-18.4783, -70.3126];  // Chile
  const iquique = [-20.2133, -70.1503]; // Chile
  const callao = [-12.0566, -77.1181]; // Perú
  const panama = [9.1438, -79.7315];   // Canal de Panamá
  const manzanillo = [19.0531, -104.3161]; // México
  const losAngelesSea = [33.7380, -118.2612]; // Long Beach/LA
  const rotterdam = [51.9225, 4.4791]; // Países Bajos
  const hamburg = [53.5511, 9.9937];   // Alemania
  const algeciras = [36.1309, -5.4468]; // España
  const shanghai = [31.2304, 121.4737]; // China
  const shenzhen = [22.5431, 114.0579]; // China
  const singapore = [1.2644, 103.8400]; // Singapur
  const dubaiSea = [25.0113, 55.0560]; // Jebel Ali

  // Hubs Aéreos (Lat, Lng)
  const miami = [25.7617, -80.1918];
  const newYork = [40.6413, -73.7781]; // JFK
  const losAngelesAir = [33.9416, -118.4085]; // LAX
  const houston = [29.9902, -95.3368]; // IAH
  const bogota = [4.7110, -74.0721];
  const saoPaulo = [-23.4345, -46.4693]; // GRU
  const buenosAires = [-34.8222, -58.5358]; // EZE
  const madrid = [40.4719, -3.5626]; // MAD
  const frankfurt = [50.0379, 8.5622]; // FRA
  const london = [51.4700, -0.4543]; // LHR
  const dubaiAir = [25.2532, 55.3657]; // DXB
  const tokyo = [35.5494, 139.7798]; // HND
  const sydney = [-33.9399, 151.1753]; // SYD

  const routes = [
    // --- RUTAS TERRESTRES (Land: Conectan Bolivia con Puertos y Países Vecinos) ---
    { start: boliviaSCZ, end: santos, type: 'land', color: 0xf59e0b, regions: [] },
    { start: boliviaSCZ, end: buenosAires, type: 'land', color: 0xf59e0b, regions: [] },
    { start: boliviaLPB, end: arica, type: 'land', color: 0xf59e0b, regions: [] },
    { start: boliviaLPB, end: iquique, type: 'land', color: 0xf59e0b, regions: [] },
    { start: boliviaLPB, end: callao, type: 'land', color: 0xf59e0b, regions: [] },

    // --- RUTAS MARÍTIMAS (Sea: Conexiones Globales) ---
    // Pacífico / Asia
    { start: arica, end: callao, type: 'sea', color: 0x34d399, regions: [] },
    { start: callao, end: panama, type: 'sea', color: 0x34d399, regions: ['na'] },
    { start: panama, end: manzanillo, type: 'sea', color: 0x34d399, regions: ['na'] },
    { start: manzanillo, end: losAngelesSea, type: 'sea', color: 0x34d399, regions: ['na'] },
    { start: losAngelesSea, end: shanghai, type: 'sea', color: 0x34d399, regions: ['na', 'asia'] },
    { start: arica, end: shanghai, type: 'sea', color: 0x34d399, regions: ['asia'] }, // Transpacífico directo
    { start: shanghai, end: shenzhen, type: 'sea', color: 0x34d399, regions: ['asia'] },
    { start: shenzhen, end: singapore, type: 'sea', color: 0x34d399, regions: ['asia'] },
    { start: singapore, end: dubaiSea, type: 'sea', color: 0x34d399, regions: ['asia', 'eu'] },
    
    // Atlántico / Europa
    { start: santos, end: panama, type: 'sea', color: 0x34d399, regions: ['na'] },
    { start: santos, end: algeciras, type: 'sea', color: 0x34d399, regions: ['eu'] },
    { start: algeciras, end: rotterdam, type: 'sea', color: 0x34d399, regions: ['eu'] },
    { start: rotterdam, end: hamburg, type: 'sea', color: 0x34d399, regions: ['eu'] },
    { start: panama, end: rotterdam, type: 'sea', color: 0x34d399, regions: ['na', 'eu'] },
    { start: dubaiSea, end: algeciras, type: 'sea', color: 0x34d399, regions: ['eu'] }, 

    // --- RUTAS AÉREAS (Air: Vuelos Hub a Hub) ---
    // Desde Bolivia
    { start: boliviaSCZ, end: miami, type: 'air', color: 0x38bdf8, regions: ['na'] },
    { start: boliviaSCZ, end: madrid, type: 'air', color: 0x38bdf8, regions: ['eu'] },
    { start: boliviaSCZ, end: bogota, type: 'air', color: 0x38bdf8, regions: [] },
    { start: boliviaSCZ, end: saoPaulo, type: 'air', color: 0x38bdf8, regions: [] },
    
    // Conexiones Américas
    { start: saoPaulo, end: miami, type: 'air', color: 0x38bdf8, regions: ['na'] },
    { start: bogota, end: miami, type: 'air', color: 0x38bdf8, regions: ['na'] },
    { start: miami, end: newYork, type: 'air', color: 0x38bdf8, regions: ['na'] },
    { start: miami, end: houston, type: 'air', color: 0x38bdf8, regions: ['na'] },
    { start: houston, end: losAngelesAir, type: 'air', color: 0x38bdf8, regions: ['na'] },
    { start: newYork, end: losAngelesAir, type: 'air', color: 0x38bdf8, regions: ['na'] },

    // Transatlánticas
    { start: miami, end: madrid, type: 'air', color: 0x38bdf8, regions: ['na', 'eu'] },
    { start: newYork, end: london, type: 'air', color: 0x38bdf8, regions: ['na', 'eu'] },
    { start: newYork, end: frankfurt, type: 'air', color: 0x38bdf8, regions: ['na', 'eu'] },
    { start: saoPaulo, end: frankfurt, type: 'air', color: 0x38bdf8, regions: ['eu'] },
    { start: madrid, end: frankfurt, type: 'air', color: 0x38bdf8, regions: ['eu'] },
    { start: london, end: frankfurt, type: 'air', color: 0x38bdf8, regions: ['eu'] },

    // Europa - Medio Oriente - Asia - Oceanía
    { start: madrid, end: dubaiAir, type: 'air', color: 0x38bdf8, regions: ['eu'] },
    { start: frankfurt, end: dubaiAir, type: 'air', color: 0x38bdf8, regions: ['eu'] },
    { start: london, end: dubaiAir, type: 'air', color: 0x38bdf8, regions: ['eu'] },
    { start: dubaiAir, end: shanghai, type: 'air', color: 0x38bdf8, regions: ['eu', 'asia'] },
    { start: dubaiAir, end: tokyo, type: 'air', color: 0x38bdf8, regions: ['eu', 'asia'] },
    { start: dubaiAir, end: sydney, type: 'air', color: 0x38bdf8, regions: ['eu', 'asia'] },
    { start: losAngelesAir, end: tokyo, type: 'air', color: 0x38bdf8, regions: ['na', 'asia'] },
    { start: losAngelesAir, end: sydney, type: 'air', color: 0x38bdf8, regions: ['na', 'asia'] },
    { start: tokyo, end: shanghai, type: 'air', color: 0x38bdf8, regions: ['asia'] },
  ];

  routes.forEach(route => {
    const isAir = route.type === 'air';
    const isLand = route.type === 'land';
    const curve = getSplineFromCoords(route.start[0], route.start[1], route.end[0], route.end[1], 1.01, isAir);
    
    // Dashed line material
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineDashedMaterial({
      color: route.color,
      linewidth: 1,
      scale: 1,
      dashSize: isAir ? 0.05 : 0.03,
      gapSize: isAir ? 0.04 : 0.02,
      transparent: true,
      opacity: 0.6
    });

    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    globeMesh.add(line);

    // Add Vehicle Sprite
    let activeTexture = shipTexture;
    if (isAir) activeTexture = planeTexture;
    if (isLand) activeTexture = truckTexture;

    const spriteMaterial = new THREE.SpriteMaterial({
      map: activeTexture,
      transparent: true,
      opacity: 0.9,
      color: 0xffffff
    });
    
    const sprite = new THREE.Sprite(spriteMaterial);
    const spriteSize = isAir ? 0.08 : 0.06;
    sprite.scale.set(spriteSize, spriteSize, 1);
    
    globeMesh.add(sprite);

    vehicles.push({
      sprite,
      curve,
      progress: Math.random(), // Start at random point
      speed: isAir ? 0.15 : 0.08, // Planes move faster than ships
      isAir,
      isLand
    });

    // Save for filtering
    window.globeRouteMeshes.push({
      line,
      sprite,
      regions: route.regions || []
    });

    // Añadir marcadores
    addMarker(globeMesh, route.start[0], route.start[1], route.color, route.regions || []);
    addMarker(globeMesh, route.end[0], route.end[1], route.color, route.regions || []);
  });
}

// Function to filter routes globally
window.targetCameraPos = null;

window.filterGlobeRoutes = function(regionId) {
  if (!window.globeRouteMeshes) return;
  window.globeRouteMeshes.forEach(item => {
    const isVisible = regionId === 'all' || item.regions.includes(regionId);
    item.line.visible = isVisible;
    item.sprite.visible = isVisible;
  });
  
  if (window.globeMarkerMeshes) {
    window.globeMarkerMeshes.forEach(item => {
      const isVisible = regionId === 'all' || item.regions.includes(regionId) || item.isBolivia;
      item.mesh.visible = isVisible;
    });
  }

  // Fly to region
  const regionsTarget = {
    'na': [30, -95],     // Norteamérica (Miami/Houston/LA)
    'eu': [45, 10],      // Europa
    'asia': [25, 115],   // Asia (China/Singapur)
    'all': [-17, -63]    // Bolivia
  };

  const targetCoords = regionsTarget[regionId];
  if (targetCoords && camera) {
    const radius = camera.position.length(); 
    const lat = targetCoords[0];
    const lng = targetCoords[1];

    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    window.targetCameraPos = new THREE.Vector3(
      - (radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );

    if (globe) {
      window.targetCameraPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), globe.rotation.y);
    }

    if (controls) {
      controls.autoRotate = false; // Pausar rotación automática mientras volamos
    }
  }
};

const markersAdded = new Set();
window.globeMarkerMeshes = [];

function addMarker(globeMesh, lat, lng, colorHex, regions) {
  const key = lat + ',' + lng;
  
  // If marker already exists, just add the new region to it so it stays visible when either region is selected
  const existing = window.globeMarkerMeshes.find(m => m.key === key);
  if (existing) {
    regions.forEach(r => {
      if (!existing.regions.includes(r)) existing.regions.push(r);
    });
    return;
  }
  
  markersAdded.add(key);

  const radius = 1.012;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const pos = new THREE.Vector3(
    - (radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );

  const geometry = new THREE.PlaneGeometry(0.1, 0.1);
  const material = new THREE.MeshBasicNodeMaterial({ 
    transparent: true, 
    depthWrite: false, 
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });

  const dist = uv().sub(0.5).length();
  const offset = uniform( Math.random() );
  
  const ringTime = fract( time.add(offset).mul(0.5) ).mul(0.5); 
  const inStep = smoothstep( ringTime.sub(0.03), ringTime, dist );
  const outStep = smoothstep( ringTime, ringTime.add(0.03), dist ).oneMinus();
  const ring = inStep.mul(outStep);
  
  const fade = uniform(1.0).sub( ringTime.mul(2.0) ).clamp(0,1);

  material.colorNode = color(colorHex);
  material.opacityNode = ring.mul(fade);

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(pos);
  mesh.lookAt(new THREE.Vector3(0,0,0));
  
  globeMesh.add(mesh);

  // Is it a Bolivia hub? (SCZ or LPB)
  const isBolivia = (lat === -17.7833 && lng === -63.1821) || (lat === -16.4897 && lng === -68.1193);

  window.globeMarkerMeshes.push({
    key,
    mesh,
    regions: [...regions],
    isBolivia
  });
}

function onWindowResize() {
  if (!camera || !renderer) return;
  const container = document.getElementById('earth-container');
  if (!container) return;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );
}

function animate() {
  if (!isVisible || !renderer) return;
  
  if (timer) timer.update();
  
  const delta = timer ? timer.getDelta() : 0.016;

  // Camera Fly-To Animation
  if (window.targetCameraPos && camera) {
    const currentRadius = camera.position.length();
    camera.position.lerp(window.targetCameraPos, delta * 4.0);
    camera.position.setLength(currentRadius); // Mantener distancia esférica
    
    // Si llegamos al destino
    if (camera.position.distanceTo(window.targetCameraPos) < 0.1) {
      camera.position.copy(window.targetCameraPos);
      window.targetCameraPos = null;
      if (controls) controls.autoRotate = true; // Reanudar
    }
  }

  if (controls) controls.update();

  if (globe) {
    globe.rotation.y += delta * 0.025;
    
    // Animate vehicles along curves
    vehicles.forEach(vehicle => {
      vehicle.progress += delta * vehicle.speed;
      if(vehicle.progress > 1) vehicle.progress = 0;
      
      const point = vehicle.curve.getPointAt(vehicle.progress);
      vehicle.sprite.position.copy(point);

      // Calcular dirección 2D en pantalla para orientar el vehículo
      const nextProgress = (vehicle.progress + 0.005) % 1;
      const nextPoint = vehicle.curve.getPointAt(nextProgress);
      
      const p1 = point.clone().applyMatrix4(globe.matrixWorld).project(camera);
      const p2 = nextPoint.clone().applyMatrix4(globe.matrixWorld).project(camera);
      
      // Ángulo de movimiento en la pantalla
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      
      // Ajustamos rotación: aviones apuntan arriba (restamos PI/2), camiones apuntan derecha (no restamos)
      const offset = vehicle.isLand ? 0 : Math.PI / 2;
      vehicle.sprite.material.rotation = angle - offset;
      
      // Orient the sprite (for planes we might want to rotate them towards trajectory, 
      // but Sprites always face camera. For true orientation, we'd use Meshes, but sprites are fine for now)
      // Pulsing effect:
      if (vehicle.isAir) {
         vehicle.sprite.scale.setScalar(0.08 + Math.sin(vehicle.progress * Math.PI * 10) * 0.01);
      }
    });
  }

  renderer.render( scene, camera );
}

export function cleanupMundo3D() {
  if (renderer) {
    renderer.setAnimationLoop(null);
    renderer.dispose();
  }
  const container = document.getElementById('earth-container');
  if (container) container.innerHTML = '';
  isInitialized = false;
  markersAdded.clear();
}
