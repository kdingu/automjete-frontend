import React from "react"
import AccountItem from "../account-item";
import SavedVehicleCard from "../saved-vehicle-card";
import {noop} from "@/helpers/utilities/utils";

const SavedData = ({data, dataType, remove = noop, searchRedirect = noop}) => {
    return (
        <div className="justify-center md:justify-start flex flex-wrap gap-4">
            {!data || data.length === 0 ?
                <div className="mt-20 text-center w-full">No saved data yet.</div>
                :
                <div className="mt-20 w-full flex gap-10">
                    {
                        dataType === 'searches' ?
                            data.map((item, index) => {
                                return <AccountItem
                                    key={item.name + index}
                                    title={item.name}
                                    description={Object.keys(item.parameters).map(element => {
                                        return item.parameters[element] !== "" && `${element}\n`;
                                    })}
                                    onClick={() => searchRedirect(item)}
                                    data={item}
                                    remove={remove}
                                />
                            })
                            :
                            <div className="w-full">
                                {data.map((item, index) => {
                                    return (
                                        <div key={item.title + index} className="md:w-1/2 w-full inline-block mb-10">
                                            <div
                                                className={`border rounded border-gray-300 cursor-pointer transition-all ease-in-out duration-[250ms] shadow hover:-translate-y-0.5 hover:shadow-md ${index % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}>
                                                <SavedVehicleCard
                                                    vehicle={item}
                                                    removeVehicle={remove}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                </div>
            }
        </div>
    )
};

export default SavedData;
