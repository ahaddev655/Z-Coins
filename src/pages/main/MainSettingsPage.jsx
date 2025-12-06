import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";

function MainSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
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
  return (
    <div className="flex flex-col page items-center justify-center">
      {/* Nav Tabs */}
      <div className="w-xl rounded-t-2xl bg-white shadow-md p-3">
        <ul className="flex items-center justify-between gap-6">
          <li
            onClick={() => setSettingsToggle("account")}
            className={`text-center font-medium cursor-pointer py-3 px-6 transition-colors ease-linear duration-150 ${
              settingsToggle === "account"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Account
          </li>
          <li
            onClick={() => setSettingsToggle("change-password")}
            className={`text-center font-medium cursor-pointer py-3 px-6 transition-colors ease-linear duration-150 ${
              settingsToggle === "change-password"
                ? "bg-royal-azure text-white rounded-4xl"
                : "text-slate-mist"
            }`}
          >
            Change Password
          </li>
          <li
            onClick={() => setSettingsToggle("delete-account")}
            className={`text-center font-medium cursor-pointer py-3 px-6 transition-colors ease-linear duration-150 ${
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
        <div className="w-xl rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3">
          {/* Edit Button */}
          <div className="text-end">
            <button
              type="button"
              className="bg-royal-azure hover:scale-102 text-white rounded-md px-6 py-3 transition-all ease-linear
            duration-200 hover:shadow-md hover:shadow-royal-azure/50"
            >
              Edit Profile
            </button>
          </div>
          {/* profileImage */}
          <div className="flex justify-between items-center gap-3">
            <h4 className="text-charcoal-stone font-medium">Profile Image</h4>
            <h5 className="font-medium text-royal-azure">
              <img src={userImage} alt="IMG" />
            </h5>
          </div>
          {/* fullName */}
          <div className="flex justify-between items-center gap-3">
            <h4 className="text-charcoal-stone font-medium">Full name</h4>
            <h5 className="font-medium text-royal-azure">
              {userData.fullName}
            </h5>
          </div>
          {/* email */}
          <div className="flex justify-between items-center gap-3">
            <h4 className="text-charcoal-stone font-medium">Email</h4>
            <h5 className="font-medium text-royal-azure">{userData.email}</h5>
          </div>
          {/* mobileNumber */}
          <div className="flex justify-between items-center gap-3">
            <h4 className="text-charcoal-stone font-medium">Mobile Number</h4>
            <h5 className="font-medium text-royal-azure">
              {userData.mobileNumber}
            </h5>
          </div>
        </div>
      )}
      {settingsToggle === "change-password" && (
        <div className="w-xl rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3">
          {/* newPassword */}
          <div className="flex flex-col space-y-1.5 relative">
            <h4 className="text-charcoal-stone font-medium">New Password</h4>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
              placeholder="Enter your password"
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
            type="button"
            className="bg-green-600 hover:scale-102 text-white rounded-md px-6 py-3 transition-all ease-linear
            duration-200 hover:shadow-md hover:shadow-emerald-leaf"
          >
            Save Changes
          </button>
        </div>
      )}
      {settingsToggle === "delete-account" && (
        <div className="w-xl rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3">
          <p className="text-xl font-medium text-charcoal-stone">
            Want to delete your account?
          </p>
          <button
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
