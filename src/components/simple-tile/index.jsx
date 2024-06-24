import React from "react";
import Link from "next/link";
import MotorsImage from "@/components/motors-image";

const SimpleTile = (props) => {
  const { href = "", imageUrl, text } = props;

  return (
    <Link href={href}
          className="group border rounded transition hover:border-teal-400 block w-[270px] h-[182px] pb-[20px] flex flex-col justify-between items-center">
      <div className="flex justify-center h-max">
        <MotorsImage src={imageUrl} className="max-h-[120px] w-auto" height={200} width={200} />
      </div>
      <span className="transition group-hover:text-teal-400 font-bold uppercase">{text}</span>
    </Link>
  );
};

export default SimpleTile;
