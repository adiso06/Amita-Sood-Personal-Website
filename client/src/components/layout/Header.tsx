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
            <Link href="/">
              <div className="text-xl md:text-2xl font-playfair font-bold cursor-pointer">
                <span className="text-primary">Amita</span>
                <span className="text-secondary">Sood</span>
              </div>
            </Link>
            <p className="text-xs md:text-sm text-gray-500 hidden md:block">Chapman Hall Realty</p>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <div className={`${isActive('/') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>Home</div>
            </Link>
            <Link href="/about">
              <div className={`${isActive('/about') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>About</div>
            </Link>
            <Link href="/services">
              <div className={`${isActive('/services') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>Services</div>
            </Link>
            <Link href="/properties">
              <div className={`${isActive('/properties') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>Properties</div>
            </Link>
            <Link href="/testimonials">
              <div className={`${isActive('/testimonials') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>Testimonials</div>
            </Link>
            <Link href="/areas">
              <div className={`${isActive('/areas') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>Areas</div>
            </Link>
            <Link href="/contact">
              <div className={`${isActive('/contact') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>Contact</div>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/admin">
                  <div className={`${isActive('/admin') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>Admin</div>
                </Link>
                <button 
                  onClick={logout}
                  className="text-primary hover:text-secondary font-medium transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <div className={`${isActive('/login') ? 'text-secondary' : 'text-primary'} hover:text-secondary font-medium transition duration-200 cursor-pointer`}>Login</div>
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
              <Link href="/">
                <div 
                  className={`block px-4 py-2 ${isActive('/') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </div>
              </Link>
              <Link href="/about">
                <div 
                  className={`block px-4 py-2 ${isActive('/about') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </div>
              </Link>
              <Link href="/services">
                <div 
                  className={`block px-4 py-2 ${isActive('/services') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </div>
              </Link>
              <Link href="/properties">
                <div 
                  className={`block px-4 py-2 ${isActive('/properties') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Properties
                </div>
              </Link>
              <Link href="/testimonials">
                <div 
                  className={`block px-4 py-2 ${isActive('/testimonials') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </div>
              </Link>
              <Link href="/areas">
                <div 
                  className={`block px-4 py-2 ${isActive('/areas') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Areas
                </div>
              </Link>
              <Link href="/contact">
                <div 
                  className={`block px-4 py-2 ${isActive('/contact') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </div>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/admin">
                    <div 
                      className={`block px-4 py-2 ${isActive('/admin') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </div>
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
                <Link href="/login">
                  <div 
                    className={`block px-4 py-2 ${isActive('/login') ? 'bg-light-gray' : ''} text-primary hover:bg-light-gray rounded transition duration-200 cursor-pointer`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </div>
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
