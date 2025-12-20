import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function MainMarketPage() {
  const navigate = useNavigate();

  const [tabToggle, setTabToggle] = useState("all");
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteCoins")) || [];
  });

  const [coins, setCoins] = useState([
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
    if (!userToken) {
      navigate("/");
    }
  }, [navigate]);

  const toggleFavorite = (short) => {
    const updated = favorites.includes(short)
      ? favorites.filter((f) => f !== short)
      : [...favorites, short];

    setFavorites(updated);
    localStorage.setItem("favoriteCoins", JSON.stringify(updated));
  };

  const filteredCoins = coins.filter((c) =>
    tabToggle === "gainer"
      ? c.pnl > 0
      : tabToggle === "loser"
        ? c.pnl < 0
        : tabToggle === "favorites"
          ? favorites.includes(c.shortForm)
          : true,
  );

  return (
    <div className="page relative">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-3xl font-semibold text-midnight-gray">Market</h1>
          <p className="text-slate-mist text-lg font-medium">
            In the past 24 hours
          </p>
        </div>

        <Link to={"/main/search"}>
          <IoSearch className="text-2xl text-slate-mist" />
        </Link>
      </div>

      <h1 className="mt-8 text-2xl font-semibold mb-5">Coins</h1>

      {/* Tabs */}
      <ul className="flex items-center flex-wrap justify-center px-3 border-2 border-royal-azure py-3 shadow-[0px_4px_5px_#005be3] rounded-[48px] gap-4 w-full md:w-[480px] md:justify-between">
        {["all", "gainer", "loser", "favorites"].map((t) => (
          <li key={t}>
            <button
              onClick={() => setTabToggle(t)}
              className={`py-3 px-4 font-medium text-lg md:text-xl transition ${
                tabToggle === t
                  ? "bg-royal-azure text-white rounded-4xl"
                  : "text-slate-mist"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Coin List */}
      <div className="mt-7 space-y-5">
        {tabToggle === "favorites" && filteredCoins.length === 0 && (
          <div className="flex flex-col items-center">
            <img src="/assets/favorite section.svg" className="md:w-[438px]" />
            <h1 className="text-3xl font-medium text-charcoal-stone sm:block hidden">
              Special place for Favorite coins
            </h1>
            <p className="mt-1 text-slate-mist font-medium text-lg sm:block hidden">
              Add your favorite coins and check here easily
            </p>
            <p className="text-slate-mist text-center mt-2 font-medium text-lg sm:hidden block">
              Add your favorite coins here
            </p>
          </div>
        )}

        {filteredCoins.map((coin, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedCoin(coin);
              setPopUpToggle(true);
            }}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex items-center justify-between"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <img src={coin.img} alt="" />
              <div>
                <h1 className="font-medium">{coin.name}</h1>
                <p className="text-slate-mist font-medium">{coin.shortForm}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6">
              <img
                src={
                  coin.pnl > 0
                    ? "/assets/gain vector.svg"
                    : "/assets/loss vector.svg"
                }
                className="w-14"
              />

              <div className="text-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(coin.shortForm);
                  }}
                >
                  {favorites.includes(coin.shortForm) ? (
                    <GoHeartFill className="w-6 h-6 text-crimson-fire" />
                  ) : (
                    <GoHeart className="w-6 h-6 text-crimson-fire" />
                  )}
                </button>

                <h1 className="text-xl font-medium">${coin.amount}</h1>
                <p
                  className={`font-medium text-right ${
                    coin.pnl > 0 ? "text-emerald-leaf" : "text-crimson-fire"
                  }`}
                >
                  {coin.pnl > 0 && "+"}
                  {coin.pnl}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md flex justify-center items-center transition-opacity duration-300 ease-in-out ${
          popUpToggle ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
        onClick={() => {
          setPopUpToggle(false);
          setSelectedCoin(null);
        }}
      >
        <div
          className={`md:w-md w-sm bg-white rounded-md transition-all duration-300 ease-in-out p-6 border-2 border-slate-mist shadow-2xl ${
            popUpToggle
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedCoin && (
            <>
              {/* Coin Image */}
              <div className="flex justify-center">
                <img
                  src={selectedCoin.img}
                  className="w-20"
                  alt={selectedCoin.name}
                />
              </div>

              {/* Coin Name */}
              <h1 className="text-2xl text-center font-semibold mt-2">
                {selectedCoin.name} ({selectedCoin.shortForm})
              </h1>

              {/* Amount */}
              <div className="flex justify-between items-center gap-3 mt-4">
                <h4 className="text-slate-mist font-medium">Amount</h4>
                <h5 className="font-semibold text-lg text-charcoal-stone">
                  {selectedCoin.amount}
                </h5>
              </div>

              {/* PNL */}
              <div className="flex justify-between items-center gap-3 mt-2">
                <h4 className="text-slate-mist font-medium">PNL</h4>
                <h5
                  className={`text-lg font-medium flex items-center gap-1 ${
                    selectedCoin.pnl > 0
                      ? "text-emerald-leaf"
                      : "text-crimson-fire"
                  }`}
                >
                  {selectedCoin.pnl > 0 && "+"}
                  {selectedCoin.pnl}%
                </h5>
              </div>

              {/* Buy / Sell Buttons */}
              <div className="flex justify-center mt-6 gap-3">
                <button
                  onClick={() => {
                    setPopUpToggle(false);
                    setSelectedCoin(null);
                  }}
                  className="bg-green-600 hover:scale-105 text-white rounded-md px-6 py-3 transition-all duration-200 hover:shadow-md hover:shadow-emerald-leaf w-full"
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    setPopUpToggle(false);
                    setSelectedCoin(null);
                  }}
                  className="bg-crimson-fire hover:scale-105 text-white rounded-md px-6 py-3 transition-all duration-200 hover:shadow-md hover:shadow-crimson-fire/50 w-full"
                >
                  Sell
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainMarketPage;
