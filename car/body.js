/* ============================================================
   BMW M5 G90 — MAIN BODY
   File: car/body.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS,
    M5_HEIGHTS
} from "./dimensions.js";


/* ============================================================
   01 — BODY CONFIGURATION
   ============================================================ */

const BodyConfig = {

    length:
        M5_DIMENSIONS.length,

    width:
        M5_DIMENSIONS.width,

    height:
        M5_DIMENSIONS.height,

    ground:
        M5_HEIGHTS.ground,

    lowerBody:
        M5_HEIGHTS.lowerBody,

    roof:
        M5_HEIGHTS.roof

};


/* ============================================================
   02 — CREATE MAIN BODY
   ============================================================ */

export function createMainBody() {

    const group =
        new THREE.Group();


    group.name =
        "M5_MAIN_BODY";


    const bodyGeometry =
        createBodyGeometry();


    const bodyMaterial =
        createBodyMaterial();


    const body =
        new THREE.Mesh(
            bodyGeometry,
            bodyMaterial
        );


    body.castShadow =
        true;

    body.receiveShadow =
        true;


    body.name =
        "M5_BODY_SHELL";


    group.add(
        body
    );


    createLowerBody(
        group
    );


    createWheelArchGuides(
        group
    );


    return group;

}


/* ============================================================
   03 — BODY GEOMETRY
   ============================================================ */

function createBodyGeometry() {

    const halfLength =
        BodyConfig.length / 2;

    const halfWidth =
        BodyConfig.width / 2;


    const front =
        halfLength;

    const rear =
        -halfLength;


    const geometry =
        new THREE.BoxGeometry(
            BodyConfig.width,
            0.48,
            BodyConfig.length,
            16,
            8,
            32
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


        const normalizedZ =
            Math.abs(z) /
            halfLength;


        const normalizedX =
            Math.abs(x) /
            halfWidth;


        let newX =
            x;


        let newY =
            y;


        let newZ =
            z;


        /* ----------------------------------------------------
           Side taper
           ---------------------------------------------------- */

        const sideTaper =
            1 -
            Math.pow(
                normalizedZ,
                3
            ) * 0.055;


        newX *=
            sideTaper;


        /* ----------------------------------------------------
           Front narrowing
           ---------------------------------------------------- */

        if (
            z >
            halfLength * 0.62
        ) {

            const factor =
                1 -
                (
                    (z -
                    halfLength * 0.62) /
                    (halfLength * 0.38)
                ) * 0.12;


            newX *=
                factor;

        }


        /* ----------------------------------------------------
           Rear narrowing
           ---------------------------------------------------- */

        if (
            z <
            -halfLength * 0.70
        ) {

            const factor =
                1 -
                (
                    (
                        Math.abs(z) -
                        halfLength * 0.70
                    ) /
                    (halfLength * 0.30)
                ) * 0.09;


            newX *=
                factor;

        }


        /* ----------------------------------------------------
           Lower side sculpting
           ---------------------------------------------------- */

        if (
            y <
            -0.05
        ) {

            const sideCurve =
                1 -
                Math.pow(
                    normalizedX,
                    2
                ) * 0.10;


            newY *=
                sideCurve;

        }


        /* ----------------------------------------------------
           Roof direction
           ---------------------------------------------------- */

        if (
            y >
            0.05
        ) {

            const upperCurve =
                1 -
                Math.pow(
                    normalizedX,
                    2
                ) * 0.08;


            newY *=
                upperCurve;

        }


        position.setXYZ(
            i,
            newX,
            newY,
            newZ
        );

    }


    position.needsUpdate =
        true;


    geometry.computeVertexNormals();


    geometry.translate(
        0,
        BodyConfig.lowerBody,
        0
    );


    return geometry;

}


/* ============================================================
   04 — BODY MATERIAL
   ============================================================ */

function createBodyMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x050505,

        metalness:
            0.88,

        roughness:
            0.18,

        clearcoat:
            0.9,

        clearcoatRoughness:
            0.08,

        reflectivity:
            0.95

    });

}


/* ============================================================
   05 — LOWER BODY
   ============================================================ */

function createLowerBody(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            BodyConfig.width * 0.985,
            0.24,
            BodyConfig.length * 0.965,
            12,
            4,
            24
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x030303,

            metalness:
                0.72,

            roughness:
                0.24,

            clearcoat:
                0.55,

            clearcoatRoughness:
                0.12

        });


    const lower =
        new THREE.Mesh(
            geometry,
            material
        );


    lower.position.y =
        BodyConfig.lowerBody -
        0.20;


    lower.castShadow =
        true;

    lower.receiveShadow =
        true;


    lower.name =
        "M5_LOWER_BODY";


    group.add(
        lower
    );

}


/* ============================================================
   06 — WHEEL ARCH GUIDES
   ============================================================ */

function createWheelArchGuides(
    group
) {

    const wheelPositions = [

        M5_DIMENSIONS.wheelbase / 2,

        -M5_DIMENSIONS.wheelbase / 2

    ];


    wheelPositions.forEach(
        (z, index) => {

            const arch =
                createArchGuide(
                    z
                );


            arch.name =
                index === 0
                    ? "M5_FRONT_ARCH_GUIDE"
                    : "M5_REAR_ARCH_GUIDE";


            group.add(
                arch
            );

        }
    );

}


/* ============================================================
   07 — ARCH GUIDE
   ============================================================ */

function createArchGuide(
    z
) {

    const curve =
        new THREE.EllipseCurve(
            0,
            0,
            0.43,
            0.43,
            Math.PI,
            0,
            false,
            0
        );


    const points =
        curve.getPoints(
            32
        );


    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(
                points
            );


    const material =
        new THREE.LineBasicMaterial({

            color:
                0x111111,

            transparent:
                true,

            opacity:
                0.65

        });


    const line =
        new THREE.Line(
            geometry,
            material
        );


    line.rotation.x =
        Math.PI / 2;


    line.rotation.z =
        Math.PI;


    line.scale.set(
        1,
        0.78,
        1
    );


    line.position.set(
        BodyConfig.width / 2 + 0.002,
        M5_HEIGHTS.wheelCenter,
        z
    );


    return line;

}


/* ============================================================
   08 — BODY BOUNDING BOX
   ============================================================ */

export function getBodyBounds() {

    return {

        length:
            BodyConfig.length,

        width:
            BodyConfig.width,

        height:
            BodyConfig.height,

        centerY:
            BodyConfig.lowerBody

    };

}


/* ============================================================
   09 — BODY MATERIAL UPDATE
   ============================================================ */

export function setBodyColor(
    bodyGroup,
    color
) {

    if (!bodyGroup) {

        return;

    }


    bodyGroup.traverse(
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
   10 — EXPORT CONFIG
   ============================================================ */

export {
    BodyConfig
};
