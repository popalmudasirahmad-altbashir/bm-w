/* ============================================================
   BMW M5 G90 — REAR SECTION
   File: car/rear.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


/* ============================================================
   01 — REAR CONFIGURATION
   ============================================================ */

const RearConfig = {

    width:
        M5_DIMENSIONS.width,

    length:
        M5_DIMENSIONS.rearOverhang,

    rearPosition:
        -M5_DIMENSIONS.length / 2

};


/* ============================================================
   02 — CREATE REAR
   ============================================================ */

export function createRearSection() {

    const group =
        new THREE.Group();


    group.name =
        "M5_REAR_SECTION";


    createRearBody(
        group
    );

    createRearLowerSection(
        group
    );

    createRearDiffuser(
        group
    );


    return group;

}


/* ============================================================
   03 — REAR BODY
   ============================================================ */

function createRearBody(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            RearConfig.width * 0.94,
            0.38,
            RearConfig.length * 0.92,
            16,
            8,
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


        const normalizedX =
            Math.abs(x) /
            (RearConfig.width * 0.47);


        const normalizedZ =
            Math.abs(z) /
            (RearConfig.length * 0.46);


        let newX =
            x;

        let newY =
            y;


        if (
            normalizedX > 0.70
        ) {

            newX *=
                1 -
                (
                    normalizedX -
                    0.70
                ) * 0.14;

        }


        if (
            normalizedZ > 0.70
        ) {

            newX *=
                1 -
                (
                    normalizedZ -
                    0.70
                ) * 0.10;

        }


        if (
            y > 0
        ) {

            newY *=
                1 -
                normalizedX * 0.07;

        }


        position.setXYZ(
            i,
            newX,
            newY,
            z
        );

    }


    position.needsUpdate =
        true;


    geometry.computeVertexNormals();


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x050505,

            metalness:
                0.9,

            roughness:
                0.16,

            clearcoat:
                0.95,

            clearcoatRoughness:
                0.07

        });


    const rear =
        new THREE.Mesh(
            geometry,
            material
        );


    rear.position.set(
        0,
        0.55,
        RearConfig.rearPosition +
        RearConfig.length / 2
    );


    rear.castShadow =
        true;

    rear.receiveShadow =
        true;


    rear.name =
        "M5_REAR_BODY";


    group.add(
        rear
    );

}


/* ============================================================
   04 — REAR LOWER SECTION
   ============================================================ */

function createRearLowerSection(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            RearConfig.width * 0.91,
            0.22,
            0.55,
            12,
            4,
            12
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x030303,

            metalness:
                0.76,

            roughness:
                0.22,

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
        0.39,
        RearConfig.rearPosition +
        0.18
    );


    lower.castShadow =
        true;


    lower.name =
        "M5_REAR_LOWER_BODY";


    group.add(
        lower
    );

}


/* ============================================================
   05 — REAR DIFFUSER
   ============================================================ */

function createRearDiffuser(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            RearConfig.width * 0.72,
            0.06,
            0.32,
            8,
            2,
            8
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x010101,

            metalness:
                0.7,

            roughness:
                0.2,

            clearcoat:
                0.5

        });


    const diffuser =
        new THREE.Mesh(
            geometry,
            material
        );


    diffuser.position.set(
        0,
        0.285,
        RearConfig.rearPosition +
        0.10
    );


    diffuser.castShadow =
        true;


    diffuser.name =
        "M5_REAR_DIFFUSER";


    group.add(
        diffuser
    );

}


/* ============================================================
   06 — REAR SIDE CONTOURS
   ============================================================ */

export function createRearSideContours(
    group
) {

    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const geometry =
                new THREE.BoxGeometry(
                    0.07,
                    0.20,
                    0.72,
                    8,
                    4,
                    12
                );


            const material =
                new THREE.MeshPhysicalMaterial({

                    color:
                        0x060606,

                    metalness:
                        0.86,

                    roughness:
                        0.17,

                    clearcoat:
                        0.8

                });


            const contour =
                new THREE.Mesh(
                    geometry,
                    material
                );


            contour.position.set(
                side *
                (RearConfig.width * 0.45),
                0.48,
                RearConfig.rearPosition +
                0.34
            );


            contour.rotation.y =
                side *
                0.08;


            contour.castShadow =
                true;


            contour.name =
                side < 0
                    ? "M5_REAR_LEFT_CONTOUR"
                    : "M5_REAR_RIGHT_CONTOUR";


            group.add(
                contour
            );

        }
    );

}


/* ============================================================
   07 — REAR BOUNDARIES
   ============================================================ */

export function getRearBounds() {

    return {

        width:
            RearConfig.width,

        length:
            RearConfig.length,

        rearPosition:
            RearConfig.rearPosition

    };

}


/* ============================================================
   08 — REAR COLOR
   ============================================================ */

export function setRearColor(
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
   09 — EXPORT
   ============================================================ */

export {
    RearConfig
};
