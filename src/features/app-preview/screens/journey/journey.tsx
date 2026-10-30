import { FindRideScreen, LiveTripScreen, OnTheWayScreen, RequestAcceptedScreen, RideDetailScreen, RideResultsScreen, SettleTripScreen } from "./RideScreens";
import { BeforeYouRideScreen, MobileNumberScreen, PilotCoverageScreen, ProfileScreen, RiderReadyScreen, RoleScreen, SmsCodeScreen, SplashScreen } from "./SignupScreens";

// A rider's whole journey through the app, from the first screen after install to paying the driver. These screens
// are only used here, so the home hero doesn't repeat what the sections below it show.
export const journey = [
  { title: "Welcome", screen: <SplashScreen /> },
  { title: "Choose a role", screen: <RoleScreen /> },
  { title: "Pilot coverage", screen: <PilotCoverageScreen /> },
  { title: "Mobile number", screen: <MobileNumberScreen /> },
  { title: "SMS code", screen: <SmsCodeScreen /> },
  { title: "About you", screen: <ProfileScreen /> },
  { title: "Rider profile ready", screen: <RiderReadyScreen /> },
  { title: "Before you ride", screen: <BeforeYouRideScreen /> },
  { title: "Find a ride", screen: <FindRideScreen /> },
  { title: "Ride results", screen: <RideResultsScreen /> },
  { title: "Ride detail", screen: <RideDetailScreen /> },
  { title: "Request accepted", screen: <RequestAcceptedScreen /> },
  { title: "Driver on the way", screen: <OnTheWayScreen /> },
  { title: "Live trip", screen: <LiveTripScreen /> },
  { title: "Settle trip", screen: <SettleTripScreen /> },
];
