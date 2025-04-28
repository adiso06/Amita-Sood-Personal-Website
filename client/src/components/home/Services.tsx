import { Link } from "wouter";

interface ServiceProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const ServiceCard = ({ icon, title, description, link }: ServiceProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
      <div className="text-secondary text-3xl mb-4">
        <i className={icon}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={link} className="text-secondary hover:text-primary font-medium transition duration-200">
        Learn More →
      </Link>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: "fas fa-home",
      title: "Buyer's Agent",
      description: "Expert guidance through the entire home buying process, from search to closing.",
      link: "/services#buyers-agent",
    },
    {
      icon: "fas fa-sign",
      title: "Listing Agent",
      description: "Strategic marketing and negotiation to sell your property at the best possible price.",
      link: "/services#listing-agent",
    },
    {
      icon: "fas fa-building",
      title: "Investment Properties",
      description: "Identifying lucrative investment opportunities in the Atlanta market for long-term growth.",
      link: "/services#investment-properties",
    },
    {
      icon: "fas fa-truck-moving",
      title: "Relocation Specialist",
      description: "Comprehensive assistance for clients moving to or from the Atlanta metropolitan area.",
      link: "/services#relocation",
    },
    {
      icon: "fas fa-key",
      title: "First-Time Homebuyers",
      description: "Specialized support and education for those purchasing their first home.",
      link: "/services#first-time-buyers",
    },
    {
      icon: "fas fa-file-contract",
      title: "Short Sale Specialist",
      description: "Navigating the complexities of short sale transactions with expertise and care.",
      link: "/services#short-sale",
    },
    {
      icon: "fas fa-user-tie",
      title: "Landlord Representation",
      description: "Managing rental property transactions and finding qualified tenants for landlords.",
      link: "/services#landlord",
    },
    {
      icon: "fas fa-house-user",
      title: "Rentals",
      description: "Assisting tenants in finding the perfect rental property to call home.",
      link: "/services#rentals",
    },
  ];

  return (
    <section id="services" className="py-20 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            My <span className="text-secondary">Services</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg">
            I offer comprehensive real estate services tailored to your unique needs, whether you're buying your first home, selling a property, or building an investment portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.slice(0, 4).map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {services.slice(4).map((service, index) => (
            <ServiceCard key={index + 4} {...service} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services" className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
