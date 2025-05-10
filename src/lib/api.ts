import axios from "axios";

// Base URL for CoinGecko API
const COINGECKO_API = process.env.coingeckoApiUrl || "https://api.coingecko.com/api/v3";

export const fetchCryptoList = async () => {
    const response = await axios.get(
        `${COINGECKO_API}/coins/list`,
        {
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: 10,
                page: 1,
                sparkline: false,
            },
            headers: {
                "Content-Type": "application/json",
                "x_cg_demo_api_key": process.env.coingeckoApiKey || "",
            },
        }
    );

    return response.data;
};

export const fetchTokenDetail = async (coinIds: string[]) => {
    if (coinIds.length === 0) {
        return [];
    }
    const response = await axios.get(
        `${COINGECKO_API}/coins/markets`,
        {
            params: {
                vs_currency: "usd",
                ids: coinIds.join(","),
                order: "price_change_24h",
                price_change_percentage: "24h",
                per_page: 10,
                page: 1,
                sparkline: false,
            },
            headers: {
                "Content-Type": "application/json",
                "x_cg_demo_api_key": process.env.coingeckoApiKey || "",
            },
        }
    );

    return response.data;
};
