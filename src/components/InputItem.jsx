import React from "react";

function InputItem({ label, placeholder, value, onChange, name, id, type }) {
  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="block w-full h-12 px-3 text-gray-900 bg-transparent border-2 border-gray-200 rounded-xl appearance-none
        focus:outline-none focus:ring-0 focus:border-blue-900 peer transition-colors"
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor={name}
        className="absolute text-gray-500 duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-left left-3
        peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2
        peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75 bg-white px-2 pointer-events-none"
      >
        {label}
      </label>
    </>
  );
}

export default InputItem;
