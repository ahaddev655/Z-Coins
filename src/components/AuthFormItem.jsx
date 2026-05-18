import { motion, AnimatePresence } from "framer-motion";
import InputItem from "../components/InputItem";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa6";

function AuthFormItem({ isLogin }) {
  // --- Variables ---
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      // --- API Configuration ---

      axios
        .post("https://z-coins-backend.vercel.app/api/auth/register", formData)
        .then((response) => {
          console.log(response?.data);
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
            localStorage.setItem("uid", response?.data?.uid);
            localStorage.setItem("id", response?.data?.id);
          }, 1500);
          setTimeout(() => {
            navigate("/u/");
          }, 3000);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "Internal Server Error");
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        });
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

      // --- API Configuration ---

      axios
        .post("https://z-coins-backend.vercel.app/api/auth/login", formData)
        .then((response) => {
          console.log(response?.data);
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
            localStorage.setItem("uid", response?.data?.uid);
            localStorage.setItem("id", response?.data?.id);
          }, 1500);
          setTimeout(() => {
            navigate("/u/");
          }, 3000);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "Internal Server Error");
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        });
    }
  };

  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`,
        )
        .then((googleRes) => {
          const googleData = {
            fname: googleRes.data.given_name || "",
            lname: googleRes.data.family_name || "",
            email: googleRes.data.email || "",
          };

          if (isLogin) {
            axios
              .post(
                "http://localhost:5000/api/auth/google-register",
                googleData,
              )
              .then((response) => {
                localStorage.setItem("uid", response?.data?.uid);
                localStorage.setItem("id", response?.data?.id);
                toast.success("Google Registration Successful!");
                setTimeout(() => navigate("/u/"), 2000);
              })
              .catch((error) =>
                toast.error(
                  error?.response?.data?.error || "Google sync failed",
                ),
              );
            return;
          }
          axios
            .post("http://localhost:5000/api/auth/google-login", googleData)
            .then((response) => {
              localStorage.setItem("uid", response?.data?.uid);
              localStorage.setItem("id", response?.data?.id);
              toast.success("Google Registration Successful!");
              setTimeout(() => navigate("/u/"), 2000);
            })
            .catch((error) =>
              toast.error(error?.response?.data?.error || "Google sync failed"),
            );
        });
    },
    onError: () => toast.error("Google Sign-In Failed"),
  });
  return (
    <>
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

      {/* --- Divider --- */}
      <motion.div layout className="relative flex items-center py-6">
        <div className="grow border-t border-gray-200"></div>
        <span className="shrink mx-4 text-gray-400 text-xs uppercase tracking-widest">
          Or
        </span>
        <div className="grow border-t border-gray-200"></div>
      </motion.div>

      {/* --- Social Login --- */}
      <motion.button
        onClick={handleGoogleSubmit}
        layout
        className="w-full flex items-center justify-center gap-3 h-12 border-2 border-gray-100 rounded-xl hover:bg-gray-50
          transition-colors font-medium text-gray-700"
      >
        <FaGoogle className="text-red-500" />
        <span>Continue With Google</span>
      </motion.button>
    </>
  );
}

export default AuthFormItem;
