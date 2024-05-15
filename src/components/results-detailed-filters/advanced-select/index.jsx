import React, { useEffect, useState } from "react";
import TextInput from "@/components/input/text-input";
import { noop } from "@/helpers/utilities/utils";
import Button from "@/components/button";
import SvgIcon from "@/components/svg-icon";
import Checkbox from "@/components/checkbox";

const AdvancedSelect = (props) => {
  const { value = "", multiselect, onChange = noop, withSearch, options = [] } = props;

  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const isSelected = (_value) => {
    return value?.indexOf(_value) !== -1;
  };

  const handleMultiSelect = (_value) => {
    if (isSelected(_value)) {
      const __value = value.split(',').filter(val => val !== _value).join(',');
      onChange(__value);
    } else if (value) {
      onChange(`${value},${_value}`);
    } else {
      onChange(_value);
    }
  };

  const handleSelect = (value) => {
    if (multiselect) handleMultiSelect(value);
    else onChange(value);
  };

  const handleClear = () => {
    onChange('');
  };

  useEffect(() => {
    const filterOptions = () => {
      if (search === "")
        setFilteredOptions(options.filter((opt) => opt.value));
      else
        setFilteredOptions(
          options.filter(
            (opt) =>
              opt.value &&
              opt.label.toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
        );
    };

    filterOptions();
  }, [search, options]);

  return (
    <div>
      {withSearch && (
        <div className="mb-4">
          <TextInput
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          <hr />
        </div>
      )}

      <div className="mb-4 grid max-h-80 min-w-[600px] grid-cols-4 gap-4 overflow-auto">
        {filteredOptions.map((opt) => {
          if (multiselect) {
            return (
              <Checkbox
                key={opt.value}
                data={opt}
                active={isSelected(opt.value)}
                onClick={() => handleSelect(opt.value)}
              />
            );
          }

          return (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`inline-block w-max border-l-4 px-2 ${isSelected(opt.value) ? "border-blue-400 bg-gray-100" : "border-transparent"} cursor-pointer text-blue-800 hover:text-blue-600`}
            >
              {opt.label}
            </div>
          );
        })}
      </div>

      <Button onClick={handleClear} variant="outline">
        Clear
      </Button>
    </div>
  );
};

export default AdvancedSelect;
