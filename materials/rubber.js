/* ============================================================
   BMW M5 G90 — RUBBER MATERIAL
   File: materials/rubber.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


const RubberConfig = {

    tire:
        0x050505,

    trim:
        0x080808,

    metalness:
        0.04,

    roughness:
        0.78,

    clearcoat:
        0.12,

    clearcoatRoughness:
        0.32

};


/* ============================================================
   CREATE TIRE RUBBER
   ============================================================ */

export function createRubberMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            RubberConfig.tire,

        metalness:
            RubberConfig.metalness,

        roughness:
            RubberConfig.roughness,

        clearcoat:
            RubberConfig.clearcoat,

        clearcoatRoughness:
            RubberConfig.clearcoatRoughness

    });

}


/* ============================================================
   CREATE SIDEWALL RUBBER
   ============================================================ */

export function createSidewallMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x030303,

        metalness:
            0.02,

        roughness:
            0.86,

        clearcoat:
            0.06,

        clearcoatRoughness:
            0.42

    });

}


/* ============================================================
   CREATE SOFT RUBBER
   ============================================================ */

export function createSoftRubberMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x020202,

        metalness:
            0.01,

        roughness:
            0.92,

        clearcoat:
            0.025,

        clearcoatRoughness:
            0.5

    });

}


/* ============================================================
   CREATE RUBBER TRIM
   ============================================================ */

export function createRubberTrimMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            RubberConfig.trim,

        metalness:
            0.08,

        roughness:
            0.67,

        clearcoat:
            0.18,

        clearcoatRoughness:
            0.28

    });

}


/* ============================================================
   CREATE CUSTOM RUBBER
   ============================================================ */

export function createCustomRubberMaterial(
    color,
    roughness = 0.78,
    metalness = 0.04
) {

    return new THREE.MeshPhysicalMaterial({

        color:
            color,

        metalness:
            metalness,

        roughness:
            roughness,

        clearcoat:
            0.10,

        clearcoatRoughness:
            0.35

    });

}


/* ============================================================
   APPLY RUBBER TO OBJECT
   ============================================================ */

export function applyRubber(
    object
) {

    if (!object) {
        return;
    }


    object.traverse(
        child => {

            if (
                child.isMesh
            ) {

                child.material =
                    createRubberMaterial();

            }

        }
    );

}


/* ============================================================
   APPLY SIDEWALL MATERIAL
   ============================================================ */

export function applySidewallRubber(
    object
) {

    if (!object) {
        return;
    }


    object.traverse(
        child => {

            if (
                child.isMesh
            ) {

                child.material =
                    createSidewallMaterial();

            }

        }
    );

}


/* ============================================================
   CHANGE RUBBER COLOR
   ============================================================ */

export function setRubberColor(
    object,
    color
) {

    if (!object) {
        return;
    }


    object.traverse(
        child => {

            if (
                child.isMesh &&
                child.material &&
                child.material.color
            ) {

                child.material.color.set(
                    color
                );

            }

        }
    );

}


/* ============================================================
   SET RUBBER ROUGHNESS
   ============================================================ */

export function setRubberRoughness(
    object,
    roughness
) {

    if (!object) {
        return;
    }


    object.traverse(
        child => {

            if (
                child.isMesh &&
                child.material &&
                "roughness"
                in child.material
            ) {

                child.material.roughness =
                    roughness;

            }

        }
    );

}


/* ============================================================
   RUBBER PRESETS
   ============================================================ */

export const RubberPresets = {

    TIRE:
        0x050505,

    SIDEWALL:
        0x030303,

    SOFT:
        0x020202,

    TRIM:
        0x080808,

    DEEP_BLACK:
        0x000000

};


/* ============================================================
   EXPORT CONFIG
   ============================================================ */

export {
    RubberConfig
};
