import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardBody, Col, Container, Media, Row, UncontrolledDropdown, DropdownMenu, DropdownToggle } from "reactstrap"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import Logo from "../../assets/images/companies/img-1.png"
import {
    getCompanies as onGetCompanies,
  } from "store/actions"
const companyProfile = props => {
    const dispatch = useDispatch()
  let user = JSON.parse(localStorage.getItem("authUser"))
  const { error, Company} = useSelector(state => ({
    error: state.Companies?.error,
    Company: state.Companies?.data[0],
   
  }))
  useEffect(() => {
    dispatch(onGetCompanies())
  }, [dispatch])
  console.log("Companies",user)
  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{props.t("Profile")}</title>
        </MetaTags>
        <Container fluid>
            <Row>
                <Col className="col-6 text-center">
                <img src={Logo} alt="" height="185" /> 
                </Col>
                <Col className="col-6">
                    <h3 className="mb-4">Şirket Bilgileri</h3>
                    <Card>  
                        <CardBody>
                            <p>
                               {Company?.name}
                            </p>
                        </CardBody>
                    </Card>
                    <Card>  
                        <CardBody>
                            <p>
                            {Company?.email}
                            </p>
                        </CardBody>
                    </Card>
                    <Card>  
                        <CardBody>
                            <p>
                            {Company?.createdAt}
                            </p>
                        </CardBody>
                    </Card>
                    
                </Col>
            </Row>
            
        </Container> 
      </div>
    </React.Fragment>
  )
}


export default withRouter(withTranslation()(companyProfile))