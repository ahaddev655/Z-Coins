import React from "react";
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";
import { LuLogOut, LuUserRound } from "react-icons/lu";
import { VscPieChart } from "react-icons/vsc";
import { Link, NavLink } from "react-router-dom";

function MainSidebarComponent() {
  return (
    <div className="lg:w-[20%] min-h-screen border-r-2 border-silver-fog shadow-xl py-3 md:block hidden">
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
        <ul className="space-y-3">
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
        </ul>
      </div>
    </div>
  );
}

export default MainSidebarComponent;
