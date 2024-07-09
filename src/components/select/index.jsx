import React from "react";
import InputLabel from "@/components/input/input-label";

const Select = ({
                    data = [],
                    disabled,
                    id,
                    name,
                    label,
                    onChange,
                    onBlur,
                    value,
                    className,
                    labelPosition = "top",
                    placeholderLabel = "",
                    labelClassName = "",
                    errorMessage = "",
                    noPlaceholder,
                    ...rest
                }) => {
    const defaultOptionSelected = !value || value === "";

    return (
        <div className="SelectGroup w-full">
            {label && labelPosition === "top" &&
                <InputLabel className={labelClassName} labelPosition={labelPosition} id={id} label={label}/>}

            <div className="flex items-center gap-6">
                {label && labelPosition === "left" &&
                    <InputLabel className={labelClassName} labelPosition={labelPosition} id={id} label={label}/>}
                <select
                    disabled={disabled}
                    className={`${className} ${defaultOptionSelected ? "!text-gray-400" : ""} appearance-none h-10 w-full ${disabled ? "cursor-not-allowed" : "cursor-pointer"} rounded-sm border border-gray-400 bg-white p-2`}
                    id={id}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    {...rest}
                >
                    {!noPlaceholder && (
                        <option value="">
                            {placeholderLabel}
                        </option>
                    )}
                    {data.map((option) => {
                        if (option.values) {
                            return (
                                <optgroup key={`${id}_${option.value}`} label={option.label}>
                                    {option.values.map((subOption) => (
                                        <option
                                            key={`${id}_${subOption.value}`}
                                            value={subOption.value}
                                            className="text-gray-800"
                                        >
                                            {subOption.label}
                                        </option>
                                    ))}
                                </optgroup>
                            );
                        }

                        return (
                            <option
                                key={`${id}_${option.value}`}
                                value={option.value}
                                className="text-gray-800"
                            >
                                {option.value ? option.label : placeholderLabel ? placeholderLabel : option.label}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default Select;
