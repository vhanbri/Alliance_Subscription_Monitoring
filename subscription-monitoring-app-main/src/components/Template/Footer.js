import React from "react";
import { Container } from "react-bootstrap";
const Footer = () => {
  return (
    <div className="pt-5">
      <footer className="sticky-footer bg-white">
        <Container className="my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Alliance 2023</span>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
