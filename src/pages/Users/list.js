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
  getUsers as onGetUsers,
  deleteUser as onDeleteUser,
  
  addUser as onAddUser,
  updateUser as onUpdateUser,
  resetUser as onResetUser,
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
import classnames from "classnames"

const Users = props => {
  const dispatch = useDispatch()

  const [selectedId, setSelectedId] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [formStep, setFormStep] = useState(0)

  const [value, setValue] = useState()

  const { error, Users  } = useSelector(state => ({
    error: state.Users?.error,
    Users: state.Users?.data,
   
  }))


  let user = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    dispatch(onGetUsers())
  }, [dispatch])
 

  const toggle = () => {
    setModal(!modal); 
    setFormStep(0);
  }

  const statusSpan = _status => {
    if (_status == "success") {
      return (
        <span className="text-success">
          <i className="fa fa-check me-1"></i>
          {props.t("Confirmed")}
        </span>
      )
    } else if (_status == "wait") {
      return (
        <span className="text-warning">
          <i className="fa fa-hourglass me-1"></i>
          {props.t("Waiting")}
        </span>
      )
    } else {
      return (
        <span className="text-danger">
          <i className="fa fa-times me-1"></i>
          {props.t("Rejected")}
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
      sort: false,
    },
    {
      dataField: "school",
      text: props.t("Okul"),
      sort: false,
    },
    {
      dataField: "department",
      text: props.t("Bölüm"),
      sort: false,
    },
    {
      dataField: "phone",
      text: props.t("Phone"),
      sort: false,
    },
    {
      dataField: "isGraduated",
      text: props.t("Mezun Mu?"),
      sort: false,
      formatter: (cell, row) => (
        <div
          style={{ position: "relative", left: "10px" }}
        >
          {cell == true ? (
            <div className="avatar-xs">
              <span
                className="avatar-title rounded-circle  text-white font-size-16"
                style={{ backgroundColor: "#34c38f" }}
              >
                <i className="bx bx-comment-check"></i>{" "}
              </span>
            </div>
          ) : (
            <div className="avatar-xs">
              <span
                className="avatar-title rounded-circle text-white font-size-16"
                style={{ backgroundColor: "#f46a6a" }}
              >
                X
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      dataField: 'createdAt',
      text: props.t("Oluşturulma Tarihi"),
      sort: true, 
      formatter: (cell, row) => (
          <span>{handleValidDate(cell)}</span>
      )
  },
  
  {
    dataField: "isApproved",
    text: props.t("Onaylı Mı?"),
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
    dataField: 'CompanyId',
    text: props.t("Şirket"),
    sort: true,  
    formatter: (cell, row) => (
      <span>{cell?.name}</span>
  )
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
    totalSize: Users ? Users.length : 0, // replace later with size(Users),
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

  const handleValidUserSubmit = (e, values) => {
    if (isEdit) {
      const updateUser = {
        _id: selectedUser._id,
        name: values.name,
        description: values["description"],
        verDaire: values["verDaire"],
        verNo: values["verNo"],
        userName: values["userName"],
        email: values["email"],
        phone: values["phone"],
        address: values["address"], 
       
      }
     
      // update User
      dispatch(onUpdateUser(updateUser))
    } else {
      const newUser = {
        name: values.name,
        description: values["description"],
        verDaire: values["verDaire"],
        verNo: values["verNo"],
        userName: values["userName"],
        email: values["email"],
        phone: values["phone"],
        address: values["address"], 
      
      }
     
      // save new User
      dispatch(onAddUser(newUser))
    }
    toggle();
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
            title={props.t("Users")}
            breadcrumbItem={props.t("Users")}
            addBtn={false}
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
                dispatch(onDeleteUser(selectedId))
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
                dispatch(onResetUser())
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

export default withRouter(withTranslation()(Users))
