import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";

// Real properties data
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
    squareFeet: 4500, // Estimated
    yearBuilt: 2015, // Estimated
    propertyType: "Single Family",
    status: "active",
    isLuxury: true,
    createdAt: null,
    images: ["/images/property-placeholder.jpg"],
    features: ["Large Backyard", "Gourmet Kitchen", "Master Suite"],
    county: "Fulton"
  }
];

// Real sold properties data
const MOCK_SOLD_PROPERTIES: SoldProperty[] = [
  {
    id: 101,
    address: "163 Camden Park Dr",
    city: "Woodstock",
    state: "GA",
    zip_code: "30188",
    bedrooms: 4, // Estimated
    bathrooms: 3, // Estimated
    sold_date: "2024-09-25",
    closing_price: 425000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2024-09-26"
  },
  {
    id: 102,
    address: "3986 Verbena Ct NW",
    city: "Kennesaw",
    state: "GA",
    zip_code: "30144",
    bedrooms: 3, // Estimated
    bathrooms: 2.5, // Estimated
    sold_date: "2024-08-22",
    closing_price: 385000,
    represented: "Seller",
    has_issue: false,
    created_at: "2024-08-23"
  },
  {
    id: 103,
    address: "711 Katherine Johnson Ln",
    city: "Atlanta",
    state: "GA",
    zip_code: "30318",
    bedrooms: 4, // Estimated
    bathrooms: 3, // Estimated
    sold_date: "2024-03-08",
    closing_price: 660000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2024-03-09"
  },
  {
    id: 104,
    address: "499 Blue Junipe Cir",
    city: "Loganville",
    state: "GA",
    zip_code: "30052",
    bedrooms: 4, // Estimated
    bathrooms: 3.5, // Estimated
    sold_date: "2023-11-28",
    closing_price: 540100,
    represented: "Buyer",
    has_issue: false,
    created_at: "2023-11-29"
  },
  {
    id: 105,
    address: "2609 Peterboro Row",
    city: "Marietta",
    state: "GA",
    zip_code: "30062",
    bedrooms: 5, // Estimated
    bathrooms: 3.5, // Estimated
    sold_date: "2023-11-20",
    closing_price: 719000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2023-11-21"
  },
  {
    id: 106,
    address: "230 Fernly Park Dr",
    city: "Johns Creek",
    state: "GA",
    zip_code: "30022",
    bedrooms: 5, // Estimated
    bathrooms: 4.5, // Estimated
    sold_date: "2023-10-18",
    closing_price: 1125000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2023-10-19"
  },
  {
    id: 107,
    address: "4006 Timbercreek Cir",
    city: "Roswell",
    state: "GA",
    zip_code: "30076",
    bedrooms: 3, // Estimated
    bathrooms: 2.5, // Estimated
    sold_date: "2023-09-11",
    closing_price: 430000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2023-09-12"
  },
  {
    id: 108,
    address: "5620 Chestnut Dr",
    city: "Cumming",
    state: "GA",
    zip_code: "30040",
    bedrooms: 4, // Estimated
    bathrooms: 3.5, // Estimated
    sold_date: "2023-06-15",
    closing_price: 809000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2023-06-16"
  },
  {
    id: 109,
    address: "2004 Jack Dr",
    city: "Roswell",
    state: "GA",
    zip_code: "30076",
    bedrooms: 3, // Estimated
    bathrooms: 2.5, // Estimated
    sold_date: "2023-02-17",
    closing_price: 500000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2023-02-18"
  },
  {
    id: 110,
    address: "933 Edmond Oaks",
    city: "Marietta",
    state: "GA",
    zip_code: "30067",
    bedrooms: 4, // Estimated
    bathrooms: 3, // Estimated
    sold_date: "2022-12-21",
    closing_price: 748300,
    represented: "Buyer",
    has_issue: false,
    created_at: "2022-12-22"
  },
  {
    id: 111,
    address: "1610 Trellis Pl",
    city: "Alpharetta",
    state: "GA",
    zip_code: "30004",
    bedrooms: 4, // Estimated
    bathrooms: 3, // Estimated
    sold_date: "2022-09-13",
    closing_price: 575000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2022-09-14"
  },
  {
    id: 112,
    address: "2689 Tranquilla Way",
    city: "Duluth",
    state: "GA",
    zip_code: "30097",
    bedrooms: 6, // Estimated
    bathrooms: 5.5, // Estimated
    sold_date: "2022-05-10",
    closing_price: 1700000,
    represented: "Buyer",
    has_issue: false,
    created_at: "2022-05-11"
  }
];

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
            src={(property.images && Array.isArray(property.images) && property.images.length > 0) ? property.images[0] : '/images/placeholder.jpg'} 
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
          <Link href={`/properties/${property.id}`} className="block text-center bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded font-medium transition duration-200">
            View Details
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
          <Link href={`/sold-properties/${property.id}`} className="block text-center bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded font-medium transition duration-200">
            View Details
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
  
  // Initialize with mock data when no server is available
  const { data: properties = MOCK_PROPERTIES, isLoading: propertiesLoading, error: propertiesError } = useQuery<Property[]>({ 
    queryKey: ['/api/properties'],
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Initialize with mock data when no server is available
  const { data: soldProperties = MOCK_SOLD_PROPERTIES, isLoading: soldPropertiesLoading, error: soldPropertiesError } = useQuery<SoldProperty[]>({ 
    queryKey: ['/api/sold-properties'],
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    document.title = "Properties | Amita Sood Real Estate";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Set loading and error states
    setIsLoading(propertiesLoading || soldPropertiesLoading);
    setError(propertiesError || soldPropertiesError || null);

    // Always ensure properties and soldProperties are arrays
    const propertiesArray = Array.isArray(properties) ? properties : MOCK_PROPERTIES;
    const soldPropertiesArray = Array.isArray(soldProperties) ? soldProperties : MOCK_SOLD_PROPERTIES;

    // Apply filters based on data availability
    if (!propertiesLoading && !soldPropertiesLoading) {
      if (filter === "all") {
        // For "All Properties", show ALL properties from both sources
        // 1. Convert sold properties to regular property format for display
        const convertedSoldProperties = soldPropertiesArray.map(convertSoldPropertyToProperty);
        // 2. Combine with regular properties
        setDisplayItems([...propertiesArray, ...convertedSoldProperties]);
      } else if (filter === "active") {
        setDisplayItems(propertiesArray.filter(p => p.status === "active"));
      } else if (filter === "sold") {
        // When "Recently Sold" is selected, show all properties from the sold_properties table
        setDisplayItems(soldPropertiesArray);
      } else if (filter === "luxury") {
        setDisplayItems(propertiesArray.filter(p => p.isLuxury === true));
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

          {!Array.isArray(displayItems) || displayItems.length === 0 ? (
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
