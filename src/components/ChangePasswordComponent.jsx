import React from "react";

function ChangePasswordComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  // Handle password change
  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // In a real app, you would make an API call here
    toast.success("Password changed successfully!");

    // Reset password fields
    setNewPassword(null);
    setConfirmPassword(null);
  };
  return (
    <form
      className="md:w-xl w-full rounded-b-2xl border-t-2 border-silver-fog bg-white shadow-md p-3 space-y-3"
      onChange={handleChangePassword}
    >
      {/* newPassword */}
      <div className="flex flex-col space-y-1.5 relative">
        <h4 className="text-charcoal-stone font-medium">New Password</h4>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your new password"
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
  );
}

export default ChangePasswordComponent;
