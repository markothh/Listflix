import { makeAutoObservable } from 'mobx';
import axios from '../services/axiosInstance'; // Используем axios для запросов

class RolesStore {
  roles = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRoles() {
    const response = await axios.get('/roles'); // Замените путь на актуальный
    this.roles = response.data;
    return this.roles;
  }
}

export const RolesStoreInstance = new RolesStore();
