import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom'; // Импортируем хук для получения параметров URL
import { AdminListStore } from '../stores/adminListStore';
import { UserListsStore } from '../stores/userListStore';
import SearchComponent from '../components/SearchComponent';
import ListComponent from '../features/lists/ListComponent';
import AddButton from '../components/AddButton';
import AddListModal from '../features/lists/AddListModal';
import '../styles/ListsPage.css';

const ListsPage = observer(() => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams] = useSearchParams();  // Хук для извлечения query параметров
  const userId = searchParams.get('user');  // Извлекаем параметр `user`

  useEffect(() => {
    // Если userId есть, то загружаем списки для этого пользователя, иначе для админа
    if (userId) {
      AdminListStore.fetchLists(userId);  // Параметр userId передаем в fetchLists
    } else {
      AdminListStore.fetchLists();  // Загружаем обычные списки
    }
  }, [userId]);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="lists-page">
      <div className="search-component">
        <SearchComponent mode={userId ? 'user_lists' : 'admin_lists'} />
      </div>

      {!userId && (
        <AddButton className="add-button" onClick={handleAddClick} />
      )}

      <div className="lists-page-content">
        <ListComponent 
          store={userId ? UserListsStore : AdminListStore} 
          name={userId ? `Списки пользователя ${UserListsStore.username}` : "Мои списки"} 
          userId={userId}
        />
      </div>

      <AddListModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
});

export default ListsPage;
