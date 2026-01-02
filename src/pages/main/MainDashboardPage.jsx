import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainDashboardPage() {
  const navigate = useNavigate();
  const [popUpToggle, setPopUpToggle] = useState(false);

  const [coins, setCoins] = useState([]);

const coinsDetails = () => {
  axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&sparkline=false"
    )
    .then((res) => {
      const formattedCoins = res.data.map((coin) => ({
        name: coin.name,
        shortForm: coin.symbol.toUpperCase(),
        img: coin.image,
        amount: coin.current_price,
        pnl: coin.price_change_percentage_24h,
      }));

      setCoins(formattedCoins);
    })
    .catch((err) => {
      console.error("Error fetching coins:", err);
    });
};



  useEffect(() => {
    coinsDetails();
  }, []);

  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("sessionToken");
    if (!userToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="page">
      {/* Banner */}
      <div className="py-6 px-5 text-white shadow-sm bg-oceanic-blue rounded-xl">
        <h1 className="my-2 sm:text-2xl text-xl font-medium">
          Welcome To Your Private Trading Hub
        </h1>
        <p className="font-light">
          Practice trading here before real-time trading
        </p>
      </div>

      {/* Trending Coins */}
      <div className="mt-[33px]">
        <h1 className="text-3xl font-semibold text-midnight-gray">
          Trending Coins
        </h1>

        <div className="mt-4 space-y-3">
          {coins.map((c, i) => (
            <div
              onClick={() => {
                setSelectedCoin(c);
                setPopUpToggle(true);
              }}
              key={i}
              className="cursor-pointer shadow-[0px_2px_4px_#00000013] hover:shadow-lg transition-shadow bg-white rounded-lg p-4 flex items-center justify-between flex-wrap"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <img
                  src={c.img}
                  alt="coin"
                  className="w-10 h-10 rounded-full"
                />
                <div className="space-y-[3px]">
                  <h1 className="font-medium">{c.name}</h1>
                  <p className="text-slate-mist font-medium sm:text-base text-sm">
                    {c.shortForm}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                {c.pnl > 0 ? (
                  <img
                    src="/assets/gain vector.svg"
                    alt="gain"
                    className="sm:w-16 sm:h-16"
                  />
                ) : (
                  <img
                    src="/assets/loss vector.svg"
                    alt="loss"
                    className="sm:w-16 sm:h-16"
                  />
                )}

                <div className="space-y-[5px]">
                  <h1 className="sm:text-2xl text-lg font-medium">
                    ${c.amount}
                  </h1>
                  {c.pnl > 0 ? (
                    <p className="text-end text-emerald-leaf font-medium sm:text-lg text-sm">
                      +{c.pnl}%
                    </p>
                  ) : (
                    <p className="text-end text-crimson-fire font-medium sm:text-lg text-sm">
                      {c.pnl}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
          className={`md:w-[450px] w-[320px] bg-white rounded-md transition-all duration-300 ease-in-out p-6 border-2 border-slate-mist shadow-2xl ${
            popUpToggle
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedCoin && (
            <>
              <div className="flex justify-center">
                <img
                  src={selectedCoin.img}
                  className="w-20"
                  alt={selectedCoin.name}
                />
              </div>

              <h1 className="text-2xl text-center font-semibold mt-2">
                {selectedCoin.name} ({selectedCoin.shortForm})
              </h1>

              <div className="flex justify-between items-center gap-3 mt-4">
                <h4 className="text-slate-mist font-medium">Amount</h4>
                <h5 className="font-semibold text-lg text-charcoal-stone">
                  {selectedCoin.amount}
                </h5>
              </div>

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

              <div className="flex justify-center mt-6 gap-3">
                <button
                  onClick={() => {
                    setPopUpToggle(false);
                    setSelectedCoin(null);
                  }}
                  className="bg-green-600 hover:scale-105 text-white rounded-md px-6 py-3 transition-all duration-200 hover:shadow-md w-full"
                >
                  Buy
                </button>

                <button
                  onClick={() => {
                    setPopUpToggle(false);
                    setSelectedCoin(null);
                  }}
                  className="bg-crimson-fire hover:scale-105 text-white rounded-md px-6 py-3 transition-all duration-200 hover:shadow-md w-full"
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

export default MainDashboardPage;
