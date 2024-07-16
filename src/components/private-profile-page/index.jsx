import React from 'react';
import Title from "@/components/title";
import Button from "@/components/button";
import Link from "next/link";
import {GoogleMapsEmbed} from "@next/third-parties/google";

const PrivateProfilePage = ({account, isSelfAccount}) => {
    const address = account?.address || {};

    const googleMapsQuery = `${address.address_line_1},${address.address_line_2},${address.city?.name},${address.country?.name},${address.zip_code}`;

    return (
        <div>
            {/* Widget 1 */}
            <div className="border flex flex-col lg:flex-row min-h-[580px]">
                <div className="w-full p-4 flex flex-col">
                    <h1 className="text-2xl">{account.name}</h1>

                    <hr className="my-5"/>

                    <div className="flex-1 mb-5">
                        Some details todo...
                    </div>

                    <div>
                        {isSelfAccount && (
                            <Link href="/account/personal-details">
                                <Button className="w-full mb-3">Edit my details</Button>
                            </Link>
                        )}
                        <Link href={`/profiles/${account.id}/vehicles`}>
                            <Button className="w-full mb-3">View {account.vehiclesCount} cars</Button>
                        </Link>
                        <Link href="#contact">
                            <Button variant="outline" className="w-full">Contact</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Widget 2 */}
            <div className="bg-teal-100 p-4 lg:my-16 lg:px-32 lg:pt-8 lg:pb-12" id="contact">
                <Title className="!text-left mb-6">Get in touch</Title>

                <div className="grid gap-10 lg:grid-cols-3">
                    {account.address ? (
                        <div>
                            <h3 className="text-xl text-semibold">Address</h3>
                            <p>{account.address.address_line_1}</p>
                            <p>{account.address.address_line_2}</p>
                            <p>{account.address.city.name}</p>
                            <p>{account.address.country.name}</p>
                            <p className="uppercase">{account.address.zip_code}</p>

                            <Button variant="text" className="mt-4 block">X kilometers away from you (todo)</Button>
                            <Button variant="outline" className="mt-8 block">Get directions (todo)</Button>
                        </div>
                    ) : "Address not set"}

                    <div>
                        <h3 className="mt-5 text-xl text-semibold">Phone number</h3>
                        <Link className="text-teal" href={`tel:${account.phone}`}>{account.phone}</Link>
                    </div>

                    <div>
                        <GoogleMapsEmbed
                            language="sq"
                            apiKey="AIzaSyA_rXmoJLHhRt07i6cpWIGxv2237-WPmX0"
                            width="100%"
                            height={400}
                            mode="place"
                            q={googleMapsQuery}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivateProfilePage;
