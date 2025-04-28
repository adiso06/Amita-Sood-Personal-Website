import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">Amita Sood</h3>
            <p className="mb-4">Helping you navigate the Atlanta real estate market with over 16 years of experience and dedication to client success.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-secondary transition duration-200" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" className="text-white hover:text-secondary transition duration-200" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-secondary transition duration-200" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://zillow.com" className="text-white hover:text-secondary transition duration-200" aria-label="Zillow">
                <i className="fab fa-zillow"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-secondary transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-secondary transition duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-secondary transition duration-200">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-secondary transition duration-200">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/areas" className="hover:text-secondary transition duration-200">
                  Areas Served
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#buyers-agent" className="hover:text-secondary transition duration-200">
                  Buyer's Agent
                </Link>
              </li>
              <li>
                <Link href="/services#listing-agent" className="hover:text-secondary transition duration-200">
                  Listing Agent
                </Link>
              </li>
              <li>
                <Link href="/services#investment-properties" className="hover:text-secondary transition duration-200">
                  Investment Properties
                </Link>
              </li>
              <li>
                <Link href="/services#relocation" className="hover:text-secondary transition duration-200">
                  Relocation Specialist
                </Link>
              </li>
              <li>
                <Link href="/services#first-time-buyers" className="hover:text-secondary transition duration-200">
                  First-Time Homebuyers
                </Link>
              </li>
              <li>
                <Link href="/services#landlord" className="hover:text-secondary transition duration-200">
                  Landlord Representation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-secondary"></i>
                <span>1772 Century Blvd NE<br />Atlanta, GA 30345</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-secondary"></i>
                <span>678-205-9930</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-secondary"></i>
                <span>amita_sood@hotmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700 text-center text-sm">
          <div className="mb-4">
            <div className="h-10 inline-flex items-center font-playfair font-bold text-lg">
              Chapman Hall <span className="text-secondary ml-1">Realty</span>
            </div>
          </div>
          <p>© {new Date().getFullYear()} Amita Sood, Chapman Hall Realty. All Rights Reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-secondary transition duration-200 mx-2">Privacy Policy</a> | 
            <a href="#" className="hover:text-secondary transition duration-200 mx-2">Terms of Service</a> | 
            <a href="#" className="hover:text-secondary transition duration-200 mx-2">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
