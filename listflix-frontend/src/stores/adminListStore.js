import { makeAutoObservable } from 'mobx';
import axios from '../services/axiosInstance'; 

class AdminListsStore {
  lists = [];
  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchLists() {
    this.isLoading = true;
    this.error = null;
  
    try {
      const response = await axios.get('/lists/admin');
      this.lists = response.data;
    } catch (error) {
      console.error('Ошибка запроса:', error); 
      this.error = error.response?.data?.message || 'Не удалось загрузить списки';
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

export const AdminListStore = new AdminListsStore();
