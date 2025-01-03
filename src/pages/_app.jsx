import React, {StrictMode, useState} from "react";
import App from "next/app";
import {appWithTranslation} from "next-i18next";
import {reduxWrapper} from "@/store/store";
import applicationSlice from "@/store/features/application/slice";
import {Provider} from "react-redux";
import {ApolloProvider} from "@apollo/client";
import ApolloClient from "../helpers/apollo-wrapper";
import "../../public/styles/globals.css";
import sessionSlice from "@/store/features/session/slice";
import {ssrStoreActions} from "@/helpers/utilities/server-side-utils";
import {DEFAULT_CATEGORY_SLUG, SESSION_KEY} from "@/configs/constants";
import useNavigationEffects from "@/helpers/hooks/useNavigationEffects";
import Spinner from "@/components/spinner";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({Component, pageProps, ...rest}) => {
    const wrapper = reduxWrapper.useWrappedStore({pageProps, ...rest});

    const [loading, setLoading] = useState(false);

    useNavigationEffects(
        () => setLoading(true),
        () => setLoading(false),
    );

    return (
        <StrictMode>
            <Provider store={wrapper.store}>
                <ApolloProvider client={ApolloClient}>
                    {loading && <Spinner fullScreen/>}
                    <ToastContainer
                        position="bottom-right"
                        hideProgressBar
                        newestOnTop
                        closeOnClick
                        pauseOnFocusLoss
                        draggable
                    />
                    <Component {...pageProps} />
                </ApolloProvider>
            </Provider>
        </StrictMode>
    );
};

const getCategoryFromRequest = (context) => {
    const category = context.req?.cookies['category'] || DEFAULT_CATEGORY_SLUG;

    return category;
};

MyApp.getInitialProps = reduxWrapper.getInitialAppProps(storeWrapper => async ({ctx, ...rest}) => {
    const context = await App.getInitialProps({ctx, ...rest});
    const sessionCookie = ctx.req?.cookies?.[SESSION_KEY];
    const actions = [];

    if (sessionCookie) actions.push(sessionSlice.actions.getCurrentUser(sessionCookie));
    actions.push(applicationSlice.actions.initiateLoadApplicationData(getCategoryFromRequest(ctx)));
    await ssrStoreActions(storeWrapper, actions);

    return {...context};
});

export default appWithTranslation(MyApp);
