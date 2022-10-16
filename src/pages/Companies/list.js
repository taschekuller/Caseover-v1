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
  getCompanies as onGetCompanies,
  deleteCompany as onDeleteCompany,
 
  addCompany as onAddCompany,
  updateCompany as onUpdateCompany,
  resetCompany as onResetCompany,
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

const Companies = props => {
  const dispatch = useDispatch()

  const [selectedId, setSelectedId] = useState()
  const [selectedCompany, setSelectedCompany] = useState()
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [formStep, setFormStep] = useState(0)

  const [value, setValue] = useState()

  const { error, Companies  } = useSelector(state => ({
    error: state.Companies?.error,
    Companies: state.Companies?.data,
   
  }))


  let user = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    dispatch(onGetCompanies())
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
      text: props.t("CompanyName"),
      sort: true,
    },
    {
      dataField: "userName",
      text: props.t("İletişime Geçen Kişi"),
      sort: false,
    }, 
    {
      dataField: "email",
      text: props.t("Email"), 
      sort: false,
    },
    {
      dataField: "registerReason",
      text: props.t("Kayıt Sebebi"),
      sort: false,
    },
    {
      dataField: "phone",
      text: props.t("Phone"),
      sort: false,
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
              href={"/companies/users/"+row._id}
              onClick={() => {
              }}
            >
              <i className="mdi mdi-account-multiple font-size-16 text-primary me-1"></i>
              {props.t("Users")}
            </DropdownItem>           
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
    totalSize: Companies ? Companies.length : 0, // replace later with size(Companies),
    custom: true,
  }

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "All", value: Companies ? Companies.length : 0 },
  ]

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const { SearchBar } = Search

  const handleValidCompanySubmit = (e, values) => {
    if (isEdit) {
      const updateCompany = {
        _id: selectedCompany._id,
        name: values.name,
        description: values["description"],
        verDaire: values["verDaire"],
        verNo: values["verNo"],
        userName: values["userName"],
        email: values["email"],
        phone: values["phone"],
        address: values["address"], 
       
      }
     
      // update Company
      dispatch(onUpdateCompany(updateCompany))
    } else {
      const newCompany = {
        name: values.name,
        description: values["description"],
        verDaire: values["verDaire"],
        verNo: values["verNo"],
        userName: values["userName"],
        email: values["email"],
        phone: values["phone"],
        address: values["address"], 
      
      }
     
      // save new Company
      dispatch(onAddCompany(newCompany))
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
          <title>{props.t("Companies")}</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb
            title={props.t("Companies")}
            breadcrumbItem={props.t("Companies")}
            addBtn={false}
          />

          {/* TABLE */}
          <Card>
            <CardBody>
              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="id"
                columns={columns}
                data={Companies}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="_id"
                    columns={columns}
                    data={Companies}
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
          <Modal isOpen={modal} toggle={toggle} size={"lg"}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? props.t("Edit Company") : props.t("Add Company")}
            </ModalHeader>
            <ModalBody>
              <AvForm
                onValidSubmit={handleValidCompanySubmit}
                autoComplete="off"
              >
                <Row form>
                  <Col xs={12}>
                    <div className="wizard clearfix mb-4">
                      <div className="steps clearfix">
                        <ul>
                          <NavItem
                            className={classnames({ current: formStep === 0 })}
                          >
                            <NavLink
                              className={classnames({
                                current: formStep === 0,
                              })}
                              onClick={() => {
                                setFormStep(0)
                              }}
                            >
                              <span className="number">1</span>{" "}
                              {props.t("COMPANY_INFO")}
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: formStep === 1 })}
                          >
                            <NavLink
                              className={classnames({
                                active: formStep === 1,
                              })}
                              onClick={() => {
                                setFormStep(1)
                              }}
                            >
                              <span className="number ms-2">2</span>{" "}
                              {props.t("Contact User Info")}
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: formStep === 2 })}
                          >
                            <NavLink
                              className={classnames({
                                active: formStep === 2,
                              })}
                              onClick={() => {
                                setFormStep(2)
                              }}
                            >
                              <span className="number">3</span>{" "}
                              {props.t("BRANCH_INFO")}
                            </NavLink>
                          </NavItem>
                         
                        </ul>
                      </div>
                    </div>
                    <FormGroup row>
                      <div
                        id="step-0"
                        style={{ display: formStep == 0 ? "block" : "none" }}
                      >
                        <div className="mb-3">
                          <AvField
                            name="name"
                            label={props.t("CompanyName")}
                            type="text"
                            errorMessage={props.t("InvalidInput")}
                            validate={{
                              required: { value: true },
                            }}
                            value={selectedCompany?.name || ""}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="description"
                            label={props.t("Description")}
                            type="text"
                            errorMessage={props.t("InvalidInput")}
                            validate={{
                              required: { value: false },
                            }}
                            value={selectedCompany?.description || ""}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="verDaire"
                            label={props.t("verDaire")}
                            type="text"
                            errorMessage={props.t("InvalidInput")}
                            validate={{
                              required: { value: false },
                            }}
                            value={selectedCompany?.verDaire || ""}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField 
                            name="verNo"
                            label={props.t("verNo")}
                            type="text"
                            errorMessage={props.t("InvalidInput")}
                            validate={{
                              required: { value: false },
                              pattern: {
                                value: "^[0-9]+$",
                                errorMessage:
                                  "Geçerli Bir Vergi Numarası Girin",
                              },
                            }}
                            value={selectedCompany?.verNo || ""}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup row>
                      <div
                        id="step-1"
                        style={{ display: formStep == 1 ? "block" : "none" }}
                      >
                        <div className="mb-3">
                          <small>
                            {props.t("Company Generate Contact User Info")}
                          </small>
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="userName"
                            label={props.t("UserName")}
                            type="text"
                            errorMessage={props.t("InvalidInput")}
                            validate={{
                              required: { value: false },
                            }}
                            value={selectedCompany?.userName || ""}
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
                            value={selectedCompany?.email || ""}
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
                            value={selectedCompany?.phone || ""}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="address"
                            label={props.t("Address")}
                            type="textarea"
                            errorMessage={props.t("InvalidInput")}
                            validate={{
                              required: { value: false },
                            }}
                            value={selectedCompany?.address || ""}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup row>
                      <div
                        id="step-2"
                        style={{ display: formStep == 2 ? "block" : "none" }}
                      >
                        
                        <div className="mb-3">
                          <AvField
                            name="branchName"
                            label={props.t("Branch Name")}
                            type="text"
                            errorMessage={props.t("InvalidInput")}
                            validate={{
                              required: { value: true },
                            }}
                            value={""}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="branchDescription"
                            label={props.t("Description")}
                            type="text"
                            errorMessage={props.t("InvalidInput")}
                            validate={{
                              required: { value: false },
                            }}
                            value={""}
                          />
                        </div>
                       
                      
                      </div>
                    </FormGroup>
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

                      {formStep > 0 ? (
                        <Button
                          className="btn-success me-2"
                          onClick={() => {
                            setFormStep(formStep - 1)
                          }}
                        >
                          {props.t("Prev")}
                        </Button>
                      ) : null}
                      
                      {formStep < 2 ? (
                        <Button
                          className="btn-success me-2"
                          onClick={() => {
                            setFormStep(formStep + 1)
                          }}
                        >
                          {props.t("Next")}
                        </Button>
                      ) : null}
                      {formStep == 2 ? (
                        <Button
                          type="submit"
                          className="btn-success me-2"
                          onClick={() => {}}
                        >
                         {selectedCompany.confirm=="wait"?props.t("Confirm and Save"):props.t("Save")}
                        </Button>
                      ) : null}
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
                dispatch(onDeleteCompany(selectedId))
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

export default withRouter(withTranslation()(Companies))
