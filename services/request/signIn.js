import { api } from "../api";

export class SignIn {
    static async createUser(params, callback) {
        const { status } = await api.post('/users', params);
        if(status === 200){
            callback()
        }
      }
}