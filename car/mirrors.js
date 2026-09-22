/* ============================================================
   BMW M5 G90 — MIRRORS
   File: car/mirrors.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


/* ============================================================
   01 — MIRROR CONFIGURATION
   ============================================================ */

const MirrorConfig = {

    bodyWidth:
        0.27,

    bodyHeight:
        0.18,

    bodyLength:
        0.34,

    centerY:
        1.22,

    centerZ:
        0.46,

    sideOffset:
        1.015,

    glassWidth:
        0.19,

    glassHeight:
        0.105

};


/* ============================================================
   02 — CREATE MIRRORS
   ============================================================ */

export function createMirrors() {

    const group =
        new THREE.Group();

    group.name =
        "M5_MIRRORS";


    createMirror(
        group,
        -1
    );


    createMirror(
        group,
        1
    );


    return group;

}


/* ============================================================
   03 — MIRROR MATERIAL
   ============================================================ */

function createMirrorMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x050505,

        metalness:
            0.94,

        roughness:
            0.12,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.04,

        reflectivity:
            1.0

    });

}


/* ============================================================
   04 — CREATE ONE MIRROR
   ============================================================ */

function createMirror(
    group,
    side
) {

    const mirrorGroup =
        new THREE.Group();


    mirrorGroup.name =
        side < 0
            ? "M5_LEFT_MIRROR"
            : "M5_RIGHT_MIRROR";


    const body =
        createMirrorBody(
            side
        );


    mirrorGroup.add(
        body
    );


    const glass =
        createMirrorGlass(
            side
        );


    mirrorGroup.add(
        glass
    );


    createMirrorArm(
        mirrorGroup,
        side
    );


    createMirrorIndicator(
        mirrorGroup,
        side
    );


    mirrorGroup.position.set(
        side *
        MirrorConfig.sideOffset,
        MirrorConfig.centerY,
        MirrorConfig.centerZ
    );


    group.add(
        mirrorGroup
    );

}


/* ============================================================
   05 — MIRROR BODY
   ============================================================ */

function createMirrorBody(
    side
) {

    const geometry =
        new THREE.SphereGeometry(
            1,
            24,
            14
        );


    geometry.scale(
        MirrorConfig.bodyWidth,
        MirrorConfig.bodyHeight,
        MirrorConfig.bodyLength
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


        if (
            y < 0
        ) {

            position.setY(
                i,
                y * 0.72
            );

        }


        if (
            z > 0
        ) {

            position.setZ(
                i,
                z * 0.88
            );

        }

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const mirror =
        new THREE.Mesh(
            geometry,
            createMirrorMaterial()
        );


    mirror.rotation.y =
        side *
        0.08;


    mirror.name =
        side < 0
            ? "M5_LEFT_MIRROR_HOUSING"
            : "M5_RIGHT_MIRROR_HOUSING";


    mirror.castShadow =
        true;


    return mirror;

}


/* ============================================================
   06 — MIRROR GLASS
   ============================================================ */

function createMirrorGlass(
    side
) {

    const geometry =
        new THREE.SphereGeometry(
            1,
            20,
            12,
            0,
            Math.PI,
            0,
            Math.PI
        );


    geometry.scale(
        MirrorConfig.glassWidth,
        MirrorConfig.glassHeight,
        0.025
    );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x101820,

            metalness:
                0.65,

            roughness:
                0.045,

            transmission:
                0.05,

            transparent:
                true,

            opacity:
                0.9,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.02,

            side:
                THREE.DoubleSide

        });


    const glass =
        new THREE.Mesh(
            geometry,
            material
        );


    glass.position.z =
        0.075;


    glass.rotation.y =
        side *
        0.04;


    glass.name =
        side < 0
            ? "M5_LEFT_MIRROR_GLASS"
            : "M5_RIGHT_MIRROR_GLASS";


    return glass;

}


/* ============================================================
   07 — MIRROR ARM
   ============================================================ */

function createMirrorArm(
    group,
    side
) {

    const geometry =
        new THREE.CylinderGeometry(
            0.035,
            0.055,
            0.28,
            12
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x070707,

            metalness:
                0.9,

            roughness:
                0.16,

            clearcoat:
                0.9

        });


    const arm =
        new THREE.Mesh(
            geometry,
            material
        );


    arm.rotation.z =
        Math.PI / 2;


    arm.rotation.y =
        side *
        0.18;


    arm.position.set(
        -side * 0.14,
        -0.13,
        -0.015
    );


    arm.name =
        side < 0
            ? "M5_LEFT_MIRROR_ARM"
            : "M5_RIGHT_MIRROR_ARM";


    arm.castShadow =
        true;


    group.add(
        arm
    );

}


/* ============================================================
   08 — MIRROR TURN INDICATOR
   ============================================================ */

function createMirrorIndicator(
    group,
    side
) {

    const geometry =
        new THREE.BoxGeometry(
            0.012,
            0.035,
            0.18,
            3,
            3,
            8
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xffb300,

            emissive:
                0x442200,

            emissiveIntensity:
                0.35,

            metalness:
                0.25,

            roughness:
                0.2,

            transparent:
                true,

            opacity:
                0.82

        });


    const indicator =
        new THREE.Mesh(
            geometry,
            material
        );


    indicator.position.set(
        side *
        0.02,
        0.015,
        0.055
    );


    indicator.rotation.y =
        side *
        0.08;


    indicator.name =
        side < 0
            ? "M5_LEFT_MIRROR_INDICATOR"
            : "M5_RIGHT_MIRROR_INDICATOR";


    group.add(
        indicator
    );

}


/* ============================================================
   09 — MIRROR POSITION
   ============================================================ */

export function setMirrorsPosition(
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
   10 — MIRROR COLOR
   ============================================================ */

export function setMirrorColor(
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
   11 — EXPORT
   ============================================================ */

export {
    MirrorConfig
};
