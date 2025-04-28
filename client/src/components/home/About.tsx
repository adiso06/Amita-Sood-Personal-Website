import { Link } from "wouter";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-4">
              About <span className="text-secondary">Amita Sood</span>
            </h2>
            <p className="mb-6 text-lg">
              With over 16 years of experience in the Atlanta real estate market, I am committed to helping you buy or sell your home with the highest level of expertise.
            </p>
            <p className="mb-6">
              I believe in making the real estate process transparent and understandable. My mission is to ensure that you comprehend each step of the buying or selling process, empowering you to make informed decisions for one of life's most significant investments.
            </p>
            <p className="mb-8">
              Having worked with clients across the Atlanta metropolitan area since 2008, I bring deep market knowledge, honest guidance, and a personalized approach to every transaction.
            </p>
            <div className="flex items-center space-x-6">
              <img
                src="/images/amita-sood.jpg"
                alt="Amita Sood"
                className="h-20 rounded-full object-cover"
              />
              <div>
                <div className="font-playfair font-semibold text-primary text-lg">Amita Sood</div>
                <div className="text-gray-500">Licensed Realtor</div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/about" className="text-secondary hover:text-primary font-medium transition duration-200">
                Learn more about my background →
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-5 -left-5 w-48 h-48 bg-secondary bg-opacity-20 rounded-lg"></div>
            <img
              src="/images/amita-sood.jpg"
              alt="Amita Sood, Atlanta Realtor"
              className="relative z-10 w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
