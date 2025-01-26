import React,{useState, useEffect} from 'react'

const SmallPopForm = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      const timeOutId = setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      return () => clearTimeout(timeOutId);
    }, []);
  return (
    <div className='relative mx-2'>
         {showPopup && (
        <div className="relative  ">
          {/* Popup */}
          {showPopup && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center" >
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
              <div className="relative">
                <button
                  className="absolute top-0 right-0  text-red-600 rounded-lg"
                  onClick={() => setShowPopup(false)}
                >
                  <i className="fa-solid fa-xmark text-4xl"></i>
                </button>
                <form className=" rounded-lg px-6 py-3 w-96 shadow-md bg-black" >
                  <div className="mb-2">
                    <h2 class="text-xl font-semibold text-red-600">
                      GET A CALLBACK
                    </h2>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      class="appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="message"
                      rows="2"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <div class="flex justify-center">
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-[150px] rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SmallPopForm