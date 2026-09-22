/* ============================================================
   BMW M5 G90 — INTERIOR
   File: car/interior.js
   ============================================================ */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


const InteriorConfig = {

    cabinWidth:
        1.48,

    dashboardWidth:
        1.43,

    dashboardHeight:
        0.23,

    dashboardZ:
        0.82,

    seatHeight:
        0.48,

    seatWidth:
        0.48,

    seatDepth:
        0.48

};


/* ============================================================
   CREATE INTERIOR
   ============================================================ */

export function createInterior() {

    const group =
        new THREE.Group();

    group.name =
        "M5_INTERIOR";


    createDashboard(
        group
    );


    createCenterConsole(
        group
    );


    createFrontSeats(
        group
    );


    createRearSeats(
        group
    );


    createSteeringWheel(
        group
    );


    createInstrumentCluster(
        group
    );


    createCenterDisplay(
        group
    );


    createDoorInteriorPanels(
        group
    );


    createFloor(
        group
    );


    return group;

}


/* ============================================================
   DASHBOARD
   ============================================================ */

function createDashboard(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            InteriorConfig.dashboardWidth,
            InteriorConfig.dashboardHeight,
            0.18,
            16,
            6,
            8
        );


    const dashboard =
        new THREE.Mesh(
            geometry,
            createInteriorMaterial()
        );


    dashboard.position.set(
        0,
        0.72,
        InteriorConfig.dashboardZ
    );


    dashboard.name =
        "M5_DASHBOARD";


    dashboard.castShadow =
        true;

    dashboard.receiveShadow =
        true;


    group.add(
        dashboard
    );


    const trimGeometry =
        new THREE.BoxGeometry(
            1.35,
            0.025,
            0.025,
            12,
            2,
            2
        );


    const trim =
        new THREE.Mesh(
            trimGeometry,
            createTrimMaterial()
        );


    trim.position.set(
        0,
        0.805,
        0.735
    );


    trim.name =
        "M5_DASHBOARD_TRIM";


    group.add(
        trim
    );

}


/* ============================================================
   CENTER CONSOLE
   ============================================================ */

function createCenterConsole(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            0.42,
            0.13,
            0.76,
            12,
            5,
            8
        );


    const console =
        new THREE.Mesh(
            geometry,
            createInteriorMaterial()
        );


    console.position.set(
        0,
        0.49,
        0.08
    );


    console.rotation.x =
        -0.05;


    console.name =
        "M5_CENTER_CONSOLE";


    console.castShadow =
        true;

    console.receiveShadow =
        true;


    group.add(
        console
    );


    createConsoleTrim(
        group
    );


    createGearSelector(
        group
    );

}


/* ============================================================
   CONSOLE TRIM
   ============================================================ */

function createConsoleTrim(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            0.31,
            0.018,
            0.45,
            8,
            2,
            5
        );


    const trim =
        new THREE.Mesh(
            geometry,
            createTrimMaterial()
        );


    trim.position.set(
        0,
        0.57,
        0.04
    );


    trim.name =
        "M5_CENTER_CONSOLE_TRIM";


    group.add(
        trim
    );

}


/* ============================================================
   GEAR SELECTOR
   ============================================================ */

function createGearSelector(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            0.10,
            0.08,
            0.18,
            6,
            4,
            6
        );


    const selector =
        new THREE.Mesh(
            geometry,
            createBlackMaterial()
        );


    selector.position.set(
        0,
        0.64,
        -0.02
    );


    selector.name =
        "M5_GEAR_SELECTOR";


    group.add(
        selector
    );

}


/* ============================================================
   FRONT SEATS
   ============================================================ */

function createFrontSeats(
    group
) {

    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const seat =
                createSeat(
                    side
                );


            seat.position.set(
                side * 0.43,
                InteriorConfig.seatHeight,
                0.02
            );


            seat.name =
                side < 0
                    ? "M5_DRIVER_SEAT"
                    : "M5_FRONT_PASSENGER_SEAT";


            group.add(
                seat
            );

        }
    );

}


/* ============================================================
   CREATE SINGLE SEAT
   ============================================================ */

