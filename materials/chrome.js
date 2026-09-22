/* ============================================================
   BMW M5 G90 — CHROME MATERIAL
   File: materials/chrome.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


const ChromeConfig = {

    bright:
        0xd8d8d8,

    silver:
        0x9c9c9c,

    dark:
        0x343434,

    metalness:
        1.0,

    roughness:
        0.11,

    clearcoat:
        1.0

};


/* ============================================================
   CREATE BRIGHT CHROME
   ============================================================ */

export function createChromeMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            ChromeConfig.bright,

        metalness:
            ChromeConfig.metalness,

        roughness:
            ChromeConfig.roughness,

        clearcoat:
            ChromeConfig.clearcoat,

        clearcoatRoughness:
            0.035,

        reflectivity:
            1.0

    });

}


/* ============================================================
   CREATE SILVER METAL
   ============================================================ */

export function createSilverMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            ChromeConfig.silver,

        metalness:
            1.0,

        roughness:
            0.17,

        clearcoat:
            0.8,

        clearcoatRoughness:
            0.06

    });

}


/* ============================================================
   CREATE DARK CHROME
   ============================================================ */

export function createDarkChromeMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            ChromeConfig.dark,

        metalness:
            1.0,

        roughness:
            0.20,

        clearcoat:
            0.9,

        clearcoatRoughness:
            0.05

    });

}


/* ============================================================
   CREATE CUSTOM CHROME
   ============================================================ */

export function createCustomChromeMaterial(
    color,
    roughness = 0.11
) {

    return new THREE.MeshPhysicalMaterial({

        color:
            color,

        metalness:
            1.0,

        roughness:
            roughness,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.04,

        reflectivity:
            1.0

    });

}


/* ============================================================
   APPLY CHROME
   ============================================================ */

export function applyChrome(
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
                    createChromeMaterial();

            }

        }
    );

}


/* ============================================================
   APPLY DARK CHROME
   ============================================================ */

export function applyDarkChrome(
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
                    createDarkChromeMaterial();

            }

        }
    );

}


/* ============================================================
   CHANGE CHROME COLOR
   ============================================================ */

export function setChromeColor(
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
   SET CHROME ROUGHNESS
   ============================================================ */

export function setChromeRoughness(
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
   CHROME PRESETS
   ============================================================ */

export const ChromePresets = {

    BRIGHT:
        0xd8d8d8,

    SILVER:
        0x9c9c9c,

    DARK:
        0x343434,

    BLACK_CHROME:
        0x111111

};


/* ============================================================
   EXPORT CONFIG
   ============================================================ */

export {
    ChromeConfig
};
