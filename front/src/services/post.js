import auth from './auth';
import api from "./api";

class PostService {
    getAllPosts() {
        return api.get('/posts', { headers: auth() });
    }
    getLastPostsByUserId(userId) {
        return api.get('/posts/' + userId + '/last', { headers: auth() });
    }
    getAPost(id) {
        return api.get('/posts/' + id, { headers: auth() });
    }
    createAPost(data) {
        return api.post('/posts/new', data, { headers: auth() })
    }
    updatePostText(postId, data) {
        return api.patch('/posts/' + postId + '/text', data, { headers: auth() })
    }
    updatePostImage(postId, data) {
        return api.patch('/posts/' + postId + '/picture', data, { headers: auth() })
    }
    deletePost(postId, data) {
        return api.delete('/posts/' + postId, { headers: auth(), data: data })
    }
    likeAPost(id) {
        return api.post('/posts/' + id + '/like',{}, { headers: auth() })
    }
    commentAPost(id, data) {
        return api.post('/posts/' + id + '/comment', data, { headers: auth() })
    }
    updateComment(postId, commentId, data) {
        return api.patch('/posts/' + postId + '/comment/' + commentId, data, { headers: auth() })
    }
    deleteComment(postId, commentId, data) {
        return api.delete('/posts/' + postId + '/comment/' + commentId, { headers: auth(), data: data })
    }
}
export default new PostService();
