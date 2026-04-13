import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BusinessPage() {
  const { id } = useParams();

  const [business, setBusiness] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(
          `https://realerstech-pages-backend.onrender.com/api/business/${id}`,
        );

        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };

    fetchBusiness();
  }, [id]);

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 animate-pulse text-lg">
          Loading business page...
        </div>
      </div>
    );
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const avatarLetter = business.businessName.charAt(0).toUpperCase();

  const tagColors = [
    "bg-indigo-100 text-indigo-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-yellow-100 text-yellow-700",
    "bg-pink-100 text-pink-700",
  ];
  

  return (
    // Business Name
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-8">
        {/* Business Name */}
        <div className="text-center space-y-4">

          {/* Avatar */}
          <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-2xl font-bold mx-auto">
            {avatarLetter}
          </div>

          {/* Business Name */}
          <h1 className="text-3xl font-bold text-gray-900">
            {business.businessName}
          </h1>

          {/* Tagline (About Preview) */}
          <p className="text-gray-600 max-w-md mx-auto">
            {business.about.length > 100
            ? business.about.slice(0, 100) + "..."
            : business.about}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">

            <a href={`tel:${business.phone}`}>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition">
                Call
              </button>
            </a>

            <a
              href={`https://wa.me/${business.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition">
                WhatsApp
              </button>
            </a>

            <button
              onClick={copyLink}
              className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg transition"
            >
              {copied ? "✓ Copied!" : "Share"}
            </button>

          </div>

        </div>

        {/* About */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-600 leading-relaxed">{business.about}</p>
        </div>

        {/* Services */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-3">Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {business.services.map((service, index) => {
              const color = tagColors[index % tagColors.length];
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl shadow-sm border hover:shadow-md transition ${color}`}
                >
                  <h3 className="font-semibold text-lg flex items-center gap-2"><span>•</span>{service}</h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="border-t pt-8 text-center space-y-4">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to work with us?
          </h2>

          {/* Subtext */}
          <p className="text-gray-600">
            Contact us today and let's bring your ideas to life.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 flex-wrap mt-4">

            <a href={`tel:${business.phone}`}>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition font-medium">
                📞 Call Now
              </button>
            </a>

            <a
              href={`https://wa.me/${business.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition font-medium">
                💬 WhatsApp
              </button>
            </a>

          </div>

           {/* Location */}
          <p className="text-gray-600 flex items-center justify-center gap-2">
            📍 {business.location}
          </p>

        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Powered by RealersTech
        </p>

      </div>
    </div>
  );
}

export default BusinessPage;