function createSeat(
    side
) {

    const group =
        new THREE.Group();


    const cushionGeometry =
        new THREE.BoxGeometry(
            InteriorConfig.seatWidth,
            0.13,
            InteriorConfig.seatDepth,
            12,
            5,
            10
        );


    const cushion =
        new THREE.Mesh(
            cushionGeometry,
            createSeatMaterial()
        );


    cushion.position.y =
        0;


    cushion.rotation.x =
        -0.025;


    cushion.name =
        "M5_SEAT_CUSHION";


    group.add(
        cushion
    );


    const backGeometry =
        new THREE.BoxGeometry(
            InteriorConfig.seatWidth,
            0.62,
            0.13,
            12,
            8,
            5
        );


    const back =
        new THREE.Mesh(
            backGeometry,
            createSeatMaterial()
        );


    back.position.set(
        0,
        0.32,
        0.20
    );


    back.rotation.x =
        -0.08;


    back.name =
        "M5_SEAT_BACK";


    group.add(
        back
    );


    createSeatBolsters(
        group
    );


    createHeadrest(
        group
    );


    return group;

}


/* ============================================================
   SEAT BOLSTERS
   ============================================================ */

function createSeatBolsters(
    group
) {

    const material =
        createSeatMaterial();


    const sides = [
        -1,
        1
    ];


    sides.forEach(
        side => {

            const geometry =
                new THREE.BoxGeometry(
                    0.075,
                    0.16,
                    0.43,
                    7,
                    4,
                    6
                );


            const bolster =
                new THREE.Mesh(
                    geometry,
                    material
                );


            bolster.position.set(
                side * 0.225,
                0.065,
                0
            );


            bolster.rotation.z =
                side * 0.08;


            bolster.name =
                "M5_SEAT_BOLSTER";


            group.add(
                bolster
            );

        }
    );

}


/* ============================================================
   HEADREST
   ============================================================ */

function createHeadrest(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            0.31,
            0.24,
            0.13,
            10,
            6,
            5
        );


    const headrest =
        new THREE.Mesh(
            geometry,
            createSeatMaterial()
        );


    headrest.position.set(
        0,
        0.68,
        0.19
    );


    headrest.name =
        "M5_HEADREST";


    group.add(
        headrest
    );

}


/* ============================================================
   REAR SEATS
   ============================================================ */

function createRearSeats(
    group
) {

    const cushionGeometry =
        new THREE.BoxGeometry(
            1.18,
            0.13,
            0.44,
            16,
            5,
            8
        );


    const cushion =
        new THREE.Mesh(
            cushionGeometry,
            createSeatMaterial()
        );


    cushion.position.set(
        0,
        0.43,
        -0.66
    );


    cushion.name =
        "M5_REAR_SEAT_CUSHION";


    group.add(
        cushion
    );


    const backGeometry =
        new THREE.BoxGeometry(
            1.18,
            0.48,
            0.13,
            16,
            8,
            5
        );


    const back =
        new THREE.Mesh(
            backGeometry,
            createSeatMaterial()
        );


    back.position.set(
        0,
        0.67,
        -0.82
    );


    back.rotation.x =
        -0.07;


    back.name =
        "M5_REAR_SEAT_BACK";


    group.add(
        back
    );


    createRearCenterArmrest(
        group
    );

}


/* ============================================================
   REAR CENTER ARMREST
   ============================================================ */

function createRearCenterArmrest(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            0.30,
            0.08,
            0.28,
            8,
            4,
            5
        );


    const armrest =
        new THREE.Mesh(
            geometry,
            createBlackMaterial()
        );


    armrest.position.set(
        0,
        0.73,
        -0.73
    );


    armrest.name =
        "M5_REAR_CENTER_ARMREST";


    group.add(
        armrest
    );

}


/* ============================================================
   STEERING WHEEL
   ============================================================ */

function createSteeringWheel(
    group
) {

    const outerGeometry =
        new THREE.TorusGeometry(
            0.19,
            0.035,
            10,
            32
        );


    const wheel =
        new THREE.Mesh(
            outerGeometry,
            createLeatherMaterial()
        );


    wheel.position.set(
        -0.43,
        0.80,
        0.67
    );


    wheel.rotation.x =
        Math.PI / 2;


    wheel.rotation.z =
        -0.10;


    wheel.name =
        "M5_STEERING_WHEEL";


    group.add(
        wheel
    );


    createSteeringHub(
        group
    );


    createSteeringSpokes(
        group
    );

}


/* ============================================================
   STEERING HUB
   ============================================================ */

function createSteeringHub(
    group
) {

    const geometry =
        new THREE.CylinderGeometry(
            0.075,
            0.075,
            0.055,
            20
        );


    const hub =
        new THREE.Mesh(
            geometry,
            createBlackMaterial()
        );


    hub.rotation.x =
        Math.PI / 2;


    hub.position.set(
        -0.43,
        0.80,
        0.67
    );


    hub.name =
        "M5_STEERING_HUB";


    group.add(
        hub
    );

}


