import React from "react";

function DeleteAccountComponent() {
  // Delete Account
  const deleteAccFunction = () => {
    localStorage.removeItem("sessionToken");
    window.location.reload();
  };
  return (
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
  );
}

export default DeleteAccountComponent;
