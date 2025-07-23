import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../stores/authStore';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { Tabs, Tab } from 'baseui/tabs';
import LoginModal from '../features/auth/LoginModal';
import RegisterModal from '../features/auth/RegisterModal';

const Navbar = observer(() => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Состояние для окна регистрации
  const navigate = useNavigate();
  const location = useLocation(); // Используем useLocation для отслеживания текущего маршрута

  const handleLogout = () => {
    authStore.logout(navigate);
  };

  const handleTabChange = (newKey) => {
    switch (newKey) {
      case "0":
        navigate('/');
        break;
      case "1":
        navigate('/lists');
        break;
      case "2":
        navigate('/subscriptions');
        break;
      default:
        break;
    }
  };

  const getActiveTab = () => {
    if (location.pathname === '/lists') {
      return 1;
    } else if (location.pathname === '/subscriptions') {
      return 2;
    }
    return 0; 
  };

  const activeTab = getActiveTab(); 

  useEffect(() => {
  }, [location]);

  return (
    <>
      <Block
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft="20px"
        backgroundColor="#f8f9fa"
      >
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Listflix</div>

        <Block display="flex" alignItems="center" style={{ width: '100%' }}>
          <Block
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '20px',
            }}
          >
            <Tabs
              activeKey={String(activeTab)}
              onChange={({ activeKey }) => handleTabChange(activeKey)}
              overrides={{
                TabList: {
                  style: {
                    color: 'inherit',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    width: '100%',
                    borderBottom: '2px solid #000',
                  },
                },
                Tab: {
                  style: {
                    textDecoration: 'none',
                    color: 'black',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '10px 20px',
                    borderRadius: '0', 
                    transition: 'background-color 0.3s ease',
                    borderBottom: activeTab === 0 ? '2px solid black' : 
                                activeTab === 1 ? '2px solid black' : 
                                activeTab === 2 ? '2px solid black' : 'none',
                  },
                },
                TabHighlight: {
                  style: {
                    backgroundColor: 'transparent', // Убираем дополнительное выделение
                  },
                },
              }}
            >
              <Tab title="Главная" />
              <Tab title="Списки" />
              <Tab title="Подписки" />
            </Tabs>
          </Block>

          {!localStorage.getItem('jwtToken') ? (
            <>
              <Button
                kind="primary"
                onClick={() => setIsLoginModalOpen(true)}
                style={{ margin: '0 10px' }}
              >
                Войти
              </Button>
              <Button
                kind="secondary"
                onClick={() => setIsRegisterModalOpen(true)} // Открыть окно регистрации
                style={{ margin: '0 10px' }}
              >
                Регистрация
              </Button>
            </>
          ) : (
            <>
              <Block
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  backgroundColor: '#f1f1f1', // Выделяем блок с именем пользователя
                  borderRadius: '4px',
                  textAlign: 'center',
                  margin: '0 10px',
                }}
              >
                {localStorage.username || 'Аккаунт'}
              </Block>
              <Button
                kind="secondary"
                onClick={handleLogout}
                style={{ margin: '0 10px' }}
              >
                Выйти
              </Button>
            </>
          )}
        </Block>
      </Block>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)} // Закрыть окно регистрации
      />
    </>
  );
});

export default Navbar;
