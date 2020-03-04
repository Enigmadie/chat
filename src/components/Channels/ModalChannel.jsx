import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import connect from '../../connect';
import modalSelector from './modal-selector';

const ModalChannel = ({
  show,
  onHide,
  modalAction,
  channelName,
  setChannelName,
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
          channel: channelName,
          id: channelId,
        }}

        validationSchema={Yup.object().shape({
          channel: Yup.string().max(25).required('Can\'t be blank'),
        })}

        onSubmit={({ channel, id }, { setSubmitting }) => {
          const currentAction = actionSelector[modalAction];
          currentAction({ id, channel });
          setChannelName('');
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => {
          const isInvalidChannel = errors.channel && touched.channel;
          const isDisabled = isInvalidChannel || isSubmitting;
          const isRemovingModal = modalAction === 'remove';
          const buttonVariant = cn({
            danger: isRemovingModal,
            dark: !isRemovingModal,
          });
          const inputClass = cn({
            'form-control': true,
            'is-invalid': isInvalidChannel,
          });

          return (
            <Form>
              <Modal.Body>
                {hasBodyInput && (
                  <>
                    <Field type="test" name="channel" className={inputClass} />
                    {isInvalidChannel && <div className="invalid-feedback">{errors.channel}</div>}
                  </>
                )}
                {isRemovingModal && (
                  <p>The channel will be deleted. Are you sure?</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                  Close
                </Button>
                <Button type="submit" disabled={isDisabled} variant={buttonVariant} onClick={onHide}>
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

export default connect(null)(ModalChannel);
