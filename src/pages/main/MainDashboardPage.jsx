import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainDashboardPage() {
  const [userName, setUserName] = useState("Agilan");
  const navigate = useNavigate();
  const [coins, setCoins] = useState({
    img: "/assets/bitcoin.png",
    name: "Bitcoin",
    shortForm: "BTC",
    pnl: 9.77,
    amount: "2,509.75",
  });

  useEffect(() => {
    const userToken = localStorage.getItem("sessionToken");

    if (!userToken || userToken.length === 0) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="page">
      {/* Banner */}
      <div className="py-6 px-5 text-white shadow-sm bg-oceanic-blue rounded-xl">
        <p className="font-light">Welcome {userName},</p>
        <h1 className="mt-2 mb-4 sm:text-2xl text-xl font-medium">
          Make you first Investment today
        </h1>
        <button
          type="button"
          className="py-2 px-3 rounded-sm bg-cloud-white text-oceanic-blue font-medium shadow-sm hover:shadow-md transition-all hover:bg-white"
        >
          Invest Today
        </button>
      </div>
      {/* Trending Coins */}
      <div className="mt-[33px]">
        <h1 className="text-3xl font-semibold text-midnight-gray">
          Trending Coins
        </h1>
        <div className="mt-4 space-y-3">
          {Array(8)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="shadow-[0px_2px_4px_#00000013] hover:shadow-lg transition-shadow bg-white rounded-lg p-4 flex items-center justify-between flex-wrap"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <img src={coins.img} alt="IMG" />
                  <div className="space-y-[3px]">
                    <h1 className="font-medium">{coins.name}</h1>
                    <p className="text-slate-mist font-medium sm:text-base text-sm">
                      {coins.shortForm}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-wrap">
                  {coins.pnl > 0 ? (
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
                      ${coins.amount}
                    </h1>
                    {coins.pnl > 0 ? (
                      <p className="text-end text-emerald-leaf font-medium sm:text-lg text-sm">
                        +{coins.pnl}%
                      </p>
                    ) : (
                      <p className="text-end text-crimson-fire font-medium sm:text-lg text-sm">
                        {coins.pnl}%
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

export default MainDashboardPage;
