import { CryptoCardProps } from "../constants/types";

export default function CryptoCard({ name, symbol, price, change24h, logoUrl }: CryptoCardProps) {
    const changeColor = change24h >= 0 ? "text-green-500" : "text-red-500";

    return (
        <div
            className="bg-white dark:bg-zinc-900 hover:shadow-xl transition-shadow duration-300 
                 rounded-2xl shadow p-5 w-full max-w-sm mx-auto cursor-pointer border border-gray-100 dark:border-zinc-800"
        >
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={logoUrl}
                    alt={`${name} logo`}
                    className="w-10 h-10 rounded-full"
                    onError={(e) =>
                        (e.currentTarget.src = "/public/globe.svg") // Fallback if logo fails
                    }
                />
                <div>
                    <h2 className="text-lg font-semibold capitalize text-gray-800 dark:text-white">{name}</h2>
                    <span className="uppercase text-xs text-gray-500">{symbol}</span>
                </div>
            </div>

            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${price.toLocaleString()}
            </div>
            <div className={`mt-2 text-sm font-medium ${changeColor}`}>
                {change24h >= 0 ? '▲' : '▼'} {change24h.toFixed(2)}%
            </div>
        </div>
    );
}
