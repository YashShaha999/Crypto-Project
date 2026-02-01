export const formatPrice = (price) => {
  if (price < 0.01) return `₹${price.toFixed(8)}`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatMarketCapINR = (marketCap) => {
  if (marketCap == null) return "N/A"; // handles null & undefined

  if (marketCap >= 1e11) return `₹${(marketCap / 1e11).toFixed(2)} Kharab`;
  if (marketCap >= 1e9) return `₹${(marketCap / 1e9).toFixed(2)} Arab`;
  if (marketCap >= 1e7) return `₹${(marketCap / 1e7).toFixed(2)} Cr`;
  if (marketCap >= 1e5) return `₹${(marketCap / 1e5).toFixed(2)} Lakh`;

  return `₹${marketCap.toLocaleString("en-IN")}`;
};
