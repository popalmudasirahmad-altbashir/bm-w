/* ============================================================
   BMW M5 G90 — VEHICLE DIMENSIONS
   File: car/dimensions.js

   Official BMW M5 G90 dimensions converted from millimeters
   to meters for the Three.js 3D scene.
   ============================================================ */


/* ============================================================
   01 — OFFICIAL DIMENSIONS
   ============================================================ */

export const M5_DIMENSIONS = {

    /* --------------------------------------------------------
       Main body dimensions
       -------------------------------------------------------- */

    length:
        5.096,

    width:
        1.970,

    height:
        1.510,


    /* --------------------------------------------------------
       Wheelbase
       -------------------------------------------------------- */

    wheelbase:
        3.006,


    /* --------------------------------------------------------
       Track widths
       -------------------------------------------------------- */

    frontTrack:
        1.684,

    rearTrack:
        1.660,


    /* --------------------------------------------------------
       Ground clearance
       -------------------------------------------------------- */

    groundClearance:
        0.115,


    /* --------------------------------------------------------
       Body overhangs
       -------------------------------------------------------- */

    frontOverhang:
        0.934,

    rearOverhang:
        1.156,


    /* --------------------------------------------------------
       Width including exterior mirrors
       -------------------------------------------------------- */

    mirrorToMirror:
        2.156

};


/* ============================================================
   02 — BODY REFERENCE POINTS
   ============================================================ */

export const M5_BODY = {

    front:
        M5_DIMENSIONS.length / 2,

    rear:
        -M5_DIMENSIONS.length / 2,

    left:
        -M5_DIMENSIONS.width / 2,

    right:
        M5_DIMENSIONS.width / 2,

    center:
        0

};


/* ============================================================
   03 — WHEELBASE POSITIONS
   ============================================================ */

export const M5_WHEEL_POSITIONS = {

    frontAxle:
        M5_DIMENSIONS.wheelbase / 2,

    rearAxle:
        -M5_DIMENSIONS.wheelbase / 2

};


/* ============================================================
   04 — TRACK POSITIONS
   ============================================================ */

export const M5_TRACK = {

    frontHalf:
        M5_DIMENSIONS.frontTrack / 2,

    rearHalf:
        M5_DIMENSIONS.rearTrack / 2

};


/* ============================================================
   05 — WHEEL CENTER POSITIONS
   ============================================================ */

export const M5_WHEELS = {

    frontLeft: {

        x:
            -M5_TRACK.frontHalf,

        y:
            0.36,

        z:
            M5_WHEEL_POSITIONS.frontAxle

    },

    frontRight: {

        x:
            M5_TRACK.frontHalf,

        y:
            0.36,

        z:
            M5_WHEEL_POSITIONS.frontAxle

    },

    rearLeft: {

        x:
            -M5_TRACK.rearHalf,

        y:
            0.36,

        z:
            M5_WHEEL_POSITIONS.rearAxle

    },

    rearRight: {

        x:
            M5_TRACK.rearHalf,

        y:
            0.36,

        z:
            M5_WHEEL_POSITIONS.rearAxle

    }

};


/* ============================================================
   06 — GENERAL VEHICLE HEIGHTS
   ============================================================ */

export const M5_HEIGHTS = {

    ground:
        0,

    chassis:
        0.30,

    wheelCenter:
        0.36,

    lowerBody:
        0.43,

    doorBottom:
        0.52,

    windowBase:
        0.82,

    roof:
        1.46,

    highestPoint:
        M5_DIMENSIONS.height

};


/* ============================================================
   07 — BODY SECTION LENGTHS
   ============================================================ */

export const M5_SECTIONS = {

    frontOverhang:
        M5_DIMENSIONS.frontOverhang,

    wheelbase:
        M5_DIMENSIONS.wheelbase,

    rearOverhang:
        M5_DIMENSIONS.rearOverhang,

    totalLength:
        M5_DIMENSIONS.length

};


/* ============================================================
   08 — MIRROR DIMENSIONS
   ============================================================ */

export const M5_MIRRORS = {

    totalWidth:
        M5_DIMENSIONS.mirrorToMirror,

    halfWidth:
        M5_DIMENSIONS.mirrorToMirror / 2,

    bodyWidth:
        M5_DIMENSIONS.width,

    extensionPerSide:
        (
            M5_DIMENSIONS.mirrorToMirror -
            M5_DIMENSIONS.width
        ) / 2

};


/* ============================================================
   09 — SCALE HELPERS
   ============================================================ */

export const M5_SCALE = {

    metersToMillimeters(
        value
    ) {

        return value * 1000;

    },


    millimetersToMeters(
        value
    ) {

        return value / 1000;

    }

};


/* ============================================================
   10 — DIMENSION VALIDATION
   ============================================================ */

export function validateM5Dimensions() {

    const requiredValues = [

        M5_DIMENSIONS.length,

        M5_DIMENSIONS.width,

        M5_DIMENSIONS.height,

        M5_DIMENSIONS.wheelbase,

        M5_DIMENSIONS.frontTrack,

        M5_DIMENSIONS.rearTrack,

        M5_DIMENSIONS.groundClearance

    ];


    return requiredValues.every(
        value =>
            Number.isFinite(value) &&
            value > 0
    );

}


/* ============================================================
   11 — DIMENSION SUMMARY
   ============================================================ */

export function getM5Dimensions() {

    return {

        length:
            M5_DIMENSIONS.length,

        width:
            M5_DIMENSIONS.width,

        height:
            M5_DIMENSIONS.height,

        wheelbase:
            M5_DIMENSIONS.wheelbase,

        frontTrack:
            M5_DIMENSIONS.frontTrack,

        rearTrack:
            M5_DIMENSIONS.rearTrack,

        groundClearance:
            M5_DIMENSIONS.groundClearance,

        mirrorToMirror:
            M5_DIMENSIONS.mirrorToMirror

    };

}
