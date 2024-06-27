import {noop} from "@/helpers/utilities/utils";
import {useEffect} from "react";
import {useRouter} from "next/router";

const useNavigationEffects = (onStart = noop, onEnd = noop) => {
    const router = useRouter();

    useEffect(() => {
        const startHandler = () => {
            console.log('Router change started');
            onStart();
        };

        const completeHandler = () => {
            console.log('Router change completed');
            onEnd();
        };

        router.events.on('routeChangeStart', startHandler);

        router.events.on('routeChangeComplete', completeHandler);

        return () => {
            router.events.off('routeChangeStart', startHandler);
            router.events.off('routeChangeComplete', completeHandler);
        };
    }, []);
};

export default useNavigationEffects;
