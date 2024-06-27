import React, {useEffect, useState} from "react";
import {noop} from "@/helpers/utilities/utils";
import InputLabel from "@/components/input/input-label";

const Checkbox = (props) => {
    const {value, children, checked, onClick = noop} = props;

    return (
        <label className="flex relative cursor-pointer select-none">
            <input type="checkbox" className="hidden" onClick={() => onClick(value)}/>
            <div className="w-6 h-6 border border-gray-400 rounded-sm bg-white flex items-center justify-center">
                {checked && (
                    <svg
                        className="text-teal-500 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path
                            d="M9 16.2l-3.5-3.5a.984.984 0 0 1 0-1.4.984.984 0 0 1 1.4 0l2.1 2.1 5.6-5.6a.984.984 0 0 1 1.4 0c.4.4.4 1 0 1.4L10.4 16.6c-.4.4-1 .4-1.4 0z"/>
                    </svg>
                )}
            </div>
            <span className="ml-2">{children}</span>
        </label>
    );
};

const SelectCheckbox = (props) => {
    const {
        multiselect,
        data = [],
        id,
        name,
        label,
        onChange,
        value,
        containerCssClasses = "",
        errorMessage = ""
    } = props;

    const [selected, setSelected] = useState([]);

    const getIsChecked = (value) => {
        return !!selected.includes(value);
    };

    const handleChange = (value) => {
        setSelected(selectedValues => {
            let newSelectedValues;

            if (getIsChecked(value)) {
                if (!multiselect) {
                    newSelectedValues = [];
                } else {
                    newSelectedValues = selectedValues.filter(val => val !== value);
                }
            } else {
                if (!multiselect) {
                    newSelectedValues = [value];
                } else {
                    newSelectedValues = [...selectedValues, value];
                }
            }

            onChange(name, newSelectedValues.join(","));
            return newSelectedValues;
        });
    };

    useEffect(() => {
        // Note: checking if we can split because in backend values can be either boolean or text.
        const newValues = typeof value.split === 'function' && value.split(",") || [];
        setSelected(newValues.filter(val => !!val));
    }, [value]);

    return (
        <div className="SelectCheckbox">
            <InputLabel label={label}/>

            <div className={`flex items-center gap-6 ${containerCssClasses}`}>
                {data.map((option) => {
                    const checked = getIsChecked(option.value);

                    return (
                        <Checkbox
                            key={`${id}_${option.value}`}
                            value={option.value}
                            checked={checked}
                            onClick={handleChange}
                        >
                            {option.label}
                        </Checkbox>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectCheckbox;
