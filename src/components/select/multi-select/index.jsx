import React, { useEffect, useState } from "react";
import { noop } from "@/helpers/utilities/utils";
import BodyTypeOption from "@/components/body-types/body-type-option";
import Checkbox from "@/components/checkbox";

const Multiselect = (props) => {
  const { data = [], value = "", onChange = noop } = props;

  const [selectedOptions, setSelectedOptions] = useState(value);

  const handleClickOption = (option) => {
    if (selectedOptions?.split(",").indexOf(option.value) !== -1) {
      // remove
      const removeCurrent = (type) => type !== option.value;
      const value = selectedOptions?.split(",").filter(removeCurrent).join(",");
      setSelectedOptions(value);
      onChange(value);
    } else {
      // add
      const value = selectedOptions
        ? `${selectedOptions},${option.value}`
        : option.value;
      setSelectedOptions(value);
      onChange(value);
    }
  };

  const getIsActive = (value) =>
    selectedOptions?.split(",").indexOf(value) !== -1;

  useEffect(() => {
    if (value !== selectedOptions) setSelectedOptions(value);
  }, [value]);

  return (
    <div className="grid grid-cols-3 justify-start gap-x-10 gap-y-6">
      {data.filter((dt) => !!dt.value)
        .map((data) => (
          <Checkbox
            key={data.value}
            data={data}
            onClick={handleClickOption}
            active={getIsActive(data.value)}
            disabled={false} /* TODO disabled logic */
          />
        ))}
    </div>
  );
};

export default Multiselect;
