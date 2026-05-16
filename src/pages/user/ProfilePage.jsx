import {
  User,
  Mail,
  Phone,
  Hash,
  Wallet,
  TrendingUp,
  Copy,
  Clock,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function ProfilePage() {
  // --- API Configuration ---
  const [userData, setUserData] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(true);

  const userName = (fname, lname) => {
    const first = (fname || "")?.slice(0, 1);
    const last = (lname || "")?.slice(0, 1);
    const uname = `${first}${last}`.toUpperCase();
    return uname;
  };
  const userId = localStorage.getItem("id");
  const userDetails = () => {
    setIsUserLoading(true);
    axios
      .get(`http://localhost:5000/api/user/details/${userId}`)
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

  const handleCopyUID = () => {
    navigator.clipboard.writeText(userData.uid);
  };

  useEffect(() => {
    if (userId) userDetails();
    else setIsUserLoading(false);
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      {/* --- Main Profile Header Card --- */}
      <div className="relative bg-blue-950 rounded-[40px] p-10 overflow-hidden shadow-2xl text-white">
        {/* Abstract Glow Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20" />

        <div className="relative flex flex-col md:flex-row items-center gap-10">
          {/* Large Avatar Circle */}
          <div className="h-32 w-32 bg-linear-to-br from-blue-400 to-blue-600 rounded-[35%] flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white/10">
            {isUserLoading
              ? ""
              : userName(userData?.firstName, userData?.lastName)}
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              {isUserLoading ? (
                <>
                  <div className="flex gap-3">
                    <span className="h-4 w-28 rounded bg-slate-200/30 inline-block" />
                    <span className="h-4 w-40 rounded bg-slate-200/30 inline-block" />
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-black tracking-tight mb-1">
                    {userData?.firstName || ""} {userData?.lastName || ""}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-blue-300 font-bold text-sm">
                    <Mail size={14} />
                    {userData?.email || "No email"}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button
                onClick={handleCopyUID}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold transition-all border border-white/5"
              >
                <Hash size={14} className="text-blue-400" /> UID:{" "}
                {isUserLoading ? (
                  <span className="h-4 w-40 rounded bg-slate-200/30 inline-block" />
                ) : (
                  <>
                    {userData.uid} <Copy size={12} />
                  </>
                )}
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl text-xs font-bold border border-white/5">
                <Clock size={14} className="text-blue-400" /> Member since
                {isUserLoading ? (
                  <span className="h-4 w-40 rounded bg-slate-200/30 inline-block" />
                ) : (
                  <>
                    {" "}
                    {userData.user_created_at
                      ?.slice(0, 10)
                      .replaceAll("-", " / ")}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Financial & Personal Data Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial Overview Section */}
        <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={20} className="text-blue-900" />
            <h2 className="text-lg font-black text-blue-950 uppercase tracking-tight">
              Portfolio
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">
                Total Balance
              </p>
              <h3 className="text-3xl font-black text-blue-950">
                {isUserLoading ? (
                  <span className="h-4 w-40 rounded bg-slate-300 animate-pulse inline-block" />
                ) : (
                  <>${Number(userData?.userBalance || 0).toLocaleString()}</>
                )}
              </h3>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
                Total PNL (Profit/Loss)
              </p>
              <div className="flex items-center gap-2 text-xl font-black text-emerald-700">
                <TrendingUp size={20} />
                {isUserLoading ? (
                  <span className="h-4 w-40 rounded bg-green-200 animate-pulse inline-block" />
                ) : (
                  <>{userData.pnl || 0}</>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <User size={20} className="text-blue-900" />
            <h2 className="text-lg font-black text-blue-950 uppercase tracking-tight">
              Personal
            </h2>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <User size={18} className="text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Full Name
                </p>
                <p className="text-blue-950 font-bold">
                  {isUserLoading ? (
                    <span className="h-4 w-40 rounded bg-slate-300 animate-pulse inline-block" />
                  ) : (
                    <>
                      {userData.firstName} {userData.lastName}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <Phone size={18} className="text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Phone Number
                </p>
                <p className="text-blue-950 font-bold">
                  {isUserLoading ? (
                    <span className="h-4 w-40 rounded bg-slate-300 animate-pulse inline-block" />
                  ) : (
                    <>{userData.phone}</>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <Mail size={18} className="text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Primary Email
                </p>
                <p className="text-blue-950 font-bold">
                  {isUserLoading ? (
                    <span className="h-4 w-40 rounded bg-slate-300 animate-pulse inline-block" />
                  ) : (
                    <>{userData.email}</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
