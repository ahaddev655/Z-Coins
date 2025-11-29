import React from "react";

function MainPortfolioPage() {
  return (
    <div className="lg:px-6 md:px-3 sm:px-1.5 px-1 py-6">
      {/* Banner */}
      <div className="py-6 px-5 text-white shadow-sm bg-oceanic-blue rounded-xl">
        <p className="font-medium sm:text-2xl text-xl">Portfolio</p>
        <p className="font-light text-sm mt-[15px]">Holding Value</p>
        <h1 className="mt-0.5 text-3xl font-semibold">$2,509.75</h1>
        <div className="mt-[21px] flex items-center gap-[18px]">
          <div>
            <p className="text-sm font-light">Invested value</p>
            <h1 className="text-2xl font-semibold">$1,618.75</h1>
          </div>
          <div className="bg-cloud-white/50 w-px h-[55px]" />
          <div>
            <p className="text-sm font-light">Available</p>
            <h1 className="text-2xl font-semibold">$1589</h1>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MainPortfolioPage;
