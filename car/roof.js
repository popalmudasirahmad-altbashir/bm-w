/* ============================================================
   BMW M5 G90 — ROOF
   File: car/roof.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

import {
    M5_DIMENSIONS
} from "./dimensions.js";


/* ============================================================
   01 — ROOF CONFIGURATION
   ============================================================ */

const RoofConfig = {

    width:
        M5_DIMENSIONS.width * 0.67,

    length:
        1.72,

    height:
        0.085,

    centerY:
        1.49,

    centerZ:
        -0.05,

    crown:
        0.075

};


/* ============================================================
   02 — CREATE ROOF
   ============================================================ */

export function createRoof() {

    const group =
        new THREE.Group();

    group.name =
        "M5_ROOF";


    const roofPanel =
        createRoofPanel();

    group.add(
        roofPanel
    );


    const roofGlass =
        createRoofGlass();

    group.add(
        roofGlass
    );


    createRoofSideEdges(
        group
    );


    createRoofRearEdge(
        group
    );


    createRoofFrontEdge(
        group
    );


    return group;

}


/* ============================================================
   03 — ROOF PANEL
   ============================================================ */

function createRoofPanel() {

    const geometry =
        new THREE.BoxGeometry(
            RoofConfig.width,
            RoofConfig.height,
            RoofConfig.length,
            24,
            5,
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


        const nx =
            Math.abs(x) /
            (RoofConfig.width / 2);

        const nz =
            Math.abs(z) /
            (RoofConfig.length / 2);


        let newY =
            y;


        /* ----------------------------------------------------
           Rounded roof crown
           ---------------------------------------------------- */

        newY +=
            (
                1 -
                Math.pow(nx, 2)
            ) *
            RoofConfig.crown;


        /* ----------------------------------------------------
           Front-to-rear roof curvature
           ---------------------------------------------------- */

        newY +=
            (
                1 -
                Math.pow(nz, 2)
            ) *
            0.025;


        /* ----------------------------------------------------
           Shoulder taper
           ---------------------------------------------------- */

        let newX =
            x;

        if (
            nx > 0.88
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
                0x060606,

            metalness:
                0.91,

            roughness:
                0.13,

            clearcoat:
                1.0,

            clearcoatRoughness:
                0.045,

            reflectivity:
                1.0

        });


    const roof =
        new THREE.Mesh(
            geometry,
            material
        );


    roof.position.set(
        0,
        RoofConfig.centerY,
        RoofConfig.centerZ
    );


    roof.castShadow =
        true;

    roof.receiveShadow =
        true;


    roof.name =
        "M5_ROOF_PANEL";


    return roof;

}


/* ============================================================
   04 — PANORAMIC ROOF GLASS
   ============================================================ */

function createRoofGlass() {

    const geometry =
        new THREE.BoxGeometry(
            RoofConfig.width * 0.78,
            0.035,
            RoofConfig.length * 0.72,
            18,
            3,
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


        const nx =
            Math.abs(x) /
            (RoofConfig.width * 0.78 / 2);

        const nz =
            Math.abs(z) /
            (RoofConfig.length * 0.72 / 2);


        const curvedY =
            (
                1 -
                Math.pow(nx, 2)
            ) * 0.045 +
            (
                1 -
                Math.pow(nz, 2)
            ) * 0.018;


        position.setXYZ(
            i,
            x,
            y + curvedY,
            z
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x071019,

            metalness:
                0.45,

            roughness:
                0.08,

            transmission:
                0.18,

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


    const glass =
        new THREE.Mesh(
            geometry,
            material
        );


    glass.position.set(
        0,
        RoofConfig.centerY +
        0.065,
        RoofConfig.centerZ
    );


    glass.name =
        "M5_PANORAMIC_ROOF_GLASS";


    glass.castShadow =
        true;


    return glass;

}


/* ============================================================
   05 — ROOF SIDE EDGES
   ============================================================ */

function createRoofSideEdges(
    group
) {

    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const curvePoints = [

                new THREE.Vector3(
                    side * 0.56,
                    0.01,
                    -0.82
                ),

                new THREE.Vector3(
                    side * 0.59,
                    0.04,
                    -0.40
                ),

                new THREE.Vector3(
                    side * 0.60,
                    0.065,
                    0.00
                ),

                new THREE.Vector3(
                    side * 0.59,
                    0.04,
                    0.42
                ),

                new THREE.Vector3(
                    side * 0.55,
                    0.015,
                    0.82
                )

            ];


            const curve =
                new THREE.CatmullRomCurve3(
                    curvePoints
                );


            const geometry =
                new THREE.TubeGeometry(
                    curve,
                    32,
                    0.018,
                    6,
                    false
                );


            const material =
                new THREE.MeshPhysicalMaterial({

                    color:
                        0x151515,

                    metalness:
                        0.88,

                    roughness:
                        0.16,

                    clearcoat:
                        0.8

                });


            const edge =
                new THREE.Mesh(
                    geometry,
                    material
                );


            edge.position.y +=
                RoofConfig.centerY;

            edge.position.z +=
                RoofConfig.centerZ;


            edge.name =
                side < 0
                    ? "M5_ROOF_LEFT_EDGE"
                    : "M5_ROOF_RIGHT_EDGE";


            edge.castShadow =
                true;


            group.add(
                edge
            );

        }
    );

}


/* ============================================================
   06 — FRONT ROOF EDGE
   ============================================================ */

function createRoofFrontEdge(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            RoofConfig.width * 0.86,
            0.035,
            0.045,
            18,
            3,
            4
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x111111,

            metalness:
                0.9,

            roughness:
                0.13,

            clearcoat:
                1.0

        });


    const edge =
        new THREE.Mesh(
            geometry,
            material
        );


    edge.position.set(
        0,
        RoofConfig.centerY +
        0.065,
        RoofConfig.centerZ -
        RoofConfig.length * 0.43
    );


    edge.name =
        "M5_ROOF_FRONT_EDGE";


    group.add(
        edge
    );

}


/* ============================================================
   07 — REAR ROOF EDGE
   ============================================================ */

function createRoofRearEdge(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            RoofConfig.width * 0.82,
            0.04,
            0.05,
            18,
            3,
            4
        );


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x101010,

            metalness:
                0.9,

            roughness:
                0.14,

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
        RoofConfig.centerY +
        0.045,
        RoofConfig.centerZ +
        RoofConfig.length * 0.43
    );


    edge.name =
        "M5_ROOF_REAR_EDGE";


    group.add(
        edge
    );

}


/* ============================================================
   08 — ROOF POSITION
   ============================================================ */

export function setRoofPosition(
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
   09 — ROOF COLOR
   ============================================================ */

export function setRoofColor(
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
   10 — ROOF DIMENSIONS
   ============================================================ */

export function getRoofDimensions() {

    return {

        width:
            RoofConfig.width,

        length:
            RoofConfig.length,

        height:
            RoofConfig.height

    };

}


/* ============================================================
   11 — EXPORT
   ============================================================ */

export {
    RoofConfig
};
