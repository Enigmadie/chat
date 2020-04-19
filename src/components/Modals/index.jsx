import React from 'react';
import { useSelector } from 'react-redux';

import AddModal from './addModal.jsx';
import RemoveModal from './removeModal.jsx';
import RenameModal from './renameModal.jsx';

const modalSelector = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

export default () => {
  const { channels: { validationState }, uiModal } = useSelector((state) => state);
  const { type, show } = uiModal;
  const ModalComponent = modalSelector[type];

  return (
    <>
      {show === true && <ModalComponent validationState={validationState} uiModal={uiModal} />}
    </>
  );
};
