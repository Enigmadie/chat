import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import modalSelector from './modal-selector';
import { addChannel as addNewChannel, removeChannel as removeCurrentChannel, renameChannel as renameCurrentChannel } from './channelsSlice';

const mapDispatchToProps = {
  addChannel: addNewChannel,
  removeChannel: removeCurrentChannel,
  renameChannel: renameCurrentChannel,
};

const ModalChannel = ({
  show,
  onHide,
  modalAction,
  channelName,
  channelId,
  addChannel,
  renameChannel,
  removeChannel,
}) => {
  const { title, button, hasBodyInput } = modalSelector[modalAction];
  const actionSelector = {
    add: addChannel,
    remove: removeChannel,
    rename: renameChannel,
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          inputValue: channelName,
          id: channelId,
        }}

        onSubmit={({ inputValue, id }, { setSubmitting, resetForm }) => {
          const currentAction = actionSelector[modalAction];
          currentAction({ id, channel: inputValue });
          resetForm();
          setSubmitting(false);
        }}
    >
        {({ isSubmitting }) => {
          return (
            <Form>
              {hasBodyInput && (
                <Modal.Body>
                  <Field type="test" name="inputValue" />
                </Modal.Body>
              )}
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

export default connect(null, mapDispatchToProps)(ModalChannel);
