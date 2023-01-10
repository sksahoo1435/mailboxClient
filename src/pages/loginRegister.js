import { Container, Row, Col } from "react-bootstrap";
import AuthForm from "../components/LoginRegister/UserAuthForm";
import SiteHero from "../components/LoginRegister/SiteHero";

const LoginRegister = () => {
  return (
    <>
      <div className="loginPageOuterContainer">
        <Container >
          <Row
            className="align-items-center justify-content-md-center"
            style={{ height: "100vh" }}
          >
            <Col md={6}>
              <AuthForm />
            </Col>
            <Col md={6}>
              <SiteHero />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LoginRegister;
