import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { registerStore } from '../../stores/registerStore'; 

const RegisterModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetFields = () => {
    setUsername('')
    setPassword('')
    setEmail('')
    setConfirmPassword('')
  }

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают.');
      return;
    }

    try {
      await registerStore.register({ username, email, password });
      handleClose(); 
    } catch (error) {
      setErrorMessage(error.message || 'Ошибка регистрации.');
    }
  };

  return (
    <Modal onClose={handleClose} isOpen={isOpen} closeable autoFocus>
      <ModalHeader>Регистрация</ModalHeader>
      <ModalBody>
        <FormControl label="Имя пользователя">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя пользователя"
          />
        </FormControl>
        <FormControl label="Электронная почта">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите электронную почту"
            type="email"
          />
        </FormControl>
        <FormControl label="Пароль">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            type="password"
          />
        </FormControl>
        <FormControl label="Подтверждение пароля">
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            type="password"
          />
        </FormControl>
        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="secondary" onClick={onClose}>
          Отмена
        </ModalButton>
        <ModalButton kind="primary" onClick={handleRegister}>
          Зарегистрироваться
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default RegisterModal;
