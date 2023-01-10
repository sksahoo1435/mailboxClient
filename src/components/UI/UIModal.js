import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideUIModal } from "../../store/slices/ui-slice";
const UIModal = (props) => {
  const dispatch = useDispatch();
  const showMailPreview = useSelector((state) => state.ui.modalVisible);

  return (
    <div
      style={{
        zIndex: "1000",
      }}
    >
      <Modal
        show={showMailPreview}
        onHide={() => {
          dispatch(hideUIModal());
        }}
        backdrop="static"
        centered={true}
      >
        {props.modalTitle && (
          <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body className="p-0">{props.modalBody}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger text-light fw-bold"
            onClick={() => {
              dispatch(hideUIModal());
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UIModal;
