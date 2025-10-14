import React, { useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  ForSaleIcon,
  GirlSearchingIcon,
  ResidentialProjectIcon,
  CommercialProjectIcon,
  ScoPlotsIcon,
  PlotnFloorIcon,
  MonthlyVisitIcon,
  AwardsIcon,
  RealestateIcon,
  LegalIcon,
  InteriorIcon,
  HomeloanIcon,
} from "../Assets/icons";

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endValue =
      typeof end === "string" ? parseInt(end.replace(/[^0-9]/g, "")) : end;
    const isString = typeof end === "string";

    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentCount = Math.floor(progress * endValue);

      if (isString) {
        const formattedCount =
          currentCount.toLocaleString() + end.replace(/[0-9]/g, "");
        setCount(formattedCount);
      } else {
        setCount(currentCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const timer = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(timer);
  }, [end, duration, suffix]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const AboutModern = () => {
  const stats = [
    {
      number: "1600+",
      label: "Residential Projects",
      icon: ResidentialProjectIcon,
    },
    {
      number: "900+",
      label: "Commercial Projects",
      icon: CommercialProjectIcon,
    },
    { number: "400+", label: "Plots & Floors", icon: PlotnFloorIcon },
    { number: "90+", label: "SCO Plots", icon: ScoPlotsIcon },
    { number: "3M+", label: "Monthly Visitors", icon: MonthlyVisitIcon },
    { number: "1000+", label: "Awards", icon: AwardsIcon },
  ];

  const principles = [
    {
      title: "No Problem is Too Hard",
      description:
        "We tackle every real estate challenge with determination and innovative solutions.",
    },
    {
      title: "People First",
      description:
        "Our clients' dreams and aspirations are at the heart of everything we do.",
    },
    {
      title: "Transparency Always",
      description:
        "Complete honesty in every transaction, with no hidden costs or surprises.",
    },
    {
      title: "Local Expertise",
      description:
        "Deep knowledge of Gurgaon and Delhi NCR markets for informed decisions.",
    },
    {
      title: "Long-term Relationships",
      description:
        "We build lasting partnerships, not just one-time transactions.",
    },
    {
      title: "Continuous Improvement",
      description: "Always learning and evolving to serve our clients better.",
    },
  ];

  const services = [
    {
      title: "Real Estate Consulting",
      description:
        "We provide the best services to help you get your dream home as per your expectations.",
      icon: RealestateIcon,
    },
    {
      title: "Legal Advice",
      description:
        "The major issue is trustworthy legal assistance. We will help you through all the aspects.",
      icon: LegalIcon,
    },
    {
      title: "Interior Design",
      description:
        "We provide the best services to help you get your dream home as per your expectations.",
      icon: InteriorIcon,
    },
    {
      title: "Home Loan",
      description:
        "We will help you to provide the best home loan to complete your dream and guide.",
      icon: HomeloanIcon,
    },
  ];

  const teamMembers = [
    {
      name: "Rajesh Agrawal",
      role: "Director & Founder",
      description: "Visionary leader with 20+ years in real estate",
    },
    {
      name: "Priya Sharma",
      role: "Head of Sales",
      description: "Expert in luxury residential properties",
    },
    {
      name: "Amit Kumar",
      role: "Commercial Specialist",
      description: "Leading commercial real estate expert",
    },
    {
      name: "Neha Gupta",
      role: "Legal Advisor",
      description: "Ensuring smooth and legal transactions",
    },
    {
      name: "Rohit Singh",
      role: "Customer Relations",
      description: "Dedicated to exceptional client service",
    },
    {
      name: "Sneha Patel",
      role: "Marketing Director",
      description: "Connecting clients with their dream properties",
    },
  ];

  const partners = [
    {
      name: "Godrej Properties",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/godrej.jpg",
      link: "/developers/godrej-properties/",
    },
    {
      name: "DLF Homes",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/dlf.png",
      link: "/developers/dlf-homes/",
    },
    {
      name: "Emaar India",
      logo: "https://cdn.in.emaar.com/wp-content/themes/emaar/inc/assets/images/emaar-india-logo-en.svg",
      link: "/developers/emaar-india/",
    },
    {
      name: "Birla Estates",
      logo: "https://www.birlaestates.com/images/birla-estate-logo.webp",
      link: "/developers/birla-estate/",
    },
    {
      name: "Adani Realty",
      logo: "https://www.adanirealty.com/-/media/project/realty/header/logo.ashx",
      link: "/developers/adani-realty/",
    },
    {
      name: "Experion",
      logo: "https://www.experion.co/img/logo/experion-logo.png",
      link: "/developers/experion-developers/",
    },
    {
      name: "Signature Global",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/signature.webp",
      link: "/developers/signature-global/",
    },
    {
      name: "Sobha",
      logo: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/sobha.webp",
      link: "/developers/sobha-developers/",
    },
    {
      name: "Central Park",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/centralpark.jpg",
      link: "/developers/central-park/",
    },
    {
      name: "Trump Towers",
      logo: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/Trump-Tower.webp",
      link: "/developers/trump-towers/",
    },
    {
      name: "ELAN Group",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/elan-logo.webp",
      link: "/developers/elan-group/",
    },
    {
      name: "Puri Constructions",
      logo: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/puri+(1).webp",
      link: "/developers/puri-developers/",
    },
    {
      name: "M3M India",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/m3m.webp",
      link: "/developers/m3m-india/",
    },
    {
      name: "SmartWorld Developers",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/smartworld.webp",
      link: "/developers/smartworld-developers/",
    },
    {
      name: "BPTP Limited",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/bptp.webp",
      link: "/developers/bptp-limited/",
    },
    {
      name: "Whiteland Corporation",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/whiteland.jpg",
      link: "/developers/whiteland/",
    },
    {
      name: "Indiabulls Real Estate",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/indiabulls.webp",
      link: "/developers/indiabulls-real-estate/",
    },
    {
      name: "AIPL",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/aipl.png",
      link: "/developers/aipl/",
    },
    {
      name: "Trevoc Group",
      logo: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/trevoc.webp",
      link: "/developers/trevoc-group/",
    },
    {
      name: "Aarize",
      logo: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/tmfm0mywshnqqnmz7j9x",
      link: "/developers/aarize-developers/",
    },
  ];

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Discover the story behind 100acress.com, a trusted real estate company in Gurgaon. Learn about our values and commitment to excellence in property services."
        />
        <title>About Us | Real Estate Company in Gurgaon - 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/about-us/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern cityscape and real estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Main Headline */}
          <div className="mb-32 sm:mb-12 mt-16 sm:mt-40">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 text-white leading-tight">
              Trusted Real Estate Experts
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-primaryRed leading-tight">
              Since 2000
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-16 max-w-4xl mx-auto leading-relaxed text-gray-100 font-normal px-4">
            Since 2000, we've been helping people find their dream homes,
            offices, and the right investments in property across Gurgaon and
            Delhi NCR.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 lg:p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 sm:mb-2 min-h-[2rem] sm:min-h-[2.5rem] lg:min-h-[3rem] flex items-center justify-center">
                  <CountUp end={stat.number} duration={2000} />
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-200 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Turning property search into a personal experience
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At 100acress.com, we treat every customer's investment with the
                same care as our own. Honesty, trust, and transparency are at
                the heart of everything we do. Instead of just showing you what
                is available, we guide you towards the right options that truly
                fit your needs and budget.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                What makes us different is our focus on long-term relationships,
                not just one-time deals. We believe buying a home or property is
                a life-changing decision, so we provide complete details,
                multiple choices, and genuine advice.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <GirlSearchingIcon className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our operating principles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and ensure exceptional
              service for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {principle.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who make your real estate dreams come true.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primaryRed to-red-600 flex items-center justify-center text-white text-4xl font-bold group-hover:scale-105 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primaryRed font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Trusted By Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top Real Estate Developers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with the most respected developers and builders in Gurgaon
              and Delhi NCR.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {partners.map((partner, index) => (
              <Link
                key={index}
                to={partner.link}
                className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group hover:scale-105 min-h-[80px] sm:min-h-[100px]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 sm:h-10 lg:h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 max-w-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "block";
                  }}
                />
                <span className="text-xs sm:text-sm font-semibold text-gray-700 hidden">
                  {partner.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primaryRed/10 rounded-full flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-primaryRed" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section - Updated */}
      {/* <section className="py-20 bg-gradient-to-r from-primaryRed to-red-600">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight">
                    GET IN
                  </h2>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white/80 leading-tight">
                    TOUCH
                  </h2>
                </div>
                <div className="relative inline-block">
                  <div className="w-20 h-20 md:w-24 md:h-24 transform rotate-45 border-4 border-white border-r-0 border-b-0"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white transform rotate-45"></div>
                </div>
              </div>
            </div>

            
            <div className="flex-1 max-w-md">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-elegant">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      Get Instant Callback
                    </h3>
                    <p className="text-white/80">
                      Get expert advice on your property investment
                    </p>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm h-12 text-lg px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm h-12 text-lg px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button className="w-full bg-white text-primaryRed font-semibold h-12 text-lg rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]">
                      Contact
                    </button>
                  </div>

                  <p className="text-sm text-white/70 text-center">
                    Get expert advice on your property investment. Our team will
                    contact you within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </>
  );
};

export default AboutModern;
