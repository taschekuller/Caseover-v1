import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import { authorize, Role } from "../../components/helpers/authorize"
import CompanyProfile from "./companyProfile"
import UserProfile from "./userProfile"

//UserProfile -> Profile
const Profile = props => {
  const dispatch = useDispatch()

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  const {
    match : {params},
  } = props
  console.log("Params",params)
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
        {authorize([Role.User]) ? (
          <UserProfile/>
          ):authorize([Role.Company]) ?(
            <CompanyProfile/>
          ):
          <h1>Dev</h1>
          }
       

         
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(withTranslation()(Profile))
