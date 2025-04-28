import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.image || "https://via.placeholder.com/200x200"} 
          alt={testimonial.name} 
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.relationship}</p>
        </div>
      </div>
      <div className="mb-4 text-secondary">
        {[...Array(testimonial.rating)].map((_, i) => (
          <i key={i} className="fas fa-star"></i>
        ))}
      </div>
      <p className="italic mb-4">{testimonial.text}</p>
      {testimonial.yearsWithRealtor && (
        <div className="text-sm text-gray-600">
          <i className="fas fa-clock text-secondary mr-1"></i> Client for {testimonial.yearsWithRealtor}+ years
        </div>
      )}
    </div>
  );
};

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery({ 
    queryKey: ['/api/testimonials'],
  });

  useEffect(() => {
    document.title = "Testimonials | Amita Sood Real Estate";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Loading Testimonials...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Error Loading Testimonials
            </h2>
            <p>Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-white text-center">Client Testimonials</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              What Clients <span className="text-secondary">Say About Me</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg">
              Over my 16+ years in Atlanta real estate, I've built lasting relationships with clients who value honesty, expertise, and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial: Testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Why Clients <span className="text-secondary">Choose Me</span>
            </h2>
            <p className="max-w-3xl mx-auto">
              Clients consistently highlight these qualities in their feedback about working with me.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of Atlanta's neighborhoods, market trends, and property values.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Negotiation Skills</h3>
              <p className="text-gray-600">Proven ability to secure favorable terms and pricing for my clients.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Communication</h3>
              <p className="text-gray-600">Clear, responsive communication throughout the entire process.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-user-friends"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Long-Term Relationships</h3>
              <p className="text-gray-600">Many clients have worked with me for 7-13+ years across multiple transactions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary bg-opacity-5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-playfair font-bold mb-6">
              Ready to start your real estate journey?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Whether you're buying, selling, or investing, I'm here to provide expert guidance and support throughout the process.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200"
            >
              Contact Me Today
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
