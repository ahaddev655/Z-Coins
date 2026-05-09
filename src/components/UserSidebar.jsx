import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, ChevronRight } from "lucide-react";

function UserSidebar({ linksArray, offCanvas, setOffCanvasToggle }) {
  const navigate = useNavigate();
  // --- Enhanced Tailwind Classes ---
  const activeLink =
    "flex items-center gap-3 px-4 py-3 bg-blue-50/80 text-blue-900 border-r-4 border-blue-900 shadow-sm transition-all duration-200";
  const normalLink =
    "flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-blue-900 transition-all duration-200";

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* --- Branding Header --- */}
      <div className="p-8 flex items-center gap-3">
        <div className="h-9 w-9 bg-blue-950 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <div className="h-4 w-4 bg-white rounded-sm rotate-45" />
        </div>
        <h2 className="text-2xl font-black text-blue-950 tracking-tighter">
          Z-Coins
        </h2>
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 px-4 space-y-2 mt-2">
        {linksArray.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            onClick={() => setOffCanvasToggle(false)}
            className={({ isActive }) =>
              `${isActive ? activeLink : normalLink} rounded-xl group`
            }
          >
            <link.icon
              size={20}
              className="group-hover:scale-110 transition-transform duration-200"
              strokeWidth={2.5}
            />
            <span className="font-bold text-sm">{link.text}</span>
          </NavLink>
        ))}
      </nav>

      {/* --- User Section --- */}
      <div className="p-6 mt-auto">
        <div className="flex items-center gap-3 p-3 mb-4 bg-slate-50 border border-slate-100 rounded-2xl">
          <div className="h-10 w-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-md shrink-0 font-medium text-lg">
            AR
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-blue-950 truncate">
              Alex Rivera
            </span>
            <span className="text-[11px] text-slate-400 font-medium truncate">
              alex.rivera@example.com
            </span>
          </div>
        </div>

        <button
          className="group flex items-center justify-between w-full px-5 py-3 text-sm font-bold text-red-500 bg-red-50/30 hover:bg-red-50 border border-red-100/50 rounded-2xl transition-all active:scale-[0.98]"
          onClick={() => navigate("/auth")}
        >
          <div className="flex items-center gap-2">
            <LogOut size={18} strokeWidth={2.5} />
            <span>Sign Out</span>
          </div>
          <ChevronRight
            size={14}
            className="opacity-40 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen border-r border-slate-100 sticky top-0 bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {offCanvas && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOffCanvasToggle(false)}
              className="absolute inset-0 bg-blue-950/40 backdrop-blur-md"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-end p-6">
                <button
                  onClick={() => setOffCanvasToggle(false)}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default UserSidebar;
