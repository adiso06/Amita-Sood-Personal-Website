import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    return location === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl md:text-2xl font-playfair font-bold cursor-pointer">
              <span className="text-primary">Amita</span>
              <span className="text-secondary">Sood</span>
            </Link>
            <p className="text-xs md:text-sm text-gray-500 hidden md:block">Chapman Hall Realty</p>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`${isActive('/') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
              Home
            </Link>
            <Link href="/about" className={`${isActive('/about') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
              About
            </Link>
            <Link href="/services" className={`${isActive('/services') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
              Services
            </Link>
            <Link href="/properties" className={`${isActive('/properties') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
              Properties
            </Link>
            <Link href="/testimonials" className={`${isActive('/testimonials') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
              Testimonials
            </Link>
            <Link href="/areas" className={`${isActive('/areas') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
              Areas
            </Link>
            <Link href="/contact" className={`${isActive('/contact') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/admin" className={`${isActive('/admin') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
                  Admin
                </Link>
                <button 
                  onClick={logout}
                  className="text-primary hover:text-secondary font-medium transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className={`${isActive('/login') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>
                Login
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="py-4 space-y-3 border-t border-light-gray">
              <Link 
                href="/" 
                className={`block px-4 py-2 ${isActive('/') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about"
                className={`block px-4 py-2 ${isActive('/about') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/services"
                className={`block px-4 py-2 ${isActive('/services') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/properties"
                className={`block px-4 py-2 ${isActive('/properties') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                href="/testimonials"
                className={`block px-4 py-2 ${isActive('/testimonials') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link 
                href="/areas"
                className={`block px-4 py-2 ${isActive('/areas') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Areas
              </Link>
              <Link 
                href="/contact"
                className={`block px-4 py-2 ${isActive('/contact') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/admin"
                    className={`block px-4 py-2 ${isActive('/admin') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                  <div 
                    className="block px-4 py-2 text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <Link 
                  href="/login"
                  className={`block px-4 py-2 ${isActive('/login') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
