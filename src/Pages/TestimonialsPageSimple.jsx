import React from 'react';
import { Link } from 'react-router-dom';

const TestimonialsPageSimple = () => {
    console.log('TestimonialsPageSimple component is rendering!');
    
    const testimonials = [
        {
            id: 1,
            name: "Soumya",
            role: "Verified Buyer",
            text: "Honestly, had a really smooth experience with 100acress. The team was friendly and actually listened to what I needed.",
            rating: 5,
        },
        {
            id: 2,
            name: "Purvi Rathee",
            role: "Verified Buyer", 
            text: "100acress is really best real estate office in Gurgaon. It helps customers find a perfect property.",
            rating: 5,
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Customer Testimonials</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                            <p className="text-gray-600 mb-2">{item.role}</p>
                            <p className="text-gray-800">"{item.text}"</p>
                            <div className="text-yellow-500 mb-4">
                                {'⭐'.repeat(item.rating)}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-8">
                    <Link to="/" className="text-blue-600 underline">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPageSimple;
