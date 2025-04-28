import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";

// Real properties data for homepage
const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Beautiful Home in Alpharetta",
    description: "Spacious home with modern amenities in a desirable neighborhood.",
    address: "340 Kincardine Way",
    city: "Alpharetta",
    state: "GA",
    zipCode: "30022",
    price: 1140000,
    bedrooms: 6,
    bathrooms: 5,
    squareFeet: 4500,
    yearBuilt: 2015,
    propertyType: "Single Family",
    status: "active",
    isLuxury: true,
    createdAt: null,
    images: ["/images/property-placeholder.jpg"],
    features: ["Large Backyard", "Gourmet Kitchen", "Master Suite"],
    county: "Fulton"
  },
  {
    id: 2,
    title: "Recently Sold in Johns Creek",
    description: "Elegant home in desirable Johns Creek neighborhood.",
    address: "230 Fernly Park Dr",
    city: "Johns Creek",
    state: "GA",
    zipCode: "30022",
    price: 1125000,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4200,
    yearBuilt: 2012,
    propertyType: "Single Family",
    status: "sold",
    isLuxury: true,
    createdAt: null,
    images: ["/images/property-placeholder.jpg"],
    features: ["Swimming Pool", "Home Office", "Gourmet Kitchen"],
    county: "Fulton"
  },
  {
    id: 3,
    title: "Charming Home in Marietta",
    description: "Beautiful home in prestigious East Cobb neighborhood.",
    address: "2609 Peterboro Row",
    city: "Marietta",
    state: "GA",
    zipCode: "30062",
    price: 719000,
    bedrooms: 5,
    bathrooms: 3.5,
    squareFeet: 3800,
    yearBuilt: 2005,
    propertyType: "Single Family",
    status: "sold",
    isLuxury: false,
    createdAt: null,
    images: ["/images/property-placeholder.jpg"],
    features: ["Finished Basement", "Open Floor Plan", "Large Yard"],
    county: "Cobb"
  },
  {
    id: 4,
    title: "Luxury Estate in Duluth",
    description: "Magnificent estate in exclusive gated community.",
    address: "2689 Tranquilla Way",
    city: "Duluth",
    state: "GA",
    zipCode: "30097",
    price: 1700000,
    bedrooms: 6,
    bathrooms: 5.5,
    squareFeet: 6500,
    yearBuilt: 2010,
    propertyType: "Single Family",
    status: "sold",
    isLuxury: true,
    createdAt: null,
    images: ["/images/property-placeholder.jpg"],
    features: ["Theater Room", "Wine Cellar", "Outdoor Kitchen"],
    county: "Gwinnett"
  },
  {
    id: 5,
    title: "Modern Home in Cumming",
    description: "Stunning home with high-end finishes in desirable neighborhood.",
    address: "5620 Chestnut Dr",
    city: "Cumming",
    state: "GA",
    zipCode: "30040",
    price: 809000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3600,
    yearBuilt: 2018,
    propertyType: "Single Family",
    status: "sold",
    isLuxury: true,
    createdAt: null,
    images: ["/images/property-placeholder.jpg"],
    features: ["Smart Home", "Hardwood Floors", "Gourmet Kitchen"],
    county: "Forsyth"
  },
  {
    id: 6,
    title: "Elegant Home in Alpharetta",
    description: "Beautiful home in highly sought-after community.",
    address: "1610 Trellis Pl",
    city: "Alpharetta",
    state: "GA",
    zipCode: "30004",
    price: 575000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    yearBuilt: 2000,
    propertyType: "Single Family",
    status: "sold",
    isLuxury: false,
    createdAt: null,
    images: ["/images/property-placeholder.jpg"],
    features: ["Fenced Yard", "Open Floor Plan", "Updated Kitchen"],
    county: "Fulton"
  },
];

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
            src={(property.images && Array.isArray(property.images) && property.images.length > 0) ? property.images[0] : "/images/property-placeholder.jpg"} 
            alt={property.title} 
            className="w-full h-64 object-cover"
            onError={(e) => {
              // Fallback image if the property image doesn't load
              (e.target as HTMLImageElement).src = "/images/property-placeholder.jpg";
            }}
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
          <Link href={`/properties/${property.id}`} className="block text-center bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded font-medium transition duration-200">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const Properties = () => {
  const [filter, setFilter] = useState("all");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  
  // Use a more robust error handler with the mock data fallback
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
    // Adding this option to prevent refetching on window focus, reducing error messages
    refetchOnWindowFocus: false,
    // Set a reasonable timeout
    retry: false,
    // Initialize with mock data when no server is available
    initialData: (): Property[] => {
      console.log('Using mock property data fallback');
      return MOCK_PROPERTIES;
    }
  });

  useEffect(() => {
    // Ensure properties is always treated as an array of Property objects
    const propertyData = Array.isArray(properties) ? properties : MOCK_PROPERTIES;
    
    if (filter === "all") {
      setFilteredProperties(propertyData);
    } else if (filter === "active") {
      setFilteredProperties(propertyData.filter((p: Property) => p.status === "active"));
    } else if (filter === "sold") {
      setFilteredProperties(propertyData.filter((p: Property) => p.status === "sold"));
    } else if (filter === "luxury") {
      setFilteredProperties(propertyData.filter((p: Property) => p.isLuxury === true));
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

  // Even if there's an error, we'll still render with the mock data
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
          {error && (
            <p className="text-sm text-gray-500 mt-2">(Using sample property data)</p>
          )}
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

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No properties found matching your criteria.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/properties" className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Properties;
