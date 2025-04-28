import { Link } from "wouter";

const Hero = () => {
  return (
    <section 
      className="relative h-[80vh] bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-4">
            Elevating Your Atlanta Real Estate Experience
          </h1>
          <p className="text-xl mb-8">
            With over 16 years of expertise in the Atlanta market, I help clients find their perfect home or investment property.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties">
              <div className="bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200 cursor-pointer">
                View Properties
              </div>
            </Link>
            <Link href="/contact">
              <div className="bg-transparent border-2 border-white hover:bg-white hover:text-primary px-6 py-3 rounded font-medium transition duration-200 cursor-pointer">
                Contact Me
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
