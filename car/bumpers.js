/* ============================================================
   BMW M5 G90 — BUMPERS
   File: car/bumpers.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


const BumperConfig = {

    frontWidth:
        1.72,

    frontHeight:
        0.34,

    frontDepth:
        0.30,

    rearWidth:
        1.78,

    rearHeight:
        0.36,

    rearDepth:
        0.31,

    frontY:
        0.62,

    rearY:
        0.61,

    frontZ:
        1.91,

    rearZ:
        -1.92

};


/* ============================================================
   CREATE BUMPERS
   ============================================================ */

export function createBumpers() {

    const group =
        new THREE.Group();

    group.name =
        "M5_BUMPERS";


    const front =
        createFrontBumper();

    group.add(
        front
    );


    const rear =
        createRearBumper();

    group.add(
        rear
    );


    createFrontLowerSection(
        group
    );


    createRearLowerSection(
        group
    );


    createFrontSideIntakes(
        group
    );


    createRearReflectors(
        group
    );


    return group;

}


/* ============================================================
   FRONT BUMPER
   ============================================================ */

function createFrontBumper() {

    const geometry =
        new THREE.BoxGeometry(
            BumperConfig.frontWidth,
            BumperConfig.frontHeight,
            BumperConfig.frontDepth,
            18,
            8,
            12
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

        const nx =
            Math.abs(x) /
            (
                BumperConfig.frontWidth /
                2
            );


        position.setY(
            i,
            y +
            Math.pow(
                nx,
                2
            ) *
            0.055
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const material =
        createPaintMaterial();


    const bumper =
        new THREE.Mesh(
            geometry,
            material
        );


    bumper.position.set(
        0,
        BumperConfig.frontY,
        BumperConfig.frontZ
    );


    bumper.scale.z =
        0.72;


    bumper.name =
        "M5_FRONT_BUMPER";


    bumper.castShadow =
        true;

    bumper.receiveShadow =
        true;


    return bumper;

}


/* ============================================================
   REAR BUMPER
   ============================================================ */

function createRearBumper() {

    const geometry =
        new THREE.BoxGeometry(
            BumperConfig.rearWidth,
            BumperConfig.rearHeight,
            BumperConfig.rearDepth,
            18,
            8,
            12
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

        const nx =
            Math.abs(x) /
            (
                BumperConfig.rearWidth /
                2
            );


        position.setY(
            i,
            y +
            Math.pow(
                nx,
                2
            ) *
            0.045
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const bumper =
        new THREE.Mesh(
            geometry,
            createPaintMaterial()
        );


    bumper.position.set(
        0,
        BumperConfig.rearY,
        BumperConfig.rearZ
    );


    bumper.scale.z =
        0.74;


    bumper.name =
        "M5_REAR_BUMPER";


    bumper.castShadow =
        true;

    bumper.receiveShadow =
        true;


    return bumper;

}


/* ============================================================
   FRONT LOWER SECTION
   ============================================================ */

function createFrontLowerSection(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            1.52,
            0.15,
            0.22,
            14,
            5,
            8
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x030303,

            metalness:
                0.72,

            roughness:
                0.29,

            clearcoat:
                0.65

        });


    const lower =
        new THREE.Mesh(
            geometry,
            material
        );


    lower.position.set(
        0,
        0.48,
        1.99
    );


    lower.name =
        "M5_FRONT_LOWER_BUMPER";


    group.add(
        lower
    );

}


/* ============================================================
   REAR LOWER SECTION
   ============================================================ */

function createRearLowerSection(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            1.64,
            0.16,
            0.23,
            14,
            5,
            8
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x040404,

            metalness:
                0.75,

            roughness:
                0.3,

            clearcoat:
                0.7

        });


    const lower =
        new THREE.Mesh(
            geometry,
            material
        );


    lower.position.set(
        0,
        0.47,
        -1.99
    );


    lower.name =
        "M5_REAR_LOWER_BUMPER";


    group.add(
        lower
    );

}


/* ============================================================
   FRONT SIDE INTAKES
   ============================================================ */

function createFrontSideIntakes(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x010101,

            metalness:
                0.42,

            roughness:
                0.5

        });


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const geometry =
                new THREE.BoxGeometry(
                    0.29,
                    0.18,
                    0.035,
                    8,
                    5,
                    2
                );


            const intake =
                new THREE.Mesh(
                    geometry,
                    material
                );


            intake.position.set(
                side * 0.66,
                0.63,
                2.035
            );


            intake.rotation.z =
                side *
                0.08;


            intake.name =
                side < 0
                    ? "M5_LEFT_FRONT_AIR_INTAKE"
                    : "M5_RIGHT_FRONT_AIR_INTAKE";


            group.add(
                intake
            );

        }
    );

}


/* ============================================================
   REAR REFLECTORS
   ============================================================ */

function createRearReflectors(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x8b0909,

            emissive:
                0x190000,

            emissiveIntensity:
                0.35,

            roughness:
                0.2,

            clearcoat:
                0.7

        });


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const geometry =
                new THREE.BoxGeometry(
                    0.22,
                    0.055,
                    0.025,
                    6,
                    3,
                    2
                );


            const reflector =
                new THREE.Mesh(
                    geometry,
                    material
                );


            reflector.position.set(
                side * 0.72,
                0.68,
                -2.055
            );


            reflector.rotation.z =
                side *
                0.04;


            reflector.name =
                side < 0
                    ? "M5_LEFT_REAR_REFLECTOR"
                    : "M5_RIGHT_REAR_REFLECTOR";


            group.add(
                reflector
            );

        }
    );

}


/* ============================================================
   PAINT MATERIAL
   ============================================================ */

function createPaintMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x050505,

        metalness:
            0.92,

        roughness:
            0.14,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.045,

        reflectivity:
            1.0

    });

}


/* ============================================================
   POSITION
   ============================================================ */

export function setBumpersPosition(
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

export function setBumperColor(
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
    BumperConfig
};
