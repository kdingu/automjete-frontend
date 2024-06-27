import React, {useState} from "react";
import ToggleHead from "@/components/results-detailed-filters/toggle-head";

const ToggledSection = (props) => {
    const {
        children,
        title,
        className = "",
        iconText = "",
        alwaysOpened,
        initialIsOpen,
    } = props;

    const [isOpen, setIsOpen] = useState(initialIsOpen);

    const handleToggle = () => {
        setIsOpen((is) => !is);
    };

    return (
        <div className={`ToggledSection ${className}`}>
            <ToggleHead
                alwaysOpened={alwaysOpened}
                isOpen={isOpen}
                title={title}
                iconText={iconText}
                onClick={handleToggle}
            />
            <div
                className={`ToggledSection__Body px-4 py-6 transition  ${alwaysOpened || isOpen ? "" : "hidden"}`}
            >
                {children}
            </div>
        </div>
    );
};

export default ToggledSection;
