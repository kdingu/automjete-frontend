import React from "react";

const Title = ({children, className = ""}) => {
    return <div className={`mb-2 text-center text-3xl font-thin ${className}`}>{children}</div>;
};

export default Title;
