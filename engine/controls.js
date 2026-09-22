/* ============================================================
   BMW M5 G90 — CONTROL SYSTEM
   File: engine/controls.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


/* ============================================================
   01 — CONTROL STATE
   ============================================================ */

const ControlSystem = {

    canvas: null,

    vehicle: null,

    camera: null,

    enabled: true,

    dragging: false,

    pointerId: null,

    lastX: 0,

    lastY: 0,

    rotationSpeed: 0.008,

    verticalSpeed: 0.0025,

    zoomSpeed: 0.45,

    minVerticalRotation: -0.12,

    maxVerticalRotation: 0.12,

    minDistance: 4.5,

    maxDistance: 15,

    distance: 8.5,

    rotationX: 0,

    rotationY: 0,

    autoRotate: false,

    autoRotateSpeed: 0.35,

    initialized: false

};


/* ============================================================
   02 — INITIALIZE CONTROLS
   ============================================================ */

export function initializeControls(
    options = {}
) {

    ControlSystem.canvas =
        options.canvas || null;

    ControlSystem.vehicle =
        options.vehicle || null;

    ControlSystem.camera =
        options.camera || null;


    if (
        typeof options.distance === "number"
    ) {

        ControlSystem.distance =
            options.distance;

    }


    if (
        !ControlSystem.canvas
    ) {

        throw new Error(
            "Control system requires a canvas."
        );

    }


    attachPointerEvents();

    attachWheelEvents();

    attachKeyboardEvents();


    ControlSystem.initialized =
        true;


    return ControlSystem;

}


/* ============================================================
   03 — POINTER EVENTS
   ============================================================ */

