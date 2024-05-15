import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductPage from "@/components/product-page";
import MainLayout from "@/components/main-layout";
import Container from "@/components/container";
import { getVehicle } from "@/helpers/api/vehicle";

const VehiclePage = (props) => {
  return (
    <MainLayout>
      <Container>
        <ProductPage vehicle={props.productData} />
      </Container>
    </MainLayout>
  );
};

export default VehiclePage;

export const getServerSideProps = async ({ locale, query }) => {
  // const locales = await serverSideTranslations(locale ?? "al", ["common", "product"]);
  const response = await getVehicle(query.id);

  if (response.error) console.error('ERROR: getVehicle', response);

  return {
    props: {
      // ...locales,
      productData: response.data || {},
    },
  };
};
