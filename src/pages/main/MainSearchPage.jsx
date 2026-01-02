import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MainSearchPage() {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);

  const coinsDetails = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false"
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

  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("sessionToken");
    if (!userToken) {
      navigate("/");
    }
  }, [navigate]);

  // Filter coins based on search query
  const filteredCoins = coins.filter((coin) => {
    const query = (searchQuery || "").toLowerCase();
    const coinName = (coin?.name || "").toLowerCase();
    const coinShortForm = (coin?.shortForm || "").toLowerCase();

    return coinName.includes(query) || coinShortForm.includes(query);
  });

  return (
    <div className="page">
      <div className="flex items-center justify-between gap-4 mb-9">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 placeholder-silver-fog text-midnight-gray border-silver-fog bg-white w-full py-2 px-2 rounded-sm"
          placeholder="Search Cryptocurrency"
        />
        <Link to={"/main/market"} className="text-charcoal-stone font-medium">
          Cancel
        </Link>
      </div>

      <div className="space-y-5">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin, i) => (
            <div
              key={i}
              className="shadow-[0px_2px_4px_#00000013] hover:shadow-lg transition-shadow bg-white rounded-lg p-4 flex items-center justify-between flex-wrap"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <img
                  src={coin.img}
                  alt="IMG"
                  className="w-10 h-10 rounded-full"
                />
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
                    className="sm:w-16 sm:h-16"
                  />
                ) : (
                  <img
                    src="/assets/loss vector.svg"
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
          ))
        ) : (
          <p className="text-center text-gray-400">No coins found</p>
        )}
      </div>
    </div>
  );
}

export default MainSearchPage;
