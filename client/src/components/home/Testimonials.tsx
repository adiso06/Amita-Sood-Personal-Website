import { Link } from "wouter";

interface Testimonial {
  id: number;
  name: string;
  image?: string;
  relationship: string;
  text: string;
  rating: number;
  yearsWithRealtor?: number;
  createdAt?: Date;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

// Hardcoded testimonial data
const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Robert Johnson",
    relationship: "Client for 13+ years",
    text: "We've been working with Amita for over 13 years. She's helped us buy multiple investment properties and our own home. Very honest, very personable and top of her game. I highly recommend her for both buying and selling.",
    rating: 5,
    yearsWithRealtor: 13,
    image: "/images/amita-sood.jpg",
    createdAt: new Date("2022-11-15")
  },
  {
    id: 2,
    name: "Sarah Williams",
    relationship: "Purchased two homes",
    text: "Amita will make home buying a breeze! She is professional, honest, and effective at negotiating with the other party. I've purchased two homes with her assistance and wouldn't hesitate to work with her again.",
    rating: 5,
    image: "/images/amita-sood.jpg",
    createdAt: new Date("2022-02-11")
  },
  {
    id: 3,
    name: "Michael Thompson",
    relationship: "Landlord for 7+ years",
    text: "Amita has kept our interests as landlords in focus through multiple rental application processes over many years. She is knowledgeable, fair, and always responsive. I wouldn't trust anyone else with our properties.",
    rating: 5,
    yearsWithRealtor: 7,
    image: "/images/amita-sood.jpg",
    createdAt: new Date("2021-09-24")
  }
];

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
            {testimonialData.slice(0, 3).map((testimonial) => (
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
