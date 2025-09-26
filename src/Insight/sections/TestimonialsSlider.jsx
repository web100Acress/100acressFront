import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>
      
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
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
      name: "Sudhanshu",
      location: "Downtown District",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "Working with this real estate team was exceptional. They helped us find our dream home in just 3 weeks. Their market knowledge and negotiation skills saved us thousands. Highly recommend!",
      propertyType: "3BR Condo"
    },
    {
      id: 2,
      name: "ananya",
      location: "Riverside Heights",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "As a first-time home buyer, I was nervous about the process. The team guided me through every step with patience and expertise. They made what seemed impossible, possible.",
      propertyType: "2BR Townhouse"
    },
    {
      id: 3,
      name: "Deepika",
      location: "Oakwood Estates",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "Selling our family home was emotional, but this team made it stress-free. They priced it perfectly and had multiple offers within days. Professional service from start to finish.",
      propertyType: "4BR Family Home"
    },
    {
      id: 4,
      name: "Narendra",
      location: "Marina Bay",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "Investment property purchase made easy. Their market analysis was spot-on, and they found me a property that's already appreciated 15% in 6 months. Excellent ROI guidance.",
      propertyType: "Investment Property"
    },
    {
      id: 5,
      name: "Soni",
      location: "Sunset Hills",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "After working with several agents, I finally found the right team. They listened to my needs, showed relevant properties, and negotiated a great deal. Couldn't be happier!",
      propertyType: "1BR Apartment"
    },
    {
      id: 6,
      name: "Virat",
      location: "Tech Valley",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "Relocated for work and needed to sell quickly. They handled everything remotely with video calls and digital signatures. Sold above asking price in 2 weeks. Amazing service!",
      propertyType: "Modern Loft"
    }
  ];

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
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
  );
};

export default RealEstateTestimonials;