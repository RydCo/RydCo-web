// The checks RydCo runs, worded as the app words them (never "NADRA verified"). Every page and mockup that names a
// check reads it from here: `badge` is the green tick, `need` is what a driver brings, `is`/`isNot` explain the check.
export const phoneCheck = { name: "Phone", badge: "Phone verified", state: "Verified" };

export const driverChecks = [
  {
    name: "CNIC",
    badge: "CNIC reviewed",
    state: "Reviewed",
    need: "Punjab-issued, with photos of the front and back.",
    is: "A reviewer compares the driver's details with their CNIC.",
    isNot: "A document review, not a NADRA check.",
  },
  {
    name: "Live selfie",
    badge: "Live selfie checked",
    state: "Checked",
    need: "Taken in the app. Gallery photos can't be used.",
    is: "Matched to the CNIC photo. Gallery photos can't be used.",
    isNot: "It doesn't replace the CNIC review.",
  },
  {
    name: "Driving licence",
    badge: "Licence checked",
    state: "Checked",
    need: "A current car licence. Learner permits aren't accepted.",
    is: "Checked on Punjab DLIMS. Learner permits aren't accepted.",
    isNot: "A screenshot from the driver isn't enough.",
  },
  {
    name: "Vehicle",
    badge: "Vehicle checked",
    state: "Checked",
    need: "Registration and photos with the plate visible. Not the owner? Add the owner's permission.",
    is: "Registration checked on Punjab MTMIS, and the plate must match.",
    isNot: "It doesn't cover the car's fitness or insurance.",
  },
];

// Everything a driver has passed, phone first: the order the app lists them in.
export const allChecks = [phoneCheck, ...driverChecks];
