import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"

import {
  Col, Container, Form, Alert, FormGroup, Label, Row, Input, Modal, ModalHeader, ModalBody, Button, Nav,
  NavItem, NavLink, TabContent, TabPane,
} from "reactstrap"
import loginPhoto from "assets/images/loginPhoto.png"
import logodark from "../../assets/images/isBasvuruLogin.png"
import logolight from "../../assets/images/isBasvuruLogin.png"
import CarouselPage from "./CarouselPage"
import classnames from "classnames";
//i18n
import { withTranslation } from "react-i18next"

import { emailConfirm as onPostEmailConfirm } from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"
import logo from "assets/images/caseoverdegradeturkuaz.png"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
const Confirm = props => {
  const dispatch = useDispatch()
  const [customActiveTab, setcustomActiveTab] = useState("1");

  const { error, loading, data } = useSelector(state => ({
    loading: state.ConfirmReducer.loading,
    error: state.ConfirmReducer.error,
    data: state.ConfirmReducer.data,
  }))

  const {
    match: { params },
  } = props

  useEffect(() => {
    dispatch(onPostEmailConfirm(params.id, params.hash))
  }, [dispatch])

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{props.t("Confirm")}</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <header >
              <div className="headerPosition">
                <Row>
                  <Col className="col-4">
                    <img src={logo} alt="" height="35" className="logoPosition" />
                  </Col>
                  <Col className="col-4 ">
                    <Nav tabs className="nav-tabs-custom nav-justified">
                      <NavItem id="navColor">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customActiveTab === "1",
                          })}
                          onClick={() => {
                            toggleCustom("1");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                          </span>
                          <span className="d-none d-sm-block">Ana Sayfa</span>
                        </NavLink>
                      </NavItem>
                      <NavItem id="navColor">
                        <a
                          style={{ cursor: "pointer", position: "relative", top: "8px" }}
                          href="#aboutUs"
                          onClick={() => {
                            toggleCustom("1");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i className="far fa-user"></i>
                          </span>
                          <span className="d-none d-sm-block">Hakkımızda</span>
                        </a>
                      </NavItem>
                      <NavItem id="navColor">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: customActiveTab === "3",
                          })}
                          onClick={() => {
                            toggleCustom("3");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i className="far fa-envelope"></i>
                          </span>
                          <span className="d-none d-sm-block">Nasıl Çalışır?</span>
                        </NavLink>
                      </NavItem>

                    </Nav>
                  </Col>
                  <Col className="text-end col-4">
                    <button className="loginButtonPosition"><span className="loginTextStyle" onClick={() => {
                      loginToggle();
                      dispatch(registerSuccessReset());
                      dispatch(loginReset());

                    }}>GİRİŞ YAP</span></button>
                    <button className="registerButtonPosition"><span className="loginTextStyle" onClick={() => {
                      registerToggle();
                      dispatch(registerSuccessReset());
                    }}>KAYIT OL</span></button>
                  </Col>
                </Row>
              </div>
            </header>
            <Row className="mt-4 mb-4" >
              <Col className="col-6 text-center" >
                <p style={{ fontSize: "40px", fontWeight: "400", color: "#15265B" }}>Türkiye'nin İlk vaka</p>
                <p style={{ fontSize: "40px", fontWeight: "400", color: "#15265B" }}>Platformu</p>

                <img src={loginPhoto} alt="" height="395" />
              </Col>
              <Col className="col-6 mt-4">
                <div className="bigEllipse text-center">
                  <div style={{ position: "relative", top: "135px" }}>
                    <p style={{ color: "white", fontSize: "28px" }}>Vakaları Çöz</p>
                    <p style={{ color: "white", fontSize: "28px" }}>Kendini Keşfet Çöz</p>
                    <p style={{ color: "white", fontSize: "28px" }}>Fırsatları Kaçırma</p>
                  </div>

                </div>
              </Col>
            </Row>

            <Row className="mt-4" style={{ position: "relative", top: "75px" }}>
              <Col className="col-4 mt-4">
                <div className="smallEllipse text-center">
                  <i className="bx bx-add-to-queue" style={{ position: "absolute", fontSize: "45px", color: "white", top: "31%", left: "46%" }} />
                </div>
                <p className="ellipseText">İş staj, network <br /> imkanları</p>
              </Col>
              <Col className="col-4 mt-4">
                <div className="smallEllipse text-center">
                  <i className="bx bx-list-check" style={{ position: "absolute", fontSize: "45px", color: "white", top: "31%", left: "46%" }} />
                </div>
                <p className="ellipseText">Kişilere yeteneklerini keşfetme <br /> ve kendini geliştirme fırsatı
                </p>
              </Col>
              <Col className="col-4 mt-4">
                <div className="smallEllipse text-center">
                  <i className="bx bx-globe" style={{ position: "absolute", fontSize: "45px", color: "white", top: "31%", left: "46%" }} />
                </div>
                <p className="ellipseText">Ülke ve şehir sınırlarını <br /> ortadan kaldırma</p>
              </Col>
            </Row>
            {data ? (
               <SweetAlert
               success
               title={props.t("Başarılı")}
               confirmBtnText={props.t("Giriş Yap")}
               onConfirm={() => {
                window.open("/login/confirmed", "_self");
               }}
             >
               {props.t("Hesabınız Aktif Hale Getirildi. Giriş Yapabilirsiniz.")}
             </SweetAlert>
            ) : (
              <div></div>
            )}
            {error ? (
              <div className="alert alert-danger">{error?.message || props.t("Failed")}  <i className="fa fa-times"></i></div>
            ) : (
              <div></div>
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(withTranslation()(Confirm))

Confirm.propTypes = {
  history: PropTypes.object,
}
