/* ============================================================
   BMW M5 G90 — GRILLE
   File: car/grille.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


const GrilleConfig = {

    width:
        0.92,

    height:
        0.52,

    centerY:
        0.98,

    centerZ:
        1.82,

    depth:
        0.075,

    verticalBars:
        11

};


/* ============================================================
   CREATE GRILLE
   ============================================================ */

export function createGrille() {

    const group =
        new THREE.Group();

    group.name =
        "M5_GRILLE";


    const outerFrame =
        createOuterFrame();

    group.add(
        outerFrame
    );


    createVerticalBars(
        group
    );


    const innerSurface =
        createInnerSurface();

    group.add(
        innerSurface
    );


    createGrilleHighlights(
        group
    );


    return group;

}


/* ============================================================
   OUTER FRAME
   ============================================================ */

function createOuterFrame() {

    const geometry =
        new THREE.BoxGeometry(
            GrilleConfig.width,
            GrilleConfig.height,
            GrilleConfig.depth,
            12,
            12,
            4
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x050505,

            metalness:
                0.94,

            roughness:
                0.16,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.035

        });


    const frame =
        new THREE.Mesh(
            geometry,
            material
        );


    frame.position.set(
        0,
        GrilleConfig.centerY,
        GrilleConfig.centerZ
    );


    frame.scale.set(
        1,
        1,
        0.45
    );


    frame.name =
        "M5_GRILLE_OUTER_FRAME";


    frame.castShadow =
        true;


    return frame;

}


/* ============================================================
   VERTICAL KIDNEY GRILLE BARS
   ============================================================ */

function createVerticalBars(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x171717,

            metalness:
                0.97,

            roughness:
                0.14,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.035

        });


    const usableWidth =
        GrilleConfig.width *
        0.76;


    for (
        let i = 0;
        i < GrilleConfig.verticalBars;
        i++
    ) {

        const t =
            i /
            (
                GrilleConfig.verticalBars -
                1
            );


        const x =
            -usableWidth / 2 +
            usableWidth * t;


        const barHeight =
            GrilleConfig.height *
            (
                0.86 -
                Math.abs(
                    t - 0.5
                ) *
                0.22
            );


        const geometry =
            new THREE.BoxGeometry(
                0.035,
                barHeight,
                0.11,
                5,
                8,
                4
            );


        const bar =
            new THREE.Mesh(
                geometry,
                material
            );


        bar.position.set(
            x,
            GrilleConfig.centerY,
            GrilleConfig.centerZ -
            0.055
        );


        bar.rotation.z =
            (
                t -
                0.5
            ) *
            0.12;


        bar.name =
            "M5_GRILLE_VERTICAL_BAR_" +
            (
                i + 1
            );


        bar.castShadow =
            true;


        group.add(
            bar
        );

    }

}


/* ============================================================
   DARK INNER SURFACE
   ============================================================ */

function createInnerSurface() {

    const geometry =
        new THREE.BoxGeometry(
            GrilleConfig.width *
            0.82,

            GrilleConfig.height *
            0.84,

            0.025,

            8,
            8,
            2
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x010101,

            metalness:
                0.35,

            roughness:
                0.58

        });


    const surface =
        new THREE.Mesh(
            geometry,
            material
        );


    surface.position.set(
        0,
        GrilleConfig.centerY,
        GrilleConfig.centerZ -
        0.075
    );


    surface.name =
        "M5_GRILLE_DARK_INTERIOR";


    return surface;

}


/* ============================================================
   GRILLE HIGHLIGHTS
   ============================================================ */

function createGrilleHighlights(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x777777,

            metalness:
                1.0,

            roughness:
                0.18,

            clearcoat:
                1.0

        });


    const top =
        new THREE.BoxGeometry(
            GrilleConfig.width *
            0.88,

            0.018,

            0.025
        );


    const topEdge =
        new THREE.Mesh(
            top,
            material
        );


    topEdge.position.set(
        0,
        GrilleConfig.centerY +
        GrilleConfig.height *
        0.43,

        GrilleConfig.centerZ
    );


    topEdge.name =
        "M5_GRILLE_TOP_HIGHLIGHT";


    group.add(
        topEdge
    );


    const bottom =
        top.clone();


    const bottomEdge =
        new THREE.Mesh(
            bottom,
            material
        );


    bottomEdge.position.set(
        0,
        GrilleConfig.centerY -
        GrilleConfig.height *
        0.43,

        GrilleConfig.centerZ
    );


    bottomEdge.name =
        "M5_GRILLE_BOTTOM_HIGHLIGHT";


    group.add(
        bottomEdge
    );

}


/* ============================================================
   POSITION
   ============================================================ */

export function setGrillePosition(
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

export function setGrilleColor(
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
    GrilleConfig
};
