import React, { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";

const UIAlert = (props) => {
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       clearTimeout(timer);
  //       props.setShow(false);
  //     }, 1000);
  //   });
  return (
    <Alert
      as="button"
      variant={props.variant || "secondary"}
      show={props.show}
      onClose={() => props.setShow(false)}
      dismissible
    >
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>Aww yeah, you successfully read this important alert message.</p>
    </Alert>
  );
};

export default UIAlert;
