import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as actions from '../actions';
import UserContext from '../UserContext';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};


class Chat extends React.Component {
  render() {
    const { messages } = this.props;
    const name = this.context;

    return (
      <div className="col-10">
        <div className="container">
          <div className="row overflow-auto chat">
            {messages.map((el) => (
              <span className="col-12" key={el.id}>{el.name}: {el.text}</span>
            ))}
          </div>
          <div className="row">
            <Formik
              initialValues={{
                message: '',
              }}
              onSubmit={({ message }, { setSubmitting, resetForm }) => {
                const { addMessage } = this.props;
                addMessage({ message: { name, text: message } });
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
          </div>
        </div>
      </div>
    );
  }
}

Chat.contextType = UserContext;
export default connect(mapStateToProps, actionCreators)(Chat);
