import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils';

export function BookingStep1() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Tell us about yourself</h3>
          <p className="text-sm text-gray-600">Please provide your contact information so we can reach out to you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 mb-2">Full Name *</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-11 flex items-center justify-center rounded-md border bg-gray-50 transition-colors",
                      fieldState.error ? "border-red-300 bg-red-50" : "border-gray-300"
                    )}>
                      <User className={cn(
                        "h-4 w-4",
                        fieldState.error ? "text-red-500" : "text-gray-500"
                      )} />
                    </div>
                    <div className="flex-1 relative">
                      <Input 
                        placeholder="John Doe" 
                        {...field} 
                        className={cn(
                          "h-11",
                          fieldState.error && "border-red-300 focus-visible:ring-red-500"
                        )}
                      />
                      {fieldState.error && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5">
                  {fieldState.error && <AlertCircle className="h-3.5 w-3.5" />}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 mb-2">Email *</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-11 flex items-center justify-center rounded-md border bg-gray-50 transition-colors",
                      fieldState.error ? "border-red-300 bg-red-50" : "border-gray-300"
                    )}>
                      <Mail className={cn(
                        "h-4 w-4",
                        fieldState.error ? "text-red-500" : "text-gray-500"
                      )} />
                    </div>
                    <div className="flex-1 relative">
                      <Input 
                        type="email" 
                        placeholder="you@company.com" 
                        {...field} 
                        className={cn(
                          "h-11",
                          fieldState.error && "border-red-300 focus-visible:ring-red-500"
                        )}
                      />
                      {fieldState.error && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5">
                  {fieldState.error && <AlertCircle className="h-3.5 w-3.5" />}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 mb-2">Phone Number *</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-11 flex items-center justify-center rounded-md border bg-gray-50 transition-colors",
                      fieldState.error ? "border-red-300 bg-red-50" : "border-gray-300"
                    )}>
                      <Phone className={cn(
                        "h-4 w-4",
                        fieldState.error ? "text-red-500" : "text-gray-500"
                      )} />
                    </div>
                    <div className="flex-1 relative">
                      <Input 
                        type="tel" 
                        placeholder="+254 700 000 000" 
                        {...field} 
                        className={cn(
                          "h-11",
                          fieldState.error && "border-red-300 focus-visible:ring-red-500"
                        )}
                      />
                      {fieldState.error && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5">
                  {fieldState.error && <AlertCircle className="h-3.5 w-3.5" />}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="company"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 mb-2">Company Name *</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-11 flex items-center justify-center rounded-md border bg-gray-50 transition-colors",
                      fieldState.error ? "border-red-300 bg-red-50" : "border-gray-300"
                    )}>
                      <Building2 className={cn(
                        "h-4 w-4",
                        fieldState.error ? "text-red-500" : "text-gray-500"
                      )} />
                    </div>
                    <div className="flex-1 relative">
                      <Input 
                        placeholder="Company Ltd" 
                        {...field} 
                        className={cn(
                          "h-11",
                          fieldState.error && "border-red-300 focus-visible:ring-red-500"
                        )}
                      />
                      {fieldState.error && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm mt-1.5 flex items-center gap-1.5">
                  {fieldState.error && <AlertCircle className="h-3.5 w-3.5" />}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </motion.div>
    </div>
  );
}
