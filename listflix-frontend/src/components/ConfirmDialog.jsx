import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalHeader>Подтвердите действие</ModalHeader>
    <ModalBody>{message}</ModalBody>
    <ModalFooter>
      <ModalButton kind="secondary" onClick={onClose}>
        Отмена
      </ModalButton>
      <ModalButton kind="primary" onClick={onConfirm}>
        Удалить
      </ModalButton>
    </ModalFooter>
  </Modal>
);

export default ConfirmDialog;
