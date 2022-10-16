import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardBody, Col, Container, Media, Row, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap"

const Dashboard = props => {
  let user = JSON.parse(localStorage.getItem("authUser"))

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Caseover</title>
        </MetaTags>
        <Container fluid>
          <h1>CASEOVER!</h1>
          <h3>Starting page</h3>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
