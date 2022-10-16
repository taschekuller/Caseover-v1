import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Container, Col, Label, Row } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// import images
import logodark from "../../assets/images/isBasvuruLogin.png"
import logolight from "../../assets/images/isBasvuruLogin.png"
import CarouselPage from "./CarouselPage"


//redux
import { useSelector, useDispatch } from "react-redux"

import { Link } from "react-router-dom"

//branchs
import { getBranchs as onGetBranchs } from "store/actions"


const SelectBranch = props => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const { error, Branchs } = useSelector(state => ({
    error: state.error,
    Branchs: state.Branchs?.data,
  }))
  useEffect(() => {
    dispatch(onGetBranchs())
  }, [dispatch])

  const handleModal = (e, values) => {
    if (show) {
      localStorage.setItem("BranchId", values?.BranchId)
    }
    setShow(!show)
  }
  // handleValidSubmit
  const handleValidSubmit = values => {
  }

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
                        <h5 className="text-primary">{props.t("Hello")}</h5>
                        <p className="text-muted">
                        {props.t("Lets Start")}
                        </p>
                      </div>

                      <div className="mt-4">

                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(v)
                          }}
                        >

                          <div className="mb-3">
                            <AvField type="select" name="BranchId" label="Şubenizi Seçin">
                              <option>{props.t("Select Branch")}</option>
                              {Branchs?.map((item, index) => (
                                <option key={index} value={item._id}>
                                  {item.name}
                                </option>
                              ))}
                            </AvField>
                          </div>

                          <div className="mt-4">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                            >
                             {props.t("Login")}
                            </button>
                          </div>

                        </AvForm>

                        <div className="mt-5 text-center">
                          <p>
                          {props.t("Don't Have An Account")}{" "}
                            <Link
                              to="register"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              {props.t("Register")}
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        ©{" "}
                        <script>
                          document.write(new Date().getFullYear())
                        </script>{" "}
                        2020. Aviyiva Tarafından{" "}
                        <i className="mdi mdi-heart text-danger"></i> Hazırlanmıştır.
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

export default withTranslation()(SelectBranch)
