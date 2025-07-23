import { makeAutoObservable } from 'mobx';
import axios from '../services/axiosInstance'; 

class TagsStore {
  tags = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTags(id) {
    try {
      const response = await axios.get(`/lists/${id}/tags`);
      this.tags = response.data;
    } catch (error) {
      console.error('Ошибка загрузки тегов:', error);
    }
  }

  async addTag(id, name) {
    try {
      await axios.post(`/lists/${id}/tags`, name );
      await this.fetchTags(id); // Обновляем теги после добавления
    } catch (error) {
      console.error('Ошибка добавления тега:', error);
    }
  }
}

export const TagsStoreInstance = new TagsStore();

