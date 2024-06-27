import React from "react"

const TechnicalSpec = ({label, value, index}) => {
    return (
        <div
            className={`flex justify-between border-b border-solid border-gray-100 w-full md:w-6/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
            <span className="pt-2 pb-2">{label}</span>
            <span className="pt-2 pb-2 text-right">{value}</span>
        </div>
    )
};

export default TechnicalSpec;
