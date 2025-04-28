const ContactInfo = () => {
  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-playfair font-semibold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="text-secondary mr-4 mt-1"><i className="fas fa-map-marker-alt"></i></div>
            <div>
              <p className="font-medium">Office Address:</p>
              <p className="text-gray-600">Chapman Hall Realty<br />1772 Century Blvd NE<br />Atlanta, GA 30345</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-secondary mr-4 mt-1"><i className="fas fa-phone"></i></div>
            <div>
              <p className="font-medium">Phone:</p>
              <p className="text-gray-600">(678) 205-9930</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-secondary mr-4 mt-1"><i className="fas fa-envelope"></i></div>
            <div>
              <p className="font-medium">Email:</p>
              <p className="text-gray-600">amita.sood@chapmanhall.com</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium mb-3">Connect With Me:</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-primary hover:text-secondary transition duration-200" aria-label="Facebook"><i className="fab fa-facebook-f text-lg"></i></a>
            <a href="https://instagram.com" className="text-primary hover:text-secondary transition duration-200" aria-label="Instagram"><i className="fab fa-instagram text-lg"></i></a>
            <a href="https://linkedin.com" className="text-primary hover:text-secondary transition duration-200" aria-label="LinkedIn"><i className="fab fa-linkedin-in text-lg"></i></a>
            <a href="https://zillow.com" className="text-primary hover:text-secondary transition duration-200" aria-label="Zillow"><i className="fab fa-zillow text-lg"></i></a>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-playfair font-semibold mb-4">Office Hours</h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="font-medium">9:00 AM - 6:00 PM</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Saturday</span>
            <span className="font-medium">10:00 AM - 4:00 PM</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Sunday</span>
            <span className="font-medium">By Appointment</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;
