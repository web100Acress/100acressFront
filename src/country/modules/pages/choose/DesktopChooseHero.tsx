import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Home, TrendingUp, Calculator, ChevronDown } from 'lucide-react';

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

interface DesktopChooseHeroProps {
  countries: CountryData[];
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showSort: boolean;
  setShowSort: (value: boolean) => void;
  filteredCount: number;
}

const TABS = [
  { id: 'buy', label: 'Buy', icon: Home },
  { id: 'rent', label: 'Rent', icon: Search },
  { id: 'prices', label: 'House prices', icon: TrendingUp },
  { id: 'valuation', label: 'Instant valuation', icon: Calculator },
];

const SORT_OPTIONS = ['Default', 'Name A–Z', 'Most Listings', 'Highest Growth', 'Highest ROI', 'Most Popular'];

const DesktopChooseHero: React.FC<DesktopChooseHeroProps> = ({
  countries,
  search,
  setSearch,
  sortBy,
  setSortBy,
  showSort,
  setShowSort,
  filteredCount
}) => {
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <Fragment>
      {/* Background Image Hero Section */}
      <section className="relative h-[520px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/aaaa/c17cffe9-a330-4e52-895c-e86c011679d8.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      </section>
    </Fragment>
  );
};

export default DesktopChooseHero;
