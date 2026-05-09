import { motion, AnimatePresence } from "framer-motion";
import InputItem from "../components/InputItem";
import { useState } from "react";

function AuthFormItem({ isLogin }) {
  // --- Variables ---
  const [loading, setLoading] = useState(false);

  // --- Form Data Variable ---

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    pNumber: "",
  });

  // --- OnChange Handler ---

  const handleFormDataChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- Form Submit Function ---

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      // --- Signup Validations ---
      if (
        !formData.fname ||
        !formData.lname ||
        !formData.email ||
        !formData.password ||
        !formData.pNumber
      ) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }
      if (!formData.email?.trim().includes("@")) {
        toast.error("Email is Invalid");
        setLoading(false);
        return;
      }
      if (!formData.pNumber?.length === 17) {
        toast.error("Phone Number is Invalid");
        setLoading(false);
        return;
      }
      // --- Signup Positive Response ---
      setTimeout(() => {
        toast.success("Signup successful");
        setFormData({
          fname: "",
          lname: "",
          email: "",
          password: "",
          pNumber: "",
        });
      }, 1500);
      setTimeout(() => {}, 3000);
      console.log("Signup successful: ", formData);
    }
    // --- Login Validations ---
    else {
      if (!formData.email || !formData.password) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }
      if (!formData.email?.trim().includes("@")) {
        toast.error("Email is Invalid");
        setLoading(false);
        return;
      }
      // --- Login Positive Response ---
      setTimeout(() => {
        toast.success("Login successful");
        setFormData({
          fname: "",
          lname: "",
          email: "",
          password: "",
          pNumber: "",
        });
      }, 1500);
      setTimeout(() => {}, 3000);
      console.log("Login successful: ", formData);
    }
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <AnimatePresence mode="popLayout">
        {isLogin && (
          <motion.div
            key="signup-fields"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* --- Fname --- */}
              <div className="relative">
                <InputItem
                  id={"fname"}
                  label={"Full Name"}
                  name={"fname"}
                  onChange={handleFormDataChange}
                  placeholder={" "}
                  type={"text"}
                  value={formData.fname}
                />
              </div>

              {/* --- Lname --- */}
              <div className="relative">
                <InputItem
                  id={"lname"}
                  label={"Last Name"}
                  name={"lname"}
                  onChange={handleFormDataChange}
                  placeholder={" "}
                  type={"text"}
                  value={formData.lname}
                />
              </div>
            </div>

            {/* --- Phone Number --- */}
            <div className="relative">
              <InputItem
                id={"pNumber"}
                label={"Phone Number"}
                name={"pNumber"}
                onChange={handleFormDataChange}
                placeholder={" "}
                type={"text"}
                value={formData.pNumber}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Email --- */}
      <motion.div layout className="relative">
        <InputItem
          id={"email"}
          label={"Email Address"}
          name={"email"}
          onChange={handleFormDataChange}
          placeholder={" "}
          type={"text"}
          value={formData.email}
        />
      </motion.div>

      {/* --- Password --- */}
      <motion.div layout className="relative">
        <InputItem
          id={"password"}
          label={"Password"}
          name={"password"}
          onChange={handleFormDataChange}
          placeholder={" "}
          type={"password"}
          value={formData.password}
        />
      </motion.div>

      <motion.button
        layout
        type="submit"
        className="w-full bg-blue-900 text-white font-bold h-12 rounded-xl hover:bg-blue-800 active:scale-[0.98] transition-all
        duration-200 shadow-lg shadow-blue-200"
      >
        {isLogin
          ? loading
            ? "Creating your Account..."
            : "Create an Account"
          : loading
            ? "Logging you in..."
            : "Login"}
      </motion.button>
    </form>
  );
}

export default AuthFormItem;
