import { useState, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfDay, isBefore, isWeekend, addDays } from 'date-fns';
import { cn } from '@/utils';
import { motion } from 'framer-motion';
import { CalendarIcon, Clock, AlertCircle, CheckCircle2, Globe } from 'lucide-react';
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
  const selectedTimezone = watch('timezone');

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Schedule Your {watch('contactMethod') === 'video' ? 'Video' : ''} Meeting
          </h3>
          <p className="text-sm text-gray-600">
            Choose a date and time that works best for you. All times are shown in your selected timezone.
          </p>
        </div>

        {/* Selected Summary Card */}
        {hasSelection && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-primary/5 border-2 border-primary/20 rounded-xl"
            role="status"
            aria-live="polite"
            aria-label="Selected meeting time"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">Selected Meeting Time</p>
                <p className="text-base text-primary font-medium">
                  {format(selectedDate!, 'EEEE, MMMM d, yyyy')} at {format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}
                </p>
                {selectedTimezone && (
                  <p className="text-xs text-gray-600 mt-1">
                    Timezone: {timezoneOptions.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content: Date and Time Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Date Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-600" />
              <h4 className="text-base font-semibold text-gray-900">Select a Date</h4>
            </div>
            <div className="flex justify-center lg:justify-start">
              <div className="border-2 border-gray-200 rounded-xl p-4 bg-white shadow-sm" role="region" aria-label="Date picker calendar">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => !isDateAvailable(date)}
                  initialFocus
                  className="rounded-lg"
                  aria-label="Select a date for your meeting"
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
                    head_cell: "text-gray-600 font-semibold text-xs w-10 h-10 flex items-center justify-center",
                    row: "flex w-full mt-1",
                    cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 rounded-lg",
                    day: cn(
                      "h-10 w-10 p-0 font-medium rounded-lg transition-all",
                      "hover:bg-gray-100 hover:text-gray-900",
                      "focus:bg-gray-100 focus:text-gray-900",
                      "aria-selected:opacity-100"
                    ),
                    day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white font-semibold shadow-md",
                    day_today: "bg-gray-100 text-gray-900 font-semibold border-2 border-primary/30",
                    day_outside: "text-gray-400 opacity-50",
                    day_disabled: "text-gray-300 opacity-40 cursor-not-allowed hover:bg-transparent hover:text-gray-300",
                    day_range_middle: "aria-selected:bg-primary/10 aria-selected:text-gray-900",
                    day_hidden: "invisible",
                  }}
                />
              </div>
            </div>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-medium text-gray-900">Selected: </span>
                  <span className="font-semibold text-primary">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                </p>
              </motion.div>
            )}
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <h4 className="text-base font-semibold text-gray-900">Select a Time</h4>
            </div>

            {!selectedDate ? (
              <div className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-center" role="status" aria-live="polite">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm text-gray-600">Please select a date first</p>
              </div>
            ) : isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-10 bg-gray-200 rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-4" role="region" aria-label="Time slot selection">
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
        <div className="space-y-6 pt-6 border-t border-gray-200">
          {/* Timezone Selection */}
          <FormField
            control={control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-gray-600" />
                  <FormLabel className="text-sm font-medium text-gray-900">Time Zone</FormLabel>
                </div>
                <FormDescription className="mb-3 text-xs text-gray-600">
                  Select your timezone to ensure accurate scheduling
                </FormDescription>
                <FormControl>
                  <select
                    {...field}
                    value={field.value || Intl.DateTimeFormat().resolvedOptions().timeZone}
                    onChange={field.onChange}
                    aria-label="Select timezone"
                    className="flex h-11 w-full rounded-md border border-gray-300 bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {timezoneOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5" />
              </FormItem>
            )}
          />

          {/* How did you hear about us */}
          <FormField
            control={control}
            name="howDidYouHear"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-900 mb-2">
                  How did you hear about us? *
                </FormLabel>
                <FormDescription className="mb-3 text-xs text-gray-600">
                  Help us understand how you discovered our services
                </FormDescription>
                <FormControl>
                  <select
                    {...field}
                    value={field.value || ''}
                    onChange={field.onChange}
                    aria-label="How did you hear about us"
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                    aria-describedby={fieldState.error ? 'howDidYouHear-error' : undefined}
                    className={cn(
                      "flex h-11 w-full rounded-md border bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                      fieldState.error ? "border-red-300 focus-visible:ring-red-500" : "border-gray-300"
                    )}
                  >
                    <option value="">Select an option</option>
                    <option value="search">Search Engine (Google, Bing, etc.)</option>
                    <option value="social">Social Media (LinkedIn, Twitter, etc.)</option>
                    <option value="referral">Referral</option>
                    <option value="event">Event or Conference</option>
                    <option value="article">Article or Blog Post</option>
                    <option value="other">Other</option>
                  </select>
                </FormControl>
                <FormMessage
                  id="howDidYouHear-error"
                  className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5"
                  role="alert"
                >
                  {fieldState.error && <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Terms Agreement */}
          <FormField
            control={control}
            name="agreeToTerms"
            render={({ field, fieldState }) => (
              <FormItem className={cn(
                "flex flex-row items-start space-x-3 space-y-0 rounded-lg p-4 border-2 transition-colors",
                fieldState.error
                  ? "border-red-300 bg-red-50/50"
                  : "border-gray-200 hover:border-gray-300"
              )}>
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                    aria-label="Agree to privacy policy"
                    aria-invalid={fieldState.error ? 'true' : 'false'}
                  />
                </FormControl>
                <div className="space-y-1 leading-none flex-1">
                  <FormLabel className="text-sm font-medium text-gray-900 cursor-pointer">
                    I agree to the processing of my personal data in accordance with the{' '}
                    <a href="/privacy" className="text-primary underline hover:text-primary/80">
                      Privacy Policy
                    </a>{' '}
                    *
                  </FormLabel>
                  <FormDescription className="text-xs text-gray-600">
                    We'll use this information to contact you about your inquiry.
                  </FormDescription>
                  {fieldState.error && (
                    <FormMessage className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5" />
                    </FormMessage>
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
