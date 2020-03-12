import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

import { useTranslation } from 'react-i18next';
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
  removeChannelMessages,
}) => {
  const { title, button, hasBodyInput } = modalSelector[modalAction];
  const actionSelector = {
    add: addChannel,
    remove: removeChannel,
    rename: renameChannel,
  };
  const { t } = useTranslation();
  const blankMsg = t('blank');
  const isRemovingModal = modalAction === 'remove';
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
          channel: Yup.string().max(25).required(blankMsg),
        })}

        onSubmit={async ({ channel, id }) => {
          const currentAction = actionSelector[modalAction];
          await currentAction({ id, channel });
          if (isRemovingModal) {
            removeChannelMessages({ id });
          }
          setChannelName('');
          onHide();
        }}
      >
        {({
          isSubmitting,
          errors,
          values,
          touched,
        }) => {
          const isInvalidChannel = errors.channel && touched.channel;
          const isDisabled = isInvalidChannel || isSubmitting;

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
                  <p>
                    The channel
                    <b>
                      {` ${values.channel} `}
                    </b>
                    will be deleted. Are you sure?
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                {isSubmitting && <Spinner animation="border" variant="dark" className="ml-3" />}
                <Button variant="secondary" onClick={onHide}>
                  Close
                </Button>
                <Button type="submit" disabled={isDisabled} variant={buttonVariant}>
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
