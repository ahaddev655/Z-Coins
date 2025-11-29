import React from "react";

function LoadingPage({ fade }) {
  return (
    <div
      className={`fixed z-999 top-0 left-0 flex items-center h-screen justify-center w-full transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div>
        <div className="flex items-center justify-center w-full gap-3 relative">
          <img
            src="/assets/favicon.png"
            alt="Favicon"
            className="w-[62px] h-[62px]"
          />
          <h1 className="font-bold text-[36px] text-charcoal-stone font-montserrat">
            Z Coins
          </h1>
        </div>

        <div className="sm:text-sm text-[13px] font-normal text-charcoal-stone w-full text-center fixed bottom-7 left-1.5">
          Pakistan's Highly Rated Cryptocurrency Exchange
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
