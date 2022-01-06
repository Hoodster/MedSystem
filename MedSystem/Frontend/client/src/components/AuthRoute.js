import { Route, Redirect } from "react-router";

function AuthRoute({ component: Component, authed }) {
  return (
    <Route
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AuthRoute;
