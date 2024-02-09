/** @format */

import React from "react";
import styled from "styled-components";

function SingleBlog() {
  return (
    <Wrapper className='section'>
      <article className='postName article' id='postId'>
        <header className='entry-header text-center header-footer-group'>
          <div className='entry-header-inner section-inner medium'>
            <div className='entry-categories'>
              <span className='screen-reader-text'>Categories</span>
              
            </div>
            <h1 className='entry-title'>
              Experience Unparalleled Comfort and Style at Oxirich Chintamani
            </h1>
            <div className='post-meta-wrapper post-meta-single post-meta-single-top'>
              <ul className='post-meta'>
                <li className='post-author meta-wrapper'>
                  <span className='meta-icon'>
                    <span class='screen-reader-text'>Post author</span>
                    <svg
                      class='svg-icon'
                      aria-hidden='true'
                      role='img'
                      focusable='false'
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='20'
                      viewBox='0 0 18 20'>
                      <path
                        fill=''
                        d='M18,19 C18,19.5522847 17.5522847,20 17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,15.3431458 14.6568542,14 13,14 L5,14 C3.34314575,14 2,15.3431458 2,17 L2,19 C2,19.5522847 1.55228475,20 1,20 C0.44771525,20 0,19.5522847 0,19 L0,17 C0,14.2385763 2.23857625,12 5,12 L13,12 C15.7614237,12 18,14.2385763 18,17 L18,19 Z M9,10 C6.23857625,10 4,7.76142375 4,5 C4,2.23857625 6.23857625,0 9,0 C11.7614237,0 14,2.23857625 14,5 C14,7.76142375 11.7614237,10 9,10 Z M9,8 C10.6568542,8 12,6.65685425 12,5 C12,3.34314575 10.6568542,2 9,2 C7.34314575,2 6,3.34314575 6,5 C6,6.65685425 7.34314575,8 9,8 Z'></path>
                    </svg>
                  </span>
                  <span className='meta-text'>
                    By
                    <span> Vivek Sharma</span>
                  </span>
                </li>
                <li className='post-date meta-wrapper'>
                  <span class='meta-icon'>
                    <span class='screen-reader-text'>Post date </span>
                    <svg
                      class='svg-icon'
                      aria-hidden='true'
                      role='img'
                      focusable='false'
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='19'
                      viewBox='0 0 18 19'>
                      <path
                        fill=''
                        d='M4.60069444,4.09375 L3.25,4.09375 C2.47334957,4.09375 1.84375,4.72334957 1.84375,5.5 L1.84375,7.26736111 L16.15625,7.26736111 L16.15625,5.5 C16.15625,4.72334957 15.5266504,4.09375 14.75,4.09375 L13.3993056,4.09375 L13.3993056,4.55555556 C13.3993056,5.02154581 13.0215458,5.39930556 12.5555556,5.39930556 C12.0895653,5.39930556 11.7118056,5.02154581 11.7118056,4.55555556 L11.7118056,4.09375 L6.28819444,4.09375 L6.28819444,4.55555556 C6.28819444,5.02154581 5.9104347,5.39930556 5.44444444,5.39930556 C4.97845419,5.39930556 4.60069444,5.02154581 4.60069444,4.55555556 L4.60069444,4.09375 Z M6.28819444,2.40625 L11.7118056,2.40625 L11.7118056,1 C11.7118056,0.534009742 12.0895653,0.15625 12.5555556,0.15625 C13.0215458,0.15625 13.3993056,0.534009742 13.3993056,1 L13.3993056,2.40625 L14.75,2.40625 C16.4586309,2.40625 17.84375,3.79136906 17.84375,5.5 L17.84375,15.875 C17.84375,17.5836309 16.4586309,18.96875 14.75,18.96875 L3.25,18.96875 C1.54136906,18.96875 0.15625,17.5836309 0.15625,15.875 L0.15625,5.5 C0.15625,3.79136906 1.54136906,2.40625 3.25,2.40625 L4.60069444,2.40625 L4.60069444,1 C4.60069444,0.534009742 4.97845419,0.15625 5.44444444,0.15625 C5.9104347,0.15625 6.28819444,0.534009742 6.28819444,1 L6.28819444,2.40625 Z M1.84375,8.95486111 L1.84375,15.875 C1.84375,16.6516504 2.47334957,17.28125 3.25,17.28125 L14.75,17.28125 C15.5266504,17.28125 16.15625,16.6516504 16.15625,15.875 L16.15625,8.95486111 L1.84375,8.95486111 Z'></path>
                    </svg>{" "}
                  </span>
                  <span class='meta-text'>
                    <span>July 18, 2023</span>
                  </span>
                </li>
                <li className='post-category meta-wrapper'>
                  <span class='meta-icon'>
                    <svg
                      class='svg-icon'
                      aria-hidden='true'
                      role='img'
                      focusable='false'
                      xmlns='http://www.w3.org/2000/svg'
                      width='19'
                      height='19'
                      viewBox='0 0 19 19'>
                      <path d='M9.43016863,13.2235931 C9.58624731,13.094699 9.7823475,13.0241935 9.98476849,13.0241935 L15.0564516,13.0241935 C15.8581553,13.0241935 16.5080645,12.3742843 16.5080645,11.5725806 L16.5080645,3.44354839 C16.5080645,2.64184472 15.8581553,1.99193548 15.0564516,1.99193548 L3.44354839,1.99193548 C2.64184472,1.99193548 1.99193548,2.64184472 1.99193548,3.44354839 L1.99193548,11.5725806 C1.99193548,12.3742843 2.64184472,13.0241935 3.44354839,13.0241935 L5.76612903,13.0241935 C6.24715123,13.0241935 6.63709677,13.4141391 6.63709677,13.8951613 L6.63709677,15.5301903 L9.43016863,13.2235931 Z M3.44354839,14.766129 C1.67980032,14.766129 0.25,13.3363287 0.25,11.5725806 L0.25,3.44354839 C0.25,1.67980032 1.67980032,0.25 3.44354839,0.25 L15.0564516,0.25 C16.8201997,0.25 18.25,1.67980032 18.25,3.44354839 L18.25,11.5725806 C18.25,13.3363287 16.8201997,14.766129 15.0564516,14.766129 L10.2979143,14.766129 L6.32072889,18.0506004 C5.75274472,18.5196577 4.89516129,18.1156602 4.89516129,17.3790323 L4.89516129,14.766129 L3.44354839,14.766129 Z'></path>
                    </svg>
                  </span>
                  <span class='meta-text'>
                    <span>
                      No Comments
                      <span class='screen-reader-text'>
                        {" "}
                        on Experience Unparalleled Comfort and Style at Oxirich
                        Chintamani
                      </span>
                    </span>{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <figure className='featured-media'>
          <div className='featured-media-inner section-inner'>
            <img
              width='1200'
              height='676'
              src='https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-1.jpg'
              className='attachment-post-thumbnail size-post-thumbnail wp-post-image amp-wp-enforced-sizes'
              alt='Oxirich Chintamani Sector 103, Gurgaon'
              decoding='async'
              srcset='https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-1.jpg 1200w, https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-1-300x169.jpg 300w, https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-1-1024x577.jpg 1024w, https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-1-768x433.jpg 768w, https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-1-150x85.jpg 150w'
              sizes='(max-width: 1200px) 100vw, 1200px'
              data-hero-candidate=''
            />
          </div>
        </figure>
        <div className='post-inner thin'>
          <div className='entry-content'>
            <p>
              Are you in search of a luxury residential property in Gurgaon?
              Look no further than{" "}
              <strong>Oxirich Chintamani Sector 103</strong>. This prestigious
              project by Oxirich Group offers a perfect blend of comfort, style,
              and convenience. Let’s take a closer look at what makes Oxirich
              Chintamani Gurgaon a sought-after destination for homeowners.
            </p>
            <h2 class='wp-block-heading'>
              <strong>Location</strong> <strong>Advantage</strong>
            </h2>
            <p>
              <strong>
                <br />
              </strong>
              The <strong>Oxirich Chintamani</strong> is predominantly located
              in Sector 103, Gurgaon. This prime location offers excellent
              connectivity and easy access to major landmarks in the city. The
              project situated near Dwarka Expressway. Meanwhile, it connects to
              the Indira Gandhi International Airport. Residents of{" "}
              <strong>Oxirich Chintamani Gurgaon</strong> enjoy easy
              connectivity to commercial hubs and educational institutions.
            </p>
            <h2 class='wp-block-heading'>
              Luxurious Apartments In Oxirich Chintamani Gurgaon
            </h2>
            <p>
              <br />
              Oxirich Chintamani Sector 103 Gurgaon offers a wide range of
              meticulously designed apartments. Buyers can choose from spacious
              3 BHK and 4 BHK apartments. The apartments are thoughtfully
              crafted with high-quality materials and modern finishes. It is
              providing a perfect blend of elegance and functionality.
            </p>
            <figure class='wp-block-image size-large is-resized'>
              <a href='https://www.100acress.com/oxirich-chintamani/'>
                <img
                  decoding='async'
                  src='https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-1024x577.jpg'
                  alt='Oxirich Chintamani'
                  class='wp-image-8726 amp-wp-enforced-sizes'
                  width='610'
                  height='343'
                  srcset='https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-1024x577.jpg 1024w, https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-300x169.jpg 300w, https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-768x433.jpg 768w, https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon-150x85.jpg 150w, https://www.100acress.com/blog/wp-content/uploads/2023/07/Oxirich-Chintamani-Sector-103-Gurgaon.jpg 1200w'
                  sizes='(max-width: 610px) 100vw, 610px'
                />
              </a>
            </figure>
            <p>
              <strong>
                Amenities and Facilities
                <br />
              </strong>
              At Oxirich Chintamani Gurgaon, residents can indulge in a
              world-class living experience with a range of amenities and
              facilities. The project loaded with a lot of amenities. Such as
              CCTV Surveillance, a Swimming Pool, a Gymnasium, a Fire Fighting
              System, Car Parking Facility, and a children’s play area. The
              well-designed infrastructure ensures a peaceful and enjoyable
              living environment for residents of all ages.
            </p>
            <p>
              <strong>
                Green Spaces and Open Areas
                <br />
              </strong>
              One of the highlights of Oxirich Chintamani is the plenty of green
              spaces and open areas. With over 80% of the project dedicated to
              open spaces, residents can enjoy the beauty of nature right at
              their doorstep. The project features landscaped gardens, parks,
              and walking trails, providing a serene and refreshing ambiance.
            </p>
            <p>
              <strong>
                Security and Safety
                <br />
              </strong>
              <a
                href='https://www.100acress.com/oxirich-chintamani/'
                title='Oxirich Chintamani Gurgaon'>
                <strong>Oxirich Chintamani</strong>
              </a>{" "}
              prioritizes the safety and security of its residents. The project
              equipped with state-of-the-art security systems, including 24/7
              CCTV surveillance. It also consist manned security personnel, and
              secure entry and exit points. This ensures peace of mind for
              residents, allowing them to relax and enjoy their luxurious
              lifestyle without any worries.
            </p>
            <p>
              <strong>
                Nearby Facilities and Infrastructure
                <br />
              </strong>
              Sector 103, Gurgaon is a well-developed locality with excellent
              infrastructure and social amenities. Residents of{" "}
              <a
                href='https://www.100acress.com/oxirich-chintamani/'
                title='Oxirich Chintamani Gurgaon'>
                <strong>Oxirich Chintamani Gurgaon</strong>
              </a>{" "}
              can enjoy easy access to many places. Such as shopping malls,
              supermarkets, schools, hospitals, and banks. Residents can also
              explore the vibrant entertainment and dining options in Delhi and
              other parts of Gurgaon.
            </p>
            <p>
              <strong>
                Conclusion
                <br />
              </strong>
              Oxirich Chintamani Gurgaon offers an exclusive opportunity for
              luxury living. With its prime location,{" "}
              <a
                href='https://www.m3mprojects.net.in/residential-projects.html'
                title='Luxurious Residential Apartments'>
                <strong>Luxurious Residential Apartments</strong>
              </a>
              , world-class amenities, and serene surroundings. It is a perfect
              choice for those seeking a sophisticated and comfortable
              lifestyle. Whether you are a homeowner or an investor, Oxirich
              Chintamani is worth considering.
            </p>
          </div>
        </div>
        <div class='section-inner'>
          <div class='post-meta-wrapper post-meta-single post-meta-single-bottom'>
            <ul class='post-meta'>
              <li class='post-tags meta-wrapper'>
                <span class='meta-icon'>
                  <span class='screen-reader-text'>Tags </span>
                  <svg
                    class='svg-icon'
                    aria-hidden='true'
                    role='img'
                    focusable='false'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'>
                    <path
                      fill=''
                      d='M15.4496399,8.42490555 L8.66109799,1.63636364 L1.63636364,1.63636364 L1.63636364,8.66081885 L8.42522727,15.44178 C8.57869221,15.5954158 8.78693789,15.6817418 9.00409091,15.6817418 C9.22124393,15.6817418 9.42948961,15.5954158 9.58327627,15.4414581 L15.4486339,9.57610048 C15.7651495,9.25692435 15.7649133,8.74206554 15.4496399,8.42490555 Z M16.6084423,10.7304545 L10.7406818,16.59822 C10.280287,17.0591273 9.65554997,17.3181054 9.00409091,17.3181054 C8.35263185,17.3181054 7.72789481,17.0591273 7.26815877,16.5988788 L0.239976954,9.57887876 C0.0863319284,9.4254126 0,9.21716044 0,9 L0,0.818181818 C0,0.366312477 0.366312477,0 0.818181818,0 L9,0 C9.21699531,0 9.42510306,0.0862010512 9.57854191,0.239639906 L16.6084423,7.26954545 C17.5601275,8.22691012 17.5601275,9.77308988 16.6084423,10.7304545 Z M5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 C5.55228475,4 6,4.44771525 6,5 C6,5.55228475 5.55228475,6 5,6 Z'></path>
                  </svg>{" "}
                </span>
                <span class='meta-text'>
                  <a
                    href='https://www.100acress.com/blog/tag/luxury-apartments-in-gurgaon/'
                    rel='tag'>
                    Luxury apartments in Gurgaon
                  </a>
                  ,{" "}
                  <a
                    href='https://www.100acress.com/blog/tag/luxury-property-in-gurgaon/'
                    rel='tag'>
                    Luxury Property in Gurgaon
                  </a>
                  ,{" "}
                  <a
                    href='https://www.100acress.com/blog/tag/oxirich-chintamani/'
                    rel='tag'>
                    Oxirich Chintamani
                  </a>
                  ,{" "}
                  <a
                    href='https://www.100acress.com/blog/tag/oxirich-chintamani-103/'
                    rel='tag'>
                    Oxirich Chintamani 103
                  </a>
                  ,{" "}
                  <a
                    href='https://www.100acress.com/blog/tag/oxirich-chintamani-gurgaon/'
                    rel='tag'>
                    Oxirich Chintamani Gurgaon
                  </a>
                  ,{" "}
                  <a
                    href='https://www.100acress.com/blog/tag/oxirich-chintamani-sector-103-gurgaon/'
                    rel='tag'>
                    Oxirich Chintamani Sector 103 Gurgaon
                  </a>{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </Wrapper>
  );
}

export default SingleBlog;
const Wrapper = styled.section`
font-size: 1.8rem;
letter-spacing: -.015em;

.entry-header{
    background-color:#fff;
}
.has-text-align-center {
    text-align: center;
}
.header-footer-group{
    color:#000;
}
.section-inner.medium {
    max-width: 100rem;
}
.section-inner {
    margin-left: auto;
    margin-right: auto;
    max-width: 120rem;
    width: calc(100% - 4rem);
}
.entry-categories {
    line-height: 1.25;
    margin-bottom: 2rem;
}
.screen-reader-text {
    border: 0;
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    width: 1px;
    word-break: normal;
}
.entry-categories-inner {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem 0 0 -1rem;
}
.singular:not(.overlay-header) .entry-header a{
    color:#e22658;
}
.entry-categories a {
    border-bottom: 0.15rem solid currentColor;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: .036666667em;
    margin: 0.5rem 0 0 1rem;
    text-decoration: none;
    text-transform: uppercase;
}
a, path {
    transition: all .15s linear;
}
h1.entry-title, h2.entry-title {
    margin: 0;
}
h1 {
    font-size: 3.6rem;
    font-weight: 800;
    line-height: 1.138888889;
    
}
h1,h2, .faux-heading{
    letter-spacing: -.0415625em;
    font-feature-settings: "lnum";
    font-variant-numeric: lining-nums;
}
h1, h2, p, img, small, li, ul, form, label, button {
    border: none;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
    text-align: inherit;
}
.post-meta-wrapper {
    margin-top: 2rem;
    margin-right: auto;
    margin-left: auto;
    max-width: 58rem;
    width: 100%;
}
.post-meta{
    color:#6d6d6d;
}
.post-meta-single-top .post-meta {
    justify-content: center;
}
.post-meta {
    color: #6d6d6d;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.5rem;
    font-weight: 500;
    list-style: none;
    margin: -1rem 0 0 -2rem;
}
.post-meta .meta-wrapper {
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
}
.post-meta li {
    flex-shrink: 0;
    letter-spacing: -.016875em;
    margin: 1rem 0 0 2rem;
    max-width: calc(100% - 2rem);
}
li {
    line-height: 1.5;
    margin: 0.5rem 0 0 2rem;
}
.post-meta .meta-icon {
    flex-shrink: 0;
    margin-right: 1rem;
}
.screen-reader-text:not(#_#_#_#_#_#_#_) {
    position: absolute;
    word-wrap: normal;
}
.screen-reader-text {
    border: 0;
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    width: 1px;
    word-break: normal;
}
.post-meta .post-author .meta-icon svg {
    width: 1.6rem;
    height: 1.8rem;
}
svg, img {
    display: block;
    height: auto;
    max-width: 100%;
}
.post-meta svg * {
    fill: currentColor;
}
.singular .featured-media {
    margin-top: 0;
}
figure {
    display: block;
    margin: 0;
}
.featured-media {
    margin-top: 5rem;
    position: relative;
}
.singular .featured-media::before {
    background: #fff;
    content: "";
    display: block;
    position: absolute;
    bottom: 50%;
    left: 0;
    right: 0;
    top: 0;
}
.singular .featured-media-inner {
    position: relative;
    left: calc(50% - 50vw);
    width: 100vw;
}
.section-inner {
    margin-left: auto;
    margin-right: auto;
    max-width: 120rem;
    width: calc(100% - 4rem);
}
.featured-media img {
    margin: 0 auto;
}
.entry-content {
    line-height: 1.5;
}
.entry-content > *:first-child {
    margin-top: 0;
}
.entry-content > *:not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.is-style-wide) {
    max-width: 58rem;
    width: calc(100% - 4rem);
}
.entry-content > * {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.25em;
}
.entry-content > *:not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.is-style-wide) {
    max-width: 58rem;
    width: calc(100% - 4rem);
}
.wp-block-image.is-resized {
    margin-left: auto;
    margin-right: auto;
}
.section-inner {
    margin-left: auto;
    margin-right: auto;
    max-width: 120rem;
    width: calc(100% - 4rem);
}




@media (min-width: 1220px)
h1 {
    font-size: 8.4rem;
}

@media (min-width: 700px)
.singular .entry-header {
    padding: 8rem 0;
}
.section-inner {
    width: calc(100% - 8rem);
}
.entry-categories {
    margin-bottom: 3rem;
}
.screen-reader-text:not(#_#_#_#_#_#_#_) {
    position: absolute;
    word-wrap: normal;
}
.entry-categories-inner {
    margin: -1rem 0 0 -2rem;
}
.entry-categories a {
    font-size: 1.5rem;
    margin: 1rem 0 0 2rem;
}
h1 {
    font-size: 6.4rem;
}
.post-meta-wrapper {
    margin-top: 3rem;
}
.post-meta {
    font-size: 1.6rem;
    margin: -1.4rem 0 0 -3rem;
}
.post-meta li {
    margin: 1.4rem 0 0 3rem;
    max-width: calc(100% - 3rem);
}
.featured-media {
    margin-top: 6rem;
}
.post-inner {
    padding-top: 4rem;
}
.entry-content {
    font-size: 2.1rem;
}
.entry-content p, .entry-content li {
    line-height: 1.476;
}
.entry-content p{
    font-size:1.5rem;
}
.entry-content h1, .entry-content h2 {
    margin: 3rem auto 2rem;
}
h2 {
    font-size: 3.8rem;
}
.wp-block-image:not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.aligncenter) {
    margin-bottom: 4rem;
    margin-top: 4rem;
}
.section-inner {
    width: calc(100% - 8rem);
}
.post-meta-wrapper.post-meta-single-bottom {
    margin-top: 4rem;
}
`;
