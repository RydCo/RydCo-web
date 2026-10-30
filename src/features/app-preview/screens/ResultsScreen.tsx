import { TripCard } from "@/features/trips/TripCard";
import { Header, Bot, Body } from "./parts";

export function ResultsScreen() {
  return (
    <>
      <Header title="Find a ride" />
      <Body>
        <p className="w-fit rounded-full bg-apricot-tint px-3 py-1.5 text-[12px] font-semibold">Model Town → Arfa Tower · Mon 7:30</p>
        <Bot>
          <b>2 drivers match your route.</b>
        </Bot>
        <TripCard
          compact
          trip={{
            driver: "Hamza",
            car: "Honda City",
            from: "Akbar Chowk",
            fromTime: "7:40",
            to: "Arfa Tower gate",
            toTime: "8:20",
            seatsLeft: 2,
            share: "Rs 245",
            shareNote: "Rs 180 if a 2nd rider joins",
            badges: [],
          }}
        />
        <TripCard
          compact
          trip={{
            driver: "Bilal",
            car: "Toyota Corolla",
            from: "Model Town Link Rd",
            fromTime: "7:50",
            to: "Arfa Tower gate",
            toTime: "8:25",
            seatsLeft: 1,
            share: "Rs 230",
            badges: [],
          }}
        />
      </Body>
    </>
  );
}
