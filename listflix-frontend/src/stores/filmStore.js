import { makeAutoObservable, runInAction } from "mobx";
import axios from "../services/axiosInstance";

class FilmsStore {
  films = []; 
  allTags = [];
  isLoading = false; 
  error = null; 

  constructor() {
    makeAutoObservable(this); 
  }

  async addFilm(listId, film) {
    try {
      await axios.post(`/lists/${listId}/films`, film);
    } catch (error) {
      console.error("Ошибка при добавлении фильма:", error);
    }
  }

  async editFilm(listId, id, updatedFilm) {
    try {
      await axios.put(`/lists/${listId}/films/${id}`, updatedFilm);
    } catch (error) {
      console.error(`Ошибка при редактировании фильма с id ${id}:`, error);
    }
  }

  async deleteFilm(listId, id) {
    try {
      await axios.delete(`/lists/${listId}/films/${id}`);
    } catch (error) {
      console.error(`Ошибка при удалении фильма с id ${id}:`, error);
    }
  }

  searchFilms(query) {
    console.log(this.films)
    if (!query) return this.films; 
    return this.films.filter(film => 
      film.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const FilmsStoreInstance = new FilmsStore();