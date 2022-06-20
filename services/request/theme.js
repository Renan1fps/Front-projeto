import { api } from "../api";

export class ThemeRequest {
  static async getAllThemes() {
    const { data } = await api.get('/themes');
    return data;
  }

  static async createChoices(choices, idUser) {
    const { data } = await api.post('/themes');
    return data;
  }
}