// The app's worked example, priced the way the app prices every ride: a pickup fee plus the fuel for the distance,
// split between everyone in the car, the driver included. Every page and app mockup that shows an example price reads
// it from here, so they always agree. [FILL] Confirm the numbers before launch.
const pickupFee = 50;
const km = 10;
const perKm = 38.94;

// One rider's share when `riders` share the car with the driver.
const share = (riders: number) => `Rs ${Math.round(pickupFee + (km * perKm) / (riders + 1))}`;

export const workedExample = {
  car: "Honda City",
  km,
  rates: `Rs ${perKm} per km · Rs ${pickupFee} pickup fee`,
  working: (riders: number) => `Rs ${pickupFee} + (${km} km × Rs ${perKm}) ÷ ${riders + 1} people`,
  solo: share(1),
  pooled: share(2),
};

// "2 seats left", "1 seat left".
export const seatsLeft = (n: number) => `${n} ${n === 1 ? "seat" : "seats"} left`;
