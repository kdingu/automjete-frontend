import React, { useEffect, useState } from "react";
import Tag from "@/components/tag";
import ProductOwnerData from "../product-owner-data";
import { formatPrice } from "@/helpers/utilities/utils";
import { useTranslation } from "next-i18next";

const MainProductData = ({ product }) => {
  const {i18n} = useTranslation();

  const [price, setPrice] = useState();

  useEffect(() => {
    setPrice(formatPrice(product.price, i18n.language));
  }, [])

  return (
    <div>
      <div className="mb-2 mt-5 text-3xl font-bold">{product.name}</div>
      <div className="mb-4 text-xl leading-tight text-gray-700">
        {product.description}
      </div>
      {/* TO DO: add market average and icon for higher/lower */}
      {/* TO DO: add logic to get the field from some type of configuration
        <div className="flex flex-wrap gap-4 mb-8">
          <Tag>{product.kilometers}</Tag>
          <Tag>{product.productionYear}</Tag>
          <Tag>{product.gearbox}</Tag>
          <Tag>{product.fuelType}</Tag>
        </div>
      */}
      <div className="mb-4 text-4xl">{price}</div>
      <div className="hidden md:block">
        <ProductOwnerData owner={product.owner} version="long" />
      </div>
    </div>
  );
};

export default MainProductData;
