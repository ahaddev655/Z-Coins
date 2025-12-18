import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPortfolioPage() {
  const navigate = useNavigate();

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteCoins");
    return saved ? JSON.parse(saved) : [];
  });

  const coins = [
    {
      img: "/assets/bitcoin.png",
      name: "Bitcoin",
      shortForm: "BTC",
      pnl: 9.77,
      amount: "2,509.75",
    },
    {
      img: "/assets/bitcoin.png",
      name: "Ethereum",
      shortForm: "ETH",
      pnl: -3.12,
      amount: "1,842.20",
    },
    {
      img: "/assets/bitcoin.png",
      name: "Cardano",
      shortForm: "ADA",
      pnl: 4.21,
      amount: "0.52",
    },
    {
      img: "/assets/bitcoin.png",
      name: "Solana",
      shortForm: "SOL",
      pnl: -1.68,
      amount: "98.42",
    },
  ];

  useEffect(() => {
    const loginAuthority = localStorage.getItem("loginAuthority");
    if (loginAuthority === 0) {
      navigate("/");
    }
  }, [navigate]);

  // Filter only favorite coins
  const yourCoins = coins.filter((c) => favorites.includes(c.shortForm));

  return (
    <div className="page">
      {/* Banner */}
      <div className="py-6 px-5 text-white shadow-sm bg-oceanic-blue rounded-xl">
        <p className="font-medium sm:text-2xl text-xl">Portfolio</p>
        <p className="font-light text-sm mt-[15px]">Holding Value</p>
        <h1 className="mt-0.5 text-3xl font-semibold">$10,000.00</h1>
      </div>

      {/* Favorite Coins */}
      <div className="mt-[33px]">
        <h1 className="text-3xl font-semibold text-midnight-gray">
          Your Coins
        </h1>

        {/* If no favorites */}
        {yourCoins.length === 0 && (
          <p className="text-center text-slate-mist text-lg font-medium py-10">
            No coins added yet.
          </p>
        )}

        <div className="mt-4 space-y-3">
          {yourCoins.map((coin, i) => (
            <div
              key={i}
              className="shadow-[0px_2px_4px_#00000013] hover:shadow-lg transition-shadow 
              bg-white rounded-lg p-4 flex items-center justify-between flex-wrap"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <img src={coin.img} alt="IMG" />
                <div className="space-y-[3px]">
                  <h1 className="font-medium">{coin.name}</h1>
                  <p className="text-slate-mist font-medium sm:text-base text-sm">
                    {coin.shortForm}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                {coin.pnl > 0 ? (
                  <img
                    src="/assets/gain vector.svg"
                    alt="IMG"
                    className="sm:w-16 sm:h-16"
                  />
                ) : (
                  <img
                    src="/assets/loss vector.svg"
                    alt="IMG"
                    className="sm:w-16 sm:h-16"
                  />
                )}

                <div className="space-y-[5px]">
                  <h1 className="sm:text-2xl text-lg font-medium">
                    ${coin.amount}
                  </h1>

                  {coin.pnl > 0 ? (
                    <p className="text-end text-emerald-leaf font-medium sm:text-lg text-sm">
                      +{coin.pnl}%
                    </p>
                  ) : (
                    <p className="text-end text-crimson-fire font-medium sm:text-lg text-sm">
                      {coin.pnl}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPortfolioPage;
