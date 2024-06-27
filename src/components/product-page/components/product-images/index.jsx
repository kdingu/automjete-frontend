import React, {useMemo, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "@/components/next-js-image";
import Image from "next/image";
import SvgIcon from "@/components/svg-icon";
import {FALLBACK_IMAGE_URL} from "@/configs/constants";

const ProductImages = ({images}) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [activeImage, setActiveImage] = useState({
        url: images ? images.image ? images[0]?.image.url : images[0]?.externalUrl : FALLBACK_IMAGE_URL,
        index: 0
    });

    const handleIconClick = direction => {
        let index = activeImage.index;
        index = direction === 'left' ? index - 1 : index + 1;
        setActiveImage({
            url: images[index].image ? images[index]?.image.url : images[index]?.externalUrl,
            index
        })
    };

    const slides = useMemo(() => {
        // set slides to show and change order based on selected image
        if (images.length === 0) return;
        return [
            ...images.slice(activeImage.index, images.length).map((data) => ({src: data.image?.url || data.externalUrl})),
            ...images.slice(0, activeImage.index).map((data) => ({src: data.image?.url || data.externalUrl}))
        ];
    }, [images, activeImage]);

    const handleOpenGallery = () => {
        if (window.innerWidth > 768) {
            setIsGalleryOpen(true);
        }
    };

    return (
        <>
            <div
                className="relative mb-4 h-96 cursor-pointer -ml-4 -mr-4 md:ml-0 md:mr-0"
                onClick={handleOpenGallery}
            >
                <div
                    className={`${activeImage.index === 0 ? 'hidden' : ''} md:hidden absolute z-10 top-1/2 p-4 pl-1 pr-1 bg-gray-600 bg-opacity-60 rounded translate-x-2/4 -translate-y-2/4`}
                    onClick={() => handleIconClick('left')}
                >
                    <SvgIcon name='swiperLeftIcon'/>
                </div>
                <Image
                    fill
                    objectFit="cover"
                    alt=""
                    loading="eager"
                    draggable={false}
                    src={activeImage.url}
                />
                <div
                    className={`${activeImage.index === images.length - 1 ? 'hidden' : ''} md:hidden absolute z-10 right-0 top-1/2 p-4 pl-1 pr-1 bg-gray-600 bg-opacity-60 rounded -translate-x-2/4 -translate-y-2/4`}
                    onClick={() => handleIconClick('right')}
                >
                    <SvgIcon name='swiperRightIcon'/>
                </div>
            </div>
            <div className="hidden md:block">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3.5}
                >
                    {images.map((data, index) => {
                        const src = data.image?.url || data.externalUrl;
                        return <SwiperSlide
                            key={src}
                            onClick={() => setActiveImage({url: src, index})}
                        >
                            <Image
                                className="cursor-pointer"
                                width={200}
                                height={200}
                                alt=""
                                loading="eager"
                                draggable={false}
                                src={src}
                            />
                        </SwiperSlide>
                    })}
                </Swiper>
                <Lightbox
                    open={isGalleryOpen}
                    close={() => setIsGalleryOpen(false)}
                    slides={slides}
                    render={{slide: NextJsImage}}
                />
            </div>
        </>
    );
};

export default ProductImages;
