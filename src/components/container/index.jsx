import React from "react";

const Container = ({children, className = ""}) => {
    return (
        <div className={`m-auto px-4 lg:px-10 max-w-7xl ${className}`.trim()}>{children}</div>
    );
};

export default Container;
