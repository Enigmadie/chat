import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import connect from '../connect';

const mapStateToProps = (state) => ({
  channelId: state.activeChannelId.id,
  processing: state.messages.processing,
});

const ChatInput = ({
  name,
  addMessage,
  channelId,
  processing,
}) => {
  const { t } = useTranslation();
  const blankMsg = t('blank');
  return (
    <Col>
      <Formik
        initialValues={{
          message: '',
        }}

        validationSchema={Yup.object().shape({
          message: Yup.string().max(500).required(blankMsg),
        })}

        onSubmit={({ message }, { setSubmitting, resetForm }) => {
          addMessage({ message: { name, text: message }, channelId });
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => {
          const isInvalidMessage = errors.message && touched.message;
          const isDisabled = isInvalidMessage || isSubmitting;

          const inputClass = cn({
            'col-10 form-control': true,
            'is-invalid': isInvalidMessage,
          });

          return (
            <Form className="form-inline">
              <Field type="text" name="message" className={inputClass} />
              <Button type="submit" variant="dark" className="col-1" disabled={isDisabled}>Send</Button>
              {processing && <Spinner animation="border" variant="dark" className="ml-3" />}
              {isInvalidMessage && <div className="invalid-feedback">{errors.message}</div>}
            </Form>
          );
        }}
      </Formik>
    </Col>
  );
};

export default connect(mapStateToProps)(ChatInput);
