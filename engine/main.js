import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import { createCamera, updateCamera } from "./camera.js";
import { createLighting } from "./lighting.js";
import { createControls } from "./controls.js";
import { createEnvironment } from "./environment.js";

import { createBody } from "../car/body.js";
import { createFront } from "../car/front.js";
import { createRear } from "../car/rear.js";
import { createDoors } from "../car/doors.js";
import { createHood } from "../car/hood.js";
import { createRoof } from "../car/roof.js";
import { createWindows } from "../car/windows.js";
import { createMirrors } from "../car/mirrors.js";
import { createWheels } from "../car/wheels.js";
import { createBrakes } from "../car/brakes.js";
import { createGrille } from "../car/grille.js";
import { createHeadlights } from "../car/headlights.js";
import { createTaillights } from "../car/taillights.js";
import { createBumpers } from "../car/bumpers.js";
import { createSideSkirts } from "../car/side-skirts.js";
import { createExhaust } from "../car/exhaust.js";
import { createSpoiler } from "../car/spoiler.js";
import { createInterior } from "../car/interior.js";

import { M5_PAINT } from "../materials/paint.js";
import { M5_GLASS } from "../materials/glass.js";
import { M5_RUBBER } from "../materials/rubber.js";
import { M5_CHROME } from "../materials/chrome.js";
import { M5_CARBON } from "../materials/carbon.js";

import { M5_PROPORTIONS } from "../data/proportions.js";
import { REFERENCE_POINTS } from "../data/reference-points.js";
import { M5_DESIGN_DETAILS } from "../data/design-details.js";

const THREE_VERSION = "0.160.0";

const canvas = document.getElementById("car-canvas");

if (!canvas) {
  throw new Error("car-canvas was not found.");
}

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020204);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance"
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight, false);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const camera = createCamera(window.innerWidth, window.innerHeight);

scene.add(camera);

createLighting(scene);
createEnvironment(scene);

const vehicle = new THREE.Group();
vehicle.name = "BMW_M5_G90";

vehicle.position.set(0, 0, 0);
vehicle.rotation.set(0, 0, 0);

scene.add(vehicle);

const materials = {
  paint: M5_PAINT,
  glass: M5_GLASS,
  rubber: M5_RUBBER,
  chrome: M5_CHROME,
  carbon: M5_CARBON
};

const parts = {};

function safelyCreate(name, creator, options = {}) {
  try {
    const object = creator({
      THREE,
      scene,
      vehicle,
      materials,
      proportions: M5_PROPORTIONS,
      references: REFERENCE_POINTS,
      design: M5_DESIGN_DETAILS,
      options
    });

    if (object) {
      object.name = name;
      vehicle.add(object);
      parts[name] = object;
      return object;
    }

    return null;
  } catch (error) {
    console.error(`M5 component failed: ${name}`, error);
    return null;
  }
}

safelyCreate("Body", createBody);
safelyCreate("Front", createFront);
safelyCreate("Rear", createRear);
safelyCreate("Doors", createDoors);
safelyCreate("Hood", createHood);
safelyCreate("Roof", createRoof);
safelyCreate("Windows", createWindows);
safelyCreate("Mirrors", createMirrors);
safelyCreate("Wheels", createWheels);
safelyCreate("Brakes", createBrakes);
safelyCreate("Grille", createGrille);
safelyCreate("Headlights", createHeadlights);
safelyCreate("Taillights", createTaillights);
safelyCreate("Bumpers", createBumpers);
safelyCreate("SideSkirts", createSideSkirts);
safelyCreate("Exhaust", createExhaust);
safelyCreate("Spoiler", createSpoiler);
safelyCreate("Interior", createInterior);

vehicle.traverse((object) => {
  if (!object.isMesh) {
    return;
  }

  object.castShadow = true;
  object.receiveShadow = true;

  if (object.material) {
    object.material.needsUpdate = true;
  }
});

const controls = createControls({
  camera,
  canvas,
  vehicle,
  THREE
});

const state = {
  autoRotate: false,
  grid: true,
  darkMode: true,

  targetRotation: 0,
  currentRotation: 0,

  targetZoom: 5.25,
  currentZoom: 5.25,

  dragging: false,
  lastPointerX: 0,

  initialized: false
};

function setVehicleRotation(value) {
  state.targetRotation = value;

  while (state.targetRotation > Math.PI * 2) {
    state.targetRotation -= Math.PI * 2;
  }

  while (state.targetRotation < -Math.PI * 2) {
    state.targetRotation += Math.PI * 2;
  }
}

function rotateVehicle(amount) {
  setVehicleRotation(state.targetRotation + amount);
}

function resetVehicle() {
  setVehicleRotation(0);
  state.targetZoom = 5.25;
}

function zoomVehicle(amount) {
  state.targetZoom = THREE.MathUtils.clamp(
    state.targetZoom + amount,
    3.4,
    7.5
  );
}

function smoothVehicleMotion() {
  state.currentRotation = THREE.MathUtils.lerp(
    state.currentRotation,
    state.targetRotation,
    0.085
  );

  state.currentZoom = THREE.MathUtils.lerp(
    state.currentZoom,
    state.targetZoom,
    0.09
  );

  vehicle.rotation.y = state.currentRotation;

  updateCamera(camera, state.currentZoom);
}

function setupPointerControls() {
  canvas.addEventListener("pointerdown", (event) => {
    state.dragging = true;
    state.lastPointerX = event.clientX;

    canvas.setPointerCapture?.(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!state.dragging) {
      return;
    }

    const movement = event.clientX - state.lastPointerX;

    state.lastPointerX = event.clientX;

    setVehicleRotation(
      state.targetRotation + movement * -0.006
    );
  });

  const releasePointer = () => {
    state.dragging = false;
  };

  canvas.addEventListener("pointerup", releasePointer);
  canvas.addEventListener("pointercancel", releasePointer);
  canvas.addEventListener("pointerleave", releasePointer);

  canvas.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      zoomVehicle(event.deltaY > 0 ? 0.35 : -0.35);
    },
    { passive: false }
  );
}

function bindButton(id, callback) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  element.addEventListener("click", callback);
}

function setupVehicleButtons() {
  bindButton("rotate-left", () => {
    rotateVehicle(-Math.PI / 4);
  });

  bindButton("rotate-right", () => {
    rotateVehicle(Math.PI / 4);
  });

  bindButton("reset-view", () => {
    resetVehicle();
  });

  bindButton("zoom-in", () => {
    zoomVehicle(-0.35);
  });

  bindButton("zoom-out", () => {
    zoomVehicle(0.35);
  });
}

function setupMenu() {
  const menuButton = document.getElementById("menu-button");
  const closeMenu = document.getElementById("close-menu");
  const sideMenu = document.getElementById("side-menu");
  const backdrop = document.getElementById("menu-backdrop");

  const open = () => {
    sideMenu?.classList.add("open");
    backdrop?.classList.add("open");
  };

  const close = () => {
    sideMenu?.classList.remove("open");
    backdrop?.classList.remove("open");
  };

  menuButton?.addEventListener("click", open);
  closeMenu?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
}

function setupSettings() {
  const settingsButton = document.getElementById("settings-button");
  const closeSettings = document.getElementById("close-settings");
  const panel = document.getElementById("settings-panel");

  const open = () => {
    panel?.classList.add("open");
  };

  const close = () => {
    panel?.classList.remove("open");
  };

  settingsButton?.addEventListener("click", open);
  closeSettings?.addEventListener("click", close);

  const autoRotateToggle =
    document.getElementById("auto-rotate-toggle");

  const gridToggle =
    document.getElementById("grid-toggle");

  const darkToggle =
    document.getElementById("dark-toggle");

  autoRotateToggle?.addEventListener("change", (event) => {
    state.autoRotate = event.target.checked;
  });

  gridToggle?.addEventListener("change", (event) => {
    state.grid = event.target.checked;

    document.body.classList.toggle(
      "grid-disabled",
      !state.grid
    );
  });

  darkToggle?.addEventListener("change", (event) => {
    state.darkMode = event.target.checked;

    document.body.classList.toggle(
      "light-mode",
      !state.darkMode
    );
  });
}

function setupKeyboard() {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        rotateVehicle(-Math.PI / 12);
        break;

      case "ArrowRight":
        rotateVehicle(Math.PI / 12);
        break;

      case "+":
      case "=":
        zoomVehicle(-0.25);
        break;

      case "-":
      case "_":
        zoomVehicle(0.25);
        break;

      case "0":
        resetVehicle();
        break;

      case " ":
        state.autoRotate = !state.autoRotate;

        const toggle =
          document.getElementById("auto-rotate-toggle");

        if (toggle) {
          toggle.checked = state.autoRotate;
        }

        break;

      default:
        break;
    }
  });
}

function updateStatus() {
  const status = document.getElementById("model-status");

  if (status) {
    status.textContent = "MODEL ONLINE";
  }

  const rotationLabel =
    document.getElementById("rotation-label");

  if (rotationLabel) {
    const degrees =
      THREE.MathUtils.radToDeg(
        state.currentRotation
      );

    const normalized =
      ((degrees % 360) + 360) % 360;

    rotationLabel.textContent =
      `${Math.round(normalized)}°`;
  }
}

function setLoading(progress, statusText) {
  const progressBar =
    document.getElementById("loading-progress");

  const percent =
    document.getElementById("loading-percent");

  const status =
    document.getElementById("loading-status");

  const value =
    Math.max(0, Math.min(100, progress));

  if (progressBar) {
    progressBar.style.width = `${value}%`;
  }

  if (percent) {
    percent.textContent = `${Math.round(value)}%`;
  }

  if (status && statusText) {
    status.textContent = statusText;
  }
}

async function initialize() {
  setLoading(8, "INITIALIZING 3D ENGINE");

  await new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

  setLoading(28, "LOADING VEHICLE GEOMETRY");

  await new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

  setLoading(48, "BUILDING M5 G90 BODY");

  await new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

  setLoading(67, "APPLYING MATERIALS");

  await new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

  setLoading(82, "SETTING LIGHTING");

  await new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });

  setLoading(94, "PREPARING INTERACTION");

  setupPointerControls();
  setupVehicleButtons();
  setupMenu();
  setupSettings();
  setupKeyboard();

  state.initialized = true;

  setLoading(100, "READY");

  const loadingScreen =
    document.getElementById("loading-screen");

  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("loaded");
    }, 250);
  }
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 2)
  );

  renderer.setSize(width, height, false);

  if (camera.isPerspectiveCamera) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

window.addEventListener("resize", resize);

resize();

function animate() {
  requestAnimationFrame(animate);

  if (state.autoRotate) {
    state.targetRotation += 0.004;
  }

  smoothVehicleMotion();

  updateStatus();

  controls?.update?.();

  renderer.render(scene, camera);
}

initialize().then(() => {
  animate();
});
