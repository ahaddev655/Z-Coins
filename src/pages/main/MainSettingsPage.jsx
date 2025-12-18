import React, { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditProfileComponent from './../../components/EditProfileComponent';

function MainSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsToggle, setSettingsToggle] = useState("account");
  const [userImage, setUserImage] = useState("/assets/dummy user img.png");
  const [userData, setUserData] = useState({
    fullName: "Muhammad Ahad",
    email: "ahad97140@gmail.com",
    mobileNumber: "03165837272",
  });
  const [editProfile, setEditProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
  });

  // Initialize edit form data when userData changes
  useEffect(() => {
    setEditFormData({
      fullName: userData.fullName,
      email: userData.email,
      mobileNumber: userData.mobileNumber,
    });
  }, [userData]);

  // Delete Account
  const deleteAccFunction = () => {
    localStorage.removeItem("sessionToken");
    window.location.reload();
  };

  // Handle password change
  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // In a real app, you would make an API call here
    toast.success("Password changed successfully!");

    // Reset password fields
    setNewPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    const loginAuthority = localStorage.getItem("loginAuthority");
    if (loginAuthority === "0") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col page items-center justify-center">
      {/* Nav Tabs */}
      <div className="md:w-xl w-full rounded-t-2xl bg-white shadow-md p-3">
        <ul className="flex items-center justify-between md:gap-6 gap-1">
          <li
            onClick={() => setSettingsToggle("account")}
            className={`text-center text-sm font-medium cursor-pointer py-3 px-4 transition-colors ease-linear duration-150 ${
              settingsToggle === "account"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Account
          </li>
          <li
            onClick={() => setSettingsToggle("change-password")}
            className={`text-center text-sm font-medium cursor-pointer py-3 px-4 transition-colors ease-linear duration-150 ${
              settingsToggle === "change-password"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Change Password
          </li>
          <li
            onClick={() => setSettingsToggle("delete-account")}
            className={`text-center text-sm font-medium cursor-pointer py-3 px-4 transition-colors ease-linear duration-150 ${
              settingsToggle === "delete-account"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Delete Account
          </li>
        </ul>
      </div>

      {/* mainContent */}
      {settingsToggle === "account" && (
        <EditProfileComponent />
      )}

      {settingsToggle === "change-password" && (
        <div className="md:w-xl w-full rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3">
          {/* newPassword */}
          <div className="flex flex-col space-y-1.5 relative">
            <h4 className="text-charcoal-stone font-medium">New Password</h4>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={newPassword}
              name="newPassword"
              id="newPassword"
              className="py-2 px-2 shadow-sm focus:scale-101 
              transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {showPassword ? (
              <LuEyeClosed
                onClick={() => setShowPassword(!showPassword)}
                className="w-6 h-6 text-royal-azure hover:text-indigo-wave cursor-pointer absolute top-10 right-2"
              />
            ) : (
              <LuEye
                onClick={() => setShowPassword(!showPassword)}
                className="w-6 h-6 text-royal-azure hover:text-indigo-wave cursor-pointer absolute top-10 right-2"
              />
            )}
          </div>
          {/* confirmPassword */}
          <div className="flex flex-col space-y-1.5 relative">
            <h4 className="text-charcoal-stone font-medium">
              Confirm Password
            </h4>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-2 px-2 shadow-sm focus:scale-101 
              transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
            />
            {showConfirmPassword ? (
              <LuEyeClosed
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="w-6 h-6 text-royal-azure hover:text-indigo-wave cursor-pointer absolute top-10 right-2"
              />
            ) : (
              <LuEye
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="w-6 h-6 text-royal-azure hover:text-indigo-wave cursor-pointer absolute top-10 right-2"
              />
            )}
          </div>
          <button
            onClick={handleChangePassword}
            type="button"
            className="bg-green-600 hover:scale-102 text-white rounded-md px-6 py-3 transition-all ease-linear
            duration-200 hover:shadow-md hover:shadow-emerald-leaf"
          >
            Save Changes
          </button>
        </div>
      )}

      {settingsToggle === "delete-account" && (
        <div className="md:w-xl w-full rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3">
          <p className="text-xl font-medium text-charcoal-stone">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <p className="text-slate-mist text-sm">
            All your data will be permanently removed from our servers.
          </p>
          <button
            onClick={deleteAccFunction}
            type="button"
            className="bg-crimson-fire hover:scale-102 text-white rounded-md px-6 py-3 transition-all ease-linear
            duration-200 hover:shadow-md hover:shadow-crimson-fire/50"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}

export default MainSettingsPage;
