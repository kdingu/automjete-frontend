import React from "react";
import InputLabel from "@/components/input/input-label";
import { Field } from "formik";

const TextInput = ({
  type = "text",
  id,
  name,
  onChange,
  value,
  placeholder,
  label,
  className = "",
  wrapperClassName = "",
  errorMessage,
  disabled,
  autoComplete = "auto",
  ...rest
}) => {
  return (
    <div className={`TextInputGroup w-full ${wrapperClassName}`}>
      {label && <InputLabel id={id} label={label} />}
      <input
        autoComplete={autoComplete}
        disabled={disabled}
        className={`${className} ${errorMessage ? "!border-red-600" : ""} h-10 w-full rounded-sm border border-gray-400 p-2`}
        type={type === "password" ? type : "text"}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
      {errorMessage && (
        <div className="text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default TextInput;
