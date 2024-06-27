import React from "react";
import Button from "@/components/button";
import {noop} from "@/helpers/utilities/utils";

const TogglePopupBody = (props) => {
    const {isOpen, children, title, onCloseClick = noop} = props;

    return (
        <div
            className={`ToggledPopup__Body absolute left-full top-1/2 z-10 min-w-max -translate-y-1/2 transform rounded bg-white shadow transition duration-300 ${isOpen ? "visible translate-x-8 opacity-100" : "invisible ml-12 translate-x-16 opacity-0"}`}
        >
            <div className="relative">
                <div
                    style={{filter: "drop-shadow(-1px 0px 1px rgba(0, 0, 0, .1))"}}
                    className="absolute right-full top-1/2 z-10 inline-block -translate-y-1/2 transform border-b-[20px] border-r-[20px] border-t-[20px] border-b-transparent border-r-white border-t-transparent"
                />
                <div className="p-4">
                    <div className="ToggledPopup__BodyHead flex items-center justify-between gap-10 border-b pb-4">
                        <span>{title}</span>
                        <Button
                            className="font-semibold"
                            variant="text"
                            onClick={onCloseClick}
                        >
                            Close
                        </Button>
                    </div>

                    <div className="ToggledPopup__BodyMain pt-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default TogglePopupBody;
