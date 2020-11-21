import axios from 'axios';
// import auth from '../services/auth';

const url = window.location.protocol + '//' + window.location.hostname + ':3000/api/posts/';

class PostService {
    getAllPosts() {
        return axios.get(url);
    }
}

export default new PostService();
