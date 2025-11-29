import React, { useEffect, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

function MainHeaderComponent() {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/main/":
        setTitle("Dashboard");
        break;

      case "/main/portfolio":
        setTitle("Portfolio");
        break;

      case "/main/market":
        setTitle("Market");
        break;

      default:
        setTitle("");
        break;
    }
  }, [location.pathname]);

  return (
    <div className="xl:px-12 lg:px-6 md:px-3 sm:px-1.5 px-1 h-20 py-2 flex items-center justify-between shadow-lg border-b-2 border-silver-fog">
      {/* Title */}
      <div>
        <h1 className="text-[30px] font-montserrat text-charcoal-stone font-semibold">
          {title}
        </h1>
      </div>

      {/* Profile */}
      <Link
        to={"/profile"}
        className="hover:bg-royal-azure/70 hover:text-white text-royal-azure transition-colors w-13 h-13 rounded-full grid place-items-center"
      >
        <LuUserRound className="w-[25px] h-[25px]" />
      </Link>
    </div>
  );
}

export default MainHeaderComponent;
