/* ============================================================
   BMW M5 G90 — TAILLIGHTS
   File: car/taillights.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


const TaillightConfig = {

    width:
        0.78,

    height:
        0.20,

    depth:
        0.065,

    centerY:
        0.92,

    centerZ:
        -1.83,

    sideOffset:
        0.52

};


/* ============================================================
   CREATE TAILLIGHTS
   ============================================================ */

export function createTaillights() {

    const group =
        new THREE.Group();

    group.name =
        "M5_TAILLIGHTS";


    createTaillight(
        group,
        -1
    );


    createTaillight(
        group,
        1
    );


    createCenterBrakeStrip(
        group
    );


    return group;

}


/* ============================================================
   CREATE ONE TAILLIGHT
   ============================================================ */

function createTaillight(
    group,
    side
) {

    const lightGroup =
        new THREE.Group();


    lightGroup.name =
        side < 0
            ? "M5_LEFT_TAILLIGHT"
            : "M5_RIGHT_TAILLIGHT";


    const housing =
        createHousing();


    lightGroup.add(
        housing
    );


    const lens =
        createLens();


    lightGroup.add(
        lens
    );


    createLEDStrips(
        lightGroup,
        side
    );


    createTurnSignal(
        lightGroup,
        side
    );


    lightGroup.position.set(
        side *
        TaillightConfig.sideOffset,
        TaillightConfig.centerY,
        TaillightConfig.centerZ
    );


    lightGroup.rotation.y =
        side *
        -0.07;


    group.add(
        lightGroup
    );

}


/* ============================================================
   HOUSING
   ============================================================ */

function createHousing() {

    const geometry =
        new THREE.BoxGeometry(
            TaillightConfig.width,
            TaillightConfig.height,
            TaillightConfig.depth,
            12,
            8,
            4
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x050505,

            metalness:
                0.72,

            roughness:
                0.2,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.04

        });


    const housing =
        new THREE.Mesh(
            geometry,
            material
        );


    housing.scale.x =
        0.88;


    housing.name =
        "M5_TAILLIGHT_HOUSING";


    housing.castShadow =
        true;


    return housing;

}


/* ============================================================
   RED LENS
   ============================================================ */

function createLens() {

    const geometry =
        new THREE.BoxGeometry(
            TaillightConfig.width *
            0.92,

            TaillightConfig.height *
            0.78,

            0.024,

            12,
            8,
            3
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x650000,

            metalness:
                0.18,

            roughness:
                0.075,

            transmission:
                0.04,

            transparent:
                true,

            opacity:
                0.9,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.025

        });


    const lens =
        new THREE.Mesh(
            geometry,
            material
        );


    lens.position.z =
        0.045;


    lens.name =
        "M5_TAILLIGHT_RED_LENS";


    return lens;

}


/* ============================================================
   LED LIGHT STRIPS
   ============================================================ */

function createLEDStrips(
    group,
    side
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xff1717,

            emissive:
                0xff0000,

            emissiveIntensity:
                2.2,

            metalness:
                0.05,

            roughness:
                0.12

        });


    const positions = [
        -0.055,
        0.0,
        0.055
    ];


    positions.forEach(
        (y, index) => {

            const geometry =
                new THREE.BoxGeometry(
                    0.58,
                    0.025,
                    0.018,
                    6,
                    3,
                    2
                );


            const strip =
                new THREE.Mesh(
                    geometry,
                    material
                );


            strip.position.set(
                0,
                y,
                0.064
            );


            strip.rotation.z =
                (
                    index -
                    1
                ) *
                0.035;


            strip.name =
                "M5_" +
                (
                    side < 0
                        ? "LEFT"
                        : "RIGHT"
                ) +
                "_TAIL_LED_" +
                (
                    index + 1
                );


            group.add(
                strip
            );

        }
    );

}


/* ============================================================
   TURN SIGNAL
   ============================================================ */

function createTurnSignal(
    group,
    side
) {

    const geometry =
        new THREE.BoxGeometry(
            0.17,
            0.035,
            0.02,
            5,
            3,
            2
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xff8a00,

            emissive:
                0xff4400,

            emissiveIntensity:
                1.5,

            metalness:
                0.05,

            roughness:
                0.14

        });


    const signal =
        new THREE.Mesh(
            geometry,
            material
        );


    signal.position.set(
        side *
        0.24,
        -0.035,
        0.069
    );


    signal.name =
        side < 0
            ? "M5_LEFT_REAR_TURN_SIGNAL"
            : "M5_RIGHT_REAR_TURN_SIGNAL";


    group.add(
        signal
    );

}


/* ============================================================
   CENTER BRAKE STRIP
   ============================================================ */

function createCenterBrakeStrip(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            0.72,
            0.028,
            0.025,
            12,
            3,
            2
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xb00000,

            emissive:
                0xff0000,

            emissiveIntensity:
                1.8,

            metalness:
                0.05,

            roughness:
                0.12

        });


    const strip =
        new THREE.Mesh(
            geometry,
            material
        );


    strip.position.set(
        0,
        1.19,
        -1.91
    );


    strip.name =
        "M5_CENTER_HIGH_MOUNT_BRAKE_LIGHT";


    group.add(
        strip
    );

}


/* ============================================================
   LIGHT INTENSITY
   ============================================================ */

export function setTaillightIntensity(
    group,
    intensity
) {

    if (!group) {
        return;
    }


    group.traverse(
        object => {

            if (
                object.isMesh &&
                object.material &&
                object.material.emissive
            ) {

                object.material.emissiveIntensity =
                    intensity;

            }

        }
    );

}


/* ============================================================
   POSITION
   ============================================================ */

export function setTaillightsPosition(
    group,
    x,
    y,
    z
) {

    if (!group) {
        return;
    }


    group.position.set(
        x,
        y,
        z
    );

}


/* ============================================================
   COLOR
   ============================================================ */

export function setTaillightColor(
    group,
    color
) {

    if (!group) {
        return;
    }


    group.traverse(
        object => {

            if (
                object.isMesh &&
                object.material &&
                object.material.color
            ) {

                object.material.color.set(
                    color
                );

            }

        }
    );

}


/* ============================================================
   EXPORT
   ============================================================ */

export {
    TaillightConfig
};
