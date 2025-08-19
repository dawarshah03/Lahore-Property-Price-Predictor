import { useEffect, useState } from "react";
import './App.css';

function App() {

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [baths, setBaths] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(0);
  const [displayLocations, setDisplayLocations] = useState([]);
  const [isPredicting, setIsPredicting] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_location_names");
        const data = await response.json();
        
        const formattedLocations = data.locations.map(loc => 
          loc.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ')
        );
        
        setLocations(data.locations);
        setDisplayLocations(formattedLocations);
        if (data.locations.length > 0) setLocation(data.locations[0]);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    
    fetchLocations();
  }, []);

  const predictPrice = async () => {
    if (!area || !bedrooms || !baths) {
      alert("Please fill in all fields");
      return;
    }

    setIsPredicting(true);
    
    try {
      const response = await fetch("http://127.0.0.1:5000/predict_home_price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area: parseFloat(area),
          location: location,
          bedrooms: parseInt(bedrooms),
          baths: parseInt(baths)
        }),
      });
      
      const data = await response.json();
      
      if (data.estimated_price) {
        setPredictedPrice(data.estimated_price);
      } else {
        alert("No price returned from API");
        setPredictedPrice(0);
      }
    } catch (error) {
      console.error("Error predicting price:", error);
      alert("Error predicting price. Please try again.");
      setPredictedPrice(0);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleLocationChange = (e) => {
    const selectedDisplayValue = e.target.value;
    const index = displayLocations.indexOf(selectedDisplayValue);
    if (index !== -1) {
      setLocation(locations[index]);
    }
  };

  return (
    <div className="min-h-screen m-0 bg-gray-50">

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-900">LahoreEstate</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-indigo-800">Home</a>
              <a href="#about" className="text-gray-700 hover:text-indigo-800">About</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-800">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="relative py-20 text-white bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Lahore House Price Prediction</h1>
            <p className="text-xl mb-8">Get accurate property valuations in Lahore with our AI-powered prediction tool!</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Predict Your Property Value</h2>
            
            <div className="space-y-6">

              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <select
                  className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={displayLocations[locations.indexOf(location)] || ""}
                  onChange={handleLocationChange}
                >
                  {displayLocations.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Area (Marla)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Bedrooms</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Bathrooms</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                />
              </div>

              <button
                onClick={predictPrice}
                disabled={isPredicting || !area || !bedrooms || !baths}
                className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium ${
                  isPredicting || !area || !bedrooms || !baths ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isPredicting ? 'Predicting...' : 'Predict Price'}
              </button>

              <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Estimated Property Value</h3>
                {isPredicting ? (
                  <p className="text-gray-500">Calculating...</p>
                ) : predictedPrice ? (
                  <p className="text-3xl font-bold text-indigo-600">
                    Rs. {predictedPrice.toLocaleString('en-PK')}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    {area && bedrooms && baths ? "Click Predict Price to see estimate" : "Fill all fields to get prediction"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About LahoreEstate</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Lahore City" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-4">
                  LahoreEstate provides accurate property valuations using advanced machine learning algorithms. 
                  Our system analyzes thousands of data points to give you the most reliable price estimates 
                  for properties across Lahore.
                </p>
                <p className="text-gray-600 mb-4">
                  Whether you're buying, selling, or just curious about property values in different 
                  neighborhoods, our tool helps you make informed decisions.
                </p>
                <p className="text-gray-600">
                  Our prediction model is constantly updated with the latest market trends to ensure 
                  you get the most accurate results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="mb-4">
                  Have questions about property valuations in Lahore? Get in touch with our team.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com/dawarshah03" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                    <span className="text-lg">GitHub</span>
                  </a>
                  <a href="https://linkedin.com/in/dawar-shah" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                    <span className="text-lg">LinkedIn</span>
                  </a>
                </div>
              </div>
              <div>
                <p className="mb-2">Email: dawarali2003@gmail.com</p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>© {new Date().getFullYear()} LahoreEstate. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;