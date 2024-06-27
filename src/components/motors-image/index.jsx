import React from "react";
import Image from "next/image";
import {FALLBACK_IMAGE_URL} from "@/configs/constants";

const MotorsImage = (props) => {
    const otherProps = {
        src: props.src ? props.src : FALLBACK_IMAGE_URL,
        alt: props.alt || 'Random image'
    };

    if (!props.src) {
        otherProps.alt = "Fallback image. Gray background with centered domain name text.";
    }

    return (
        <Image
            {...props}
            {...otherProps}
        />
    );
};

export default MotorsImage;
