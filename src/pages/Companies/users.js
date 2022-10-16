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
  UncontrolledDropdown,
  UncontrolledTooltip,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  NavItem,
  NavLink,
  Input,
  FormGroup,
  Spinner,
  Badge
} from "reactstrap"
//redux
import { useSelector, useDispatch } from "react-redux"
import InputMask from "react-input-mask"

import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import {

  getCompanyUsers as onGetUsers,
  getUserRoles as onGetUserRoles,
  getRoles as onGetRoles,
  setLoadingRole as onSetLoadingRole,
  setCompanySuccessStatus as onCompanySuccessStatus,
  addUserRoles as onAddUserRoles,
  addCompanyUser as onAddCompanyUser,
  updateCompanyUser as onUpdateCompanyUser,
  deleteCompanyUser as onDeleteCompanyUser,
  resetCompany as onResetCompany
} from "store/actions"

import { isEmpty, map, update, valuesIn } from "lodash"
import moment from "moment"

import { AvForm, AvField } from "availity-reactstrap-validation"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

import "./datatables.scss"

import { authorize, Role } from "./../../components/helpers/authorize"

const CompanyUsers = props => {
  const dispatch = useDispatch()

  let user = JSON.parse(localStorage.getItem("authUser"))

  const [selectedId, setSelectedId] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [modalRole, setModalRole] = useState(false)

  const [roleList, setRoleList] = useState([])

  const { error, Users, loadingRole, Roles, UserRoles, successStatus } =
    useSelector(state => ({
      error: state.Companies?.error,
      Users: state.Companies?.Users,
      UserRoles: state.Companies?.UserRoles,
      loadingRole: state.Companies?.loadingRole,
      Roles: state.Companies?.Roles,
      successStatus: state.Companies?.successStatus,
     
    }))

  const {
    match: { params },
  } = props

  useEffect(() => {
    dispatch(onGetRoles())
    dispatch(onGetUsers(params.id))
   

    if (successStatus) {
      setsuccess_dlg(true);
      dispatch(onCompanySuccessStatus(false));
    }

    //UserRole Control
    if (UserRoles != null && UserRoles.length > 0) {
      roleListReset()
      let tempRoleList = [...roleList]
      for (let i = 0; i < UserRoles[0].Roles.length; i++) {
        let _index = roleList.findIndex(
          x => x.name == UserRoles[0].Roles[i].name
        )
        if (_index !== -1) {
          tempRoleList[_index].checked = true
          setRoleList(tempRoleList)
        }
      }
    }
  }, [dispatch, UserRoles, successStatus])

  const toggle = () => { 
    setModal(!modal) 
  }

  const toggleRole = () => { 
    setModalRole(!modalRole)
  }

  const roleListReset = () => {
    setRoleList(Roles)
  }

  const statusSpan = _status => {
    if (_status == true) {
      return (
        <span className="text-success">
          <i className="fa fa-check me-1"></i>
          {props.t("Confirmed")}
        </span>
      )
    } else {
      return (
        <span className="text-danger">
          <i className="fa fa-times me-1"></i>
          {props.t("NonConfirmed")}
        </span>
      )
    }
  }

  const columns = [
    {
      dataField: "name",
      text: props.t("Name"),
      sort: true,
    },
    {
      dataField: "email",
      text: props.t("Email"),
      sort: true,
    },
    {
      dataField: "isApproved",
      text: props.t("Onaylandı Mı?"),
      sort: true,
      formatter: (cell, row) => (
        <div>
          {cell && cell==true?(
             <Badge className="font-size-12 badge-soft bg-success">Onaylandı</Badge>
          ):
          <Badge className="font-size-12 badge-soft bg-danger">Onaylanmadı</Badge>}
         
        </div>
      ),
    },
    {
      dataField: "_id",
      text: props.t("Action"),
      sort: false,
      formatter: (cell, row) => (
        <UncontrolledDropdown style={{ position: "unset" }}>
          <DropdownToggle href="#" className="card-drop" tag="i">
            <i className="mdi mdi-dots-horizontal font-size-18"></i>
          </DropdownToggle>
          <div className="drop-absolute">
          <DropdownMenu className="dropdown-menu-end">
          
           
            {
             
              <DropdownItem
              href="#"
              onClick={() => {
                setSelectedId(cell)
                setconfirm_alert(true)
              }}
            >
              <i className="mdi mdi-trash-can font-size-16 text-danger me-1"></i>
              {props.t("Delete")}
            </DropdownItem>
            }
            
          </DropdownMenu>
          </div>
        </UncontrolledDropdown>
      ),
    },
  ]

  const defaultSorted = [
    {
      dataField: "createdAt",
      order: "desc",
    },
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: Users ? Users.length : 0,
    custom: true,
  }

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "All", value: Users ? Users.length : 0 },
  ]

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const { SearchBar } = Search

  const handleValidSubmit = (e, values) => {
    if (isEdit) {
      const updateData = {
        _id: selectedUser._id,
        name: values.name,
        email: values.email,
        companyId: params.id,
       
      }
     
      
    setdynamic_title("Başarılı");
    setdynamic_description("Güncelleme Başarılı");
      // update Company
      dispatch(onUpdateCompanyUser(updateData))
    } else {
      const newData = { 
        name: values.name,
        email: values.email,
        companyId: params.id,
     
      }
    
      
    setdynamic_title("Başarılı");
    setdynamic_description(newData.name+" Eklendi");
      // save new Company
      dispatch(onAddCompanyUser(newData))
      console.log(newData)
    }
    toggle()
  }

  const handleValidRolesSubmit = (e, v) => {
    let selectedRoles = roleList.filter(x => x.checked === true)
    let roleNames = []
    selectedRoles.forEach(_r => {
      roleNames.push(_r.name)
    })
    let body = {
      UserId: selectedUser._id,
      Roles: roleNames,
    }
  
    
    setdynamic_title("Başarılı");
    setdynamic_description(selectedUser.name + "'in Rolleri Başarıyla Güncellendi");
    dispatch(onAddUserRoles(body)); 
    toggleRole();
  }

  const handleValidDate = date => {
    if (date) {
      const date1 = moment(new Date(date)).format("DD.MM.YYYY")
      return date1
    } else {
      return ""
    }
  }

  const handleValidDateAvField = date => {
    if (date) {
      const date1 = moment(new Date(date)).format("YYYY-MM-DD")
      return date1
    } else {
      return ""
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{props.t("Users")}</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb
            title={props.t("Companies")}
            breadcrumbItem={props.t("Users")}
            addBtn={true}
            addBtnCallBack={() => {
              setIsEdit(false)
              setSelectedUser({
                name: "",
                email: "",
                companyId: params.id,
              })
              toggle()
            }}
          />

          {/* TABLE */}
          <Card>
            <CardBody>
              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="id"
                columns={columns}
                data={Users}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="_id"
                    columns={columns}
                    data={Users}
                    search
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row className="mb-2">
                          <Col md="4">
                            <div className="search-box me-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField={"_id"}
                                responsive
                                bordered={false}
                                striped={false}
                                defaultSorted={defaultSorted}
                                classes={"table align-middle table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="align-items-md-center mt-30">
                          <Col className="inner-custom-pagination d-flex">
                            <div className="d-inline">
                              <SizePerPageDropdownStandalone
                                {...paginationProps}
                              />
                            </div>
                            <div className="text-md-right ms-auto">
                              <PaginationListStandalone {...paginationProps} />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider>
            </CardBody>
          </Card>

          {/* ADD or EDIT */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? props.t("Edit User") : props.t("New User")}
            </ModalHeader>
            <ModalBody>
              <AvForm onValidSubmit={handleValidSubmit} autoComplete="off">
                <Row form>
                  <Col xs={12}>
                    <div>
                      <div className="mb-3">
                        <AvField
                          name="name"
                          label={props.t("UserName")}
                          type="text"
                          errorMessage={props.t("InvalidInput")}
                          validate={{
                            required: { value: true },
                          }}
                          value={selectedUser?.name || ""}
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="email"
                          label={props.t("Email")}
                          type="text"
                          errorMessage={props.t("InvalidInput")}
                          validate={{
                            required: { value: false },
                          }}
                          value={selectedUser?.email || ""} 
                        />
                      </div>
                     
                     
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button
                        className="me-2"
                        onClick={() => {
                          toggle()
                        }}
                      >
                        {props.t("Cancel")}
                      </Button>
                      <Button
                        type="submit"
                        className="btn-success me-2"
                        onClick={() => {}}
                      >
                        {props.t("Save")}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </AvForm>
            </ModalBody>
          </Modal>

          {/* ROLES */}
          <Modal isOpen={modalRole} toggle={toggleRole}>
            <ModalHeader toggle={toggleRole} tag="h4">
              {selectedUser?.name + " " + props.t("Roles")}
            </ModalHeader>
            <ModalBody>
              <AvForm onValidSubmit={handleValidRolesSubmit} autoComplete="off">
                <Row form>
                  <Col xs={12}>
                    {loadingRole ? (
                      <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                      </div>
                    ) : (
                      <div className="mb-3">
                        {map(roleList, (role, index) => {
                          if (authorize(role.view))
                            return (
                              <div
                                key={index}
                                className="form-check form-switch form-switch-lg mb-3"
                              >
                                {" "}
                                <label
                                  className="form-check-label"
                                  htmlFor={"role_" + index}
                                >
                                  {role.description}
                                </label>
                                <input
                                  type="checkbox"
                                  id={"role_" + index}
                                  name={"role_" + index}
                                  className="form-check-input"
                                  checked={role.checked}
                                  onChange={event => {
                                    role.checked = !role.checked
                                    setRoleList([...roleList])
                                  }}
                                />
                              </div>
                            )
                          else return
                        })}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button
                        className="me-2"
                        onClick={() => {
                          toggleRole()
                        }}
                      >
                        {props.t("Cancel")}
                      </Button>
                      <Button
                        type="submit"
                        className="btn-success me-2"
                        onClick={() => {}}
                      >
                        {props.t("Save")}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </AvForm>
            </ModalBody>
          </Modal>

          {success_dlg ? (
            <SweetAlert
              success
              title={dynamic_title}
              confirmBtnText={props.t("Ok")}
              onConfirm={() => {
                setsuccess_dlg(false)
              }}
            >
              {dynamic_description}
            </SweetAlert>
          ) : null}

          {confirm_alert ? (
            <SweetAlert
              title={props.t("Are You Sure")}
              warning
              showCancel
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              cancelBtnText={props.t("Cancel")}
              confirmBtnText={props.t("Delete")}
              onConfirm={() => {
                setconfirm_alert(false)
                setsuccess_dlg(true)
                setdynamic_title(props.t("Deleted"))
                setdynamic_description("")
                dispatch(onDeleteCompanyUser(selectedId))
                setSelectedId(null)
              }}
              onCancel={() => setconfirm_alert(false)}
            >
              {props.t("DeleteWarning")}
            </SweetAlert>
          ) : null}

          {error && error ? (
            <SweetAlert
              title={props.t("Error")}
              warning
              confirmBtnText={props.t("Ok")}
              onConfirm={() => {
                dispatch(onResetCompany())
              }}
            >
              {JSON.stringify(error)}
            </SweetAlert>
          ) : null}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(withTranslation()(CompanyUsers))
