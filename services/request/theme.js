import { api } from "../api";

export class ThemeRequest {
    static async getAllThemes() {
        const { data } = await api.get('/themes');
        return data;
      }
}