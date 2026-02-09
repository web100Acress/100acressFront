import React from 'react';
import { FaHome, FaBuilding, FaWarehouse, FaCity } from 'react-icons/fa';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-gray-600">
          {testimonial.image}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>

      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
              }`}
          />
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed mb-4">
        "{testimonial.review}"
      </p>

      <div className="text-sm text-gray-500">
        <span className="font-medium">Property Type:</span> {testimonial.propertyType}
      </div>
    </div>
  );
};

const RealEstateTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Gurugram",
      image: <FaBuilding />,
      rating: 5,
      review: "Working with this real estate team was exceptional. They helped us find our dream home in just 3 weeks. Their market knowledge and negotiation skills saved us thousands. Highly recommend!",
      propertyType: "Affordable Property" // Updated from "3BR Condo"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Noida",
      image: <FaHome />, // Icon for Townhouse (e.g., home icon)
      rating: 5,
      review: "As a first-time home buyer, I was nervous about the process. The team guided me through every step with patience and expertise. They made what seemed impossible, possible.",
      propertyType: "builder floor" // Updated from "2BR Townhouse"
    },
    {
      id: 3,
      name: "Amit Singh",
      location: "Delhi",
      image: <FaHome />, // Icon for Independent House (e.g., house icon)
      rating: 5,
      review: "Selling our family home was emotional, but this team made it stress-free. They priced it perfectly and had multiple offers within days. Professional service from start to finish.",
      propertyType: "commercial property" // Updated from "4BR Family Home"
    },
    {
      id: 4,
      name: "Kavita Patel",
      location: "Panchkula",
      image: <FaCity />, // Icon for Commercial Property (e.g., city/building icon)
      rating: 5,
      review: "Investment property purchase made easy. Their market analysis was spot-on, and they found me a property that's already appreciated 15% in 6 months. Excellent ROI guidance.",
      propertyType: "Farm house" // Updated from "Investment Property"
    },
    {
      id: 5,
      name: "Vikram Mehta",
      location: "Panipat",
      image: <FaBuilding />, // Icon for Apartment (e.g., apartment building)
      rating: 5,
      review: "After working with several agents, I finally found the right team. They listened to my needs, showed relevant properties, and negotiated a great deal. Couldn't be happier!",
      propertyType: "Sco plot" // Updated from "1BR Apartment"
    },
    {
      id: 6,
      name: "Sneha Gupta",
      location: "pushkar",
      image: <FaWarehouse />, // Icon for Loft (e.g., warehouse/modern icon for loft)
      rating: 5,
      review: "Relocated for work and needed to sell quickly. They handled everything remotely with video calls and digital signatures. Sold above asking price in 2 weeks. Amazing service!",
      propertyType: "villa" // Updated from "Modern Loft"
    }
  ];

  return (
    <div className="bg-gray-50 py-12 px-4">
      {/* Desktop Layout with Sidebar Space */}
      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl px-3 sm:px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their real estate experience with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-gray-900">4.9/5</span>
                <span className="text-gray-600 ml-1">from 150+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateTestimonials;