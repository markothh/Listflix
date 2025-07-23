import { makeAutoObservable } from "mobx";
import axiosInstance from "../services/axiosInstance"; // Импортируем настроенный axiosInstance

class SearchStore {
  searchResults = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для поиска с использованием axiosInstance
  async search(pattern, mode, listId = "") {
    this.isLoading = true;
    this.error = null;
    let url = "";

    // Формируем URL в зависимости от режима поиска
    if (mode === "users") {
      url = `/users/search?pattern=${pattern}`;
    } else if (mode === "lists") {
      url = `/lists/search?pattern=${pattern}`;
    }

    try {
      // Выполняем запрос с помощью axiosInstance
      const response = await axiosInstance.get(url);
      this.searchResults = response.data; // Записываем полученные данные
      console.log(this.searchResults)
    } catch (error) {
      this.error = error.message || "Произошла ошибка при выполнении запроса";
    } finally {
      this.isLoading = false;
    }
  }

  // Метод для очистки результатов поиска
  clearResults() {
    this.searchResults = [];
  }
}

const searchStore = new SearchStore();
export default searchStore;
