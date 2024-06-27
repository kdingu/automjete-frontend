import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import Title from "@/components/title";
import {connect} from "react-redux";
import Link from "next/link";
import SvgIcon from "@/components/svg-icon";
import dynamic from 'next/dynamic'

const CSRVehicleCard = dynamic(() => import("@/components/vehicle-card"), {ssr: false})

function MyAds(props) {
    const {ads} = props;

    return (
        <MainLayout>
            <Container className="mt-10 mb-32 max-w-[1000px]">
                <div className="flex items-center justify-between !mb-10">
                    <Title className="md:!text-left !font-normal">My Advertisements</Title>

                    <Link href="/account/my-ads/create"
                          className="text-teal flex items-center gap-2 font-semibold underline inline w-max p-1">
                        <div>Advertise a vehicle you want to sell</div>
                        <SvgIcon name="plus" className="fill-teal"/>
                    </Link>
                </div>

                <section>
                    {ads.length === 0 && (
                        <p className="mb-3 text-xl">No Advertisements Created</p>
                    )}

                    {ads.map(vehicle => {
                        return (
                            <div key={vehicle.id} className="mb-10">
                                <CSRVehicleCard {...vehicle} disableSave/>
                            </div>
                        )
                    })}
                </section>
            </Container>
        </MainLayout>
    );
}

const getMyAdsProps = (state) => {
    return {
        ads: state.session?.account?.vehicles || []
    }
};

export default connect(getMyAdsProps)(MyAds);

export const getServerSideProps = () => {
    return {
        props: {},
    };
};
