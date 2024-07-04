import React from "react";
import {connect} from "react-redux";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import {getDealer} from "@/helpers/api/dealer";
import {reduxWrapper} from "@/store/store";
import {ssrStoreActions} from "@/helpers/utilities/server-side-utils";
import {useFormik} from "formik";
import DealerProfilePage from "@/components/dealer-profile-page";
import PrivateProfilePage from "@/components/private-profile-page";

const Profile = (props) => {
    const {dealer} = props;

    const contactForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            contactMethod: "",
            contactTime: "",
            message: "",
            specialPromos: true,
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        },
    });

    const isSelfAccount = dealer.id === props.session.account.id
    const isPrivate = dealer?.owner?.type === "s1_private";
    const isDealer = dealer?.owner?.type === "s1_dealer";

    return (
        <MainLayout>
            <Container className="my-10 px-0">
                {isDealer &&
                    <DealerProfilePage dealer={dealer} contactForm={contactForm} isSelfAccount={isSelfAccount}/>}
                {isPrivate && <PrivateProfilePage account={dealer} isSelfAccount={isSelfAccount}/>}
            </Container>
        </MainLayout>
    );
};

const getProps = (state) => {
    return {
        session: state.session
    };
};

export default connect(getProps)(Profile);

export const getServerSideProps = reduxWrapper.getServerSideProps(store => async ({locale, query}) => {
    // const locales = await serverSideTranslations(locale ?? "al", ["common", "profile"]);
    const response = await getDealer(query.id);

    const actions = [];
    await ssrStoreActions(store, actions);

    if (!response.data) {
        return {
            notFound: true,
        };
    }

    if (response.error) console.error("ERROR: getDealer", response);

    return {
        props: {
            // ...locales,
            dealer: response.data || {},
        },
    };
});
