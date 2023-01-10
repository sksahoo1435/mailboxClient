import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Hero from "../assets/svg/404Hero.svg";

const PageNotFound = () => {
  return (
    <Container
      fluid
      style={{
        height: "100vh",
      }}
      className="pagenotfound"
    >
      <h1
        className="text-center mx-auto my-3 fw-bold text-danger"
      >
        <span style={{ fontSize: 80 }}>404</span>
        <br />
        Page not found
      </h1>
      <p
        className="text-center fw-thin text-underline text-info"
        style={{
          fontSize: "0.72rem",
        }}
      >
        The page you are looking for is not found
      </p>

      <img
        className="image-fluid mx-auto d-block heroImage"
        src={Hero}
        alt="hero"
        style={{
          maxWidth: "100%",
          height: "80%",
        }}
      />
    </Container>
  );
};

export default PageNotFound;
