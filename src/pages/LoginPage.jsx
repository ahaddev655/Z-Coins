import React, { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import FormComponent from "../components/FormComponent";
import { Bounce, ToastContainer } from "react-toastify";

function LoginPage() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
    }, 3500);

    const finishTimer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, []);

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
          <div className="sm:w-md w-sm shadow-xl bg-cloud-white border-2 border-silver-fog rounded-xl p-3">
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
            {/* Form */}
            <FormComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
