import { makeAutoObservable } from "mobx";
import axios from "../services/axiosInstance"; // Подключаем axios для запросов
import { FilmsStoreInstance } from "./filmStore";

class ListsContentStore {
  name = "";
  films = [];
  tags = [];
  role = null;
  isPublic = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Функция для получения всех данных
  async fetchListContent(id) {
    try {
      const response = await axios.get(`/lists/${id}`);  // Загружаем все данные сразу

      this.name = response.data.name;
      this.films = response.data.films;
      this.tags = response.data.tags;
      this.role = response.data.role;
      this.isPublic = response.data.isPublic;

      FilmsStoreInstance.films = this.films;
      FilmsStoreInstance.allTags = this.tags;
      
      return {
        films: this.films, 
        role: this.role,  
        tags: this.tags
      };
    } catch (error) {
      console.error("Ошибка загрузки данных", error);
    }
  }
}

export const ListsContentStoreInstance = new ListsContentStore();
