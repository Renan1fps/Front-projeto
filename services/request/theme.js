import { api } from "../api";

export class ThemeRequest {
  static async getAllThemes() {
    const { data } = await api.get('/themes');
    return data;
  }

  static async createChoices() {
    const { data } = await api.post('/themes');
    return data;
  }

  static async createThema(theme, callback) {
    const { data, status } = await api.post('/themes', theme);
    if (status === 200) {
      callback();
    }
    return data;
  }
}