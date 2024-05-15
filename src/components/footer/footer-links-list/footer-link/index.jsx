import React from "react";
import Link from "next/link";

const FooterLink = ({ link = "", label = "" }) => (
  <Link href={link} className="inline-block text-sm text-gray-700 mb-2 block">
    {label}
  </Link>
);

export default FooterLink;
