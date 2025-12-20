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
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // handleInputChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required...");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Email is invalid");
      return;
    }

    console.log("FormData: ", formData);
    toast.success("Welcome Back!");
    localStorage.setItem("sessionToken", "allow him");
    const userRole = localStorage.getItem("userRole");
    setTimeout(() => {
      if (userRole === "admin") {
        navigate("/66e5753c/");
      } else {
        navigate("/main/");
      }
    }, 3500);
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
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
          Login
        </button>
      </div>
    </form>
  );
}

export default SignUpFormComponent;
