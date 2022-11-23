const earthRadius: number = 6371; // Radius of the earth in km

export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number = 0, lon2: number = 0): number  => {
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c; // Distance in km

  if(d === 0) {
    alert("Same location selected!");
    return 0;
  }

  return km2NauticalMiles(d);
};

export const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
};

export const km2NauticalMiles = (distanceInKm: number): number => {
  return distanceInKm / 1.852;
};
