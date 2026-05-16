import axios from "axios";
import { Menu, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserHeader({ setOffCanvasToggle }) {
  const [userData, setUserData] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(true);

  const userName = (fname, lname) => {
    const first = (fname || "").slice(0, 1);
    const last = (lname || "").slice(0, 1);
    const uname = `${first}${last}`.toUpperCase();
    return uname;
  };
  const userId = localStorage.getItem("id");
  const userDetails = () => {
    setIsUserLoading(true);
    axios
      .get(`http://z-coins-backend.vercel.app/api/user/details/${userId}`)
      .then((response) => {
        console.log(response?.data);

        setUserData(response?.data?.user_details || {});
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => {
          setIsUserLoading(false);
        }, 2000);
      });
  };
  useEffect(() => {
    if (userId) userDetails();
    else setIsUserLoading(false);
  }, [userId]);
  return (
    <header
      className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-4
      backdrop-blur-md sm:px-8"
    >
      {/* --- Heading --- */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOffCanvasToggle(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-all hover:bg-slate-100
          lg:hidden active:scale-95"
        >
          <Menu size={22} />
        </button>

        {/* Text Content */}
        <div className="flex flex-col">
          <h1 className="text-lg font-black tracking-tight text-blue-950 sm:text-xl">
            Portfolio Overview
          </h1>
          <p className="hidden text-[11px] font-medium uppercase tracking-widest text-slate-400 sm:block">
            Welcome back, {userData.firstName}
          </p>
        </div>
      </div>

      {/* --- Notifications & Profile --- */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button
          className="relative h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50
        hover:text-blue-900 transition-colors flex"
        >
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        {/* Profile Section */}
        <Link to={"/u/profile"}>
          <div className="flex items-center gap-3 pl-3 sm:border-l sm:border-slate-100">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-sm font-bold text-blue-950">
                {userData.firstName} {userData.lastName}
              </span>
              <span className="text-[12px] w-24 truncate font-medium text-slate-400">
                {userData.email}
              </span>
            </div>

            {/* Avatar Icon */}
            <div
              className="h-10 w-10 font-bold rounded-xl bg-blue-50 flex items-center justify-center text-blue-900 hover:bg-blue-100
            transition-colors border border-blue-100/50 shadow-sm"
            >
              AR
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default UserHeader;
