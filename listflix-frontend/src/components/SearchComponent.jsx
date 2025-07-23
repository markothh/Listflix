import React, { useState } from "react";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Popover } from "baseui/popover";
import { Card } from "baseui/card";
import { observer } from "mobx-react-lite";
import searchStore from "../stores/searchStore";
import { SubscriptionsListStore } from "../stores/subscriptionsListStore";
import { AdminListStore } from "../stores/adminListStore"; 
import { FilmsStoreInstance } from "../stores/filmStore";
import { useNavigate, useParams } from "react-router-dom";
import UserModal from "../features/users/UserModal";
import EditFilmModal from "../features/films/EditFilmModal";

const SearchComponent = observer(({ mode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (mode === "users" || mode === "lists") {
      searchStore.search(searchQuery, mode, id); 
    } else if (mode === "films") {
      searchStore.searchResults = FilmsStoreInstance.searchFilms(searchQuery);
      console.log(searchQuery, searchStore.searchResults)
    } else if (mode === "admin_lists") {
      searchStore.searchResults = AdminListStore.searchLists(searchQuery);
    } else if (mode === "subscriptions") {
      searchStore.searchResults = SubscriptionsListStore.searchLists(searchQuery);
    } else {
      console.log("Unknown mode");
    }
  };

  const handleItemClick = (item) => {
    console.log(item);
    if (mode === "users") {
      setSelectedUser(item);
      setIsUserModalOpen(true);
      searchStore.clearResults();
    } else if (mode === "lists" || mode === "admin_lists" || mode === "subscriptions") {
      navigate(`/lists/${item.id}`);
      searchStore.clearResults();
    } else if (mode === "films") {
      setSelectedFilm(item);
      setIsFilmModalOpen(true);
    } else {
      console.log("Unknown mode");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", width: "500px" }}>
        <Popover
          isOpen={searchStore.searchResults.length > 0}
          onClickOutside={() => searchStore.clearResults()}
          content={
            <div style={{ maxHeight: "200px", overflowY: "auto", width: "500px", padding: "10px" }}>
              {searchStore.isLoading ? (
                <div>Загрузка...</div>
              ) : searchStore.error ? (
                <div>Ошибка: {searchStore.error}</div>
              ) : searchStore.searchResults.length > 0 ? (
                searchStore.searchResults.map((item) => (
                  <Card
                    key={item.id}
                    overrides={{
                      Root: {
                        style: {
                          marginBottom: "10px",
                          cursor: "pointer",
                        },
                      },
                    }}
                    onClick={() => handleItemClick(item)}
                  >
                    <div>{mode === "users" ? item.username : item.name}</div>
                  </Card>
                ))
              ) : (
                <div>Нет результатов</div>
              )}
            </div>
          }
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введите запрос..."
              clearable
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                    borderRadius: "4px",
                  },
                },
              }}
            />
            <Button
              onClick={handleSearch}
              overrides={{
                BaseButton: {
                  style: {
                    flexShrink: 0,
                    height: "46px",
                    padding: "10px 16px",
                    borderRadius: "4px",
                  },
                },
              }}
            >
              Найти
            </Button>
          </div>
        </Popover>
      </div>

      {selectedUser && (
        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => {setIsUserModalOpen(false); setSelectedUser(null)}}
          user={selectedUser}
        />
      )}

      {selectedFilm && (
        <EditFilmModal
          isOpen={isFilmModalOpen}
          onClose={() => {setIsFilmModalOpen(false); setSelectedFilm(null)}}  
          allTags={FilmsStoreInstance.allTags}
          film={selectedFilm}
        />
      )}
    </div>
  );
});

export default SearchComponent;
