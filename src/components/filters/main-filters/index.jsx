import React, { useState } from "react";
import Card from "@/components/card";
import BodyTypes from "@/components/body-types";
import Select from "@/components/select";
import MultiSelect from "@/components/select/multi-select";
import ButtonGroup from "@/components/button-group";
import Button from "@/components/button";

const MainFilters = (props) => {
  const { filters } = props;

  return (
    <div>
      {filters.facets.attributes.map((field) => {
        return (
          <div key={field.facet} className={`gap-4 mb-3 grid grid-cols-${field.filters.length > 1 ? 2 : 1}`}>
            {field.filters.map((filter) => {
              return (
                <div key={filter.filter}>
                  {filters.methods.getComponentForFilter(filter, {showLabel: true})}
                </div>
              );
            })}
          </div>
        );
      })}

      {/*<Card title="Body type">*/}
      {/*  <BodyTypes*/}
      {/*    data={bodyTypes}*/}
      {/*    value={filters.formik.values.bodyType}*/}
      {/*    onChange={handleToggleBodyType}*/}
      {/*  />*/}
      {/*</Card>*/}

      {/*<Card title="Kilometers">*/}
      {/*  <div className="flex gap-4">*/}
      {/*    <Select*/}
      {/*      label="Minimum"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Min km"*/}
      {/*      data={minKm}*/}
      {/*      id="minKm"*/}
      {/*      name="minKm"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.minKm}*/}
      {/*    />*/}

      {/*    <Select*/}
      {/*      label="Maximum"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Max km"*/}
      {/*      data={maxKm}*/}
      {/*      id="maxKm"*/}
      {/*      name="maxKm"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.maxKm}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</Card>*/}

      {/*<Card title="Gearbox">*/}
      {/*  <Select*/}
      {/*    label="Gearbox"*/}
      {/*    className="w-1/2"*/}
      {/*    placeholder="Gearbox"*/}
      {/*    data={gearboxes}*/}
      {/*    id="gearbox"*/}
      {/*    name="gearbox"*/}
      {/*    onChange={filters.formik.handleChange}*/}
      {/*    onBlur={filters.formik.handleBlur}*/}
      {/*    value={filters.formik.values.gearbox}*/}
      {/*  />*/}
      {/*</Card>*/}

      {/*<Card title="Fuel type">*/}
      {/*  <MultiSelect*/}
      {/*    label="Fuel"*/}
      {/*    className="w-1/2"*/}
      {/*    placeholder="Fuel"*/}
      {/*    data={fuelTypes}*/}
      {/*    id="fuelType"*/}
      {/*    name="fuelType"*/}
      {/*    onChange={filters.formik.handleChange}*/}
      {/*    onBlur={filters.formik.handleBlur}*/}
      {/*    value={filters.formik.values.fuelType}*/}
      {/*  />*/}
      {/*</Card>*/}

      {/*<Card title="Year">*/}
      {/*  <ButtonGroup>*/}
      {/*    <Button*/}
      {/*      text="Used"*/}
      {/*      active={yearOption === "used"}*/}
      {/*      onClick={handleSelectUsedVehicleOption}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      text="New"*/}
      {/*      active={yearOption === "new"}*/}
      {/*      onClick={handleSelectNewVehicleOption}*/}
      {/*    />*/}
      {/*  </ButtonGroup>*/}

      {/*  {yearOption === "used" && (*/}
      {/*    <div className="mt-6 flex gap-4">*/}
      {/*      <Select*/}
      {/*        label="From"*/}
      {/*        className="w-1/2"*/}
      {/*        placeholder="From (oldest)"*/}
      {/*        data={yearsFrom}*/}
      {/*        id="yearFrom"*/}
      {/*        name="yearFrom"*/}
      {/*        onChange={filters.formik.handleChange}*/}
      {/*        onBlur={filters.formik.handleBlur}*/}
      {/*        value={filters.formik.values.yearFrom}*/}
      {/*      />*/}
      {/*      <Select*/}
      {/*        label="To"*/}
      {/*        className="w-1/2"*/}
      {/*        placeholder="To (newest)"*/}
      {/*        data={yearsTo}*/}
      {/*        id="yearTo"*/}
      {/*        name="yearTo"*/}
      {/*        onChange={filters.formik.handleChange}*/}
      {/*        onBlur={filters.formik.handleBlur}*/}
      {/*        value={filters.formik.values.yearTo}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</Card>*/}

      {/*<Card title="Color">*/}
      {/*  <MultiSelect*/}
      {/*    label="Color"*/}
      {/*    className="w-1/2"*/}
      {/*    placeholder="Color"*/}
      {/*    data={colors}*/}
      {/*    id="color"*/}
      {/*    name="color"*/}
      {/*    onChange={handleChangeColor}*/}
      {/*    value={filters.formik.values.color}*/}
      {/*  />*/}
      {/*</Card>*/}

      {/*<Card title="Doors">*/}
      {/*  <Select*/}
      {/*    label="Doors"*/}
      {/*    className="w-1/2"*/}
      {/*    placeholder="Doors"*/}
      {/*    data={doors}*/}
      {/*    id="doors"*/}
      {/*    name="doors"*/}
      {/*    onChange={filters.formik.handleChange}*/}
      {/*    onBlur={filters.formik.handleBlur}*/}
      {/*    value={filters.formik.values.doors}*/}
      {/*  />*/}
      {/*</Card>*/}

      {/*<Card title="Seats">*/}
      {/*  <div className="flex gap-4">*/}
      {/*    <Select*/}
      {/*      label="Min seats"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Minimum seats"*/}
      {/*      data={minSeats}*/}
      {/*      id="minSeats"*/}
      {/*      name="minSeats"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.minSeats}*/}
      {/*    />*/}
      {/*    <Select*/}
      {/*      label="Max seats"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Maximum seatsh"*/}
      {/*      data={maxSeats}*/}
      {/*      id="maxSeats"*/}
      {/*      name="maxSeats"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.maxSeats}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</Card>*/}

      {/*<Card title="Performance">*/}
      {/*  <div className="flex gap-4">*/}
      {/*    <Select*/}
      {/*      label="Min engine size"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Min"*/}
      {/*      data={minEngineSizes}*/}
      {/*      id="minEngineSize"*/}
      {/*      name="minEngineSize"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.minEngineSize}*/}
      {/*    />*/}
      {/*    <Select*/}
      {/*      label="Max engine size"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Max"*/}
      {/*      data={maxEngineSizes}*/}
      {/*      id="maxEngineSize"*/}
      {/*      name="maxEngineSize"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.maxEngineSize}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className="mt-6 flex gap-4">*/}
      {/*    <Select*/}
      {/*      label="Min engine power"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Minimum power"*/}
      {/*      data={minEnginePowers}*/}
      {/*      id="minEnginePower"*/}
      {/*      name="minEnginePower"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.minEnginePower}*/}
      {/*    />*/}
      {/*    <Select*/}
      {/*      label="Max engine power"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Maximum power"*/}
      {/*      data={maxEnginePowers}*/}
      {/*      id="maxEnginePower"*/}
      {/*      name="maxEnginePower"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.maxEnginePower}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className="mt-6 flex gap-4">*/}
      {/*    <Select*/}
      {/*      label="Acceleration"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Acceleration time"*/}
      {/*      data={accelerationOptions}*/}
      {/*      id="acceleration"*/}
      {/*      name="acceleration"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.acceleration}*/}
      {/*    />*/}
      {/*    <Select*/}
      {/*      label="Drivetrain"*/}
      {/*      className="w-1/2"*/}
      {/*      placeholder="Drivetrain"*/}
      {/*      data={drivetrains}*/}
      {/*      id="drivetrain"*/}
      {/*      name="drivetrain"*/}
      {/*      onChange={filters.formik.handleChange}*/}
      {/*      onBlur={filters.formik.handleBlur}*/}
      {/*      value={filters.formik.values.drivetrain}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</Card>*/}
    </div>
  );
};

export default MainFilters;
