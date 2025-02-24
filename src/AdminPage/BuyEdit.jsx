
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams,Link } from "react-router-dom";
import axios from "axios";

const customStyle = {
    position: "absolute",
    top: "100px",
    marginLeft: "250px",
    right: "auto",
    width: "80%",
};

function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
const BuyEdit = () => {
    const [viewDetails, setViewDetails] = useState([]);
    const [update, SetUpdate] = useState([]);
    const { id } = useParams();
    const { frontImage, otherImage } = viewDetails;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `https://api.100acress.com/property/buy/edit/${id}`
                );
                setViewDetails(res.data.dataedit);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <Sidebar />
            <div style={customStyle}>
                <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
                    <div className="card-body">

                        <table className="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <td>
                                        <img
                                            src={viewDetails.frontImage ? viewDetails.frontImage.url : ""}
                                            alt=""
                                            style={{ maxWidth: "20%" }}
                                            id="previewImage"
                                        />
                                        <br />
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(e)}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <th>Other Images</th>
                                </tr>

                                <tr>
                                    <td>
                                        <section className="w-full mx-4">
                                            <div className="flex flex-wrap max-w-screen-md ">
                                                {otherImage &&
                                                    Array.isArray(otherImage) &&
                                                    otherImage.length > 0 &&
                                                    otherImage.map((image, index) => (
                                                        <article key={index} className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                                                            <img
                                                                src={image.url}
                                                                alt={`Image ${index + 1}`}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        </article>
                                                    ))}
                                            </div>
                                        </section>

                                    </td>
                                </tr>



                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Property Name :{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input
                                                    type="text"
                                                    className="outline-none"
                                                    value={viewDetails.propertyName}
                                                    onChange={(e) => setViewDetails({ ...viewDetails, propertyName: e.target.value })}
                                                />
                                            </span>
                                        </span>
                                    </th>

                                </tr>
                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Property Type :{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.propertyType}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, propertyType: e.target.value })} />
                                            </span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Address :{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.address}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, address: e.target.value })} />
                                            </span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            City:{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.city}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, city: e.target.value })} /></span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            State :{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.state}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, state: e.target.value })} /></span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Price :{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.price}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, price: e.target.value })} /></span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Description :{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.descripation}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, descripation: e.target.value })} /></span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Landmark :{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.landmark}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, landmark: e.target.value })} /></span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Build Year:{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.builtYear}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, builtYear: e.target.value })} /></span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Amenities :{' '}
                                            <span style={{ color: 'black', outline: "none", fontWeight: 'normal' }}>
                                                <input
                                                    type="text"
                                                    className="outline-none"
                                                    value={viewDetails.amenities && viewDetails.amenities.length > 0 ? viewDetails.amenities.join(', ') : ''}
                                                    onChange={(e) => {
                                                        const newAmenities = e.target.value.split(',').map((item) => item.trim());
                                                        setViewDetails((prevDetails) => ({
                                                            ...prevDetails,
                                                            amenities: [...newAmenities],
                                                        }));
                                                    }}
                                                />
                                            </span>
                                        </span>

                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Type :{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.type}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, type: e.target.value })} /></span>
                                        </span>
                                    </th>
                                </tr>

                                <tr>
                                    <th>
                                        <span className="text-red-600 font-semibold ">
                                            Available Date:{' '}
                                            <span style={{ color: 'black', fontWeight: 'normal' }}>
                                                <input type="text" value={viewDetails.availableDate}
                                                    className="outline-none"
                                                    onChange={(e) => setViewDetails({ ...viewDetails, availableDate: e.target.value })} /></span>
                                        </span>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        
                        <Link to="#">
                            <button 
                                type="button"
                                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >

                                Update
                            </button>
                            </Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default BuyEdit;