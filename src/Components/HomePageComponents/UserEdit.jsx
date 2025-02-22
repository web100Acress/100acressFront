import React, { useEffect, useState } from "react";
import Footer from "../Actual_Components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import {message} from "antd";

const UserEdit = () => {
  const [values, setValues] = useState({
    propertyType: "",
    propertyName: "",
    address: "",
    city: "",
    state: "",
    price: "",
    area: "",
    descripation: "",
    landMark: "",
    amenities: [],
    builtYear: "",
    furnishing: "",
    type: "",
    availableDate: "",
    propertyLooking: "Select Property Type",
    subType: "",
    frontImage: null,
    otherImage: [],
  });
  const { otherImage } = values;
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/postPerson/propertyoneEdit/${id}`
        );
        setValues(res.data.data.postProperty[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateUser = async () => {
    try {
      messageApi.open({
        key:"loadingUpdatePropertyByUser",
        type:"loading",
        content:"Updating Data...",
        duration:0
      })
      const formData = new FormData();

      // Append all key-value pairs from values
      for (const key in values) {
        if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      }

      //Append front image If exist
      if (values.frontImage && values.frontImage.file) {
        console.log("Front image:", values.frontImage.file);
        formData.append("frontImage", values.frontImage.file);
      }
      
      //Apend OtherImages If exist
      if (values.otherImage && Array.isArray(values.otherImage)) {
        values.otherImage.forEach((item, index) => {
          if (item && item.file) {
            formData.append(`otherImage`, item.file);
          }
        });
        console.log("Other images Updated");
      }

      const response = await axios.post(
        `https://api.100acress.com/postPerson/propertyoneUserUpdate/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        messageApi.destroy("loadingUpdatePropertyByUser");
        messageApi.open({
          key:"successUpdatePropertyByUser",
          type:"success",
          content:"Property Updated Successfully",
          duration:2
        });
      } else {
        messageApi.destroy("loadingUpdatePropertyByUser");
        messageApi.open({
          key:"errorUpdatePropertyByUser",
          type:"error",
          content:"Failed to Update the property. Please try again.",
          duration:2
        });
      }
    } catch (error) {
      messageApi.destroy("loadingUpdatePropertyByUser");
      messageApi.open({
        key:"errorUpdatePropertyByUser",
        type:"error",
        content:"Failed to Update the property. Please try again.",
        duration:2
      })
      console.error("Error updating user:", error);
    }
  };

  function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {

        setValues((prevValues) => ({
          ...prevValues,
          frontImage: {
            file: input.files[0],
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  const handleOtherImageFileChange = (event) => {
    const input = event.target;
    if(input.files && input.files[0]) {
      const files = Array.from(event.target.files);
      const updatedImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setValues({
        ...values,
        otherImage: [
          ...updatedImages,
        ]
      })
    }
  }

  return (
    <>
      <div>
        {contextHolder}
        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          <div className="card-body">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Front Images</th>
                </tr>

                <tr>
                  <td>
                    <img
                      src={values.frontImage ? values.frontImage.url : ""}
                      alt="frontImage"
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                    <br />
                    <input type="file" onChange={(e) => handleFileChange(e)} />
                  </td>
                </tr>

                <tr>
                  <th>Other Images </th>
                </tr>


                <tr>
                  <td>
                    <section className="w-full mx-4">
                      <div className="flex flex-wrap max-w-screen-md ">
                        {otherImage &&
                          Array.isArray(otherImage) &&
                          otherImage.length > 0 &&
                          otherImage.map((image, index) => (
                            <article
                              key={index}
                              className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                            >
                              <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </article>
                          ))}
                        <br />
                        <input
                          type="file"
                          multiple
                          name="otherImage"
                          onChange={(e) => handleOtherImageFileChange(e)}
                        />
                      </div>
                    </section>
                  </td>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Property Name :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={values.propertyName}
                          className="outline-none  w-96"
                          name="propertyName"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              propertyName: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      State :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={values.state}
                          className="outline-none"
                          name="state"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              state: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      City :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={values.city}
                          className="outline-none"
                          name="city"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              city: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Address :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={values.address}
                          className="outline-none  w-96"
                          name="address"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              address: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Price :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="price"
                          value={values.price}
                          className="outline-none  w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              price: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Area :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="area"
                          value={values.area}
                          className="outline-none  w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              area: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold  ">
                      Project Description :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="descripation"
                          style={{ width: "600px" }}
                          value={values.descripation}
                          className="outline-none  w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              descripation: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Landmark :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="landMark"
                          value={values.landMark}
                          className="outline-none  w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              landMark: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Built Year :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="builtYear"
                          value={values.builtYear}
                          className="outline-none  w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              builtYear: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Amenities :{" "}
                      <span
                        style={{
                          color: "black",
                          outline: "none",
                          fontWeight: "normal",
                        }}
                      >
                        <input
                          type="text"
                          value={values.amenities}
                          className="outline-none  w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              amenities: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Furnishing :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="furnishing"
                          value={values.furnishing}
                          className="outline-none w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              furnishing: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Type :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={values.type}
                          className="outline-none w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              type: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Select Property Type:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="propertyLooking"
                          value={values.propertyLooking}
                          className="outline-none w-96"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              propertyLooking: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>

            <button
              type="button"
              onClick={handleUpdateUser}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserEdit;
