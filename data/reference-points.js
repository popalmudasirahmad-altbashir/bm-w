// data/reference-points.js
// BMW M5 G90 procedural 3D reference points.
// All coordinates use the model's normalized coordinate system.

export const REFERENCE_POINTS = Object.freeze({
  // Main longitudinal axis
  center: {
    x: 0,
    y: 0,
    z: 0
  },

  // Front / rear body limits
  front: {
    x: 0,
    y: 0.62,
    z: 2.00
  },

  rear: {
    x: 0,
    y: 0.62,
    z: -2.00
  },

  // Main body corners
  body: {
    frontLeft: {
      x: -0.773,
      y: 0.60,
      z: 1.85
    },

    frontRight: {
      x: 0.773,
      y: 0.60,
      z: 1.85
    },

    rearLeft: {
      x: -0.773,
      y: 0.61,
      z: -1.85
    },

    rearRight: {
      x: 0.773,
      y: 0.61,
      z: -1.85
    }
  },

  // Wheel axle reference points
  axles: {
    front: {
      left: {
        x: -0.661,
        y: 0.365,
        z: 1.180
      },

      right: {
        x: 0.661,
        y: 0.365,
        z: 1.180
      },

      center: {
        x: 0,
        y: 0.365,
        z: 1.180
      }
    },

    rear: {
      left: {
        x: -0.700,
        y: 0.365,
        z: -1.180
      },

      right: {
        x: 0.700,
        y: 0.365,
        z: -1.180
      },

      center: {
        x: 0,
        y: 0.365,
        z: -1.180
      }
    }
  },

  // Hood reference
  hood: {
    center: {
      x: 0,
      y: 0.760,
      z: 1.390
    },

    front: {
      x: 0,
      y: 0.680,
      z: 1.820
    },

    rear: {
      x: 0,
      y: 0.870,
      z: 0.920
    },

    leftEdge: {
      x: -0.680,
      y: 0.735,
      z: 1.390
    },

    rightEdge: {
      x: 0.680,
      y: 0.735,
      z: 1.390
    }
  },

  // Roof and cabin
  roof: {
    frontCenter: {
      x: 0,
      y: 1.115,
      z: 0.720
    },

    center: {
      x: 0,
      y: 1.180,
      z: 0.000
    },

    rearCenter: {
      x: 0,
      y: 1.095,
      z: -0.790
    },

    frontLeft: {
      x: -0.690,
      y: 1.115,
      z: 0.720
    },

    frontRight: {
      x: 0.690,
      y: 1.115,
      z: 0.720
    },

    rearLeft: {
      x: -0.650,
      y: 1.095,
      z: -0.790
    },

    rearRight: {
      x: 0.650,
      y: 1.095,
      z: -0.790
    }
  },

  // Windshield
  windshield: {
    center: {
      x: 0,
      y: 1.025,
      z: 0.780
    },

    left: {
      x: -0.645,
      y: 1.025,
      z: 0.780
    },

    right: {
      x: 0.645,
      y: 1.025,
      z: 0.780
    },

    bottom: {
      x: 0,
      y: 0.830,
      z: 0.950
    },

    top: {
      x: 0,
      y: 1.175,
      z: 0.600
    }
  },

  // Rear glass
  rearGlass: {
    center: {
      x: 0,
      y: 1.015,
      z: -0.790
    },

    bottom: {
      x: 0,
      y: 0.825,
      z: -0.940
    },

    top: {
      x: 0,
      y: 1.135,
      z: -0.650
    }
  },

  // Front grille / kidney grille
  grille: {
    center: {
      x: 0,
      y: 0.570,
      z: 1.985
    },

    left: {
      x: -0.250,
      y: 0.570,
      z: 1.985
    },

    right: {
      x: 0.250,
      y: 0.570,
      z: 1.985
    },

    upper: {
      x: 0,
      y: 0.745,
      z: 1.990
    },

    lower: {
      x: 0,
      y: 0.430,
      z: 1.995
    }
  },

  // Headlights
  headlights: {
    left: {
      x: -0.535,
      y: 0.700,
      z: 1.910
    },

    right: {
      x: 0.535,
      y: 0.700,
      z: 1.910
    }
  },

  // Rear lights
  taillights: {
    left: {
      x: -0.620,
      y: 0.735,
      z: -1.900
    },

    right: {
      x: 0.620,
      y: 0.735,
      z: -1.900
    }
  },

  // Side mirrors
  mirrors: {
    left: {
      x: -0.940,
      y: 0.965,
      z: 0.640
    },

    right: {
      x: 0.940,
      y: 0.965,
      z: 0.640
    }
  },

  // Door handles
  handles: {
    frontLeft: {
      x: -0.795,
      y: 0.780,
      z: 0.430
    },

    frontRight: {
      x: 0.795,
      y: 0.780,
      z: 0.430
    },

    rearLeft: {
      x: -0.795,
      y: 0.770,
      z: -0.430
    },

    rearRight: {
      x: 0.795,
      y: 0.770,
      z: -0.430
    }
  },

  // Side skirt reference
  sideSkirts: {
    left: {
      x: -0.790,
      y: 0.335,
      z: 0
    },

    right: {
      x: 0.790,
      y: 0.335,
      z: 0
    }
  },

  // Exhaust system
  exhaust: {
    leftOuter: {
      x: -0.560,
      y: 0.410,
      z: -2.020
    },

    leftInner: {
      x: -0.185,
      y: 0.410,
      z: -2.020
    },

    rightInner: {
      x: 0.185,
      y: 0.410,
      z: -2.020
    },

    rightOuter: {
      x: 0.560,
      y: 0.410,
      z: -2.020
    }
  },

  // Rear spoiler
  spoiler: {
    center: {
      x: 0,
      y: 0.925,
      z: -1.820
    },

    left: {
      x: -0.650,
      y: 0.925,
      z: -1.820
    },

    right: {
      x: 0.650,
      y: 0.925,
      z: -1.820
    }
  },

  // Lower front bumper
  frontBumper: {
    center: {
      x: 0,
      y: 0.390,
      z: 2.015
    },

    left: {
      x: -0.650,
      y: 0.405,
      z: 2.010
    },

    right: {
      x: 0.650,
      y: 0.405,
      z: 2.010
    }
  },

  // Lower rear bumper
  rearBumper: {
    center: {
      x: 0,
      y: 0.410,
      z: -2.015
    },

    left: {
      x: -0.650,
      y: 0.420,
      z: -2.010
    },

    right: {
      x: 0.650,
      y: 0.420,
      z: -2.010
    }
  },

  // Interior reference points
  interior: {
    dashboard: {
      x: 0,
      y: 0.910,
      z: 0.900
    },

    steeringWheel: {
      x: -0.360,
      y: 0.895,
      z: 0.640
    },

    driverSeat: {
      x: -0.420,
      y: 0.620,
      z: 0.350
    },

    passengerSeat: {
      x: 0.420,
      y: 0.620,
      z: 0.350
    },

    centerConsole: {
      x: 0,
      y: 0.650,
      z: 0.300
    }
  }
});

export function getReferencePoint(section, point) {
  const group = REFERENCE_POINTS[section];

  if (!group) {
    return null;
  }

  const value = group[point];

  if (!value) {
    return null;
  }

  return {
    x: value.x,
    y: value.y,
    z: value.z
  };
}

export function clonePoint(point) {
  if (!point) {
    return null;
  }

  return {
    x: point.x,
    y: point.y,
    z: point.z
  };
}

export function offsetPoint(point, offset = {}) {
  if (!point) {
    return null;
  }

  return {
    x: point.x + (offset.x || 0),
    y: point.y + (offset.y || 0),
    z: point.z + (offset.z || 0)
  };
}

export function mirrorPointX(point) {
  if (!point) {
    return null;
  }

  return {
    x: -point.x,
    y: point.y,
    z: point.z
  };
}

export function mirrorPointZ(point) {
  if (!point) {
    return null;
  }

  return {
    x: point.x,
    y: point.y,
    z: -point.z
  };
}

export default REFERENCE_POINTS;
