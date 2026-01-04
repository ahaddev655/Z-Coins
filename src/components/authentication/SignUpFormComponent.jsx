import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpFormComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePreview, setProfilePreview] = useState(""); // <-- preview URL

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userImage: null, // File object
  });

  const navigate = useNavigate();

  const fetchGoogleImageAsFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], "google-profile.jpg", { type: blob.type });
  };

  // handleInputChange
  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setProfilePreview(URL.createObjectURL(files[0])); // Show preview
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("All fields are required...");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Email is invalid");
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

    if (formData.userImage) {
      newUserData.append("userImage", formData.userImage);
    }

    if (formData.userImageUrl) {
      newUserData.append("userImageUrl", formData.userImageUrl);
    }

    axios
      .post("https://z-coins-backend.vercel.app/api/auth/register", newUserData)
      .then((res) => {
        toast.success(res?.data?.message);
        localStorage.setItem("sessionToken", res.data.token);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("holdingValue", 10000);
        setFormData({
          fullName: "",
          email: "",
          password: "",
          userImage: null,
        });
        setConfirmPassword("");
        setProfilePreview("");
        setTimeout(() => {
          navigate("/main/");
        }, 3500);
      })
      .catch((err) => {
        console.error("Error in Sign-Up API:", err);

        const message =
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";

        toast.error(message);
      });
  };

  // handleGoogleSubmit
  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`,
        )
        .then((googleRes) => {
          return fetchGoogleImageAsFile(googleRes.data.picture).then(
            (googleFile) => {
              setFormData((prev) => ({
                ...prev,
                fullName: googleRes.data.name || "",
                email: googleRes.data.email || "",
                userImage: googleFile,
              }));

              setProfilePreview(URL.createObjectURL(googleFile));
              toast.info("Please fill the other details...");
            },
          );
        })
        .catch((err) => {
          console.error("Google register error:", err);
          toast.error("Google register failed");
        });
    },
    onError: () => {
      toast.error("Google Sign-In Failed");
    },
  });

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      {/* Profile Image */}
      <div className="flex gap-.5 flex-col">
        {profilePreview ? (
          <img
            src={profilePreview}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover mb-2 mx-auto"
          />
        ) : (
          <>
            <label className="text-charcoal-stone">Profile Image</label>
            <input
              type="file"
              name="userImage"
              accept="image/*"
              onChange={handleInputChange}
              className="py-2 px-2 shadow-sm focus:scale-101 transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
            />
          </>
        )}
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
          className="py-2 px-2 shadow-sm focus:scale-101 transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
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
          className="py-2 px-2 shadow-sm focus:scale-101 transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
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
          className="py-2 px-2 shadow-sm focus:scale-101 transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
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
          className="py-2 px-2 shadow-sm focus:scale-101 transition-all border-2 border-royal-azure text-charcoal-stone rounded-md focus:ring-2 focus:ring-royal-azure"
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
      {/* Google login button */}
      <button
        type="button"
        onClick={handleGoogleSubmit}
        className="flex h-14 gap-2 px-4 w-full rounded-sm text-crimson-fire items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow"
      >
        <FaGoogle className="w-5 h-5" />
        <p className="text-lg font-medium">Continue with Google</p>
      </button>
      <div className="w-full">
        <button
          type="submit"
          className="w-full bg-oceanic-blue text-cloud-white h-12 rounded-sm text-lg font-medium hover:shadow-lg ease-linear hover:scale-101 transition-all"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export default SignUpFormComponent;
