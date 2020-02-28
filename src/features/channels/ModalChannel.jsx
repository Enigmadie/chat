import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import modalSelector from './modal-selector';
import { addChannel as addNewChannel } from './channelsSlice';

const mapDispatchToProps = { addChannel: addNewChannel };

const ModalChannel = ({
  show,
  onHide,
  modalAction,
  value,
  addChannel,
}) => {
  const { title, button } = modalSelector[modalAction];

  const actionSelector = {
    add: addChannel,
    // 'edit': removeChannel,
    // 'delete': deleteChannel,
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          inputValue: value,
        }}

        onSubmit={({ inputValue }, { setSubmitting, resetForm }) => {
          const currentAction = actionSelector[modalAction];
          currentAction({ channel: inputValue });
          resetForm();
          setSubmitting(false);
        }}
    >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Modal.Body>
                <Field type="test" name="inputValue" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                  Close
                </Button>
                <Button type="submit" disabled={isSubmitting} variant="primary" onClick={onHide}>
                  {button}
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

// export default ModalChannel;
export default connect(null, mapDispatchToProps)(ModalChannel)
