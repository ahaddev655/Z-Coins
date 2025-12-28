import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import AdminChartsComponent from "../../components/admin/AdminChartsComponent";
import RecentActivitiesComponent from "../../components/admin/RecentActivitiesComponent";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("sessionToken");
    const userRole = localStorage.getItem("userRole");
    if (!userToken && !userRole) {
      navigate("/");
      return;
    }
    if (userRole !== "admin" && userToken) {
      navigate("/main");
    }
  }, [navigate]);
  return (
    <div className="page w-full space-y-8">
      {/* Cards */}
      <div className="flex items-center gap-3 justify-center w-full">
        {Array(4)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className="cursor-pointer flex justify-between items-center h-[100px] bg-white shadow-lg hover:shadow-xl transition-shadow ease-in-out w-full
              p-3 rounded-md"
            >
              <div className="flex flex-col gap-1">
                <h1 className="font-medium text-lg">Users</h1>
                <h1 className="text-3xl font-semibold text-oceanic-blue">
                  1000
                </h1>
              </div>
              <div className="w-10 h-10 rounded-md bg-royal-azure text-white grid place-items-center">
                <FaUser />
              </div>
            </div>
          ))}
      </div>
      {/* Charts and Recent Activities */}
      <div className="md:grid grid-cols-3 gap-3">
        <AdminChartsComponent />
        <RecentActivitiesComponent />
      </div>
    </div>
  );
}

export default AdminDashboard;
