import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EditProfileComponent from "../../components/main/EditProfileComponent";
import ChangePasswordComponent from "../../components/main/ChangePasswordComponent";
import DeleteAccountComponent from "../../components/main/DeleteAccountComponent";

function MainSettingsPage() {
  const navigate = useNavigate();

  const [settingsToggle, setSettingsToggle] = useState("account");

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col page items-center justify-center">
      {/* ================= NAV TABS ================= */}
      <div className="md:w-xl w-full rounded-t-2xl bg-white shadow-md p-3">
        <ul className="flex items-center justify-between md:gap-6 gap-1">
          <li
            onClick={() => setSettingsToggle("account")}
            className={`text-center text-sm font-medium cursor-pointer py-3 px-4 transition-colors duration-150 ${
              settingsToggle === "account"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Account
          </li>

          <li
            onClick={() => setSettingsToggle("change-password")}
            className={`text-center text-sm font-medium cursor-pointer py-3 px-4 transition-colors duration-150 ${
              settingsToggle === "change-password"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Change Password
          </li>

          <li
            onClick={() => setSettingsToggle("delete-account")}
            className={`text-center text-sm font-medium cursor-pointer py-3 px-4 transition-colors duration-150 ${
              settingsToggle === "delete-account"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Delete Account
          </li>
        </ul>
      </div>

      {/* ================= CONTENT ================= */}
      {settingsToggle === "account" && <EditProfileComponent />}

      {settingsToggle === "change-password" && <ChangePasswordComponent />}

      {settingsToggle === "delete-account" && <DeleteAccountComponent />}
    </div>
  );
}

export default MainSettingsPage;
