import {useDispatch, useSelector} from "react-redux";
import {debounce, getMakes, getMaxPrices, getMinPrices, getModels, noop} from "@/helpers/utilities/utils";
import {useFormik} from "formik";
import React, {useCallback, useEffect, useMemo, useRef} from "react";
import searchSlice from "@/store/features/search/slice";
import Select from "@/components/select";
import TextInput from "@/components/input/text-input";
import SelectCheckbox from "@/components/select/select-checkbox";

// TODO get from BE
const range = [
    {value: "1", label: "10km"},
    {value: "2", label: "100km"},
    {value: "3", label: "500km"},
    {value: "h1", label: "1000km"},
    {value: "h2", label: "5000km"},
];

const getInitialState = (facets = {}, storeState = {}) => {
    const initialState = {...storeState};

    for (const {filters} of facets.fields) {
        for (const {filter} of filters) {
            if (!initialState[filter]) initialState[filter] = "";
        }
    }

    for (const {filters} of facets.attributes) {
        for (const {filter} of filters) {
            if (!initialState[filter]) initialState[filter] = "";
        }
    }

    return initialState;
};

const getOptionsForFacets = ({facets, currentCategory, makes, models, prices}, searchParameters) => {
    // todo A
    const options = {
        range,
        make: getMakes(makes),
        model: getModels(searchParameters.make, makes),
        price_min: getMinPrices(searchParameters.price_max, prices.values),
        price_max: getMaxPrices(searchParameters.price_min, prices.values),
    };

    // todo A: Where will we get the values for field filters from? ... We get attribute filter values from attribute options. What about fields?
    // for (const { facet, filters } of facets.fields) {
    //   for (const { type, filter } of filters) {
    //     const facetOptions = currentCategory.attributes.find(attribute => attribute.code === filter)?.options || [];
    //     if (facetOptions.length > 0) options[facet] = currentCategory.attributes.find(attribute => attribute.code === facet)?.options || [];
    //   }
    // }

    for (const {facet, filters} of facets.attributes) {
        for (const {type, filter} of filters) {
            const facetOptions = currentCategory.attributes.find(attribute => attribute.code === filter)?.options || [];
            if (facetOptions.length > 0) options[facet] = currentCategory.attributes.find(attribute => attribute.code === facet)?.options || [];
        }
    }

    return options;
};

const rules = [
    {parameterKey: "make", childParameterKey: "model", rule: "on_change_clear"},
];

const useFilterInterdependenciesEffect = (formik) => {
    const searchParameters = useSelector((state) => state.search.parameters);
    const previousSearchParameters = useRef(searchParameters);

    const changeHandler = useCallback(() => {
        const changedKeys = (() => {
            return Object
                .keys(searchParameters)
                .map(key => {
                    if (searchParameters[key] !== previousSearchParameters.current[key]) return key;
                    return false;
                })
                .filter(is => !!is);
        })();

        for (const changedKey of changedKeys) {
            const rule = rules.find(rule => rule.parameterKey === changedKey);

            if (rule) {
                formik.setFieldValue(rule.childParameterKey, "");
            }
        }
    }, [rules, formik, searchParameters]);

    // register a change listener for each pair
    useEffect(() => {
        changeHandler();
        previousSearchParameters.current = searchParameters;
    }, [searchParameters]);
};

/**
 * Hook that returns an instance of Formik, an options object for inputs and methods object to use in cases like to clear all search parameter values.
 * Use Formik instance to control input values.
 * Use options object to provide values to select inputs etc.
 * This hook internally manages the state of redux for search parameters, initial search parameters and persisted search parameters.
 * @return {{methods: {handleClear: handleClear}, options: FacetAttributeOptions, formik: FormikInstance}}
 */
const useFilters = (props = {}) => {
    const {onSubmit = noop} = props;

    const dispatch = useDispatch();
    const application = useSelector(state => state.application);
    const applicationData = application.data;
    const search = useSelector(state => state.search);
    const searchParameters = search.parameters;
    const facets = applicationData.facets;
    const initialValues = getInitialState(facets, searchParameters);
    const options = useMemo(() => getOptionsForFacets(applicationData, searchParameters), [applicationData, searchParameters]);
    const formik = useFormik({initialValues, onSubmit});

    const getComponentForFilter = useCallback(({type, filter}, _options = {}) => {
        switch (type.toLowerCase()) {
            case "injected":
                return _options.component(_options.props);
            case "select":
                return (
                    <Select
                        label={_options.showLabel ? filter : ""}
                        placeholderLabel={filter}
                        data={options[filter]}
                        id={filter}
                        name={filter}
                        onChange={formik.handleChange}
                        value={formik.values[filter]}
                    />
                );
            case "checkbox":
                return (
                    <SelectCheckbox
                        data={[{label: filter, value: filter}]}
                        id={filter}
                        name={filter}
                        onChange={formik.setFieldValue}
                        value={formik.values[filter]}
                    />
                );
            case "select_checkbox":
                return (
                    <SelectCheckbox
                        label={_options.showLabel ? filter : ""}
                        data={options[filter]}
                        id={filter}
                        name={filter}
                        onChange={formik.setFieldValue}
                        value={formik.values[filter]}
                    />
                );
            case "multiselect_checkbox":
                return (
                    <SelectCheckbox
                        multiselect
                        label={_options.showLabel ? filter : ""}
                        data={options[filter]}
                        id={filter}
                        name={filter}
                        onChange={formik.setFieldValue}
                        value={formik.values[filter]}
                    />
                );
            case "multiselect": // SAME AS multiselect_checkbox
                return (
                    <SelectCheckbox
                        multiselect
                        label={_options.showLabel ? filter : ""}
                        data={options[filter]}
                        id={filter}
                        name={filter}
                        onChange={formik.setFieldValue}
                        value={formik.values[filter]}
                    />
                );
            case "text":
                return (
                    <TextInput
                        label={_options.showLabel ? filter : ""}
                        placeholder={filter}
                        id={filter}
                        name={filter}
                        onChange={formik.handleChange}
                        value={formik.values[filter]}
                    />
                );
            default:
                console.warn(`No component and case handler defined for filter type: ${type}`);
                return <span className="text-red-600 text-xs">No case for &quot;{type}&quot;</span>;
        }
    }, [formik]);

    const handleClear = () => {
        dispatch(searchSlice.actions.setSearch({
            page: 1,
        }))
        Object.keys(initialValues).forEach((key) => {
            formik.setFieldValue(key, "");
        });
    };
    const handleClearMemoized = useCallback(handleClear, [formik, initialValues]);

    const updateSearchParameters = (values) => {
        dispatch(searchSlice.actions.setParameters(values));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateSearchParametersDebounced = useCallback(debounce(updateSearchParameters), []);

    // On change of formik values, update search parameters in store.
    useEffect(() => {
        updateSearchParametersDebounced(formik.values);
    }, [updateSearchParametersDebounced, formik.values]);

    // For filters of the same facet, determine a dependency logic. Example to clear the second if the first has no value.
    useFilterInterdependenciesEffect(formik);

    return useMemo(() => ({
        facets,
        formik,
        options,
        methods: {
            handleClear: handleClearMemoized,
            getComponentForFilter,
        },
    }), [
        facets,
        formik,
        options,
        handleClearMemoized,
        getComponentForFilter,
    ]);
};

export default useFilters;
