/* ============================================================
   BMW M5 G90 — PAINT MATERIAL
   File: materials/paint.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


const PaintConfig = {

    black:
        0x050505,

    deepBlack:
        0x010101,

    metalness:
        0.94,

    roughness:
        0.12,

    clearcoat:
        1.0,

    clearcoatRoughness:
        0.035,

    reflectivity:
        1.0

};


/* ============================================================
   CREATE MAIN PAINT
   ============================================================ */

export function createPaintMaterial(
    color = PaintConfig.black
) {

    return new THREE.MeshPhysicalMaterial({

        color:
            color,

        metalness:
            PaintConfig.metalness,

        roughness:
            PaintConfig.roughness,

        clearcoat:
            PaintConfig.clearcoat,

        clearcoatRoughness:
            PaintConfig.clearcoatRoughness,

        reflectivity:
            PaintConfig.reflectivity

    });

}


/* ============================================================
   CREATE DARK PAINT
   ============================================================ */

export function createDarkPaintMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            PaintConfig.deepBlack,

        metalness:
            0.96,

        roughness:
            0.10,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.025,

        reflectivity:
            1.0

    });

}


/* ============================================================
   CREATE PAINT WITH CUSTOM SETTINGS
   ============================================================ */

export function createCustomPaintMaterial(
    color,
    metalness = 0.94,
    roughness = 0.12,
    clearcoat = 1.0
) {

    return new THREE.MeshPhysicalMaterial({

        color:
            color,

        metalness:
            metalness,

        roughness:
            roughness,

        clearcoat:
            clearcoat,

        clearcoatRoughness:
            0.04,

        reflectivity:
            1.0

    });

}


/* ============================================================
   APPLY PAINT TO OBJECT
   ============================================================ */

export function applyPaint(
    object,
    color = PaintConfig.black
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
                    createPaintMaterial(
                        color
                    );

            }

        }
    );

}


/* ============================================================
   CHANGE PAINT COLOR
   ============================================================ */

export function setPaintColor(
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
   SET PAINT REFLECTION
   ============================================================ */

export function setPaintReflection(
    object,
    metalness = 0.94,
    roughness = 0.12
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
                    "metalness"
                    in child.material
                ) {

                    child.material.metalness =
                        metalness;

                }


                if (
                    "roughness"
                    in child.material
                ) {

                    child.material.roughness =
                        roughness;

                }

            }

        }
    );

}


/* ============================================================
   SET CLEARCOAT
   ============================================================ */

export function setPaintClearcoat(
    object,
    intensity = 1.0,
    roughness = 0.04
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
   PAINT PRESETS
   ============================================================ */

export const PaintPresets = {

    BMW_BLACK:
        0x050505,

    DEEP_BLACK:
        0x010101,

    GRAPHITE:
        0x17191b,

    DARK_GREY:
        0x26282a,

    METALLIC_GREY:
        0x46484a,

    WHITE:
        0xe7e7e7,

    RED:
        0x5d0808,

    BLUE:
        0x071a35

};


/* ============================================================
   EXPORT CONFIG
   ============================================================ */

export {
    PaintConfig
};
