import React, { useState } from "react";

function EditProfileComponent() {
  const [userImage, setUserImage] = useState("/assets/dummy user img.png");

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Handle save profile changes
  const handleSaveProfile = () => {
    // Basic validation
    if (!editFormData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!editFormData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!editFormData.mobileNumber.trim()) {
      toast.error("Mobile number is required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editFormData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Mobile number validation (basic)
    const mobileRegex = /^[0-9]{11}$/;
    if (!mobileRegex.test(editFormData.mobileNumber)) {
      toast.error("Please enter a valid 11-digit mobile number");
      return;
    }

    // Save changes
    setUserData({
      ...userData,
      fullName: editFormData.fullName,
      email: editFormData.email,
      mobileNumber: editFormData.mobileNumber,
    });

    // Show success message
    toast.success("Profile updated successfully!");

    // Close the popup
    setEditProfile(false);
  };
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
  return (
    <>
      <div className="md:w-xl w-full rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3">
        {/* Edit Button */}
        <div className="text-end">
          <button
            onClick={() => setEditProfile(true)}
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
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-royal-azure">
            <img
              src={userImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* fullName */}
        <div className="flex justify-between items-center gap-3">
          <h4 className="text-charcoal-stone font-medium">Full name</h4>
          <h5 className="font-medium text-royal-azure">{userData.fullName}</h5>
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
      {/* Edit Profile Popup Modal */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md flex justify-center items-center transition-opacity duration-300 ease-in-out ${
          editProfile ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
        onClick={() => setEditProfile(false)}
      >
        <div
          className={`md:w-md w-sm bg-white rounded-md transition-all duration-300 ease-in-out p-6 border-2 border-slate-mist shadow-2xl ${
            editProfile
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-charcoal-stone">
              Edit Profile
            </h2>
            <button
              onClick={() => setEditProfile(false)}
              className="text-slate-mist hover:text-charcoal-stone text-xl"
            >
              ✕
            </button>
          </div>

          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-royal-azure">
              <img
                src={userImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-royal-azure text-white p-1 rounded-full hover:bg-indigo-wave">
                <span className="text-xs">✏️</span>
              </button>
            </div>
            <p className="text-sm text-slate-mist mt-2">
              Click to change profile picture
            </p>
          </div>

          {/* Edit Form Fields */}
          <div className="space-y-4">
            {/* Full Name */}
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="fullName"
                className="text-charcoal-stone font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={editFormData.fullName}
                onChange={handleEditInputChange}
                className="py-2 px-3 border-2 border-slate-mist rounded-md focus:border-royal-azure focus:ring-2 focus:ring-royal-azure transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="email"
                className="text-charcoal-stone font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditInputChange}
                className="py-2 px-3 border-2 border-slate-mist rounded-md focus:border-royal-azure focus:ring-2 focus:ring-royal-azure transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="mobileNumber"
                className="text-charcoal-stone font-medium"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={editFormData.mobileNumber}
                onChange={handleEditInputChange}
                className="py-2 px-3 border-2 border-slate-mist rounded-md focus:border-royal-azure focus:ring-2 focus:ring-royal-azure transition-all"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setEditProfile(false)}
              className="px-6 py-2 border-2 border-slate-mist text-charcoal-stone rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2 bg-royal-azure text-white rounded-md hover:bg-indigo-wave hover:shadow-md hover:shadow-royal-azure/50 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfileComponent;
