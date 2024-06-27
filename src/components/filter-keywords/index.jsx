import React, {useState} from "react";
import TextInput from "@/components/input/text-input";
import Button from "@/components/button";
import SvgIcon from "@/components/svg-icon";

const FilterKeywords = (props) => {
    const {filters: form} = props;

    const [keyword, setKeyword] = useState("");

    const handleAddKeyword = () => {
        if (!keyword?.trim()) return false;
        const _keyword = keyword
            .split(",")
            .filter((val) => !!val)
            .join(",");
        if (!_keyword.trim()) return false;
        const value = form.formik.values.keyword
            ? `${form.formik.values.keyword},${_keyword}`
            : _keyword;
        form.formik.setFieldValue("keyword", value);
        setKeyword("");
    };

    const handleRemoveKeyword = (index) => {
        let filtered = [...form.formik.values.keyword.split(",")];
        filtered.splice(index, 1);
        filtered = filtered.join(",");
        form.formik.setFieldValue("keyword", filtered);
    };

    const handleRemoveAllKeywords = () => {
        form.formik.setFieldValue("keyword", "");
    };

    const keywordsInRedux = form.formik.values.keyword?.split(",").filter((val) => !!val) || [];

    return (
        <div>
            <div className="flex items-end gap-2">
                <TextInput
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    label="Add keywords"
                    placeholder="eg. sunroof,heated seats"
                />
                <Button
                    className="h-max"
                    text="Add"
                    variant="outline"
                    onClick={handleAddKeyword}
                />
            </div>

            {keywordsInRedux.length > 0 && (
                <>
                    <div className="mt-6 flex flex-wrap gap-4">
                        {keywordsInRedux.map((keyword, index) => {
                            return (
                                <div
                                    key={`${keyword}_${index}`}
                                    className="flex items-center gap-2 rounded-3xl bg-teal-100 px-3 py-1 font-semibold text-teal-600"
                                >
                                    {keyword}
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => handleRemoveKeyword(index)}
                                    >
                                        <SvgIcon name="close"/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Button
                        className="mt-3"
                        text="Clear all"
                        variant="link"
                        onClick={handleRemoveAllKeywords}
                    />
                </>
            )}
        </div>
    );
};

export default FilterKeywords;
