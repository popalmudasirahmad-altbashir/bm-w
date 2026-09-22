/* ============================================================
   BMW M5 G90 — SIDE SKIRTS
   File: car/side-skirts.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


const SideSkirtConfig = {

    length:
        2.65,

    width:
        0.19,

    height:
        0.12,

    y:
        0.36,

    zOffset:
        0.05,

    lowerLength:
        2.42,

    lowerWidth:
        0.12,

    lowerHeight:
        0.07

};


/* ============================================================
   CREATE SIDE SKIRTS
   ============================================================ */

export function createSideSkirts() {

    const group =
        new THREE.Group();

    group.name =
        "M5_SIDE_SKIRTS";


    createLeftSideSkirt(
        group
    );

    createRightSideSkirt(
        group
    );


    createLowerSideSections(
        group
    );


    createUpperSideLines(
        group
    );


    createSideSkirtEndCaps(
        group
    );


    return group;

}


/* ============================================================
   LEFT SIDE SKIRT
   ============================================================ */

function createLeftSideSkirt(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            SideSkirtConfig.length,
            SideSkirtConfig.height,
            SideSkirtConfig.width,
            24,
            6,
            6
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

        const normalized =
            x /
            (
                SideSkirtConfig.length /
                2
            );


        position.setY(
            i,
            position.getY(i) -
            Math.pow(
                Math.abs(normalized),
                2
            ) *
            0.018
        );


        position.setZ(
            i,
            position.getZ(i) -
            Math.abs(normalized) *
            0.012
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const skirt =
        new THREE.Mesh(
            geometry,
            createPaintMaterial()
        );


    skirt.position.set(
        0,
        SideSkirtConfig.y,
        SideSkirtConfig.zOffset +
        0.93
    );


    skirt.rotation.y =
        Math.PI / 2;


    skirt.name =
        "M5_LEFT_SIDE_SKIRT";


    skirt.castShadow =
        true;

    skirt.receiveShadow =
        true;


    group.add(
        skirt
    );

}


/* ============================================================
   RIGHT SIDE SKIRT
   ============================================================ */

function createRightSideSkirt(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            SideSkirtConfig.length,
            SideSkirtConfig.height,
            SideSkirtConfig.width,
            24,
            6,
            6
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

        const normalized =
            x /
            (
                SideSkirtConfig.length /
                2
            );


        position.setY(
            i,
            position.getY(i) -
            Math.pow(
                Math.abs(normalized),
                2
            ) *
            0.018
        );


        position.setZ(
            i,
            position.getZ(i) -
            Math.abs(normalized) *
            0.012
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const skirt =
        new THREE.Mesh(
            geometry,
            createPaintMaterial()
        );


    skirt.position.set(
        0,
        SideSkirtConfig.y,
        -SideSkirtConfig.zOffset -
        0.93
    );


    skirt.rotation.y =
        Math.PI / 2;


    skirt.name =
        "M5_RIGHT_SIDE_SKIRT";


    skirt.castShadow =
        true;

    skirt.receiveShadow =
        true;


    group.add(
        skirt
    );

}


/* ============================================================
   LOWER SIDE SECTIONS
   ============================================================ */

function createLowerSideSections(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x020202,

            metalness:
                0.78,

            roughness:
                0.25,

            clearcoat:
                0.65,

            clearcoatRoughness:
                0.08

        });


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const geometry =
                new THREE.BoxGeometry(
                    SideSkirtConfig.lowerLength,
                    SideSkirtConfig.lowerHeight,
                    SideSkirtConfig.lowerWidth,
                    18,
                    4,
                    5
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

                const normalized =
                    x /
                    (
                        SideSkirtConfig.lowerLength /
                        2
                    );


                position.setY(
                    i,
                    position.getY(i) -
                    Math.abs(normalized) *
                    0.012
                );

            }


            position.needsUpdate =
                true;

            geometry.computeVertexNormals();


            const lower =
                new THREE.Mesh(
                    geometry,
                    material
                );


            lower.position.set(
                0,
                0.275,
                side *
                0.955
            );


            lower.rotation.y =
                Math.PI / 2;


            lower.name =
                side < 0
                    ? "M5_LEFT_LOWER_SIDE_SKIRT"
                    : "M5_RIGHT_LOWER_SIDE_SKIRT";


            lower.castShadow =
                true;

            lower.receiveShadow =
                true;


            group.add(
                lower
            );

        }
    );

}


/* ============================================================
   UPPER SIDE LINES
   ============================================================ */

function createUpperSideLines(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x080808,

            metalness:
                0.9,

            roughness:
                0.18,

            clearcoat:
                0.9

        });


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const geometry =
                new THREE.BoxGeometry(
                    2.42,
                    0.028,
                    0.025,
                    20,
                    2,
                    2
                );


            const line =
                new THREE.Mesh(
                    geometry,
                    material
                );


            line.position.set(
                0,
                0.43,
                side *
                1.025
            );


            line.rotation.y =
                Math.PI / 2;


            line.name =
                side < 0
                    ? "M5_LEFT_SIDE_CHARACTER_LINE"
                    : "M5_RIGHT_SIDE_CHARACTER_LINE";


            group.add(
                line
            );

        }
    );

}


/* ============================================================
   SIDE SKIRT END CAPS
   ============================================================ */

function createSideSkirtEndCaps(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x030303,

            metalness:
                0.68,

            roughness:
                0.3,

            clearcoat:
                0.6

        });


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const frontGeometry =
                new THREE.BoxGeometry(
                    0.13,
                    0.14,
                    0.18,
                    6,
                    4,
                    4
                );


            const frontCap =
                new THREE.Mesh(
                    frontGeometry,
                    material
                );


            frontCap.position.set(
                1.30,
                0.34,
                side *
                0.955
            );


            frontCap.rotation.y =
                Math.PI / 2;


            frontCap.name =
                side < 0
                    ? "M5_LEFT_FRONT_SKIRT_CAP"
                    : "M5_RIGHT_FRONT_SKIRT_CAP";


            group.add(
                frontCap
            );


            const rearGeometry =
                new THREE.BoxGeometry(
                    0.13,
                    0.14,
                    0.18,
                    6,
                    4,
                    4
                );


            const rearCap =
                new THREE.Mesh(
                    rearGeometry,
                    material
                );


            rearCap.position.set(
                -1.30,
                0.34,
                side *
                0.955
            );


            rearCap.rotation.y =
                Math.PI / 2;


            rearCap.name =
                side < 0
                    ? "M5_LEFT_REAR_SKIRT_CAP"
                    : "M5_RIGHT_REAR_SKIRT_CAP";


            group.add(
                rearCap
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
            0.94,

        roughness:
            0.13,

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

export function setSideSkirtsPosition(
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
   SCALE
   ============================================================ */

export function setSideSkirtsScale(
    group,
    scale
) {

    if (!group) {
        return;
    }


    group.scale.setScalar(
        scale
    );

}


/* ============================================================
   COLOR
   ============================================================ */

export function setSideSkirtsColor(
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
    SideSkirtConfig
};
