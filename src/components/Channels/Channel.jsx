import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Channel = ({
  name,
  removable,
  onClick,
  handleModalRename,
  handleModalRemove,
}) => {
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
      {removable && (
        <div className={showButtons}>
          <button className="pr-1 border-0 bg-transparent" type="button" onClick={handleModalRename}>
            <img
              src="https://img.icons8.com/small/16/000000/edit.png"
              alt="rename"
            />
          </button>
          <button className="border-0 bg-transparent" type="button" onClick={handleModalRemove}>
            <img
              src="https://img.icons8.com/ios/16/000000/delete-sign.png"
              alt="remove"
            />
          </button>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default Channel;
