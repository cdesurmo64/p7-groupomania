import axios from 'axios';
import auth from './auth';

const url = window.location.protocol + '//' + window.location.hostname + ':3000/api/posts/';

class PostService {
    getAllPosts() {
        return axios.get(url, { headers: auth() });
    }
    likeAPost(id) {
        return axios.post(url + id + '/like',{}, { headers: auth() })
    }
}

export default new PostService();
