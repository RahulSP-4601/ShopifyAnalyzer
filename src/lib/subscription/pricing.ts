export const PRICING = {
  BASE_PRICE: 19.99,
  ADDITIONAL_PRICE: 4.99,
};

/**
 * Calculate monthly subscription price based on marketplace count
 */
export function calculateMonthlyPrice(marketplaceCount: number): number {
  if (marketplaceCount <= 0) return 0;
  if (marketplaceCount === 1) return PRICING.BASE_PRICE;
  return (
    PRICING.BASE_PRICE + (marketplaceCount - 1) * PRICING.ADDITIONAL_PRICE
  );
}

/**
 * Get price breakdown for display
 */
export function getPriceBreakdown(marketplaceCount: number): {
  basePrice: number;
  additionalCount: number;
  additionalPrice: number;
  totalPrice: number;
} {
  // Handle zero marketplace count consistently - no base price when no marketplaces
  if (marketplaceCount <= 0) {
    return {
      basePrice: 0,
      additionalCount: 0,
      additionalPrice: 0,
      totalPrice: 0,
    };
  }

  const additionalCount = marketplaceCount - 1;
  return {
    basePrice: PRICING.BASE_PRICE,
    additionalCount,
    additionalPrice: additionalCount * PRICING.ADDITIONAL_PRICE,
    totalPrice: calculateMonthlyPrice(marketplaceCount),
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
