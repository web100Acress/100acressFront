import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import GlobalNavbar from '@/country/modules/global/navbar/GlobalNavbar';
import GlobalFooter from '@/country/modules/global/footer/GlobalFooter';
import MobileChooseCountry from '@/country/modules/pages/choose/MobileChooseCountry';
import DesktopChooseCountry from '@/country/modules/pages/choose/DesktopChooseCountry';

interface CountryData {
  code: string;
  name: string;
  shortName: string;
  flag: string;
  colors: { primary: string; secondary: string };
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  domain: string;
  seo: { title: string; description: string; keywords: string[] };
}

interface ChooseCountryPageProps {
  countries: CountryData[];
}

const ChooseCountryPage: NextPage<ChooseCountryPageProps> = ({ countries }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Head>
        <title>Choose Your Country | 100acress Global — International Real Estate</title>
        <meta name="description" content="Select your country to explore premium real estate across UK, USA, Dubai, Sri Lanka and 50+ markets." />
        <meta property="og:title" content="Choose Your Country | 100acress Global" />
        <meta property="og:description" content="Explore premium real estate properties across 50+ countries with 100acress." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://100acress.com/choose-country" />
        <link rel="canonical" href="https://100acress.com/choose-country" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Choose Your Country - 100acress Global',
              description: 'Select your country to explore premium real estate properties.',
              url: 'https://100acress.com/choose-country',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: countries.map((c, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  item: { '@type': 'Country', name: c.name, description: c.seo.description },
                })),
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-[#080C14]">
        <GlobalNavbar />
        
        {isMobile ? (
          <MobileChooseCountry countries={countries} />
        ) : (
          <DesktopChooseCountry countries={countries} />
        )}
        
        <GlobalFooter />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<ChooseCountryPageProps> = async () => {
  const { COUNTRIES } = await import('@/country/config/countries');

  const countries: CountryData[] = Object.values(COUNTRIES).map(country => ({
    code: country.code,
    name: country.name,
    shortName: country.shortName,
    flag: country.flag,
    colors: country.colors,
    currency: country.currency,
    currencySymbol: country.currencySymbol,
    phoneCode: country.phoneCode,
    domain: country.domain,
    seo: country.seo,
  }));

  return { props: { countries }, revalidate: 3600 };
};

export default ChooseCountryPage;