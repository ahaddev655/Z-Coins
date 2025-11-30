import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function MainMarketPage() {
  const navigate = useNavigate();
  const [tabToggle, setTabToggle] = useState("all");

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteCoins");
    return saved ? JSON.parse(saved) : [];
  });

  const [coins] = useState([
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
  ]);

  useEffect(() => {
    const userToken = localStorage.getItem("sessionToken");

    if (!userToken || userToken.length === 0) {
      navigate("/");
    }
  }, [navigate]);

  const toggleFavorite = (shortForm) => {
    const updated = favorites.includes(shortForm)
      ? favorites.filter((f) => f !== shortForm)
      : [...favorites, shortForm];

    setFavorites(updated);
    localStorage.setItem("favoriteCoins", JSON.stringify(updated));
  };

  const filteredCoins = coins.filter((c) => {
    if (tabToggle === "gainer") return c.pnl > 0;
    if (tabToggle === "loser") return c.pnl < 0;
    if (tabToggle === "favorites") return favorites.includes(c.shortForm);
    return true; // All
  });

  return (
    <div className="lg:px-6 px-3 py-6 w-full">
      {/* Title */}
      <div className="items-center justify-between flex w-full">
        <div>
          <h1 className="text-3xl font-semibold text-midnight-gray">Market</h1>
          <p className="text-slate-mist text-lg font-medium">
            In the past 24 hours
          </p>
        </div>

        <div>
          <Link to={"/main/search"}>
            <IoSearch className="text-2xl text-slate-mist" />
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <h1 className="mt-[31px] text-2xl font-semibold mb-5">Coins</h1>

      <ul
        className="flex items-center border-2 border-royal-azure py-3 px-4 shadow-[0px_4px_5px_#005be3]
        rounded-[48px] gap-6 w-[480px] flex-wrap"
      >
        <li>
          <button
            onClick={() => setTabToggle("all")}
            className={`py-3 px-4 font-medium text-xl transition-all ${
              tabToggle === "all"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            All
          </button>
        </li>

        <li>
          <button
            onClick={() => setTabToggle("gainer")}
            className={`py-3 px-4 font-medium text-xl transition-all ${
              tabToggle === "gainer"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Gainer
          </button>
        </li>

        <li>
          <button
            onClick={() => setTabToggle("loser")}
            className={`py-3 px-4 font-medium text-xl transition-all ${
              tabToggle === "loser"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Loser
          </button>
        </li>

        <li>
          <button
            onClick={() => setTabToggle("favorites")}
            className={`py-3 px-4 font-medium text-xl transition-all ${
              tabToggle === "favorites"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Favorites
          </button>
        </li>
      </ul>

      {/* Coin List */}
      <div className="mt-7 space-y-5">
        {/* No favorites message */}
        {tabToggle === "favorites" && filteredCoins.length === 0 && (
          <div className="flex items-center flex-col justify-center flex-wrap">
            <div className="w-[438px] h-[400px]">
              <img
                src="/assets/favorite section.svg"
                alt="IMG"
                className="w-full"
              />
            </div>
            <h1 className="text-3xl font-medium text-charcoal-stone">
              Special place for Favorite coins
            </h1>
            <p className="mt-1 text-slate-mist font-medium text-lg">
              Add you favorite coins and check here easily{" "}
            </p>
          </div>
        )}

        {filteredCoins.map((coin, i) => (
          <div
            key={i}
            className="shadow-[0px_2px_4px_#00000013] hover:shadow-lg transition-shadow
      bg-white rounded-lg p-4 flex items-center justify-between flex-wrap relative"
          >
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-wrap">
              <img src={coin.img} alt="IMG" />
              <div className="space-y-[3px]">
                <h1 className="font-medium">{coin.name}</h1>
                <p className="text-slate-mist font-medium sm:text-base text-sm">
                  {coin.shortForm}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6 flex-wrap">
              {coin.pnl > 0 ? (
                <img
                  src="/assets/gain vector.svg"
                  className="sm:w-16 sm:h-16"
                />
              ) : (
                <img
                  src="/assets/loss vector.svg"
                  className="sm:w-16 sm:h-16"
                />
              )}

              <div className="space-y-[5px]">
                <div className="text-end">
                  <button onClick={() => toggleFavorite(coin.shortForm)}>
                    {favorites.includes(coin.shortForm) ? (
                      <GoHeartFill className="w-6 h-6" />
                    ) : (
                      <GoHeart className="w-6 h-6" />
                    )}
                  </button>
                </div>

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
  );
}

export default MainMarketPage;
