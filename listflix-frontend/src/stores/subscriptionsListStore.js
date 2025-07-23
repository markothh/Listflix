import { makeAutoObservable } from 'mobx';
import axios from '../services/axiosInstance'; 

class SubscriptionsListsStore {
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
      const response = await axios.get('/lists/subscriptions');
      this.lists = response.data;
    } catch (error) {
      console.error('Ошибка запроса:', error); 
      this.error = error.response?.data?.message || 'Не удалось загрузить подписки';
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

export const SubscriptionsListStore = new SubscriptionsListsStore();
