/* ============================================================
   BMW M5 G90 — GLASS MATERIAL
   File: materials/glass.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


const GlassConfig = {

    color:
        0x071016,

    transmission:
        0.28,

    opacity:
        0.72,

    metalness:
        0.18,

    roughness:
        0.08,

    ior:
        1.46,

    thickness:
        0.035,

    clearcoat:
        1.0

};


/* ============================================================
   CREATE MAIN GLASS
   ============================================================ */

export function createGlassMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            GlassConfig.color,

        metalness:
            GlassConfig.metalness,

        roughness:
            GlassConfig.roughness,

        transmission:
            GlassConfig.transmission,

        transparent:
            true,

        opacity:
            GlassConfig.opacity,

        ior:
            GlassConfig.ior,

        thickness:
            GlassConfig.thickness,

        clearcoat:
            GlassConfig.clearcoat,

        clearcoatRoughness:
            0.035,

        depthWrite:
            false

    });

}


/* ============================================================
   CREATE DARK GLASS
   ============================================================ */

export function createDarkGlassMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x020609,

        metalness:
            0.28,

        roughness:
            0.075,

        transmission:
            0.16,

        transparent:
            true,

        opacity:
            0.84,

        ior:
            1.46,

        thickness:
            0.045,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.025,

        depthWrite:
            false

    });

}


/* ============================================================
   CREATE WINDSHIELD GLASS
   ============================================================ */

export function createWindshieldGlass() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x08131a,

        metalness:
            0.14,

        roughness:
            0.065,

        transmission:
            0.42,

        transparent:
            true,

        opacity:
            0.68,

        ior:
            1.48,

        thickness:
            0.055,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.025,

        depthWrite:
            false

    });

}


/* ============================================================
   CREATE SIDE WINDOW GLASS
   ============================================================ */

export function createSideWindowGlass() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x050c11,

        metalness:
            0.20,

        roughness:
            0.075,

        transmission:
            0.22,

        transparent:
            true,

        opacity:
            0.79,

        ior:
            1.46,

        thickness:
            0.04,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.03,

        depthWrite:
            false

    });

}


/* ============================================================
   CREATE GLASS WITH CUSTOM SETTINGS
   ============================================================ */

export function createCustomGlassMaterial(
    color,
    opacity = 0.72,
    roughness = 0.08,
    transmission = 0.28
) {

    return new THREE.MeshPhysicalMaterial({

        color:
            color,

        metalness:
            0.18,

        roughness:
            roughness,

        transmission:
            transmission,

        transparent:
            true,

        opacity:
            opacity,

        ior:
            1.46,

        thickness:
            0.04,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.035,

        depthWrite:
            false

    });

}


/* ============================================================
   APPLY GLASS TO OBJECT
   ============================================================ */

export function applyGlass(
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
                    createGlassMaterial();

                child.renderOrder =
                    2;

            }

        }
    );

}


/* ============================================================
   APPLY DARK GLASS
   ============================================================ */

export function applyDarkGlass(
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
                    createDarkGlassMaterial();

                child.renderOrder =
                    2;

            }

        }
    );

}


/* ============================================================
   SET GLASS COLOR
   ============================================================ */

export function setGlassColor(
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
   SET GLASS OPACITY
   ============================================================ */

export function setGlassOpacity(
    object,
    opacity
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

                child.material.transparent =
                    true;

                child.material.opacity =
                    opacity;

            }

        }
    );

}


/* ============================================================
   SET GLASS TRANSMISSION
   ============================================================ */

export function setGlassTransmission(
    object,
    transmission
) {

    if (!object) {
        return;
    }


    object.traverse(
        child => {

            if (
                child.isMesh &&
                child.material &&
                "transmission"
                in child.material
            ) {

                child.material.transmission =
                    transmission;

            }

        }
    );

}


/* ============================================================
   GLASS PRESETS
   ============================================================ */

export const GlassPresets = {

    STANDARD:
        0x071016,

    DARK:
        0x020609,

    WINDSHIELD:
        0x08131a,

    SIDE_WINDOW:
        0x050c11,

    BLUE_BLACK:
        0x030b12

};


/* ============================================================
   EXPORT CONFIG
   ============================================================ */

export {
    GlassConfig
};
