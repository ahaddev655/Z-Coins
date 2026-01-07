import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
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
    () => JSON.parse(localStorage.getItem("favoriteCoins")) || [],
  );

  /* ================= FETCH COINS ================= */
  const fetchCoins = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => {
        setCoins(
          res.data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            shortForm: coin.symbol.toUpperCase(),
            img: coin.image,
            amount: Number(coin.current_price),
            pnl: Number(coin.price_change_percentage_24h),
          })),
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 8000);
    return () => clearInterval(interval);
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
          : true,
  );

  /* ================= PAGINATION ================= */
  useEffect(() => setCurrentPage(1), [tabToggle]);

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const paginatedCoins = filteredCoins.slice(
    (currentPage - 1) * coinsPerPage,
    currentPage * coinsPerPage,
  );

  return (
    <div className="page relative">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Market</h1>
        <Link to="/main/search">
          <IoSearch className="text-2xl text-slate-mist" />
        </Link>
      </div>

      {/* ================= TABS ================= */}
      <ul className="flex items-center flex-wrap justify-center mt-5 px-3 border-2 border-royal-azure py-3 shadow-[0px_4px_5px_#005be3] rounded-[48px] gap-4 w-full md:w-[480px] md:justify-between">
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
        {paginatedCoins.map((coin, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedCoin(coin);
            }}
            className="bg-white p-4 rounded-lg cursor-pointer  shadow-[0px_2px_4px_#00000013] hover:shadow-lg transition-shadow"
          >
            <Link to={`/coin-details/${coin.id}`}>
              <div className="flex justify-between items-center">
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
                        ${Number(coin.amount.toFixed(2)).toLocaleString()}
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
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={`px-4 py-2 rounded-md font-medium transition ${
              currentPage === 1
                ? "bg-silver-fog text-slate-mist cursor-not-allowed"
                : "bg-sky-mist text-oceanic-blue hover:bg-oceanic-blue hover:text-white"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-10 h-10 rounded-full font-semibold transition ${
                currentPage === num
                  ? "bg-royal-azure text-white shadow"
                  : "bg-cloud-white text-midnight-gray hover:bg-sky-mist"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={`px-4 py-2 rounded-md font-medium transition ${
              currentPage === totalPages
                ? "bg-silver-fog text-slate-mist cursor-not-allowed"
                : "bg-sky-mist text-oceanic-blue hover:bg-oceanic-blue hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default MainMarketPage;
