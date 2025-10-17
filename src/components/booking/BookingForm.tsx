import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { BookingStep1 } from './steps/Step1';
import { BookingStep2 } from './steps/Step2';
import { BookingStep3 } from './steps/Step3';
import { BookingConfirmation } from './steps/Confirmation';
import { motion, AnimatePresence } from 'framer-motion';
import type { BookingType } from "@/components/booking/types.ts";

const formSchema = z.object({
  // Step 1
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Please enter your company name'),

  // Step 2
  needs: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  timeframe: z.string().min(1, 'Please select a timeframe'),
  contactMethod: z.enum(['email', 'phone', 'video']),

  // Step 3
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  timezone: z.string().default(Intl.DateTimeFormat().resolvedOptions().timeZone),

  // Additional
  message: z.string().optional(),
  howDidYouHear: z.string().min(1, 'Please let us know how you heard about us'),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
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
      needs: [],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
      // TODO: Replace with actual API call
      console.log('Form submitted:', { type, ...data });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
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
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Progress Bar */}
      <div className="px-6 pt-6">
        <div className="flex justify-between mb-6">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep > step.id
                  ? 'bg-green-500 text-white'
                  : currentStep === step.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {step.id}
              </div>
              <span className={`text-xs text-center ${currentStep >= step.id ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit) as any} className="px-6 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <BookingStep1 />}
              {currentStep === 2 && <BookingStep2 bookingType={type} />}
              {currentStep === 3 && <BookingStep3 />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isSubmitting}
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
                >
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
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
