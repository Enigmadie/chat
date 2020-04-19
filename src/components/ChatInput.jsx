import React from 'react';
import { useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import connect from '../connect';

// const mapStateToProps = ({ messages, activeChannelId }) => ({
//   channelId: activeChannelId.id,
//   validationState: messages.validationState,
// });

const ChatInput = ({
  name,
  addMessage,
}) => {
  const { messages: { validationState }, activeChannelId } = useSelector((state) => state);
  const channelId = activeChannelId.id;

  const { t } = useTranslation();
  const blankMsg = t('blank');
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object().shape({
      message: Yup.string().max(500).required(blankMsg),
    }),
    onSubmit: async ({ message }, { resetForm }) => {
      await addMessage({ message: { name, text: message }, channelId });
      resetForm();
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

  const isInvalidMessage = errors.message && touched.message;
  const isValidState = validationState === 'valid';
  const isDisabled = isInvalidMessage || isSubmitting || !isValidState;

  const inputClass = cn({
    'col-10 form-control': true,
    'is-invalid': isInvalidMessage,
  });

  return (
    <div className="pb-4 pl-4 form-group">
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          value={values.message}
          onChange={handleChange}
          type="text"
          name="message"
          className={inputClass}
        />
        <Button type="submit" variant="dark" className="col-1" disabled={isDisabled}>Send</Button>
        {isSubmitting && <Spinner animation="border" variant="dark" className="ml-3" />}
        {isInvalidMessage && <span className="position-absolute fixed-bottom mb-3 pl-4 invalid-feedback">{errors.message}</span>}
      </form>
    </div>
  );
};

export default connect()(ChatInput);
