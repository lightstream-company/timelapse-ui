export function normalizeLongitude(longitude) {
  while (longitude > 180) {
    longitude -= 360;
  }
  while (longitude < -180) {
    longitude += 360;
  }
  return longitude;
}

export function normalize([longitude, latitude]) {
  longitude = normalizeLongitude(longitude);
  while (latitude > 90) {
    latitude = 90 - latitude % 90;
    longitude += 180;
  }
  while (latitude < -90) {
    latitude = -90 + latitude % 90;
    longitude += 180;
  }
  return [normalizeLongitude(longitude), latitude];
}
