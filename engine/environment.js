/* ============================================================
   BMW M5 G90 — ENVIRONMENT SYSTEM
   File: engine/environment.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


/* ============================================================
   ENVIRONMENT STATE
   ============================================================ */

const Environment = {

    scene: null,

    floor: null,

    grid: null,

    platform: null,

    initialized: false

};


/* ============================================================
   INITIALIZE
   ============================================================ */

export function initializeEnvironment(
    scene
) {

    Environment.scene =
        scene;

    createFloor();

    createGrid();

    createPlatform();

    Environment.initialized =
        true;

}


/* ============================================================
   FLOOR
   ============================================================ */

function createFloor() {

    const geometry =
        new THREE.CircleGeometry(
            14,
            128
        );

    const material =
        new THREE.MeshStandardMaterial({

            color:
                0x090909,

            metalness:
                0.4,

            roughness:
                0.25

        });

    Environment.floor =
        new THREE.Mesh(
            geometry,
            material
        );

    Environment.floor.rotation.x =
        -Math.PI / 2;

    Environment.floor.receiveShadow =
        true;

    Environment.floor.position.y =
        -0.02;

    Environment.floor.name =
        "SHOWROOM_FLOOR";

    Environment.scene.add(
        Environment.floor
    );

}


/* ============================================================
   GRID
   ============================================================ */

function createGrid() {

    Environment.grid =
        new THREE.GridHelper(
            24,
            48,
            0x168cff,
            0x222222
        );

    Environment.grid.position.y =
        0.01;

    Environment.grid.material.opacity =
        0.28;

    Environment.grid.material.transparent =
        true;

    Environment.grid.name =
        "SHOWROOM_GRID";

    Environment.scene.add(
        Environment.grid
    );

}


/* ============================================================
   PLATFORM
   ============================================================ */

function createPlatform() {

    const geometry =
        new THREE.CylinderGeometry(
            3.6,
            3.9,
            0.12,
            96
        );

    const material =
        new THREE.MeshStandardMaterial({

            color:
                0x111111,

            metalness:
                0.65,

            roughness:
                0.18

        });

    Environment.platform =
        new THREE.Mesh(
            geometry,
            material
        );

    Environment.platform.position.y =
        0.05;

    Environment.platform.receiveShadow =
        true;

    Environment.platform.name =
        "BMW_PLATFORM";

    Environment.scene.add(
        Environment.platform
    );

}


/* ============================================================
   UPDATE
   ============================================================ */

export function updateEnvironment(
    time
) {

    if (
        !Environment.initialized
    ) {

        return;

    }

    if (
        Environment.platform
    ) {

        Environment.platform.rotation.y =
            time * 0.00008;

    }

}


/* ============================================================
   GRID VISIBILITY
   ============================================================ */

export function setGridVisible(
    visible
) {

    if (
        Environment.grid
    ) {

        Environment.grid.visible =
            visible;

    }

}


/* ============================================================
   FLOOR COLOR
   ============================================================ */

export function setFloorColor(
    color
) {

    if (
        Environment.floor
    ) {

        Environment.floor.material.color.set(
            color
        );

    }

}


/* ============================================================
   DISPOSE
   ============================================================ */

export function disposeEnvironment() {

    const items = [

        Environment.floor,
        Environment.grid,
        Environment.platform

    ];

    items.forEach(
        item => {

            if (
                item &&
                Environment.scene
            ) {

                Environment.scene.remove(
                    item
                );

            }

        }
    );

}


/* ============================================================
   EXPORT
   ============================================================ */

export {
    Environment
};
