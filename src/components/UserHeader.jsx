import { Menu, Bell } from "lucide-react";
import { Link } from "react-router-dom";

function UserHeader({ setOffCanvasToggle }) {
  return (
    <header
      className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-4
      backdrop-blur-md sm:px-8"
    >
      {/* --- Left Side: Hamburger & Heading --- */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu (Visible only on mobile/tablet) */}
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
            Welcome back, Alex
          </p>
        </div>
      </div>

      {/* --- Right Side: Notifications & Profile --- */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Notification Icon (Common in Trading Apps) */}
        <button
          className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50
        hover:text-blue-900 transition-colors sm:flex"
        >
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        {/* Profile Section */}
        <Link to={"/u/profile"}>
          <div className="flex items-center gap-3 pl-3 sm:border-l sm:border-slate-100">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-sm font-bold text-blue-950">
                Alex Rivera
              </span>
              <span className="text-[12px] w-19 truncate font-medium text-slate-400">
                alex.rivera@example.com
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
