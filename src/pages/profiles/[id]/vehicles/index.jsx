import React, {useLayoutEffect, useState} from "react";
import Container from "@/components/container";
import MainLayout from "@/components/main-layout";
import {doSearch} from "@/helpers/api/search";
import Title from "@/components/title";
import VehicleCard from "@/components/vehicle-card";
import Pagination from "@/components/pagination";
import {toast} from "react-toastify"

const DEFAULT_LIMIT = 5;

const ProfileVehicles = (props) => {
  const {dealerId, vehicles: _vehicles} = props;

  const [vehicles, setVehicles] = useState(_vehicles);
  const [page, setPage] = useState(_vehicles.page || 1)
  const [limit, setLimit] = useState(_vehicles.limit || DEFAULT_LIMIT)

  const handleChangePage = (page) => {
    setPage(page)
  };

  useLayoutEffect(() => {
    const handleSearch = async () => {
      const response = await doSearch({
        page,
        limit,
        parameters: {
          owner: {id: dealerId},
        }
      });

      if (!response.success || !response.data) {
        toast.error("Something went wrong...");
      } else {
        setVehicles(response.data)
      }
    };

    handleSearch()
  }, [page, limit]);

  return (
    <MainLayout>
      <Container className="my-10">
        <Title className="mb-20">Dealer vehicles</Title>

        <div>
          <Pagination mini currentPage={page} totalPages={vehicles.totalPages} onChange={handleChangePage} />

          {vehicles.results.map(vehicle => {
            return (
              <div key={vehicle.id} className="my-10">
                <VehicleCard {...vehicle} />
              </div>
            )
          })}

          <Pagination currentPage={page} totalPages={vehicles.totalPages} onChange={handleChangePage} />
        </div>
      </Container>
    </MainLayout>
  );
};

export default ProfileVehicles;

export const getServerSideProps = async ({params, query}) => {
  const response = await doSearch({
    page: query.page || 1,
    limit: query.limit || DEFAULT_LIMIT,
    parameters: {
      owner: {id: params.id},
    }
  });

  if (!response.success || !response.data) {
    return {
      notFound: 404
    }
  }

  return {
    props: {
      dealerId: params.id,
      vehicles: response.data
    }
  };
};