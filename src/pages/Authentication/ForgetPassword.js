import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"
import { Row, Col, Alert, Card, CardBody, Container, Button } from "reactstrap"
import { useState, useEffect } from "react"
// import images
import logodark from "../../assets/images/isBasvuruLogin.png"
import logolight from "../../assets/images/isBasvuruLogin.png"
import CarouselPage from "./CarouselPage"

import {
  userForgetPassword as onForgotPassword, 
} from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

//i18n
import { withTranslation } from "react-i18next"

import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
 

const ForgetPasswordPage = props => {
  const dispatch = useDispatch()
  const [userMail, setUserMail] = useState()
  const { data, error } = useSelector(state => ({ 
    error: state.userForgetPassword.error,
    data: state.userForgetPassword.data, 
  }))

  function handleValidSubmit(values) {
    const bodyObject = {
      email: values.email,
    }

    dispatch(onForgotPassword(bodyObject))
    setUserMail({ email }) 
  } 
  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>
            Forget Password 2 | Skote - React Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="dashboard" className="d-block auth-logo">
                        <img
                          src={logodark}
                          alt=""
                          height="18"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">
                          Şifrenizi Mi Unuttunuz?
                        </h5>
                        <p className="text-muted">Şifrenizi yenileyin.</p>
                      </div>

                      <div className="mt-4">
                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(v)
                          }}
                        >
                          {data?.status === true ? (
                            <Alert color="success">
                              {data?.message}
                            </Alert>
                          ) : null}

                          {error || data?.status === false ? (
                            <Alert color="danger">{error || data?.message}</Alert>
                          ) : null}

                          <div className="mb-3">
                            <AvField
                              name="email"
                              label={props.t("Email")} 
                              placeholder={props.t("Email")}
                              type="text"
                              errorMessage={props.t("Invalid Email")}
                              validate={{
                                required: { value: true },
                              }}
                              value={""}
                            />
                          </div>

                          <div className="mt-3 text-end">
                            <Button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Yenile
                            </Button>
                          </div>
                        </AvForm>
                        <div className="mt-5 text-center">
                          <p>
                            Şifremi hatırlıyorum.{" "}
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Giriş{" "}
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Aviyiva. Tarafından{" "}
                        <i className="mdi mdi-heart text-danger"></i>
                        hazırlanmıştır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}
 

export default withRouter(withTranslation()(ForgetPasswordPage))