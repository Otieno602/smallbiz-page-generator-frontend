import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BusinessPage() {
  const { id } = useParams();

  const [business, setBusiness] = useState(null);

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
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{business.businessName}</h1>

      <p>{business.about}</p>

      <h3>Services</h3>
      <ul>
        {business.services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>

      <p>
        <strong>Location:</strong> {business.location}
      </p>

      <p>
        <strong>Phone:</strong> {business.phone}
      </p>
      <a
        href={`https://wa.me/${business.phone}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Contact on WhatsApp</button>
      </a>
    </div>
  );
}

export default BusinessPage;
