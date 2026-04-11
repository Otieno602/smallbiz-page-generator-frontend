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
          `http://localhost:5000/api/business/${id}`,
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
      <div className="flex items-center gap-4">

      <div className="w-14 h-14 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
        {avatarLetter}
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {business.businessName}
        </h1>
      </div>
    </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={copyLink}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm transition"
          >
            {copied ? "✓ Link Copied!" : "Share Page Link"}
          </button>
        </div>

        {/* About */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-600">{business.about}</p>
        </div>

        {/* Services */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-3">Services</h2>

          <div className="flex flex-wrap gap-2">
            {business.services.map((service, index) => {
              const color = tagColors[index % tagColors.length];
              return (
                <span
                  key={index}
                  className={`${color} px-3 py-1 rounded-full text-sm transition hover:-translate-y-0.5 cursor-default`}
                >
                  {service}
                </span>
              );
            })}
          </div>
        </div>

        {/* Location */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-1">Location</h2>
          <p className="text-gray-600">{business.location}</p>
        </div>

        {/* Contact */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Contact</h2>

          <a
            href={`tel:${business.phone}`}
            className="text-indigo-600 font-medium block mb-3"
          >
            {business.phone}
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

        </div>

      </div>
    </div>
  );
}

export default BusinessPage;
