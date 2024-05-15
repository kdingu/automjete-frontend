import React, { useState } from "react";
import TextInput from "@/components/input/text-input";
import Select from "@/components/select";
import Card from "@/components/card";
import ButtonGroup from "@/components/button-group";
import Button from "@/components/button";
import FilterKeywords from "@/components/filter-keywords";

const SideFilters = (props) => {
  const {filters} = props;

  const [buyWith, setBuyWith] = useState("cash");

  const handleSelectCashOption = () => {
    setBuyWith("cash");
  };

  const handleSelectFinanceOption = () => {
    setBuyWith("finance");
  };

  const generalFilters = filters.facets.fields.filter(field => field.facet !== "price" && field.facet !== "keyword");
  const priceFilters = filters.facets.fields.filter(field => field.facet === "price");
  const showKeywordFilter = filters.facets.fields.find(field => field.facet === "keyword");

  return (
    <div>
      <div className="mb-10">
        {generalFilters.map((field) => {
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
      </div>

      <Card title="Bying with">
        <ButtonGroup>
          <Button
            text="Cash"
            onClick={handleSelectCashOption}
            active={buyWith === "cash"}
          />
          <Button
            text="Finance"
            onClick={handleSelectFinanceOption}
            active={buyWith === "finance"}
          />
        </ButtonGroup>

        {buyWith === "cash" && (
          <div className="mt-6 flex gap-4">
            {priceFilters.map(field => {
              return (
                <div key={field.facet} className="w-full gap-4 mb-3 grid grid-cols-1">
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
          </div>
        )}

        {buyWith === "finance" && (
          <p className="mb-6 mt-10 text-center text-2xl">Coming Soon!</p>
        )}
      </Card>

      {showKeywordFilter && (
        <Card title="Keywords">
          <FilterKeywords filters={filters} />
        </Card>
      )}

    </div>
  );
};

export default SideFilters;
