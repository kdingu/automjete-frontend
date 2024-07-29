import {useDispatch, useSelector} from "react-redux";
import {getSessionToken, getSessionUserId, getSessionUserSavedVehicles} from "@/helpers/selectors";
import sessionSlice from "@/store/features/session/slice";
import {useCallback} from "react";

const useSavedVehiclesUpdater = (savedVehicles = []) => {
    const dispatch = useDispatch();
    const token = useSelector(getSessionToken);
    const userId = useSelector(getSessionUserId);

    const handler = useCallback((vehicle) => {
        const vehicleInSaved = savedVehicles?.vehicles?.find((vehicleData) => vehicleData.id === vehicle.id);

        let newVehicles;

        if (vehicleInSaved) {
            newVehicles = savedVehicles?.vehicles.filter((vehicleData) => vehicleData.id !== vehicle.id);
        } else {
            newVehicles = [...savedVehicles?.vehicles, vehicle];
        }

        console.log("klaidi: ", {vehicleInSaved, savedVehicles, vehicle, newVehicles});

        dispatch(
            sessionSlice.actions.updateSavedVehicles({
                token: token,
                id: userId,
                savedVehicles: {
                    vehicles: newVehicles,
                },
            })
        );
    }, [dispatch, savedVehicles, token, userId]);

    return handler;
};

export default useSavedVehiclesUpdater;
