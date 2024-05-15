import React, {useEffect} from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import AuthenticationForm from "@/components/authentication-form";
import {useRouter} from "next/router";
import {getSessionLoggedIn} from "@/helpers/selectors";
import {connect} from "react-redux";

const Authentication = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.isLoggedIn) router.replace("/account");
  }, [props.isLoggedIn]);

  return (
    <MainLayout>
      <Container className="my-10 md:min-h-[60vh] flex justify-center items-center">
        <AuthenticationForm />
      </Container>
    </MainLayout>
  );
};

const getAuthProps = (state) => {
  return {
    isLoggedIn: getSessionLoggedIn(state),
  };
};

export default connect(getAuthProps)(Authentication);

export const getServerSideProps = async ({ req, res, locale }) => {
  // const locales = await serverSideTranslations(locale ?? "al", ["login"]);

  return {
    props: {
      // ...locales,
    },
  };
};