function attachPointerEvents() {

    ControlSystem.canvas.addEventListener(
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

}


/* ============================================================
   04 — POINTER DOWN
   ============================================================ */

function handlePointerDown(
    event
) {

    if (
        !ControlSystem.enabled
    ) {

        return;

    }


    ControlSystem.dragging =
        true;


    ControlSystem.pointerId =
        event.pointerId;


    ControlSystem.lastX =
        event.clientX;


    ControlSystem.lastY =
        event.clientY;


    if (
        ControlSystem.canvas.setPointerCapture
    ) {

        try {

            ControlSystem.canvas.setPointerCapture(
                event.pointerId
            );

        } catch (_) {}

    }

}


/* ============================================================
   05 — POINTER MOVE
   ============================================================ */

function handlePointerMove(
    event
) {

    if (
        !ControlSystem.enabled ||
        !ControlSystem.dragging
    ) {

        return;

    }


    if (
        ControlSystem.pointerId !== null &&
        event.pointerId !==
            ControlSystem.pointerId
    ) {

        return;

    }


    const deltaX =
        event.clientX -
        ControlSystem.lastX;


    const deltaY =
        event.clientY -
        ControlSystem.lastY;


    ControlSystem.lastX =
        event.clientX;


    ControlSystem.lastY =
        event.clientY;


    ControlSystem.rotationY -=
        deltaX *
        ControlSystem.rotationSpeed;


    ControlSystem.rotationX -=
        deltaY *
        ControlSystem.verticalSpeed;


    ControlSystem.rotationX =
        THREE.MathUtils.clamp(
            ControlSystem.rotationX,
            ControlSystem.minVerticalRotation,
            ControlSystem.maxVerticalRotation
        );


    applyVehicleRotation();

}


/* ============================================================
   06 — POINTER UP
   ============================================================ */

function handlePointerUp() {

    ControlSystem.dragging =
        false;


    ControlSystem.pointerId =
        null;

}


/* ============================================================
   07 — WHEEL EVENTS
   ============================================================ */

function attachWheelEvents() {

    ControlSystem.canvas.addEventListener(
        "wheel",
        handleWheel,
        {
            passive: false
        }
    );

}


/* ============================================================
   08 — WHEEL ZOOM
   ============================================================ */

function handleWheel(
    event
) {

    if (
        !ControlSystem.enabled
    ) {

        return;

    }


    event.preventDefault();


    if (
        event.deltaY > 0
    ) {

        zoom(
            ControlSystem.zoomSpeed
        );

    } else {

        zoom(
            -ControlSystem.zoomSpeed
        );

    }

}


/* ============================================================
   09 — ZOOM
   ============================================================ */

export function zoom(
    amount
) {

    ControlSystem.distance =
        THREE.MathUtils.clamp(
            ControlSystem.distance +
                amount,
            ControlSystem.minDistance,
            ControlSystem.maxDistance
        );


    updateCameraDistance();

}


/* ============================================================
   10 — KEYBOARD EVENTS
   ============================================================ */

function attachKeyboardEvents() {

    window.addEventListener(
        "keydown",
        handleKeyboard
    );

}


/* ============================================================
   11 — KEYBOARD CONTROL
   ============================================================ */

function handleKeyboard(
    event
) {

    if (
        !ControlSystem.enabled
    ) {

        return;

    }


    switch (
        event.key
    ) {

        case "ArrowLeft":

            rotate(
                Math.PI / 24
            );

            break;


        case "ArrowRight":

            rotate(
                -Math.PI / 24
            );

            break;


        case "ArrowUp":

            tilt(
                -0.025
            );

            break;


        case "ArrowDown":

            tilt(
                0.025
            );

            break;


        case "+":

        case "=":

            zoom(
                -0.5
            );

            break;


        case "-":

            zoom(
                0.5
            );

            break;


        case "r":

        case "R":

            resetControls();

            break;

    }

}


/* ============================================================
   12 — ROTATE
   ============================================================ */

export function rotate(
    amount
) {

    ControlSystem.rotationY +=
        amount;


    applyVehicleRotation();

}


/* ============================================================
   13 — TILT
   ============================================================ */

export function tilt(
    amount
) {

    ControlSystem.rotationX =
        THREE.MathUtils.clamp(
            ControlSystem.rotationX +
                amount,
            ControlSystem.minVerticalRotation,
            ControlSystem.maxVerticalRotation
        );


    applyVehicleRotation();

}


/* ============================================================
   14 — APPLY VEHICLE ROTATION
   ============================================================ */

function applyVehicleRotation() {

    if (
        !ControlSystem.vehicle
    ) {

        return;

    }


    ControlSystem.vehicle.rotation.y =
        ControlSystem.rotationY;


    ControlSystem.vehicle.rotation.x =
        ControlSystem.rotationX;

}


/* ============================================================
   15 — UPDATE CAMERA DISTANCE
   ============================================================ */

function updateCameraDistance() {

    if (
        !ControlSystem.camera
    ) {

        return;

    }


    const camera =
        ControlSystem.camera;


    const direction =
        new THREE.Vector3();


    camera.getWorldDirection(
        direction
    );


    camera.position.z =
        ControlSystem.distance;

}


/* ============================================================
   16 — RESET
   ============================================================ */

export function resetControls() {

    ControlSystem.rotationX =
        0;


    ControlSystem.rotationY =
        0;


    ControlSystem.distance =
        8.5;


    applyVehicleRotation();


    updateCameraDistance();

}


/* ============================================================
   17 — AUTO ROTATION
   ============================================================ */

export function setAutoRotate(
    enabled
) {

    ControlSystem.autoRotate =
        Boolean(enabled);

}


/* ============================================================
   18 — UPDATE AUTO ROTATION
   ============================================================ */

export function updateControls(
    delta
) {

    if (
        !ControlSystem.initialized
    ) {

        return;

    }


    if (
        ControlSystem.autoRotate &&
        !ControlSystem.dragging
    ) {

        ControlSystem.rotationY -=
            delta *
            ControlSystem.autoRotateSpeed;


        applyVehicleRotation();

    }

}


/* ============================================================
   19 — ENABLE CONTROLS
   ============================================================ */

export function setControlsEnabled(
    enabled
) {

    ControlSystem.enabled =
        Boolean(enabled);

}


/* ============================================================
   20 — SET VEHICLE
   ============================================================ */

export function setControlledVehicle(
    vehicle
) {

    ControlSystem.vehicle =
        vehicle;


    applyVehicleRotation();

}


/* ============================================================
   21 — SET CAMERA
   ============================================================ */

export function setControlledCamera(
    camera
) {

    ControlSystem.camera =
        camera;


    updateCameraDistance();

}


/* ============================================================
   22 — GET STATE
   ============================================================ */

export function getControlState() {

    return {

        rotationX:
            ControlSystem.rotationX,

        rotationY:
            ControlSystem.rotationY,

        distance:
            ControlSystem.distance,

        autoRotate:
            ControlSystem.autoRotate,

        enabled:
            ControlSystem.enabled,

        dragging:
            ControlSystem.dragging

    };

}


/* ============================================================
   23 — DISPOSE
   ============================================================ */

export function disposeControls() {

    if (
        !ControlSystem.canvas
    ) {

        return;

    }


    ControlSystem.canvas.removeEventListener(
        "pointerdown",
        handlePointerDown
    );


    ControlSystem.canvas.removeEventListener(
        "wheel",
        handleWheel
    );


    window.removeEventListener(
        "pointermove",
        handlePointerMove
    );


    window.removeEventListener(
        "pointerup",
        handlePointerUp
    );


    window.removeEventListener(
        "pointercancel",
        handlePointerUp
    );


    window.removeEventListener(
        "keydown",
        handleKeyboard
    );


    ControlSystem.initialized =
        false;

}


/* ============================================================
   24 — EXPORT SYSTEM
   ============================================================ */

export {
    ControlSystem
};
