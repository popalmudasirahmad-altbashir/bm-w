/* ============================================================
   BMW M5 G90 — BRAKES
   File: car/brakes.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


/* ============================================================
   01 — BRAKE CONFIGURATION
   ============================================================ */

const BrakeConfig = {

    frontRadius:
        0.255,

    rearRadius:
        0.235,

    frontThickness:
        0.035,

    rearThickness:
        0.032,

    offsetX:
        M5_DIMENSIONS.width / 2 -
        0.055,

    frontZ:
        0.91,

    rearZ:
        -0.88,

    centerY:
        0.365,

    caliperWidth:
        0.075,

    caliperHeight:
        0.19,

    caliperDepth:
        0.075

};


/* ============================================================
   02 — CREATE BRAKES
   ============================================================ */

export function createBrakes() {

    const group =
        new THREE.Group();

    group.name =
        "M5_BRAKES";


    createBrakeSet(
        group,
        -1,
        true
    );

    createBrakeSet(
        group,
        1,
        true
    );

    createBrakeSet(
        group,
        -1,
        false
    );

    createBrakeSet(
        group,
        1,
        false
    );


    return group;

}


/* ============================================================
   03 — CREATE BRAKE SET
   ============================================================ */

function createBrakeSet(
    group,
    side,
    front
) {

    const brakeGroup =
        new THREE.Group();


    const z =
        front
            ? BrakeConfig.frontZ
            : BrakeConfig.rearZ;


    const radius =
        front
            ? BrakeConfig.frontRadius
            : BrakeConfig.rearRadius;


    brakeGroup.position.set(
        side *
        BrakeConfig.offsetX,
        BrakeConfig.centerY,
        z
    );


    brakeGroup.rotation.y =
        Math.PI / 2;


    brakeGroup.name =
        "M5_" +
        (
            side < 0
                ? "LEFT_"
                : "RIGHT_"
        ) +
        (
            front
                ? "FRONT"
                : "REAR"
        ) +
        "_BRAKE";


    const rotor =
        createRotor(
            radius,
            front
        );


    brakeGroup.add(
        rotor
    );


    const caliper =
        createCaliper(
            front
        );


    brakeGroup.add(
        caliper
    );


    createCaliperDetails(
        brakeGroup,
        front
    );


    group.add(
        brakeGroup
    );

}


/* ============================================================
   04 — BRAKE ROTOR
   ============================================================ */

function createRotor(
    radius,
    front
) {

    const geometry =
        new THREE.CylinderGeometry(
            radius,
            radius,
            front
                ? BrakeConfig.frontThickness
                : BrakeConfig.rearThickness,
            48
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x5b5b5b,

            metalness:
                0.96,

            roughness:
                0.34,

            clearcoat:
                0.35

        });


    const rotor =
        new THREE.Mesh(
            geometry,
            material
        );


    rotor.rotation.z =
        Math.PI / 2;


    rotor.name =
        front
            ? "M5_FRONT_BRAKE_ROTOR"
            : "M5_REAR_BRAKE_ROTOR";


    rotor.castShadow =
        true;


    return rotor;

}


/* ============================================================
   05 — CROSS-DRILLED ROTOR DETAILS
   ============================================================ */

function createCaliperDetails(
    group,
    front
) {

    const radius =
        front
            ? BrakeConfig.frontRadius
            : BrakeConfig.rearRadius;


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0x252525,

            metalness:
                0.85,

            roughness:
                0.38

        });


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const angle =
            (
                i /
                18
            ) *
            Math.PI *
            2;


        const holeGeometry =
            new THREE.CylinderGeometry(
                0.008,
                0.008,
                0.01,
                8
            );


        const hole =
            new THREE.Mesh(
                holeGeometry,
                material
            );


        hole.position.set(
            0,
            Math.sin(angle) *
            radius *
            0.72,
            Math.cos(angle) *
            radius *
            0.72
        );


        hole.rotation.z =
            Math.PI / 2;


        hole.name =
            "M5_BRAKE_ROTOR_DETAIL";


        group.add(
            hole
        );

    }

}


/* ============================================================
   06 — BRAKE CALIPER
   ============================================================ */

function createCaliper(
    front
) {

    const geometry =
        new THREE.BoxGeometry(
            BrakeConfig.caliperDepth,
            BrakeConfig.caliperHeight,
            BrakeConfig.caliperWidth,
            6,
            6,
            4
        );


    const position =
        geometry.attributes.position;


    for (
        let i = 0;
        i < position.count;
        i++
    ) {

        const x =
            position.getX(i);

        const y =
            position.getY(i);


        position.setY(
            i,
            y +
            Math.sign(y) *
            Math.abs(x) *
            0.18
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xd00000,

            metalness:
                0.68,

            roughness:
                0.22,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.045

        });


    const caliper =
        new THREE.Mesh(
            geometry,
            material
        );


    caliper.position.set(
        0,
        front
            ? 0.055
            : 0.045,
        0.15
    );


    caliper.rotation.x =
        -0.18;


    caliper.name =
        front
            ? "M5_FRONT_RED_CALIPER"
            : "M5_REAR_RED_CALIPER";


    caliper.castShadow =
        true;


    return caliper;

}


/* ============================================================
   07 — BRAKE POSITION
   ============================================================ */

export function setBrakesPosition(
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
   08 — CALIPER COLOR
   ============================================================ */

export function setCaliperColor(
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
                object.material.color &&
                object.name.includes(
                    "CALIPER"
                )
            ) {

                object.material.color.set(
                    color
                );

            }

        }
    );

}


/* ============================================================
   09 — EXPORT
   ============================================================ */

export {
    BrakeConfig
};
