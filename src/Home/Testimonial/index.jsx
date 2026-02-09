import React from 'react';
import Desktoptestimonial from './Desktoptestimonial';
import Mobiletestimonial from './Mobiletestimonial';

const TestimonialIndex = () => {
    return (
        <>
            {/* Show Desktop Version on medium screens and up */}
            <div className="hidden md:block">
                <Desktoptestimonial />
            </div>

            {/* Show Mobile Version on small screens */}
            <div className="block md:hidden">
                <Mobiletestimonial />
            </div>
        </>
    );
};

export default TestimonialIndex;