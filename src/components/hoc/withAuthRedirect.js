import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const MapStateToPropsRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  const RedirectComponents = (props) => {
    if (!props.isAuth) return <Navigate replace to="/login" />;
    return <Component {...props} />;
  };

  const ConnectedAuthRedirectComponent = connect(MapStateToPropsRedirect)(
    RedirectComponents
  );

  return ConnectedAuthRedirectComponent;
};
