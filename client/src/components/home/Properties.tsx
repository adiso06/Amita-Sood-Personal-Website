import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className="property-card" 
      data-category={`${property.status} ${property.isLuxury ? 'luxury' : ''}`}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
        <div className="relative">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-64 object-cover"
          />
          <div className={`absolute top-4 left-4 ${property.status === 'active' ? 'bg-secondary' : 'bg-gray-600'} text-white px-3 py-1 text-sm font-medium rounded`}>
            {property.status === 'active' ? 'Active' : 'SOLD'}
          </div>
          <div className="absolute bottom-4 right-4 bg-primary bg-opacity-80 text-white px-3 py-1 text-sm font-medium rounded">
            {formatPrice(property.price)}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
          <p className="text-gray-500 mb-4">{property.address}, {property.city}, {property.state} {property.zipCode}</p>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span><i className="fas fa-bed mr-1"></i> {property.bedrooms} Beds</span>
            <span><i className="fas fa-bath mr-1"></i> {property.bathrooms} Baths</span>
            <span><i className="fas fa-ruler-combined mr-1"></i> {property.squareFeet.toLocaleString()} Sq Ft</span>
          </div>
          <Link href={`/properties/${property.id}`}>
            <a className="block text-center bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded font-medium transition duration-200">
              View Details
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Properties = () => {
  const [filter, setFilter] = useState("all");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  
  const { data: properties, isLoading, error } = useQuery({ 
    queryKey: ['/api/properties'],
  });

  useEffect(() => {
    if (properties) {
      if (filter === "all") {
        setFilteredProperties(properties);
      } else if (filter === "active") {
        setFilteredProperties(properties.filter((p: Property) => p.status === "active"));
      } else if (filter === "sold") {
        setFilteredProperties(properties.filter((p: Property) => p.status === "sold"));
      } else if (filter === "luxury") {
        setFilteredProperties(properties.filter((p: Property) => p.isLuxury === true));
      }
    }
  }, [properties, filter]);

  if (isLoading) {
    return (
      <section id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Loading Properties...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Error Loading Properties
            </h2>
            <p>Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="properties" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            Featured <span className="text-secondary">Properties</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg">
            Discover exceptional properties across the Atlanta metropolitan area that match your lifestyle and investment goals.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`property-filter-btn px-5 py-2 text-sm font-medium ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "bg-light-gray text-primary hover:bg-gray-200"
              } rounded-l-lg focus:z-10 focus:outline-none`}
              onClick={() => setFilter("all")}
            >
              All Properties
            </button>
            <button
              type="button"
              className={`property-filter-btn px-5 py-2 text-sm font-medium ${
                filter === "active"
                  ? "bg-primary text-white"
                  : "bg-light-gray text-primary hover:bg-gray-200"
              } focus:z-10 focus:outline-none`}
              onClick={() => setFilter("active")}
            >
              Active Listings
            </button>
            <button
              type="button"
              className={`property-filter-btn px-5 py-2 text-sm font-medium ${
                filter === "sold"
                  ? "bg-primary text-white"
                  : "bg-light-gray text-primary hover:bg-gray-200"
              } focus:z-10 focus:outline-none`}
              onClick={() => setFilter("sold")}
            >
              Recently Sold
            </button>
            <button
              type="button"
              className={`property-filter-btn px-5 py-2 text-sm font-medium ${
                filter === "luxury"
                  ? "bg-primary text-white"
                  : "bg-light-gray text-primary hover:bg-gray-200"
              } rounded-r-lg focus:z-10 focus:outline-none`}
              onClick={() => setFilter("luxury")}
            >
              Luxury Homes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/properties">
            <a className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
              View All Properties
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Properties;
