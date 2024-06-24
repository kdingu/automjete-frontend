import React, { useCallback, useMemo, useState } from "react";
import Container from "@/components/container";
import MainLayout from "@/components/main-layout";
import { getSessionToken, getSessionUserId, getSessionUserSavedSearches, getSessionUserSavedVehicles } from "@/helpers/selectors";
import { connect, useDispatch } from "react-redux";
import SavedData from "@/components/saved-data";
import sessionSlice from "@/store/features/session/slice";
import searchSlice from "@/store/features/search/slice";
import { useRouter } from "next/router";

const INITIAL_STATE = 'searches'; // could only be 'adverts' or 'searches' for now

const Saved = (props) => {
  const { savedSearches, savedVehicles, token, userId } = props;
  const [chosenElement, setChosenElement] = useState(INITIAL_STATE);
  const router = useRouter();
  const dispatch = useDispatch();
  const savedData = useMemo(() => {
    return chosenElement === 'adverts' ? savedVehicles.vehicles : savedSearches?.searched;
  }, [chosenElement, savedSearches, savedVehicles]);

  const removeVehicle = (vehicle) => {
    let newVehicles = [];
    newVehicles = savedVehicles?.vehicles.filter(vehicleData => vehicleData.id !== vehicle.id);
    dispatch(sessionSlice.actions.updateSavedVehicles({
        token: token,
        id: userId,
        savedVehicles: {
          vehicles: newVehicles,
        },
      })
    );
  }

  const removeSearch = (search) => {
    let newSearches = [];
    newSearches = savedSearches?.searched.filter(searchData => !(Object.keys(search.parameters).every(key => searchData.parameters[key] === search.parameters[key])));
    dispatch(sessionSlice.actions.updateSavedSearches({
        token: token,
        id: userId,
        savedSearches: {
          searched: newSearches,
        },
      })
    );
  }

  const removeFunction = useCallback((e, data) => {
    e.preventDefault();
    e.stopPropagation();
    return chosenElement === 'adverts' ? removeVehicle(data) : removeSearch(data);
  }, [chosenElement]);

  const searchRedirect = (search) => {
    dispatch(searchSlice.actions.setParameters(search.parameters));
    router.push({
      pathname: "/search/results",
      query: router.query,
    });
  }

  return (
    <MainLayout>
      <Container className="my-10">
        <div className="border-b-2 flex justify-center">
          <div className={`py-6 w-1/2 text-center cursor-pointer ${chosenElement === 'searches' ? 'border-b-teal-800 border-b-2' : ''}`} onClick={() => setChosenElement('searches')}>Searches</div>
          <div className={`py-6 w-1/2 text-center cursor-pointer ${chosenElement === 'adverts' ? 'border-b-teal-800 border-b-2' : ''}`} onClick={() => setChosenElement('adverts')}>Adverts</div>
        </div>
        <section className="mb-10">
          <SavedData data={savedData} dataType={chosenElement} remove={removeFunction} searchRedirect={searchRedirect} />
        </section>
      </Container>
    </MainLayout>
  );
};

const getSavedData = (state) => {
  return {
    savedSearches: getSessionUserSavedSearches(state),
    savedVehicles: getSessionUserSavedVehicles(state),
    token: getSessionToken(state),
    userId: getSessionUserId(state),
  };
};

export default connect(getSavedData)(Saved);

export const getServerSideProps = () => {
  return {
    props: {}
  };
};
