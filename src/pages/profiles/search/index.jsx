import React, { useState } from "react";
import Container from "@/components/container";
import MainLayout from "@/components/main-layout";
import Link from "next/link";
import Pagination from "@/components/pagination";
import { reduxWrapper } from "@/store/store";
import { getDealers } from "@/helpers/api/dealer";

const ProfilesSearch = (props) => {
  const {dealers = []} = props;

  const [_dealers, setDealers] = useState(dealers);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('reviews');

  const handleChangePage = (pg) => {
    setPage(pg);
  };

  return (
    <MainLayout>
      <Container className="my-10">
        <div className="max-w-[1000px] m-auto flex">
          <div className="w-3/12">filters</div>
          <div className="w-9/12">
            <div>Sort by todo</div>

            <hr className="my-6" />

            {_dealers.map(dealer => {
              return (
                <Link key={dealer.id} href={`/profiles/${dealer.owner.id}`}>
                  <div className="border p-2">
                    <div>header</div>
                    <div>body</div>
                  </div>
                </Link>
              )
            })}

            <Pagination currentPage={page} totalPages={totalPages} onChange={handleChangePage} />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default ProfilesSearch;

export const getServerSideProps = reduxWrapper.getServerSideProps(store => async ({ locale, query }) => {
  const response = await getDealers();

  return {
    props: {
      dealers: response.data || []
    }
  };
});