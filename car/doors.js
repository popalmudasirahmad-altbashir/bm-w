/* ============================================================
   BMW M5 G90 — DOORS
   File: car/doors.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS,
    M5_HEIGHTS
} from "./dimensions.js";


/* ============================================================
   01 — DOOR CONFIGURATION
   ============================================================ */

const DoorConfig = {

    bodyWidth:
        M5_DIMENSIONS.width,

    wheelbase:
        M5_DIMENSIONS.wheelbase,

    doorHeight:
        0.72,

    doorLength:
        1.16,

    bottom:
        0.51,

    top:
        1.23

};


/* ============================================================
   02 — CREATE ALL DOORS
   ============================================================ */

export function createDoors() {

    const group =
        new THREE.Group();


    group.name =
        "M5_DOORS";


    createDoor(
        group,
        "FRONT_LEFT",
        -1,
        0.76
    );


    createDoor(
        group,
        "FRONT_RIGHT",
        1,
        0.76
    );


    createDoor(
        group,
        "REAR_LEFT",
        -1,
        -0.68
    );


    createDoor(
        group,
        "REAR_RIGHT",
        1,
        -0.68
    );


    return group;

}


/* ============================================================
   03 — CREATE INDIVIDUAL DOOR
   ============================================================ */

function createDoor(
    group,
    name,
    side,
    zPosition
) {

    const geometry =
        createDoorGeometry();


    const material =
        createDoorMaterial();


    const door =
        new THREE.Mesh(
            geometry,
            material
        );


    door.position.set(
        side *
        (DoorConfig.bodyWidth / 2 -
        0.018),
        DoorConfig.bottom +
        DoorConfig.doorHeight / 2,
        zPosition
    );


    door.rotation.y =
        side *
        0.012;


    door.castShadow =
        true;

    door.receiveShadow =
        true;


    door.name =
        `M5_DOOR_${name}`;


    group.add(
        door
    );


    createDoorSeam(
        group,
        side,
        zPosition,
        name
    );


    createDoorHandle(
        group,
        side,
        zPosition,
        name
    );

}


/* ============================================================
   04 — DOOR GEOMETRY
   ============================================================ */

function createDoorGeometry() {

    const geometry =
        new THREE.BoxGeometry(
            0.035,
            DoorConfig.doorHeight,
            DoorConfig.doorLength,
            8,
            12,
            16
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

        const z =
            position.getZ(i);


        const normalizedY =
            (
                y +
                DoorConfig.doorHeight / 2
            ) /
            DoorConfig.doorHeight;


        const normalizedZ =
            Math.abs(z) /
            (DoorConfig.doorLength / 2);


        let newY =
            y;

        let newZ =
            z;


        if (
            normalizedY > 0.72
        ) {

            newY -=
                Math.pow(
                    normalizedY - 0.72,
                    2
                ) * 0.08;

        }


        newZ *=
            1 -
            Math.pow(
                normalizedZ,
                4
            ) * 0.025;


        position.setXYZ(
            i,
            x,
            newY,
            newZ
        );

    }


    position.needsUpdate =
        true;


    geometry.computeVertexNormals();


    return geometry;

}


/* ============================================================
   05 — DOOR MATERIAL
   ============================================================ */

function createDoorMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x050505,

        metalness:
            0.91,

        roughness:
            0.17,

        clearcoat:
            0.95,

        clearcoatRoughness:
            0.07

    });

}


/* ============================================================
   06 — DOOR SEAMS
   ============================================================ */

function createDoorSeam(
    group,
    side,
    zPosition,
    name
) {

    const curve =
        new THREE.LineCurve3(
            new THREE.Vector3(
                0,
                -DoorConfig.doorHeight / 2,
                -DoorConfig.doorLength / 2
            ),
            new THREE.Vector3(
                0,
                DoorConfig.doorHeight / 2,
                -DoorConfig.doorLength / 2
            )
        );


    const points =
        curve.getPoints(
            12
        );


    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(
                points
            );


    const material =
        new THREE.LineBasicMaterial({

            color:
                0x1a1a1a,

            transparent:
                true,

            opacity:
                0.9

        });


    const seam =
        new THREE.Line(
            geometry,
            material
        );


    seam.position.set(
        side *
        (DoorConfig.bodyWidth / 2 +
        0.002),
        DoorConfig.bottom +
        DoorConfig.doorHeight / 2,
        zPosition -
        DoorConfig.doorLength / 2
    );


    seam.name =
        `M5_DOOR_SEAM_${name}`;


    group.add(
        seam
    );

}


/* ============================================================
   07 — DOOR HANDLES
   ============================================================ */

function createDoorHandle(
    group,
    side,
    zPosition,
    name
) {

    const geometry =
        new THREE.BoxGeometry(
            0.025,
            0.035,
            0.24,
            6,
            4,
            8
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x161616,

            metalness:
                1.0,

            roughness:
                0.12,

            clearcoat:
                1.0

        });


    const handle =
        new THREE.Mesh(
            geometry,
            material
        );


    handle.position.set(
        side *
        (DoorConfig.bodyWidth / 2 +
        0.025),
        1.03,
        zPosition +
        0.22
    );


    handle.rotation.y =
        side *
        0.01;


    handle.name =
        `M5_DOOR_HANDLE_${name}`;


    group.add(
        handle
    );

}


/* ============================================================
   08 — OPEN DOOR ANGLE
   ============================================================ */

export function setDoorRotation(
    door,
    angle
) {

    if (!door) {

        return;

    }


    door.rotation.y =
        angle;

}


/* ============================================================
   09 — CLOSE ALL DOORS
   ============================================================ */

export function closeAllDoors(
    group
) {

    if (!group) {

        return;

    }


    group.children.forEach(
        child => {

            if (
                child.name.startsWith(
                    "M5_DOOR_"
                ) &&
                child.isMesh
            ) {

                child.rotation.y =
                    0;

            }

        }
    );

}


/* ============================================================
   10 — EXPORT CONFIG
   ============================================================ */

export {
    DoorConfig
};
