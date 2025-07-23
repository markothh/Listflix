import { makeAutoObservable } from "mobx";
import axiosInstance from "../services/axiosInstance";

class AuthStore {
  user = null;
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  async login(token, username) {
    localStorage.setItem('jwtToken', token)
    localStorage.setItem('username', username);

    const response = await axiosInstance.get('/users/currentId');
    localStorage.setItem('userId', response.data);

  }

  logout(navigate) {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('username');
    navigate('/')
  }
}

export const authStore = new AuthStore();
