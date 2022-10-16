import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {


        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }

      if (localStorage.getItem("authUser") && localStorage.getItem("isRefresh") == null) {
        localStorage.setItem("isRefresh", 1);
        location.reload();
      } else if (!localStorage.getItem("authUser") && localStorage.getItem("isRefresh") != null) {
        localStorage.removeItem("isRefresh");
      }

      return (
        <Layout>

          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
