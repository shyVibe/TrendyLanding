import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadValidationSchema } from "@shared/schema";

type FormData = z.infer<typeof insertLeadValidationSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [formSuccess, setFormSuccess] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(insertLeadValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      setFormSuccess(true);
      form.reset();
      toast({
        title: "Success!",
        description: "Thank you! We'll be in touch shortly.",
        variant: "default",
      });
      
      // Reset success message after a delay
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    },
    onError: (error) => {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: FormData) {
    submitMutation.mutate(data);
  }

  return (
    <section id="contact" className="py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <motion.div 
          className="max-w-4xl mx-auto bg-[#111111] p-8 md:p-12 rounded-xl border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Level Up Your Skills?</h2>
              <p className="text-gray-300 mb-8">
                Book your coaching session today and start your journey to becoming a better player.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-gray-300">contact@esportscoaching.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="text-gray-300">(800) 732-4562</span>
                </div>
              </div>
            </div>
            
            <div>
              {formSuccess ? (
                <div className="bg-primary/20 border border-primary/30 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                  <p>We've received your information and will be in touch shortly.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-black border-gray-700 text-white" 
                              placeholder="John Doe"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              className="bg-black border-gray-700 text-white" 
                              placeholder="you@example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Game/Platform</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-black border-gray-700 text-white" 
                              placeholder="Valorant, League of Legends, etc."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="tel" 
                              className="bg-black border-gray-700 text-white" 
                              placeholder="(123) 456-7890"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-blue-700 py-6 transition transform hover:scale-105"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Book Coaching
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </Button>
                    
                    <div className="text-xs text-gray-400">
                      By submitting this form, you agree to our <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>.
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
