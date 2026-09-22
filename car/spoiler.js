/* ============================================================
   BMW M5 G90 — REAR SPOILER
   File: car/spoiler.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


const SpoilerConfig = {

    width:
        1.52,

    height:
        0.085,

    depth:
        0.18,

    z:
        -1.72,

    y:
        0.94,

    tilt:
        0.055

};


/* ============================================================
   CREATE SPOILER
   ============================================================ */

export function createSpoiler() {

    const group =
        new THREE.Group();

    group.name =
        "M5_REAR_SPOILER";


    createMainSpoiler(
        group
    );


    createSpoilerSupports(
        group
    );


    createSpoilerLowerLip(
        group
    );


    createSpoilerEndPlates(
        group
    );


    return group;

}


/* ============================================================
   MAIN SPOILER
   ============================================================ */

function createMainSpoiler(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            SpoilerConfig.width,
            SpoilerConfig.height,
            SpoilerConfig.depth,
            24,
            6,
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

        const normalized =
            x /
            (
                SpoilerConfig.width /
                2
            );


        position.setY(
            i,
            position.getY(i) +
            Math.pow(
                Math.abs(normalized),
                2
            ) *
            0.035
        );


        position.setZ(
            i,
            position.getZ(i) +
            Math.pow(
                normalized,
                2
            ) *
            0.025
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const spoiler =
        new THREE.Mesh(
            geometry,
            createCarbonMaterial()
        );


    spoiler.position.set(
        0,
        SpoilerConfig.y,
        SpoilerConfig.z
    );


    spoiler.rotation.x =
        SpoilerConfig.tilt;


    spoiler.name =
        "M5_MAIN_REAR_SPOILER";


    spoiler.castShadow =
        true;

    spoiler.receiveShadow =
        true;


    group.add(
        spoiler
    );

}


/* ============================================================
   SPOILER SUPPORTS
   ============================================================ */

function createSpoilerSupports(
    group
) {

    const material =
        createCarbonMaterial();


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const geometry =
                new THREE.BoxGeometry(
                    0.105,
                    0.16,
                    0.075,
                    8,
                    6,
                    5
                );


            const support =
                new THREE.Mesh(
                    geometry,
                    material
                );


            support.position.set(
                side * 0.54,
                0.845,
                -1.74
            );


            support.rotation.x =
                -0.12;


            support.name =
                side < 0
                    ? "M5_LEFT_SPOILER_SUPPORT"
                    : "M5_RIGHT_SPOILER_SUPPORT";


            support.castShadow =
                true;


            group.add(
                support
            );

        }
    );

}


/* ============================================================
   LOWER SPOILER LIP
   ============================================================ */

function createSpoilerLowerLip(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            1.42,
            0.045,
            0.075,
            20,
            3,
            4
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
            0.71;


        position.setZ(
            i,
            position.getZ(i) +
            Math.pow(
                normalized,
                2
            ) *
            0.018
        );

    }


    position.needsUpdate =
        true;

    geometry.computeVertexNormals();


    const lip =
        new THREE.Mesh(
            geometry,
            createCarbonMaterial()
        );


    lip.position.set(
        0,
        0.885,
        -1.82
    );


    lip.rotation.x =
        0.025;


    lip.name =
        "M5_SPOILER_LOWER_LIP";


    group.add(
        lip
    );

}


/* ============================================================
   SPOILER END PLATES
   ============================================================ */

function createSpoilerEndPlates(
    group
) {

    const material =
        createCarbonMaterial();


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const geometry =
                new THREE.BoxGeometry(
                    0.045,
                    0.105,
                    0.19,
                    5,
                    5,
                    5
                );


            const plate =
                new THREE.Mesh(
                    geometry,
                    material
                );


            plate.position.set(
                side * 0.765,
                0.935,
                -1.72
            );


            plate.rotation.x =
                0.055;


            plate.name =
                side < 0
                    ? "M5_LEFT_SPOILER_END_PLATE"
                    : "M5_RIGHT_SPOILER_END_PLATE";


            plate.castShadow =
                true;


            group.add(
                plate
            );

        }
    );

}


/* ============================================================
   CARBON MATERIAL
   ============================================================ */

function createCarbonMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x070707,

        metalness:
            0.82,

        roughness:
            0.18,

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

export function setSpoilerPosition(
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

export function setSpoilerScale(
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
   VISIBILITY
   ============================================================ */

export function setSpoilerVisible(
    group,
    visible
) {

    if (!group) {
        return;
    }


    group.visible =
        visible;

}


/* ============================================================
   EXPORT
   ============================================================ */

export {
    SpoilerConfig
};
