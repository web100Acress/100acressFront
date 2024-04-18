import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
const CareerView = () => {
  const customStyle = {
    position: "absolute",
    top: "100px",
    marginLeft: "250px",
    right: "auto",
    width: "80%",
  };

  const { id } = useParams();
  const [viewData, setViewData] = useState([]);

  const fetchViewData = async () => {
    try {
      const res = await axios.get(
        `https://api.100acress.com/career/page/edit/${id}`
      );
      setViewData(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchViewData();
  }, []);

  const { activityImage, highlightImage } = viewData;

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
                      src={viewData.bannerImage && viewData.bannerImage.url}
                      alt="bannerImage"
                      style={{ maxWidth: "20%" }}
                    />
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
                    </section>
                  </td>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Why Acress :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewData.whyAcress}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Life Acress :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewData.lifeAcress}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    In House:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewData.inHouse}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Drive Culture :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewData.driveCulture}
                      </span>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerView;
