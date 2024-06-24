import React from "react";
import Link from "next/link";
import MotorsImage from "@/components/motors-image";

const SmallSimpleTile = (props) => {
  const { href = "", imageUrl, text } = props;

  return (
    <Link href={href}
          className="group border rounded transition hover:border-teal-400 block w-[270px] h-[42px] flex items-center">
      <div className="flex justify-center h-max ml-2 mr-3">
        <MotorsImage src={imageUrl} className="max-h-[40px] w-auto" height={50} width={50} />
      </div>
      <span className="transition group-hover:text-teal-400">{text}</span>
    </Link>
  );
};

export default SmallSimpleTile;
