/* ============================================================
   BMW M5 G90 — HEADLIGHTS
   File: car/headlights.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


const HeadlightConfig = {

    width:
        0.43,

    height:
        0.18,

    depth:
        0.075,

    centerY:
        1.05,

    centerZ:
        1.76,

    sideOffset:
        0.64

};


/* ============================================================
   CREATE HEADLIGHTS
   ============================================================ */

export function createHeadlights() {

    const group =
        new THREE.Group();

    group.name =
        "M5_HEADLIGHTS";


    createHeadlight(
        group,
        -1
    );


    createHeadlight(
        group,
        1
    );


    return group;

}


/* ============================================================
   CREATE ONE HEADLIGHT
   ============================================================ */

function createHeadlight(
    group,
    side
) {

    const headlight =
        new THREE.Group();


    headlight.name =
        side < 0
            ? "M5_LEFT_HEADLIGHT"
            : "M5_RIGHT_HEADLIGHT";


    const housing =
        createHousing();


    headlight.add(
        housing
    );


    const lens =
        createLens();


    headlight.add(
        lens
    );


    createLEDModules(
        headlight,
        side
    );


    createDaylightStrip(
        headlight,
        side
    );


    headlight.position.set(
        side *
        HeadlightConfig.sideOffset,
        HeadlightConfig.centerY,
        HeadlightConfig.centerZ
    );


    headlight.rotation.y =
        side *
        0.08;


    group.add(
        headlight
    );

}


/* ============================================================
   HOUSING
   ============================================================ */

function createHousing() {

    const geometry =
        new THREE.BoxGeometry(
            HeadlightConfig.width,
            HeadlightConfig.height,
            HeadlightConfig.depth,
            12,
            8,
            5
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x020202,

            metalness:
                0.82,

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


    housing.scale.z =
        0.72;


    housing.name =
        "M5_HEADLIGHT_HOUSING";


    housing.castShadow =
        true;


    return housing;

}


/* ============================================================
   GLASS LENS
   ============================================================ */

function createLens() {

    const geometry =
        new THREE.BoxGeometry(
            HeadlightConfig.width *
            0.91,

            HeadlightConfig.height *
            0.82,

            0.025,

            12,
            8,
            3
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xbfdcff,

            metalness:
                0.08,

            roughness:
                0.035,

            transmission:
                0.12,

            transparent:
                true,

            opacity:
                0.74,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.015,

            side:
                THREE.DoubleSide

        });


    const lens =
        new THREE.Mesh(
            geometry,
            material
        );


    lens.position.z =
        0.055;


    lens.name =
        "M5_HEADLIGHT_LENS";


    return lens;

}


/* ============================================================
   LED MODULES
   ============================================================ */

function createLEDModules(
    group,
    side
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xf4fbff,

            emissive:
                0x9fdcff,

            emissiveIntensity:
                2.4,

            metalness:
                0.08,

            roughness:
                0.1,

            transparent:
                true,

            opacity:
                0.96

        });


    const positions = [
        -0.13,
        0,
        0.13
    ];


    positions.forEach(
        (x, index) => {

            const geometry =
                new THREE.BoxGeometry(
                    0.065,
                    0.045,
                    0.018,
                    4,
                    4,
                    2
                );


            const led =
                new THREE.Mesh(
                    geometry,
                    material
                );


            led.position.set(
                x,
                0.0,
                0.073
            );


            led.name =
                "M5_" +
                (
                    side < 0
                        ? "LEFT"
                        : "RIGHT"
                ) +
                "_LED_MODULE_" +
                (
                    index + 1
                );


            group.add(
                led
            );

        }
    );

}


/* ============================================================
   DAYTIME RUNNING LIGHT
   ============================================================ */

function createDaylightStrip(
    group,
    side
) {

    const curvePoints = [

        new THREE.Vector3(
            -0.18,
            -0.055,
            0.082
        ),

        new THREE.Vector3(
            -0.06,
            -0.075,
            0.084
        ),

        new THREE.Vector3(
            0.07,
            -0.065,
            0.084
        ),

        new THREE.Vector3(
            0.18,
            -0.035,
            0.082
        )

    ];


    const curve =
        new THREE.CatmullRomCurve3(
            curvePoints
        );


    const geometry =
        new THREE.TubeGeometry(
            curve,
            20,
            0.012,
            6,
            false
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xffffff,

            emissive:
                0xd8f3ff,

            emissiveIntensity:
                2.8,

            metalness:
                0.05,

            roughness:
                0.08

        });


    const strip =
        new THREE.Mesh(
            geometry,
            material
        );


    strip.name =
        side < 0
            ? "M5_LEFT_DAYTIME_RUNNING_LIGHT"
            : "M5_RIGHT_DAYTIME_RUNNING_LIGHT";


    group.add(
        strip
    );

}


/* ============================================================
   LIGHT EMITTERS
   ============================================================ */

export function enableHeadlightGlow(
    group,
    enabled = true
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
                    enabled
                        ? 3.0
                        : 0.45;

            }

        }
    );

}


/* ============================================================
   POSITION
   ============================================================ */

export function setHeadlightsPosition(
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

export function setHeadlightColor(
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
    HeadlightConfig
};
