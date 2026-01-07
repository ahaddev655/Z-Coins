import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainCoinsHoldingHistory() {
  const [holdingData, setHoldingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      const data = JSON.parse(localStorage.getItem("PNL")) || [];
      setHoldingData(data);
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("sessionToken")) navigate("/");
  }, [navigate]);
  return (
    <div className="page">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold mb-4 text-charcoal-stone">
          Your History
        </h1>
      </div>
      {/* Coins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {holdingData.length > 0 ? (
          holdingData.map((coin, index) => (
            <div
              key={index}
              className="p-4 border-2 border-silver-fog bg-white rounded-md shadow-md hover:shadow-lg transition"
            >
              {/* Coin */}
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-medium text-charcoal-stone">
                    {coin.name}
                  </h1>
                  <h4 className="font-medium text-sm text-slate-mist">
                    {coin.shortForm}
                  </h4>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-end font-medium text-slate-mist">Lots</h4>
                  <h5 className="text-end font-medium text-sm text-royal-azure">
                    {coin.lots}
                  </h5>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-end font-medium text-slate-mist">PNL</h4>
                  <h5
                    className={`text-sm text-end font-medium ${
                      coin.pnl > 0 ? "text-emerald-leaf" : "text-crimson-fire"
                    }`}
                  >
                    {coin.pnl.toFixed(2)}
                  </h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No coins in your holdings yet.</p>
        )}
      </div>
    </div>
  );
}

export default MainCoinsHoldingHistory;
