import { useEffect, useState } from "react";
import { User, Lock, Save, ShieldCheck } from "lucide-react";
import InputItem from "../../components/InputItem";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function SettingsPage() {
  // --- Array State Variables ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // --- Vairables ---
  const userId = localStorage.getItem("id");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // ---
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userDetails = () => {
    axios
      .get(`https://z-coins-backend.vercel.app/api/user/details/${userId}`)
      .then((response) => {
        console.log(response?.data);

        setFormData(response?.data?.user_details || {});
      })
      .catch(() => {});
  };

  useEffect(() => {
    userDetails();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    axios
      .put(`https://z-coins-backend.vercel.app/api/user/update/${userId}`, formData)
      .then((response) => {
        console.log(response?.data);
        setTimeout(() => {
          setIsSaving(false);
          userDetails();
          toast.success(response?.data?.message);
        }, 2500);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      });
  };

  const handlePassUpdate = (e) => {
    e.preventDefault();

    if (!password) {
      return;
    }

    setIsSaving(true);
    axios
      .put(`https://z-coins-backend.vercel.app/api/user/update-password/${userId}`, {
        password,
      })
      .then((response) => {
        console.log(response?.data);
        setTimeout(() => {
          setIsSaving(false);
          userDetails();
          setPassword("");
          toast.success(response?.data?.message);
        }, 2500);
      })
      .catch((error) => {
        setIsSaving(false);
        toast.error(error?.response?.data?.error || "Internal Server Error");
      });
  };

  return (
    <div className="space-y-8">
      <ToastContainer
        hideProgressBar
        autoClose={2500}
        position="top-center"
        theme="colored"
      />
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-blue-950 tracking-tight uppercase">
          Settings
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Update your personal and security information
        </p>
      </div>

      <form
        onSubmit={(e) => {
          handleSave(e);
          handlePassUpdate(e);
        }}
        className="space-y-6"
      >
        {/* --- Personal Information Section --- */}
        <section className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
            <User className="text-blue-900" size={20} />
            <h2 className="text-lg font-bold text-blue-950">
              Personal Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <InputItem
                id="firstName"
                label="First Name"
                name="firstName"
                onChange={handleFormDataChange}
                placeholder=" "
                type="text"
                value={formData.firstName}
              />
            </div>
            <div className="relative">
              <InputItem
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleFormDataChange}
                placeholder=" "
                type="text"
                value={formData.lastName}
              />
            </div>
            <div className="relative">
              <InputItem
                id="phone"
                label="Phone Number"
                name="phone"
                onChange={handleFormDataChange}
                placeholder=" "
                type="tel"
                value={formData.phone}
              />
            </div>
            <div className="relative">
              <InputItem
                id="email"
                label="Email Address"
                name="email"
                onChange={handleFormDataChange}
                placeholder=" "
                type="email"
                value={formData.email}
              />
            </div>
          </div>
        </section>

        {/* --- Security Section --- */}
        <section className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
            <Lock className="text-blue-900" size={20} />
            <h2 className="text-lg font-bold text-blue-950">
              Account Security
            </h2>
          </div>

          <div className="max-w-md relative">
            <input
              type="password"
              name="password"
              id="password"
              placeholder={" "}
              className="block w-full h-12 px-3 text-gray-900 bg-transparent border-2 border-gray-200 rounded-xl appearance-none
              focus:outline-none focus:ring-0 focus:border-blue-900 peer transition-colors"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label
              htmlFor="password"
              className="absolute text-gray-500 duration-300 transform translate-y-[-98%] top-1/2 z-10 origin-left left-3
              peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75 bg-white px-2 pointer-events-none"
            >
              Password
            </label>
            <p className="mt-2 text-[10px] text-slate-400 font-medium italic">
              Leave blank if you don't wish to change your current password.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <ShieldCheck className="text-emerald-600" size={18} />
            <p className="text-xs font-medium text-emerald-900">
              Your account is verified and secured with SSL encryption.
            </p>
          </div>
        </section>

        {/* --- Form Actions --- */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-blue-950 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-10 py-4 bg-blue-950 text-white rounded-2xl font-black shadow-xl shadow-blue-100
            hover:bg-blue-900 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Update Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;
