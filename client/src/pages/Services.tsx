import { useEffect } from "react";
import { Link } from "wouter";

interface ServiceCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const ServiceCard = ({ id, icon, title, description }: ServiceCardProps) => {
  return (
    <div id={id} className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
      <div className="text-secondary text-3xl mb-4">
        <i className={icon}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
};

const Services = () => {
  useEffect(() => {
    document.title = "Services | Amita Sood Real Estate";
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Scroll to hash if exists
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-white text-center">Real Estate Services</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Comprehensive <span className="text-secondary">Services</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg">
              With over 16 years of experience in the Atlanta real estate market, I offer a wide range of specialized services to meet your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ServiceCard
              id="buyers-agent"
              icon="fas fa-home"
              title="Buyer's Agent"
              description="As your dedicated buyer's agent, I'll guide you through every step of the home buying process. From defining your needs and budget to negotiating the best terms and navigating closing, I provide expert advice and support to make your home purchase smooth and successful. I'll help you find the perfect property that meets your lifestyle, location preferences, and investment goals."
            />
            
            <ServiceCard
              id="listing-agent"
              icon="fas fa-sign"
              title="Listing Agent"
              description="When selling your home, I implement a strategic marketing approach to showcase your property's best features and attract qualified buyers. I'll provide a comprehensive market analysis to determine optimal pricing, coordinate professional photography, create compelling listings, and leverage my extensive network to maximize exposure. My negotiation skills ensure you receive the best possible offers and terms."
            />
            
            <ServiceCard
              id="investment-properties"
              icon="fas fa-building"
              title="Investment Properties"
              description="Building a successful real estate investment portfolio requires expertise and market knowledge. I help investors identify properties with strong potential for appreciation and rental income across the Atlanta metro area. From single-family homes to multi-unit properties, I provide analysis of cap rates, ROI projections, and neighborhood growth trends to support informed investment decisions."
            />
            
            <ServiceCard
              id="relocation"
              icon="fas fa-truck-moving"
              title="Relocation Specialist"
              description="Moving to or from the Atlanta area requires specialized knowledge of neighborhoods, schools, commute patterns, and local amenities. As a relocation specialist, I help clients smoothly transition to their new location with personalized area tours, community information, and coordination with employers and relocation companies. I streamline the process to reduce stress and help you feel at home in your new community."
            />
            
            <ServiceCard
              id="first-time-buyers"
              icon="fas fa-key"
              title="First-Time Homebuyers"
              description="Purchasing your first home is an exciting milestone, and I provide the extra guidance and education first-time buyers need. I explain financing options, down payment assistance programs, and the entire purchase process in clear, understandable terms. My patient approach ensures you're comfortable with each decision, from house hunting to closing, making your first real estate purchase a positive experience."
            />
            
            <ServiceCard
              id="short-sale"
              icon="fas fa-file-contract"
              title="Short Sale Specialist"
              description="Navigating short sales requires specialized knowledge and experience. I work with homeowners facing financial hardship to negotiate with lenders and facilitate sales for less than the mortgage balance. My expertise in this complex process helps homeowners avoid foreclosure while minimizing credit impact. I coordinate with all parties, including banks, attorneys, and potential buyers, to achieve successful outcomes."
            />
            
            <ServiceCard
              id="landlord"
              icon="fas fa-user-tie"
              title="Landlord Representation"
              description="As a landlord representative, I help property owners maximize their rental investments. Services include market analysis for optimal rental pricing, tenant screening, lease negotiation, and property marketing. I identify qualified tenants who will care for your property and provide reliable income. For many landlord clients, I've established long-term relationships spanning 7+ years, managing multiple properties across the Atlanta area."
            />
            
            <ServiceCard
              id="rentals"
              icon="fas fa-house-user"
              title="Rentals"
              description="Finding the perfect rental home requires the same attention to detail as a purchase. I help tenants locate properties that meet their needs for location, amenities, budget, and lease terms. My extensive network provides access to quality rentals, sometimes before they hit the market. I negotiate favorable lease terms on your behalf and ensure all paperwork is properly completed for a smooth rental experience."
            />
            
            <ServiceCard
              id="luxury"
              icon="fas fa-gem"
              title="Luxury Properties"
              description="With experience handling transactions up to $1.7 million, I provide white-glove service for luxury property buyers and sellers. I understand the unique market dynamics of high-end real estate and implement discreet, targeted marketing strategies. For luxury buyers, I offer personalized property searches, often with access to off-market listings, and coordinate with other professionals including attorneys, wealth managers, and private bankers."
            />
          </div>
          
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
              Contact Me About Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Why Choose <span className="text-secondary">Amita Sood</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg">
              My clients consistently highlight these qualities in their testimonials and reviews.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-4 bg-secondary bg-opacity-20 rounded-full mb-4">
                <i className="fas fa-map-marked-alt text-2xl text-secondary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of Atlanta neighborhoods, market trends, and property values</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-4 bg-secondary bg-opacity-20 rounded-full mb-4">
                <i className="fas fa-handshake text-2xl text-secondary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Negotiation Skills</h3>
              <p className="text-gray-600">Proven ability to secure favorable terms and pricing for clients</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-4 bg-secondary bg-opacity-20 rounded-full mb-4">
                <i className="fas fa-comments text-2xl text-secondary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Communication</h3>
              <p className="text-gray-600">Clear, responsive communication throughout the entire transaction process</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-4 bg-secondary bg-opacity-20 rounded-full mb-4">
                <i className="fas fa-shield-alt text-2xl text-secondary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Client Advocacy</h3>
              <p className="text-gray-600">Unwavering commitment to representing your best interests at all times</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
