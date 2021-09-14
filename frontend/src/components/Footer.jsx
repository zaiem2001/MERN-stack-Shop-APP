import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="my-5 FOOTER">
      <Container className="align-center">
        <Row>
          <Col className="text-center py-3">
            <h6>copyright © Amin-Shop </h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
