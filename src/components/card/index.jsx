import React from "react";

const Card = (props) => {
    const {title = "", children, className = ""} = props;

    return (
        <div
            className={`${className} relative border border-gray-200 p-4 ${title ? "mt-1 pt-6" : ""}`}
        >
            {title && (
                <h2 className="absolute left-0 top-0 ml-4 -translate-y-1/2 transform bg-white px-2">
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
};

export default Card;
