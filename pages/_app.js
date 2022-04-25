import React, { Fragment } from "react";
import "../styles/globals.css";
import { wrapper, store } from "../reducers/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Fragment>
  );
}

export default MyApp;
