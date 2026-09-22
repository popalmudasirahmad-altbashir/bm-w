/* ============================================================
   BMW M5 G90 — LIGHTING SYSTEM
   File: engine/lighting.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


/* ============================================================
   01 — LIGHTING STATE
   ============================================================ */

const LightingSystem = {

    scene: null,

    hemisphere: null,

    keyLight: null,

    fillLight: null,

    blueLight: null,

    rimLight: null,

    frontLight: null,

    initialized: false

};


/* ============================================================
   02 — INITIALIZE LIGHTING
   ============================================================ */

export function initializeLighting(
    scene
) {

    if (!scene) {

        throw new Error(
            "Lighting system requires a THREE.Scene."
        );

    }


    LightingSystem.scene =
        scene;


    createHemisphereLight();

    createKeyLight();

    createFillLight();

    createBlueLight();

    createRimLight();

    createFrontLight();


    LightingSystem.initialized =
        true;


    return LightingSystem;

}


/* ============================================================
   03 — HEMISPHERE LIGHT
   ============================================================ */

function createHemisphereLight() {

    LightingSystem.hemisphere =
        new THREE.HemisphereLight(
            0xffffff,
            0x050507,
            2.1
        );


    LightingSystem.hemisphere.position.set(
        0,
        10,
        0
    );


    LightingSystem.hemisphere.name =
        "M5_HEMISPHERE_LIGHT";


    LightingSystem.scene.add(
        LightingSystem.hemisphere
    );

}


/* ============================================================
   04 — MAIN KEY LIGHT
   ============================================================ */

function createKeyLight() {

    LightingSystem.keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3.2
        );


    LightingSystem.keyLight.position.set(
        5,
        8,
        7
    );


    LightingSystem.keyLight.castShadow =
        true;


    LightingSystem.keyLight.shadow.mapSize.width =
        2048;

    LightingSystem.keyLight.shadow.mapSize.height =
        2048;


    LightingSystem.keyLight.shadow.camera.near =
        0.1;

    LightingSystem.keyLight.shadow.camera.far =
        40;


    LightingSystem.keyLight.shadow.camera.left =
        -10;

    LightingSystem.keyLight.shadow.camera.right =
        10;

    LightingSystem.keyLight.shadow.camera.top =
        10;

    LightingSystem.keyLight.shadow.camera.bottom =
        -10;


    LightingSystem.keyLight.shadow.bias =
        -0.0001;


    LightingSystem.keyLight.name =
        "M5_KEY_LIGHT";


    LightingSystem.scene.add(
        LightingSystem.keyLight
    );

}


/* ============================================================
   05 — FRONT FILL LIGHT
   ============================================================ */

function createFillLight() {

    LightingSystem.fillLight =
        new THREE.DirectionalLight(
            0xffffff,
            1.4
        );


    LightingSystem.fillLight.position.set(
        -5,
        4,
        6
    );


    LightingSystem.fillLight.name =
        "M5_FRONT_FILL_LIGHT";


    LightingSystem.scene.add(
        LightingSystem.fillLight
    );

}


/* ============================================================
   06 — BLUE SIDE LIGHT
   ============================================================ */

function createBlueLight() {

    LightingSystem.blueLight =
        new THREE.PointLight(
            0x168cff,
            8,
            16
        );


    LightingSystem.blueLight.position.set(
        -5,
        2.5,
        3
    );


    LightingSystem.blueLight.name =
        "M5_BLUE_ACCENT_LIGHT";


    LightingSystem.scene.add(
        LightingSystem.blueLight
    );

}


/* ============================================================
   07 — REAR RIM LIGHT
   ============================================================ */

function createRimLight() {

    LightingSystem.rimLight =
        new THREE.PointLight(
            0x36a6ff,
            7,
            14
        );


    LightingSystem.rimLight.position.set(
        4,
        3.5,
        -5
    );


    LightingSystem.rimLight.name =
        "M5_RIM_LIGHT";


    LightingSystem.scene.add(
        LightingSystem.rimLight
    );

}


/* ============================================================
   08 — FRONT HIGHLIGHT
   ============================================================ */

function createFrontLight() {

    LightingSystem.frontLight =
        new THREE.SpotLight(
            0xffffff,
            2.5,
            20,
            Math.PI / 5,
            0.55,
            1
        );


    LightingSystem.frontLight.position.set(
        0,
        5,
        8
    );


    LightingSystem.frontLight.target.position.set(
        0,
        0.5,
        0
    );


    LightingSystem.frontLight.name =
        "M5_FRONT_HIGHLIGHT";


    LightingSystem.scene.add(
        LightingSystem.frontLight
    );


    LightingSystem.scene.add(
        LightingSystem.frontLight.target
    );

}


/* ============================================================
   09 — SET LIGHTING INTENSITY
   ============================================================ */

export function setLightingIntensity(
    multiplier
) {

    if (!LightingSystem.initialized) {

        return;

    }


    const value =
        Math.max(
            0,
            multiplier
        );


    LightingSystem.hemisphere.intensity =
        2.1 * value;


    LightingSystem.keyLight.intensity =
        3.2 * value;


    LightingSystem.fillLight.intensity =
        1.4 * value;


    LightingSystem.blueLight.intensity =
        8 * value;


    LightingSystem.rimLight.intensity =
        7 * value;


    LightingSystem.frontLight.intensity =
        2.5 * value;

}


/* ============================================================
   10 — ENABLE / DISABLE SHADOWS
   ============================================================ */

export function setShadowsEnabled(
    enabled
) {

    if (!LightingSystem.keyLight) {

        return;

    }


    LightingSystem.keyLight.castShadow =
        Boolean(enabled);

}


/* ============================================================
   11 — SET ACCENT LIGHT
   ============================================================ */

export function setAccentColor(
    color
) {

    if (!LightingSystem.blueLight) {

        return;

    }


    LightingSystem.blueLight.color.set(
        color
    );


    LightingSystem.rimLight.color.set(
        color
    );

}


/* ============================================================
   12 — UPDATE LIGHT POSITIONS
   ============================================================ */

export function updateLighting(
    time = 0
) {

    if (!LightingSystem.initialized) {

        return;

    }


    const movement =
        Math.sin(
            time * 0.00025
        ) * 0.35;


    LightingSystem.blueLight.position.x =
        -5 + movement;


    LightingSystem.rimLight.position.x =
        4 - movement;

}


/* ============================================================
   13 — GET LIGHTING SYSTEM
   ============================================================ */

export function getLightingSystem() {

    return LightingSystem;

}


/* ============================================================
   14 — DISPOSE LIGHTING
   ============================================================ */

export function disposeLighting() {

    if (!LightingSystem.scene) {

        return;

    }


    const lights = [

        LightingSystem.hemisphere,

        LightingSystem.keyLight,

        LightingSystem.fillLight,

        LightingSystem.blueLight,

        LightingSystem.rimLight,

        LightingSystem.frontLight

    ];


    lights.forEach(
        light => {

            if (!light) {

                return;

            }


            LightingSystem.scene.remove(
                light
            );


            if (
                light.target
            ) {

                LightingSystem.scene.remove(
                    light.target
                );

            }

        }
    );


    LightingSystem.initialized =
        false;

}


/* ============================================================
   15 — EXPORT
   ============================================================ */

export {
    LightingSystem
};
