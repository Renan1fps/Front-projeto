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

  static async getPostsByChoice(themes) {
    const { data } = await api.post(`/post/themes`, [...themes]);
    return data;
  }

  static async create(post, callback) {
    const { data, status } = await api.post(`/post`, post);
    if (status === 200) {
      callback();
    }
    return data;
  }

  static async deletePostById(id, callback) {
    const { data, status } = await api.delete(`/post/${id}`);
    if (status === 200) {
      callback();
    }
    return data;
  }
}