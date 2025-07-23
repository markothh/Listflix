import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'baseui/modal';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { authStore } from '../../stores/authStore';  
import axiosInstance from '../../services/axiosInstance';  

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const resetFields = () => {
    setUsername('')
    setPassword('')
  }

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleLoginSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/authenticate', { username, password });
      const token  = response.data;

      if (token) {
        authStore.login(token, username); 
        handleClose();  
      } else {
        throw new Error('Токен не получен');
      }
    } catch (error) {
      localStorage.clear()
      console.log(error)
      setError('Ошибка при авторизации. Проверьте данные и попробуйте снова.');
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeable
      animate
      overrides={{
        Dialog: { style: { width: '400px', padding: '20px' } },
      }}
    >
      <ModalHeader>Вход</ModalHeader>
      <ModalBody>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Имя пользователя"
          clearable
          overrides={{ Root: { style: { marginBottom: '16px' } } }}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          type="password"
          clearable
          overrides={{ Root: { style: { marginBottom: '16px' } } }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={handleLoginSubmit}
          isLoading={isLoading}
          overrides={{ BaseButton: { style: { width: '100%' } } }}
        >
          Войти
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LoginModal;
