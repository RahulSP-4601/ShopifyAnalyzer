# ShopIQ - AI-Powered Multi-Channel E-Commerce Analytics

ShopIQ is an intelligent analytics platform that transforms complex e-commerce data into actionable insights through conversational AI. Simply ask questions in plain English and get instant, data-driven answers about your store's performance across multiple marketplaces.

## The Problem We Solve

Multi-channel e-commerce sellers face a growing challenge: managing data across multiple platforms (Shopify, Amazon, eBay, Flipkart, and more) is overwhelming. Each marketplace has its own dashboard, metrics, and reporting tools. Sellers spend hours jumping between platforms, manually compiling reports, and trying to make sense of fragmented data.

**The result?** Lost time, missed opportunities, and decisions made on gut feeling instead of data.

## Our Solution

ShopIQ acts as your AI-powered business analyst. Instead of navigating complex dashboards:

- **Ask questions naturally** - "What was my revenue last week?" or "Which products are underperforming?"
- **Get unified insights** - All your marketplace data in one place
- **Receive actionable recommendations** - AI doesn't just show numbers, it tells you what to do next
- **Save hours every week** - Skip manual data analysis and focus on growing your business

## The Idea

ShopIQ is built on a simple premise: **e-commerce analytics should be as easy as having a conversation**.

We believe that every seller, regardless of technical expertise, should have access to the same quality of insights that enterprise retailers get from expensive analytics teams. By combining:

1. **Multi-marketplace integration** - Connect all your sales channels in one click
2. **Conversational AI** - Ask questions like you would to a business analyst
3. **Automated insights** - Get recommendations without needing to interpret raw data

We democratize e-commerce analytics for the millions of small and medium sellers worldwide.

## Supported Marketplaces

| Marketplace | Status |
| ----------- | ------ |
| Shopify | Fully Integrated |
| Amazon | Coming Soon |
| eBay | Coming Soon |
| Flipkart | Coming Soon |
| Amazon India | Coming Soon |
| Meesho | Coming Soon |
| Myntra | Coming Soon |
| Nykaa | Coming Soon |

## Features

### Conversational Analytics

Ask questions like you would to a business analyst:

- "What was my revenue last week?"
- "Which are my best-selling products?"
- "Who are my top customers?"
- "What time of day do most orders come in?"
- "How is my customer acquisition trending?"

### One-Click Shopify Integration

- Secure OAuth authentication
- Automatic data synchronization (products, orders, customers)
- Real-time sync progress tracking
- 90-day order history import

### Smart Analytics & Metrics

- **Revenue Metrics**: Total sales, average order value, tax, discounts
- **Product Performance**: Best sellers, underperformers, inventory tracking
- **Customer Insights**: Top customers, lifetime value, geographic distribution
- **Trend Analysis**: Daily/weekly revenue trends, order patterns

### Automated Report Generation

Generate professional reports on demand:

| Report Type       | What's Included                                  |
| ----------------- | ------------------------------------------------ |
| Revenue Summary   | Sales trends, AOV analysis, top products         |
| Product Analysis  | Best sellers, inventory status, low stock alerts |
| Customer Insights | Customer segments, top buyers, geographic data   |
| Full Analysis     | Comprehensive store overview with all metrics    |

Each report includes AI-generated summaries with actionable recommendations.

### Multi-Marketplace Management

- Connect multiple sales channels from one dashboard
- Unified analytics across all connected marketplaces
- Single source of truth for your e-commerce business

### Conversation History

- Track all your previous queries
- Reference past insights
- Build on previous analysis

## How It Works

1. **Connect** - Link your Shopify store with one click
2. **Sync** - Your data is automatically imported and processed
3. **Ask** - Start asking questions and generating reports

## Business Model

### Pricing Structure

ShopIQ operates on a **subscription-based SaaS model** with transparent, scalable pricing:

| Plan | Price | Includes |
| ---- | ----- | -------- |
| Base | $19.99/month | 1 marketplace connection |
| Additional Marketplace | +$4.99/month | Per additional channel |

**Example pricing:**
- Single Shopify store: $19.99/month
- Shopify + Amazon: $24.98/month
- Shopify + Amazon + eBay: $29.97/month

### How We Generate Revenue

1. **Recurring Subscriptions** (Primary Revenue)
   - Monthly subscription fees from e-commerce sellers
   - Predictable, recurring revenue model
   - Higher revenue from multi-channel sellers

2. **Marketplace Expansion**
   - Each new marketplace connection increases MRR
   - Sellers naturally expand to multiple channels as they grow
   - Built-in revenue growth as customers scale

3. **Future Revenue Streams**
   - Enterprise plans for high-volume sellers
   - Premium features (advanced forecasting, custom integrations)
   - API access for agencies and developers
   - White-label solutions for marketplace platforms

### Target Market

- **Primary:** Multi-channel e-commerce sellers on Shopify
- **Secondary:** Indian marketplace sellers (Flipkart, Amazon India, Meesho)
- **TAM:** 30M+ active e-commerce sellers globally
- **Sweet Spot:** Sellers doing $10K-$500K/month who need insights but can't afford dedicated analysts

### Competitive Advantage

| Traditional Analytics | ShopIQ |
| --------------------- | ------ |
| Complex dashboards | Conversational AI |
| Single platform focus | Multi-marketplace unified |
| Raw data exports | Actionable recommendations |
| $100-1000+/month | Starting at $19.99/month |
| Requires training | Ask questions naturally |

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: OpenAI API
- **APIs**: Shopify Admin API (2025-10)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Shopify Partner account (for OAuth credentials)
- OpenAI API

### Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL="postgresql://..."

# Shopify OAuth
SHOPIFY_CLIENT_ID="your-client-id"
SHOPIFY_CLIENT_SECRET="your-client-secret"

# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── chat/              # Chat interface
│   ├── reports/           # Reports management
│   ├── sync/              # Sync progress
│   └── api/               # API routes
├── components/            # React components
│   ├── landing/           # Marketing pages
│   ├── chat/              # Chat UI
│   └── reports/           # Report views
└── lib/                   # Core utilities
    ├── shopify/           # Shopify API client
    ├── gemini/            # AI integration
    ├── metrics/           # Analytics calculations
    └── auth/              # Session management
```

## Security

- OAuth 2.0 for Shopify authentication
- JWT-based session management with HTTP-only cookies
- HMAC validation for Shopify requests
- Store-scoped data isolation

## License

MIT
