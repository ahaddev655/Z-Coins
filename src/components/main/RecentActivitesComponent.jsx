import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

function RecentActivitesComponent() {
  const initialActivities = [
    "You sold BTC",
    "You bought ETH",
    "You sold BTC",
    "You bought ETH",
  ];

  const [recentActivities, setRecentActivities] = useState(initialActivities);

  const deleteActivity = (indexToDelete) => {
    setRecentActivities((prevActivities) =>
      prevActivities.filter((_, index) => index !== indexToDelete),
    );
  };

  const clearAllActivities = () => {
    setRecentActivities([]);
  };

  return (
    <div className="h-[413px] overflow-y-auto bg-white col-span-1 shadow-lg rounded-lg md:p-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Recent Activities</h1>
        <button
          type="button"
          className="hover:text-royal-azure transition-colors duration-200 ease-in-out font-medium"
          onClick={clearAllActivities}
        >
          Clear All
        </button>
      </div>

      {/* Show message when no activities exist */}
      {recentActivities.length === 0 ? (
        <div className="mt-5 text-center text-gray-500">
          No recent activities
        </div>
      ) : (
        // Render activities list
        recentActivities.map((activity, i) => (
          <div className="mt-5" key={i}>
            <div className="flex items-center justify-between gap-5">
              <h1 className="">{activity}</h1>
              <button
                type="button"
                onClick={() => deleteActivity(i)}
                aria-label={`Delete activity: ${activity}`}
              >
                <FaXmark className="w-5 h-5 hover:text-royal-azure transition-colors duration-200 ease-in-out" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentActivitesComponent;
