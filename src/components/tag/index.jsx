import React from "react";

const TagSkeleton = () => {
  return (
    <div className="h-6 w-28 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
  );
};

const Tag = (props) => {
  const { children, variant = "gray", skeleton, className = "" } = props;

  if (skeleton) return <TagSkeleton />;

  const variantClasses = () => {
    switch (variant) {
      case "success":
        return "text-gray-700 bg-green-200";
      default:
        return "text-gray-700 bg-gray-200";
    }
  };

  return (
    <div
      className={`inline-block rounded px-3 py-1 text-xs ${variantClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default Tag;
