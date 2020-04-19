import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

import { useTranslation } from 'react-i18next';
import connect from '../../connect';

const renameModal = ({
  validationState,
  uiModal,
  hideModal,
  renameChannel,
}) => {
  const { t } = useTranslation();
  const blankMsg = t('blank');

  const { channel, show } = uiModal;
  const { name, id } = channel;

  const formik = useFormik({
    initialValues: {
      id,
      name,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(25).required(blankMsg),
    }),
    onSubmit: async (values, { resetForm }) => {
      await renameChannel({ id, channel: values.name });
      resetForm();
      hideModal();
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    values,
  } = formik;


  const isInvalidChannel = errors.name && touched.name;
  const isValidState = validationState === 'valid';
  const isDisabled = isInvalidChannel || isSubmitting || !isValidState;
  const inputClass = cn({
    'form-control': true,
    'is-invalid': isInvalidChannel,
  });

  return (
    <Modal show={show} onHide={() => hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <input
            value={values.name}
            onChange={handleChange}
            type="test"
            name="name"
            className={inputClass}
          />
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
      </form>
    </Modal>
  );
};

export default connect()(renameModal);
