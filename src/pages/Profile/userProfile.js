import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import { useSelector, useDispatch } from "react-redux"
import {
  Card,
  CardBody,
  Col,
  Container,
  Media,
  Row,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Button,
} from "reactstrap"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import Logo from "../../assets/images/companies/img-1.png"
import { getUsers as onGetUsers } from "store/users/actions"

const userProfile = props => {
  const dispatch = useDispatch()
  let user = JSON.parse(localStorage.getItem("authUser"))
  const { error, User } = useSelector(state => ({
    error: state.Users?.error,
    User: state.Users?.data[0],
  }))
  useEffect(() => {
    dispatch(onGetUsers())
  }, [dispatch])
  console.log("Users", user.uid)
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
              <h3 className="mb-4">Kullanıcı Bilgileri</h3>
              <Card>
                <CardBody>
                  <p>{User?.name}</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <p>{User?.email}</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <p>{User?.school}</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <p>{User?.department}</p>
                </CardBody>
              </Card>
              {/* <Button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                
              >
                <span aria-hidden="true">&times;</span>
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(withTranslation()(userProfile))
