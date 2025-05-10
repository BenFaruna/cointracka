"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchTokenDetail } from "@/cointracker/lib/api";

const COIN_IDS = ["bitcoin", "ethereum", "solana", "matic-network", "dogecoin"];

export const useCryptoPrices = () => {
    return useQuery({
        queryKey: ["crypto-prices"],
        queryFn: () => fetchTokenDetail(COIN_IDS),
        refetchInterval: 30_000, // Auto-refresh every 30s
        staleTime: 30_000,
        retry: 1,
    });
};

export const useTokenPrice = (coinId: string) => {
    return useQuery({
        queryKey: ["token-price", coinId],
        queryFn: () => fetchTokenDetail([coinId]),
        enabled: !!coinId,
        refetchInterval: 30_000, // Auto-refresh every 30s
        staleTime: 30_000,
        retry: 1,
    });
};