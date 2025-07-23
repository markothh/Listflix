import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SubscriptionsListStore } from "../stores/subscriptionsListStore";
import SearchComponent from "../components/SearchComponent";
import ListComponent from '../features/lists/ListComponent';

const ListsPage = observer(() => {
  useEffect(() => {
    SubscriptionsListStore.fetchLists();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      <SearchComponent mode='subscriptions'/>

      <div style={{ marginTop: '50px' }}>
        <ListComponent store={SubscriptionsListStore} name="Мои подписки"/>
      </div>
    </div>
  );
});

export default ListsPage;
