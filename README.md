# বাজার দর / BazarDor

**Know today’s prices before you shop.** BazarDor is a Bengali-first market price guide for exploring everyday products, comparing local market prices, and tracking price changes.

## Technologies

- **Next.js 16** — App Router, server rendering, and deployment
- **React 19** and **TypeScript** — user interface and type safety
- **Tailwind CSS 4** and **HeroUI** — responsive styling and interface components
- **Better Auth** and **MongoDB** — authentication and user accounts
- **react-hot-toast** and **Lucide React** — notifications and icons

## Key features

1. **Daily price overview** — browse current prices and see which products are rising or falling.
2. **Category browsing and sorting** — explore products by category and sort by price.
3. **Market comparisons** — view minimum, maximum, and average prices across markets, with price history.
4. **Responsive Bengali-first experience** — use the category navigation, price ticker, and product grids on mobile, tablet, and desktop.
5. **User accounts** — sign up or sign in, manage a profile, and receive helpful notifications for authentication actions and protected-page redirects.

## Run locally

1. Copy `.env.example` to `.env` and fill in the MongoDB URL, Better Auth secret, and any OAuth credentials you use.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

## Deploy to Vercel

Import the repository into Vercel and use the default Next.js framework settings and build command (`npm run build`). Do not enable static export: Next.js generates known product and category pages at build time and handles unknown slugs with the custom 404 page.

Set these environment variables in each Vercel environment:

- `BETTER_AUTH_SECRET` — a long, random secret.
- `BETTER_AUTH_URL` — the public origin, such as `https://your-project.vercel.app`.
- `BETTER_AUTH_DB_URL` — a MongoDB connection string accessible from Vercel.
- `BETTER_AUTH_GOOGLE_CLIENT_ID` and `BETTER_AUTH_GOOGLE_SECRET` — when enabling Google sign-in.
- `BETTER_AUTH_GITHUB_CLIENT_ID` and `BETTER_AUTH_GITHUB_SECRET` — when enabling GitHub sign-in.

For OAuth, add the deployed origin to your provider settings and configure the callback path as `/api/auth/callback/google` or `/api/auth/callback/github`. Update the auth URL and callback settings for preview deployments if you use OAuth there.
