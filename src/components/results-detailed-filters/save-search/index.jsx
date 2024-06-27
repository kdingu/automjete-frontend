import Button from "@/components/button";
import SvgIcon from "@/components/svg-icon";
import React from "react"

const SaveSearch = (props) => {
    const {handleSaveSearch, savedSearchExists} = props;
    return (
        <Button className="group" variant="text" onClick={() => handleSaveSearch()}>
            <div className="flex h-10 items-center justify-center gap-1">
            <span>
                {savedSearchExists ?
                    <SvgIcon
                        size='4'
                        name="wishlistRedFull"
                    />
                    :
                    <SvgIcon
                        className="fill-teal-700 transition group-hover:fill-teal-500"
                        name="heart"
                    />
                }
            </span>
                <span>
            {savedSearchExists ?
                "Search saved"
                :
                "Save search"
            }
            </span>
            </div>
        </Button>
    )
};

export default SaveSearch;
