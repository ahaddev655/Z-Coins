import axios from "axios";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpFormComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userImage: "",
    mobileNumber: "",
  });
  const navigate = useNavigate();

  // handleInputChange
  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.mobileNumber
    ) {
      toast.error("All fields are required...");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Email is invalid");
      return;
    }

    if (/[a-zA-Z]/.test(formData.mobileNumber)) {
      toast.error("Phone Number cannot contain alphabets");
      return;
    }

    if (formData.mobileNumber.length !== 11) {
      toast.error("Phone Number length is invalid");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password should be 8 characters long");
      return;
    }

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const newUserData = new FormData();
    newUserData.append("fullName", formData.fullName);
    newUserData.append("email", formData.email);
    newUserData.append("password", formData.password);
    newUserData.append("userImage", formData.userImage);
    newUserData.append("mobileNumber", formData.mobileNumber);

    axios
      .post("https://z-coins-backend.vercel.app/api/auth/register", newUserData)
      .then((res) => {
        toast.success(res?.data?.message);
        localStorage.setItem("sessionToken", res.data.token);
        localStorage.setItem("userRole", res.data.role);
        setTimeout(() => {
          navigate("/main/");
        }, 3500);
      })
      .catch((err) => {
        console.error("Error in Sign-Up API: ", err);

        toast.error(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Something went wrong"
        );
      });
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      {/* userImage */}
      <div className="flex gap-.5 flex-col">
        <label htmlFor="userImage" className="text-charcoal-stone">
          Profile Image
        </label>
        <input
          type="file"
          name="userImage"
          id="userImage"
          placeholder="Enter your profile image"
          className="py-2 px-2 shadow-sm focus:scale-101 transition-all border-2 border-royal-azure text-charcoal-stone rounded-md 
  focus:ring-2 focus:ring-royal-azure"
          onChange={handleInputChange}
        />
      </div>
      {/* fullName */}
      <div className="flex gap-.5 flex-col">
        <label htmlFor="fullName" className="text-charcoal-stone">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={formData.fullName}
          placeholder="Enter your full name"
          className="py-2 px-2 shadow-sm focus:scale-101 transition-all border-2 border-royal-azure text-charcoal-stone rounded-md 
          focus:ring-2 focus:ring-royal-azure"
          onChange={handleInputChange}
        />
      </div>
      {/* email */}
      <div className="flex gap-.5 flex-col">
        <label htmlFor="email" className="text-charcoal-stone">
          Email
        </label>
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          id="email"
          value={formData.email}
          className="py-2 px-2 shadow-sm focus:scale-101 transition-all
                  border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
          onChange={handleInputChange}
        />
      </div>
      {/* password */}
      <div className="flex gap-.5 flex-col relative">
        <label htmlFor="password" className="text-charcoal-stone">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={formData.password}
          name="password"
          id="password"
          className="py-2 px-2 shadow-sm focus:scale-101 
                  transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
          onChange={handleInputChange}
        />
        {showPassword ? (
          <LuEyeClosed
            onClick={() => setShowPassword(!showPassword)}
            className="w-6 h-6 text-royal-azure hover:text-indigo-wave cursor-pointer absolute top-[35px] right-2"
          />
        ) : (
          <LuEye
            onClick={() => setShowPassword(!showPassword)}
            className="w-6 h-6 text-royal-azure hover:text-indigo-wave cursor-pointer absolute top-[35px] right-2"
          />
        )}
      </div>
      {/* confirmPassword */}
      <div className="flex gap-.5 flex-col relative">
        <label htmlFor="confirmPassword" className="text-charcoal-stone">
          Confirm Password
        </label>
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
            className="w-6 h-6 text-royal-azure hover:text-indigo-wave cursor-pointer absolute top-[35px] right-2"
          />
        ) : (
          <LuEye
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="w-6 h-6 text-royal-azure hover:text-indigo-wave cursor-pointer absolute top-[35px] right-2"
          />
        )}
      </div>
      {/* mobileNumber */}
      <div className="flex gap-.5 flex-col">
        <label htmlFor="mobileNumber" className="text-charcoal-stone">
          Mobile Number
        </label>
        <input
          value={formData.mobileNumber}
          type="tel"
          placeholder="Enter your mobile number"
          name="mobileNumber"
          id="mobileNumber"
          className="py-2 px-2 shadow-sm focus:scale-101
                  transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
          onChange={handleInputChange}
        />
      </div>
      {/* continueWith */}
      <div className="justify-center items-center gap-1.5 sm:flex hidden">
        <div className="w-[33%] h-0.5 bg-slate-mist rounded-md" />
        <p className="text-sm text-slate-mist font-medium">Or continue with</p>
        <div className="w-[33%] h-0.5 bg-slate-mist rounded-md" />
      </div>
      {/* continue with google */}
      <div className="flex h-14 gap-2 rounded-sm text-crimson-fire items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow">
        <FaGoogle className="w-5 h-5" />
        <p className="text-lg font-medium">Continue with google</p>
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full bg-oceanic-blue text-cloud-white h-12 rounded-sm text-lg font-medium hover:shadow-lg ease-linear
                  hover:scale-101 transition-all"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export default SignUpFormComponent;
