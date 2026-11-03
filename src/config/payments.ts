// How riders pay drivers. RydCo never handles the money. `name` is the chip, `inWords` is how a sentence says it.
export const paymentMethods = [
  { name: "Cash", inWords: "cash" },
  { name: "JazzCash", inWords: "JazzCash" },
  { name: "NayaPay", inWords: "NayaPay" },
  { name: "Bank / Raast", inWords: "bank transfer" },
];

// "cash, JazzCash, NayaPay or bank transfer"
export const paymentMethodsInWords = new Intl.ListFormat("en-GB", { type: "disjunction" }).format(paymentMethods.map((m) => m.inWords));
