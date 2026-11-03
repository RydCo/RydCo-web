// The trip rules, as numbers, in one place: How it works, Safety and Drivers all state the same policy from these.
const rules = {
  freeCancelMinutes: 60, // Cancelling earlier than this is free and strike-free
  pickupWaitMinutes: 3, //  How long a driver waits at a pickup before a no-show
  strikesToPause: 3, //     Late cancels and no-shows that pause an account for review
};

const { freeCancelMinutes: free, pickupWaitMinutes: wait, strikesToPause: strikes } = rules;

// The cancellation and no-show policy as Safety lists it.
export const fairnessRules = [
  { when: `Cancel more than ${free} minutes before`, then: "free." },
  { when: `Cancel within ${free} minutes`, then: "free, but it adds a late-cancel strike." },
  { when: "Not at the pickup point", then: `the driver waits ${wait} minutes, then the rider owes their share and gets a strike.` },
  { when: `${strikes} strikes`, then: "the account is paused while a person reviews it." },
];

export const riderCancelAnswer = `More than ${free} minutes before: free. Within ${free} minutes: still free, but it adds a late-cancel strike. After the trip has started there is a cancel fee to the driver, and you can book again once it's paid.`;

export const pickupWaitRule = `At each pickup, a ${wait}-minute wait timer runs before you can mark a no-show.`;
