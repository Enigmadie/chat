import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

import Row from 'react-bootstrap/Row';

import UserContext from '../../UserContext';
import { addMessage } from './messagesSlice';

const mapDispatchToProps = { addNewMessage: addMessage };

const ChatInput = ({ addNewMessage }) => {
  const name = React.useContext(UserContext);
  return (
    <Row>
      <Formik
        initialValues={{
          message: '',
        }}

        validationSchema={Yup.object().shape({
          message: Yup.string().max(500).required('Can\'t be blank'),
        })}

        onSubmit={({ message }, { setSubmitting, resetForm }) => {
          addNewMessage({ message: { name, text: message } });
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => {
          const isInvalidMessage = errors.message && touched.message;
          const isDisabled = isInvalidMessage || isSubmitting;

          const inputClass = cn({
            'form-control is-invalid': isInvalidMessage,
          });

          return (
            <Form className="form-inline">
              <Field type="text" name="message" className={inputClass} />
              <button type="submit" className="btn btn-primary" disabled={isDisabled}>Add</button>
              {isInvalidMessage && <div className="invalid-feedback">{errors.message}</div>}
            </Form>
          );
        }}

      </Formik>
    </Row>
  );
};

export default connect(null, mapDispatchToProps)(ChatInput);
