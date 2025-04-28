import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Properties from "@/components/home/Properties";
import Testimonials from "@/components/home/Testimonials";
import Areas from "@/components/home/Areas";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Amita Sood | Atlanta Luxury Real Estate";
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Stats />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Services />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Properties />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Testimonials />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Areas />
      </ErrorBoundary>
      
      <section id="contact" className="py-20 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Contact <span className="text-secondary">Me</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg">
              Let's start a conversation about your real estate needs. I'm here to help you navigate the Atlanta market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ErrorBoundary>
                <ContactForm />
              </ErrorBoundary>
            </div>
            <div>
              <ErrorBoundary>
                <ContactInfo />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
