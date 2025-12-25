import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut, LuUserRound } from "react-icons/lu";
import { TbRulerMeasure2 } from "react-icons/tb";
import { VscPieChart } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

function MainSidebarComponent() {
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [userProfile, setUserProfile] = useState({
    userImage: "",
    fullName: "",
    email: "",
    mobileNumber: "",
  });
  const userId = localStorage.getItem("userId");

  const getUserDetails = async () => {
    axios
      .get(`https://z-coins-backend.vercel.app/api/users/one-user/${userId}`)
      .then((res) => {
        console.log("User Data Details: ", res.data.user);
        setUserProfile(res.data.user);
      })
      .catch((err) => {
        console.error("User Details API Error One: ", err);
      });
  };

  const logOutFunction = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  return (
    <>
      {/* Sidebar */}
      <div className="lg:w-[20%] min-h-screen border-r-2 border-silver-fog shadow-xl py-3 md:block hidden relative">
        {/* Logo */}
        <NavLink end to={"/main/"} className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/assets/favicon.png"
              alt="Favicon"
              className="w-[54px] h-[54px]"
            />
            <h1 className="font-bold font-montserrat text-[30px] text-charcoal-stone">
              Z Coins
            </h1>
          </div>
        </NavLink>
        <hr className="my-3 border border-silver-fog" />
        <div className="px-3 flex flex-col">
          <ul className="space-y-3 flex flex-col">
            <li>
              <NavLink
                end
                to="/main/"
                className={({ isActive }) =>
                  `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-royal-azure text-white"
                      : "hover:bg-royal-azure hover:text-white"
                  }`
                }
              >
                <AiOutlineHome className="w-[25px] h-[25px]" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/main/portfolio"
                className={({ isActive }) =>
                  `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-royal-azure text-white"
                      : "hover:bg-royal-azure hover:text-white"
                  }`
                }
              >
                <VscPieChart className="w-[25px] h-[25px]" /> Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/main/market"
                className={({ isActive }) =>
                  `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-royal-azure text-white"
                      : "hover:bg-royal-azure hover:text-white"
                  }`
                }
              >
                <AiOutlineLineChart className="w-[25px] h-[25px]" /> Market
              </NavLink>
            </li>
            <li
              onClick={() => setProfilePopUp(true)}
              to="/main/profile"
              className="text-xl flex items-center gap-2 p-3 hover:bg-royal-azure hover:text-white rounded-md transition-colors"
            >
              <LuUserRound className="w-[25px] h-[25px]" /> Profile
            </li>
            <li>
              <NavLink
                end
                to="/main/settings"
                className={({ isActive }) =>
                  `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-royal-azure text-white"
                      : "hover:bg-royal-azure hover:text-white"
                  }`
                }
              >
                <IoSettingsOutline className="w-[25px] h-[25px]" /> Settings
              </NavLink>
            </li>
            <li
              onClick={logOutFunction}
              className="mt-auto text-xl flex items-center gap-2 p-3 rounded-md transition-colors bg-royal-azure
            text-white cursor-pointer"
            >
              <LuLogOut className="w-[25px] h-[25px]" />
              Log Out
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Canvas */}
      <div
        className="md:hidden fixed bottom-0 py-2 bg-cloud-white shadow-[0px_0px_20px_#343a40] border-2 border-silver-fog z-50
      w-full flex items-center justify-center"
      >
        <ul className="space-x-3 flex items-center justify-center">
          <li>
            <NavLink
              end
              to="/main/"
              className={({ isActive }) =>
                `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-royal-azure text-white"
                    : "hover:bg-royal-azure hover:text-white"
                }`
              }
            >
              <AiOutlineHome className="w-[25px] h-[25px]" />
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/main/portfolio"
              className={({ isActive }) =>
                `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-royal-azure text-white"
                    : "hover:bg-royal-azure hover:text-white"
                }`
              }
            >
              <VscPieChart className="w-[25px] h-[25px]" />
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/main/market"
              className={({ isActive }) =>
                `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-royal-azure text-white"
                    : "hover:bg-royal-azure hover:text-white"
                }`
              }
            >
              <AiOutlineLineChart className="w-[25px] h-[25px]" />
            </NavLink>
          </li>
          <li
            onClick={() => setProfilePopUp(true)}
            to="/main/profile"
            className="text-xl flex hover:bg-royal-azure hover:text-white items-center gap-2 p-3 rounded-md transition-colors"
          >
            <LuUserRound className="w-[25px] h-[25px]" />
          </li>
          <li>
            <NavLink
              end
              to="/main/settings"
              className={({ isActive }) =>
                `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-royal-azure text-white"
                    : "hover:bg-royal-azure hover:text-white"
                }`
              }
            >
              <IoSettingsOutline className="w-[25px] h-[25px]" />
            </NavLink>
          </li>
          <li
            onClick={logOutFunction}
            className="mt-auto text-xl flex items-center gap-2 p-3 rounded-md transition-colors bg-royal-azure
            text-white cursor-pointer"
          >
            <LuLogOut className="w-[25px] h-[25px]" />
          </li>
        </ul>
      </div>
      {/* Profile PopUp */}
      <div
        onClick={() => setProfilePopUp(false)}
        className={`transition-all ease-in-out duration-500 fixed top-0 flex items-center justify-center h-screen w-full bg-black/50 backdrop-blur-md left-0  ${
          profilePopUp ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
      >
        <div
          className={`w-md bg-oceanic-blue rounded-xl py-6 text-center transition-all ease-in-out duration-500 ${
            profilePopUp
              ? "opacity-100 translate-y-0"
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="flex justify-center">
            <img
              src={userProfile?.userImage || "/assets/default-user.png"}
              className="w-30 h-30 rounded-full"
              alt={userProfile?.fullName || "User"}
            />
          </div>
          <h1 className="md:text-3xl text-xl mt-3 text-white font-semibold">
            {userProfile?.fullName}
          </h1>

          <p className="text-white text-sm md:text-base mt-2">
            {userProfile?.email}
          </p>

          <p className="text-white text-sm md:text-base mt-1">
            {userProfile?.mobileNumber}
          </p>
        </div>
      </div>
    </>
  );
}

export default MainSidebarComponent;
