import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Label,
  Form,
  Input,
} from "reactstrap"
import InputMask from "react-input-mask"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// import images
import logodark from "../../assets/images/isBasvuruLogin.png"
import logolight from "../../assets/images/isBasvuruLogin.png"
import CarouselPage from "./CarouselPage"

//i18n
import { withTranslation } from "react-i18next"

// action
import { registerUser, apiError, registerSuccessReset } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"

const Register = props => {
  const dispatch = useDispatch()
  const [rememberCheck, setRememberCheck] = useState(false)

  const { user, registrationError, loading, registerSuccess } = useSelector(state => ({
    user: state.Account.user,
    registerSuccess: state.Account.registerSuccess,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  // handleValidSubmit
  const handleValidSubmit = values => {
    const registerModel = {
      companyName: values.companyName,
      verDaire: values.verDaire,
      verNo: values.verNo,
      phone: values.phone,
      name: values.name,
      password: values.password,
      email: values.email,
      passwordConfirm: values.confirmPassword,
    }
    dispatch(registerUser(registerModel))
   
  }

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Register 2 | Skote - React Admin & Dashboard Template</title>
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
                        <h5 className="text-primary">Ücresiz Kayıt</h5>
                        <p className="text-muted">Şimdi ücretsiz kayıt olun.</p>
                      </div>

                      <div className="mt-4">
                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(v)
                          }}
                        >
                          {registerSuccess ? (
                            <SweetAlert
                              success
                              title={props.t("Success")}
                              confirmBtnText={props.t("Ok")}
                              onConfirm={() => {
                                dispatch(registerSuccessReset())
                              }}
                            >
                              {props.t("Register Success")}
                            </SweetAlert>
                          ) : null}

                          {user && user ? (
                            <Alert color="success">
                              Register User Successfully
                            </Alert>
                          ) : null}

                          {registrationError && registrationError ? (
                            <Alert color="danger">{registrationError}</Alert>
                          ) : null}

                          <div className="mb-3">
                            <AvField
                              name="companyName"
                              label={props.t("CompanyName")}
                              className="form-control"
                              placeholder={props.t("CompanyName")}
                              type="text"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <AvField
                              name="verDaire"
                              label={props.t("verDaire")}
                              className="form-control"
                              placeholder={props.t("verDaire")}
                              type="text"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <AvField
                              name="verNo"
                              label={props.t("verNo")}
                              className="form-control"
                              placeholder={props.t("verNo")}
                              type="text"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <AvField
                              name="phone"
                              label={props.t("Phone")}
                              type="text"
                              errorMessage={props.t("InvalidInput")}
                              mask="(999) 999-9999"
                              maskChar="-"
                              tag={[Input, InputMask]}
                              placeholder="(999) 999-9999"
                              validate={{
                                required: { value: false },
                              }}
                            />
                          </div>
                          <div className="mb-3">
                            <AvField
                              name="email"
                              label={props.t("Email")}
                              className="form-control"
                              placeholder={props.t("Email")}
                              type="email"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <AvField
                              name="name"
                              label={props.t("Name")}
                              type="text"
                              required
                              placeholder={props.t("Name")}
                            />
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="password"
                              label={props.t("Password")}
                              type="password"
                              required
                              placeholder={props.t("Password")}
                            />
                          </div>
                          <div className="mb-3">
                            <AvField
                              name="confirmPassword"
                              label={props.t("PasswordConfirm")}
                              type="password"
                              required
                              placeholder={props.t("PasswordConfirm")}
                            />
                          </div>

                          <div>
                            <p className="mb-0">
                              Kayıt olarak{" "}
                              <a href="#" className="text-primary">
                                Gizlilik Sözleşmesi
                              </a>{" "}
                              kabul etmiş olursunuz.
                            </p>
                          </div>

                          <div className="mt-4">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                            >
                              Kayıt Ol
                            </button>
                          </div>
                        </AvForm>

                        <div className="mt-5 text-center">
                          <p>
                            Daha önce kayıt oldunuz mu?{" "}
                            <Link
                              to="login"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Giriş Yap
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

Register.propTypes = {
  history: PropTypes.object,
}

export default withRouter(withTranslation()(Register))
