import React from 'react';
import '../../../styles/newbanner/contact.css';
import { PhoneIcon, WhiteLineIcon } from '../../../Assets/icons';

const ContactSection = ({ projectViewDetails, userDetails, emailError, setEmailError, handleChange, userSubmitDetails }) => {
  return (
    <section className="nb-contact-section">
      <div className="nb-contact-grid">
        <div className="nb-contact-left">
          <span className="nb-contact-eyebrow">
            <span className="nb-contact-eyebrow-icon">
              <WhiteLineIcon />
            </span>
            Contact
          </span>
          <h3 className="nb-contact-title">Make an Enquiry</h3>
          <p className="nb-contact-call">
            <a
              href={`tel:${projectViewDetails?.mobileNumber === 9811750130 ? '8527134491' : '8500900100'}`}
              className="nb-contact-call-link"
            >
              <span className="nb-contact-call-icon"><PhoneIcon /></span>
              <span className="nb-contact-call-number"> &nbsp; {`${projectViewDetails?.mobileNumber === 9811750130 ? '+91 8527-134-491' : '+91 8500 900 100'}`}</span>
            </a>
          </p>
        </div>

        <div className="nb-contact-card">
          <form className="nb-contact-form">
            <div>
              <label htmlFor="name" className="nb-visually-hidden">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={userDetails.name}
                required
                placeholder="Enter Your Name*"
                className="nb-contact-input"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="nb-visually-hidden">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={userDetails.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    handleChange(e);
                  }
                }}
                required
                placeholder="Contact Number*"
                className="nb-contact-input"
              />

              {userDetails.mobile && userDetails.mobile.length < 10 && (
                <p className="nb-input-error">Mobile number must be at least 10 digits.</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="nb-visually-hidden">Email Address</label>
              <input
                type="text"
                name="email"
                value={userDetails.email}
                onChange={(e) => {
                  const { name, value } = e.target;
                  // Update the userDetails state happens in parent handler
                  handleChange(e);
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(value) && value !== '') {
                    setEmailError('Invalid email address');
                  } else {
                    setEmailError('');
                  }
                }}
                placeholder="Enter Your Email*"
                className="nb-contact-input"
              />

              {emailError && <p className="nb-input-error">{emailError}</p>}

            </div>
            <p className='nb-contact-privacy'> * Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>
            <button onClick={userSubmitDetails} className="nb-contact-submit">
              Submit <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
