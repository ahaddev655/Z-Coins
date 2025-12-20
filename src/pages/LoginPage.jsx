import React, { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { Bounce, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SignUpFormComponent from "../components/SignUpFormComponent";
import LoginFormComponent from "../components/LoginFormComponent";

function LoginPage() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [formTabs, setFormTabs] = useState("signUp");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 3500);
    const finishTimer = setTimeout(() => setLoading(false), 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("sessionToken");
    if (userToken) {
      navigate("/main/");
    }
  }, [navigate]);

  return (
    <>
      {/* Loading */}
      {loading && <LoadingPage fade={fade} />}

      {/* Main Content */}
      <div className={loading ? "hidden" : "block"}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        <div className="flex items-center justify-center h-screen px-3">
          <div
            className={`sm:w-md w-sm shadow-xl bg-cloud-white border-2 border-silver-fog rounded-xl p-3 ${
              formTabs === "signUp" ? " overflow-y-auto h-[650px]" : ""
            }`}
          >
            {/* Logo */}
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-3">
                <img
                  src="/assets/favicon.png"
                  alt="Favicon"
                  className="w-[62px] h-[62px]"
                />
                <h1 className="font-bold font-montserrat text-[36px] text-charcoal-stone">
                  Z Coins
                </h1>
              </div>
              <p className="font-medium text-charcoal-stone">
                Create an account for investing in your future
              </p>
            </div>

            {/* NavTabs */}
            <div className="gap-3 w-full p-1.5 bg-gray-200 rounded-md flex items-center justify-center mt-4">
              <div
                className={`py-3 px-6 w-full text-center font-medium rounded-md cursor-pointer transition-colors ${
                  formTabs === "signUp"
                    ? "bg-royal-azure text-white"
                    : "text-charcoal-stone hover:bg-royal-azure/50"
                }`}
                onClick={() => setFormTabs("signUp")}
              >
                Signup
              </div>
              <div
                className={`py-3 px-6 w-full text-center font-medium rounded-md cursor-pointer transition-colors ${
                  formTabs === "login"
                    ? "bg-royal-azure text-white"
                    : "text-charcoal-stone hover:bg-royal-azure/50"
                }`}
                onClick={() => setFormTabs("login")}
              >
                Login
              </div>
            </div>

            {/* Form */}
            {formTabs === "signUp" ? (
              <SignUpFormComponent />
            ) : (
              <LoginFormComponent />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
