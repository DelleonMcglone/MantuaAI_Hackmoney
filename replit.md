# Mantua.AI - DeFi Chat Platform

## Overview

Mantua.AI is a chat-native DeFi platform that combines natural language interactions with Uniswap v4 hooks and autonomous AI agents. Users interact with DeFi features (swaps, liquidity, portfolios) through a persistent chat interface, with modals rendered above the chatbot rather than page navigation. The platform supports both light and dark themes and targets Base Sepolia testnet for Web3 operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing (landing page at `/`, main app at `/app`)
- **State Management**: React Query for server state, React useState for local UI state
- **Styling**: Tailwind CSS v4 with CSS variables for theming, inline styles for dynamic theme-aware components
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Charts**: Recharts library for analytics visualizations (line, bar, pie, area charts)

### Application Structure
- **Landing Page** (`/`): Marketing page with features, FAQ, theme toggle
- **App Home** (`/app`): Main DeFi interface with sidebar navigation and chat
- **Modal Pattern**: Core features (Swap, Liquidity, Agent, Portfolio) render as modals above the chat, not as separate routes
- **Theme System**: Light/dark mode with theme objects passed through components

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Current Tables**: 
  - `chat_sessions`: Stores chat session metadata (id, title, timestamps)
  - `chat_messages`: Stores individual messages with role, content, and metadata (linked to sessions via foreign key with cascade delete)
- **Migrations**: Generated to `./migrations` directory using `drizzle-kit push`

### Key Design Patterns
- **Chat-First UX**: The chatbot is always visible; DeFi modals layer on top without unmounting chat
- **Query Classification**: Natural language inputs are classified to trigger appropriate modals or actions (`queryClassifier.ts`)
- **Theme-Aware Components**: All components receive `theme` and `isDark` props for consistent styling
- **Shared Types**: Schema types exported from `shared/schema.ts` for frontend/backend type safety

### Build System
- **Development**: Vite dev server with HMR, tsx for running TypeScript server
- **Production**: Custom build script using esbuild for server, Vite for client
- **Output**: Server bundles to `dist/index.cjs`, client to `dist/public`

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Libraries
- **Radix UI**: Full suite of accessible UI primitives (dialog, dropdown, tabs, etc.)
- **Recharts**: Charting library for analytics visualizations
- **Lucide React**: Icon library
- **date-fns**: Date formatting and manipulation

### Development Tools
- **Vite Plugins**: React plugin, Tailwind CSS plugin, custom meta-images plugin for OpenGraph
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)

### AI Integration
- **OpenAI via Replit AI Integrations**: Set up using `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL` environment variables (auto-managed by Replit)
- Available models: gpt-5.2 (recommended), gpt-5.1, gpt-5-mini, gpt-image-1, gpt-audio
- Server utilities: `server/replit_integrations/` contains ready-to-use helpers for chat, image generation, and audio processing

### Planned Integrations (Referenced in UI)
- **Wallet Connection**: UI references wallet connection for DeFi operations
- **Uniswap v4**: Hook selection for swaps and liquidity (MEV Protection, Directional Fee, JIT Rebalancing)
- **Base Sepolia Testnet**: Target network for Web3 operations
