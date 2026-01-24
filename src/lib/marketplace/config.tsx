import { MarketplaceType } from "@prisma/client";

export interface MarketplaceConfig {
  id: MarketplaceType;
  name: string;
  color: string;
  logo: React.ReactNode;
}

export const MARKETPLACES: MarketplaceConfig[] = [
  {
    id: "SHOPIFY",
    name: "Shopify",
    color: "#95BF47",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 109 124" fill="#95BF47">
        <path d="M95.8 23.4c-.1-.6-.6-1-1.1-1-.5-.1-10.3-.8-10.3-.8s-6.8-6.7-7.5-7.5c-.7-.7-2.1-.5-2.6-.3-.1 0-1.4.4-3.6 1.1-2.1-6.2-5.9-11.8-12.6-11.8h-.6c-1.9-2.5-4.2-3.6-6.2-3.6-15.3 0-22.6 19.1-24.9 28.8-5.9 1.8-10.1 3.1-10.6 3.3-3.3 1-3.4 1.1-3.8 4.2-.3 2.3-9 69.3-9 69.3l67.5 12.7 36.5-7.9S95.9 24 95.8 23.4z" />
      </svg>
    ),
  },
  {
    id: "AMAZON",
    name: "Amazon",
    color: "#FF9900",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <path
          fill="#FF9900"
          d="M29.4 17.5c-3.2 0-5.8.7-7.8 2.1-.5.3-.6.8-.3 1.2l1.4 2c.2.3.6.5 1 .5.2 0 .4-.1.6-.2 1.5-1 3.1-1.4 5-1.4 2.1 0 3.7.5 4.8 1.4.6.5 1 1.3 1 2.4v.7c-1.8-.3-3.4-.5-4.9-.5-2.8 0-5.1.6-6.8 1.8-1.8 1.3-2.7 3.2-2.7 5.6 0 2.2.7 3.9 2.1 5.2 1.4 1.2 3.2 1.8 5.5 1.8 2.8 0 5.1-1.1 6.9-3.4v2.4c0 .6.5 1.1 1.1 1.1h2.8c.6 0 1.1-.5 1.1-1.1V25.5c0-2.6-.8-4.6-2.3-6-1.6-1.4-3.9-2-6.5-2z"
        />
        <path
          fill="#FF9900"
          d="M44.3 35.6c-.3-.1-.6 0-.8.2-2.6 3-6.5 4.8-11.3 5.2-6.1.5-12.6-1.4-18.3-5.3-.2-.2-.5-.2-.8-.1-.2.1-.4.4-.4.7 0 .2.1.4.2.5 6.3 4.4 13.6 6.5 20.5 5.9 5.5-.5 10-2.6 13.1-6.1.2-.2.3-.5.2-.8-.1-.1-.2-.2-.4-.2z"
        />
      </svg>
    ),
  },
  {
    id: "EBAY",
    name: "eBay",
    color: "#0064D2",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <path fill="#E53238" d="M8.2 22.8c0-2.9 1.7-5.2 5.1-5.2 3 0 4.7 1.8 4.7 4.8v.7H8.2v-.3z" />
        <path fill="#0064D2" d="M20.8 25.9v-2.8c0-4.6-2.3-8.3-7.5-8.3-5 0-8 3.5-8 8.6 0 5.4 3.2 8.4 8.3 8.4 3.2 0 5.4-.9 6.7-2.1l-1.7-2.8c-1 .8-2.4 1.4-4.5 1.4-2.5 0-4.3-1.1-4.8-3.6h11.5v.2z" />
        <path fill="#F5AF02" d="M22.1 31.4V10.3h3.4v8.1c1-2.1 3.2-3.6 6-3.6 4.5 0 7.3 3.5 7.3 8.4 0 5.1-3 8.6-7.5 8.6-2.7 0-4.8-1.4-5.9-3.5v3h-3.3z" />
        <path fill="#86B817" d="M30.4 28.9c2.6 0 4.5-2.1 4.5-5.6 0-3.4-1.8-5.5-4.4-5.5-2.6 0-4.5 2.2-4.5 5.5 0 3.5 1.9 5.6 4.4 5.6z" />
      </svg>
    ),
  },
  {
    id: "FLIPKART",
    name: "Flipkart",
    color: "#2874F0",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <rect fill="#2874F0" width="48" height="48" rx="8" />
        <path fill="#F8E71C" d="M14 12h6l-2 8h6l-10 16 2-10h-5l3-14z" />
      </svg>
    ),
  },
  {
    id: "AMAZON_INDIA",
    name: "Amazon India",
    color: "#FF9900",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <path
          fill="#FF9900"
          d="M29.4 17.5c-3.2 0-5.8.7-7.8 2.1-.5.3-.6.8-.3 1.2l1.4 2c.2.3.6.5 1 .5.2 0 .4-.1.6-.2 1.5-1 3.1-1.4 5-1.4 2.1 0 3.7.5 4.8 1.4.6.5 1 1.3 1 2.4v.7c-1.8-.3-3.4-.5-4.9-.5-2.8 0-5.1.6-6.8 1.8-1.8 1.3-2.7 3.2-2.7 5.6 0 2.2.7 3.9 2.1 5.2 1.4 1.2 3.2 1.8 5.5 1.8 2.8 0 5.1-1.1 6.9-3.4v2.4c0 .6.5 1.1 1.1 1.1h2.8c.6 0 1.1-.5 1.1-1.1V25.5c0-2.6-.8-4.6-2.3-6-1.6-1.4-3.9-2-6.5-2z"
        />
        <circle fill="#138A4A" cx="38" cy="38" r="6" />
        <text x="35" y="42" fill="white" fontSize="8" fontWeight="bold">
          .in
        </text>
      </svg>
    ),
  },
  {
    id: "MEESHO",
    name: "Meesho",
    color: "#F43397",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <rect fill="#F43397" width="48" height="48" rx="8" />
        <path fill="white" d="M12 32V16l8 8-8 8zm8-8l8-8v16l-8-8zm8 0l8-8v16l-8-8z" />
      </svg>
    ),
  },
  {
    id: "MYNTRA",
    name: "Myntra",
    color: "#FF3F6C",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <rect fill="#FF3F6C" width="48" height="48" rx="8" />
        <path fill="white" d="M14 34V14l10 10 10-10v20l-10-10-10 10z" />
      </svg>
    ),
  },
  {
    id: "NYKAA",
    name: "Nykaa",
    color: "#FC2779",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <rect fill="#FC2779" width="48" height="48" rx="8" />
        <path fill="white" d="M16 14v20l8-10 8 10V14l-8 10-8-10z" />
      </svg>
    ),
  },
  {
    id: "SNAPDEAL",
    name: "Snapdeal",
    color: "#E40046",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <rect fill="#E40046" width="48" height="48" rx="8" />
        <path fill="white" d="M24 10l14 14-14 14-14-14 14-14z" />
      </svg>
    ),
  },
  {
    id: "TIKTOK_SHOP",
    name: "TikTok Shop",
    color: "#000000",
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 48 48">
        <path
          fill="#25F4EE"
          d="M34.1 10.3c-2.1-1.4-3.6-3.6-4.1-6.2h-6.5v27.5c0 3-2.5 5.5-5.5 5.5s-5.5-2.5-5.5-5.5 2.5-5.5 5.5-5.5c.6 0 1.1.1 1.6.3v-6.6c-.5-.1-1.1-.1-1.6-.1-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12V19.1c2.5 1.8 5.5 2.8 8.7 2.8v-6.5c-1.8 0-3.4-.5-4.6-1.1z"
        />
        <path
          fill="#FE2C55"
          d="M38.7 15.4v-6.5c-1.8 0-3.4-.5-4.6-1.1-2.1-1.4-3.6-3.6-4.1-6.2h-5v27.5c0 3-2.5 5.5-5.5 5.5-1.8 0-3.4-.9-4.4-2.2-2.4-1.5-3.1-4.3-1.6-6.8.9-1.5 2.4-2.5 4.1-2.8v-6.6c-6.6 0-12 5.4-12 12 0 3.8 1.8 7.2 4.6 9.4 2 1.7 4.6 2.6 7.4 2.6 6.6 0 12-5.4 12-12V19.1c2.5 1.8 5.5 2.8 8.7 2.8v-6.5h-.6z"
        />
      </svg>
    ),
  },
];

// Lookup maps for quick access by marketplace type
export const MARKETPLACE_NAMES: Record<MarketplaceType, string> = Object.fromEntries(
  MARKETPLACES.map((m) => [m.id, m.name])
) as Record<MarketplaceType, string>;

export const MARKETPLACE_COLORS: Record<MarketplaceType, string> = Object.fromEntries(
  MARKETPLACES.map((m) => [m.id, m.color])
) as Record<MarketplaceType, string>;

// Helper to get marketplace config by type
export function getMarketplaceConfig(type: MarketplaceType): MarketplaceConfig | undefined {
  return MARKETPLACES.find((m) => m.id === type);
}
