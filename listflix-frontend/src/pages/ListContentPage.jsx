import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Pagination } from "baseui/pagination";
import WatchButton from "../components/WatchButton";
import AddButton from "../components/AddButton";
import EditButton from "../components/EditButton";  
import SearchComponent from "../components/SearchComponent";
import TagComponentToSelect from "../features/tags/TagComponentToSelect";
import StatusComponent from "../features/status/StatusComponent";
import FilmsListComponent from "../features/films/FilmsListComponent";
import EditListModal from "../features/lists/EditListModal"; 
import AddFilmModal from "../features/films/AddFilmModal"; 
import { ListsContentStoreInstance } from "../stores/ListsContentStore";
import { listsStore } from "../stores/listsStore";
import "../styles/ListContent.css";

const ListContentPage = observer(() => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState(null);
  const [films, setFilms] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddFilmModalOpen, setIsAddFilmModalOpen] = useState(false);
  const filmsPerPage = 20;


  useEffect(() => {
    const loadData = async () => {
      const data = await ListsContentStoreInstance.fetchListContent(id);
      setFilms(data.films || []);
      setRole(data.role);
      setTags(data.tags || []);
    };

    loadData();
  }, [id]);

  const handleTagChange = (tagName) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagName)) {
        return prevSelectedTags.filter((name) => name !== tagName);
      }
      return [...prevSelectedTags, tagName];
    });
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses((prevSelectedStatuses) => {
      if (prevSelectedStatuses.includes(status)) {
        return prevSelectedStatuses.filter((s) => s !== status);
      }
      return [...prevSelectedStatuses, status];
    });
  };

  const getFilteredFilms = () => {
    return films.filter((film) => {
      const matchesTags =
        selectedTags.length === 0 ||
        film.tags.some((tag) => selectedTags.includes(tag));
      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(film.status);
      return matchesTags && matchesStatus;
    });
  };

  const getPaginatedFilms = () => {
    const filteredFilms = getFilteredFilms();
    const startIndex = (currentPage - 1) * filmsPerPage;
    const endIndex = startIndex + filmsPerPage;
    return filteredFilms.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubscription = async () => {
    await listsStore.subscribe(id);
  };

  return (
    <div className="list-content">
      <h1>{ListsContentStoreInstance.name}</h1>
      <div className="search-container">
        <SearchComponent mode="films" />
        {role === null || role === "OBSERVER" ? (
          <WatchButton onClick={() => handleSubscription()} />
        ) : role === "ADMIN" ? (
          <div className="button-container">
            <EditButton onClick={() => setIsEditModalOpen(true)} />
            <AddButton onClick={() => setIsAddFilmModalOpen(true)} />
          </div>
        ) : null}
      </div>
      <div className="content-grid">
        <div className="left-side">
          <div className="tag-component">
            <TagComponentToSelect
              id={id}
              role={role}
              tags={tags}
              onCheckboxChange={handleTagChange}
            />
          </div>
          <div className="status-component">
            <StatusComponent
              selectedStatuses={selectedStatuses}
              onCheckboxChange={handleStatusChange}
            />
          </div>
        </div>

        <div className="right-side">
          <FilmsListComponent films={getPaginatedFilms()} tags={tags} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        numPages={Math.ceil(getFilteredFilms().length / filmsPerPage)}
        onPageChange={handlePageChange}
      />
      <EditListModal id={id} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <AddFilmModal id={id} allTags={tags} isOpen={isAddFilmModalOpen} onClose={() => setIsAddFilmModalOpen(false)} />
    </div>
  );
});

export default ListContentPage;
