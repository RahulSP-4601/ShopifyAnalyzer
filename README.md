# ShopIQ - AI-Powered Shopify Analytics Assistant

ShopIQ is an intelligent analytics platform that transforms complex Shopify data into actionable insights through conversational AI. Simply ask questions in plain English and get instant, data-driven answers about your store's performance.

## Why ShopIQ?

Shopify store owners often struggle to extract meaningful insights from complex admin dashboards. ShopIQ bridges this gap by letting you:

- **Ask questions naturally** - No need to navigate complicated dashboards or learn analytics tools
- **Get instant answers** - Revenue, products, customers - all your data at your fingertips
- **Receive actionable insights** - AI doesn't just show numbers, it explains what they mean
- **Save time** - Skip manual data analysis and focus on growing your business

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

### Conversation History

- Track all your previous queries
- Reference past insights
- Build on previous analysis

## How It Works

1. **Connect** - Link your Shopify store with one click
2. **Sync** - Your data is automatically imported and processed
3. **Ask** - Start asking questions and generating reports

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
