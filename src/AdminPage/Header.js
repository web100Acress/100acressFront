import React, { useState, useEffect, useRef } from 'react';

const Header = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (showDropdown) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className='flex w-full h-20 pl-5 bg-red-600 shadow-md items-center justify-between'>
      <button  className="w-10 fa-2x text-white" onClick={toggleSidebar}>
        &#9776;
      </button>
      <div className='relative pr-10' onClick={toggleDropdown} ref={dropdownRef}>
        <div className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
          <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
        </div>
        {showDropdown && (
          <div className="absolute mt-3 right-0 bg-white border text-black-600 border-gray-200 rounded shadow-md">
          <ul className='text-justify font-50 m-0 p-0 pt-2 pb-2'>
            <li className="p-2 px-4 hover:bg-gray-200 cursor-pointer">
              <a href="#" className="block">
                ChangeEmail
              </a>
            </li>
            <li className="p-2 px-4 hover:bg-gray-200 cursor-pointer">
              <a href="#" className="block">
                ChangePassword
              </a>
            </li>
            <li className="p-2 px-4 hover:bg-gray-200 cursor-pointer">
              <a href="#" className="block">
                Sign Out
              </a>
            </li>
          </ul>
        </div>
        )}
      </div>
    </div>
  );
};

export default Header;

