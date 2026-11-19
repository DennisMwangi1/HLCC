import { useState, useEffect, useMemo } from "react";
import { format, isSameDay, setHours, setMinutes } from "date-fns";
import { useAndishiBooking } from "../andishiBooking";

export interface TimeSlot {
  time: Date;
  /** The Andishi slot's instant, when the times come from Andishi. */
  startsAt?: string;
  formatted: string;
  period: "morning" | "afternoon" | "evening";
}

export interface GroupedTimeSlots {
  morning: TimeSlot[];
  afternoon: TimeSlot[];
  evening: TimeSlot[];
}

const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  // Don't show past times for today
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      // Skip past times for today
      if (isSameDay(now, date)) {
        if (
          hour < currentHour ||
          (hour === currentHour && minute < currentMinute)
        ) {
          continue;
        }
      }

      const time = setMinutes(setHours(date, hour), minute);
      const hour24 = time.getHours();

      // Determine period
      let period: "morning" | "afternoon" | "evening";
      if (hour24 < 12) {
        period = "morning";
      } else if (hour24 < 15) {
        period = "afternoon";
      } else {
        period = "evening";
      }

      slots.push({
        time,
        formatted: format(time, "h:mm a"),
        period,
      });
    }
  }

  return slots;
};

/** periodOf files a time under morning, afternoon or evening, as the generated slots are. */
const periodOf = (time: Date): TimeSlot["period"] =>
  time.getHours() < 12 ? "morning" : time.getHours() < 15 ? "afternoon" : "evening";

export function useTimeSlots(selectedDate: Date | undefined) {
  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const booking = useAndishiBooking();
  const serviceReady = !!booking?.service;

  useEffect(() => {
    // With Andishi, the times are the service's real availability for the day.
    if (booking && selectedDate) {
      if (!serviceReady) return;
      let stopped = false;
      setIsLoading(true);
      const day = format(selectedDate, "yyyy-MM-dd");
      void booking.availability({ from: day, to: day }).then((answer) => {
        if (stopped) return;
        const days = answer && answer.model === "appointment" ? answer.days : [];
        setSlots(days.flatMap((d) => d.slots).map((slot) => {
          const time = new Date(slot.startsAt);
          return { time, formatted: format(time, "h:mm a"), period: periodOf(time), startsAt: slot.startsAt };
        }));
        setIsLoading(false);
      });
      return () => { stopped = true; };
    }
    if (selectedDate) {
      setIsLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        const generatedSlots = generateTimeSlots(selectedDate);
        setSlots(generatedSlots);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSlots([]);
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, serviceReady]);

  const groupedSlots = useMemo<GroupedTimeSlots>(() => {
    return {
      morning: slots.filter((s) => s.period === "morning"),
      afternoon: slots.filter((s) => s.period === "afternoon"),
      evening: slots.filter((s) => s.period === "evening"),
    };
  }, [slots]);

  const hasSlots = slots.length > 0;

  return {
    slots,
    groupedSlots,
    isLoading,
    hasSlots,
  };
}
