import React, { useEffect, useState } from "react";

function HoldedTradesComponent() {
  const [holdingData, setHoldingData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const data = JSON.parse(localStorage.getItem("yourCoins")) || [];
      setHoldingData(data);
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold mb-4 text-charcoal-stone">
          Your Holding Coins
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-medium text-charcoal-stone">
                    {coin.name}
                  </h1>
                  <h4 className="font-medium text-sm text-slate-mist">
                    {coin.shortForm}
                  </h4>
                </div>
                <div>
                  <h1 className="text-xl text-end font-medium text-royal-azure">
                    ${coin.amount.toFixed(2)}
                  </h1>
                  <h4 className="text-end font-medium text-sm text-slate-mist">
                    {coin.lots}
                  </h4>
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

export default HoldedTradesComponent;
