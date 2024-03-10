import React from 'react';
import { Link } from 'react-router-dom';

const Free = () => {
    return (
        <>
            <div className='px-6 md:px-10 lg:px-20 py-8 shadow-2xl'>
                <div className='flex flex-col md:flex-row justify-between items-center w-full bg-blue-50 h-auto md:h-30 px-4 md:px-10 py-6 md:py-8 rounded-xl'>
                    <div className='md:mr-4'>
                        <p className='text-left text-2xl mb-2'>Post your Property for <em className="font-damion font-serif text-3xl">Free!</em></p>
                        <p className='pt-0'>List your property today and connect with potential buyers or sellers without any cost.</p>
                    </div>
                    <div className='text-center md:text-right mt-4 md:mt-0'>
                        <Link to="/SignIn" target='_top' ><button className='text-black px-6 md:px-8 bg-blue-300 py-2 md:py-3 rounded-full mt-[-1.5rem]'>
                            Post Property <span className='text-white font-bold bg-red-600 px-2 md:px-3 py-1 rounded-xl'>Free</span>
                        </button></Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Free;