import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    about: "",
    services: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/business",
        formData,
      );

      const id = response.data._id;

      navigate(`/page/${id}`);
    } catch (error) {
      console.error("Error creating business page:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Create a Page for Your Business
          </h1>
          <p className="text-lg opacity-90">
            Generate a simple business page in seconds.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label
                className="absolute left-3 top-3 text-gray-500 transition-all 
              peer-placeholder-shown:top-3 
              peer-placeholder-shown:text-base 
              peer-focus:-top-2 
              peer-focus:text-sm 
            peer-focus:text-blue-600 
            bg-white px-1"
              >
                Business Name
              </label>
            </div>

            <div className="relative">
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder=" "
                rows="3"
                className="peer w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label
                className="absolute left-3 top-3 text-gray-500 transition-all
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-base
              peer-focus:-top-2
              peer-focus:text-sm
            peer-focus:text-blue-600
            bg-white px-1"
              >
                About Your Business
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label
                className="absolute left-3 top-3 text-gray-500 transition-all
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
              peer-focus:text-blue-600
              bg-white px-1"
              >
                Services (comma separated)
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label
                className="absolute left-3 top-3 text-gray-500 transition-all
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
              peer-focus:text-blue-600
              bg-white px-1"
              >
                Phone Number (eg: 2547xxxxxxx)
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label
                className="absolute left-3 top-3 text-gray-500 transition-all
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
              peer-focus:text-blue-600
              bg-white px-1"
              >
                Location
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-md hover:bg-indigo-800 transition duration-200"
            >
              {loading ? "Generating..." : "Generate My Page"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
