"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-lg font-semibold text-gray-900",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-9 w-9 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors",
          "flex items-center justify-center"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex mb-2",
        head_cell:
          "text-gray-600 font-semibold text-xs w-10 h-10 flex items-center justify-center",
        row: "flex w-full mt-1",
        cell: cn(
          "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 rounded-lg",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-lg",
        ),
        day: cn(
          "h-10 w-10 p-0 font-medium rounded-lg transition-all",
          "hover:bg-gray-100 hover:text-gray-900",
          "focus:bg-gray-100 focus:text-gray-900",
          "aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white font-semibold shadow-md",
        day_today: "bg-gray-100 text-gray-900 font-semibold border-2 border-primary/30",
        day_outside:
          "day-outside text-gray-400 opacity-50",
        day_disabled: "text-gray-300 opacity-40 cursor-not-allowed hover:bg-transparent hover:text-gray-300",
        day_range_middle:
          "aria-selected:bg-primary/10 aria-selected:text-gray-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        //@ts-ignore
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        //@ts-ignore
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
