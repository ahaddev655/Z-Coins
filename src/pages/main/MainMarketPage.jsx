import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function MainMarketPage() {
  const navigate = useNavigate();

  const [tabToggle, setTabToggle] = useState("all");
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [buySellPopUp, setBuySellPopUp] = useState("");
  const [lots, setLots] = useState("");

  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favoriteCoins")) || []
  );

  /* ================= FETCH COINS ================= */
  const fetchCoins = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => {
        setCoins(
          res.data.map((coin) => ({
            name: coin.name,
            shortForm: coin.symbol.toUpperCase(),
            img: coin.image,
            amount: Number(coin.current_price),
            pnl: Number(coin.price_change_percentage_24h),
          }))
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchCoins();
    const i = setInterval(fetchCoins, 8000);
    return () => clearInterval(i);
  }, []);

  /* ================= AUTH ================= */
  useEffect(() => {
    if (!localStorage.getItem("sessionToken")) navigate("/");
  }, [navigate]);

  /* ================= FAVORITES ================= */
  const toggleFavorite = (short) => {
    const updated = favorites.includes(short)
      ? favorites.filter((f) => f !== short)
      : [...favorites, short];
    setFavorites(updated);
    localStorage.setItem("favoriteCoins", JSON.stringify(updated));
  };

  /* ================= FILTER ================= */
  const filteredCoins = coins.filter((c) =>
    tabToggle === "gainer"
      ? c.pnl > 0
      : tabToggle === "loser"
      ? c.pnl < 0
      : tabToggle === "favorites"
      ? favorites.includes(c.shortForm)
      : true
  );

  useEffect(() => setCurrentPage(1), [tabToggle]);

  const paginatedCoins = filteredCoins.slice(
    (currentPage - 1) * coinsPerPage,
    currentPage * coinsPerPage
  );

  /* ================= BUY / SELL LOGIC ================= */
  const totalCost =
    lots && selectedCoin ? Number(lots) * selectedCoin.amount : 0;

  const handleConfirm = () => {
    if (!lots || Number(lots) <= 0) return;

    const yourCoins = JSON.parse(localStorage.getItem("yourCoins")) || [];
    const PNL = JSON.parse(localStorage.getItem("PNL")) || [];

    if (buySellPopUp === "buy") {
      const existing = yourCoins.find(
        (c) => c.shortForm === selectedCoin.shortForm
      );

      if (existing) {
        existing.lots += Number(lots);
      } else {
        yourCoins.push({
          ...selectedCoin,
          lots: Number(lots),
          buyPrice: selectedCoin.amount,
        });
      }

      localStorage.setItem("yourCoins", JSON.stringify(yourCoins));
    }

    if (buySellPopUp === "sell") {
      const coin = yourCoins.find(
        (c) => c.shortForm === selectedCoin.shortForm
      );

      if (!coin || coin.lots < Number(lots)) return;

      coin.lots -= Number(lots);

      PNL.push({
        name: selectedCoin.name,
        shortForm: selectedCoin.shortForm,
        lots: Number(lots),
        pnl: (selectedCoin.amount - coin.buyPrice) * Number(lots),
        soldAt: selectedCoin.amount,
      });

      localStorage.setItem("PNL", JSON.stringify(PNL));
      localStorage.setItem(
        "yourCoins",
        JSON.stringify(yourCoins.filter((c) => c.lots > 0))
      );
    }

    setBuySellPopUp("");
    setLots("");
  };

  return (
    <div className="page relative">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Market</h1>
        <Link to="/main/search">
          <IoSearch className="text-2xl text-slate-mist" />
        </Link>
      </div>

      {/* Coin List */}
      <div className="mt-7 space-y-5">
        {paginatedCoins.map((coin, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedCoin(coin);
              setPopUpToggle(true);
            }}
            className="bg-white p-4 rounded-lg cursor-pointer flex justify-between items-center shadow-[0px_2px_4px_#00000013] hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-3">
              <img src={coin.img} className="w-10 h-10" alt="" />
              <div>
                <h1>{coin.name}</h1>
                <p className="text-slate-mist">{coin.shortForm}</p>
              </div>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(coin.shortForm);
                }}
                className="w-full flex justify-end mb-2"
              >
                {favorites.includes(coin.shortForm) ? (
                  <GoHeartFill className="w-6 h-6 text-crimson-fire" />
                ) : (
                  <GoHeart className="w-6 h-6 text-crimson-fire" />
                )}
              </button>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="sm:block hidden">
                  {coin.pnl > 0 ? (
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
                </div>

                <div className="space-y-[5px]">
                  <h1 className="sm:text-2xl text-lg font-medium">
                    ${coin.amount.toFixed(2)}
                  </h1>
                  {coin.pnl > 0 ? (
                    <p className="text-end text-emerald-leaf font-medium sm:text-lg text-sm">
                      +{coin.pnl.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-end text-crimson-fire font-medium sm:text-lg text-sm">
                      {coin.pnl.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= SELECT COIN POPUP ================= */}
      <div
        className={`fixed flex justify-center inset-0 bg-black/50 items-center transition-opacity duration-300 ease-in-out ${
          popUpToggle ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
        onClick={() => setPopUpToggle(false)}
      >
        <div
          className={`bg-white rounded-md transition-all duration-300 ease-in-out p-6 border-2 border-slate-mist shadow-2xl md:w-[450px] w-[320px] ${
            popUpToggle
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedCoin && (
            <>
              <img src={selectedCoin.img} className="w-20 mx-auto" alt="" />
              <h1 className="text-center text-xl font-semibold mt-2">
                {selectedCoin.name} ({selectedCoin.shortForm})
              </h1>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setBuySellPopUp("buy");
                    setPopUpToggle(false);
                  }}
                  className="bg-emerald-leaf text-white w-full py-3 rounded-md"
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    setBuySellPopUp("sell");
                    setPopUpToggle(false);
                  }}
                  className="bg-crimson-fire text-white w-full py-3 rounded-md"
                >
                  Sell
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ================= BUY / SELL POPUP ================= */}
      {(buySellPopUp === "buy" || buySellPopUp === "sell") && selectedCoin && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setBuySellPopUp("")}
        >
          <div
            className="bg-white p-6 rounded-md w-[320px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center font-semibold text-xl mb-4">
              {buySellPopUp.toUpperCase()} {selectedCoin.shortForm}
            </h1>

            <input
              type="number"
              min="1"
              value={lots}
              onChange={(e) => setLots(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <p className="text-center mt-2 font-medium">
              Total: ${totalCost.toFixed(2)}
            </p>

            <button
              onClick={handleConfirm}
              className={`w-full mt-4 py-3 rounded-md text-white ${
                buySellPopUp === "buy" ? "bg-emerald-leaf" : "bg-crimson-fire"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMarketPage;
