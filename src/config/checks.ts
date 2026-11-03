// The checks RydCo runs, worded as the app words them (never "NADRA verified"). Every page and mockup that names a
// check reads it from here: `badge` is the green tick, `need` is what a driver brings, `is`/`isNot` explain the check.
export const phoneCheck = { name: "Phone", badge: "Phone verified", state: "Verified" };

export const driverChecks = [
  {
    name: "CNIC",
    badge: "CNIC reviewed",
    state: "Reviewed",
    need: "Punjab-issued, with photos of the front and back.",
    is: "A reviewer compares the details a driver enters with their CNIC card. A protected key stops one person opening several accounts.",
    isNot: "It is a document review, not a NADRA check.",
  },
  {
    name: "Live selfie",
    badge: "Live selfie checked",
    state: "Checked",
    need: "Taken in the app. Gallery photos can't be used.",
    is: "A vetted provider matches a live selfie to the CNIC photo, for this check only. Photos from the gallery can't be used. After three tries, a person helps.",
    isNot: "It doesn't replace the CNIC review. Both must pass.",
  },
  {
    name: "Driving licence",
    badge: "Licence checked",
    state: "Checked",
    need: "A current car licence. Learner permits aren't accepted.",
    is: "A reviewer checks the licence on Punjab DLIMS. Learner permits are not accepted.",
    isNot: "A screenshot from the driver doesn't replace our check.",
  },
  {
    name: "Vehicle",
    badge: "Vehicle checked",
    state: "Checked",
    need: "Registration and photos with the plate visible. Not the owner? Add the owner's permission.",
    is: "A reviewer checks the registration on Punjab MTMIS. Each car is approved on its own, and the plate must match the record.",
    isNot: "Approval doesn't cover the car's fitness or insurance.",
  },
];

// Everything a driver has passed, phone first: the order the app lists them in.
export const allChecks = [phoneCheck, ...driverChecks];
