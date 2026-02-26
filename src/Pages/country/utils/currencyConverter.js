// Conversion rates based on requirements
// 1.0 Indian Rupee equals 0.041 United Arab Emirates Dirham
// 1.0 Indian Rupee equals 0.011 US Dollar

const CONVERSION_RATES = {
  INR_TO_AED: 0.041,
  INR_TO_USD: 0.011,
};

/**
 * Convert price from INR Cr to the target currency
 * @param {number} priceInCr - Price in INR Crores
 * @param {string} targetCurrency - Target currency (INR, AED, USD)
 * @returns {object} - Formatted price with currency symbol
 */
export const convertPrice = (priceInCr, targetCurrency = "INR") => {
  if (!priceInCr || isNaN(priceInCr)) {
    return { value: 0, formatted: "0.00", symbol: "₹", suffix: "Cr" };
  }

  const priceInINR = parseFloat(priceInCr);

  switch (targetCurrency) {
    case "AED": {
      // Convert INR Cr to AED
      // 1 Cr = 10,000,000 INR
      const priceInINRUnits = priceInINR * 10000000;
      const priceInAED = priceInINRUnits * CONVERSION_RATES.INR_TO_AED;
      
      // Format in millions for AED
      const priceInAEDMillions = priceInAED / 1000000;
      
      return {
        value: priceInAED,
        formatted: priceInAEDMillions.toFixed(2),
        symbol: "AED",
        suffix: "M",
      };
    }

    case "USD": {
      // Convert INR Cr to USD
      const priceInINRUnits = priceInINR * 10000000;
      const priceInUSD = priceInINRUnits * CONVERSION_RATES.INR_TO_USD;
      
      // Format in millions for USD
      const priceInUSDMillions = priceInUSD / 1000000;
      
      return {
        value: priceInUSD,
        formatted: priceInUSDMillions.toFixed(2),
        symbol: "$",
        suffix: "M",
      };
    }

    case "INR":
    default: {
      return {
        value: priceInINR * 10000000,
        formatted: priceInINR.toFixed(2),
        symbol: "₹",
        suffix: "Cr",
      };
    }
  }
};

/**
 * Format price for display
 * @param {number} priceInCr - Price in INR Crores
 * @param {string} currency - Currency (INR, AED, USD)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (priceInCr, currency = "INR") => {
  const converted = convertPrice(priceInCr, currency);
  return `${converted.symbol} ${converted.formatted} ${converted.suffix}`;
};
