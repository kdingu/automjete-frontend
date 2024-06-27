import React, {useCallback} from "react";
import Button from "@/components/button";
import SvgIcon from "@/components/svg-icon";
import ToggledSection from "@/components/results-detailed-filters/toggled-section";
import ToggledPopup from "@/components/results-detailed-filters/toggled-popup";
import AdvancedSelect from "@/components/results-detailed-filters/advanced-select";
import SaveSearch from "./save-search";

const ResultsDetailedFilters = (props) => {
    const {filters: form, totalVehicles, handleSaveSearch, savedSearchExists, category} = props;

    const selectedFiltersCount = Object.values(form.formik.values).filter(val => !!val).length;

    const sectionSelectProps = {
        className: "text-sm h-12 !border-gray-200",
        labelClassName: "w-[50px] !text-[16px] !font-thin !text-gray-500",
        labelPosition: "left",
        placeholderLabel: "Any",
    };

    const getSelectedLabel = useCallback(
        (key, selectedId) => {
            const values = (form?.options?.[key] || {}).hasOwnProperty("values") ? form?.options?.[key].values : form?.options?.[key] || [];
            const selectedTypes = values.filter((opt) => opt.value && selectedId && selectedId.indexOf(opt.value) !== -1);
            if (selectedTypes.length > 1) return "Multiple"; // todo: translate
            if (selectedTypes.length === 1) return selectedTypes[0].label;
            return "";
        },
        [form],
    );

    const locationFilters = form.facets.fields.filter(field => ["location"].includes(field.facet));
    const fieldFilters = form.facets.fields.filter(field => !["location", "keyword"].includes(field.facet));
    const attributeFilters = form.facets.attributes;

    const getTreePopup = (field) => {
        return field.filters.map((filter) => {
            return (
                <div key={`popup_wrapper_${field.facet}_${filter.filter}`}>
                    <ToggledPopup
                        key={`popup_${field.facet}_${filter.filter}`}
                        title={filter.filter}
                        popupTitle={filter.filter}
                        iconText={getSelectedLabel(filter.filter, form.formik.values[filter.filter])}
                        className="border-b"
                    >
                        {filter.type.toLowerCase() !== "checkbox" ? (
                            <AdvancedSelect
                                withSearch
                                options={form.options[filter.filter]}
                                value={form.formik.values[filter.filter]}
                                onChange={(value) => form.formik.setFieldValue(filter.filter, value)}
                                id={filter.filter}
                                name={filter.filter}
                            />
                        ) : (
                            form.methods.getComponentForFilter(filter)
                        )}
                    </ToggledPopup>
                </div>
            );
        });
    }

    const getTreeSection = (field) => {
        return (
            <ToggledSection
                title={field.facet}
                className="border-b"
            >
                {field.filters.map((filter, index, arr) => {
                    return (
                        <div key={`section_${field.facet}_${filter.filter}`}
                             className={arr.length !== index + 1 ? "mb-3" : ""}>
                            {form.methods.getComponentForFilter(filter)}
                        </div>
                    );
                })}
            </ToggledSection>
        );
    };

    return (
        <div className="rounded border">
            <div className="border-b px-3 pb-1 pt-2">
        <span className="inline-block w-full text-center text-lg font-bold">
          <span className="lowercase">{totalVehicles} {category.name} found</span>
        </span>
                <span className="inline-block w-full text-center text-sm text-gray-400">
          {selectedFiltersCount} filter(s) selected
        </span>
                <div className="mt-2 flex justify-between text-sm font-semibold">
                    <SaveSearch
                        handleSaveSearch={handleSaveSearch}
                        savedSearchExists={savedSearchExists}
                    />
                    <Button
                        className="group"
                        variant="text"
                        onClick={form.methods.handleClear}
                    >
                        <div className="flex h-10 items-center justify-center gap-1">
              <span>
                <SvgIcon
                    className="fill-teal-700 transition group-hover:fill-teal-500"
                    name="rotate"
                />
              </span>
                            <span>Reset</span>
                        </div>
                    </Button>
                </div>
            </div>

            {/* LOCATION filters */}
            {locationFilters.length > 0 && (
                <div className="border-b p-1">
                    {locationFilters.map((location) => {
                        return (
                            <div key={`wrapper_location_${location.facet}`}>
                                {location.filters.map((filter, index, arr) => {
                                    return (
                                        <div key={`location_filter_${location.facet}_${filter.filter}`}
                                             className={arr.length !== index + 1 ? "mb-3" : ""}>
                                            {form.methods.getComponentForFilter(filter)}
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
            )}

            {/* FIELD filters without location */}
            {fieldFilters.length > 0 && fieldFilters.map((field) => {
                if (field.section === "popup") {
                    return (
                        <div key={`outer_popup_wrapper_field_${field.facet}`}>
                            {getTreePopup(field)}
                        </div>
                    );
                }

                if (field.section === "section") {
                    return (
                        <div key={`outer_section_wrapper_field_${field.facet}`}>
                            {getTreeSection(field)}
                        </div>
                    );
                }
            })}

            {/* ATTRIBUTE filters */}
            {attributeFilters.length > 0 && attributeFilters.map((attribute) => {
                if (attribute.section === "popup") {
                    return (
                        <div key={`outer_popup_wrapper_attribute_${attribute.facet}`}>
                            {getTreePopup(attribute)}
                        </div>
                    );
                }

                if (attribute.section === "section") {
                    return (
                        <div key={`outer_section_wrapper_attribute_${attribute.facet}`}>
                            {getTreeSection(attribute)}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default ResultsDetailedFilters;
