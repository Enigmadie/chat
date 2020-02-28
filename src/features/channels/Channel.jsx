import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Channel = ({ name, onClick, handleModalEdit, handleModalRemove }) => {
  const [showButtons, setShowButtons] = useState('d-none');

  const handleShowButtons = () => setShowButtons('d-block');
  const handleHiddenButtons = () => setShowButtons('d-none');

  return (
    <ListGroup.Item
      onClick={onClick}
      onMouseOver={handleShowButtons}
      onFocus={handleShowButtons}
      onMouseOut={handleHiddenButtons}
      onBlur={handleHiddenButtons}
      action
      className="d-flex row justify-content-between text-secondary border-0 bg-light py-1"
    >
      <span className="pl-3">{`# ${name}`}</span>
      <div className={showButtons}>
        <a href="#" className="pr-3" >
          <img
            src="https://img.icons8.com/ios/15/000000/edit.png"
            alt="edit"
            onClick={handleModalEdit}
            setValue={name}
          />
        </a>
        <a href="#">
          <img
            src="https://img.icons8.com/ios/15/000000/delete-sign.png"
            alt="remove"
            onClick={handleModalRemove}
          />
        </a>
      </div>
    </ListGroup.Item>
  );
};

export default Channel;
