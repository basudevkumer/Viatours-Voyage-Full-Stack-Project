import React from "react";

const Button = ({ children }) => {
  return (
    <button
      className={`px-9 py-5.5 cursor-pointer title4 rounded-[12px] text-white border`}
    >
      {children}
    </button>
  );
};

export default Button;
