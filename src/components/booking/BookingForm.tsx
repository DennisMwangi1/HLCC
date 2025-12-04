import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2, Check } from 'lucide-react';
import { BookingStep1 } from './steps/Step1';
import { BookingStep2 } from './steps/Step2';
import { BookingStep3 } from './steps/Step3';
import { BookingConfirmation } from './steps/Confirmation';
import { motion, AnimatePresence } from 'framer-motion';
import type { BookingType } from "@/components/booking/types.ts";
import { submitToMailchimp, parseName } from '@/lib/mailchimp';
import { toast } from 'sonner';

const formSchema = z.object({
  // Step 1
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Please enter your company name'),

  // Step 2
  needs: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  timeframe: z.string().min(1, 'Please select when you would like to start'),
  //@ts-ignore
  contactMethod: z.enum(['email', 'phone', 'video'], {
    errorMap: () => ({ message: 'Please select your preferred contact method' }),
  }),

  // Step 3
  preferredDate: z.string().min(1, 'Please select a date for your meeting'),
  preferredTime: z.string().min(1, 'Please select a time for your meeting'),
  timezone: z.string().default(Intl.DateTimeFormat().resolvedOptions().timeZone),

  // Additional
  message: z.string().optional(),
  howDidYouHear: z.string().min(1, 'Please let us know how you heard about us'),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy to continue',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface BookingFormProps {
  type: BookingType;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BookingForm({ type, onSuccess, onCancel }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      needs: [],
      timeframe: '',
      contactMethod: undefined,
      preferredDate: '',
      preferredTime: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message: '',
      howDidYouHear: '',
      agreeToTerms: false,
    },
  });

  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    let fields: (keyof FormValues)[] = [];

    if (currentStep === 1) {
      fields = ['name', 'email', 'phone', 'company'];
    } else if (currentStep === 2) {
      fields = ['needs', 'timeframe', 'contactMethod'];
    }

    const isValid = await trigger(fields);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      const { firstName, lastName } = parseName(data.name);

      // Submit to Mailchimp
      const result = await submitToMailchimp(
        {
          email: data.email,
          firstName,
          lastName,
          phone: data.phone,
          company: data.company,
          mergeFields: {
            NEEDS: Array.isArray(data.needs) ? data.needs.join(', ') : data.needs,
            TIMEFRAME: data.timeframe,
            CONTACT_METHOD: data.contactMethod,
            PREFERRED_DATE: data.preferredDate,
            PREFERRED_TIME: data.preferredTime,
            TIMEZONE: data.timezone,
            MESSAGE: data.message || '',
            HOW_HEARD: data.howDidYouHear,
            BOOKING_TYPE: type,
          },
          tags: [type === 'discovery' ? 'discovery-call' : 'consultation', 'booking'],
        },
        'booking'
      );

      if (result.success) {
        setIsSuccess(true);
        toast.success('Booking request submitted successfully!');
        onSuccess?.();
      } else {
        toast.error(result.error || 'Failed to submit booking. Please try again.');
        // Still show success to user for booking UX, but log error
        console.error('Mailchimp error:', result.error);
        setIsSuccess(true);
        onSuccess?.();
      }
    } catch (error) {
      console.error('Error submitting booking form:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: 'Your Information' },
    { id: 2, title: 'Your Needs' },
    { id: 3, title: 'Schedule' },
  ];

  if (isSuccess) {
    return <BookingConfirmation onClose={onCancel} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg">
      {/* Progress Bar */}
      <div className="px-6 pt-8 pb-6 border-b border-gray-100">
        <div className="relative flex items-center justify-between">
          {/* Connecting Lines */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{
                width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>

          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${isCompleted
                      ? 'bg-primary text-white shadow-md'
                      : isActive
                        ? 'bg-primary text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </motion.div>
                <span
                  className={`text-xs font-medium text-center transition-colors duration-200 ${isCompleted || isActive
                      ? 'text-gray-900'
                      : 'text-gray-500'
                    }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit) as any} className="px-6 pb-6">
          <div className="min-h-[400px] py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {currentStep === 1 && <BookingStep1 />}
                {currentStep === 2 && <BookingStep2 bookingType={type} />}
                {currentStep === 3 && <BookingStep3 />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center gap-4">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="min-w-[110px] h-11 font-medium border-2 hover:bg-gray-50 transition-all"
                >
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="min-w-[140px] h-11 font-semibold text-base shadow-md hover:shadow-lg transition-all"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[220px] h-11 font-semibold text-base shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    `Book ${type === 'discovery' ? 'Discovery Call' : 'Consultation'}`
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
