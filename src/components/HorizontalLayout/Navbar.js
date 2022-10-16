import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"
import { authorize, Role } from "./../helpers/authorize"

const Navbar = props => {

  const [dashboard, setdashboard] = useState(false)
  const [adminPanel, setadminPanel] = useState(false)




  return (
    <React.Fragment>
     {authorize([Role.Dev]) ? (
  <div className="topnav">
  <div className="container-fluid">
    <nav
      className="navbar navbar-light navbar-expand-lg topnav-menu"
      id="navigation"
    >
      <Collapse
        isOpen={props.leftMenu}
        className="navbar-collapse"
        id="topnav-menu-content"
      >
        <ul className="navbar-nav">

          <li className="nav-item dropdown">
            <Link
              to="/dashboard"
              className="nav-link dropdown-toggle arrow-none"
            >
              <i className="bx bx-layer"></i>
              {props.t("HomePage")}
            </Link>
          </li>



         
          {authorize([Role.Dev,Role.Admin]) ? (
          <li className="nav-item dropdown">
          <Link
            to="/companies"
            className="nav-link dropdown-toggle arrow-none"
          >
            <i className="bx bx-buildings"></i>
            {props.t("Companies")}
          </Link>
        </li>):
          null}
           {authorize([Role.Dev,Role.Admin]) ? (
          <li className="nav-item dropdown">
          <Link
            to="/users"
            className="nav-link dropdown-toggle arrow-none"
          >
            <i className="bx bx-user"></i>
            {props.t("Users")}
          </Link>
        </li>):
          null}

          {/* Deparment */}
          {authorize([Role.Dev,Role.Admin]) ? (
          <li className="nav-item dropdown">
          <Link
            to="/departments"
            className="nav-link dropdown-toggle arrow-none"
          >
            <i className="bx bx-user"></i>
            {props.t("Departments")}
          </Link>
        </li>):
          null}

          {/* School */}
          {authorize([Role.Dev,Role.Admin]) ? (
          <li className="nav-item dropdown">
          <Link
            to="/schools"
            className="nav-link dropdown-toggle arrow-none"
          >
            <i className="bx bx-user"></i>
            {props.t("Schools")}
          </Link>
        </li>):
          null}
          </ul>
      </Collapse> 
    </nav>
  </div>
</div> 
     ):null}
      <Row>
      
      </Row>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
