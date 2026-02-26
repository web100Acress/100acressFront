import React, { useState, useEffect } from 'react';
import MobileChooseCountry from './MobileChooseCountry';
import DesktopChooseCountry from './DesktopChooseCountry';
// import MobileChooseHero from './MobileChooseHero';
import DesktopChooseHero from './DesktopChooseHero';
import GlobalNavbar from '../../global/navbar/GlobalNavbar';
import GlobalFooter from '../../global/footer/GlobalFooter';

// Country data for the choose page
const COUNTRIES = {
  uk: {
    code: 'uk',
    name: 'United Kingdom',
    shortName: 'UK',
    flag: '🇬🇧',
    colors: { primary: '#1E3A8A', secondary: '#EF4444' },
    currency: 'GBP',
    currencySymbol: '£',
    phoneCode: '+44',
    domain: '100acress.co.uk',
    seo: {
      title: 'Buy Property in UK',
      description: 'Find premium properties across London, Manchester, Birmingham and more.',
      keywords: ['UK property', 'London real estate', 'buy house UK']
    }
  },
  us: {
    code: 'us',
    name: 'United States',
    shortName: 'USA',
    flag: '🇺🇸',
    colors: { primary: '#1E3A8A', secondary: '#DC2626' },
    currency: 'USD',
    currencySymbol: '$',
    phoneCode: '+1',
    domain: '100acress.com',
    seo: {
      title: 'Buy Property in USA',
      description: 'Discover luxury homes in New York, Los Angeles, Miami and more.',
      keywords: ['USA property', 'American real estate', 'buy house USA']
    }
  },
  ae: {
    code: 'ae',
    name: 'United Arab Emirates',
    shortName: 'UAE',
    flag: '🇦🇪',
    colors: { primary: '#059669', secondary: '#F59E0B' },
    currency: 'AED',
    currencySymbol: 'AED',
    phoneCode: '+971',
    domain: '100acress.ae',
    seo: {
      title: 'Buy Property in Dubai & UAE',
      description: 'Explore luxury apartments and villas in Dubai, Abu Dhabi and more.',
      keywords: ['Dubai property', 'UAE real estate', 'buy villa Dubai']
    }
  },
  sg: {
    code: 'sg',
    name: 'Singapore',
    shortName: 'Singapore',
    flag: '🇸🇬',
    colors: { primary: '#DC2626', secondary: '#FFFFFF' },
    currency: 'SGD',
    currencySymbol: 'S$',
    phoneCode: '+65',
    domain: '100acress.sg',
    seo: {
      title: 'Buy Property in Singapore',
      description: 'Find premium properties in Marina Bay, Orchard Road and more.',
      keywords: ['Singapore property', 'Marina Bay real estate', 'buy condo Singapore']
    }
  },
  in: {
    code: 'in',
    name: 'India',
    shortName: 'India',
    flag: '🇮🇳',
    colors: { primary: '#FF9933', secondary: '#138808' },
    currency: 'INR',
    currencySymbol: '₹',
    phoneCode: '+91',
    domain: '100acress.in',
    seo: {
      title: 'Buy Property in India',
      description: 'Discover properties in Delhi NCR, Mumbai, Bangalore and more.',
      keywords: ['India property', 'Delhi real estate', 'buy flat India']
    }
  },
  au: {
    code: 'au',
    name: 'Australia',
    shortName: 'Australia',
    flag: '🇦🇺',
    colors: { primary: '#1E3A8A', secondary: '#DC2626' },
    currency: 'AUD',
    currencySymbol: 'A$',
    phoneCode: '+61',
    domain: '100acress.au',
    seo: {
      title: 'Buy Property in Australia',
      description: 'Find properties in Sydney, Melbourne, Brisbane and more.',
      keywords: ['Australia property', 'Sydney real estate', 'buy house Australia']
    }
  },
  ca: {
    code: 'ca',
    name: 'Canada',
    shortName: 'Canada',
    flag: '🇨🇦',
    colors: { primary: '#DC2626', secondary: '#FFFFFF' },
    currency: 'CAD',
    currencySymbol: 'C$',
    phoneCode: '+1',
    domain: '100acress.ca',
    seo: {
      title: 'Buy Property in Canada',
      description: 'Explore properties in Toronto, Vancouver, Montreal and more.',
      keywords: ['Canada property', 'Toronto real estate', 'buy house Canada']
    }
  },
  de: {
    code: 'de',
    name: 'Germany',
    shortName: 'Germany',
    flag: '🇩🇪',
    colors: { primary: '#1F2937', secondary: '#DC2626' },
    currency: 'EUR',
    currencySymbol: '€',
    phoneCode: '+49',
    domain: '100acress.de',
    seo: {
      title: 'Buy Property in Germany',
      description: 'Find properties in Berlin, Munich, Frankfurt and more.',
      keywords: ['Germany property', 'Berlin real estate', 'buy apartment Germany']
    }
  }
};

const ChooseCountry = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Default');
  const [showSort, setShowSort] = useState(false);

  const countries = Object.values(COUNTRIES);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getFilteredCountries = () => {
    let list = [...countries];
    
    // Filter by search
    if (search) {
      list = list.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.shortName.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Sort
    if (sortBy === 'Name A–Z') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'Most Listings') {
      // Mock sorting for demo
      list.sort(() => Math.random() - 0.5);
    } else if (sortBy === 'Highest Growth') {
      // Mock sorting for demo
      list.sort(() => Math.random() - 0.5);
    } else if (sortBy === 'Highest ROI') {
      // Mock sorting for demo
      list.sort(() => Math.random() - 0.5);
    } else if (sortBy === 'Most Popular') {
      // Mock sorting for demo
      list.sort(() => Math.random() - 0.5);
    }
    
    return list;
  };
  
  const filteredCountries = getFilteredCountries();

  // if (isMobile) {
  //   return (
  //     <>
  //       <GlobalNavbar />
  //       <MobileChooseHero
  //         countries={countries}
  //         search={search}
  //         setSearch={setSearch}
  //         sortBy={sortBy}
  //         setSortBy={setSortBy}
  //         showSort={showSort}
  //         setShowSort={setShowSort}
  //         filteredCount={filteredCountries.length}
  //       />
  //       <MobileChooseCountry
  //         countries={filteredCountries}
  //         search={search}
  //         setSearch={setSearch}
  //         sortBy={sortBy}
  //         setSortBy={setSortBy}
  //         showSort={showSort}
  //         setShowSort={setShowSort}
  //         filteredCount={filteredCountries.length}
  //       />
  //       <GlobalFooter />
  //     </>
  //   );
  // }

  return (
    <>
      <GlobalNavbar />
      <DesktopChooseHero
        countries={countries}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showSort={showSort}
        setShowSort={setShowSort}
        filteredCount={filteredCountries.length}
      />
      <DesktopChooseCountry
        countries={filteredCountries}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showSort={showSort}
        setShowSort={setShowSort}
        filteredCount={filteredCountries.length}
      />
      <GlobalFooter />
    </>
  );
};

export default ChooseCountry;
