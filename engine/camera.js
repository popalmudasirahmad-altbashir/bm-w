/* ============================================================
   BMW M5 G90 — CAMERA SYSTEM
   File: engine/camera.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


/* ============================================================
   01 — CAMERA CONFIGURATION
   ============================================================ */

const CameraSystem = {

    camera: null,

    target: null,

    distance: 8.5,

    minDistance: 4.5,

    maxDistance: 15,

    height: 1.35,

    targetHeight: 0.65,

    fov: 38,

    initialized: false

};


/* ============================================================
   02 — CREATE CAMERA
   ============================================================ */

export function createCamera() {

    const width =
        window.innerWidth;

    const height =
        Math.max(
            window.innerHeight,
            1
        );


    const aspect =
        width / height;


    CameraSystem.camera =
        new THREE.PerspectiveCamera(
            CameraSystem.fov,
            aspect,
            0.01,
            1000
        );


    CameraSystem.target =
        new THREE.Vector3(
            0,
            CameraSystem.targetHeight,
            0
        );


    CameraSystem.camera.position.set(
        0,
        CameraSystem.height,
        CameraSystem.distance
    );


    CameraSystem.camera.lookAt(
        CameraSystem.target
    );


    CameraSystem.initialized =
        true;


    return CameraSystem.camera;

}


/* ============================================================
   03 — UPDATE CAMERA
   ============================================================ */

export function updateCamera() {

    if (
        !CameraSystem.camera ||
        !CameraSystem.initialized
    ) {

        return;

    }


    CameraSystem.camera.position.set(
        0,
        CameraSystem.height,
        CameraSystem.distance
    );


    CameraSystem.camera.lookAt(
        CameraSystem.target
    );

}


/* ============================================================
   04 — CHANGE ZOOM
   ============================================================ */

export function changeCameraZoom(
    amount
) {

    CameraSystem.distance =
        THREE.MathUtils.clamp(
            CameraSystem.distance +
                amount,
            CameraSystem.minDistance,
            CameraSystem.maxDistance
        );


    updateCamera();

}


/* ============================================================
   05 — SET DISTANCE
   ============================================================ */

export function setCameraDistance(
    distance
) {

    CameraSystem.distance =
        THREE.MathUtils.clamp(
            distance,
            CameraSystem.minDistance,
            CameraSystem.maxDistance
        );


    updateCamera();

}


/* ============================================================
   06 — RESET CAMERA
   ============================================================ */

export function resetCamera() {

    CameraSystem.distance =
        8.5;


    CameraSystem.height =
        1.35;


    CameraSystem.targetHeight =
        0.65;


    if (CameraSystem.target) {

        CameraSystem.target.set(
            0,
            CameraSystem.targetHeight,
            0
        );

    }


    updateCamera();

}


/* ============================================================
   07 — RESIZE CAMERA
   ============================================================ */

export function resizeCamera() {

    if (!CameraSystem.camera) {

        return;

    }


    const width =
        window.innerWidth;

    const height =
        Math.max(
            window.innerHeight,
            1
        );


    CameraSystem.camera.aspect =
        width / height;


    CameraSystem.camera.updateProjectionMatrix();

}


/* ============================================================
   08 — CAMERA HEIGHT
   ============================================================ */

export function setCameraHeight(
    height
) {

    CameraSystem.height =
        THREE.MathUtils.clamp(
            height,
            0.5,
            5
        );


    updateCamera();

}


/* ============================================================
   09 — CAMERA TARGET
   ============================================================ */

export function setCameraTarget(
    x,
    y,
    z
) {

    if (!CameraSystem.target) {

        return;

    }


    CameraSystem.target.set(
        x,
        y,
        z
    );


    updateCamera();

}


/* ============================================================
   10 — GET CAMERA
   ============================================================ */

export function getCamera() {

    return CameraSystem.camera;

}


/* ============================================================
   11 — GET CAMERA DISTANCE
   ============================================================ */

export function getCameraDistance() {

    return CameraSystem.distance;

}


/* ============================================================
   12 — GET CAMERA STATE
   ============================================================ */

export function getCameraState() {

    return {

        distance:
            CameraSystem.distance,

        minDistance:
            CameraSystem.minDistance,

        maxDistance:
            CameraSystem.maxDistance,

        height:
            CameraSystem.height,

        targetHeight:
            CameraSystem.targetHeight,

        fov:
            CameraSystem.fov

    };

}


/* ============================================================
   13 — INITIALIZE CAMERA
   ============================================================ */

export function initializeCamera() {

    if (
        CameraSystem.initialized &&
        CameraSystem.camera
    ) {

        return CameraSystem.camera;

    }


    return createCamera();

}


/* ============================================================
   14 — CAMERA SYSTEM ACCESS
   ============================================================ */

export { CameraSystem };
