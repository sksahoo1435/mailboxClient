import "../css/uiform.min.css";

import { Form, Button, Container, Row } from "react-bootstrap";
const UIForm = () => {
  return (
    <Container>
      <Form id="authform" className="auth-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            className="form-control-lg rounded p-3"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-info">Password</Form.Label>
          <Form.Control
            type="password"
            className="form-control-lg rounded py-3"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" className="d-block w-100 p-3 mb-3">
          LOGIN
        </Button>
        <a className="text-info" href="/resetpassord" alt="forgotpassword">
          Forgot password
        </a>

        <div className="text-secondary bg-altwhite shadow division d-flex justify-content-center align-items-center mx-auto my-3">
          <span>OR</span>
        </div>

        <Button variant="danger" className="d-block w-100 p-3 text-white">
          REGISTER
        </Button>
      </Form>
    </Container>
  );
};

export default UIForm;
