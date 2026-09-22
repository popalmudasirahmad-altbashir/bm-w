/* ============================================================
   BMW M5 G90 — HOOD
   File: car/hood.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS,
    M5_HEIGHTS
} from "./dimensions.js";


/* ============================================================
   01 — HOOD CONFIGURATION
   ============================================================ */

const HoodConfig = {

    width:
        M5_DIMENSIONS.width * 0.78,

    length:
        1.42,

    height:
        0.075,

    centerY:
        1.01,

    frontZ:
        1.12

};


/* ============================================================
   02 — CREATE HOOD
   ============================================================ */

export function createHood() {

    const group =
        new THREE.Group();


    group.name =
        "M5_HOOD";


    const hood =
        createHoodPanel();


    group.add(
        hood
    );


    createHoodCreases(
        group
    );


    createHoodFrontEdge(
        group
    );


    return group;

}


/* ============================================================
   03 — HOOD PANEL
   ============================================================ */

function createHoodPanel() {

    const geometry =
        new THREE.BoxGeometry(
            HoodConfig.width,
            HoodConfig.height,
            HoodConfig.length,
            20,
            4,
            24
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
            (HoodConfig.width / 2);


        const normalizedZ =
            Math.abs(z) /
            (HoodConfig.length / 2);


        let newY =
            y;


        let newX =
            x;


        /* ----------------------------------------------------
           Outer hood curvature
           ---------------------------------------------------- */

        newY +=
            Math.pow(
                normalizedX,
                2
            ) * 0.045;


        /* ----------------------------------------------------
           Front hood shaping
           ---------------------------------------------------- */

        if (
            z >
            HoodConfig.length * 0.25
        ) {

            newY +=
                (
                    z /
                    HoodConfig.length
                ) * 0.018;

        }


        /* ----------------------------------------------------
           Center bonnet crown
           ---------------------------------------------------- */

        newY +=
            (
                1 -
                normalizedX
            ) * 0.012;


        /* ----------------------------------------------------
           Slight side taper
           ---------------------------------------------------- */

        if (
            normalizedX > 0.82
        ) {

            newX *=
                0.985;

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
                0.92,

            roughness:
                0.14,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.055,

            reflectivity:
                1.0

        });


    const hood =
        new THREE.Mesh(
            geometry,
            material
        );


    hood.position.set(
        0,
        HoodConfig.centerY,
        HoodConfig.frontZ
    );


    hood.castShadow =
        true;

    hood.receiveShadow =
        true;


    hood.name =
        "M5_HOOD_PANEL";


    return hood;

}


/* ============================================================
   04 — HOOD CREASES
   ============================================================ */

function createHoodCreases(
    group
) {

    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const points = [

                new THREE.Vector3(
                    side * 0.40,
                    0,
                    -0.58
                ),

                new THREE.Vector3(
                    side * 0.43,
                    0,
                    -0.15
                ),

                new THREE.Vector3(
                    side * 0.47,
                    0,
                    0.30
                ),

                new THREE.Vector3(
                    side * 0.49,
                    0,
                    0.64
                )

            ];


            const curve =
                new THREE.CatmullRomCurve3(
                    points
                );


            const geometry =
                new THREE.BufferGeometry()
                    .setFromPoints(
                        curve.getPoints(
                            28
                        )
                    );


            const material =
                new THREE.LineBasicMaterial({

                    color:
                        0x242424,

                    transparent:
                        true,

                    opacity:
                        0.72

                });


            const crease =
                new THREE.Line(
                    geometry,
                    material
                );


            crease.position.y =
                HoodConfig.centerY +
                0.041;


            crease.position.z +=
                HoodConfig.frontZ;


            crease.name =
                side < 0
                    ? "M5_HOOD_LEFT_CREASE"
                    : "M5_HOOD_RIGHT_CREASE";


            group.add(
                crease
            );

        }
    );

}


/* ============================================================
   05 — FRONT HOOD EDGE
   ============================================================ */

function createHoodFrontEdge(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            HoodConfig.width * 0.96,
            0.025,
            0.045,
            12,
            2,
            4
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x080808,

            metalness:
                0.9,

            roughness:
                0.13,

            clearcoat:
                0.95

        });


    const edge =
        new THREE.Mesh(
            geometry,
            material
        );


    edge.position.set(
        0,
        HoodConfig.centerY +
        0.035,
        HoodConfig.frontZ +
        HoodConfig.length / 2
    );


    edge.name =
        "M5_HOOD_FRONT_EDGE";


    group.add(
        edge
    );

}


/* ============================================================
   06 — HOOD POSITION
   ============================================================ */

export function setHoodPosition(
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
   07 — HOOD COLOR
   ============================================================ */

export function setHoodColor(
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
   08 — HOOD DIMENSIONS
   ============================================================ */

export function getHoodDimensions() {

    return {

        width:
            HoodConfig.width,

        length:
            HoodConfig.length,

        height:
            HoodConfig.height

    };

}


/* ============================================================
   09 — EXPORT
   ============================================================ */

export {
    HoodConfig
};
