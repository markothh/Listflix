import React, { useState } from 'react';
import SearchComponent from '../components/SearchComponent';
import ListComponent from '../features/lists/ListComponent';
import { popularListsStore } from '../stores/popularListsStore';
import { RadioGroup, Radio } from 'baseui/radio';

const HomePage = () => {
  const [searchType, setSearchType] = useState('users'); // Управляемый state для типа поиска

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '60px',
          marginTop: '30px'
        }}
      >
        <div style={{ flexShrink: 0, marginLeft: '25%' }}>
          <h4>Искать по:</h4>
          <RadioGroup
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)} // Обновляем searchType
            name="searchType"
          >
            <Radio value="users">Пользователи</Radio>
            <Radio value="lists">Списки</Radio>
          </RadioGroup>
        </div>

        <div style={{ flexGrow: 1 }}>
          <SearchComponent mode={searchType} />
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <ListComponent store={popularListsStore} name="Популярные списки" />
      </div>
    </div>
  );
};

export default HomePage;
