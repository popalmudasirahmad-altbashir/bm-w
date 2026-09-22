/* ============================================================
   BMW M5 G90 — WINDOWS
   File: car/windows.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


/* ============================================================
   01 — WINDOW CONFIGURATION
   ============================================================ */

const WindowConfig = {

    frontWidth:
        0.86,

    frontHeight:
        0.64,

    rearWidth:
        0.78,

    rearHeight:
        0.58,

    glassThickness:
        0.025,

    sideY:
        1.31,

    frontZ:
        0.57,

    rearZ:
        -0.38,

    frontAngle:
        -0.16,

    rearAngle:
        0.10

};


/* ============================================================
   02 — CREATE WINDOWS
   ============================================================ */

export function createWindows() {

    const group =
        new THREE.Group();

    group.name =
        "M5_WINDOWS";


    createLeftWindows(
        group
    );

    createRightWindows(
        group
    );


    createWindshield(
        group
    );


    createRearGlass(
        group
    );


    createWindowTrim(
        group
    );


    return group;

}


/* ============================================================
   03 — GLASS MATERIAL
   ============================================================ */

function createGlassMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x071018,

        metalness:
            0.25,

        roughness:
            0.055,

        transmission:
            0.08,

        transparent:
            true,

        opacity:
            0.78,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.025,

        reflectivity:
            1.0,

        side:
            THREE.DoubleSide

    });

}


/* ============================================================
   04 — LEFT WINDOWS
   ============================================================ */

function createLeftWindows(
    group
) {

    const material =
        createGlassMaterial();


    const front =
        createSideWindow(
            -1,
            true,
            material
        );


    const rear =
        createSideWindow(
            -1,
            false,
            material
        );


    group.add(
        front,
        rear
    );

}


/* ============================================================
   05 — RIGHT WINDOWS
   ============================================================ */

function createRightWindows(
    group
) {

    const material =
        createGlassMaterial();


    const front =
        createSideWindow(
            1,
            true,
            material
        );


    const rear =
        createSideWindow(
            1,
            false,
            material
        );


    group.add(
        front,
        rear
    );

}


/* ============================================================
   06 — SIDE WINDOW CREATION
   ============================================================ */

function createSideWindow(
    side,
    front,
    material
) {

    const width =
        front
            ? WindowConfig.frontWidth
            : WindowConfig.rearWidth;


    const height =
        front
            ? WindowConfig.frontHeight
            : WindowConfig.rearHeight;


    const geometry =
        new THREE.PlaneGeometry(
            width,
            height,
            8,
            8
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


        const normalizedX =
            x / (width / 2);


        let newY =
            y;


        newY -=
            Math.pow(
                normalizedX,
                2
            ) * 0.055;


        position.setY(
            i,
            newY
        );

    }


    position.needsUpdate =
        true;


    geometry.computeVertexNormals();


    const window =
        new THREE.Mesh(
            geometry,
            material.clone()
        );


    const xPosition =
        side *
        (
            M5_DIMENSIONS.width / 2 -
            0.055
        );


    const zPosition =
        front
            ? WindowConfig.frontZ
            : WindowConfig.rearZ;


    window.position.set(
        xPosition,
        WindowConfig.sideY,
        zPosition
    );


    window.rotation.y =
        side *
        (
            Math.PI / 2 +
            (
                front
                    ? WindowConfig.frontAngle
                    : WindowConfig.rearAngle
            )
        );


    window.rotation.x =
        front
            ? -0.035
            : 0.025;


    window.name =
        side < 0
            ? (
                front
                    ? "M5_LEFT_FRONT_WINDOW"
                    : "M5_LEFT_REAR_WINDOW"
            )
            : (
                front
                    ? "M5_RIGHT_FRONT_WINDOW"
                    : "M5_RIGHT_REAR_WINDOW"
            );


    window.castShadow =
        true;


    return window;

}


/* ============================================================
   07 — WINDSHIELD
   ============================================================ */

function createWindshield(
    group
) {

    const geometry =
        new THREE.PlaneGeometry(
            1.48,
            0.82,
            16,
            8
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
            Math.abs(x) / 0.74;


        const newY =
            y -
            Math.pow(
                nx,
                2
            ) * 0.045;


        position.setY(
            i,
            newY
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const material =
        createGlassMaterial();


    const windshield =
        new THREE.Mesh(
            geometry,
            material
        );


    windshield.position.set(
        0,
        1.23,
        0.83
    );


    windshield.rotation.x =
        -0.36;


    windshield.rotation.y =
        Math.PI;


    windshield.scale.set(
        1,
        1,
        1
    );


    windshield.name =
        "M5_FRONT_WINDSHIELD";


    windshield.castShadow =
        true;


    group.add(
        windshield
    );

}


/* ============================================================
   08 — REAR GLASS
   ============================================================ */

function createRearGlass(
    group
) {

    const geometry =
        new THREE.PlaneGeometry(
            1.36,
            0.72,
            16,
            8
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
            Math.abs(x) / 0.68;


        position.setY(
            i,
            y -
            Math.pow(
                nx,
                2
            ) * 0.04
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const material =
        createGlassMaterial();


    const rearGlass =
        new THREE.Mesh(
            geometry,
            material
        );


    rearGlass.position.set(
        0,
        1.25,
        -0.94
    );


    rearGlass.rotation.x =
        0.34;


    rearGlass.name =
        "M5_REAR_GLASS";


    rearGlass.castShadow =
        true;


    group.add(
        rearGlass
    );

}


/* ============================================================
   09 — WINDOW TRIM
   ============================================================ */

function createWindowTrim(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x050505,

            metalness:
                0.88,

            roughness:
                0.18,

            clearcoat:
                0.8

        });


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            createTrimBar(
                group,
                side,
                0.57,
                0.78,
                material,
                "FRONT"
            );


            createTrimBar(
                group,
                side,
                -0.38,
                0.70,
                material,
                "REAR"
            );

        }
    );

}


/* ============================================================
   10 — TRIM BAR
   ============================================================ */

function createTrimBar(
    group,
    side,
    z,
    length,
    material,
    label
) {

    const geometry =
        new THREE.BoxGeometry(
            0.028,
            0.035,
            length,
            4,
            2,
            8
        );


    const trim =
        new THREE.Mesh(
            geometry,
            material
        );


    trim.position.set(
        side *
        (
            M5_DIMENSIONS.width / 2 -
            0.035
        ),
        WindowConfig.sideY -
        0.005,
        z
    );


    trim.name =
        "M5_" +
        (
            side < 0
                ? "LEFT_"
                : "RIGHT_"
        ) +
        label +
        "_WINDOW_TRIM";


    trim.castShadow =
        true;


    group.add(
        trim
    );

}


/* ============================================================
   11 — WINDOW POSITION
   ============================================================ */

export function setWindowsPosition(
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
   12 — WINDOW TINT
   ============================================================ */

export function setWindowTint(
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
   13 — WINDOW OPACITY
   ============================================================ */

export function setWindowOpacity(
    group,
    opacity
) {

    if (!group) {
        return;
    }


    group.traverse(
        object => {

            if (
                object.isMesh &&
                object.material
            ) {

                object.material.transparent =
                    true;

                object.material.opacity =
                    opacity;

            }

        }
    );

}


/* ============================================================
   14 — EXPORT
   ============================================================ */

export {
    WindowConfig
};
