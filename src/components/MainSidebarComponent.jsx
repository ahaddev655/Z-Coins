import React from "react";
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut, LuUserRound } from "react-icons/lu";
import { VscPieChart } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

function MainSidebarComponent() {
  const logOutFunction = () => {
    localStorage.setItem("loginAuthority", 0);
    window.location.reload();
  };
  return (
    <>
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
            <li>
              <NavLink
                end
                to="/main/profile"
                className={({ isActive }) =>
                  `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-royal-azure text-white"
                      : "hover:bg-royal-azure hover:text-white"
                  }`
                }
              >
                <LuUserRound className="w-[25px] h-[25px]" /> Profile
              </NavLink>
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
          <li>
            <NavLink
              end
              to="/main/profile"
              className={({ isActive }) =>
                `text-xl flex items-center gap-2 p-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-royal-azure text-white"
                    : "hover:bg-royal-azure hover:text-white"
                }`
              }
            >
              <LuUserRound className="w-[25px] h-[25px]" />
            </NavLink>
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
    </>
  );
}

export default MainSidebarComponent;
