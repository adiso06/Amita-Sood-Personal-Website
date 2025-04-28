import { useEffect } from "react";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Amita Sood Real Estate";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-white text-center">Contact Me</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Get In <span className="text-secondary">Touch</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg">
              I'm here to help with all your real estate needs. Let's start a conversation about how I can assist you in achieving your real estate goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Office <span className="text-secondary">Location</span>
            </h2>
          </div>

          <div className="relative h-[400px] bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            {/* Map placeholder - In a real application, would implement an actual map using Leaflet.js */}
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-2">Chapman Hall Realty</h3>
                <p className="mb-1">1772 Century Blvd NE, Atlanta, GA 30345</p>
                <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: By Appointment</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-4">
              <i className="fas fa-info-circle text-secondary mr-2"></i>
              I am available for in-person meetings, virtual consultations, and property tours.
            </p>
            <p className="mb-4">
              <i className="fas fa-phone-alt text-secondary mr-2"></i>
              For immediate assistance, please call (678) 205-9930
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-light p-8 rounded-lg shadow-md">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Buying a Home?</h3>
              <p className="text-gray-600 mb-4">
                Let me help you find the perfect property that meets your needs and budget.
              </p>
              <a href="tel:6782059930" className="text-secondary hover:text-primary font-medium transition duration-200">
                Call Now →
              </a>
            </div>

            <div className="bg-light p-8 rounded-lg shadow-md">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-sign"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Selling Your Home?</h3>
              <p className="text-gray-600 mb-4">
                I'll help you get the best price and terms for your property.
              </p>
              <a href="/services#listing-agent" className="text-secondary hover:text-primary font-medium transition duration-200">
                Learn More →
              </a>
            </div>

            <div className="bg-light p-8 rounded-lg shadow-md">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-question-circle"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Have Questions?</h3>
              <p className="text-gray-600 mb-4">
                I'm happy to answer any questions about the Atlanta real estate market.
              </p>
              <a href="mailto:amita.sood@chapmanhall.com" className="text-secondary hover:text-primary font-medium transition duration-200">
                Email Me →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
