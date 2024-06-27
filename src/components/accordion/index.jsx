import React, {useMemo, useState} from "react";
import {AccordionContext} from "@/components/accordion/context";

const Accordion = (props) => {
    const {children} = props;

    const [activeItems, setActiveItems] = useState([]);

    const _children = Array.isArray(children) ? children : [children];

    const itemIds = useMemo(() => {
        return _children.map(() => {
            return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        });
    }, [children]);

    const addToActiveItems = (itemId) => {
        setActiveItems((ids) => {
            return [...ids, itemId];
        });
    };

    const removeFromActiveItems = (itemId) => {
        setActiveItems((ids) => {
            return ids.filter(id => id !== itemId);
        });
    };

    const handleSetActiveItems = (itemId) => {
        if (activeItems.indexOf(itemId) !== -1) removeFromActiveItems(itemId);
        else addToActiveItems(itemId);
    };

    const contextValue = {
        activeItems,
        toggleItem: handleSetActiveItems,
    };

    return (
        <AccordionContext.Provider value={contextValue}>
            <div>
                {_children.map((child, index) => {
                    const instanceId = itemIds[index];
                    const isLast = index === _children.length - 1;

                    return (
                        <div key={instanceId} className={`border-t ${isLast ? "border-b" : ""}`}>
                            {React.cloneElement(child, {instanceId})}
                        </div>
                    );
                })}
            </div>
        </AccordionContext.Provider>
    );
};

export default Accordion;
