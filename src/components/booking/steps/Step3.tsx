import { useState, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfDay, isBefore, isWeekend, addDays } from 'date-fns';
import { cn } from '@/utils';
import { motion } from 'framer-motion';
import { useTimeSlots } from '../hooks/useTimeSlots';
import { TimeSlotGroup } from '../components/TimeSlotGroup';

// Check if a date is available (not in the past and not a weekend)
const isDateAvailable = (date: Date): boolean => {
  const today = startOfDay(new Date());
  const dateToCheck = startOfDay(date);
  return !isBefore(dateToCheck, today) && !isWeekend(dateToCheck);
};

// Get first available date (today if weekday, otherwise next weekday)
const getFirstAvailableDate = (): Date => {
  const today = startOfDay(new Date());

  if (!isWeekend(today)) {
    return today;
  }

  // Find next weekday
  let daysToAdd = 1;
  while (daysToAdd <= 7) {
    const nextDate = addDays(today, daysToAdd);
    if (!isWeekend(nextDate)) {
      return startOfDay(nextDate);
    }
    daysToAdd++;
  }

  return today; // Fallback
};

export function BookingStep3() {
  const { control, watch, setValue } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const selectedTime = watch('preferredTime');

  const { groupedSlots, isLoading } = useTimeSlots(selectedDate);

  // Auto-select first available date on mount and set default timezone
  useEffect(() => {
    if (!selectedDate) {
      const firstDate = getFirstAvailableDate();
      setSelectedDate(firstDate);
      setValue('preferredDate', format(firstDate, 'yyyy-MM-dd'), { shouldValidate: false });
    }

    // Set default timezone if not set
    const currentTimezone = watch('timezone');
    if (!currentTimezone) {
      const defaultTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setValue('timezone', defaultTz, { shouldValidate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      setSelectedDate(date);
      setValue('preferredDate', format(date, 'yyyy-MM-dd'), { shouldValidate: false });
      // Clear selected time when date changes
      setValue('preferredTime', '', { shouldValidate: false });
    }
  };

  const handleTimeSelect = (time: Date) => {
    setValue('preferredDate', format(time, 'yyyy-MM-dd'), { shouldValidate: false });
    setValue('preferredTime', format(time, 'HH:mm'), { shouldValidate: false });
  };

  const timezoneOptions = useMemo(() => [
    { value: 'Africa/Nairobi', label: 'East Africa Time (EAT)' },
    { value: 'UTC', label: 'UTC' },
    { value: 'Europe/London', label: 'GMT (London)' },
    { value: 'Europe/Paris', label: 'CET (Paris)' },
    { value: 'America/New_York', label: 'EST (New York)' },
    { value: 'Asia/Dubai', label: 'GST (Dubai)' },
    { value: 'Asia/Shanghai', label: 'CST (Shanghai)' },
  ], []);

  const hasSelection = selectedDate && selectedTime;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="mb-12">
          <h3 className="text-xl font-heading font-light text-black italic mb-2 text-center">
            Scheduling Coordination
          </h3>
          <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-medium text-center">
            Securing your session in our global advisory calendar.
          </p>
        </div>

        {/* Selected Summary Card */}
        {hasSelection && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-white border border-[#D4AF37]/30 text-center shadow-sm"
            role="status"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] mb-2">Confirmed Slot</p>
            <p className="text-xl font-heading font-light text-black italic">
              {format(selectedDate!, 'EEEE, MMMM d, yyyy')} <span className="opacity-30 mx-2 text-lg">|</span> {format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}
            </p>
          </motion.div>
        )}

        {/* Main Content: Date and Time Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Date Selection */}
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-2 mb-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">1. Select Calendar Date</h4>
            </div>
            <div className="flex justify-center">
              <div className="border border-black/5 rounded-none p-6 bg-white shadow-sm" role="region">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => !isDateAvailable(date)}
                  initialFocus
                  className="rounded-none font-sans"
                  classNames={{
                    months: "flex flex-col sm:flex-row gap-4",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center mb-6",
                    caption_label: "text-xs uppercase tracking-widest font-bold text-black",
                    nav: "space-x-1 flex items-center",
                    nav_button: cn(
                      "h-8 w-8 bg-white border border-black/5 rounded-none hover:bg-slate-900/5 transition-colors",
                      "flex items-center justify-center"
                    ),
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex mb-4",
                    head_cell: "text-black/30 font-bold text-[9px] w-9 h-9 uppercase tracking-tighter flex items-center justify-center",
                    row: "flex w-full mt-1",
                    cell: "h-9 w-9 text-center text-xs p-0 relative [&:has([aria-selected])]:bg-transparent",
                    day: cn(
                      "h-9 w-9 p-0 font-medium rounded-none transition-all",
                      "hover:bg-slate-900/5 hover:text-black",
                      "focus:bg-slate-900/5 focus:text-black",
                      "aria-selected:opacity-100"
                    ),
                    day_selected: "bg-[#D4AF37] text-white hover:bg-[#D4AF37] hover:text-white focus:bg-[#D4AF37] focus:text-white font-bold shadow-lg scale-110 z-10",
                    day_today: "border border-[#D4AF37]/30 text-black",
                    day_outside: "text-black/10 opacity-50",
                    day_disabled: "text-black/5 opacity-20 cursor-not-allowed hover:bg-transparent",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-2 mb-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">2. Select Session Time</h4>
            </div>

            {!selectedDate ? (
              <div className="h-[340px] flex flex-col items-center justify-center p-8 border border-dashed border-black/5 text-center">
                <p className="text-[10px] uppercase tracking-widest text-black/20 font-bold">Waiting for date selection</p>
              </div>
            ) : isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-2 bg-slate-900/[0.02] rounded w-24 animate-pulse" />
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-8 bg-slate-900/[0.02] rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-transparent" role="region">
                <TimeSlotGroup
                  groupedSlots={groupedSlots}
                  selectedTime={selectedTime || ''}
                  onTimeSelect={handleTimeSelect}
                  selectedDate={selectedDate}
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional Form Fields */}
        <div className="space-y-12 pt-12 border-t border-black/5 max-w-2xl mx-auto">
          {/* Timezone Selection */}
          <FormField
            control={control}
            name="timezone"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 block text-center">Meeting Timezone</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    value={field.value || Intl.DateTimeFormat().resolvedOptions().timeZone}
                    onChange={field.onChange}
                    className="flex h-12 w-full border-0 border-b border-black/10 rounded-none bg-transparent px-0 text-black text-center text-sm font-medium focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all duration-300"
                  >
                    {timezoneOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-1 text-center" />
              </FormItem>
            )}
          />

          {/* How did you hear about us */}
          <FormField
            control={control}
            name="howDidYouHear"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 block text-center">
                  Source of Discovery
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    value={field.value || ''}
                    onChange={field.onChange}
                    className={cn(
                      "flex h-12 w-full border-0 border-b border-black/10 rounded-none bg-transparent px-0 text-black text-center text-sm font-medium focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all duration-300",
                      fieldState.error && "border-red-500"
                    )}
                  >
                    <option value="">Select Protocol</option>
                    <option value="search">Search Engine Coordination</option>
                    <option value="social">Professional Network / LinkedIn</option>
                    <option value="referral">Referral Partnership</option>
                    <option value="event">Industry Conference / Event</option>
                    <option value="article">Thought Leadership Publication</option>
                    <option value="other">Institutional Requirement</option>
                  </select>
                </FormControl>
                <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-1 text-center" />
              </FormItem>
            )}
          />

          {/* Terms Agreement */}
          <FormField
            control={control}
            name="agreeToTerms"
            render={({ field, fieldState }) => (
              <FormItem className={cn(
                "flex flex-row items-center justify-center space-x-4 space-y-0 p-8 border border-black/5 transition-all duration-500",
                fieldState.error
                  ? "border-red-500 bg-red-50/10"
                  : ""
              )}>
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    className="rounded-none border-black/10 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel className="text-[9px] uppercase tracking-[0.2em] font-medium text-black/60 cursor-pointer">
                    I acknowledge the processing of personal data per the{' '}
                    <a href="/privacy" className="text-[#D4AF37] underline">
                      Privacy Policy
                    </a>
                  </FormLabel>
                  {fieldState.error && (
                    <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-1 block" />
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
      </motion.div>
    </div>
  );
}
