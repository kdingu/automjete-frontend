import SvgIcon from "@/components/svg-icon";
import React from "react"

const InfoWithIcon = ({title = '', description = '', iconName, children}) => {
    return (
        <div className="flex gap-5 w-6/12 md:w-4/12">
            {description !== '' && (
                <>
                    <SvgIcon name={iconName}/>
                    <div className="text-base">
                        {title &&
                            <div className="mb-2">{title}</div>
                        }
                        {description &&
                            <div className="mb-2">{description}</div>
                        }
                        {children &&
                            <div>{children}</div>
                        }
                    </div>
                </>
            )}
        </div>
    )
};

export default InfoWithIcon;
