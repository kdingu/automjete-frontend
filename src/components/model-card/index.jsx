import React from 'react';
import MotorsImage from "@/components/motors-image";
import {noop} from "@/helpers/utilities/utils";
import Link from "next/link";
import {useDispatch} from "react-redux";
import searchSlice from "@/store/features/search/slice";

const ModelCard = (props) => {
    const {onClick = noop, data = {}} = props;

    const dispatch = useDispatch();

    const updateStore = (e) => {
        onClick(e);

        dispatch(searchSlice.actions.setParameters({
            make: data.brandSlug,
            model: data.modelSlug
        }));
    };

    return (
        <Link onClick={updateStore} href={`/search/results`}>
            <article className="border shadow bg-white cursor-pointer">
                <div>
                    <MotorsImage src="" height={200} width={300} className="w-full"/>
                </div>

                <div className="p-4">
                    <div className="text-md font-bold">{data.brandName}</div>
                    <div className="text-xl font-light">{data.modelName}</div>
                </div>
            </article>
        </Link>
    );
};

export default ModelCard;
