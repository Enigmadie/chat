import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useFormik } from 'formik';

import connect from '../../connect';

const removeModal = ({
  validationState,
  uiModal,
  hideModal,
  removeChannel,
}) => {
  const { channel, show } = uiModal;
  const { id, name } = channel;

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      await removeChannel({ id });
      hideModal();
    },
  });

  const {
    isSubmitting,
    handleSubmit,
  } = formik;

  const isValidState = validationState === 'valid';
  const isDisabled = isSubmitting || !isValidState;

  return (
    <Modal show={show} onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>
            The channel
            <b>
              {` ${name} `}
            </b>
            will be deleted. Are you sure?
          </p>
        </Modal.Body>
        <Modal.Footer>
          {isSubmitting && <Spinner animation="border" variant="dark" className="ml-3" />}
          <Button variant="secondary" onClick={() => hideModal()}>
            Close
          </Button>
          <Button type="submit" disabled={isDisabled} variant="danger">
            Remove
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default connect()(removeModal);
