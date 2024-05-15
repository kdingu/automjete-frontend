import React from "react";

const SubTitle = ({ children, className = "" }) => {
  return (
    <div className={`text-md mb-2 text-center font-semibold ${className}`}>{children}</div>
  );
};

export default SubTitle;
