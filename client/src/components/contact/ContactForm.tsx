import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const contactSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  interestIn: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interestIn: "",
      message: ""
    }
  });
  
  const mutation = useMutation({
    mutationFn: async (formData: ContactFormValues) => {
      return apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    onSuccess: async (response) => {
      const data = await response.json();
      toast({
        title: "Message Sent!",
        description: data.message,
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    await mutation.mutateAsync(data);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-playfair font-semibold mb-6">Send Me a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Full Name*</label>
            <input 
              type="text" 
              id="name" 
              className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address*</label>
            <input 
              type="email" 
              id="email" 
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
              {...register("phone")}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label htmlFor="interestIn" className="block text-gray-700 mb-2">I'm Interested In*</label>
            <select 
              id="interestIn" 
              className={`w-full px-4 py-2 border ${errors.interestIn ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
              {...register("interestIn")}
            >
              <option value="">Please Select</option>
              <option value="buying">Buying a Home</option>
              <option value="selling">Selling a Home</option>
              <option value="investing">Investment Properties</option>
              <option value="renting">Rental Properties</option>
              <option value="other">Other Services</option>
            </select>
            {errors.interestIn && <p className="text-red-500 text-sm mt-1">{errors.interestIn.message}</p>}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">Your Message*</label>
          <textarea 
            id="message" 
            rows={5} 
            className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            {...register("message")}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
