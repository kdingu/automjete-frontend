import React from "react";
import VehicleImages from "@/components/vehicle-card/vehicle-images";
import Tag from "@/components/tag";
import Pill from "@/components/pill";
import SvgIcon from "@/components/svg-icon";

const Skeleton = () => {
  return (
    <div className="flex rounded border shadow-sm transition">
      <div className="w-5/12 flex-grow">
        <VehicleImages skeleton />
      </div>
      <div className="h-full w-7/12">
        <div className="mb-4 p-2">
          <div className="mb-2 flex gap-2">
            <Tag skeleton />
          </div>
          <div className="mb-3 flex justify-between">
            <div className="h-2.5 w-40 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-2.5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <p className="mb-2 mt-4 text-sm">
            <span className="mb-2 h-2.5 block w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></span>
            <span className="mb-2 h-2.5 block w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></span>
            <span className="mb-2 h-2.5 block w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></span>
            <span className="mb-2 h-2.5 block w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></span>
            <span className="h-2.5 w-80 block animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></span>
          </p>
          <div className="text-sm font-bold">
            <div className="mr-2 inline-block h-2.5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="mr-2 inline-block h-2.5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="inline-block h-2.5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        <hr />

        <div className="flex items-center justify-between p-2 text-sm">
          <div>
            <div className="mb-3">
              <div className="h-2.5 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="mb-3 flex items-center gap-1">
              <div className="h-2.5 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
