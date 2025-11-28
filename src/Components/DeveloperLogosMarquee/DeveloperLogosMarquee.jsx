import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./DeveloperLogosMarquee.css";

const LogoCard = ({ title, image, link }) => {
  return (
    <Link
      to={link}
      className="logo-card"
      title={title}
    >
      <img
        src={image}
        alt={`${title} logo`}
        onError={(e) => {
          if (image && image.startsWith("http://")) {
            e.target.src = image.replace("http://", "https://");
            e.target.onerror = null;
          } else {
            e.target.src = "https://via.placeholder.com/100x60?text=Logo";
          }
        }}
      />
    </Link>
  );
};

const Builder = [
  {
    title: "Godrej Properties",
    link: "/developers/godrej-properties/",
    image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/godrej.jpg",
  },
  {
    title: "DLF Homes",
    link: "/developers/dlf-homes/",
    image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/dlf.png",
  },
  {
    title: "Emaar India",
    link: "/developers/emaar-india/",
    image:
      "https://cdn.in.emaar.com/wp-content/themes/emaar/inc/assets/images/emaar-india-logo-en.svg",
  },
  {
    title: "Birla Estates",
    link: "/developers/birla-estate/",
    image: "https://www.birlaestates.com/images/birla-estate-logo.webp",
  },
  {
    title: "Adani Realty",
    link: "/developers/adani-realty/",
    image:
      "https://www.adanirealty.com/-/media/project/realty/header/logo.ashx",
  },
  {
    title: "Experion",
    link: "/developers/experion-developers/",
    image: "https://www.experion.co/img/logo/experion-logo.png",
  },
  {
    title: "Signature Global",
    link: "/developers/signature-global/",
    image:
      "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/signature.webp",
  },
  {
    title: "sobha",
    link: "/developers/sobha-developers/",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/sobha.webp",
  },
  {
    title: "Central Park",
    link: "/developers/central-park/",
    image:
      "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/centralpark.jpg",
  },
  {
    title: "Trump Towers",
    link: "/developers/trump-towers/",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/Trump-Tower.webp",
  },
  {
    title: "ELAN Group",
    link: "/developers/elan-group/",
    image:
      "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/elan-logo.webp",
  },
  {
    title: "Puri Constructions",
    link: "/developers/puri-developers/",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/puri+(1).webp",
  },
  {
    title: "M3M India",
    link: "/developers/m3m-india/",
    image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/m3m.webp",
  },
  {
    title: "SmartWorld Developers",
    link: "/developers/smartworld-developers/",
    image:
      "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/smartworld.webp",
  },
  {
    title: "BPTP Limited",
    link: "/developers/bptp-limited/",
    image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/bptp.webp",
  },
  {
    title: "Whiteland Corporation",
    link: "/developers/whiteland/",
    image:
      "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/whiteland.jpg",
  },
  {
    title: "Indiabulls Real Estate",
    link: "/developers/indiabulls-real-estate/",
    image:
      "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/indiabulls.webp",
  },
  {
    title: "AIPL",
    link: "/developers/aipl/",
    image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/aipl.png",
  },
  {
    title: "Shapoorji Pallonji",
    link: "/developers/shapoorji-pallonji/",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/f53cad64-481a-44b6-9c08-e100f5a9a81f.webp",
  },
  {
    title: "Satya Group",
    link: "/developers/satya-group/",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/fea4304a-c768-40cc-857e-45b68c84b2a5.webp",
  },
  {
    title: "Trevoc Group",
    link: "/developers/trevoc-group/",
    image:
      "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/trevoc.webp",
  },
  {
    title: "Aarize",
    link: "/developers/aarize-developers/",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/tmfm0mywshnqqnmz7j9x",
  },
  {
    title: "Maxestates",
    link: "/developers/max-estates/",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/maxestate.webp",
  },
  {
    title: "Danube Properties",
    link: "/developers/danube-properties/",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/DANUBE.png",
  },
];

// 4 rows, 6 developers each
const row1Developers = Builder.slice(0, 6);
const row2Developers = Builder.slice(6, 12);
const row3Developers = Builder.slice(12, 18);
const row4Developers = Builder.slice(18, 24);

const MarqueeRow = ({ developers, direction = "left" }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let lastTimestamp = 0;
    const speed = direction === "right" ? 0.04 : -0.04; // px per ms

    // We render 3 copies of the row; this is width of one copy
    const singleWidth = track.scrollWidth / 3;

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      offset += speed * delta;

      if (speed < 0 && offset <= -singleWidth) {
        offset += singleWidth;
      } else if (speed > 0 && offset >= 0) {
        offset -= singleWidth;
      }

      track.style.transform = `translateX(${offset}px)`;
      rafId = requestAnimationFrame(step);
    };

    let rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [direction, developers.length]);

  return (
    <div className="marquee-row">
      <div ref={trackRef} className="marquee-track">
        {/* first set */}
        {developers.map((dev, index) => (
          <LogoCard
            key={`first-${index}`}
            title={dev.title}
            image={dev.image}
            link={dev.link}
          />
        ))}
        {/* second set */}
        {developers.map((dev, index) => (
          <LogoCard
            key={`second-${index}`}
            title={dev.title}
            image={dev.image}
            link={dev.link}
          />
        ))}
        {/* third set for no visual gap */}
        {developers.map((dev, index) => (
          <LogoCard
            key={`third-${index}`}
            title={dev.title}
            image={dev.image}
            link={dev.link}
          />
        ))}
      </div>
    </div>
  );
};

const DeveloperLogosMarquee = () => {
  return (
    <div className="marquee-wrapper">
      <MarqueeRow developers={row1Developers} direction="left" />
      <MarqueeRow developers={row2Developers} direction="right" />
      <MarqueeRow developers={row3Developers} direction="left" />
      <MarqueeRow developers={row4Developers} direction="right" />
      <div className="marquee-footer-text">
        And 500+ more developers across India
      </div>
    </div>
  );
};

export default DeveloperLogosMarquee;
