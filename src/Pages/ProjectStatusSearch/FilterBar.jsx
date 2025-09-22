import React from 'react';
import { gradients } from './DesignTokens';

export default function FilterBar({ 
  view, 
  setView, 
  sort, 
  setSort, 
  mapView, 
  setMapView,
  filters = {},
  onFilterChange,
  onSearch
}) {
  const sorts = [
    { key: 'price', label: 'Price' },
    { key: 'newest', label: 'Newest' },
  ];

  const filterOptions = {
    city: [
      { value: '', label: 'All Cities' },
      { value: 'Gurugram', label: 'Gurugram' },
      { value: 'Noida', label: 'Noida' },
      { value: 'Delhi', label: 'Delhi' },
      { value: 'Goa', label: 'Goa' },
      { value: 'Ayodhya', label: 'Ayodhya' },
      { value: 'Mumbai', label: 'Mumbai' },
      { value: 'Panchkula', label: 'Panchkula' },
      { value: 'Kasauli', label: 'Kasauli' },
      { value: 'Dubai', label: 'Dubai' },
    ],
    projectType: [
      { value: '', label: 'All Types' },
      { value: 'Commercial Property', label: 'Commercial Property' },
      { value: 'Residential Flats', label: 'Residential Flats' },
      { value: 'SCO Plots', label: 'SCO Plots' },
      { value: 'Deen Dayal Plots', label: 'Deen Dayal Plots' },
      { value: 'Residential Plots', label: 'Residential Plots' },
      { value: 'Independent Floors', label: 'Independent Floors' },
      { value: 'Builder Floors', label: 'Builder Floors' },
      { value: 'Affordable Homes', label: 'Affordable Homes' },
      { value: 'Villas', label: 'Villas' },
      { value: 'Farm Houses', label: 'Farm House' },
    ],
    price: [
      { value: '', label: 'All Prices' },
      { value: '0,1', label: 'Under 1 Cr' },
      { value: '1,5', label: '1 to 5 Cr' },
      { value: '5,10', label: '5 to 10 Cr' },
      { value: '10,20', label: '10 to 20 Cr' },
      { value: '20,50', label: '20 to 50 Cr' },
      { value: '50,Infinity', label: 'Above 50 Cr' },
    ]
  };


  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl transition-all duration-300 ease-in-out rounded-full mx-2 sm:mx-6 md:mx-12 my-1">
      <div className="w-full px-2 sm:px-4 py-1.5 sm:py-2">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {/* Sort Buttons */}
          <div className="flex items-center gap-1">
            {sorts.map(s => (
              <button
                key={s.key}
                onClick={() => setSort?.(s.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border border-white/30 transition-all duration-300 ease-in-out flex items-center gap-1 backdrop-blur-sm ${
                  sort === s.key 
                    ? 'bg-red-500/80 text-white shadow-lg transform scale-105' 
                    : 'bg-white/20 text-gray-800 hover:bg-white/30 hover:scale-105'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-1">
            <div className="relative">
              <select
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 pr-6 text-xs font-medium text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ease-in-out min-w-[90px] hover:scale-105"
                value={filters.city || ''}
                onChange={(e) => onFilterChange?.('city', e.target.value)}
              >
                {filterOptions.city.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 pr-6 text-xs font-medium text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ease-in-out min-w-[90px] hover:scale-105"
                value={filters.location || ''}
                onChange={(e) => onFilterChange?.('location', e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Sector 62">Sector 62</option>
                <option value="Sector 63">Sector 63</option>
                <option value="Sector 65">Sector 65</option>
                <option value="Sector 67">Sector 67</option>
                <option value="Sector 70">Sector 70</option>
                <option value="Sector 72">Sector 72</option>
                <option value="Sector 75">Sector 75</option>
                <option value="Sector 76">Sector 76</option>
                <option value="Sector 77">Sector 77</option>
                <option value="Sector 78">Sector 78</option>
                <option value="Sector 79">Sector 79</option>
                <option value="Sector 80">Sector 80</option>
                <option value="Sector 81">Sector 81</option>
                <option value="Sector 82">Sector 82</option>
                <option value="Sector 83">Sector 83</option>
                <option value="Sector 84">Sector 84</option>
                <option value="Sector 85">Sector 85</option>
                <option value="Sector 86">Sector 86</option>
                <option value="Sector 87">Sector 87</option>
                <option value="Sector 88">Sector 88</option>
                <option value="Sector 89">Sector 89</option>
                <option value="Sector 90">Sector 90</option>
                <option value="Sector 91">Sector 91</option>
                <option value="Sector 92">Sector 92</option>
                <option value="Sector 93">Sector 93</option>
                <option value="Sector 94">Sector 94</option>
                <option value="Sector 95">Sector 95</option>
                <option value="Sector 96">Sector 96</option>
                <option value="Sector 97">Sector 97</option>
                <option value="Sector 98">Sector 98</option>
                <option value="Sector 99">Sector 99</option>
                <option value="Sector 100">Sector 100</option>
                <option value="Sector 101">Sector 101</option>
                <option value="Sector 102">Sector 102</option>
                <option value="Sector 103">Sector 103</option>
                <option value="Sector 104">Sector 104</option>
                <option value="Sector 105">Sector 105</option>
                <option value="Sector 106">Sector 106</option>
                <option value="Sector 107">Sector 107</option>
                <option value="Sector 108">Sector 108</option>
                <option value="Sector 109">Sector 109</option>
                <option value="Sector 110">Sector 110</option>
                <option value="Sector 111">Sector 111</option>
                <option value="Sector 112">Sector 112</option>
                <option value="Sector 113">Sector 113</option>
                <option value="Sector 114">Sector 114</option>
                <option value="Sector 115">Sector 115</option>
                <option value="Sector 116">Sector 116</option>
                <option value="Sector 117">Sector 117</option>
                <option value="Sector 118">Sector 118</option>
                <option value="Sector 119">Sector 119</option>
                <option value="Sector 120">Sector 120</option>
                <option value="Sector 121">Sector 121</option>
                <option value="Sector 122">Sector 122</option>
                <option value="Sector 123">Sector 123</option>
                <option value="Sector 124">Sector 124</option>
                <option value="Sector 125">Sector 125</option>
                <option value="Sector 126">Sector 126</option>
                <option value="Sector 127">Sector 127</option>
                <option value="Sector 128">Sector 128</option>
                <option value="Sector 129">Sector 129</option>
                <option value="Sector 130">Sector 130</option>
                <option value="Sector 131">Sector 131</option>
                <option value="Sector 132">Sector 132</option>
                <option value="Sector 133">Sector 133</option>
                <option value="Sector 134">Sector 134</option>
                <option value="Sector 135">Sector 135</option>
                <option value="Sector 136">Sector 136</option>
                <option value="Sector 137">Sector 137</option>
                <option value="Sector 138">Sector 138</option>
                <option value="Sector 139">Sector 139</option>
                <option value="Sector 140">Sector 140</option>
                <option value="Sector 141">Sector 141</option>
                <option value="Sector 142">Sector 142</option>
                <option value="Sector 143">Sector 143</option>
                <option value="Sector 144">Sector 144</option>
                <option value="Sector 145">Sector 145</option>
                <option value="Sector 146">Sector 146</option>
                <option value="Sector 147">Sector 147</option>
                <option value="Sector 148">Sector 148</option>
                <option value="Sector 149">Sector 149</option>
                <option value="Sector 150">Sector 150</option>
                <option value="Sector 151">Sector 151</option>
                <option value="Sector 152">Sector 152</option>
                <option value="Sector 153">Sector 153</option>
                <option value="Sector 154">Sector 154</option>
                <option value="Sector 155">Sector 155</option>
                <option value="Sector 156">Sector 156</option>
                <option value="Sector 157">Sector 157</option>
                <option value="Sector 158">Sector 158</option>
                <option value="Sector 159">Sector 159</option>
                <option value="Sector 160">Sector 160</option>
                <option value="Sector 161">Sector 161</option>
                <option value="Sector 162">Sector 162</option>
                <option value="Sector 163">Sector 163</option>
                <option value="Sector 164">Sector 164</option>
                <option value="Sector 165">Sector 165</option>
                <option value="Sector 166">Sector 166</option>
                <option value="Sector 167">Sector 167</option>
                <option value="Sector 168">Sector 168</option>
                <option value="Sector 169">Sector 169</option>
                <option value="Sector 170">Sector 170</option>
                <option value="Sector 171">Sector 171</option>
                <option value="Sector 172">Sector 172</option>
                <option value="Sector 173">Sector 173</option>
                <option value="Sector 174">Sector 174</option>
                <option value="Sector 175">Sector 175</option>
                <option value="Sector 176">Sector 176</option>
                <option value="Sector 177">Sector 177</option>
                <option value="Sector 178">Sector 178</option>
                <option value="Sector 179">Sector 179</option>
                <option value="Sector 180">Sector 180</option>
                <option value="Sector 181">Sector 181</option>
                <option value="Sector 182">Sector 182</option>
                <option value="Sector 183">Sector 183</option>
                <option value="Sector 184">Sector 184</option>
                <option value="Sector 185">Sector 185</option>
                <option value="Sector 186">Sector 186</option>
                <option value="Sector 187">Sector 187</option>
                <option value="Sector 188">Sector 188</option>
                <option value="Sector 189">Sector 189</option>
                <option value="Sector 190">Sector 190</option>
                <option value="Sector 191">Sector 191</option>
                <option value="Sector 192">Sector 192</option>
                <option value="Sector 193">Sector 193</option>
                <option value="Sector 194">Sector 194</option>
                <option value="Sector 195">Sector 195</option>
                <option value="Sector 196">Sector 196</option>
                <option value="Sector 197">Sector 197</option>
                <option value="Sector 198">Sector 198</option>
                <option value="Sector 199">Sector 199</option>
                <option value="Sector 200">Sector 200</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 pr-6 text-xs font-medium text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ease-in-out min-w-[90px] hover:scale-105"
                value={filters.projectType || ''}
                onChange={(e) => onFilterChange?.('projectType', e.target.value)}
              >
                {filterOptions.projectType.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 pr-6 text-xs font-medium text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ease-in-out min-w-[90px] hover:scale-105"
                value={filters.price || ''}
                onChange={(e) => onFilterChange?.('price', e.target.value)}
              >
                {filterOptions.price.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1">
            <button 
              title="Grid view" 
              onClick={() => setView?.('grid')} 
              className={`px-3 py-1.5 rounded-xl border border-white/30 transition-all duration-300 ease-in-out flex items-center gap-1 backdrop-blur-sm text-xs ${
                view === 'grid' 
                  ? 'bg-red-500/80 text-white shadow-lg transform scale-105' 
                  : 'bg-white/20 text-gray-800 hover:bg-white/30 hover:scale-105'
              }`}
            >
              Grid
            </button>
            <button 
              title="List view" 
              onClick={() => setView?.('list')} 
              className={`px-3 py-1.5 rounded-xl border border-white/30 transition-all duration-300 ease-in-out flex items-center gap-1 backdrop-blur-sm text-xs ${
                view === 'list' 
                  ? 'bg-red-500/80 text-white shadow-lg transform scale-105' 
                  : 'bg-white/20 text-gray-800 hover:bg-white/30 hover:scale-105'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}