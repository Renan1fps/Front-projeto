import { api } from "../api";

export class ChoiceRequest {
  static async createChoices(choices, idUser){
    const { data } = await api.post(`/choice/${idUser}`, [...choices]);
    return data;
  }
}