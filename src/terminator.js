const {PI, sin, asin, cos, tan} = Math;

const radians = PI / 180;
const degrees = 180 / PI;
const day = 1000 * 60 * 60 * 24;

function floorDay(time){
  return time - (time % day);
}

export function truncate(pos){
  return [
    360 + pos[0],
    pos[1]
  ];
}

export function antipode(position) {
  return [position[0] + 180, -position[1]];
}

export function solarPosition(time) {
  var centuries = (time - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525, // since J2000
    longitude = (floorDay(time) - time) / 864e5 * 360 - 180;
  return [
    longitude - equationOfTime(centuries) * degrees,
    solarDeclination(centuries) * degrees
  ];
}

// Equations based on NOAA’s Solar Calculator; all angles in radians.
// http://www.esrl.noaa.gov/gmd/grad/solcalc/

function equationOfTime(centuries) {
  var e = eccentricityEarthOrbit(centuries),
    m = solarGeometricMeanAnomaly(centuries),
    l = solarGeometricMeanLongitude(centuries),
    y = tan(obliquityCorrection(centuries) / 2);
  y *= y;
  return y * sin(2 * l)
    - 2 * e * sin(m)
    + 4 * e * y * sin(m) * cos(2 * l)
    - 0.5 * y * y * sin(4 * l)
    - 1.25 * e * e * sin(2 * m);
}

function solarDeclination(centuries) {
  return asin(sin(obliquityCorrection(centuries)) * sin(solarApparentLongitude(centuries)));
}

function solarApparentLongitude(centuries) {
  return solarTrueLongitude(centuries) - (0.00569 + 0.00478 * sin((125.04 - 1934.136 * centuries) * radians)) * radians;
}

function solarTrueLongitude(centuries) {
  return solarGeometricMeanLongitude(centuries) + solarEquationOfCenter(centuries);
}

function solarGeometricMeanAnomaly(centuries) {
  return (357.52911 + centuries * (35999.05029 - 0.0001537 * centuries)) * radians;
}

function solarGeometricMeanLongitude(centuries) {
  var l = (280.46646 + centuries * (36000.76983 + centuries * 0.0003032)) % 360;
  return (l < 0 ? l + 360 : l) / 180 * PI;
}

function solarEquationOfCenter(centuries) {
  var m = solarGeometricMeanAnomaly(centuries);
  return (sin(m) * (1.914602 - centuries * (0.004817 + 0.000014 * centuries))
    + sin(m + m) * (0.019993 - 0.000101 * centuries)
    + sin(m + m + m) * 0.000289) * radians;
}

function obliquityCorrection(centuries) {
  return meanObliquityOfEcliptic(centuries) + 0.00256 * cos((125.04 - 1934.136 * centuries) * radians) * radians;
}

function meanObliquityOfEcliptic(centuries) {
  return (23 + (26 + (21.448 - centuries * (46.8150 + centuries * (0.00059 - centuries * 0.001813))) / 60) / 60) * radians;
}

function eccentricityEarthOrbit(centuries) {
  return 0.016708634 - centuries * (0.000042037 + 0.0000001267 * centuries);
}
