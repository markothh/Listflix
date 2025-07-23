import { makeAutoObservable } from 'mobx';
import axiosInstance from '../services/axiosInstance'; // Предполагаем, что axiosInstance настроен

class RegisterStore {
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async register(data) {
    this.loading = true;
    this.error = null;

    try {
      const response = await axiosInstance.post('/users', data);
      console.log('Регистрация успешна:', response.data);

      this.loading = false;
      return response.data;
    } catch (error) {
      this.error =
        error.response?.data?.message || error.message || 'Ошибка регистрации';
      this.loading = false;
      throw new Error(this.error);
    }
  }
}

export const registerStore = new RegisterStore();
