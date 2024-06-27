import React, {useRef, useState} from "react";
import ToggleHead from "@/components/results-detailed-filters/toggle-head";
import TogglePopupBody from "./toggle-popup-body";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";

const ToggledPopup = (props) => {
    const {children, disabled, title, popupTitle = "", className = "", iconText = ""} = props;

    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef();

    const handleToggle = () => {
        setIsOpen((is) => !is);
    };

    useOnClickOutside(ref.current, () => setIsOpen(false));

    return (
        <div ref={ref} className={`ToggledPopup ${className} relative`}>
            <ToggleHead
                disabled={disabled}
                withPopup
                isOpen={disabled ? false : isOpen}
                title={title}
                iconText={iconText}
                onClick={handleToggle}
            />
            <TogglePopupBody
                title={popupTitle}
                isOpen={disabled ? false : isOpen}
                onCloseClick={handleToggle}
            >
                {children}
            </TogglePopupBody>
        </div>
    );
};

export default ToggledPopup;
