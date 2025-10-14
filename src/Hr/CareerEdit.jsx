import React, { useEffect, useState } from "react";
import Sidebar from "../AdminPage/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
const CareerEdit = () => {
  const customStyle = {
    position: "absolute",
    top: "100px",
    marginLeft: "250px",
    right: "auto",
    width: "80%",
  };

  const { id } = useParams();
  const [value, setValue] = useState({
    whyAcress: "",
    driveCulture: "",
    inHouse: "",
    lifeAcress: [],
  });

  const { highlightImage, activityImage } = value;

  const highlightImageLength = value.highlightImage ? value.highlightImage.length : 0;
  const activityImageLength = value.activityImageLength ? value.activityImageLength.length : 0;

  const fetchViewData = async () => {
    try {
      const res = await axios.get(
        `/career/page/edit/${id}`
      );
      setValue(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchViewData();
  }, []);


function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setValue((prevValues) => ({
          ...prevValues,
          bannerImage: {
            file: input.files[0],
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


function handleFileChange1(event) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      const filesArray = Array.from(input.files); 
      const promises = filesArray.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            resolve({
              file: file,
              url: e.target.result,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
  
      Promise.all(promises)
        .then((images) => {
          setValue((prevValues) => ({
            ...prevValues,
            highlightImage: [...prevValues.highlightImage, ...images],
          }));
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    }
  }
  

  function handleFileChange2(event) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
      const filesArray = Array.from(input.files); 
      const promises = filesArray.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            resolve({
              file: file,
              url: e.target.result,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
  
      Promise.all(promises)
        .then((images) => {
          setValue((prevValues) => ({
            ...prevValues,
            activityImage: [...prevValues.activityImage, ...images],
          }));
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    }
  }
  

const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
    for (const key in value) {
        if (key === "highlightImage" || key === "activityImage") {
          const imageArray = value[key];
          const imageLength = key === "highlightImage" ? highlightImageLength : activityImageLength;
          for (let i = 0; i < imageLength; i++) {
            formData.append(key, imageArray[i].file);
          }
        } else {
          formData.append(key, value[key]);
        }
      }
      formData.append("bannerImage", value.bannerImage.file);
      const res = await axios.put(`/career/page/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        alert("Data updated successfully");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.log(error || error.message);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={customStyle}>
        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          <div className="card-body">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Banner Images</th>
                </tr>
                <tr>
                  <td>
                    <img
                      src={value.bannerImage && value.bannerImage.url}
                      alt="bannerImage"
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                    <br />
                    <input type="file" onChange={(e)=> handleFileChange(e)} />
                  </td>
                </tr>

                <tr>
                  <th> Highlight Image</th>
                </tr>
                <tr>
                  <td>
                    <section className="w-full mx-4">
                      <div className="flex flex-wrap max-w-screen-md ">
                        {highlightImage &&
                          Array.isArray(highlightImage) &&
                          highlightImage.length > 0 &&
                          highlightImage.map((image, index) => (
                            <article className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                              <img
                                src={image.url}
                                alt=""
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </article>
                          ))}
                      </div>
                      <br />
                      <input multiple type="file" onChange={(e)=> handleFileChange1(e)} />
                    </section>
                  </td>
                </tr>

                <tr>
                  <th> Activity Image</th>
                </tr>
                <tr>
                  <td>
                    <section className="w-full mx-4">
                      <div className="flex flex-wrap max-w-screen-md ">
                        {activityImage &&
                          Array.isArray(activityImage) &&
                          activityImage.length > 0 &&
                          activityImage.map((image, index) => (
                            <article className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                              <img
                                src={image.url}
                                alt="activityImage"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </article>
                          ))}
                      </div>
                      <br />
                      <input multiple type="file" onChange={(e)=> handleFileChange2(e)} />
                    </section>
                  </td>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Why Acress :{" "}
                      <input
                        type="text"
                        value={value.whyAcress}
                        onChange={(e) =>
                          setValue({ ...value, whyAcress: e.target.value })
                        }
                        style={{ color: "black", fontWeight: "normal" }}
                      />
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Life Acress :{" "}
                      <input
                        type="text"
                        value={value.lifeAcress}
                        onChange={(e) =>
                          setValue({ ...value, lifeAcress: e.target.value })
                        }
                        style={{ color: "black", fontWeight: "normal" }}
                      />
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      In House:{" "}
                      <input
                        type="text"
                        value={value.inHouse}
                        onChange={(e) =>
                          setValue({ ...value, inHouse: e.target.value })
                        }
                        style={{ color: "black", fontWeight: "normal" }}
                      />
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Drive Culture :{" "}
                      <input
                        type="text"
                        value={value.driveCulture}
                        onChange={(e) =>
                          setValue({ ...value, driveCulture: e.target.value })
                        }
                        style={{ color: "black", fontWeight: "normal" }}
                      />
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
    </div>
  );
};

export default CareerEdit;
