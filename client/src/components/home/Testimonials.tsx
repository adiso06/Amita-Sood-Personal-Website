import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-2">
        <p className="text-gray-500 text-sm">{testimonial.relationship}</p>
        <p className="text-gray-500 text-sm">
          {testimonial.createdAt ? new Date(testimonial.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long'
          }) : 'Recently added'}
        </p>
      </div>
      <div className="mb-4 text-secondary">
        {[...Array(testimonial.rating)].map((_, i) => (
          <i key={i} className="fas fa-star"></i>
        ))}
      </div>
      <p className="italic mb-4">{testimonial.text}</p>
    </div>
  );
};

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery({ 
    queryKey: ['/api/testimonials'],
  });

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Loading Testimonials...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="py-20 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Error Loading Testimonials
            </h2>
            <p>Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            Client <span className="text-secondary">Testimonials</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg">
            Hear what my clients have to say about their real estate experience and our long-term working relationships.
          </p>
        </div>

        <div className="testimonial-slider relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial: Testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/testimonials">
              <div className="text-primary hover:text-secondary font-medium transition duration-200 cursor-pointer">
                View More Testimonials →
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
