import { Link } from "wouter";

// Define AreaServed interface
interface AreaServed {
  id: number;
  county: string;
  cities: string[];
}

// Hardcoded area data
const areasData: AreaServed[] = [
  {
    id: 1,
    county: "Fulton",
    cities: ["Atlanta", "Alpharetta", "Sandy Springs", "Roswell", "Johns Creek", "Milton"]
  },
  {
    id: 2,
    county: "DeKalb",
    cities: ["Brookhaven", "Decatur", "Druid Hills", "Dunwoody"]
  },
  {
    id: 3,
    county: "Cobb",
    cities: ["Marietta", "Kennesaw", "Smyrna"]
  },
  {
    id: 4,
    county: "Gwinnett",
    cities: ["Loganville", "Norcross", "Duluth", "Suwanee", "Lilburn"]
  },
  {
    id: 5,
    county: "Cherokee",
    cities: ["Woodstock"]
  },
  {
    id: 6,
    county: "Forsyth",
    cities: ["Cumming"]
  },
  {
    id: 7,
    county: "Douglas",
    cities: ["Douglasville"]
  },
  {
    id: 8,
    county: "Walton",
    cities: ["Loganville"]
  }
];

const Areas = () => {
  return (
    <section id="areas" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            Areas <span className="text-secondary">Served</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg">
            I provide expert real estate services across the greater Atlanta metropolitan area, with deep knowledge of these neighborhoods and communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1575336127377-12306024e88c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Atlanta skyline" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-primary bg-opacity-30"></div>
          </div>

          <div>
            <h3 className="text-2xl font-playfair font-semibold mb-6">
              Serving Multiple Counties Across Metro Atlanta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {areasData.map((area: AreaServed) => (
                <div key={area.id} className="bg-light rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">{area.county} County</h4>
                  <ul className="text-gray-600 space-y-1">
                    {area.cities.map((city, index) => (
                      <li key={index}>• {city}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link 
                href="/areas" 
                className="inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 rounded font-medium transition duration-200"
              >
                Get Neighborhood Insights
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Areas;
