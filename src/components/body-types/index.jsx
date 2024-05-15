import React, { useEffect, useState } from "react";
import { noop } from "@/helpers/utilities/utils";
import BodyTypeOption from "@/components/body-types/body-type-option";

const BodyTypes = (props) => {
  const { data = [], value = "", onChange = noop } = props;

  const [selectedBodyTypes, setSelectedBodyTypes] = useState(value);

  const handleClickOption = (option) => {
    if (selectedBodyTypes?.split(",").indexOf(option.value) !== -1) {
      // remove
      const removeCurrent = (type) => type !== option.value;
      const value = selectedBodyTypes
        ?.split(",")
        .filter(removeCurrent)
        .join(",");
      setSelectedBodyTypes(value);
      onChange(value);
    } else {
      // add
      const value = selectedBodyTypes
        ? `${selectedBodyTypes},${option.value}`
        : option.value;
      setSelectedBodyTypes(value);
      onChange(value);
    }
  };

  const getIsActive = (value) =>
    selectedBodyTypes?.split(",").indexOf(value) !== -1;

  useEffect(() => {
    if (value !== selectedBodyTypes) setSelectedBodyTypes(value);
  }, [value]);

  return (
    <div className="flex flex-wrap gap-x-1 gap-y-4">
      {data.map((data) => (
        <BodyTypeOption
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

export default BodyTypes;
