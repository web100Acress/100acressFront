import React from 'react'

const NewSearchBar = () => {
  return (
    <div className="font-sans">
     <header className="flex justify-between items-center px-6 py-4 bg-red-600 text-white">
        <div className="text-2xl font-bold">100acress.com</div>
        <nav className="flex space-x-6">
          <a href="#resale" className="hover:underline">Resale</a>
          <a href="#rental" className="hover:underline">Rental</a>
          <a href="#projects" className="hover:underline">Projects</a>
        </nav>
        <button className="bg-white text-red-600 px-4 py-2 rounded">
          List Properties
        </button>
      </header>

      {/* Search Section */}
      <section className="bg-red-500 text-white py-6 px-6">
        <div className="text-center mb-4 text-xl font-semibold">
          Find Your Perfect Place to Call Home.
        </div>
        <div className="flex justify-center items-center space-x-4">
          <select className="p-2 rounded">
            <option>Gurugram</option>
            <option>Delhi</option>
            <option>Noida</option>
          </select>
          <input
            type="text"
            placeholder="Search for property, locality, rent etc..."
            className="p-2 rounded w-1/2"
          />
          <button className="bg-white text-red-600 px-4 py-2 rounded">
            Search
          </button>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button className="bg-white text-red-600 px-4 py-2 rounded">Buy</button>
          <button className="bg-white text-red-600 px-4 py-2 rounded">Rent</button>
          <button className="bg-white text-red-600 px-4 py-2 rounded">New Launch</button>
        </div>
      </section>

      {/* Localities Section */}
      <div className="flex justify-center mt-4 space-x-4 flex-wrap">
        {["Sohna Road", "Golf Course Road", "MG Road", "New Gurgaon", "South Peripheral Road", "Dwarka Express"].map((locality, index) => (
          <button key={index} className="bg-white text-red-600 px-4 py-2 rounded">
            {locality}
          </button>
        ))}
      </div>

      {/* Banner Section */}
      <section className="bg-red-400 text-white py-8 text-center">
        <h2 className="text-3xl font-bold">2024 Big Billion Property Sale</h2>
        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
        <button className="mt-4 bg-white text-red-600 px-4 py-2 rounded">
          Explore Now
        </button>
      </section>

      {/* Spotlight Section */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Spotlight Banner</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Property 1", description: "Lorem ipsum dolor sit amet." },
            { name: "Property 2", description: "Sed ut perspiciatis unde." },
            { name: "Property 3", description: "Nemo enim ipsam voluptatem." },
          ].map((property, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4">
              <img
                src="https://via.placeholder.com/150"
                alt={property.name}
                className="w-full rounded"
              />
              <h3 className="mt-2 font-bold">{property.name}</h3>
              <p>{property.description}</p>
            </div>
          ))}
        </div>
      </section>
  </div>
  )
}

export default NewSearchBar