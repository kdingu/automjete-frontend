import React from "react";

const Input = (props) => {
  const {
    type = "text",
    error,
    id,
    name,
    required = false,
    value,
    handleChange,
    label = "",
    placeholder = "",
    className = "",
    rows = 6,
    errorMessage = "",
    labelClassName = "",
    ...rest
  } = props;

  if (type === "textarea") {
    return (
      <label className={`text-sm ${labelClassName}`}>
        {label && <span className="mb-1 block text-xs font-semibold text-gray-700">{label}</span>}
        <textarea
          placeholder={placeholder}
          className={`w-full rounded-sm border border-gray-400 block p-2 ${className}`}
          id={id}
          name={name}
          required={required}
          onChange={handleChange}
          value={value}
          rows={rows}
          {...rest}
        />
        {error && <div className="text-red-500">{error}</div>}
      </label>
    );
  }

  return (
    <label className="text-sm">
      {label && <span className=" mb-1 block text-xs font-semibold text-gray-700">{label}</span>}
      <input
        placeholder={placeholder}
        className={`w-full rounded-sm border border-gray-400 block p-2 ${className}`}
        id={id}
        name={name}
        type={type}
        required={required}
        onChange={handleChange}
        value={value}
      />
      {error && <div className="text-red-500">{error}</div>}
    </label>
  );
};

export default Input;
