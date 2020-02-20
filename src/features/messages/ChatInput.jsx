import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
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
        onSubmit={({ message }, { setSubmitting, resetForm }) => {
          addNewMessage({ message: { name, text: message } });
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form inline">
            <Field type="text" name="message" />
            <button type="submit" className="btn btn-primary btn-sm" disabled={isSubmitting}>Add</button>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export default connect(null, mapDispatchToProps)(ChatInput);
