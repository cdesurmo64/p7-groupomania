import auth from './auth';
import api from "./api";

class PostService {
    getAllPosts() {
        return api.get('/posts', { headers: auth() });
    }
    getAPost(id) {
        return api.get('/posts/' + id, { headers: auth() });
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
    createAPost(data) {
        return api.post('/posts/new', data, { headers: auth() })
    }
}
export default new PostService();
