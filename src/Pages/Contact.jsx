import React, { useState } from "react";
import Navbar from "../aadharhomes/navbar/Navbar";
import Footer from "../Components/Actual_Components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };
  return (
    <div>
      <Navbar />
      <>
      <div className="object-fit  ">
        <img src="https://img.jamesedition.com/listing_images/2023/12/14/21/42/59/62acdff9-583e-427c-b246-bb4c567c903a/je/1100xxs.jpg"
        style={{height:"70vh", width:"100%"}}/>
      </div>

        <section className=" mx-40">
          <h2 className="h1-responsive font-weight-bold text-center my-4">
            Contact us
          </h2>
          <p className="text-center w-responsive mx-auto mb-5">
            Do you have any questions? Please do not hesitate to contact us
            directly. Our team will come back to you within a matter of hours to
            help you.
          </p>
          <div className="row pt-2">
            <div className="col-md-9 mb-md-0 mb-5">
              <form
                id="contact-form"
                name="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Your Name*"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Your Email*"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        className="form-control"
                        placeholder="Enter Mobile Number*"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-md-12">
                    <div className="md-form">
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        rows={2}
                        className="form-control md-textarea"
                        placeholder="Any Query!"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center text-md-left pt-4">
                  <button type="submit" className="btn btn-danger">
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-3 text-center mb-3">
              <ul className="list-unstyled mb-0">
                <li>
                  <i className="fas fa-map-marker-alt fa-2x" />
                  <p>San Francisco, CA 94126, USA</p>
                </li>
                <li>
                  <i className="fas fa-phone mt-4 fa-2x" />
                  <p>+ 01 234 567 89</p>
                </li>
                <li>
                  <i className="fas fa-envelope mt-4 fa-2x" />
                  <p>contact@mdbootstrap.com</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </>

      <Footer />
    </div>
  );
};

export default Contact;
