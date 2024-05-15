import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import MainBannerCTA from "@/components/main-banner-cta";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { serverUsePageData } from "@/helpers/utilities/server-side-utils";
import BrowseBrands from "@/components/browse-brands";
import { useSelector } from "react-redux";
import Title from "@/components/title";
import SubTitle from "@/components/sub-title";
import Link from "next/link";
import Button from "@/components/button";
import MotorsImage from "@/components/motors-image";
import SvgIcon from "@/components/svg-icon";

const Home = (props) => {
  const { pageData } = props;
  const { configuration = {} } = pageData;

  // TODO: get this at server render
  const brands = useSelector(state => state.application.data.makes);

  return (
    <MainLayout>
      <Container className="my-10">
        <MainBannerCTA {...configuration?.widgets?.["MainBannerCTA"]} />

        <div className="mt-20">
          <BrowseBrands brands={brands} />
        </div>

        <div className="border my-20">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-blue-500 px-6 py-8">
              <Title className="!text-left text-white">Place an advert on MotorsMarket</Title>
              <SubTitle className="!text-left text-white">Get the price you deserve</SubTitle>
              <SubTitle className="!text-left text-white mt-4 mb-0">
                See our: <Link href="/account/" className="underline">advertising prices</Link>
              </SubTitle>

              <Link className="block mt-10" href="/account/my-ads/create">
                <Button className="bg-white hover:bg-white hover:!text-blue-800 border-white px-10 py-6 text-3xl md:text-xl !text-blue-400">Create your advert</Button>
              </Link>

              <Link className="block mt-3 text-white underline text-lg" href="/account/my-ads">
                Manage existing adverts
              </Link>
            </div>

            <div className="relative hidden md:block">
              {/* TODO set src of this widgets image in backend */}
              <MotorsImage src="" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="my-32">
          <div className="border px-10 py-5">
            <Title className="mb-0">Follow us on social media</Title>
            <SubTitle>All the latest news for you</SubTitle>
            <div className="flex gap-x-10 justify-center mt-8">
              <Link href="#" className="group flex flex-col items-center">
                <SvgIcon name="instagram" className="group-hover:text-blue-400" />
                <span className="group-hover:text-blue-400">Instagram</span>
              </Link>
              <Link href="#" className="group flex flex-col items-center">
                <SvgIcon name="facebook" className="group-hover:text-blue-400" />
                <span className="group-hover:text-blue-400">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Home;

export const getServerSideProps = async ({ req, res, locale }) => {
  // const locales = await serverSideTranslations(locale ?? "al", [
  //   "common", "login",
  // ]);

  return {
    props: {
      locale,
      // ...locales,
      pageData: await serverUsePageData("homepage"),
    },
  };
};
