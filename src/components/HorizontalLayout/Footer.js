import React from "react"
import { Container, Row, Col } from "reactstrap"
import "./footerStyle.scss"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6} sm={6} xs={6} style={{ bottom: "10px" }}> 
              <div className="footerIcon">
              <a href="https://www.linkedin.com/company/caseover"><i className="footerLinkedin bx-md bx bxl-linkedin"></i></a>
              <a href="https://www.instagram.com/caseovernet"><i className="footerInstagram px-2 bx-md bx bxl-instagram"></i></a>
              </div>
            </Col> 
            <Col md={6} sm={6} xs={6}> 
              <div className="text-sm-end">
              {new Date().getFullYear()} © Caseover.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer