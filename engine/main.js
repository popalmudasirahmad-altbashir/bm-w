/* ============================================================
   BMW M5 G90 — MAIN 3D ENGINE
   File: engine/main.js

   This file is the central controller.
   Vehicle geometry will be connected later from /car/
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


/* ============================================================
   01 — GLOBAL ENGINE STATE
   ============================================================ */

const Engine = {

    scene: null,

    camera: null,

    renderer: null,

    clock: null,

    vehicle: null,

    animationFrame: null,

    initialized: false,

    settings: {
        autoRotate: false,
        showGrid: true,
        darkMode: true
    },

    rotation: {
        x: 0,
        y: 0,
        z: 0
    },

    cameraState: {
        distance: 8.5,
        minDistance: 4.5,
        maxDistance: 15
    },

    pointer: {
        active: false,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    }

};


/* ============================================================
   02 — DOM REFERENCES
   ============================================================ */

const DOM = {

    app:
        document.getElementById("app"),

    experience:
        document.getElementById("experience"),

    canvas:
        document.getElementById("car-canvas"),

    loadingScreen:
        document.getElementById("loading-screen"),

    loadingProgress:
        document.getElementById("loading-progress"),

    loadingPercent:
        document.getElementById("loading-percent"),

    loadingStatus:
        document.getElementById("loading-status"),

    statusText:
        document.getElementById("status-text"),

    statusIndicator:
        document.getElementById("status-indicator"),

    menuButton:
        document.getElementById("menu-button"),

    closeMenu:
        document.getElementById("close-menu"),

    sideMenu:
        document.getElementById("side-menu"),

    menuBackdrop:
        document.getElementById("menu-backdrop"),

    settingsButton:
        document.getElementById("settings-button"),

    closeSettings:
        document.getElementById("close-settings"),

    settingsPanel:
        document.getElementById("settings-panel"),

    autoRotateToggle:
        document.getElementById("auto-rotate-toggle"),

    gridToggle:
        document.getElementById("grid-toggle"),

    darkToggle:
        document.getElementById("dark-toggle"),

    rotateLeft:
        document.getElementById("rotate-left"),

    rotateRight:
        document.getElementById("rotate-right"),

    resetView:
        document.getElementById("reset-view"),

    zoomIn:
        document.getElementById("zoom-in"),

    zoomOut:
        document.getElementById("zoom-out")

};


/* ============================================================
   03 — INITIALIZATION
   ============================================================ */

async function initialize() {

    try {

        updateLoading(
            5,
            "PREPARING 3D ENGINE"
        );


        createScene();

        updateLoading(
            20,
            "CREATING CAMERA"
        );


        createCamera();

        updateLoading(
            35,
            "CREATING RENDERER"
        );


        createRenderer();

        updateLoading(
            50,
            "CONNECTING EXPERIENCE"
        );


        createEmptyVehicleRoot();

        updateLoading(
            65,
            "PREPARING LIGHTING"
        );


        createTemporaryLighting();

        updateLoading(
            75,
            "PREPARING CONTROLS"
        );


        setupBasicControls();

        updateLoading(
            85,
            "PREPARING DISPLAY"
        );


        setupInterface();

        updateLoading(
            95,
            "STARTING 3D ENGINE"
        );


        Engine.initialized = true;

        updateStatus(
            "3D ENGINE READY",
            true
        );


        startAnimation();

        updateLoading(
            100,
            "READY"
        );


        setTimeout(
            hideLoadingScreen,
            550
        );


    } catch (error) {

        console.error(
            "BMW M5 3D initialization error:",
            error
        );

        updateStatus(
            "ENGINE ERROR",
            false
        );

        if (DOM.loadingStatus) {

            DOM.loadingStatus.textContent =
                "3D ENGINE INITIALIZATION FAILED";

        }

    }

}


/* ============================================================
   04 — SCENE
   ============================================================ */

function createScene() {

    Engine.scene =
        new THREE.Scene();


    Engine.scene.background =
        new THREE.Color(
            0x020203
        );


    Engine.clock =
        new THREE.Clock();

}


/* ============================================================
   05 — CAMERA
   ============================================================ */

function createCamera() {

    const width =
        window.innerWidth;

    const height =
        window.innerHeight;


    const aspect =
        width / height;


    Engine.camera =
        new THREE.PerspectiveCamera(
            38,
            aspect,
            0.01,
            1000
        );


    Engine.camera.position.set(
        0,
        1.25,
        Engine.cameraState.distance
    );


    Engine.camera.lookAt(
        0,
        0.65,
        0
    );

}


/* ============================================================
   06 — RENDERER
   ============================================================ */

function createRenderer() {

    if (!DOM.canvas) {

        throw new Error(
            "car-canvas was not found."
        );

    }


    Engine.renderer =
        new THREE.WebGLRenderer({
            canvas: DOM.canvas,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });


    Engine.renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );


    Engine.renderer.setSize(
        window.innerWidth,
        window.innerHeight,
        false
    );


    Engine.renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    Engine.renderer.toneMapping =
        THREE.ACESFilmicToneMapping;


    Engine.renderer.toneMappingExposure =
        1.15;


    Engine.renderer.shadowMap.enabled =
        true;


    Engine.renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;

}


/* ============================================================
   07 — VEHICLE ROOT
   ============================================================ */

function createEmptyVehicleRoot() {

    Engine.vehicle =
        new THREE.Group();


    Engine.vehicle.name =
        "BMW_M5_G90";


    Engine.vehicle.position.set(
        0,
        0,
        0
    );


    Engine.vehicle.rotation.set(
        0,
        0,
        0
    );


    Engine.scene.add(
        Engine.vehicle
    );

}


/* ============================================================
   08 — TEMPORARY LIGHTING
   ============================================================

   This is temporary.
   The dedicated lighting.js file will replace/expand it later.
   ============================================================ */

function createTemporaryLighting() {

    const hemisphere =
        new THREE.HemisphereLight(
            0xffffff,
            0x080808,
            2.0
        );


    hemisphere.position.set(
        0,
        10,
        0
    );


    Engine.scene.add(
        hemisphere
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3.0
        );


    keyLight.position.set(
        5,
        8,
        7
    );


    keyLight.castShadow =
        true;


    keyLight.shadow.mapSize.width =
        2048;


    keyLight.shadow.mapSize.height =
        2048;


    Engine.scene.add(
        keyLight
    );


    const blueLight =
        new THREE.PointLight(
            0x168cff,
            7,
            14
        );


    blueLight.position.set(
        -5,
        2,
        3
    );


    Engine.scene.add(
        blueLight
    );


    const rimLight =
        new THREE.PointLight(
            0x36a6ff,
            6,
            12
        );


    rimLight.position.set(
        4,
        3,
        -5
    );


    Engine.scene.add(
        rimLight
    );

}


/* ============================================================
   09 — BASIC CONTROLS
   ============================================================ */

function setupBasicControls() {

    window.addEventListener(
        "resize",
        handleResize
    );


    DOM.canvas.addEventListener(
        "pointerdown",
        handlePointerDown
    );


    window.addEventListener(
        "pointermove",
        handlePointerMove
    );


    window.addEventListener(
        "pointerup",
        handlePointerUp
    );


    window.addEventListener(
        "pointercancel",
        handlePointerUp
    );


    DOM.canvas.addEventListener(
        "wheel",
        handleWheel,
        {
            passive: false
        }
    );


    if (DOM.rotateLeft) {

        DOM.rotateLeft.addEventListener(
            "click",
            () => {

                Engine.rotation.y +=
                    Math.PI / 8;

            }
        );

    }


    if (DOM.rotateRight) {

        DOM.rotateRight.addEventListener(
            "click",
            () => {

                Engine.rotation.y -=
                    Math.PI / 8;

            }
        );

    }


    if (DOM.resetView) {

        DOM.resetView.addEventListener(
            "click",
            resetVehicleView
        );

    }


    if (DOM.zoomIn) {

        DOM.zoomIn.addEventListener(
            "click",
            () => {

                changeZoom(
                    -0.7
                );

            }
        );

    }


    if (DOM.zoomOut) {

        DOM.zoomOut.addEventListener(
            "click",
            () => {

                changeZoom(
                    0.7
                );

            }
        );

    }


    window.addEventListener(
        "keydown",
        handleKeyboard
    );

}


/* ============================================================
   10 — POINTER DOWN
   ============================================================ */

function handlePointerDown(
    event
) {

    Engine.pointer.active =
        true;


    Engine.pointer.startX =
        event.clientX;


    Engine.pointer.startY =
        event.clientY;


    Engine.pointer.lastX =
        event.clientX;


    Engine.pointer.lastY =
        event.clientY;


    if (DOM.canvas.setPointerCapture) {

        try {

            DOM.canvas.setPointerCapture(
                event.pointerId
            );

        } catch (_) {}

    }

}


/* ============================================================
   11 — POINTER MOVE
   ============================================================ */

function handlePointerMove(
    event
) {

    if (!Engine.pointer.active) {

        return;

    }


    const deltaX =
        event.clientX -
        Engine.pointer.lastX;


    const deltaY =
        event.clientY -
        Engine.pointer.lastY;


    Engine.pointer.lastX =
        event.clientX;


    Engine.pointer.lastY =
        event.clientY;


    Engine.rotation.y -=
        deltaX * 0.008;


    Engine.rotation.x -=
        deltaY * 0.0025;


    Engine.rotation.x =
        THREE.MathUtils.clamp(
            Engine.rotation.x,
            -0.12,
            0.12
        );

}


/* ============================================================
   12 — POINTER UP
   ============================================================ */

function handlePointerUp() {

    Engine.pointer.active =
        false;

}


/* ============================================================
   13 — WHEEL ZOOM
   ============================================================ */

function handleWheel(
    event
) {

    event.preventDefault();


    changeZoom(
        event.deltaY > 0
            ? 0.45
            : -0.45
    );

}


/* ============================================================
   14 — ZOOM
   ============================================================ */

function changeZoom(
    amount
) {

    Engine.cameraState.distance =
        THREE.MathUtils.clamp(
            Engine.cameraState.distance +
                amount,
            Engine.cameraState.minDistance,
            Engine.cameraState.maxDistance
        );

}


/* ============================================================
   15 — RESET VIEW
   ============================================================ */

function resetVehicleView() {

    Engine.rotation.x =
        0;

    Engine.rotation.y =
        0;

    Engine.rotation.z =
        0;


    Engine.cameraState.distance =
        8.5;

}


/* ============================================================
   16 — KEYBOARD
   ============================================================ */

function handleKeyboard(
    event
) {

    switch (event.key) {

        case "ArrowLeft":

            Engine.rotation.y +=
                Math.PI / 24;

            break;


        case "ArrowRight":

            Engine.rotation.y -=
                Math.PI / 24;

            break;


        case "ArrowUp":

            Engine.rotation.x =
                THREE.MathUtils.clamp(
                    Engine.rotation.x -
                        0.025,
                    -0.12,
                    0.12
                );

            break;


        case "ArrowDown":

            Engine.rotation.x =
                THREE.MathUtils.clamp(
                    Engine.rotation.x +
                        0.025,
                    -0.12,
                    0.12
                );

            break;


        case "+":

        case "=":

            changeZoom(
                -0.5
            );

            break;


        case "-":

            changeZoom(
                0.5
            );

            break;


        case "r":

        case "R":

            resetVehicleView();

            break;

    }

}


/* ============================================================
   17 — INTERFACE
   ============================================================ */

function setupInterface() {


    /* --------------------------------------------------------
       MENU
       -------------------------------------------------------- */

    if (DOM.menuButton) {

        DOM.menuButton.addEventListener(
            "click",
            openMenu
        );

    }


    if (DOM.closeMenu) {

        DOM.closeMenu.addEventListener(
            "click",
            closeMenu
        );

    }


    if (DOM.menuBackdrop) {

        DOM.menuBackdrop.addEventListener(
            "click",
            closeMenu
        );

    }


    /* --------------------------------------------------------
       SETTINGS
       -------------------------------------------------------- */

    if (DOM.settingsButton) {

        DOM.settingsButton.addEventListener(
            "click",
            openSettings
        );

    }


    if (DOM.closeSettings) {

        DOM.closeSettings.addEventListener(
            "click",
            closeSettings
        );

    }


    /* --------------------------------------------------------
       AUTO ROTATE
       -------------------------------------------------------- */

    if (DOM.autoRotateToggle) {

        DOM.autoRotateToggle.addEventListener(
            "change",
            () => {

                Engine.settings.autoRotate =
                    DOM.autoRotateToggle.checked;

            }
        );

    }


    /* --------------------------------------------------------
       GRID
       -------------------------------------------------------- */

    if (DOM.gridToggle) {

        DOM.gridToggle.addEventListener(
            "change",
            () => {

                Engine.settings.showGrid =
                    DOM.gridToggle.checked;

                updateGridVisibility();

            }
        );

    }


    /* --------------------------------------------------------
       DARK MODE
       -------------------------------------------------------- */

    if (DOM.darkToggle) {

        DOM.darkToggle.addEventListener(
            "change",
            () => {

                Engine.settings.darkMode =
                    DOM.darkToggle.checked;

                document.body.classList.toggle(
                    "light-mode",
                    !Engine.settings.darkMode
                );

            }
        );

    }

}


/* ============================================================
   18 — MENU FUNCTIONS
   ============================================================ */

function openMenu() {

    if (DOM.sideMenu) {

        DOM.sideMenu.classList.add(
            "open"
        );

    }


    if (DOM.menuBackdrop) {

        DOM.menuBackdrop.classList.add(
            "open"
        );

    }

}


function closeMenu() {

    if (DOM.sideMenu) {

        DOM.sideMenu.classList.remove(
            "open"
        );

    }


    if (DOM.menuBackdrop) {

        DOM.menuBackdrop.classList.remove(
            "open"
        );

    }

}


/* ============================================================
   19 — SETTINGS FUNCTIONS
   ============================================================ */

function openSettings() {

    if (DOM.settingsPanel) {

        DOM.settingsPanel.classList.add(
            "open"
        );

    }

}


function closeSettings() {

    if (DOM.settingsPanel) {

        DOM.settingsPanel.classList.remove(
            "open"
        );

    }

}


/* ============================================================
   20 — GRID VISIBILITY
   ============================================================ */

function updateGridVisibility() {

    const grid =
        Engine.scene.getObjectByName(
            "SHOWROOM_GRID"
        );


    if (grid) {

        grid.visible =
            Engine.settings.showGrid;

    }

}


/* ============================================================
   21 — RESIZE
   ============================================================ */

function handleResize() {

    if (
        !Engine.camera ||
        !Engine.renderer
    ) {

        return;

    }


    const width =
        window.innerWidth;


    const height =
        window.innerHeight;


    Engine.camera.aspect =
        width / height;


    Engine.camera.updateProjectionMatrix();


    Engine.renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );


    Engine.renderer.setSize(
        width,
        height,
        false
    );

}


/* ============================================================
   22 — ANIMATION LOOP
   ============================================================ */

function startAnimation() {

    function animate() {

        Engine.animationFrame =
            requestAnimationFrame(
                animate
            );


        const delta =
            Engine.clock.getDelta();


        if (
            Engine.settings.autoRotate &&
            Engine.vehicle
        ) {

            Engine.rotation.y -=
                delta * 0.35;

        }


        if (Engine.vehicle) {

            Engine.vehicle.rotation.y =
                Engine.rotation.y;

            Engine.vehicle.rotation.x =
                Engine.rotation.x;

            Engine.vehicle.rotation.z =
                Engine.rotation.z;

        }


        updateCamera();


        renderScene();

    }


    animate();

}


/* ============================================================
   23 — CAMERA UPDATE
   ============================================================ */

function updateCamera() {

    if (!Engine.camera) {

        return;

    }


    const distance =
        Engine.cameraState.distance;


    const target =
        new THREE.Vector3(
            0,
            0.65,
            0
        );


    const cameraHeight =
        1.35;


    Engine.camera.position.set(
        0,
        cameraHeight,
        distance
    );


    Engine.camera.lookAt(
        target
    );

}


/* ============================================================
   24 — RENDER
   ============================================================ */

function renderScene() {

    if (
        !Engine.renderer ||
        !Engine.scene ||
        !Engine.camera
    ) {

        return;

    }


    Engine.renderer.render(
        Engine.scene,
        Engine.camera
    );

}


/* ============================================================
   25 — LOADING UI
   ============================================================ */

function updateLoading(
    percent,
    status
) {

    if (DOM.loadingProgress) {

        DOM.loadingProgress.style.width =
            `${percent}%`;

    }


    if (DOM.loadingPercent) {

        DOM.loadingPercent.textContent =
            `${Math.round(percent)}%`;

    }


    if (DOM.loadingStatus) {

        DOM.loadingStatus.textContent =
            status;

    }

}


/* ============================================================
   26 — STATUS UI
   ============================================================ */

function updateStatus(
    text,
    ready
) {

    if (DOM.statusText) {

        DOM.statusText.textContent =
            text;

    }


    if (DOM.statusIndicator) {

        DOM.statusIndicator.style.background =
            ready
                ? "#168cff"
                : "#ff3048";

        DOM.statusIndicator.style.boxShadow =
            ready
                ? "0 0 12px rgba(22,140,255,0.9)"
                : "0 0 12px rgba(255,48,72,0.9)";

    }

}


/* ============================================================
   27 — LOADING SCREEN HIDE
   ============================================================ */

function hideLoadingScreen() {

    if (!DOM.loadingScreen) {

        return;

    }


    DOM.loadingScreen.classList.add(
        "loaded"
    );

}


/* ============================================================
   28 — GLOBAL ACCESS
   ============================================================ */

window.M5Engine =
    Engine;


/* ============================================================
   29 — START
   ============================================================ */

initialize();
