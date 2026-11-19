import { createContext, useContext } from "react";
import type { BookingControls } from "@andishi/runtime";

/** The Andishi booking of the open form (its service, availability, hold and booking), or null without Andishi. */
export const AndishiBookingContext = createContext<BookingControls | null>(null);

export function useAndishiBooking(): BookingControls | null {
  return useContext(AndishiBookingContext);
}

/** The Andishi service each booking type books (Bookings › Services in the studio). */
export const SERVICE_SLUG = { discovery: "discovery-call", consultation: "consultation" } as const;
