import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export function BookingStep1() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-12">
          <h3 className="text-xl font-heading font-light text-black italic mb-2 text-center">Contact Information</h3>
          <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-medium text-center">We value your professional confidentiality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <FormField
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-2 block">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name and Surname"
                    {...field}
                    className={cn(
                      "h-12 border-0 border-b border-black/10 rounded-none bg-transparent px-0 text-black placeholder:text-black/10 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all duration-300",
                      fieldState.error && "border-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-2 block">Official Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@organization.com"
                    {...field}
                    className={cn(
                      "h-12 border-0 border-b border-black/10 rounded-none bg-transparent px-0 text-black placeholder:text-black/10 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all duration-300",
                      fieldState.error && "border-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-2 block">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+254 --- --- ---"
                    {...field}
                    className={cn(
                      "h-12 border-0 border-b border-black/10 rounded-none bg-transparent px-0 text-black placeholder:text-black/10 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all duration-300",
                      fieldState.error && "border-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="company"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-2 block">Organization</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Organization Name"
                    {...field}
                    className={cn(
                      "h-12 border-0 border-b border-black/10 rounded-none bg-transparent px-0 text-black placeholder:text-black/10 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all duration-300",
                      fieldState.error && "border-red-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-[9px] uppercase tracking-widest mt-1" />
              </FormItem>
            )}
          />
        </div>
      </motion.div>
    </div>
  );
}
