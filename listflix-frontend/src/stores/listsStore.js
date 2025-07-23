import { makeAutoObservable } from 'mobx';
import axios from '../services/axiosInstance'; 

class ListsStore {
  constructor() {
    makeAutoObservable(this);
  }

  async addList(data) {
    try {
      const response = await axios.post('/lists', data);
      console.log('Список успешно добавлен:', response.data);
    } catch (error) {
      console.error('Ошибка при добавлении списка:', error);
      throw error;
    }
  }

  async editList(id) {
    try {
      const response = await axios.get(`/lists/${id}/edit`);
      return response.data; 
    } catch (error) {
      console.error("Ошибка при загрузке данных списка:", error);
      throw error; 
    }
  }

  async saveChanges(id, data) {
    try {
      const response = await axios.put(`/lists/${id}`, data);
      console.log('Список успешно обновлен:', response.data);
    } catch (error) {
      console.error('Ошибка при обновлении списка:', error);
      throw error;
    }
  }

  async subscribe(id) {
    try {
      await axios.put(`/lists/${id}/subscribe`);
      console.log('Подписка успешна');
    } catch (error) {
      console.error('Ошибка при обновлении списка:', error);
      throw error;
    }
  }

  async deleteList(id) {
    try {
      const response = await axios.delete(`/lists/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Ошибка при удалении списка:", error);
      throw error; 
    }
  }
  
}

export const listsStore = new ListsStore();
