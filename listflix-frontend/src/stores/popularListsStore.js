import { makeAutoObservable } from 'mobx';
import axios from '../services/axiosInstance'; 

class PopularListsStore {
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
      const response = await axios.get('/lists/popular');
      this.lists = response.data;
    } catch (error) {
      console.error('Ошибка запроса:', error); 
      this.error = error.response?.data?.message || 'Не удалось загрузить популярные списки';
    } finally {
      this.isLoading = false;
    }
  }
  
}

export const popularListsStore = new PopularListsStore();
