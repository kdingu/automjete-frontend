import React from "react";

const Paragraph = (props) => {
    const {document: {children}} = props;

    return (
        <p className="my-4">
            {children.map(child => {
                if (child.bold) return <span className="font-bold">{child.text}</span>;

                return child.text;
            })}
        </p>
    );
};

export default Paragraph;
