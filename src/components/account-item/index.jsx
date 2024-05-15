import Link from "next/link";
import React from "react";
import Card from "../card";
import SvgIcon from "../svg-icon";
import {noop} from "@/helpers/utilities/utils";

function AccountItem(props) {
  const { title = "", description = "", href = "", onClick = noop, className = "", remove, data } = props;

  return (
    <Link href={href} onClick={onClick}>
      <Card className={`w-[280px] min-h-[100px] h-full rounded-lg shadow hover:shadow-md transition ${className}`}>
        <div className="flex justify-between items-center mb-3">
          <h6 className="text-md font-thin">{title}</h6>
          <div className="flex items-center">
            <SvgIcon name="arrow-right" />
            {remove && <span onClick={e => remove(e, data)}><SvgIcon name="delete" /></span>}
          </div>
        </div>
        <p className="text-sm font-thin text-gray-600 whitespace-pre-line">{description}</p>
      </Card>
    </Link>
  );
}

export default AccountItem;
