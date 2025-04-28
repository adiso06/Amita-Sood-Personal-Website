const Stats = () => {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="text-4xl font-playfair font-bold text-secondary mb-2">16+</div>
            <div className="text-white text-lg">Years Experience</div>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="text-4xl font-playfair font-bold text-secondary mb-2">$1.7M</div>
            <div className="text-white text-lg">Highest Sale</div>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="text-4xl font-playfair font-bold text-secondary mb-2">43+</div>
            <div className="text-white text-lg">Transactions</div>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="text-4xl font-playfair font-bold text-secondary mb-2">$718K</div>
            <div className="text-white text-lg">Average Sale</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
