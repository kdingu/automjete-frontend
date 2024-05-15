import React from "react"
import InfoWithIcon from "../info-with-icon";
import { useTranslation } from "next-i18next";
import TechnicalSpec from "../technical-spec";
import Accordion from "@/components/accordion";
import AccordionItem from "@/components/accordion/accordion-item";
import ProductOwnerData from "../product-owner-data";
import { groupBy } from "lodash/collection";

const FullProductData = ({product}) => {
    const { t } = useTranslation("product");
	const groupedAttributes = groupBy((product?.attributeValues || []), "attribute.group")
	const attributeGroups = Object.keys(groupedAttributes)

    return (
        <div>
            <div className="text-2xl mb-1 mt-10">Overview</div>
            <div className="text-base mb-5 leading-tight text-gray-700">{product.title}</div>
            <div className="flex flex-wrap justify-between mb-5">
                {product.kilometers && <InfoWithIcon iconName="mileageIcon" title={'Mileage'} description={product.kilometers} />}
                {product.firstRegistration && <InfoWithIcon iconName="registrationIcon" title={'Registration'} description={product.firstRegistration} />}
                {product.previousOwners && <InfoWithIcon iconName="ownersIcon" title={'Owners'} description={product.previousOwners || 1} />}
            </div>
            <div className="flex flex-wrap">
                {groupedAttributes['GENERAL'].map((data, index) => (
                    <TechnicalSpec
                    key={data}
                    index={index}
                    label={t(`${data.attribute.code}Label`)}
                    value={data.attribute.options.find(option => option.value === data.data.value)?.label}
                />
                ))}
            </div>
            <div className="text-2xl mb-1 mt-10">{t('descriptionLabel')}</div>
            <div className="text-2xl mb-1 mt-10">{product.description}</div>
            <div className="text-2xl mb-10 mt-10">{t('featuresAndSpecsLabel')}</div>
            <div>
                <Accordion>
                    {attributeGroups.map((attribute) => (
                        <AccordionItem key={attribute} title={t(`${attribute}Label`)}>
                            {groupedAttributes[attribute].map(feature => <div key={feature.attributeName} className="pl-10 pt-4 pb-4">{feature.attribute.label}</div>)}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="text-2xl mt-10">{t('aboutSellerLabel')}</div>
            <div className="hidden md:block">
                <ProductOwnerData owner={product.owner} version='short' />
            </div>
            <div className="md:hidden -mr-4 -ml-4">
                <ProductOwnerData owner={product.owner} version="long" />
            </div>
        </div>
    )
};
export default FullProductData;
