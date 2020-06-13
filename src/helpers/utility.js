export const generateTimeDifference = (dateString) => {
  let delta = Math.abs(new Date().getTime() - new Date(dateString).getTime()) / 1000;
  const result = {};
  const structure = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  Object.keys(structure).forEach((key) => {
    result[key] = Math.floor(delta / structure[key]);
    delta -= result[key] * structure[key];
  });
  let timeString = "";
  const resultKeys = Object.keys(result);
  for (let i = 0; i < resultKeys.length; i++) {
    const time = resultKeys[i];
    if (result[time] > 0) {
      timeString = `${result[time]} ${time}${result[time] > 1 ? "s" : ""} ago`;
      break;
    }
  }
  return { result, timeString };
};

export const calcDistanceInKm = (p1, p2) => {
  const R = 6371.071; // Radius of the Earth in kilometers
  const rlat1 = p1.lat * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = p2.lat * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (p2.lng - p1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return Math.floor(d);
};
