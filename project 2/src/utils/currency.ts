// Currency utility functions for Indian Rupees

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatCurrencyInput = (amount: string): string => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) return '₹0';
  return formatCurrency(numericAmount);
};

export const parseCurrency = (currencyString: string): number => {
  return parseFloat(currencyString.replace(/[₹,]/g, '')) || 0;
};

// Convert USD amounts to approximate INR (using 1 USD = 75 INR as base rate)
export const convertUSDToINR = (usdAmount: number): number => {
  return Math.round(usdAmount * 75);
};

// Indian number formatting with lakhs and crores
export const formatIndianCurrency = (amount: number): string => {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else if (amount >= 1000) { // 1 thousand
    return `₹${(amount / 1000).toFixed(1)} K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};