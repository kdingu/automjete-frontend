import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import Title from "@/components/title";
import Subtitle from "@/components/sub-title";
import AccountItem from "@/components/account-item";
import Button from "@/components/button";
import {useDispatch} from "react-redux";
import sessionSlice from "@/store/features/session/slice";

const Account = (props) => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(sessionSlice.actions.logout());
    };

    const items1 = [
        {
            id: "items11",
            title: "Selling",
            description: "Create, edit and manage your ads",
            href: "/account/my-ads",
        },
    ];

    const items2 = [
        {
            id: "items21",
            title: "Personal details",
            description: "Update your personal and contact details",
            href: "/account/personal-details",
        },
        {
            id: "items22",
            title: "Subscriptions and Packages",
            description: "Boost your posts for a higher chance to sell them, or become a certified Dealer in our platform",
            href: "/account/subscriptions",
        },
    ];

    const items3 = [
        {
            id: "items31",
            title: "Payment history",
            description: "See your advert and payment history",
            href: "/account/payment-history",
        },
    ];

    return (
        <MainLayout>
            <Container className="mt-10 mb-32 max-w-[1000px]">
                <Title className="md:!text-left !font-normal !mb-10">Your Account</Title>

                <section className="mb-10">
                    <Subtitle className="md:!text-left mb-5">Buying & selling</Subtitle>

                    <div className="justify-center md:justify-start flex flex-wrap gap-4">
                        {items1.map((item) => (
                            <AccountItem key={item.id} {...item} />
                        ))}
                    </div>
                </section>

                <section className="mb-10">
                    <Subtitle className="md:!text-left mb-5">Account settings</Subtitle>

                    <div className="justify-center md:justify-start flex flex-wrap gap-4">
                        {items2.map((item) => (
                            <AccountItem key={item.id} {...item} />
                        ))}
                    </div>
                </section>

                <section>
                    <Subtitle className="md:!text-left mb-5">Payment details</Subtitle>

                    <div className="justify-center md:justify-start flex flex-wrap gap-4">
                        {items3.map((item) => (
                            <AccountItem key={item.id} {...item} />
                        ))}
                    </div>
                </section>

                <Button className="mt-10" onClick={handleSignOut}>
                    Sign out
                </Button>
            </Container>
        </MainLayout>
    );
};

export default Account;

export const getServerSideProps = () => {
    return {
        props: {},
    };
};