/* ============================================================
   STEERING SPOKES
   ============================================================ */

function createSteeringSpokes(
    group
) {

    const material =
        createTrimMaterial();


    const angles = [
        0,
        Math.PI * 0.66,
        Math.PI * 1.34
    ];


    angles.forEach(
        (angle, index) => {

            const geometry =
                new THREE.BoxGeometry(
                    0.025,
                    0.18,
                    0.035,
                    4,
                    4,
                    3
                );


            const spoke =
                new THREE.Mesh(
                    geometry,
                    material
                );


            spoke.position.set(
                -0.43,
                0.80,
                0.67
            );


            spoke.rotation.z =
                angle;


            spoke.name =
                "M5_STEERING_SPOKE_" +
                (index + 1);


            group.add(
                spoke
            );

        }
    );

}


/* ============================================================
   INSTRUMENT CLUSTER
   ============================================================ */

function createInstrumentCluster(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            0.43,
            0.17,
            0.035,
            8,
            4,
            2
        );


    const cluster =
        new THREE.Mesh(
            geometry,
            createScreenMaterial()
        );


    cluster.position.set(
        -0.43,
        0.91,
        0.74
    );


    cluster.name =
        "M5_DIGITAL_INSTRUMENT_CLUSTER";


    group.add(
        cluster
    );

}


/* ============================================================
   CENTER DISPLAY
   ============================================================ */

function createCenterDisplay(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            0.76,
            0.20,
            0.035,
            10,
            4,
            2
        );


    const display =
        new THREE.Mesh(
            geometry,
            createScreenMaterial()
        );


    display.position.set(
        0.08,
        0.91,
        0.74
    );


    display.rotation.x =
        -0.08;


    display.name =
        "M5_CENTER_INFOTAINMENT_DISPLAY";


    group.add(
        display
    );

}


/* ============================================================
   DOOR INTERIOR PANELS
   ============================================================ */

function createDoorInteriorPanels(
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
                    2.10,
                    0.50,
                    0.08,
                    12,
                    6,
                    3
                );


            const panel =
                new THREE.Mesh(
                    geometry,
                    createInteriorMaterial()
                );


            panel.position.set(
                0,
                0.60,
                side * 0.79
            );


            panel.rotation.y =
                side *
                0.015;


            panel.name =
                side < 0
                    ? "M5_LEFT_DOOR_INTERIOR"
                    : "M5_RIGHT_DOOR_INTERIOR";


            group.add(
                panel
            );

        }
    );

}


/* ============================================================
   FLOOR
   ============================================================ */

function createFloor(
    group
) {

    const geometry =
        new THREE.BoxGeometry(
            1.34,
            0.055,
            2.25,
            12,
            2,
            12
        );


    const floor =
        new THREE.Mesh(
            geometry,
            createFloorMaterial()
        );


    floor.position.set(
        0,
        0.22,
        -0.05
    );


    floor.name =
        "M5_INTERIOR_FLOOR";


    floor.receiveShadow =
        true;


    group.add(
        floor
    );

}


/* ============================================================
   MATERIALS
   ============================================================ */

function createInteriorMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x080808,

        metalness:
            0.35,

        roughness:
            0.48,

        clearcoat:
            0.25

    });

}


function createSeatMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x0b0b0b,

        metalness:
            0.05,

        roughness:
            0.72,

        clearcoat:
            0.25,

        clearcoatRoughness:
            0.35

    });

}


function createLeatherMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x050505,

        metalness:
            0.08,

        roughness:
            0.62,

        clearcoat:
            0.35

    });

}


function createBlackMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x010101,

        metalness:
            0.55,

        roughness:
            0.35,

        clearcoat:
            0.55

    });

}


function createTrimMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x303030,

        metalness:
            0.88,

        roughness:
            0.18,

        clearcoat:
            0.8

    });

}


function createScreenMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x071016,

        emissive:
            0x08232d,

        emissiveIntensity:
            0.8,

        metalness:
            0.15,

        roughness:
            0.16,

        clearcoat:
            1.0

    });

}


function createFloorMaterial() {

    return new THREE.MeshPhysicalMaterial({

        color:
            0x020202,

        metalness:
            0.05,

        roughness:
            0.88

    });

}


/* ============================================================
   POSITION
   ============================================================ */

export function setInteriorPosition(
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

export function setInteriorScale(
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

export function setInteriorVisible(
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
    InteriorConfig
};
