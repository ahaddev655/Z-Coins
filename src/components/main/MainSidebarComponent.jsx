import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut, LuUserRound } from "react-icons/lu";
import { MdHistory } from "react-icons/md";
import { VscPieChart } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

function MainSidebarComponent() {
  const [profilePopUp, setProfilePopUp] = useState(false);

  const [userProfile, setUserProfile] = useState({
    userImage: "",
    fullName: "",
    email: "",
    pnl: "",
  });
  const userId = localStorage.getItem("userId");

  const getUserDetails = async () => {
    axios
      .get(`https://z-coins-backend.vercel.app/api/users/one-user/${userId}`)
      .then((res) => {
        setUserProfile(res.data.user);
        const totalPnl = JSON.parse(localStorage.getItem("PNL")).reduce(
          (sum, item) => sum + item.pnl,
          0
        );
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          pnl: totalPnl,
        }));
      })
      .catch((err) => {
        console.error("User Details API Error One: ", err);
      });
  };

  const logOutFunction = () => {
    localStorage.removeItem("sessionToken");
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
              className="text-xl flex items-center gap-2 p-3 cursor-pointer hover:bg-royal-azure hover:text-white rounded-md transition-colors"
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
            <li>
              <NavLink
                end
                to="/main/coins-history"
                className={({ isActive }) =>
                  `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-royal-azure text-white"
                      : "hover:bg-royal-azure hover:text-white"
                  }`
                }
              >
                <MdHistory className="w-[25px] h-[25px]" /> History
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
        <ul className="sm:space-x-3 space-x-1 flex items-center justify-center">
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
            className="text-xl flex hover:bg-royal-azure cursor-pointer hover:text-white items-center gap-2 p-3 rounded-md transition-colors"
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
          className={`w-md bg-cloud-white shadow-2xl rounded-xl py-6 text-center transition-all ease-in-out duration-500 p-4 ${
            profilePopUp
              ? "opacity-100 translate-y-0"
              : "translate-y-full opacity-0"
          }`}
        >
          {userProfile ? (
            <>
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Profile Picture</h4>
                {userProfile.userImage ? (
                  <div className="w-20 h-20 rounded-full border">
                    <img
                      src={userProfile.userImage}
                      className="w-full h-full rounded-full"
                      alt={userProfile?.fullName || "User"}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-semibold uppercase">
                    {userProfile?.fullName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div className="mt-5 space-y-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Full Name</h4>
                  <span className="text-royal-azure font-medium">
                    {userProfile.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h4 className="font-medium">Email</h4>
                  <span className="text-royal-azure font-medium">
                    {userProfile.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h4 className="font-medium">PNL</h4>
                  <span
                    className={`font-medium flex items-center gap-0.5 ${
                      userProfile.pnl < 0
                        ? "text-crimson-fire"
                        : "text-emerald-leaf"
                    }`}
                  >
                    {userProfile.pnl > 0 ? "+" : ""}
                    {Number(userProfile.pnl)?.toFixed(2) || "0.0"}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-white text-lg">No data found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MainSidebarComponent;
