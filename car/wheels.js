/* ============================================================
   BMW M5 G90 — WHEELS
   File: car/wheels.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


/* ============================================================
   01 — WHEEL CONFIGURATION
   ============================================================ */

const WheelConfig = {

    frontRadius:
        0.365,

    rearRadius:
        0.365,

    frontWidth:
        0.285,

    rearWidth:
        0.305,

    frontZ:
        0.91,

    rearZ:
        -0.88,

    centerY:
        0.365,

    offsetX:
        M5_DIMENSIONS.width / 2 -
        0.055,

    rimRadius:
        0.275,

    tireThickness:
        0.105,

    spokeCount:
        10

};


/* ============================================================
   02 — CREATE WHEELS
   ============================================================ */

export function createWheels() {

    const group =
        new THREE.Group();

    group.name =
        "M5_WHEELS";


    createWheel(
        group,
        -1,
        true
    );

    createWheel(
        group,
        1,
        true
    );

    createWheel(
        group,
        -1,
        false
    );

    createWheel(
        group,
        1,
        false
    );


    return group;

}


/* ============================================================
   03 — CREATE ONE WHEEL
   ============================================================ */

function createWheel(
    group,
    side,
    front
) {

    const wheelGroup =
        new THREE.Group();


    const positionX =
        side *
        WheelConfig.offsetX;


    const positionZ =
        front
            ? WheelConfig.frontZ
            : WheelConfig.rearZ;


    const radius =
        front
            ? WheelConfig.frontRadius
            : WheelConfig.rearRadius;


    wheelGroup.position.set(
        positionX,
        WheelConfig.centerY,
        positionZ
    );


    wheelGroup.rotation.y =
        Math.PI / 2;


    wheelGroup.name =
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
        "_WHEEL";


    const tire =
        createTire(
            radius,
            front
        );


    wheelGroup.add(
        tire
    );


    const rim =
        createRim(
            radius
        );


    wheelGroup.add(
        rim
    );


    createSpokes(
        wheelGroup,
        radius
    );


    const hub =
        createHub();


    wheelGroup.add(
        hub
    );


    const centerCap =
        createCenterCap();


    wheelGroup.add(
        centerCap
    );


    group.add(
        wheelGroup
    );

}


/* ============================================================
   04 — TIRE
   ============================================================ */

function createTire(
    radius,
    front
) {

    const geometry =
        new THREE.TorusGeometry(
            radius * 0.84,
            WheelConfig.tireThickness,
            18,
            48
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x050505,

            metalness:
                0.02,

            roughness:
                0.88,

            clearcoat:
                0.15,

            clearcoatRoughness:
                0.5

        });


    const tire =
        new THREE.Mesh(
            geometry,
            material
        );


    tire.rotation.y =
        Math.PI / 2;


    tire.name =
        front
            ? "M5_PERFORMANCE_FRONT_TIRE"
            : "M5_PERFORMANCE_REAR_TIRE";


    tire.castShadow =
        true;

    tire.receiveShadow =
        true;


    return tire;

}


/* ============================================================
   05 — RIM
   ============================================================ */

function createRim(
    radius
) {

    const geometry =
        new THREE.CylinderGeometry(
            WheelConfig.rimRadius,
            WheelConfig.rimRadius,
            0.075,
            48
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x181818,

            metalness:
                0.96,

            roughness:
                0.19,

            clearcoat:
                0.9,

            clearcoatRoughness:
                0.05

        });


    const rim =
        new THREE.Mesh(
            geometry,
            material
        );


    rim.rotation.z =
        Math.PI / 2;


    rim.name =
        "M5_ALLOY_RIM";


    rim.castShadow =
        true;


    return rim;

}


/* ============================================================
   06 — SPOKES
   ============================================================ */

function createSpokes(
    wheelGroup,
    radius
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x2a2a2a,

            metalness:
                0.97,

            roughness:
                0.16,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.035

        });


    for (
        let i = 0;
        i < WheelConfig.spokeCount;
        i++
    ) {

        const angle =
            (
                i /
                WheelConfig.spokeCount
            ) *
            Math.PI *
            2;


        const geometry =
            new THREE.BoxGeometry(
                0.045,
                radius * 0.68,
                0.055,
                3,
                8,
                3
            );


        const spoke =
            new THREE.Mesh(
                geometry,
                material
            );


        spoke.position.set(
            0,
            Math.sin(angle) *
            radius *
            0.34,
            Math.cos(angle) *
            radius *
            0.34
        );


        spoke.rotation.x =
            angle;


        spoke.rotation.z =
            Math.PI / 2;


        spoke.name =
            "M5_RIM_SPOKE_" +
            String(i + 1);


        spoke.castShadow =
            true;


        wheelGroup.add(
            spoke
        );

    }

}


/* ============================================================
   07 — HUB
   ============================================================ */

function createHub() {

    const geometry =
        new THREE.CylinderGeometry(
            0.082,
            0.082,
            0.09,
            32
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x101010,

            metalness:
                0.98,

            roughness:
                0.13,

            clearcoat:
                1.0

        });


    const hub =
        new THREE.Mesh(
            geometry,
            material
        );


    hub.rotation.z =
        Math.PI / 2;


    hub.name =
        "M5_WHEEL_HUB";


    return hub;

}


/* ============================================================
   08 — CENTER CAP
   ============================================================ */

function createCenterCap() {

    const geometry =
        new THREE.CylinderGeometry(
            0.052,
            0.052,
            0.095,
            32
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xeeeeee,

            metalness:
                0.78,

            roughness:
                0.22,

            clearcoat:
                1.0

        });


    const cap =
        new THREE.Mesh(
            geometry,
            material
        );


    cap.rotation.z =
        Math.PI / 2;


    cap.name =
        "M5_WHEEL_CENTER_CAP";


    return cap;

}


/* ============================================================
   09 — WHEEL POSITION
   ============================================================ */

export function setWheelsPosition(
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
   10 — WHEEL ROTATION
   ============================================================ */

export function rotateWheels(
    group,
    angle
) {

    if (!group) {
        return;
    }


    group.traverse(
        object => {

            if (
                object.isGroup &&
                object.name.includes(
                    "_WHEEL"
                )
            ) {

                object.rotation.x =
                    angle;

            }

        }
    );

}


/* ============================================================
   11 — WHEEL COLOR
   ============================================================ */

export function setWheelColor(
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
   12 — EXPORT
   ============================================================ */

export {
    WheelConfig
};
