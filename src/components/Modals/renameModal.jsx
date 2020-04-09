import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

import { useTranslation } from 'react-i18next';
import connect from '../../connect';

const mapStateToProps = ({ uiModal, channels }) => ({
  modalData: uiModal,
  validationState: channels.validationState,
});

const renameModal = ({
  hideModal,
  modalData,
  renameChannel,
  validationState,
}) => {
  const { t } = useTranslation();
  const blankMsg = t('blank');

  const { channel, type, show } = modalData;

  const isRemaneType = type === 'rename';
  const isShow = show === true && isRemaneType;

  return (
    <Modal show={isShow} onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          id: channel.id,
          name: channel.name,
        }}

        validationSchema={Yup.object().shape({
          name: Yup.string().max(25).required(blankMsg),
        })}

        onSubmit={async ({ name, id }) => {
          await renameChannel({ id, channel: name });
          hideModal();
        }}
      >
        {({
          isSubmitting,
          errors,
          touched,
        }) => {
          const isInvalidChannel = errors.name && touched.name;
          const isValidState = validationState === 'valid';
          const isDisabled = isInvalidChannel || isSubmitting || !isValidState;
          const inputClass = cn({
            'form-control': true,
            'is-invalid': isInvalidChannel,
          });

          return (
            <Form>
              <Modal.Body>
                <Field type="test" name="name" className={inputClass} />
                {isInvalidChannel && <div className="invalid-feedback">{errors.channel}</div>}
              </Modal.Body>
              <Modal.Footer>
                {isSubmitting && <Spinner animation="border" variant="dark" className="ml-3" />}
                <Button variant="secondary" onClick={() => hideModal()}>
                  Close
                </Button>
                <Button type="submit" disabled={isDisabled} variant="dark">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default connect(mapStateToProps)(renameModal);
