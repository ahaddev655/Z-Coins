import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginAuthority = localStorage.getItem("loginAuthority");
    if (loginAuthority === 0) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="flex items-center justify-center h-screen page">
      <div className="w-md bg-oceanic-blue rounded-xl py-6 text-center">
        {/* profileImage */}
        <div className="flex justify-center">
          <img
            src="/assets/dummy user img.png"
            className="w-30 h-30"
            alt="IMG"
          />
        </div>
        {/* fullName */}
        <h1 className="md:text-3xl text-xl mt-3 text-white font-semibold">
          Agilan Senthil
        </h1>
        {/* email */}
        <p className="text-white text-sm md:text-base mt-2">
          agilansenthilkumar@gmail.com
        </p>
        {/* mobileNumber */}
        <p className="text-white text-sm md:text-base mt-1">+91 9444977118</p>
      </div>
    </div>
  );
}

export default MainProfilePage;
