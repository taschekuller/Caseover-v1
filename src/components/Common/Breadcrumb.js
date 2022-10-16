import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem, Button } from "reactstrap"

const Breadcrumb = props => {
  
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">
            {props.breadcrumbItem}
            {props.addBtn ? (<Button className="btn btn-success m-2" onClick={() => props.addBtnCallBack()}><i className="fa fa-plus"></i></Button>) : null}
          </h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                
              </BreadcrumbItem>
              <BreadcrumbItem active>
               
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export default Breadcrumb
