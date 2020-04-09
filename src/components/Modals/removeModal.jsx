import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { Formik, Form } from 'formik';

import connect from '../../connect';

const mapStateToProps = ({ uiModal, channels }) => ({
  modalData: uiModal,
  validationState: channels.validationState,
});

const removeModal = ({
  modalData,
  hideModal,
  removeChannel,
  validationState,
}) => {
  const { channel, type, show } = modalData;

  const isRemoveType = type === 'remove';
  const isShow = show === true && isRemoveType;

  return (
    <Modal show={isShow} onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          name: channel.name,
          id: channel.id,
        }}

        onSubmit={async ({ id }) => {
          await removeChannel({ id });
          hideModal();
        }}
      >
        {({
          isSubmitting,
          values,
        }) => {
          const isValidState = validationState === 'valid';
          const isDisabled = isSubmitting || !isValidState;

          return (
            <Form>
              <Modal.Body>
                <p>
                  The channel
                  <b>
                    {` ${values.name} `}
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
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default connect(mapStateToProps)(removeModal);
