import React from "react";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MotorsImage from "@/components/motors-image";
import { serverUsePageData } from "@/helpers/utilities/server-side-utils";
import StaticPageDocument from "@/components/page/static-page-document";

const StaticPage = (props) => {
  const { locale, pageData } = props;

  const { t } = useTranslation("about-us");

  const getTitle = () => {
    switch (locale) {
      case "en":
        return pageData.titleEn ? pageData.titleEn : false;
      default: // al
        return pageData.titleAl ? pageData.titleAl : false;
    }
  };

  const getDescription = () => {
    switch (locale) {
      case "en":
        return pageData.descriptionEn ? pageData.descriptionEn : false;
      default: // al
        return pageData.descriptionAl ? pageData.descriptionAl : false;
    }
  };

  const description = getDescription();
  const title = getTitle();

  return (
    <MainLayout>
      <div className="py-10 mb-10 bg-blue-50">
        <Container>
          <div className="flex justify-between items-center">
            <div>
              {title && <h1 className="text-4xl">{title}</h1>}
              {description && <p className="mt-4 max-w-[600px] text-gray-600">{description}</p>}
            </div>

            <div>
              {pageData.configuration?.logo?.url ? (
                <MotorsImage src={pageData.configuration?.logo.url} height={100} width={100} />
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <StaticPageDocument {...pageData} />
      </Container>
    </MainLayout>
  );
};

export default StaticPage;

export const getServerSideProps = async ({ locale, query }) => {
  // const locales = await serverSideTranslations(locale ?? "al", [query.code, "common"]);
  const pageData = await serverUsePageData(query.code);

  if (pageData.notFound) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      locale,
      // ...locales,
      pageData,
    },
  };
};
