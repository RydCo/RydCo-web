import { ConfirmPaymentsScreen, DriverLiveTripScreen, OfferRideScreen, RidePublishedScreen, RideRequestsScreen, TodaysRideScreen } from "./DriverScreens";
import { FindRideScreen, LiveTripScreen, OnTheWayScreen, RequestAcceptedScreen, RideDetailScreen, RideResultsScreen, SettleTripScreen } from "./RiderScreens";

// Two rides, start to end, for the home hero's phone: one as a rider, then the same trip as its driver. These screens
// are only used here, so the hero doesn't repeat what the sections below it show.
export const twoRides = [
  { title: "Find a ride", screen: <FindRideScreen /> },
  { title: "Ride results", screen: <RideResultsScreen /> },
  { title: "Ride detail", screen: <RideDetailScreen /> },
  { title: "Request accepted", screen: <RequestAcceptedScreen /> },
  { title: "Driver on the way", screen: <OnTheWayScreen /> },
  { title: "Live trip", screen: <LiveTripScreen /> },
  { title: "Settle trip", screen: <SettleTripScreen /> },
  { title: "Offer a ride", screen: <OfferRideScreen /> },
  { title: "Ride published", screen: <RidePublishedScreen /> },
  { title: "Ride requests", screen: <RideRequestsScreen /> },
  { title: "Today's ride", screen: <TodaysRideScreen /> },
  { title: "Driver's live trip", screen: <DriverLiveTripScreen /> },
  { title: "Confirm payments", screen: <ConfirmPaymentsScreen /> },
];
