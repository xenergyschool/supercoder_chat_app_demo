import React from "react";

import { Route, Redirect } from "react-router-dom";

import { useFirebase } from "./FirebaseProvider";

import DataProvider from "./DataProvider";

export default function PrivateRoute({ component: Component, ...restProps }) {
  const { user } = useFirebase();

  return (
    <Route
      {...restProps}
      render={props => {
        return user ? (
          <DataProvider>
            <Component {...props} />
          </DataProvider>
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        );
      }}
    />
  );
}
