"use client";
import { TokenDetails } from "../constants/types";
import CryptoCard from "./CryptoCard";
import { useCryptoPrices, useTokenPrice } from "../hooks/useCryptoPrices";
import { useEffect, useState } from "react";


interface CryptolistProps {
    searchTerm: string;
    sortByChange?: boolean;
}

const CryptoList = ({ searchTerm, sortByChange }: CryptolistProps) => {
    const { data, isLoading, isError } = useCryptoPrices();
    const { data: token, isLoading: searchLoading, isError: searchError } = useTokenPrice(searchTerm);
    const [processedData, setProcessedData] = useState<TokenDetails[]>([]);

    useEffect(() => {
        if (Array.isArray(data)) {
            if (sortByChange) {
                const sorted = [...data].sort((a, b) => {
                    const changeA = typeof a.price_change_percentage_24h === 'number'
                        ? a.price_change_percentage_24h
                        : -Infinity;
                    const changeB = typeof b.price_change_percentage_24h === 'number'
                        ? b.price_change_percentage_24h
                        : -Infinity;
                    return changeB - changeA;
                });
                setProcessedData(sorted);
            } else {
                setProcessedData(data);
            }
        }
    }, [data, sortByChange]);

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError && data?.length === 0) return <p className="text-center text-red-500">Failed to fetch prices.</p>;

    return (
        <>
            {searchTerm && (
                <>
                    {searchLoading && (
                        <p className="text-center">Search Loading...</p>
                    )}
                    {searchError ? (
                        <p className="text-center text-red-500">Failed to fetch search token.</p>
                    ) : token && (
                        <CryptoCard
                            name={token[0]?.name}
                            symbol={token[0]?.symbol}
                            change24h={token[0]?.price_change_percentage_24h}
                            price={token[0]?.current_price}
                            logoUrl={token[0]?.image}
                        />
                    )}
                </>
            )}

            {processedData?.length !== 0 && processedData?.map((coin: TokenDetails, index: number) => (
                <CryptoCard
                    key={index}
                    name={coin.name}
                    symbol={coin.symbol}
                    change24h={coin.price_change_percentage_24h}
                    price={coin.current_price}
                    logoUrl={coin.image}
                />
            ))}
        </>
    );
};

export default CryptoList