import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Mail, Phone, Video } from 'lucide-react';

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
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">How can we help you?</h3>
          <p className="text-sm text-gray-600">Tell us about your needs and preferences so we can tailor our approach.</p>
        </div>

        <div className="space-y-6">
          <FormField
            control={control}
            name="needs"
            render={({ field }) => {
              const currentValue = Array.isArray(field.value) ? field.value : [];

              return (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900 mb-2">
                    What are you looking to achieve? *
                  </FormLabel>
                  <FormDescription className="mb-4 text-sm text-gray-600">
                    Select all that apply
                  </FormDescription>
                  <div className="grid gap-4 md:grid-cols-2">
                    {NEEDS.map((item) => {
                      const isChecked = currentValue.includes(item.id);
                      const checkboxId = `needs-${item.id}`;

                      const handleChange = (checked: boolean) => {
                        const newValue = checked
                          ? [...currentValue, item.id]
                          : currentValue.filter((value: string) => value !== item.id);
                        field.onChange(newValue);
                      };

                      return (
                        <label
                          key={item.id}
                          htmlFor={checkboxId}
                          className={`flex flex-row items-start space-x-3 space-y-0 rounded-lg border-2 p-4 transition-all cursor-pointer ${isChecked
                              ? 'border-primary bg-primary/5 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          <FormControl>
                            <Checkbox
                              id={checkboxId}
                              checked={!!isChecked}
                              onCheckedChange={handleChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none flex-1 pointer-events-none">
                            <FormLabel
                              className={`font-medium ${isChecked ? 'text-gray-900' : 'text-gray-700'
                                }`}
                            >
                              {item.label}
                            </FormLabel>
                            <FormDescription className="text-xs text-gray-600">
                              {item.description}
                            </FormDescription>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  <FormMessage className="text-red-600 text-sm mt-2 flex items-center gap-1.5" />
                </FormItem>
              );
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-6 border-t border-gray-200"
      >
        <FormField
          control={control}
          name="timeframe"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <div>
                <FormLabel className="text-base font-medium text-gray-900 mb-2">
                  When are you looking to start? *
                </FormLabel>
                <FormDescription className="text-sm text-gray-600">
                  Help us understand your timeline
                </FormDescription>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || ''}
                  className="flex flex-col space-y-3"
                >
                  {TIMEFRAMES.map((timeframe) => (
                    <div
                      key={timeframe.value}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${field.value === timeframe.value
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      onClick={() => field.onChange(timeframe.value)}
                    >
                      <RadioGroupItem
                        value={timeframe.value}
                        id={timeframe.value}
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor={timeframe.value}
                        className="font-normal cursor-pointer flex-1"
                      >
                        {timeframe.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-600 text-sm mt-2 flex items-center gap-1.5" />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-6 border-t border-gray-200"
      >
        <FormField
          control={control}
          name="contactMethod"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base font-medium text-gray-900 mb-2">
                  Preferred contact method *
                </FormLabel>
                <FormDescription className="text-sm text-gray-600">
                  How would you prefer us to reach out to you?
                </FormDescription>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { id: 'email', label: 'Email', icon: Mail },
                  { id: 'phone', label: 'Phone Call', icon: Phone },
                  { id: 'video', label: 'Video Call', icon: Video },
                ].map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`relative rounded-lg border p-5 cursor-pointer transition-all ${field.value === method.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      onClick={() => field.onChange(method.id)}
                    >
                      <div className="mb-3">
                        <IconComponent
                          className={`h-6 w-6 ${field.value === method.id
                              ? 'text-primary'
                              : 'text-gray-500'
                            }`}
                        />
                      </div>
                      <div className={`font-medium text-sm ${field.value === method.id
                          ? 'text-gray-900'
                          : 'text-gray-700'
                        }`}>
                        {method.label}
                      </div>
                      <div className="absolute top-3 right-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${field.value === method.id
                              ? 'bg-primary border-primary'
                              : 'border-gray-300 bg-white'
                            }`}
                        >
                          {field.value === method.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <FormMessage className="text-red-600 text-sm mt-2 flex items-center gap-1.5" />
            </FormItem>
          )}
        />
      </motion.div>

      {bookingType === 'consultation' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-6 border-t border-gray-200"
        >
          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-900 mb-2">
                  Additional Information
                </FormLabel>
                <FormDescription className="mb-3 text-sm text-gray-600">
                  Please provide any additional details about your consultation needs
                </FormDescription>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    placeholder="Tell us more about what you're looking to achieve..."
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5" />
              </FormItem>
            )}
          />
        </motion.div>
      )}
    </div>
  );
}
