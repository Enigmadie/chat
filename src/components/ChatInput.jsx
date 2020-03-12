import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import connect from '../connect';

const mapStateToProps = ({ activeChannelId }) => ({
  channelId: activeChannelId.id,
});

const ChatInput = ({
  name,
  addMessage,
  channelId,
}) => {
  const { t } = useTranslation();
  const blankMsg = t('blank');
  return (
    <div className="pb-4 pl-4 form-group">
      <Formik
        initialValues={{
          message: '',
        }}

        validationSchema={Yup.object().shape({
          message: Yup.string().max(500).required(blankMsg),
        })}

        onSubmit={async ({ message }, { resetForm }) => {
          await addMessage({ message: { name, text: message }, channelId });
          resetForm();
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
              {isSubmitting && <Spinner animation="border" variant="dark" className="ml-3" />}
              {isInvalidMessage && <span className="position-absolute fixed-bottom mb-3 pl-4 invalid-feedback">{errors.message}</span>}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps)(ChatInput);
