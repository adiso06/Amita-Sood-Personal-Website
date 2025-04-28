import { useEffect } from "react";
import { Link } from "wouter";

const About = () => {
  useEffect(() => {
    document.title = "About | Amita Sood Real Estate";
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-white text-center">About Amita Sood</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-48 h-48 bg-secondary bg-opacity-20 rounded-lg"></div>
              <img
                src="/images/amita-sood.jpg"
                alt="Amita Sood, Atlanta Realtor"
                className="relative z-10 w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-6">
                My <span className="text-secondary">Story</span>
              </h2>
              <p className="mb-4">
                With over 16 years of experience in the Atlanta real estate market, I have dedicated my career to helping clients achieve their real estate goals. Since beginning my practice in 2008, I have guided hundreds of buyers and sellers through successful transactions.
              </p>
              <p className="mb-4">
                I believe that buying or selling a home is more than just a transaction—it's a significant life event. That's why I approach each client relationship with dedication, transparency, and a commitment to excellence. My goal is to ensure you understand each step of the process, enabling you to make informed decisions with confidence.
              </p>
              <p className="mb-6">
                Having lived and worked extensively across the Atlanta metropolitan area, I bring deep local market knowledge to every client interaction. Whether you're looking for your first home, selling your current property, building an investment portfolio, or relocating to the Atlanta area, I have the expertise to guide you to success.
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-secondary mr-2"></i>
                  <span>Based in Atlanta, serving the greater metropolitan area</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-graduation-cap text-secondary mr-2"></i>
                  <span>Licensed Georgia Realtor since 2008</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-home text-secondary mr-2"></i>
                  <span>Chapman Hall Realty, Atlanta North</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Professional <span className="text-secondary">Philosophy</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Client-Focused Approach</h3>
              <p className="text-gray-600">
                My clients' best interests are always my top priority. I listen carefully to your needs and goals to provide personalized service throughout our partnership.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Education & Transparency</h3>
              <p className="text-gray-600">
                I believe in educating clients about every aspect of their transaction. By understanding the process, you can make confident decisions about your real estate investment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
              <div className="text-secondary text-3xl mb-4">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Integrity & Trust</h3>
              <p className="text-gray-600">
                Honesty and trustworthiness are the foundation of my practice. I provide straightforward advice and maintain open communication throughout our work together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-playfair font-bold mb-8 text-center">
            My <span className="text-secondary">Expertise</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-playfair font-semibold mb-4">Experience & Transaction History</h3>
              <p className="mb-6">
                With over 16 years in real estate and more than 43 successful transactions, I've developed expertise across a wide price range from $385,000 to $1.7 million. My clients benefit from my negotiation skills, market knowledge, and attention to detail in every transaction.
              </p>
              <div className="bg-light p-6 rounded-lg mb-6">
                <h4 className="text-xl font-semibold mb-3">Transaction Highlights</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-secondary mr-2"></i>
                    <span>Average sale price: $718,000</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-secondary mr-2"></i>
                    <span>Luxury homes in Buckhead and Johns Creek</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-secondary mr-2"></i>
                    <span>Investment properties throughout Metro Atlanta</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-secondary mr-2"></i>
                    <span>First-time homebuyer specialists</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-playfair font-semibold mb-4">Specializations & Services</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-light rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-home text-secondary mr-2"></i>
                    <span className="font-semibold">Buyer's Agent</span>
                  </div>
                  <p className="text-sm text-gray-600">Expert guidance for homebuyers</p>
                </div>
                <div className="bg-light rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-sign text-secondary mr-2"></i>
                    <span className="font-semibold">Listing Agent</span>
                  </div>
                  <p className="text-sm text-gray-600">Strategic selling approach</p>
                </div>
                <div className="bg-light rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-building text-secondary mr-2"></i>
                    <span className="font-semibold">Investment Properties</span>
                  </div>
                  <p className="text-sm text-gray-600">Portfolio building expertise</p>
                </div>
                <div className="bg-light rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-truck-moving text-secondary mr-2"></i>
                    <span className="font-semibold">Relocation Specialist</span>
                  </div>
                  <p className="text-sm text-gray-600">Seamless transitions to Atlanta</p>
                </div>
                <div className="bg-light rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-file-contract text-secondary mr-2"></i>
                    <span className="font-semibold">Short Sales</span>
                  </div>
                  <p className="text-sm text-gray-600">Navigating complex transactions</p>
                </div>
                <div className="bg-light rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-user-tie text-secondary mr-2"></i>
                    <span className="font-semibold">Landlord Representation</span>
                  </div>
                  <p className="text-sm text-gray-600">Rental property management</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/services" className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200">
              Explore My Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
