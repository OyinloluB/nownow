import React from "react";

export const Legal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p>
            By using ShopNow, you agree to the Terms of Use and Privacy Policy
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};
