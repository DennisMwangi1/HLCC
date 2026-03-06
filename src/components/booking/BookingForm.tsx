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
import { sendEmail } from '@/lib/email';
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
  // @ts-expect-error - contactMethod is an enum but we start with undefined
  contactMethod: z.enum(['email', 'phone', 'video'], {
    errorMap: () => ({ message: 'Please select your preferred contact method' }),
  }),

  // Step 3
  preferredDate: z.string().min(1, 'Please select a date for your meeting'),
  preferredTime: z.string().min(1, 'Please select a time for your meeting'),
  timezone: z.string(),

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
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      needs: [],
      timeframe: '',
      //@ts-ignore
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

      // Send email via Resend
      const result = await sendEmail({
        to: 'info@hlcc.africa',
        subject: `New Booking: ${type === 'discovery' ? 'Discovery Call' : 'Consultation'}`,
        data: {
          ...data,
          bookingType: type,
        },
        formName: `Booking Form (${type === 'discovery' ? 'Discovery Call' : 'Consultation'})`,
        userEmail: data.email,
        userName: data.name,
      });

      if (result.success) {
        setIsSuccess(true);
        toast.success('Booking request submitted successfully!');
        onSuccess?.();
      } else {
        toast.error(result.error || 'Failed to submit booking. Please try again.');
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
    <div className="w-full max-w-4xl mx-auto bg-white">
      {/* Progress Bar */}
      <div className="px-0 pt-4 pb-12">
        <div className="relative flex items-center justify-between max-w-2xl mx-auto">
          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-black/5 -translate-y-1/2">
            <motion.div
              className="h-full bg-[#D4AF37]"
              initial={{ width: 0 }}
              animate={{
                width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
              }}
              transition={{ duration: 0.5, ease: 'linear' }}
            />
          </div>

          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                <motion.div
                  className={`w-3 h-3 rounded-full border transition-all duration-500 ${isCompleted || isActive
                    ? 'bg-[#D4AF37] border-[#D4AF37]'
                    : 'bg-white border-black/10'
                    }`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.5 : 1,
                  }}
                />
                <span
                  className={`text-[9px] uppercase tracking-[0.2em] font-bold mt-4 transition-colors duration-300 ${isCompleted || isActive
                    ? 'text-black'
                    : 'text-black/30'
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
        <form onSubmit={handleSubmit(onSubmit)} className="px-0">
          <div className="min-h-[400px] py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {currentStep === 1 && <BookingStep1 />}
                {currentStep === 2 && <BookingStep2 bookingType={type} />}
                {currentStep === 3 && <BookingStep3 />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-16 pt-8 border-t border-black/5 flex justify-between items-center gap-6">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="px-0 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black hover:bg-transparent transition-all"
                >
                  &larr; Back
                </Button>
              )}
            </div>
            <div className="flex gap-4">
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-[#D4AF37] transition-all duration-500 rounded-none px-12 py-7 text-[10px] uppercase tracking-widest font-bold h-auto"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-[#D4AF37] transition-all duration-500 rounded-none px-16 py-7 text-[10px] uppercase tracking-widest font-bold h-auto disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Confirming...</span>
                    </>
                  ) : (
                    `Request ${type === 'discovery' ? 'Discovery Call' : 'Consultation'}`
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
