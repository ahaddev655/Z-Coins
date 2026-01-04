import axios from "axios";
import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Bounce, toast, ToastContainer } from "react-toastify";

function ChangePasswordComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [password, setPassword] = useState(null);
  const userId = localStorage.getItem("userId");
  // Handle password change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    axios
      .put(
        `https://z-coins-backend.vercel.app/api/users/change-password/${userId}`,
        {
          password,
        },
      )
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.error("Update password error:", err);
        toast.error(
          err?.response?.data?.message || "Failed to update password",
        );
      });

    // Reset password fields
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="light"
        transition={Bounce}
      />
      <form
        className="md:w-xl w-full rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3"
        onSubmit={handleChangePassword}
      >
        {/* password */}
        <div className="flex flex-col space-y-1.5 relative">
          <h4 className="text-charcoal-stone font-medium">New Password</h4>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={password}
            name="password"
            id="password"
            className="py-2 px-2 shadow-sm focus:scale-101 
              transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
            onChange={(e) => setPassword(e.target.value)}
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
          <h4 className="text-charcoal-stone font-medium">Confirm Password</h4>
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
          type="submit"
          className="bg-green-600 hover:scale-102 text-white rounded-md px-6 py-3 transition-all ease-linear
            duration-200 hover:shadow-md hover:shadow-emerald-leaf"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}

export default ChangePasswordComponent;
