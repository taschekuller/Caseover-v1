import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import { useSelector, useDispatch } from "react-redux"
import { AvField, AvForm } from "availity-reactstrap-validation"
import {
  getUsers as ongetUsers,
  updateUser as onUpdateUser,
} from "store/actions"
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
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  DropdownItem,
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
  console.log("Users", user.uid, User)

  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState("")
  const [isEdit, setIsEdit] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const handleUpdateSubmit = (e, values) => {
    if (isEdit) {
      const updatedUser = {
        _id: user.uid,
        name: values["name"],
        school : values["school"], 
        department : values["department"], 
        email : values["email"],

      }
      dispatch(onUpdateUser(updatedUser))
    
    }
  }

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{props.t("Profile")}</title>
        </MetaTags>
        <Container fluid>
          {/* EDIT MODAL */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>
              <Row>
                <h5>Edit Profile</h5>
                <Button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    toggle()
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </Button>
              </Row>
            </ModalHeader>
            <ModalBody>
              <AvForm onValidSubmit={handleUpdateSubmit}>
                <Row Form>
                  <Col className="col-12">
                    <div>
                      <AvField
                        name="name"
                        label="Name"
                        type="text"
                        errorMessage="Bu alan zorunludur"
                        validate={{
                          required: { value: true },
                        }}
                        value={User?.name || ""}
                      />
                    </div>
                  </Col>
                  <Col className="col-12 mt-3">
                    <div>
                      <AvField
                        name="email"
                        label="E-mail"
                        type="text"
                        errorMessage="Bu alan zorunludur"
                        validate={{
                          required: { value: true },
                        }}
                        value={User?.email || ""}
                      />
                    </div>
                  </Col>
                  <Col className="col-12 mt-3">
                    <div>
                      <AvField
                        name="school"
                        label="School"
                        type="text"
                        errorMessage="Bu alan zorunludur"
                        validate={{
                          required: { value: true },
                        }}
                        value={User?.school || ""}
                      />
                    </div>
                  </Col>
                  <Col className="col-12 mt-3">
                    <div>
                      <AvField
                        name="department"
                        label="Department"
                        type="text"
                        errorMessage="Bu alan zorunludur"
                        validate={{
                          required: { value: true },
                        }}
                        value={User?.department || ""}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="text-end mt-3">
                  <Col>
                    <button
                      type="submit"
                      className="btn btn-success me-2"
                      onClick={() => {
                        toggle()
                      }}
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2"
                      onClick={() => {
                        toggle()
                      }}
                    >
                      Cancel
                    </button>
                  </Col>
                </Row>
              </AvForm>
            </ModalBody>
          </Modal>

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
            </Col>
          </Row>

          <Row>
          <Col className="text-end">
          <Button 
                type="button" 
                className="btn btn-success w-sm"
                onClick={() => {
                  setIsEdit(true)
                  setSelected(user.uid)
                  toggle()
                }}
                >
                <i class="mdi mdi-pencil d-block font-size-16"></i> Profili Güçlendir
              </Button>
              </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(withTranslation()(userProfile))
