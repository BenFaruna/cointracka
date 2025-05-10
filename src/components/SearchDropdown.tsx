"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface Coin {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
}

interface SearchDropdownProps {
    onSelect: (coin: Coin) => void;
    onSortChange: (sort: boolean) => void;
    sortByChange: boolean;
}

export default function SearchDropdown({ onSelect, onSortChange, sortByChange }: SearchDropdownProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [coins, setCoins] = useState<Coin[]>([]);
    const debouncedSearchTerm = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetch(`https://api.coingecko.com/api/v3/search?query=${debouncedSearchTerm}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x_cg_demo_api_key": process.env.coingeckoApiKey || "",
                }
            },)
                .then((response) => response.json())
                .then((data) => setCoins(data.coins));
        } else {
            setCoins([]);
        }
    }, [debouncedSearchTerm]);


    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleClear = () => {
        setCoins([]);
        setQuery("");
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-sm mx-auto">
            <div className="flex items-center space-x-2">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
                        placeholder="Search for a coin..."
                        className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                    />

                    {query && (
                        <button
                            onClick={handleClear}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                            aria-label="Clear search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <button
                    onClick={() => onSortChange(!sortByChange)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    aria-label="Sort by 24h change"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M3 6h7m-7 8h5m6 0l4 4m0 0l4-4m-4 4V4" />
                    </svg>
                    <span className="hidden sm:inline">
                        {sortByChange ? "Reset" : "Sort"}
                    </span>
                </button>
            </div>

            {isOpen && filteredCoins.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredCoins.map((coin) => (
                        <li
                            key={coin.id}
                            onMouseDown={() => {
                                onSelect(coin);
                                setQuery(coin.name);
                            }}
                            className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-zinc-700 cursor-pointer"
                        >
                            {coin.name} ({coin.symbol.toUpperCase()})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
