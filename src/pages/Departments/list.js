import React, { useEffect, useState } from "react"
import { AvField, AvForm } from "availity-reactstrap-validation"
import { useSelector, useDispatch } from "react-redux"
import {Card, CardBody, Col, Container, Media, Row, UncontrolledDropdown, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody, Button,
  DropdownItem
} from "reactstrap"
import { withTranslation } from "react-i18next"
import { withRouter } from "react-router-dom"
import {
  getDepartments as onGetDepartments,
  addDepartment as onAddDepartment,
  updateDepartment as onUpdateDepartment,
  deleteDepartment as onDeleteDepartment,
} from "store/actions"
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"
import "./datatables.scss"

const departments = props => {
  const { SearchBar } = Search;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(onGetDepartments())
  }, [dispatch])

  const { MyDepartments } = useSelector(state => ({
    MyDepartments: state.Departments?.data,
  }))
  
  const [modal, setModal] = useState(false)
  const [checkModal, setCheckModal] = useState(false)
  const [selected, setSelected] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [confirm_alert, setconfirm_alert] = useState(false);
  const [success_dlg, setsuccess_dlg] = useState(false);
  const [dynamic_title, setdynamic_title] = useState("");
  const [dynamic_description, setdynamic_description] = useState("");
  const [selectedId, setSelectedId] = useState();
  const handleUpdateSubmit = (e, values) => {
    
    if (isEdit) {
      const updatedDepartment = {
        _id: selected._id,
        name: values["name"],
      } 
      dispatch(onUpdateDepartment(updatedDepartment))
    } else {
      const newDepartment = {
        name: values["name"],
      }
      dispatch(onAddDepartment(newDepartment))
    }
  }
  const columns =[
    {
      dataField : 'name',
      text:props.t("Name"),
      sort:true
    },
    {
      dataField: '_id',
      text: props.t("Action"),
      sort: false,
      formatter: (cell, row) => (
       <UncontrolledDropdown style={{ position: "unset" }}>
              <DropdownToggle href="#" className="card-drop" tag="i">
                  <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>
              <div className="drop-absolute">
              <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem href="#"
                      onClick={() => { 
                          setIsEdit(true);
                          setSelected(row)
                          toggle();
                      }}
                  >
                      <i className="mdi mdi-pencil font-size-16 text-success me-1"></i>
                      {props.t("Edit")}
                  </DropdownItem>
                  <DropdownItem href="#"
                      onClick={() => {
                          setSelectedId(cell)
                          setconfirm_alert(true);
                      }}>
                      <i className="mdi mdi-trash-can font-size-16 text-danger me-1"></i>
                      {props.t("Delete")}
                  </DropdownItem>
              </DropdownMenu>
              </div>
          </UncontrolledDropdown>
      )
  }
  ]
  const defaultSorted = [{ 
    dataField: 'createdAt',
    order: 'desc'
  }];
  const pageOptions = {
    sizePerPage: 10,
    totalSize:  MyDepartments?.size, 
    custom: true,
  }

  const toggle = () => {
    setModal(!modal)
  }
  const checkToggle = () => {
    setCheckModal(!checkModal)
  }

  return (
    <Container fluid>
      <div className="page-content" style={{marginTop:"50px"}}>
      <Breadcrumb title={props.t("Bölümler")} breadcrumbItem={props.t("Bölümler")} addBtn={true} addBtnCallBack={() => {
                setIsEdit(false);
                checkToggle();
                setSelected("");

            }}/>
             <Card>
                <CardBody>
                    <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField='id'
                        columns={columns}
                        data={MyDepartments}
                    >
                        {({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                                keyField='_id'
                                columns={columns}
                                data={MyDepartments}
                                search
                            >
                                {toolkitProps => (
                                    <React.Fragment>

                                        <Row className="mb-2">
                                            <Col md="4">
                                                <div className="search-box me-2 mb-2 d-inline-block">
                                                    <div className="position-relative">
                                                        <SearchBar
                                                            {...toolkitProps.searchProps}
                                                        />
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
                                                        classes={
                                                            "table align-middle table-nowrap"
                                                        }
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
                                                    <PaginationListStandalone
                                                        {...paginationProps}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                )
                                }
                            </ToolkitProvider>
                        )
                        }</PaginationProvider>

                   
                </CardBody>
            </Card>

        
        {/* CREATE MODAL */}
        
        <Modal isOpen={checkModal} toggle={checkToggle}>
          <ModalHeader>
            <Row>
              <h5>Add Deparment</h5>
              <Button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  checkToggle()
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
                      label="Kategori"
                      type="text"
                      errorMessage="Bu alan zorunludur"
                      validate={{
                        required: { value: true },
                      }}
                      value={selected?.name || ""}
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
                      checkToggle()
                      setIsEdit(false)
                    }}
                  >
                    Add
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={() => {
                      checkToggle()
                    }}
                  >
                    Cancel
                  </button>
                </Col>
              </Row>
              
            </AvForm>
          </ModalBody> 
        </Modal>

        {/* EDIT MODAL */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>
            <Row>
              <h5>Edit Deparment</h5>
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
                      label="Kategori"
                      type="text"
                      errorMessage="Bu alan zorunludur"
                      validate={{
                        required: { value: true },
                      }}
                      value={selected?.name || ""}
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
                        setconfirm_alert(false);
                        setsuccess_dlg(true);
                        setdynamic_title(props.t("Deleted"));
                        setdynamic_description("");
                        dispatch(onDeleteDepartment(selectedId));
                        setSelectedId(null);
                    }}
                    onCancel={() => setconfirm_alert(false)}
                >
                    {props.t("DeleteWarning")}
                </SweetAlert>
            ) : null}
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
      </div>
    </Container>
  )
}

export default withRouter(withTranslation()(departments))
