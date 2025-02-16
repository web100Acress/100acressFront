import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Switch,message } from "antd";
import { FaCheck, FaXmark} from "react-icons/fa6";

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};


const EditDetails = () => {
  
  const [values, setValues] = useState({
    propertyType: "",
    propertyName: "",
    frontImage: "",
    otherImage: [],
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
    verify: "unverified",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const { id } = useParams();

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


  function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const previewImage = document.getElementById("previewImage");
        previewImage.src = e.target.result;
        setValues((prevValues) => ({
          ...prevValues,
          frontImage: {
            file: input.files[0],
            url: e.target.result,
          },

        }))
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  const handleOtherImageFileChange = (event)=>{
    const input = event.target;
    if (input.files && input.files[0]) {
      const files = Array.from(event.target.files);
      const updatedImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setValues({
        ...values,
        otherImage: [
          ...updatedImages,
        ],
      });

    }
  }

  const handleUpdateUser = async () => {
    try {
      messageApi.open({
        key: "loadingUpdateProperty",
        type: "loading",
        content: "Updating Data...",
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
        formData.append("frontImage", values.frontImage.file);
      }
      
      //Apend OtherImages If exist
      if (values.otherImage && Array.isArray(values.otherImage)) {
        values.otherImage.forEach((item, index) => {
          if (item && item.file) {
            formData.append(`otherImage`, item.file);
          }
        });
      }

      const response = await axios.post(
        `https://api.100acress.com/postPerson/propertyoneUpdate/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200) {
          messageApi.destroy("loadingUpdateProperty");

          console.log("Response Data: ",response.data)

          messageApi.open({
            key: "successUpdateProperty",
            type: "success",
            content: "Data Updated Successfully",
          });
      } else {
        messageApi.destroy("loadingUpdateProperty");
        messageApi.open({
          key: "errorUpdateProperty",
          type: "error",
          content: "Failed to update user",
        });
      }
    } catch (error) {
      messageApi.destroy("loadingUpdateProperty");
      messageApi.open({
        key: "errorUpdateProperty",
        type: "error",
        content: "Failed to update user",
      });
      console.error("Error updating user:", error);
    }
  };

  const handleVerifyToggle = (checked) => {
    setValues((prevValues) => ({
      ...prevValues,
      verify: checked ? "verified" : "unverified", // Update verify state
    }));
  };


  return (
    <>
      <Sidebar />
      {contextHolder}
      <div style={customStyle}>
        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4  ">
            <Switch 
              checked={values.verify === "verified"} // Sync switch state with verify value
              onChange={handleVerifyToggle} // Handle toggle
              checkedChildren={<FaCheck size={20}/>} 
              unCheckedChildren={<FaXmark size={20}/>} 
              className="bg-[#808080]"
            />
          </div>
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
                      alt=""
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                    <br />
                    <input type="file" onChange={(e) => handleFileChange(e)} />
                  </td>
                </tr>

                <tr>
                  <th>Other Images</th>
                </tr>

                <tr>
                  <td>
                    <section className="w-full mx-4">
                      <div className="flex flex-wrap max-w-screen-md ">
                        {values.otherImage &&
                          Array.isArray(values.otherImage) &&
                          values.otherImage.length > 0 &&
                          values.otherImage.map((image, index) => (
                            <article
                              key={index}
                              className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                            >
                            <img
                                src={image ? image.url : ""}
                                alt="OtherImages"
                                id="previewOtherImage"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <br />
                              {/* <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              /> */}
                            </article>
                          ))}
                      </div>
                      <br />
                      <input
                        type="file"
                        name="otherImage"
                        multiple
                        accept="image/*"
                        onChange={(event) => handleOtherImageFileChange(event)}
                      />
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
                          className="outline-none w-96"
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
                      Property Type :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={values.propertyType}
                          className="outline-none w-96"
                          name="propertyType"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              propertyType: e.target.value,
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
                          className="outline-none w-96"
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
                      City:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={values.city}
                          className="outline-none w-96"
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
                      State :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={values.state}
                          name="state"
                          className="outline-none w-96"
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
                      Price :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="price"
                          value={values.price}
                          className="outline-none w-96"
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
                          className="outline-none w-96"
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
                    <span className="text-red-600 font-semibold ">
                      Project Description :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="descripation"
                          value={values.descripation}
                          className="outline-none w-96"
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
                          className="outline-none w-96"
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
                          className="outline-none"
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
                          className="outline-none"
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
                          className="outline-none"
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
                      Available Date:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="availableDate"
                          value={values.availableDate}
                          className="outline-none"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              availableDate: e.target.value,
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
                          className="outline-none"
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
    </>
  );
};

export default EditDetails;
