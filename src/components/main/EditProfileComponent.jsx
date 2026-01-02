import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfileComponent() {
  const userId = localStorage.getItem("userId");

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    userImage: "",
  });

  const [editProfile, setEditProfile] = useState(false);

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    userImage: "",
  });

  /* ================= FETCH USER ================= */
  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `https://z-coins-backend.vercel.app/api/users/one-user/${userId}`,
      );
      setUserData(res.data.user);
    } catch (error) {
      console.error("Fetch user error:", error);
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    if (userId) getUserDetails();
  }, [userId]);

  /* =============== OPEN EDIT MODAL =============== */
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

  /* =============== INPUT HANDLERS =============== */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setEditFormData((prev) => ({
      ...prev,
      imageFile: file,
      userImage: URL.createObjectURL(file),
    }));
  };

  /* ================= SAVE PROFILE ================= */
  const handleSaveProfile = (e) => {
    e.preventDefault();

    const { fullName, email, mobileNumber, imageFile } = editFormData;

    if (!fullName || !email || !mobileNumber) {
      return toast.error("All fields are required");
    }

    if (!email.includes("@")) {
      return toast.error("Invalid email address");
    }

    if (!/^[0-9]{11}$/.test(mobileNumber)) {
      return toast.error("Mobile number must be 11 digits");
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);

    if (imageFile) {
      formData.append("userImage", imageFile);
    }

    axios
      .put(
        `https://z-coins-backend.vercel.app/api/users/edit-user/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      )
      .then((res) => {
        setUserData(res.data.user);
        console.log(userData);
        toast.success(res?.data?.message || "Profile updated");
        setEditProfile(false);
      })
      .catch((err) => {
        console.error("Edit user error:", err);
        toast.error(err?.response?.data?.message || "Failed to update profile");
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="light"
        transition={Bounce}
      />

      {/* ================= PROFILE VIEW ================= */}
      <div className="md:w-xl w-full rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3">
        <div className="text-end">
          <button
            type="button"
            onClick={() => setEditProfile(true)}
            className="bg-royal-azure text-white rounded-md px-6 py-3 hover:shadow-lg"
          >
            Edit Profile
          </button>
        </div>
        {userData ? (
          <>
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Profile Image</h4>
              {userData.userImage ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border">
                  <img
                    src={userData.userImage}
                    className="w-full h-full"
                    alt={userData?.fullName || "User"}
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-semibold uppercase">
                  {userData?.fullName?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <h4 className="font-medium">Full Name</h4>
              <span className="text-royal-azure">{userData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <h4 className="font-medium">Email</h4>
              <span className="text-royal-azure">{userData.email}</span>
            </div>
            <div className="flex justify-between">
              <h4 className="font-medium">Mobile Number</h4>
              <span className="text-royal-azure">{userData.mobileNumber}</span>
            </div>
          </>
        ) : (
          <p className="text-white text-lg">No data found</p>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
          editProfile ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setEditProfile(false)}
      >
        <form
          className="md:w-md w-sm bg-white rounded-md p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSaveProfile}
        >
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

          {/* Avatar Preview */}
          <div className="flex flex-col items-center mb-6">
            {editFormData.userImage ? (
              <div className="w-20 h-20 rounded-full overflow-hidden border mb-2">
                <img
                  src={editFormData.userImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-semibold uppercase mb-2">
                {editFormData.fullName?.charAt(0) || "U"}
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full py-2 px-3 border rounded-md"
            />
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              name="fullName"
              value={editFormData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full py-2 px-3 border rounded-md"
            />

            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full py-2 px-3 border rounded-md"
            />

            <input
              type="tel"
              name="mobileNumber"
              value={editFormData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="w-full py-2 px-3 border rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setEditProfile(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-royal-azure text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfileComponent;
