import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { sendEmail } from '@/lib/email';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSEO } from '@/hooks/useSEO';
import { pageSEO } from '@/lib/seo';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/StructuredData';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  phone: z.string().optional(),
});

export default function Contact() {
  useSEO(pageSEO.contact);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await sendEmail({
        to: 'info@hlcc.africa',
        subject: `New Contact Form: ${values.subject}`,
        data: values,
        formName: 'Contact Form',
        userEmail: values.email,
        userName: values.name,
      });

      if (result.success) {
        toast.success('Your message has been received with thanks.');
        form.reset();
      } else {
        toast.error(result.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative h-[40vh] flex items-center justify-center bg-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.1] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8">
              The Connection
            </p>
            <h1 className="text-5xl md:text-7xl font-heading font-light text-white mb-4">
              Begin the <span className="italic">Dialogue</span>
            </h1>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto">
              {/* Form Side */}
              <div className="relative">
                <div className="mb-16">
                  <h2 className="text-3xl font-heading font-light text-black mb-6 italic">Inquire Privately</h2>
                  <p className="text-black/50 font-light leading-relaxed">
                    Please share your details below. Our team provides bespoke responses to every inquiry within 24 hours.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                    <div className="grid md:grid-cols-2 gap-12">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-black/40">Full Name</FormLabel>
                            <FormControl>
                              <Input
                                className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-6 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all placeholder:text-black/10 text-lg font-light"
                                placeholder="Enter your name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-[10px] uppercase font-bold text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-black/40">Email Address</FormLabel>
                            <FormControl>
                              <Input
                                className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-6 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all placeholder:text-black/10 text-lg font-light"
                                placeholder="email@example.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-[10px] uppercase font-bold text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-black/40">Subject of Inquiry</FormLabel>
                          <FormControl>
                            <Input
                              className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-6 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all placeholder:text-black/10 text-lg font-light"
                              placeholder="How may we assist?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] uppercase font-bold text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-black/40">Detailed Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share the specifics of your needs..."
                              className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all placeholder:text-black/10 min-h-[120px] resize-none text-lg font-light"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] uppercase font-bold text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="bg-black text-white px-12 py-8 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#D4AF37] transition-all duration-500 w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Submit Engagement'
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Information Side */}
              <div className="space-y-16 lg:pl-20 border-l border-black/5">
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black mb-8">Bureau Locations</h3>
                    <div className="space-y-8">
                      <div className="flex items-start gap-8 group">
                        <div className="w-12 h-12 bg-[#fafafa] flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors duration-500">
                          <MapPin className="w-4 h-4 text-black group-hover:text-[#D4AF37] transition-colors" strokeWidth={1} />
                        </div>
                        <div>
                          <p className="text-black font-heading italic text-lg mb-2">Nairobi HQ</p>
                          <p className="text-black/40 font-light text-sm leading-relaxed">
                            Westlands Business Center, 2nd Floor,<br />
                            Westlands, Nairobi, Kenya
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black mb-8">Direct Channels</h3>
                    <div className="space-y-8">
                      <div className="flex items-start gap-8 group">
                        <div className="w-12 h-12 bg-[#fafafa] flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors duration-500">
                          <Mail className="w-4 h-4 text-black group-hover:text-[#D4AF37] transition-colors" strokeWidth={1} />
                        </div>
                        <div>
                          <p className="text-black font-heading italic text-lg mb-2">Email Correspondence</p>
                          <p className="text-black/40 font-light text-sm">
                            info@hlcc.africa<br />
                            partnerships@hlcc.africa
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-8 group">
                        <div className="w-12 h-12 bg-[#fafafa] flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors duration-500">
                          <Phone className="w-4 h-4 text-black group-hover:text-[#D4AF37] transition-colors" strokeWidth={1} />
                        </div>
                        <div>
                          <p className="text-black font-heading italic text-lg mb-2">Concierge Line</p>
                          <p className="text-black/40 font-light text-sm">
                            +254 115 335 322<br />
                            +254 724 213 506
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Component with Luxury Overlays */}
                <div className="relative aspect-video bg-[#fafafa] overflow-hidden border border-black/5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.805908858552!2d36.80500657494955!3d-1.292106235569154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d5a9f0a7c1%3A0x1c3c7b8b0b0b0b0b!2sWestlands%20Business%20Centre%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.1)' }}
                    allowFullScreen
                    loading="lazy"
                    title="HLCC Location Map"
                  ></iframe>
                  <div className="absolute inset-0 pointer-events-none border-[20px] border-white/40" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Presence */}
        <section className="py-24 bg-[#050505] text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[9px] font-bold mb-8">Digital Presence</p>
            <div className="flex justify-center gap-16">
              <a href="https://linkedin.com/company/hlcc" className="group">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-[#D4AF37] transition-colors">LinkedIn</span>
              </a>
              <a href="#" className="group">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-[#D4AF37] transition-colors">X / Twitter</span>
              </a>
              <a href="#" className="group">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-[#D4AF37] transition-colors">Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
