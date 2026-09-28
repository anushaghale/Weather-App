export function convertTemp(celsius, unit) {
  if (unit === "°F") {
    return Math.round((celsius * 9/5) + 32);
  }
  return Math.round(celsius);
}

export function convertWind(kmh, unit) {
  if (unit === "mph") {
    return Math.round(kmh * 0.621371);
  }
  return Math.round(kmh);
}

export function convertPrecip(mm, unit) {
  if (unit === "in") {
    return (mm * 0.0393701).toFixed(2);
  }
  return mm;
}