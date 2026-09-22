/* ============================================================
   BMW M5 G90 — CARBON FIBER MATERIAL
   File: materials/carbon.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


const CarbonConfig = {

    baseColor:
        0x050505,

    darkColor:
        0x010101,

    metalness:
        0.68,

    roughness:
        0.24,

    clearcoat:
        0.92,

    clearcoatRoughness:
        0.055

};


/* ============================================================
   CREATE CARBON MATERIAL
   ============================================================ */

export function createCarbonMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            CarbonConfig.baseColor,

        metalness:
            CarbonConfig.metalness,

        roughness:
            CarbonConfig.roughness,

        clearcoat:
            CarbonConfig.clearcoat,

        clearcoatRoughness:
            CarbonConfig.clearcoatRoughness,

        reflectivity:
            0.9

    });

}


/* ============================================================
   CREATE DARK CARBON
   ============================================================ */

export function createDarkCarbonMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            CarbonConfig.darkColor,

        metalness:
            0.78,

        roughness:
            0.20,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.04,

        reflectivity:
            1.0

    });

}


/* ============================================================
   CREATE CARBON WITH CUSTOM SETTINGS
   ============================================================ */

export function createCustomCarbonMaterial(
    color,
    roughness = 0.24,
    metalness = 0.68
) {

    return new THREE.MeshPhysicalMaterial({

        color:
            color,

        metalness:
            metalness,

        roughness:
            roughness,

        clearcoat:
            0.95,

        clearcoatRoughness:
            0.05,

        reflectivity:
            0.95

    });

}


/* ============================================================
   CREATE CARBON PANEL
   ============================================================ */

export function createCarbonPanelMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x080808,

        metalness:
            0.72,

        roughness:
            0.28,

        clearcoat:
            0.85,

        clearcoatRoughness:
            0.065

    });

}


/* ============================================================
   APPLY CARBON
   ============================================================ */

export function applyCarbon(
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
                    createCarbonMaterial();

            }

        }
    );

}


/* ============================================================
   APPLY DARK CARBON
   ============================================================ */

export function applyDarkCarbon(
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
                    createDarkCarbonMaterial();

            }

        }
    );

}


/* ============================================================
   CHANGE CARBON COLOR
   ============================================================ */

export function setCarbonColor(
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
   SET CARBON ROUGHNESS
   ============================================================ */

export function setCarbonRoughness(
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
   SET CARBON CLEARCOAT
   ============================================================ */

export function setCarbonClearcoat(
    object,
    intensity = 0.95,
    roughness = 0.05
) {

    if (!object) {
        return;
    }


    object.traverse(
        child => {

            if (
                child.isMesh &&
                child.material
            ) {

                if (
                    "clearcoat"
                    in child.material
                ) {

                    child.material.clearcoat =
                        intensity;

                }


                if (
                    "clearcoatRoughness"
                    in child.material
                ) {

                    child.material.clearcoatRoughness =
                        roughness;

                }

            }

        }
    );

}


/* ============================================================
   CARBON PRESETS
   ============================================================ */

export const CarbonPresets = {

    STANDARD:
        0x050505,

    DARK:
        0x010101,

    PANEL:
        0x080808,

    GLOSS:
        0x111111

};


/* ============================================================
   EXPORT CONFIG
   ============================================================ */

export {
    CarbonConfig
};
