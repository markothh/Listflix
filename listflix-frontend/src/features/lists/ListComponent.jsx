import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ListItem from './ListItem'; 

const ListComponent = observer(({ store, name, userId = null }) => {
  useEffect(() => {
    userId ? store.fetchLists(userId) : store.fetchLists();
  }, [store]);

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (store.error) {
    return <div className="text-danger">{store.error}</div>;
  }

  if (!store.lists || store.lists.length === 0) {
    return <div>Нет доступных списков</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{name}</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {store.lists.map((list, index) => (
          <ListItem
            key={list.id}
            id={list.id}
            index={index}
            name={list.name}
          />
        ))}
      </ul>
    </div>
  );
});

export default ListComponent;
