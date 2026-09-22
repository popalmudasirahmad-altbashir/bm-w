/* ============================================================
   BMW M5 G90 — FRONT SECTION
   File: car/front.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS,
    M5_HEIGHTS
} from "./dimensions.js";


/* ============================================================
   01 — FRONT CONFIGURATION
   ============================================================ */

const FrontConfig = {

    width:
        M5_DIMENSIONS.width,

    length:
        M5_DIMENSIONS.frontOverhang,

    ground:
        M5_DIMENSIONS.groundClearance,

    wheelHeight:
        M5_HEIGHTS.wheelCenter

};


/* ============================================================
   02 — CREATE FRONT
   ============================================================ */

export function createFrontSection() {

    const group =
        new THREE.Group();


    group.name =
        "M5_FRONT_SECTION";


    createFrontNose(
        group
    );

    createFrontSplitter(
        group
    );

    createFrontSideContours(
        group
    );


    return group;

}


/* ============================================================
   03 — FRONT NOSE
   ============================================================ */

function createFrontNose(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            FrontConfig.width * 0.94,
            0.34,
            FrontConfig.length * 0.92,
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
            (FrontConfig.width * 0.47);


        const normalizedZ =
            Math.abs(z) /
            (FrontConfig.length * 0.46);


        let newX =
            x;

        let newY =
            y;


        if (
            normalizedX > 0.72
        ) {

            newX *=
                1 -
                (
                    normalizedX -
                    0.72
                ) * 0.18;

        }


        if (
            normalizedZ > 0.70
        ) {

            newX *=
                1 -
                (
                    normalizedZ -
                    0.70
                ) * 0.12;

        }


        if (
            y > 0
        ) {

            newY *=
                1 -
                normalizedX * 0.08;

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


    const nose =
        new THREE.Mesh(
            geometry,
            material
        );


    nose.position.set(
        0,
        0.53,
        M5_DIMENSIONS.length / 2 -
        FrontConfig.length / 2
    );


    nose.castShadow =
        true;

    nose.receiveShadow =
        true;


    nose.name =
        "M5_FRONT_NOSE";


    group.add(
        nose
    );

}


/* ============================================================
   04 — FRONT SPLITTER
   ============================================================ */

function createFrontSplitter(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            FrontConfig.width * 0.88,
            0.045,
            0.28,
            8,
            2,
            8
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x010101,

            metalness:
                0.72,

            roughness:
                0.2,

            clearcoat:
                0.6

        });


    const splitter =
        new THREE.Mesh(
            geometry,
            material
        );


    splitter.position.set(
        0,
        0.285,
        M5_DIMENSIONS.length / 2 -
        0.08
    );


    splitter.castShadow =
        true;


    splitter.name =
        "M5_FRONT_SPLITTER";


    group.add(
        splitter
    );

}


/* ============================================================
   05 — FRONT SIDE CONTOURS
   ============================================================ */

function createFrontSideContours(
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
                    0.075,
                    0.20,
                    0.78,
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
                (FrontConfig.width * 0.455),
                0.48,
                M5_DIMENSIONS.length / 2 -
                0.32
            );


            contour.rotation.y =
                side *
                -0.08;


            contour.castShadow =
                true;


            contour.name =
                side < 0
                    ? "M5_FRONT_LEFT_CONTOUR"
                    : "M5_FRONT_RIGHT_CONTOUR";


            group.add(
                contour
            );

        }
    );

}


/* ============================================================
   06 — FRONT BOUNDARIES
   ============================================================ */

export function getFrontBounds() {

    return {

        width:
            FrontConfig.width,

        length:
            FrontConfig.length,

        groundClearance:
            FrontConfig.ground

    };

}


/* ============================================================
   07 — FRONT COLOR
   ============================================================ */

export function setFrontColor(
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
   08 — EXPORT
   ============================================================ */

export {
    FrontConfig
};
