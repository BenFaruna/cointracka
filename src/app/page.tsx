"use client";
import { useState } from "react";
import CryptoList from "@/cointracker/components/CryptoList";
import SearchDropdown from "../components/SearchDropdown";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByChange, setSortByChange] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-evenly min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="">
          <div className="flex flex-col gap-[8px] mb-4">
            <h1 className="text-4xl font-bold text-center sm:text-left">
              CoinTracka
            </h1>
            <p className="text-lg text-center sm:text-left">
              Tracking your crypto price made easy
            </p>
          </div>
          <div>
            <SearchDropdown
              onSelect={(coin) => {
                setSearchTerm(coin.id);
              }}
              onSortChange={(sort) => {
                setSortByChange(sort);
              }}
              sortByChange={sortByChange}
            />
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] w-full">
          <CryptoList searchTerm={searchTerm} sortByChange={sortByChange} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>
          Built with 💻 using Next.js Data provided by <a href="https://www.coingecko.com/en/api" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">CoinGecko API</a>. | © 2025 Cointracka
        </p>
      </footer>
    </div>
  );
}
