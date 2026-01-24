import { MarketplaceType } from "@prisma/client";

export interface MarketplaceConfig {
  id: MarketplaceType;
  name: string;
  color: string;
  description: string;
  hasOAuth: boolean;
  logo: string;
}

export const MARKETPLACES: MarketplaceConfig[] = [
  {
    id: "SHOPIFY",
    name: "Shopify",
    color: "#95BF47",
    description: "Connect your Shopify store",
    hasOAuth: true,
    logo: "shopify",
  },
  {
    id: "AMAZON",
    name: "Amazon",
    color: "#FF9900",
    description: "Connect your Amazon seller account",
    hasOAuth: false,
    logo: "amazon",
  },
  {
    id: "EBAY",
    name: "eBay",
    color: "#0064D2",
    description: "Connect your eBay seller account",
    hasOAuth: false,
    logo: "ebay",
  },
  {
    id: "FLIPKART",
    name: "Flipkart",
    color: "#2874F0",
    description: "Connect your Flipkart seller account",
    hasOAuth: false,
    logo: "flipkart",
  },
  {
    id: "AMAZON_INDIA",
    name: "Amazon India",
    color: "#FF9900",
    description: "Connect your Amazon.in seller account",
    hasOAuth: false,
    logo: "amazon-india",
  },
  {
    id: "MEESHO",
    name: "Meesho",
    color: "#F43397",
    description: "Connect your Meesho supplier account",
    hasOAuth: false,
    logo: "meesho",
  },
  {
    id: "MYNTRA",
    name: "Myntra",
    color: "#FF3F6C",
    description: "Connect your Myntra partner account",
    hasOAuth: false,
    logo: "myntra",
  },
  {
    id: "NYKAA",
    name: "Nykaa",
    color: "#FC2779",
    description: "Connect your Nykaa seller account",
    hasOAuth: false,
    logo: "nykaa",
  },
  {
    id: "SNAPDEAL",
    name: "Snapdeal",
    color: "#E40046",
    description: "Connect your Snapdeal seller account",
    hasOAuth: false,
    logo: "snapdeal",
  },
  {
    id: "TIKTOK_SHOP",
    name: "TikTok Shop",
    color: "#000000",
    description: "Connect your TikTok Shop",
    hasOAuth: false,
    logo: "tiktok",
  },
];

export function getMarketplaceConfig(
  id: MarketplaceType
): MarketplaceConfig | undefined {
  return MARKETPLACES.find((m) => m.id === id);
}
