import { api } from "../api";

export class PostsRequest {
  static async getAllPosts() {
    const { data } = await api.get('/post');
    return data;
  }

  static async getPostById(id) {
    const { data } = await api.get(`/post/${id}`);
    return data;
  }
}