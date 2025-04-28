import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

// Type for sold properties from the database
interface SoldProperty {
  id: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  bedrooms: number | null;
  bathrooms: number | null;
  sold_date: string;
  closing_price: number;
  represented: string;
  has_issue: boolean | null;
  created_at: string | null;
}

interface SoldPropertyCardProps {
  property: SoldProperty;
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
    <div className="property-card">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
        <div className="relative">
          <img 
            src={property.images?.[0] || '/images/placeholder.jpg'} 
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
            <span><i className="fas fa-ruler-combined mr-1"></i> {property.squareFeet?.toLocaleString() || '0'} Sq Ft</span>
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

const SoldPropertyCard = ({ property }: SoldPropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="property-card">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl">
        <div className="relative">
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-5xl text-white bg-secondary px-6 py-3 rounded-lg font-bold">SOLD</div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{property.address}</h3>
          <p className="text-gray-500 mb-4">{property.city}, {property.state} {property.zip_code}</p>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            {property.bedrooms && <span><i className="fas fa-bed mr-1"></i> {property.bedrooms} Beds</span>}
            {property.bathrooms && <span><i className="fas fa-bath mr-1"></i> {property.bathrooms} Baths</span>}
            <span><i className="fas fa-dollar-sign mr-1"></i> {formatPrice(property.closing_price)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-700"><strong>Sold Date:</strong> {formatDate(property.sold_date)}</span>
            <span className="text-gray-700"><strong>Represented:</strong> {property.represented}</span>
          </div>
          <Link href={`/sold-properties/${property.id}`}>
            <a className="block text-center bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded font-medium transition duration-200">
              View Details
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert sold properties to a format compatible with property cards
const convertSoldPropertyToProperty = (soldProperty: SoldProperty): Property => {
  return {
    id: soldProperty.id + 1000, // Add offset to avoid ID conflicts
    title: `${soldProperty.address}`,
    address: soldProperty.address,
    city: soldProperty.city,
    state: soldProperty.state,
    zipCode: soldProperty.zip_code,
    price: soldProperty.closing_price,
    bedrooms: soldProperty.bedrooms || 0,
    bathrooms: soldProperty.bathrooms || 0,
    squareFeet: 0, // We don't have this data
    description: `Sold on ${new Date(soldProperty.sold_date).toLocaleDateString()}`,
    features: [],
    status: "sold",
    propertyType: "Single Family",
    yearBuilt: null,
    images: [],
    county: "",
    isLuxury: false,
    createdAt: soldProperty.created_at ? new Date(soldProperty.created_at) : null
  };
};

const Properties = () => {
  const [filter, setFilter] = useState("all");
  const [displayItems, setDisplayItems] = useState<(Property | SoldProperty)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { data: properties = [], isLoading: propertiesLoading, error: propertiesError } = useQuery<Property[]>({ 
    queryKey: ['/api/properties'],
  });

  // Fetch sold properties from our new endpoint
  const { data: soldProperties = [], isLoading: soldPropertiesLoading, error: soldPropertiesError } = useQuery<SoldProperty[]>({ 
    queryKey: ['/api/sold-properties'],
  });

  useEffect(() => {
    document.title = "Properties | Amita Sood Real Estate";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Log data from both sources to help diagnose issues
    console.log("Properties data:", properties);
    console.log("Sold properties data:", soldProperties);
    
    // Set loading and error states
    setIsLoading(propertiesLoading || soldPropertiesLoading);
    setError(propertiesError || soldPropertiesError || null);

    // Apply filters based on data availability
    if (!propertiesLoading && !soldPropertiesLoading) {
      if (filter === "all") {
        // For "All Properties", show ALL properties from both sources
        // 1. Convert sold properties to regular property format for display
        const convertedSoldProperties = soldProperties.map(convertSoldPropertyToProperty);
        // 2. Combine with regular properties
        setDisplayItems([...properties, ...convertedSoldProperties]);
      } else if (filter === "active") {
        setDisplayItems(properties.filter(p => p.status === "active"));
      } else if (filter === "sold") {
        // When "Recently Sold" is selected, show all properties from the sold_properties table
        setDisplayItems(soldProperties);
      } else if (filter === "luxury") {
        setDisplayItems(properties.filter(p => p.isLuxury === true));
      }
    }
  }, [properties, soldProperties, filter, propertiesLoading, soldPropertiesLoading, propertiesError, soldPropertiesError]);

  if (isLoading) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Loading Properties...
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
              Error Loading Properties
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
          <h1 className="text-4xl font-playfair font-bold text-white text-center">Our Properties</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex justify-center">
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

          {displayItems.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-gray-500">Try changing your filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filter === "sold" ? (
                // Render sold properties
                displayItems.map((property) => (
                  <SoldPropertyCard key={(property as SoldProperty).id} property={property as SoldProperty} />
                ))
              ) : (
                // Render regular properties
                displayItems.map((property) => (
                  <PropertyCard key={(property as Property).id} property={property as Property} />
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Properties;
