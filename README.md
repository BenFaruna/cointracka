# CoinTracka

A simple crypto price tracker web app that displays live price data for selected cryptocurrencies using the CoinGecko API.

## 🚀 Tech Stack

- **Framework**: Next.js (Pages Router)
- **Data Fetching**: React Query (@tanstack/react-query)
- **Styling**: Tailwind CSS
- **API**: CoinGecko

---

## 📦 Features

- ✅ Displays price data for 5 major cryptocurrencies:
  - Bitcoin (BTC)
  - Ethereum (ETH)
  - Solana (SOL)
  - Polygon (MATIC)
  - Dogecoin (DOGE)
- ✅ Shows:
  - Coin Name
  - Symbol
  - Current Price (USD)
  - 24h Price Change (highlighted green for positive, red for negative)
- ✅ Auto-refresh every 30 seconds
- ✅ Uses React Query for data fetching and caching

---

## 🎁 Bonus Features

- 🔍 **Search bar** to look up any other coin by name
- 📊 **Sort** coins by 24-hour price change
- 📶 **Loading** and ❌ **Error** states handled cleanly with React Query

---

## 📁 Project Structure

```bash
.
├── app/
│   ├── index.tsx              # Main page
│   ├── layout.tsx             # Page layout
│   └── globals.css            # Tailwind base styles
├── components/
│   ├── CryptoCard.tsx         # UI Card for displaying coin info
│   ├── CryptoList.tsx         # Renders list of coins and search results
│   └── SearchDropdown.tsx     # Search bar with dropdown and sort
├── hooks/
│   └── useCryptoPrices.ts     # Custom hooks for fetching data with React Query
│   └── useDebounce.ts     # Custom hooks for searching with some delays when typing
├── lib/
│   └── api.ts                 # Axios functions to hit CoinGecko endpoints
├── public/                    # Static assets (optional logos/icons)
├── .env.local                 # API keys and environment config
└── README.md
````

---

## 🛠️ Setup Instructions

1. **Clone the repository**:

```bash
git clone https://github.com/BenFaruna/cointracka.git
cd cointracka
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**:

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_COINGECKO_API_KEY= # optional, for endpoints that support it
NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

4. **Run the development server**:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🧠 Design Decisions

* **React Query** simplifies caching, background updates, and error handling.
* **Tailwind CSS** allows quick UI styling with utility classes.
* **Search and Sort** are client-side for speed; performance is good with <100 coins.
* **Client-side Search and Sort**: For datasets under 100 items, client-side search and sort offer a fast and responsive user experience. The performance impact is negligible, and it reduces server load.
* **Data Fetching Strategy**: React Query's useQuery hook is utilized to fetch data, enabling automatic caching, background updates, and simplified error handling.
---

## 📈 Scaling Strategy (100+ coins and multiple APIs)

To scale the app:

* ✅ **Pagination or Infinite Scroll**: Implement pagination or infinite scrolling to load data in chunks, preventing performance bottlenecks when dealing with a large number of coins. This approach optimizes initial load time and reduces the amount of data transferred.
* ✅ **Memoization and selective fetching**: Utilize React Query's caching mechanisms and memoization techniques (e.g., useMemo in React) to avoid redundant API calls and re-renders. Fetch only the necessary data for each component.
* ✅ **Backend proxy/cache layer**: Introduce a backend proxy or cache layer (e.g., Redis, Varnish) to aggregate data from multiple APIs, handle rate limits, and cache responses. This approach improves performance, reduces API load, and provides a consistent data interface for the frontend.
* ✅ **Debounce & throttle**: Implement debouncing and throttling techniques for user input in the search bar to minimize API calls and optimize performance. Debouncing delays the execution of a function until a certain period of inactivity has passed, while throttling limits the number of times a function can be called within a specific time interval.
---

## ✅ Evaluation Checklist

* [x] React Query implemented correctly
* [x] 30s auto-refresh logic
* [x] Basic UI and responsiveness
* [x] Search, Sort, and Error/Loading states
* [x] Clean and modular codebase

---

## 📬 Contact

Made for IWEETO's Blockchain Developer assessment — built by [BenFaruna](https://github.com/BenFaruna).
```
