import React, { useState, useEffect } from 'react';

const Flag = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the modal after a delay of 2 seconds when the component is mounted
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(openTimer); // Clean up the timer if the component unmounts
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center  bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              &#10005; {/* Cross icon */}
            </button>
            <img
              alt="India Flag"
              className="h-[24rem] w-[36rem] object-cover object-center"
              src="../../../Images/IndiaFlag.avif"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Flag;
