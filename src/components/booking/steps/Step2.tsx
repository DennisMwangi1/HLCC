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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-12">
          <h3 className="text-xl font-heading font-light text-black italic mb-2 text-center">Inquiry Scope</h3>
          <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-medium text-center">Tailoring our expertise to your specific needs.</p>
        </div>

        <div className="space-y-10">
          <FormField
            control={control}
            name="needs"
            render={({ field }) => {
              const currentValue = Array.isArray(field.value) ? field.value : [];

              return (
                <FormItem className="space-y-6">
                  <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6 block text-center">
                    Areas of Interest
                  </FormLabel>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                          className={`flex flex-col h-full items-start space-y-4 rounded-none border p-6 transition-all duration-500 cursor-pointer ${isChecked
                            ? 'border-[#D4AF37] bg-white shadow-xl'
                            : 'border-black/5 hover:border-black/20 hover:bg-slate-900/[0.02]'
                            }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <FormControl>
                              <Checkbox
                                id={checkboxId}
                                checked={!!isChecked}
                                onCheckedChange={handleChange}
                                className={`rounded-none border-black/10 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]`}
                              />
                            </FormControl>
                          </div>
                          <div className="space-y-1 flex-1">
                            <FormLabel
                              className={`text-[11px] font-bold uppercase tracking-widest ${isChecked ? 'text-black' : 'text-black/60'
                                }`}
                            >
                              {item.label}
                            </FormLabel>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-2" />
                </FormItem>
              );
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-12 border-t border-black/5"
      >
        <FormField
          control={control}
          name="timeframe"
          render={({ field }) => (
            <FormItem className="space-y-6">
              <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 block text-center">
                Implementation Timeline
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || ''}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                >
                  {TIMEFRAMES.map((timeframe) => (
                    <div
                      key={timeframe.value}
                      className={`flex flex-col items-center justify-center p-4 h-24 rounded-none border transition-all duration-500 cursor-pointer text-center ${field.value === timeframe.value
                        ? 'border-[#D4AF37] bg-white shadow-lg'
                        : 'border-black/5 hover:border-black/20 hover:bg-slate-900/[0.02]'
                        }`}
                      onClick={() => field.onChange(timeframe.value)}
                    >
                      <RadioGroupItem
                        value={timeframe.value}
                        id={timeframe.value}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={timeframe.value}
                        className={`text-[10px] uppercase tracking-widest font-bold cursor-pointer ${field.value === timeframe.value ? 'text-black' : 'text-black/40'}`}
                      >
                        {timeframe.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-2" />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-12 border-t border-black/5"
      >
        <FormField
          control={control}
          name="contactMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 block text-center mb-8">
                Consultation Protocol
              </FormLabel>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { id: 'email', label: 'Electronic Correspondence', icon: Mail },
                  { id: 'phone', label: 'Audio Consultation', icon: Phone },
                  { id: 'video', label: 'Virtual Executive Meeting', icon: Video },
                ].map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`relative flex flex-col items-center justify-center rounded-none border p-8 cursor-pointer transition-all duration-500 ${field.value === method.id
                        ? 'border-[#D4AF37] bg-white shadow-xl translate-y-[-4px]'
                        : 'border-black/5 hover:border-black/20 hover:bg-slate-900/[0.1]'
                        }`}
                      onClick={() => field.onChange(method.id)}
                    >
                      <div className="mb-4">
                        <IconComponent
                          className={`h-5 w-5 ${field.value === method.id
                            ? 'text-[#D4AF37]'
                            : 'text-black/20'
                            }`}
                        />
                      </div>
                      <div className={`text-[9px] uppercase tracking-[0.2em] font-bold text-center ${field.value === method.id
                        ? 'text-black'
                        : 'text-black/40'
                        }`}>
                        {method.label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-2" />
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
