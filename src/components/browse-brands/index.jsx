import React, { useState } from "react";
import Title from "@/components/title";
import Link from "next/link";
import MotorsImage from "@/components/motors-image";
import Button from "@/components/button";
import SvgIcon from "@/components/svg-icon";
import SimpleTile from "@/components/simple-tile";
import SmallSimpleTile from "@/components/simple-tile/small";

const BrowseBrands = (props) => {
  const { brands = [] } = props;

  const [isOpened, setIsOpened] = useState(false);

  const handleToggle = () => {
    setIsOpened(is => !is);
  };

  const mainBrands = brands.slice(0, 4);
  const secondaryBrands = brands.slice(4);

  return (
    <div>
      <Title className="mb-6">Browse by brand</Title>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {mainBrands.map(brand => {
          return (
            <div key={brand.slug} className="w-fit m-auto">
              <SimpleTile href={`/search/brand/${brand.slug}`} imageUrl={brand.logo.externalUrl} text={brand.name} />
            </div>
          );
        })}
      </div>

      {secondaryBrands.length > 0 && (
        <div className="text-center">
          <Button variant="text" className="border border-transparent px-2 py-1 hover:border-teal-400 !text-black"
                  onClick={handleToggle}>
            <SvgIcon name="plus" className={`transition transform ${isOpened ? "rotate-45" : ""}`} />
            <span>Show all brands</span>
          </Button>
        </div>
      )}

      <div className={`mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-5 justify-start hidden ${isOpened ? "!grid" : ""}`}>
        {secondaryBrands.map(brand => {
          return (
            <div key={brand.slug} className="w-fit m-auto">
              <SmallSimpleTile href={`/search/brand/${brand.slug}`} imageUrl={brand.logo.externalUrl} text={brand.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseBrands;
