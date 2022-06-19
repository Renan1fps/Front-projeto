import { api } from "../api";

export class PostsRequest {
    static async getAllPosts() {
        const { data } = await api.get('/post');
        return data;
      }
}