import { makeAutoObservable } from 'mobx';
import axios from '../services/axiosInstance'; 

class UsersListsStore {
  username = null
  lists = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchLists(id) {
    this.isLoading = true;
    this.error = null;
  
    try {
      const response = await axios.get(`/lists?user=${id}`);
      this.lists = response.data;
    } catch (error) {
      console.error('Ошибка запроса:', error); 
      this.error = error.response?.data?.message || 'Не удалось загрузить списки пользователя';
    } finally {
      this.isLoading = false;
    }
  }

  searchLists(query) {
    if (!query) return this.lists; 
    return this.lists.filter(list => 
      list.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const UserListsStore = new UsersListsStore();
