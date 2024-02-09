import React from 'react';
import Sidebar from './Sidebar';

const customStyles = {
  position: "absolute",
  marginLeft:'100px',
  top: "100px"
};
 
const Dashboard = () => {
  return (
    <>
    <Sidebar/>
    <div className="d-flex" style={customStyles}>
      <div className="grid grid-cols-12 w-1/5" ></div>
    <div className='grid grid-cols-9 w-4/5 sm:grid-cols-2 md:grid-cols-4 gap-4 py-8 ' >
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 1</h3>
        <p className='text-gray-600'>Content for card 1 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 2</h3>
        <p className='text-gray-600'>Content for card 2 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 3</h3>
        <p className='text-gray-600'>Content for card 3 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 1</h3>
        <p className='text-gray-600'>Content for card 1 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 2</h3>
        <p className='text-gray-600'>Content for card 2 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 3</h3>
        <p className='text-gray-600'>Content for card 3 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 1</h3>
        <p className='text-gray-600'>Content for card 1 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 2</h3>
        <p className='text-gray-600'>Content for card 2 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 3</h3>
        <p className='text-gray-600'>Content for card 3 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 1</h3>
        <p className='text-gray-600'>Content for card 1 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 2</h3>
        <p className='text-gray-600'>Content for card 2 goes here...</p>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h3 className='text-xl font-semibold mb-2'>Card 3</h3>
        <p className='text-gray-600'>Content for card 3 goes here...</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default Dashboard;


