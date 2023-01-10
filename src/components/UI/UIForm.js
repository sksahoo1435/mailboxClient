import React from "react";
import { Form } from "react-bootstrap";

const UIForm = React.forwardRef((props, ref) => {

  return (
    <Form
      ref={ref}
      className={props.className}
      id={props.id}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </Form>
  );
});

export default UIForm;
