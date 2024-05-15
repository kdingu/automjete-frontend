import React, { useContext, useRef } from "react";
import SvgIcon from "@/components/svg-icon";
import { AccordionContext } from "@/components/accordion/context";

const AccordionItem = (props) => {
  const { title = "", children, instanceId } = props;

  const context = useContext(AccordionContext);

  const listWrapperRef = useRef();

  const handleToggle = () => {
    context.toggleItem(instanceId);
  };

  const isOpened = !!context.activeItems.find(id => id === instanceId);

  return (
    <div>
      <div
        className={`${isOpened ? "!border-l-blue-400" : ""} group cursor-pointer flex items-center pl-3 pr-4 py-4 border-l-4 border-l-transparent hover:border-l-blue-400 transition duration-300 rounded-sm`}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
      >
        <div className={`transition duration-300 transform ${isOpened ? "rotate-[225deg]" : ""}`}>
          <SvgIcon name="plus"
                   className={`transition duration-300 group-hover:fill-blue-500 ${isOpened ? "fill-blue-500" : ""}`} />
        </div>
        <span
          className={`ml-3 transition duration-300 group-hover:text-blue-500 ${isOpened ? "text-blue-500" : ""}`}>{title}</span>
      </div>
      <div className={`overflow-hidden transition-height duration-300 ${isOpened ? "h-[" + listWrapperRef.current.clientHeight + "px]" : "h-0"}`}>
        <div ref={listWrapperRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
