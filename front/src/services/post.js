import axios from 'axios';
import auth from './auth';

const url = window.location.protocol + '//' + window.location.hostname + ':3000/api/posts/';

class PostService {
    getAllPosts() {
        return axios.get(url, { headers: auth() });
    }
    // getAPost(id) {
    //     return axios.get(url + id + { headers: auth() });
    // }
    likeAPost(id) {
        return axios.post(url + id + '/like',{}, { headers: auth() })
    }
    commentAPost(id, data) {
        return axios.post(url + id + '/comment', data, { headers: auth() })
    }
    createAPost(data) {
        return axios.post(url + 'new', data, { headers: auth() })
    }
}

export default new PostService();
