import React, { useState, useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS is imported

function EditProfileComponent() {
  const [userData, setUserData] = useState({
    fullName: "Muhammad Ahad",
    email: "ahad97140@gmail.com",
    mobileNumber: "03165837272",
    userImage: "/assets/dummy user img.png",
  });

  const [editProfile, setEditProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    userImage: "",
  });

  // FIX: Sync form data when the modal opens
  useEffect(() => {
    if (editProfile) {
      setEditFormData({
        fullName: userData.fullName,
        email: userData.email,
        mobileNumber: userData.mobileNumber,
        userImage: userData.userImage,
      });
    }
  }, [editProfile, userData]);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FIX: Handle Image Upload correctly
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary preview URL
      setEditFormData((prev) => ({
        ...prev,
        userImage: imageUrl,
      }));
    }
  };

  const handleSaveProfile = () => {
    // Basic validation
    if (!editFormData.fullName.trim())
      return toast.error("Full name is required");
    if (!editFormData.email.trim()) return toast.error("Email is required");
    if (!editFormData.mobileNumber.trim())
      return toast.error("Mobile number is required");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editFormData.email)) {
      return toast.error("Please enter a valid email address");
    }

    // Mobile number validation
    const mobileRegex = /^[0-9]{11}$/;
    if (!mobileRegex.test(editFormData.mobileNumber)) {
      return toast.error("Please enter a valid 11-digit mobile number");
    }

    // Save changes
    setUserData({ ...editFormData });
    toast.success("Profile updated successfully!");
    setEditProfile(false);
  };

  return (
    <>
      <ToastContainer transition={Bounce} />

      <div className="md:w-xl w-full rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3">
        <div className="text-end">
          <button
            onClick={() => setEditProfile(true)}
            className="bg-royal-azure text-white rounded-md px-6 py-3 hover:shadow-lg transition-all"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex justify-between items-center gap-3">
          <h4 className="font-medium">Profile Image</h4>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-royal-azure">
            <img
              src={userData.userImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <h4 className="font-medium">Full name</h4>
          <h5 className="text-royal-azure">{userData.fullName}</h5>
        </div>

        <div className="flex justify-between items-center gap-3">
          <h4 className="font-medium">Email</h4>
          <h5 className="text-royal-azure">{userData.email}</h5>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center transition-all ${
          editProfile ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setEditProfile(false)}
      >
        <div
          className="md:w-md w-sm bg-white rounded-md p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border">
              <img
                src={editFormData.userImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium">Full Name</label>
              <input
                name="fullName"
                value={editFormData.fullName}
                onChange={handleEditInputChange}
                className="py-2 px-3 border rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Email Address</label>
              <input
                name="email"
                value={editFormData.email}
                onChange={handleEditInputChange}
                className="py-2 px-3 border rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Mobile Number</label>
              <input
                name="mobileNumber"
                value={editFormData.mobileNumber}
                onChange={handleEditInputChange}
                className="py-2 px-3 border rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setEditProfile(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-royal-azure text-white rounded-md"
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
