import { api } from "../api";

export class UsereRequest {
  static async getAllUsers(){
    const { data } = await api.get("/users");
    return data;
  }

  static async getUserById(id){
    const { data } = await api.get(`/users/${id}`);
    return data;
  }

  static async updateUserByID(id, user, callback){
    const { data, status } = await api.put(`/users/${id}`, user);
    if(status === 200){
        callback();
    }
    return data;
  }

  static async deleteUserById(id, callback){
    const { data, status } = await api.delete(`/users/${id}`);
    if(status === 200){
        callback();
    }
    return data;
  }
}