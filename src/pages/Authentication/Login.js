import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"

import {
  Col, Container, Form, Alert, FormGroup, Label, Row, Input, Modal, ModalHeader, ModalBody, Button, Nav,
  NavItem, NavLink, TabContent, TabPane,
} from "reactstrap"


import "./loginStyle.scss"
import InputMask from "react-input-mask"
//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import {
  loginUser, registerUser, registerSuccessReset, addCompany, resetCompany, loginReset, forgetPasswordReset,
  userForgetPassword as onForgotPassword
} from "../../store/actions"

//i18n
import { withTranslation } from "react-i18next"

import logo from "assets/images/caseoverdegradeturkuaz.png"
import loginPhoto from "assets/images/loginPhoto.png"
import loginPhoto2 from "assets/images/loginPhoto2.png"
import classnames from "classnames";
//Import config
import { facebook, google } from "../../config"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
import { isEmpty } from "lodash"
import AOS from 'aos'
import 'aos/dist/aos.css'
const Login = props => {
  const dispatch = useDispatch()
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [registerType, setRegisterType] = useState("1")
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [graduatedSwitch, setGraduatedSwitch] = useState(false)
  const [isReasonEmpty, setIsReasonEmpty] = useState(false)
  const {
    match: { params },
  } = props
  const { error, user, registrationError, registerSuccess, registerCompanySuccess, ForgotPasswordError, ForgotPasswordData } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    error: state.Login.error,
    registerSuccess: state.Account.registerSuccess,
    registerCompanySuccess: state.Companies?.registerCompanySuccess,
    ForgotPasswordError: state.userForgetPassword.error,
    ForgotPasswordData: state.userForgetPassword.data,
  }))
  useEffect(() => {
    if (params.ref) {
      setLoginModal(true)
    }
  }, [])
   useEffect(() => {
    AOS.init({duration:800})
   }, [])

  
  const handleValidRegister = values => {
    if (registerType == 1) {
      const registerModel = {
        name: values.name,
        email: values.email,
        school: values.school,
        department: values.department,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        phone: values.phone,
        isGraduated: graduatedSwitch,
      }
      dispatch(registerUser(registerModel))
      registerToggle()
    } else {
      if (isEmpty(values.registerReason) || values.registerReason == "Kayıt Olma Nedeni Seçiniz") {
        setIsReasonEmpty(true)
      } else {
        const companyModal = {
          name: values.companyName,
          email: values.contactMail,
          userName: values.contactName,
          registerReason: values.registerReason,
          phone: values.companyPhone
        }
        dispatch(addCompany(companyModal))
        registerToggle()
      }

    }


  }
  const handleValidSubmit = async (event, values) => {
    dispatch(loginUser(values, props.history))
  }
  const handleValidForgetPassword = values => {
    const bodyObject = {
      email: values.forgotEmail,
    }

    dispatch(onForgotPassword(bodyObject))
    console.log("gönderilen", bodyObject)

  }

  const loginToggle = () => {
    setLoginModal(!loginModal)
  }
  const registerToggle = () => {
    setRegisterModal(!registerModal)
  }
  const forgotPasswordToggle = () => {
    setForgotPassword(!forgotPassword)
  }
  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  return (


    <div>
      <MetaTags>
        <title>Caseover | Login </title> 
      </MetaTags>

      <header style={{ backgroundColor: "rgb(229 244 255)", height: "76px" }}>

        <Row style={{ position: "relative", top: "20px" }}>
          <Col lg="4" md="3" sm="1" xs="1">
            <img src={logo} alt="" height="35" className="logoPosition" />
          </Col>
          <Col lg="4" md="6" sm="8" xs="8">
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
                  <span className="d-block d-md-none">
                    <i className="fas fa-home"></i>
                  </span>
                  <span className="d-none d-md-block">Ana Sayfa</span>
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
                  <span className="d-block d-md-none">
                    <i className="bx bx-help-circle"></i>
                  </span>
                  <span className="d-none d-md-block">Hakkımızda</span>
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
                  <span className="d-block d-md-none">
                    <i className="bx bx-search-alt-2"></i>
                  </span>
                  <span className="d-none d-md-block">Nasıl Çalışır?</span>
                </NavLink>
              </NavItem>

            </Nav>
          </Col>
          <Col className="text-end" lg="4" md="3" sm="3" xs="3">
            <button className="btn-hover color-1" onClick={() => {
              loginToggle();
              dispatch(registerSuccessReset());
              dispatch(loginReset());
              setIsReasonEmpty(false)
            }}>GİRİŞ</button>
            {/* <button className="registerButtonPosition"><span className="loginTextStyle" onClick={() => { registerToggle();
                 dispatch(registerSuccessReset());
                 }}>KAYIT OL</span></button> */}
          </Col>
        </Row>

      </header>
     <TabContent
        activeTab={customActiveTab}
        className="text-muted"
      >
        <TabPane tabId="1">
           <div className="firstDivPosition" >
            <Row className="firstRowPosition">
              <Col className="text-center" lg="6" md="6" sm="12" xs="12" >
                <p style={{ fontSize: "50px", fontWeight: "400", color: "#15265B" }}>Türkiye'nin İlk vaka</p>
                <p style={{ fontSize: "50px", fontWeight: "400", color: "#15265B" }}>Platformu</p>

                <img src={loginPhoto} alt="" className="loginPhotoPos" />
              </Col>
              <Col className="mt-4 " lg="6" md="6" sm="12" xs="12" >
                <div className="bigEllipse text-center">
                  <div className="loginRow1TextPos">
                    <p className="loginRow1Text">Vakaları Çöz</p>
                    <p className="loginRow1Text">Kendini Keşfet Çöz</p>
                    <p className="loginRow1Text">Fırsatları Kaçırma</p>
                  </div>

                </div>
              </Col>
            </Row>
          </div> 

 
          <Row className="mt-4" style={{ position: "relative", top: "5px" }}>
            <Col className="mt-4" lg="4" md="4" sm="12" xs="12">
              <div className="smallEllipse text-center" data-aos="fade-right">
                <i className=" loginRow2iconPos bx bx-add-to-queue" />
              </div>
              <p className="ellipseText" data-aos="fade-right">İş, staj, network <br /> imkanları</p>
            </Col>
            <Col className="mt-4" lg="4" md="4" sm="12" xs="12">
              <div className="smallEllipse text-center" data-aos="fade-down">
                <i className="loginRow2iconPos bx bx-list-check" />
              </div>
              <p className="ellipseText" data-aos="fade-down">Kişilere yeteneklerini keşfetme <br  /> ve kendini geliştirme fırsatı
              </p>
            </Col>
            <Col className="mt-4" lg="4" md="4" sm="12" xs="12">
              <div className="smallEllipse text-center" data-aos="fade-left">
                <i className="loginRow2iconPos bx bx-globe" />
              </div>
              <p className="ellipseText" data-aos="fade-left">Ülke ve şehir sınırlarını <br /> ortadan kaldırma</p>
            </Col>
          </Row>

          <Row className="mt-4 mb-4" style={{ position: "relative", top: "50px" }} id="aboutUs" >
            <Col className="text-center" lg="6" md="6" sm="12" xs="12" >
              <p style={{ fontSize: "36px", fontWeight: "400", color: "#15265B" }}>Biz Kimiz?</p>
              <div className="bigEllipse2 text-center" style={{ margin: "auto" }} data-aos="fade-up">
                <div className="loginRow3TextPos">
                  <p className="loginRow3Text">Caseover, kendine uygun alanları <br /> keşfetmek isteyen öğrenciler ve<br /> bünyesine uygun kaliteli
                    eleman <br /> bulamayan şirketleri birleştirmek <br /> amacıyla kuruldu. </p>

                </div>

              </div>


            </Col>
            <Col className="mt-4" lg="6" md="6" sm="12" xs="12" >

              <img src={loginPhoto2} alt="" className="loginPhotoPos2" data-aos="fade-down"/>

            </Col>
          </Row>
          

          <div className="corporateDiv"   data-aos="zoom-out" 
         >
            <p className="text-center" style={{ color: "white", fontSize: "36px", fontWeight: "400", position: "relative", top: "18px" }}>Anlaşmalı Şirketler</p>
            <div style={{ height: "400px" }}></div>
            <hr style={{ border: "1px solid white" }} />
            <section id="footer">
              <div className="container">
                <div className="row text-center text-xs-center text-sm-left text-md-left">
                  <div className="col-xs-12 col-sm-4 col-md-4">
                    <h2 className="footerText">İletişim</h2>
                    <a href="mailto:infocaseover@gmail.com?subject = Feedback&body = Message" className="aboutUsFooter">
                      infocaseover@gmail.com
                    </a>


                  </div>
                  <div className="col-xs-12 col-sm-4 col-md-4">
                    <a href="#aboutUs" className="aboutUsFooter">Hakkımızda</a>
                    <h5 className="footerText" onClick={() => {
                      toggleCustom("3");
                    }} style={{ position: "relative", top: "7px" }}>Vakalar</h5>

                  </div>
                  <div className="col-xs-12 col-sm-4 col-md-4">
                    <i className="bx bxl-linkedin-square me-3" style={{ fontSize: "45px", color: "white", cursor: "pointer" }} onClick={() => { window.open("https://www.linkedin.com/company/caseover?trk=similar-pages") }} />
                    <i className="bx bxl-instagram me-3" style={{ fontSize: "45px", color: "white", cursor: "pointer" }} onClick={() => { window.open("https://instagram.com/caseovernet?igshid=YmMyMTA2M2Y=") }} />
                    <i className="bx bxl-youtube me-3" style={{ fontSize: "45px", color: "white", cursor: "pointer" }} onClick={() => { window.open("https://www.youtube.com/") }} />


                  </div>



                </div>







              </div>
            </section>
            <div className="text-end">
              <p style={{ color: "white", fontSize: "14px", fontWeight: "100", position: "relative", right: "5px" }}>©{new Date().getFullYear()} | Caseover</p>
            </div>
          </div>

        </TabPane>

        <TabPane tabId="3">
          <Row className="text-center">
            <h1>Nasıl Çalışır</h1>
          </Row>
        </TabPane>

      </TabContent> {/*  */}



      <Modal isOpen={loginModal} size="md" toggle={loginToggle} style={{ marginTop: "203px", padding: "20px" }} className="borderRadius">
        <ModalBody className="mt-4" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <AvForm
            className="form-horizontal"
            onValidSubmit={(e, v) => {
              handleValidSubmit(e, v)
            }}
          >


            {error && error ? (
              <Alert color="danger">{error}</Alert>
            ) : null}
            <div className="mb-3">
              <AvField
                name="email"
                label="Email"
                className="form-control"
                placeholder="Mail Adresinizi Giriniz"
                type="email"
                errorMessage={"Bu alan zorunludur!"}
                required
              />
            </div>
            <div className="mb-3">
              <div className="float-end">
                <p style={{ cursor: "pointer", marginBottom: "0px" }}
                  onClick={() => {
                    loginToggle();
                    forgotPasswordToggle()
                  }}
                  className="text-muted"
                >
                  Şifremi unuttum
                </p>
              </div>
              <AvField
                name="password"
                label="Şifre"
                className="form-control"
                placeholder="Şifrenizi Giriniz"
                type="password"
                errorMessage={"Bu alan zorunludur!"}
                required
              />

            </div>
            <div className="mt-3 text-center">
              <button class="btn-hover color-2" style={{ width: "150px" }}
                type="submit">Giriş Yap</button>

            </div>
            <div className="text-center mt-4">
              <p style={{ fontSize: "16px", fontWeight: "400" }}>Hala kayıt olmadın mı?</p>
              <p style={{ position: "relative", bottom: "10px", fontSize: "16px", fontWeight: "400" }}>Hemen <span style={{ color: "#0196BE", cursor: "pointer", textDecorationLine: "underline" }}
                onClick={() => {
                  loginToggle();
                  registerToggle();
                }}>Kayıt ol!</span> </p>
            </div>


          </AvForm>
        </ModalBody>
      </Modal>

      <Modal isOpen={registerModal} size="xl" toggle={registerToggle} style={{ marginTop: "103px", padding: "20px" }} className="borderRadius">
        <ModalBody className="mt-4" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <AvForm
            className="form-horizontal"
            onValidSubmit={(e, v) => {
              handleValidRegister(v)
            }}
          >
            <div>
              <p style={{ fontSize: "14px", fontWeight: "500" }}>1.Sana uygun olanı seç.</p>
              <Row className="mt-3 mb-3">
                <Col className="registerTypeStyle col-4 text-center" style={{ position: "relative", left: "10px", backgroundColor: registerType == 1 ? "#66C464" : null, borderColor: registerType == 1 ? "#66C464" : null, color: registerType == 1 ? "white" : "black" }}
                  onClick={() => { setRegisterType("1") }}>
                  <p style={{ position: "relative", top: "11px", fontSize: "14px", fontWeight: "500" }}>
                    Öğrenci
                  </p>
                </Col>
                <Col className="col-4"></Col>
                <Col className="registerTypeStyle col-4 text-center" style={{ position: "relative", right: "10px", backgroundColor: registerType == 2 ? "#66C464" : null, borderColor: registerType == 2 ? "#66C464" : null, color: registerType == 2 ? "white" : "black" }}
                  onClick={() => { setRegisterType("2") }}>
                  <p style={{ position: "relative", top: "11px", fontSize: "14px", fontWeight: "500" }}>
                    Şirket
                  </p>
                </Col>

              </Row>
            </div>
            {registerType == 1 ? (
              <>
                <div className="mb-3">
                  <AvField
                    name="name"
                    label="2.İsim Soyisim"
                    placeholder={props.t("İsim Soyisim Giriniz.")}
                    errorMessage={props.t("Bu Alan Zorunludur!")}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="school"
                    label="3.Okul"
                    placeholder={props.t("Okulunuzu Giriniz.")}
                    errorMessage={props.t("Bu Alan Zorunludur!")}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="department"
                    label="4.Bölüm"
                    placeholder={props.t("Bölümünüzü Giriniz.")}
                    errorMessage={props.t("Bu Alan Zorunludur!")}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="email"
                    label="5.Mail"
                    placeholder={props.t("Mail Adresinizi Giriniz.")}
                    className="form-control"
                    type="email"
                    errorMessage={props.t("Bu Alan Zorunludur!")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <AvField
                    name="phone"
                    label={props.t("6.Telefon No")}
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
                    name="password"
                    label="7.Şifre"
                    placeholder={props.t("Şifrenizi Giriniz.")}
                    className="form-control"
                    errorMessage={props.t("Bu Alan Zorunludur!")}
                    type="password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="passwordConfirm"
                    label="8.Şifre Tekrar"
                    placeholder={props.t("Şifrenizi Tekrar Giriniz.")}
                    errorMessage={props.t("Bu Alan Zorunludur!")}
                    className="form-control"
                    type="password"
                    required
                  />
                </div>
                <Col
                  className="form-check form-switch form-switch-lg mb-3"
                >
                  <label
                    className="form-check-label"
                    htmlFor="isGraduated"
                    style={{ marginRight: '54px' }}
                  >
                    {props.t("Mezun Oldum")}
                  </label>
                  <input
                    type="checkbox"
                    name="isGraduated"
                    id="isGraduated"
                    className="form-check-input"
                    checked={graduatedSwitch}
                    onChange={(e) => {
                      setGraduatedSwitch(!graduatedSwitch);

                    }}
                  />

                </Col>
              </>
            ) : (
              <>
                {isReasonEmpty == true ? (<div className="alert alert-danger h6 text-center">
                  {props.t("Lütfen Bir Kayıt Olma Nedeni Seçin!")}


                </div>) : null}
                <div className="mb-3">
                  <AvField
                    name="companyName"
                    label="2.Firma Adı"
                    placeholder={props.t("Firma Adını Giriniz.")}
                    errorMessage={props.t("Bu Alan Zorunludur")}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="contactName"
                    placeholder={props.t("İletişime Geçen Kişinin İsmini Giriniz.")}
                    errorMessage={props.t("Bu Alan Zorunludur")}
                    label="3.İletişime geçen kişinin adı soyadı"
                    type="text"
                    required
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    name="contactMail"
                    placeholder={props.t("İletişim Mail Adresi Giriniz.")}
                    errorMessage={props.t("Bu Alan Zorunludur")}
                    label="4.İletişime geçen Mail Adresi"
                    type="email"
                    required
                  />
                </div>
                <div className="mb-2">
                  <AvField
                    name="companyPhone"
                    label={props.t("5.Telefon No")}
                    type="text"
                    errorMessage={props.t("InvalidInput")}
                    mask="(999) 999-9999"
                    maskChar="-"
                    tag={[Input, InputMask]}
                    placeholder="(999) 999-9999"
                    validate={{
                      required: { value: true },
                    }}
                  />
                </div>

                <div className="mb-3">
                  <AvField style={{ borderRadius: "19px" }}
                    className="form-select"
                    type="select"
                    name="registerReason"

                    value={""}
                    label={props.t("6.Kayıt Olma Nedeni Seçiniz.")}
                  >
                    <option>{props.t("Kayıt Olma Nedeni Seçiniz")}</option>
                    <option>{props.t("Ekip arkadaşı arıyorum")}</option>
                    <option>{props.t("Vaka çözdürmek istiyorum")}</option>

                  </AvField>
                </div>
              </>
            )}
            <div className="mt-4 text-center">
              <button className="btn-hover color-1"
                type="submit">{registerType == 1 ? "Kayıt Ol" : "İletişime Geç"}</button>
              {/* <button style={{ background: "linear-gradient(180deg, #15285D 0%, #0489B3 146.84%)", borderRadius: "17px", height: "45px", width: "122px" }}
                  className="btn btn-primary btn-block "
                  type="submit"
                >
                  {registerType == 1 ? "Kayıt Ol" : "İletişime Geç"}
                </button> */}
            </div>
          </AvForm>
        </ModalBody>
      </Modal>

      <Modal isOpen={forgotPassword} size="md" toggle={forgotPasswordToggle} style={{ marginTop: "203px", padding: "20px" }} className="borderRadius">
        <ModalBody className="mt-4" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <AvForm
            className="form-horizontal"
            onValidSubmit={(e, v) => {
              handleValidForgetPassword(v)
            }}
          >
            <div className="mb-3">
              <AvField
                name="forgotEmail"
                label="Email"
                className="form-control"
                placeholder="Sisteme Kayıtlı Mail Adresinizi Giriniz."
                type="email"
                errorMessage={"Bu alan zorunludur!"}
                required
              />
            </div>
            <p>Parolanızı sıfırlama talimatlarını içeren bir e‑posta göndereceğiz.</p>
            <div className="mt-3 text-center">
              <button class="btn-hover color-2" style={{ width: "150px" }}
                type="submit">Mail Gönder</button>
            </div>


          </AvForm>
        </ModalBody>
      </Modal>

      {registerCompanySuccess ? (
        <SweetAlert
          success
          title={props.t("Başarılı")}
          confirmBtnText={props.t("Tamam")}
          onConfirm={() => {
            dispatch(resetCompany())

          }}
        >
          {props.t("Kayıt Olma Talebiniz Tarafımıza İletilmiştir. En kısa sürede sizinle iletişim kurulacaktır")}
        </SweetAlert>
      ) : null}
      {registrationError && registrationError ? (
        <Alert color="danger">{registrationError}</Alert>
      ) : null}
      {registerSuccess ? (
        <SweetAlert
          success
          title={props.t("Başarılı")}
          confirmBtnText={props.t("Giriş Yap")}
          onConfirm={() => {
            dispatch(registerSuccessReset())
            loginToggle()
          }}
        >
          {props.t("Lütfen Mail Adresinizi (spam dahil) Kontrol Ederek Hesabınızı Aktif Hale Getirip Giriş Yapınız.")}
        </SweetAlert>
      ) : null}
      {registrationError ? (
        <SweetAlert
          error
          title={props.t("Kayıt Başarısız")}
          confirmBtnText={props.t("Tamam")}
          onConfirm={() => {
            dispatch(registerSuccessReset())

          }}
        >
          {props.t(registrationError)}
        </SweetAlert>
      ) : null}
      {ForgotPasswordData ? (
        <SweetAlert
          success
          title={props.t("Mail Gönderildi")}
          confirmBtnText={props.t("Tamam")}
          onConfirm={() => {
            dispatch(forgetPasswordReset())
            forgotPasswordToggle()
          }}
        >
          {props.t("Lütfen Mail Adresinizi (spam dahil) Kontrol Ederek Şifrenizi Güncelleyin.")}
        </SweetAlert>
      ) : null}
      {ForgotPasswordError ? (
        <SweetAlert
          error
          title={props.t("Bu Mail Adresine Kayıtlı Bir Mail Bulunamadı!")}
          confirmBtnText={props.t("Tamam")}
          onConfirm={() => {
            dispatch(forgetPasswordReset())

          }}
        >

        </SweetAlert>
      ) : null}


    </div>

  )
}

export default withRouter(withTranslation()(Login))

Login.propTypes = {
  history: PropTypes.object,
}
