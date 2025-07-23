import React, { useState } from 'react';
import FilmItem from './FilmItem';
import EditFilmModal from './EditFilmModal';

const FilmsListComponent = ({films = [], tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const handleFilmClick = (film) => {
    setSelectedFilm(film); 
    setIsModalOpen(true);    
  };

  const handleModalClose = () => {
    setIsModalOpen(false);   
    setSelectedFilm(null);  
  };

  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {films.map((film, index) => (
          <FilmItem
            key={film.id}
            index={index}
            title={film.name}
            tags={film.tags}
            status={film.status}
            description={film.description}
            onClick={() => handleFilmClick(film)}
          />
        ))}
      </ul>

      {selectedFilm && (
        <EditFilmModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          allTags={tags}
          film={selectedFilm}
        />
      )}
    </div>
  );
};

export default FilmsListComponent; 