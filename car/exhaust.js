/* ============================================================
   BMW M5 G90 — EXHAUST SYSTEM
   File: car/exhaust.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


const ExhaustConfig = {

    pipeRadius:
        0.055,

    pipeLength:
        0.18,

    pipeSpacing:
        0.20,

    rearZ:
        -2.08,

    centerY:
        0.40,

    outerOffset:
        0.34

};


/* ============================================================
   CREATE EXHAUST SYSTEM
   ============================================================ */

export function createExhaust() {

    const group =
        new THREE.Group();

    group.name =
        "M5_EXHAUST_SYSTEM";


    createExhaustTips(
        group
    );


    createExhaustSurrounds(
        group
    );


    createExhaustInnerDarkness(
        group
    );


    createUnderbodyExhausts(
        group
    );


    return group;

}


/* ============================================================
   EXHAUST TIPS
   ============================================================ */

function createExhaustTips(
    group
) {

    const positions = [

        -0.56,
        -0.18,
         0.18,
         0.56

    ];


    positions.forEach(
        (x, index) => {

            const outerGeometry =
                new THREE.CylinderGeometry(
                    ExhaustConfig.pipeRadius,
                    ExhaustConfig.pipeRadius * 1.08,
                    ExhaustConfig.pipeLength,
                    24,
                    4
                );


            const outer =
                new THREE.Mesh(
                    outerGeometry,
                    createChromeMaterial()
                );


            outer.rotation.x =
                Math.PI / 2;


            outer.position.set(
                x,
                ExhaustConfig.centerY,
                ExhaustConfig.rearZ
            );


            outer.name =
                "M5_EXHAUST_TIP_" +
                (index + 1);


            outer.castShadow =
                true;

            outer.receiveShadow =
                true;


            group.add(
                outer
            );


            const innerGeometry =
                new THREE.CylinderGeometry(
                    ExhaustConfig.pipeRadius * 0.66,
                    ExhaustConfig.pipeRadius * 0.72,
                    0.012,
                    24,
                    2
                );


            const inner =
                new THREE.Mesh(
                    innerGeometry,
                    createInnerMaterial()
                );


            inner.rotation.x =
                Math.PI / 2;


            inner.position.set(
                x,
                ExhaustConfig.centerY,
                ExhaustConfig.rearZ -
                0.092
            );


            inner.name =
                "M5_EXHAUST_TIP_INNER_" +
                (index + 1);


            group.add(
                inner
            );

        }
    );

}


/* ============================================================
   EXHAUST SURROUNDS
   ============================================================ */

function createExhaustSurrounds(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x090909,

            metalness:
                0.86,

            roughness:
                0.20,

            clearcoat:
                0.85,

            clearcoatRoughness:
                0.06

        });


    const positions = [
        -0.56,
        -0.18,
         0.18,
         0.56
    ];


    positions.forEach(
        (x, index) => {

            const geometry =
                new THREE.TorusGeometry(
                    0.066,
                    0.012,
                    8,
                    24
                );


            const ring =
                new THREE.Mesh(
                    geometry,
                    material
                );


            ring.rotation.x =
                Math.PI / 2;


            ring.position.set(
                x,
                ExhaustConfig.centerY,
                ExhaustConfig.rearZ -
                0.095
            );


            ring.name =
                "M5_EXHAUST_RING_" +
                (index + 1);


            group.add(
                ring
            );

        }
    );

}


/* ============================================================
   EXHAUST INNER DARKNESS
   ============================================================ */

function createExhaustInnerDarkness(
    group
) {

    const material =
        new THREE.MeshBasicMaterial({

            color:
                0x000000,

            side:
                THREE.DoubleSide

        });


    const positions = [
        -0.56,
        -0.18,
         0.18,
         0.56
    ];


    positions.forEach(
        (x, index) => {

            const geometry =
                new THREE.CircleGeometry(
                    0.034,
                    20
                );


            const disk =
                new THREE.Mesh(
                    geometry,
                    material
                );


            disk.position.set(
                x,
                ExhaustConfig.centerY,
                ExhaustConfig.rearZ -
                0.103
            );


            disk.rotation.y =
                Math.PI;


            disk.name =
                "M5_EXHAUST_DARK_CORE_" +
                (index + 1);


            group.add(
                disk
            );

        }
    );

}


/* ============================================================
   UNDERBODY EXHAUST PIPES
   ============================================================ */

function createUnderbodyExhausts(
    group
) {

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0x181818,

            metalness:
                0.82,

            roughness:
                0.30,

            clearcoat:
                0.45

        });


    const positions = [
        -0.56,
        -0.18,
         0.18,
         0.56
    ];


    positions.forEach(
        (x, index) => {

            const geometry =
                new THREE.CylinderGeometry(
                    0.035,
                    0.042,
                    0.75,
                    16,
                    3
                );


            const pipe =
                new THREE.Mesh(
                    geometry,
                    material
                );


            pipe.rotation.x =
                Math.PI / 2;


            pipe.position.set(
                x,
                0.37,
                -1.72
            );


            pipe.name =
                "M5_UNDERBODY_EXHAUST_PIPE_" +
                (index + 1);


            pipe.castShadow =
                true;


            group.add(
                pipe
            );

        }
    );

}


/* ============================================================
   CHROME MATERIAL
   ============================================================ */

function createChromeMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x9b9b9b,

        metalness:
            1.0,

        roughness:
            0.13,

        clearcoat:
            1.0,

        clearcoatRoughness:
            0.04,

        reflectivity:
            1.0

    });

}


/* ============================================================
   INNER MATERIAL
   ============================================================ */

function createInnerMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x020202,

        metalness:
            0.35,

        roughness:
            0.62,

        clearcoat:
            0.15

    });

}


/* ============================================================
   POSITION
   ============================================================ */

export function setExhaustPosition(
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

export function setExhaustScale(
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
   EXPORT
   ============================================================ */

export {
    ExhaustConfig
};
