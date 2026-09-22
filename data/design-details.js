// data/design-details.js
// BMW M5 G90 procedural design-detail specifications.
// These values are used to keep the generated model visually consistent.

export const M5_DESIGN_DETAILS = Object.freeze({
  identity: {
    generation: "G90",
    bodyStyle: "High-performance luxury sedan",
    drivetrainLayout: "Longitudinal AWD",
    engineLayout: "Front-engine V8 hybrid",
    designLanguage: "Modern aggressive executive sedan"
  },

  body: {
    sedanProfile: true,

    frontCharacter: {
      noseLength: 0.34,
      hoodRise: 0.11,
      shoulderWidth: 0.08,
      lowerNoseDepth: 0.10,
      centerlineSharpness: 0.72
    },

    sideCharacter: {
      shoulderLineHeight: 0.78,
      shoulderLineStrength: 0.82,
      lowerDoorContour: 0.055,
      rockerDepth: 0.075,
      rearHaunchStrength: 0.14
    },

    rearCharacter: {
      trunkHeight: 0.83,
      trunkLength: 0.43,
      diffuserDepth: 0.13,
      bumperDepth: 0.12,
      rearShoulderWidth: 0.09
    }
  },

  hood: {
    centerPowerLine: {
      width: 0.055,
      height: 0.028,
      length: 0.92
    },

    sideCreases: {
      distanceFromCenter: 0.34,
      width: 0.032,
      height: 0.022,
      length: 0.86
    },

    frontEdge: {
      thickness: 0.035,
      curvature: 0.08
    }
  },

  grille: {
    type: "Vertical kidney",
    totalWidth: 0.58,
    totalHeight: 0.46,

    leftWidth: 0.255,
    rightWidth: 0.255,
    centerGap: 0.070,

    frameThickness: 0.035,
    depth: 0.045,

    verticalBarCount: 7,
    horizontalBarCount: 0,

    slant: 0.035,
    lowerTaper: 0.08,

    darkInterior: true,
    glossFrame: true
  },

  headlights: {
    shape: "Slim adaptive LED",
    width: 0.34,
    height: 0.145,
    depth: 0.045,

    outerAngle: -0.08,
    innerAngle: 0.035,

    daytimeRunningLights: true,
    runningLightSegments: 2,

    projectorCount: 2,

    eyebrow: {
      enabled: true,
      height: 0.026,
      width: 0.245
    },

    glowIntensity: 2.6
  },

  taillights: {
    width: 0.34,
    height: 0.105,
    depth: 0.035,

    outerAngle: 0.06,
    innerAngle: -0.025,

    horizontalSignature: true,
    glowIntensity: 2.1
  },

  windows: {
    windshield: {
      rake: 0.43,
      width: 1.28,
      height: 0.46
    },

    frontSide: {
      width: 0.55,
      height: 0.39,
      rake: 0.12
    },

    rearSide: {
      width: 0.52,
      height: 0.36,
      rake: -0.10
    },

    rearGlass: {
      width: 1.22,
      height: 0.42,
      rake: -0.36
    },

    pillarThickness: {
      a: 0.035,
      b: 0.045,
      c: 0.050
    },

    tint: 0.22
  },

  doors: {
    frontLength: 0.98,
    rearLength: 0.86,

    upperLineHeight: 0.79,
    lowerLineHeight: 0.55,

    handleHeight: 0.78,

    handleLength: 0.145,
    handleHeight: 0.028,

    doorGap: 0.014,

    contour: {
      upperBulge: 0.032,
      centerInset: 0.018,
      lowerBulge: 0.042
    }
  },

  mirrors: {
    housingLength: 0.18,
    housingWidth: 0.105,
    housingHeight: 0.075,

    stemLength: 0.075,

    angle: 0.08,

    aerodynamicCut: 0.035,

    indicator: {
      enabled: true,
      length: 0.095,
      height: 0.012
    }
  },

  wheelArches: {
    frontRadius: 0.405,
    rearRadius: 0.410,

    openingWidthFront: 0.285,
    openingWidthRear: 0.290,

    archThickness: 0.042,

    frontPosition: 1.18,
    rearPosition: -1.18
  },

  wheels: {
    front: {
      diameter: 0.72,
      width: 0.28,
      sidewall: 0.105,
      spokeCount: 10
    },

    rear: {
      diameter: 0.72,
      width: 0.285,
      sidewall: 0.105,
      spokeCount: 10
    },

    rim: {
      outerRadius: 0.315,
      innerRadius: 0.235,
      lipDepth: 0.035,

      centerCapRadius: 0.065
    },

    brake: {
      frontRotorRadius: 0.305,
      rearRotorRadius: 0.295,

      frontRotorThickness: 0.028,
      rearRotorThickness: 0.025,

      caliperLength: 0.165,
      caliperWidth: 0.055
    }
  },

  sideSkirts: {
    length: 2.35,
    width: 0.095,
    height: 0.085,

    upperInset: 0.025,
    lowerExtension: 0.035
  },

  bumpers: {
    front: {
      width: 1.58,
      height: 0.31,
      depth: 0.15,

      centerIntakeWidth: 0.42,
      sideIntakeWidth: 0.28,

      splitterThickness: 0.028,
      splitterExtension: 0.055
    },

    rear: {
      width: 1.58,
      height: 0.30,
      depth: 0.14,

      diffuserWidth: 1.08,
      diffuserHeight: 0.12,

      diffuserDepth: 0.08
    }
  },

  exhaust: {
    outletCount: 4,

    outerDiameter: 0.125,
    innerDiameter: 0.092,

    outletDepth: 0.105,

    leftOuterOffset: -0.56,
    leftInnerOffset: -0.185,
    rightInnerOffset: 0.185,
    rightOuterOffset: 0.56
  },

  spoiler: {
    type: "Integrated lip",

    width: 1.32,
    depth: 0.105,
    height: 0.035,

    centerRise: 0.025,
    edgeRise: 0.012,

    angle: 0.045
  },

  roof: {
    panoramicGlass: true,

    glassLength: 1.42,
    glassWidth: 1.16,

    frontRake: 0.22,
    rearRake: 0.18,

    roofPeakHeight: 1.18
  },

  interior: {
    dashboardWidth: 1.48,
    dashboardHeight: 0.34,

    displayWidth: 1.08,
    displayHeight: 0.24,

    steeringWheelDiameter: 0.29,
    steeringWheelThickness: 0.035,

    centerConsoleLength: 0.92,
    centerConsoleWidth: 0.20,

    frontSeatWidth: 0.43,
    rearSeatWidth: 0.42,

    seatBackHeight: 0.58,
    seatBaseHeight: 0.18
  },

  carbon: {
    frontSplitter: true,
    mirrorCaps: true,
    rearDiffuser: true,
    interiorTrim: true,

    weaveScale: 0.018,
    roughness: 0.30,
    clearcoat: 0.45
  },

  paint: {
    baseColor: 0x050505,

    metallic: 0.92,
    roughness: 0.19,

    clearcoat: 0.92,
    clearcoatRoughness: 0.075,

    reflectivity: 0.78
  },

  glass: {
    windshieldOpacity: 0.38,
    sideOpacity: 0.31,
    rearOpacity: 0.34,

    transmission: 0.08,
    roughness: 0.055,
    metalness: 0.02
  },

  lighting: {
    headlightIntensity: 2.6,
    taillightIntensity: 2.1,

    interiorAccentIntensity: 0.55,

    bodyReflectionStrength: 1.0
  },

  interaction: {
    rotationSpeed: 0.012,
    autoRotationSpeed: 0.004,

    minZoom: 3.4,
    maxZoom: 7.5,

    zoomStep: 0.35,

    touchRotationSensitivity: 0.008,
    mouseRotationSensitivity: 0.006
  }
});

export const M5_DESIGN_FEATURES = Object.freeze([
  "Long-wheelbase executive sedan proportions",
  "Aggressive vertical kidney grille",
  "Slim adaptive LED headlights",
  "Sculpted power hood",
  "Wide rear shoulders",
  "Flush-style door handles",
  "Aerodynamic side mirrors",
  "Large performance wheels",
  "Performance brake hardware",
  "Integrated rear spoiler",
  "Quad exhaust outlets",
  "Carbon-fiber aerodynamic details",
  "Dark panoramic roof",
  "Driver-focused digital cockpit"
]);

export function getDesignDetail(path, fallback = null) {
  if (!path || typeof path !== "string") {
    return fallback;
  }

  const parts = path.split(".");
  let current = M5_DESIGN_DETAILS;

  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object" ||
      !(part in current)
    ) {
      return fallback;
    }

    current = current[part];
  }

  return current;
}

export function hasDesignFeature(feature) {
  return M5_DESIGN_FEATURES.includes(feature);
}

export default M5_DESIGN_DETAILS;
