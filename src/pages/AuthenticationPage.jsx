import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import AuthFormItem from "../components/AuthFormItem";

function AuthenticationPage() {
  // --- Variables ---
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <ToastContainer
        hideProgressBar
        autoClose={2500}
        position="top-center"
        theme="colored"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white shadow-2xl rounded-2xl border border-gray-100 py-10 px-8 max-h-150 overflow-y-auto"
      >
        {/* --- Heading --- */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-900">
            Z-Coins
          </h1>
          <p className="mt-2 text-gray-500 text-sm font-medium">
            Secure • Fast • Modern Crypto Experience
          </p>
        </div>

        {/* --- Form --- */}
        <AuthFormItem isLogin={isLogin} setIsLogin={setIsLogin} />

        {/* --- Footer --- */}
        <motion.p layout className="mt-8 text-center text-sm text-gray-600">
          {isLogin ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-900 font-bold hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default AuthenticationPage;
