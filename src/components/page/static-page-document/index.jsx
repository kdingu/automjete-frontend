import React from "react";
import {useTranslation} from "next-i18next";
import Paragraph from "@/components/page/static-page-document/components/paragraph";
import Heading from "@/components/page/static-page-document/components/heading";

const StaticPageDocument = (props) => {
    const {contentAl, contentEn} = props;
    const {i18n: {language}} = useTranslation();
    const content = language == "en" ? contentEn : contentAl;

    return (
        <div className="mb-32">
            {content.document.map(doc => {
                switch (doc.type) {
                    case "heading":
                        return <Heading document={doc}/>;
                    case "paragraph":
                        return <Paragraph document={doc}/>;
                    default:
                        return "";
                }
            })}
        </div>
    );
};

export default StaticPageDocument;
