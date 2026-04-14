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
  const [success, setSuccess] = useState(false);

  const [services, setServices] = useState([]);
  const [serviceInput, setServiceInput] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding services dynamically
  const handleServiceKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = serviceInput.trim();
      if (trimmed && !services.includes(trimmed)) {
        setServices([...services, trimmed]);
      }
      setServiceInput("");
    }
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;

    if (value.includes(",")) {
      const parts = value.split(",");
      const newServices = parts
        .map((s) => s.trim())
        .filter((s) => s && !services.includes(s));

      setServices([...services, ...newServices]);
      setServiceInput("");
    } else {
      setServiceInput(value);
    }
  };

  const addService = () => {
    const trimmed = serviceInput.trim();
      if (trimmed && !services.includes(trimmed)) {
      setServices([...services, trimmed]);
      setServiceInput("");
    }
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (serviceInput.trim() !== "") {
      setServices([...services, serviceInput.trim()]);
    }

    if (services.length === 0 && serviceInput.trim() === "") {
      alert("Please add at least one service.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://realerstech-pages-backend.onrender.com/api/business", {
        ...formData,
        services,
      });

      setLoading(false);
      setSuccess(true);

      const id = response.data._id;

      setTimeout(() => {
        navigate(`/page/${id}`);
      }, 2000);

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
            RealersTech Pages
          </h1>

          <p className="text-lg opacity-90">
            Create a simple business page in seconds.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md text-center animate-pulse">
                ✅ Business page created successfully! Redirecting...
              </div>
            )}
            {/* Business Name */}
            <div className="relative">
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-md p-3 pt-5 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label className="absolute left-3 -top-2 text-sm text-gray-600 transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
                peer-focus:text-blue-600
                bg-white px-1"
              >
                Business Name
              </label>
            </div>

            {/* About */}
            <div className="relative">
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder=" "
                rows={3}
                className="peer w-full border border-gray-300 rounded-md p-3 pt-5 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label className="absolute left-3 -top-2 text-sm text-gray-500 transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
                peer-focus:text-blue-600
                bg-white px-1"
              >
                Describe your business
              </label>
            </div>

            {/* Services */}
            <div>

              {/* Input + Button Wrapper */}
              <div className="relative">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={handleServiceChange}
                  onKeyDown={handleServiceKeyDown}
                  placeholder=" "
                  className="peer w-full border border-gray-300 rounded-md p-3 pt-5 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="absolute left-3 -top-2 text-sm text-gray-500 transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
              peer-focus:text-blue-600
              bg-white px-1"
              >
                Services (comma, enter or Add)
              </label>

              {/* Add Button (now stable) */}
              <button
                type="button"
                onClick={addService}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Add
              </button>
            </div>

            {/* Tags OUTSIDE */}
            <div className="flex flex-wrap gap-2 mt-3">
              {services.map((service, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              >
                {service}
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-indigo-600 hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

        </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-md p-3 pt-5 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label className="absolute left-3 -top-2 text-sm text-gray-500 transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
                peer-focus:text-blue-600
                bg-white px-1"
              >
                Phone Number (e.g. 2547XXXXXXXX)
              </label>
            </div>

            {/* Location */}
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-md p-3 pt-5 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <label className="absolute left-3 -top-2 text-sm text-gray-500 transition-all
                peer-placeholder-shown:top-5
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
              className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-md hover:bg-indigo-800 transition duration-200 disabled:opacity-60"
            >
              {loading ? "Creating Page..." : "Generate My Page"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;