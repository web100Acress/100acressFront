import React from 'react';

const Snapshot = () => {
    return (
        <>
            <div>
                <p className='text-xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl text-red-600 text-left px-10 mt-4'>100acress.com Snapshot</p>
            </div>
            <div className='px-10 '>
                <section className="relative overflow-hidden bg-gray-50 border-2 py-4 rounded-lg">
                    <p className="px-12 text-justify mb-0 hidden sm:block">
                        100acress.com Real Estate Company specializes in providing premier property solutions tailored to meet your needs. With a diverse portfolio spanning residential, commercial, and industrial properties, we offer unparalleled expertise in real estate acquisition, sales, leasing, and development. Our team of seasoned professionals is committed to delivering exceptional service, guiding you through every step of the process with transparency and integrity.
                    </p>

                    <div className="">
                        <div className="px-12 mt-4 grid max-w-full h-30 grid-cols-1 gap-x-8 gap-y-12 text-center sm:text-left lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
                            <div className="backdrop-blur-sm relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
                                <p className="relative text-2xl text-center font-black text-black">1245+</p>
                                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Residential Projects</p>
                            </div>

                            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
                                <p className="relative text-2xl text-center font-black text-black">550+</p>
                                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Commercial Projects</p>
                            </div>

                            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
                                <p className="relative text-2xl text-center font-black text-black">54+</p>
                                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">SCO Plots</p>
                            </div>
                            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
                                <p className="relative text-2xl text-center font-black text-black">250+</p>
                                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Plots &  Floors</p>
                            </div>
                            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
                                <p className="relative text-2xl text-center font-black text-black">1000+</p>
                                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Verified Users</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Snapshot;