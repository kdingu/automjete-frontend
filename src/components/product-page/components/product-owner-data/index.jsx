import Image from "next/image";
import React from "react"

const ProductOwnerData = ({owner, version = 'short'}) => {
  const address = owner.address || {}

  return (
    <div className={`mt-10 pr-4 pl-4 md:pl-3 md:pr-3 p-3 ${version === 'long' ? 'bg-gray-50' : ''}`}>
      <Image
          className="cursor-pointer"
          width={200}
          height={200}
          alt=""
          loading="eager"
          draggable={false}
          src={owner.logo?.externalUrl}
      />
      <div className="mt-3">
          <span className="text-xl mr-1">
              {owner.name}
          </span>
          <a href={`/profile/${owner.id}`} className="text-l cursor-pointer text-blue-400">
              Find out more
          </a>
      </div>
      {version === 'long' && (
        <>
            <div className="mt-3">
                {owner.email}
            </div>
            <div className="mt-3">
                {address.address_line_1}
            </div>
            <div className="mt-3">
                {address.address_line_2}
            </div>
            <div className="mt-3">
                {address.zip_code}
            </div>
        </>
      )}
    </div>
  )
};

export default ProductOwnerData;
