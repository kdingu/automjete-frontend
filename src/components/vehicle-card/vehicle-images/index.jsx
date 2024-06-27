import React from "react";
import MotorsImage from "@/components/motors-image";

const ImageSkeleton = () => {
    return (
        <div className="flex h-full animate-pulse overflow-hidden rounded">
            <div className="relative mr-1 flex w-full items-center justify-center bg-gray-300">
                <svg
                    className="h-10 w-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                >
                    <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>
        </div>
    );
};

const VehicleImages = (props) => {
    const {images = [], skeleton} = props;

    if (skeleton) return <ImageSkeleton/>;

    // const mainImage = images.find(img => img.name.indexOf('main') !== -1);
    const mainImage = images[0];
    // const secondaryImages = images.filter((img, index) => index < 3 && img.name.indexOf('main') === -1);
    const secondaryImages = images.slice(1, 4);

    return (
        <div className="flex h-full overflow-hidden rounded">
            <div className="relative mr-1 h-full max-h-80 w-full">
                <div className="relative h-full">
                    <MotorsImage
                        src={mainImage?.image?.url || mainImage?.externalUrl}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="bg-gray-100 object-contain"
                    />
                </div>
            </div>

            {secondaryImages.length > 0 ? (
                <div className="flex w-32 flex-col gap-1 h-full max-h-80">
                    {secondaryImages.map((image, index) => {
                        return (
                            <div key={`${image.name}_${index}`} className="relative h-full">
                                <MotorsImage
                                    src={image?.image?.url || image?.externalUrl}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="bg-gray-100 object-contain"
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default VehicleImages;
