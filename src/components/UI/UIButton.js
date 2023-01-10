import React from "react";
import { Button } from "react-bootstrap";

const UIButton = React.forwardRef((props, ref) => {
  return (
    <Button
      ref={ref}
      variant={props.btnVariant}
      type={props.type}
      className={props.className}
      disabled={props.disabled}
      icon={props.icon && props.icon}
    >
      <span>{props.name}</span>
      <span className="fs-4 p-0 m-0 ms-2">{props.icon}</span>
    </Button>
  );
});

export default UIButton;
