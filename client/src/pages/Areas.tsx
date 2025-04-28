import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { AreaServed } from "@shared/schema";

const AreaCard = ({ area }: { area: AreaServed }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">{area.county} County</h3>
        <ul className="space-y-2">
          {area.cities.map((city, index) => (
            <li key={index} className="flex items-start">
              <i className="fas fa-map-marker-alt text-secondary mt-1 mr-2"></i>
              <span>{city}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Areas = () => {
  const { data: areas, isLoading, error } = useQuery({ 
    queryKey: ['/api/areas'],
  });

  useEffect(() => {
    document.title = "Areas Served | Amita Sood Real Estate";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Loading Areas...
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
              Error Loading Areas
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
          <h1 className="text-4xl font-playfair font-bold text-white text-center">Areas Served</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              My <span className="text-secondary">Service Areas</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg">
              With over 16 years of experience, I provide expert real estate services across the greater Atlanta metropolitan area, with deep knowledge of these neighborhoods and communities.
            </p>
          </div>

          <div 
            className="relative h-[400px] bg-cover bg-center rounded-lg overflow-hidden mb-16" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575336127377-12306024e88c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80')" }}
          >
            <div className="absolute inset-0 bg-primary bg-opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center p-8">
              <div className="max-w-3xl text-white">
                <h2 className="text-3xl sm:text-4xl font-playfair font-bold mb-4">Atlanta Metropolitan Area</h2>
                <p className="text-lg mb-6">
                  The Atlanta metropolitan area is home to diverse communities, each with its own unique character and charm. From bustling urban centers to peaceful suburban neighborhoods, I'll help you find the perfect location for your lifestyle and needs.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {areas.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">
                Local <span className="text-secondary">Market Expertise</span>
              </h2>
              <p className="mb-4">
                My extensive experience across Atlanta's diverse communities allows me to provide valuable insights on:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-secondary mt-1 mr-3"></i>
                  <span>School district quality and boundaries</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-secondary mt-1 mr-3"></i>
                  <span>Neighborhood amenities and lifestyle</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-secondary mt-1 mr-3"></i>
                  <span>Property value trends in specific areas</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-secondary mt-1 mr-3"></i>
                  <span>Commute times and transportation options</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-secondary mt-1 mr-3"></i>
                  <span>Local regulations and homeowner associations</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-secondary mt-1 mr-3"></i>
                  <span>Future development plans and area growth</span>
                </li>
              </ul>
              <p className="mb-8">
                Whether you're new to Atlanta or a long-time resident looking to explore different neighborhoods, I can help you navigate the unique characteristics of each area to find your perfect match.
              </p>
              <Link href="/contact">
                <a className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
                  Get Neighborhood Insights
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1549399542-7e8f2e928464?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Atlanta neighborhood" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1625714075656-5855103c9921?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Atlanta skyline" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Suburban home" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Atlanta neighborhood" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary bg-opacity-5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-playfair font-bold mb-6">
              Looking for a specific neighborhood?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Let me help you explore the perfect area for your lifestyle, budget, and preferences.
            </p>
            <Link href="/contact">
              <a className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
                Contact Me Today
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Areas;
