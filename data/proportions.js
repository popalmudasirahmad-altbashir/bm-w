// data/proportions.js
// BMW M5 G90 proportional reference data.
// Real-world dimensions are stored in meters.
// The normalized values are used by the procedural 3D model.

export const M5_PROPORTIONS = Object.freeze({
  // Official vehicle dimensions
  real: {
    length: 5.096,
    width: 1.970,
    height: 1.510,

    wheelbase: 3.006,

    frontTrack: 1.684,
    rearTrack: 1.660,

    groundClearance: 0.115,

    frontOverhang: 0.934,
    rearOverhang: 1.156
  },

  // Main procedural-model proportions.
  // The model length is normalized to approximately 4.00 units.
  normalized: {
    length: 4.000,

    width: 1.546,
    height: 1.185,

    wheelbase: 2.361,

    frontTrack: 1.322,
    rearTrack: 1.303,

    groundClearance: 0.090,

    frontOverhang: 0.733,
    rearOverhang: 0.908
  },

  // Body relationship ratios
  ratios: {
    widthToLength: 1.970 / 5.096,
    heightToLength: 1.510 / 5.096,
    wheelbaseToLength: 3.006 / 5.096,

    frontTrackToWidth: 1.684 / 1.970,
    rearTrackToWidth: 1.660 / 1.970,

    groundClearanceToHeight: 0.115 / 1.510,

    frontOverhangToLength: 0.934 / 5.096,
    rearOverhangToLength: 1.156 / 5.096
  },

  // Useful body-section proportions
  body: {
    cabinLength: 2.150,
    hoodLength: 1.020,
    trunkLength: 0.820,

    frontBodyHeight: 0.690,
    rearBodyHeight: 0.720,

    shoulderWidth: 1.820,
    cabinWidth: 1.720,

    roofLength: 1.780,
    roofHeight: 1.120,

    windshieldLength: 0.760,
    rearGlassLength: 0.610
  },

  // Wheel and tire reference proportions
  wheels: {
    frontCenterX: 0.661,
    rearCenterX: -0.700,

    wheelRadius: 0.360,
    tireOuterRadius: 0.365,

    tireWidthFront: 0.280,
    tireWidthRear: 0.285,

    wheelDiameter: 0.720
  },

  // Ground/body reference positions
  coordinates: {
    bodyCenterY: 0.610,
    wheelCenterY: 0.365,

    frontWheelZ: 1.180,
    rearWheelZ: -1.180,

    frontAxleZ: 1.180,
    rearAxleZ: -1.181,

    roofCenterY: 1.180,

    groundY: 0.000
  },

  // Visual proportions used for procedural shaping
  visual: {
    hoodSlope: 0.115,
    roofSlopeFront: 0.185,
    roofSlopeRear: 0.125,

    frontNoseRatio: 0.180,
    rearNoseRatio: 0.155,

    shoulderBulge: 0.075,
    lowerBodyInset: 0.055,

    wheelArchClearance: 0.035,

    frontOverhangRatio: 0.183,
    rearOverhangRatio: 0.227
  }
});

export const M5_MODEL_SCALE =
  M5_PROPORTIONS.normalized.length /
  M5_PROPORTIONS.real.length;

export const M5_REAL_TO_MODEL = Object.freeze({
  x: M5_MODEL_SCALE,
  y: M5_MODEL_SCALE,
  z: M5_MODEL_SCALE
});

export function realToModel(value) {
  return value * M5_MODEL_SCALE;
}

export function modelToReal(value) {
  return value / M5_MODEL_SCALE;
}

export function getWheelPosition(side, axle) {
  const x = side === "left"
    ? -M5_PROPORTIONS.wheels[
        axle === "front" ? "frontCenterX" : "rearCenterX"
      ]
    : M5_PROPORTIONS.wheels[
        axle === "front" ? "frontCenterX" : "rearCenterX"
      ];

  const z = axle === "front"
    ? M5_PROPORTIONS.coordinates.frontWheelZ
    : M5_PROPORTIONS.coordinates.rearWheelZ;

  return {
    x,
    y: M5_PROPORTIONS.coordinates.wheelCenterY,
    z
  };
}

export function getVehicleCenter() {
  return {
    x: 0,
    y: M5_PROPORTIONS.coordinates.bodyCenterY,
    z: 0
  };
}

export default M5_PROPORTIONS;
