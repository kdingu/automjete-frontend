import React from "react";

const ButtonGroup = (props) => {
    const {children} = props;

    const _children = Array.isArray(children) ? children : [children];

    const activeIndex =
        _children?.reduce?.((prev, child, index) => {
            if (child.props.active) return index;
            return prev;
        }, null) || null;

    return (
        <div className="ButtonGroup flex">
            {_children?.map?.((child, index) => {
                const _child = React.cloneElement(child, {
                    key: index, // todo: improve this key
                    isGroupElement: true,
                    className: `${child.props.className} w-full rounded-sm px-4 py-2 bg-transparent border text-black hover:border-teal-400 hover:bg-teal-300 hover:text-white transition-bg transition rounded-none text-gray-500 ${
                        index === 0 ? "rounded-l" : ""
                    } ${index === _children.length - 1 ? "rounded-r border-r" : ""} ${
                        child.props.active
                            ? "border-r border-teal-400 text-teal-400 font-semibold"
                            : "border-gray-300"
                    } ${
                        activeIndex !== null &&
                        !child.props.active &&
                        activeIndex === index - 1
                            ? "border-l-0"
                            : ""
                    } ${
                        activeIndex !== null &&
                        !child.props.active &&
                        activeIndex === index + 1
                            ? "border-r-0"
                            : ""
                    }`,
                });

                return _child;
            })}
        </div>
    );
};

export default ButtonGroup;
