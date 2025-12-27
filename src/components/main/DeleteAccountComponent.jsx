import axios from "axios";
import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

function DeleteAccountComponent() {
  const userId = localStorage.getItem("userId");
  // Delete Account
  const deleteAccFunction = () => {
    axios
      .delete(`https://z-coins-backend.vercel.app/api/users/delete-user/${userId}`)
      .then((res) => {
        toast.success(res?.data?.message);
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("favoriteCoins");
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      })
      .catch((err) => {
        console.error("Delete API Error: ", err);
        toast.error(err?.res?.data?.error || "Something went wrong");
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
    </>
  );
}

export default DeleteAccountComponent;
