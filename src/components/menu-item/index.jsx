import Link from "next/link";
import React from "react"

const MenuItem = ({item}) => {
  return (
    <>
      <Link className="transition hover:!text-gray-800 group-hover:text-gray-400" href={item.link}>{item.title}</Link>
    </>
  )
};

export default MenuItem;
