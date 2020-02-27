import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import UserContext from '../../UserContext';
import { addMessage } from './messagesSlice';

const mapStateToProps = (state) => ({
  channelId: state.channels.currentChannelId,
});

const mapDispatchToProps = { addNewMessage: addMessage };

const ChatInput = ({ addNewMessage, channelId }) => {
  const name = React.useContext(UserContext);
  return (
    <Col>
      <Formik
        initialValues={{
          message: '',
        }}

        validationSchema={Yup.object().shape({
          message: Yup.string().max(500).required('Can\'t be blank'),
        })}

        onSubmit={({ message }, { setSubmitting, resetForm }) => {
          addNewMessage({ message: { name, text: message }, channelId });
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => {
          const isInvalidMessage = errors.message && touched.message;
          const isDisabled = isInvalidMessage || isSubmitting;

          const inputClass = cn({
            'col-11 form-control': true,
            'is-invalid': isInvalidMessage,
          });

          return (
            <Form className="form-inline">
              <Field type="text" name="message" className={inputClass} />
              <Button type="submit" variant="dark" className="col-1" disabled={isDisabled}>Send</Button>
              {isInvalidMessage && <div className="invalid-feedback">{errors.message}</div>}
            </Form>
          );
        }}
      </Formik>
    </Col>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
