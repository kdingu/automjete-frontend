import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import {connect} from "react-redux";
import {getSessionAccount, getSessionUser} from "@/helpers/selectors";
import Title from "@/components/title";
import UserCardForm from "@/components/user-card-form";
import AccountCardForm from "@/components/account-card-form";
import Link from "next/link";
import Button from "@/components/button";

function PersonalDetails(props) {
    const {user, account} = props;

    return (
        <MainLayout>
            <Container className="mb-32 mt-10 max-w-[1000px]">
                <div className="!mb-10 flex items-center justify-between">
                    <Title className="!text-left">
                        My Details
                    </Title>
                    <Link href={`/profiles/${account.id}`} className="text-sm">
                        <Button variant="text">Go to my profile page</Button>
                    </Link>
                </div>

                <section id="user-card-form">
                    <UserCardForm user={user}/>
                </section>

                <section id="account-card-form">
                    <AccountCardForm user={user} account={account}/>
                </section>
            </Container>
        </MainLayout>
    );
}

const getProps = (state) => {
    return {
        user: getSessionUser(state),
        account: getSessionAccount(state),
    };
};

export default connect(getProps)(PersonalDetails);

export const getServerSideProps = () => {
    return {
        props: {},
    };
};
