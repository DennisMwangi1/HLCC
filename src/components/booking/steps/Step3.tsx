import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { format, addDays, isSameDay, setHours, setMinutes } from 'date-fns';
import { cn } from '@/utils';
import { motion } from 'framer-motion';

// Generate available time slots (30-minute intervals from 9 AM to 5 PM)
const generateTimeSlots = (date: Date) => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  // Don't show past times for today
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute of [0, 30]) {
      // Skip past times for today
      if (isSameDay(now, date)) {
        if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
          continue;
        }
      }

      const time = setMinutes(setHours(date, hour), minute);
      slots.push(time);
    }
  }

  return slots;
};

// Generate available dates (next 14 days, excluding weekends)
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = addDays(today, i);
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
    }
  }

  return dates;
};

export function BookingStep3() {
  const { control, watch, setValue } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const availableDates = generateAvailableDates();

  // Update available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      // Simulate API call to get available slots
      setTimeout(() => {
        const slots = generateTimeSlots(selectedDate);
        setAvailableSlots(slots);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDate]);

  // Auto-select first available date if none selected
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  const selectedTime = watch('preferredTime');

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold mb-6">Schedule Your {watch('contactMethod') === 'video' ? 'Video' : ''} Meeting</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Select a Date</h4>
            <div className="flex overflow-x-auto pb-2 -mx-2 px-2">
              <div className="flex space-x-2">
                {availableDates.map((date) => {
                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  return (
                    <button
                      key={date.toString()}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        'flex flex-col items-center justify-center w-16 h-20 rounded-lg border p-2 transition-colors',
                        isSelected
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-200 hover:bg-gray-50',
                        isSameDay(new Date(), date) && 'border-primary/50'
                      )}
                    >
                      <span className="text-sm font-medium">
                        {format(date, 'EEE')}
                      </span>
                      <span className="text-2xl font-bold">
                        {format(date, 'd')}
                      </span>
                      <span className="text-xs">
                        {format(date, 'MMM')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Select a Time</h4>
            {isLoading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableSlots.map((time) => {
                  const isSelected = selectedTime === format(time, 'HH:mm');
                  return (
                    <button
                      key={time.toString()}
                      type="button"
                      onClick={() => {
                        setValue('preferredDate', format(time, 'yyyy-MM-dd'));
                        setValue('preferredTime', format(time, 'HH:mm'));
                      }}
                      className={cn(
                        'py-2 px-3 rounded-md border text-sm font-medium transition-colors',
                        isSelected
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-200 hover:bg-gray-50'
                      )}
                    >
                      {format(time, 'h:mm a')}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No available time slots for this date.
              </div>
            )}
          </div>

          <FormField
            control={control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Zone</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Africa/Nairobi">East Africa Time (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="Europe/London">GMT (London)</option>
                    <option value="Europe/Paris">CET (Paris)</option>
                    <option value="America/New_York">EST (New York)</option>
                    <option value="Asia/Dubai">GST (Dubai)</option>
                    <option value="Asia/Shanghai">CST (Shanghai)</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 border-t">
            <FormField
              control={control}
              name="howDidYouHear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us? *</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the processing of my personal data in accordance with the{' '}
                    <a href="/privacy" className="text-primary underline">Privacy Policy</a> *
                  </FormLabel>
                  <FormDescription>
                    We'll use this information to contact you about your inquiry.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Add missing Checkbox component import
import { Checkbox } from '@/components/ui/checkbox';
