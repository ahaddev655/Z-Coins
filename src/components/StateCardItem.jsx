import React from "react";

function StateCardItem({ label, val, icon }) {
  return (
    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-2 text-slate-400 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase">{label}</span>
      </div>
      <p className="text-sm font-black text-blue-950">{val}</p>
    </div>
  );
}

export default StateCardItem;
