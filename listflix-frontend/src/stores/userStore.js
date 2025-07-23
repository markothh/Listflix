import { makeAutoObservable } from "mobx";
import axios from "../services/axiosInstance"; 

class UserStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getUserById(userId) {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      return null;
    }
  }

  // Функция для загрузки всех пользователей
  async loadUsers() {
    try {
      const response = await axios.get("/users");
      this.users = response.data; // Здесь сохраняем полученные данные в users
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  }
}

export const UserStoreInstance = new UserStore();
