import React from "react";

const Pill = (props) => {
  const { children, className = "" } = props;

  return (
    <div className={`rounded-xl border px-2 py-1 ${className}`}>{children}</div>
  );
};

export default Pill;
