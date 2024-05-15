import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import ProductImages from "./components/product-images";
import SvgIcon from "../svg-icon";
import MainProductData from "./components/main-product-data";
import FullProductData from "./components/full-product-data";

const ProductPage = ({ vehicle }) => {
  const router = useRouter();
  const wishlisted = false;
  return (
    <>
      <div className="flex justify-between mt-4 mb-4">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <SvgIcon name="backIconPdp" />
        </div>
        <div className="flex gap-4">
          <span className="cursor-pointer">
            {wishlisted ? (
              <SvgIcon name="wishlistRedFull" />
            ) : (
              <SvgIcon name="wishlistRedEmpty" />
            )}
          </span>
          <span className="cursor-pointer">
            <SvgIcon name="shareSocial" />
          </span>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="md:w-7/12 w-full">
          <ProductImages images={vehicle.images} />
          <div className="md:hidden">
            <MainProductData product={vehicle} />
          </div>
          <FullProductData product={vehicle} />
        </div>
        <div className="md:w-5/12 hidden md:block">
          <MainProductData product={vehicle} />
          <div className="text-2xl mt-5">Financing: Coming soon</div>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="w-7/12">
        </div>
        <div className="w-5/12">
        </div>
      </div>
    </>
  );
};

export default ProductPage;
