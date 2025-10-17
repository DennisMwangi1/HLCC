import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

const NEEDS = [
  {
    id: 'leadership',
    label: 'Leadership Development',
    description: 'Enhancing leadership capabilities and executive presence'
  },
  {
    id: 'team',
    label: 'Team Coaching',
    description: 'Improving team dynamics and collaboration'
  },
  {
    id: 'culture',
    label: 'Culture Transformation',
    description: 'Shaping and evolving organizational culture'
  },
  {
    id: 'strategy',
    label: 'Strategic Planning',
    description: 'Developing and executing business strategies'
  },
  {
    id: 'change',
    label: 'Change Management',
    description: 'Navigating organizational change'
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Other organizational development needs'
  },
];

const TIMEFRAMES = [
  { value: 'immediately', label: 'Immediately' },
  { value: '1-3 months', label: 'Within 1-3 months' },
  { value: '3-6 months', label: 'Within 3-6 months' },
  { value: '6+ months', label: '6+ months from now' },
  { value: 'exploring', label: 'Just exploring options' },
];

interface BookingStep2Props {
  bookingType: 'discovery' | 'consultation';
}

export function BookingStep2({ bookingType }: BookingStep2Props) {
  const { control } = useFormContext();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold mb-6">How can we help you?</h3>

        <div className="space-y-4">
          <FormField
            control={control}
            name="needs"
            render={() => (
              <FormItem>
                <FormLabel className="text-base">
                  What are you looking to achieve? *
                </FormLabel>
                <FormDescription className="mb-4">
                  Select all that apply
                </FormDescription>
                <div className="grid gap-4 md:grid-cols-2">
                  {NEEDS.map((item) => (
                    <FormField
                      key={item.id}
                      control={control}
                      name="needs"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-gray-50 transition-colors"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item.id
                                      )
                                    );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-medium">
                                {item.label}
                              </FormLabel>
                              <FormDescription className="text-xs">
                                {item.description}
                              </FormDescription>
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-4 border-t"
      >
        <FormField
          control={control}
          name="timeframe"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>When are you looking to start? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  {TIMEFRAMES.map((timeframe) => (
                    <div key={timeframe.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={timeframe.value} id={timeframe.value} />
                      <Label htmlFor={timeframe.value} className="font-normal">
                        {timeframe.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-4 border-t"
      >
        <FormField
          control={control}
          name="contactMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred contact method *</FormLabel>
              <FormDescription className="mb-3">
                How would you prefer us to reach out to you?
              </FormDescription>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { id: 'email', label: 'Email', icon: '✉️' },
                  { id: 'phone', label: 'Phone Call', icon: '📞' },
                  { id: 'video', label: 'Video Call', icon: '🎥' },
                ].map((method) => (
                  <div
                    key={method.id}
                    className={`relative rounded-lg border p-4 cursor-pointer transition-all ${field.value === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => field.onChange(method.id)}
                  >
                    <div className="text-2xl mb-2">{method.icon}</div>
                    <div className="font-medium">{method.label}</div>
                    <div className="absolute top-2 right-2">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${field.value === method.id
                          ? 'bg-primary border-primary'
                          : 'border-gray-300'
                          }`}
                      >
                        {field.value === method.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      {bookingType === 'consultation' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4 border-t"
        >
          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormDescription className="mb-2">
                  Please provide any additional details about your consultation needs
                </FormDescription>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                    placeholder="Tell us more about what you're looking to achieve..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      )}
    </div>
  );
}
