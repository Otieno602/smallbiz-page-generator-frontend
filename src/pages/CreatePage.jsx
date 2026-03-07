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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/business",
        formData,
      );

      const id = response.data._id;

      navigate(`/page/${id}`);
    } catch (error) {
      console.error("Error creating business page:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Your Business Page
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <textarea
            name="about"
            placeholder="Short description about your business"
            value={formData.about}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="text"
            name="services"
            placeholder="Services (comma separated)"
            value={formData.services}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number (e.g. 2547XXXXXXXX)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Generate My Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
