import React from "react";
import Container from "@/components/container";
import MainLayout from "@/components/main-layout";
import MotorsImage from "@/components/motors-image";
import Title from "@/components/title";
import SubTitle from "@/components/sub-title";
import Button from "@/components/button";
import Link from "next/link";
import {reduxWrapper} from "@/store/store";
import {getDealers} from "@/helpers/api/dealer";

const Profiles = (props) => {
    const {dealers} = props;

    return (
        <MainLayout>
            <div className="relative h-[500px]">
                <MotorsImage className="w-full object-cover" src="" fill/>
            </div>

            <Container>
                <div className="bg-white shadow p-10 text-center transform -translate-y-[25%]">
                    <Title>Dealers</Title>
                    <SubTitle className="mt-6">With 13,210 dealers you&apos;re sure to find the perfect dealer on
                        MotorsMarket today.</SubTitle>
                    <Link href="/profiles/search">
                        <Button className="mt-10">Search now</Button>
                    </Link>
                </div>

                <div>
                    <Title className="!text-left">Dealers in MotorsMarket</Title>
                    <SubTitle className="!text-left !mb-10">Browse the widest choice of car dealerships</SubTitle>

                    <div className="grid grid-cols-3 gap-6 mb-20">
                        {dealers.map(dealer => {
                            return (
                                <Link key={dealer.id} href={`/profiles/${dealer.owner.id}`}>
                                    <div className="border rounded px-4 py-3 shadow-sm hover:shadow-lg transition">
                                        <SubTitle className="!text-left">{dealer.name}</SubTitle>
                                        <div>Reviews todo...</div>
                                        <p>{dealer.owner.vehiclesCount} vehicles in stock</p>

                                        <hr className="my-3"/>

                                        <div className="flex justify-between">
                                            <div>{dealer.address.city.name}, {dealer.address.country.name}</div>
                                            <div>{dealer.phone}</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </MainLayout>
    );
};

export default Profiles;

export const getServerSideProps = reduxWrapper.getServerSideProps(store => async ({locale, query}) => {
    const response = await getDealers();

    return {
        props: {
            dealers: response.data || []
        }
    }
});
