import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";

const PropertyDetail = () => {
  const { id } = useParams();
  const propertyId = parseInt(id || "0");

  const { data: property, isLoading, error } = useQuery({
    queryKey: [`/api/properties/${propertyId}`],
    enabled: !!propertyId,
  });

  useEffect(() => {
    if (property) {
      document.title = `${property.title} | Amita Sood Real Estate`;
    } else {
      document.title = "Property Details | Amita Sood Real Estate";
    }
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [property]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Loading Property Details...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Error Loading Property
            </h2>
            <p className="mb-6">This property may not exist or there was an error loading it.</p>
            <Link href="/properties">
              <a className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
                Back to Properties
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${property.images[0]})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-2">
              {property.title}
            </h1>
            <p className="text-xl mb-3">
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </p>
            <div className="inline-block bg-secondary text-white px-4 py-2 rounded-lg text-xl font-semibold">
              {formatPrice(property.price)}
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <div className="flex justify-between mb-6">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-medium text-white ${property.status === 'active' ? 'bg-secondary' : 'bg-gray-600'}`}>
                        {property.status === 'active' ? 'Active' : 'SOLD'}
                      </span>
                      {property.isLuxury && (
                        <span className="inline-block bg-primary text-white px-3 py-1 rounded text-sm font-medium ml-2">
                          Luxury
                        </span>
                      )}
                    </div>
                    <div className="text-gray-600">
                      <span>Property ID: {property.id}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-8 text-center">
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-semibold">{property.bedrooms}</div>
                      <div className="text-gray-600">Bedrooms</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-semibold">{property.bathrooms}</div>
                      <div className="text-gray-600">Bathrooms</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-xl font-semibold">{property.squareFeet.toLocaleString()}</div>
                      <div className="text-gray-600">Square Feet</div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-playfair font-bold mb-4">Description</h2>
                  <p className="text-gray-700 mb-8">{property.description}</p>

                  <h2 className="text-2xl font-playfair font-bold mb-4">Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {property.features && property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <i className="fas fa-check-circle text-secondary mr-2"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl font-playfair font-bold mb-4">Property Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Property Type:</span>
                      <span className="text-gray-700">{property.propertyType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Year Built:</span>
                      <span className="text-gray-700">{property.yearBuilt}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">County:</span>
                      <span className="text-gray-700">{property.county}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Status:</span>
                      <span className="text-gray-700 capitalize">{property.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {property.images && property.images.length > 1 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
                  <h2 className="text-2xl font-playfair font-bold mb-4">Photo Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden h-48">
                        <img src={image} alt={`${property.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8 sticky top-24">
                <h3 className="text-xl font-playfair font-semibold mb-4">Contact Agent</h3>
                <div className="flex items-center mb-4">
                  <img
                    src="/images/amita-sood.jpg"
                    alt="Amita Sood"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-primary">Amita Sood</h4>
                    <p className="text-gray-600">Chapman Hall Realty</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <i className="fas fa-phone text-secondary mr-3"></i>
                    <span>678-205-9930</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-secondary mr-3"></i>
                    <span>amita_sood@hotmail.com</span>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      defaultValue={`I'm interested in ${property.address}, ${property.city}, ${property.state} ${property.zipCode}`}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-opacity-90 text-white px-4 py-3 rounded font-medium transition duration-200"
                  >
                    Request Information
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/properties">
              <a className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
                Back to Properties
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyDetail;
